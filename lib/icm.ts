// The ZAO's ICM boxes - permanent, AI-readable context boxes. Point any AI (or
// agent) at a box and it loads grounded context on that project. This is the
// ZAO ecosystem's answer to "what is X" for AI.
//
// Since 2026-10-11 the master copy of every box is the zao-icm repo (boxes/),
// served as plain text at context.thezao.com/<slug>. The useicm.com copies the
// ids below point at are frozen, so links go to the master by slug.
//
// Source of truth for box IDs: `python3 ~/bin/zao-icm.py list` (repo:
// research/identity/icm-boxes/). Keep this in sync when boxes are minted.

export interface IcmBox {
  slug: string
  id: string
  name: string
  blurb: string
  group: 'core' | 'product' | 'people' | 'knowledge'
}

/** Raw AI-readable context for a box (plain text, no auth), from the master copy. */
export const boxLlmUrl = (box: Pick<IcmBox, 'slug'>) => `https://context.thezao.com/${box.slug}`

export const ICM_BOXES: IcmBox[] = [
  // Core
  { slug: 'thezao', id: 'icm_ohb0F_XOYDz9Tw_w4yX3PA', name: 'The ZAO', blurb: 'The decentralized impact network - mission, governance, traction, brand.', group: 'core' },
  { slug: 'zao-assistant', id: 'icm_-hsPHePpqX01RovoB_SEqA', name: 'ZAO Assistant', blurb: 'The operator layer - start here; it links out to every other box.', group: 'core' },
  { slug: 'fractal', id: 'icm_4YDB03ZKwFxsSumnzeYh0A', name: 'The Fractal + Respect', blurb: "ZAO's earned, on-chain governance - Respect, the Fractal, OREC.", group: 'core' },
  { slug: 'zao-newsletter', id: 'icm_C2TnmeXV0tcs6QkGbc2sGA', name: 'The ZAO Newsletter', blurb: 'The build-in-public digest of the ZAO ecosystem.', group: 'core' },

  // Products
  { slug: 'wavewarz', id: 'icm_RxT9r-_IjG1U9kxOniSzFQ', name: 'WaveWarZ', blurb: 'Live-traded music battles on Solana and Base.', group: 'product' },
  { slug: 'zabalgamez', id: 'icm_6EcindcuwxlkMO7-lT83cQ', name: 'ZABAL Gamez', blurb: 'The 3-month build-a-thon for the ZAO builder community.', group: 'product' },
  { slug: 'zao-festivals', id: 'icm_5JRCZhz7S4C3yo5c27ElNA', name: 'ZAO Festivals', blurb: 'The umbrella - ZAOstock, ZAOville, ZAO-PALOOZA, ZAO-CHELLA.', group: 'product' },
  { slug: 'zaostock', id: 'icm_lda7p0d9o_Ysg-SYZOIWjw', name: 'ZAOstock', blurb: 'The flagship in-person ZAO festival.', group: 'product' },
  { slug: 'sparkz', id: 'icm_Lr30gogWivu6uzio4l02MQ', name: 'Sparkz', blurb: 'Creator-coin launcher with a built-in AI advisor.', group: 'product' },
  { slug: 'coc-concertz', id: 'icm_PmXTIAro8llyOv9LCJ-LZw', name: 'COC Concertz', blurb: 'Virtual concert promotion and artist showcasing.', group: 'product' },
  { slug: 'zuke', id: 'icm_RF7Y6H1bkbn5NujhB2pI0A', name: 'Zuke (ZAO Spaces)', blurb: 'Live audio rooms for the ZAO community.', group: 'product' },
  { slug: 'poidh', id: 'icm_1CRn7Oyvee1jDSK9kje7dw', name: 'POIDH @ ZAO', blurb: 'Bounties - pics or it didn’t happen.', group: 'product' },
  { slug: 'channelz', id: 'icm_1u7o73ziv5pAsMmXQdhfiQ', name: 'channelz', blurb: 'A ZAO ecosystem product - see the box for details.', group: 'product' },
  { slug: 'zaolingo', id: 'icm_47k0vjXyDz23p8qi4spyJA', name: 'ZAOlingo', blurb: 'A ZAO ecosystem product - see the box for details.', group: 'product' },
  { slug: 'zaoscout', id: 'icm_DVPpoZoramr8aTwmi6yTaQ', name: 'ZAOscout', blurb: 'A ZAO ecosystem product - see the box for details.', group: 'product' },
  { slug: 'zlank', id: 'icm_pvIx0khB1ynKHCb9wz7WoQ', name: 'zlank', blurb: 'A ZAO ecosystem product - see the box for details.', group: 'product' },
  { slug: 'zao-video-editor', id: 'icm_yUOn7ajfvoGGkvJySkzCKw', name: 'ZAO Video Editor', blurb: 'The ZAO video editing tool.', group: 'product' },

  // People
  { slug: 'bettercallzaal', id: 'icm_r1ZHKeAdS9UNt4oz7n6HRA', name: 'BetterCallZaal', blurb: 'Zaal Panthaki - founder of The ZAO, build-in-public, web3 music.', group: 'people' },

  // Knowledge / reference
  { slug: 'farcaster', id: 'icm_IrttNJQlfVyaC1hFkPmW-w', name: 'Farcaster', blurb: 'Reference context on the Farcaster protocol.', group: 'knowledge' },
  { slug: 'loop-engineering', id: 'icm_7knlj4KZlzS8wqumf-8A0w', name: 'Loop Engineering', blurb: 'Reference context on building long-running agent loops.', group: 'knowledge' },
  { slug: 'gmfarcaster', id: 'icm_99UHzWXAJXRC9M9aBqE1wg', name: 'gmfarcaster', blurb: 'Reference context box in the ZAO orbit.', group: 'knowledge' },
  { slug: 'milk-road', id: 'icm_OGk1tBJqRQe9kpsIK3yxSw', name: 'Milk Road', blurb: 'Reference context (the crypto newsletter).', group: 'knowledge' },
]

export const ICM_GROUPS: { key: IcmBox['group']; label: string }[] = [
  { key: 'core', label: 'Core' },
  { key: 'product', label: 'Products' },
  { key: 'people', label: 'People' },
  { key: 'knowledge', label: 'Knowledge' },
]
