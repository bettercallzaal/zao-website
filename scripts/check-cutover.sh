#!/usr/bin/env bash
# check-cutover.sh - the post-switch checks for moving thezao.com off Webflow,
# as code instead of a list someone reads and ticks.
#
# It asserts what each answer SAYS, not only that it answered: which server,
# which redirect target, which canonical, which record. A 200 from the wrong
# site is a failure here.
#
# Usage:  scripts/check-cutover.sh [host]
#           host defaults to thezao.com. Any other host (test.thezao.com, a
#           preview) runs the HTTP checks only; DNS and the www redirect only
#           mean something for the real domain.
#         SKIP_SITE=1 scripts/check-cutover.sh   skip the check-site.mjs pass
#
# Exit:   0 every check passed
#         1 at least one check failed (each FAIL line says which and why)
#         2 the checks could not run: a missing tool, or the red control
#           passed, which means the assertions cannot tell good from bad
#
# Before the switch, against thezao.com, this is EXPECTED to fail: Webflow
# still answers. That failure is itself a check that the script reads the
# live domain.

set -u

HOST="${1:-thezao.com}"
BASE="https://$HOST"
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(dirname "$HERE")"

# The values Webflow serves today (measured 2026-10-23, Porkbun DNS). Seeing
# either after the switch means the switch did not happen or was rolled back.
WEBFLOW_A='198.202.211.1'
WEBFLOW_CNAME='cdn.webflow.com.'
# Email lives in these; the switch must not change them.
MX_EXPECTED='1 smtp.google.com.'
TXT_EXPECTED='google-site-verification= mailerlite-domain-verification= v=spf1'

fails=0
pass() { printf '  PASS  %s\n' "$1"; }
fail() { printf '  FAIL  %s\n' "$1"; fails=$((fails + 1)); }

for tool in curl dig grep sed; do
  command -v "$tool" >/dev/null 2>&1 || { echo "CANNOT RUN: $tool is not installed"; exit 2; }
done

# status <url>: HTTP status without following redirects ("000" if unreachable).
status() { curl -sS -o /dev/null --max-time 20 -w '%{http_code}' "$1" 2>/dev/null || true; }
# final <url>: "<status> <final url>" after following redirects.
final() { curl -sS -o /dev/null -L --max-time 20 -w '%{http_code} %{url_effective}' "$1" 2>/dev/null || true; }
# body <url>: the page body, only when the answer is exactly 200. -f alone is
# not enough: it passes a 3xx, and Webflow answers the bare domain with a 301
# whose body has a <title>. The red control caught that.
body() {
  local out code
  out="$(curl -fsS --max-time 20 -w '\n__STATUS__%{http_code}' "$1" 2>/dev/null || true)"
  code="${out##*__STATUS__}"
  [ "$code" = "200" ] && printf '%s' "${out%$'\n'__STATUS__*}"
}
# header <url> <name>: one response header value, lowercased name match.
header() { curl -sS -I --max-time 20 "$1" 2>/dev/null | tr -d '\r' | grep -i "^$2:" | head -1 | sed 's/^[^:]*: *//'; }

# page_has <url> <fixed text>: the page answers 200 AND contains the text.
page_has() {
  local b
  b="$(body "$1")"
  [ -n "$b" ] && printf '%s' "$b" | grep -qF -- "$2"
}

# canonical_of <url>: the href of <link rel="canonical">.
canonical_of() {
  body "$1" | grep -o '<link rel="canonical" href="[^"]*"' | head -1 | sed 's/.*href="//; s/"$//'
}

echo "check-cutover: $BASE  ($(date '+%Y-%m-%d %H:%M:%S %Z'))"

# ------------------------------------------------------------ red control
# The content assertion must FAIL on a page that does not exist. If it passes
# there, every PASS below is meaningless.
if page_has "$BASE/this-page-does-not-exist-cutover-zz9" '<title>'; then
  echo "CANNOT RUN: red control passed - page_has accepted a 404 page"
  exit 2
fi
echo "  ok    red control: a made-up path fails the content check"

# ------------------------------------------------------------ DNS (real domain only)
if [ "$HOST" = "thezao.com" ]; then
  echo "DNS"
  for ns in 1.1.1.1 maceio.ns.porkbun.com; do
    a="$(dig @"$ns" +short A thezao.com | tr '\n' ' ' | sed 's/ $//')"
    if [ -z "$a" ]; then fail "A thezao.com @$ns is empty"
    elif printf '%s' "$a" | grep -qF "$WEBFLOW_A"; then fail "A thezao.com @$ns is still Webflow ($a)"
    else pass "A thezao.com @$ns = $a"; fi

    c="$(dig @"$ns" +short CNAME www.thezao.com | tr '\n' ' ' | sed 's/ $//')"
    if [ -z "$c" ]; then fail "CNAME www.thezao.com @$ns is empty"
    elif [ "$c" = "$WEBFLOW_CNAME" ]; then fail "CNAME www.thezao.com @$ns is still Webflow ($c)"
    else pass "CNAME www.thezao.com @$ns = $c"; fi
  done

  mx="$(dig @1.1.1.1 +short MX thezao.com | tr '\n' ' ' | sed 's/ $//')"
  if [ "$mx" = "$MX_EXPECTED" ]; then pass "MX unchanged ($mx)"; else fail "MX changed: '$mx', expected '$MX_EXPECTED'"; fi

  txt="$(dig @1.1.1.1 +short TXT thezao.com)"
  for t in $TXT_EXPECTED; do
    if printf '%s' "$txt" | grep -qF -- "$t"; then pass "TXT still has $t"; else fail "TXT lost $t"; fi
  done
fi

# ------------------------------------------------------------ who serves
echo "HTTP"
srv="$(header "$BASE/" server)"
wf="$(header "$BASE/" x-wf-region)"
if printf '%s' "$srv" | grep -qi '^vercel'; then pass "server: $srv"; else fail "server is '$srv', expected Vercel"; fi
if [ -z "$wf" ]; then pass "no x-wf-region header"; else fail "x-wf-region: $wf (Webflow is still answering)"; fi

cert="$(curl -sS -o /dev/null --max-time 20 -w '%{ssl_verify_result}' "$BASE/" 2>/dev/null || echo err)"
if [ "$cert" = "0" ]; then pass "TLS certificate verifies for $HOST"; else fail "TLS certificate did not verify for $HOST ($cert)"; fi

if [ "$HOST" = "thezao.com" ]; then
  w="$(status "https://www.thezao.com/")"
  loc="$(header "https://www.thezao.com/" location)"
  case "$w" in
    301|302|307|308)
      if [ "$loc" = "https://thezao.com/" ]; then pass "www redirects ($w) to https://thezao.com/"
      else fail "www redirects ($w) to '$loc', expected https://thezao.com/"; fi ;;
    *) fail "www answered $w, expected a redirect to https://thezao.com/" ;;
  esac
fi

# /links is a 404 on Webflow, so its title proves the new site is serving.
if page_has "$BASE/links" '<title>Everything in one place - The ZAO'; then pass "/links is the new site's page"
else fail "/links did not return the new site's page"; fi

nf="$(status "$BASE/this-page-does-not-exist-cutover-zz9")"
if [ "$nf" = "404" ]; then pass "a made-up path returns 404"; else fail "a made-up path returned $nf, expected 404"; fi

og_status="$(status "$BASE/og-image.png")"
og_type="$(header "$BASE/og-image.png" content-type)"
if [ "$og_status" = "200" ] && [ "$og_type" = "image/png" ]; then pass "/og-image.png 200 image/png"
else fail "/og-image.png answered $og_status '$og_type'"; fi

# Old Webflow URLs: each must land on ITS page, not just any 200.
echo "Old URLs"
for pair in \
  /contact=/zao-token \
  /join=/zao-token \
  /artists=/community \
  /blog-categories/album=/music-releases \
  /oldpages/music-releases=/music-releases
do
  from="${pair%%=*}"; to="${pair#*=}"
  got="$(final "$BASE$from")"
  if [ "$got" = "200 $BASE$to" ]; then pass "$from -> $to"
  else fail "$from landed on '$got', expected '200 $BASE$to'"; fi
done

# ------------------------------------------------------------ member canonicals (#60)
echo "Canonicals"
handles="$(grep -o "handle: '[^']*'" "$ROOT/lib/members.ts" | sed "s/handle: '//; s/'$//")"
if [ -z "$handles" ]; then
  echo "CANNOT RUN: no handles read from lib/members.ts"
  exit 2
fi
for h in $handles; do
  c="$(canonical_of "$BASE/$h")"
  if [ "$c" = "https://thezao.com/$h" ]; then pass "/$h canonical $c"
  else fail "/$h canonical is '$c', expected https://thezao.com/$h"; fi
done

# ------------------------------------------------------------ whole site
if [ "${SKIP_SITE:-0}" = "1" ]; then
  echo "Site: skipped (SKIP_SITE=1)"
elif command -v node >/dev/null 2>&1; then
  echo "Site"
  out="$(mktemp)"
  if node "$HERE/check-site.mjs" "$BASE" >"$out" 2>&1; then
    pass "check-site.mjs: $(grep -E '^PASS' "$out" | head -1)"
  else
    fail "check-site.mjs failed:"
    grep -E '^ +\[' "$out" | sed 's/^/        /'
  fi
  rm -f "$out"
else
  fail "node is not installed, so check-site.mjs did not run (SKIP_SITE=1 to skip on purpose)"
fi

echo
if [ "$fails" -eq 0 ]; then echo "PASS - every cutover check held on $HOST"; exit 0; fi
echo "FAIL - $fails check(s) failed on $HOST"
exit 1
