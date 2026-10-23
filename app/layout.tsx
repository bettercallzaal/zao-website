import type { Metadata } from 'next'
import './globals.css'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  // Copy is derived from the thezao ICM box (the source of truth) - "decentralized
  // impact network", never "music community and incubator" (icm-grounding drift fix).
  metadataBase: new URL('https://thezao.com'),
  title: 'The ZAO - A Decentralized Impact Network for Artists',
  description:
    'The ZAO returns profit margin, data, and IP rights to artists. A decentralized impact network - music first, built in the open on Farcaster and Base.',
  keywords: ['web3', 'music', 'artists', 'decentralized', 'impact network', 'creators'],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'The ZAO - a home where artists own their work',
    description: 'A decentralized impact network. Live-traded music, governance you earn, built in the open on Farcaster and Base.',
    url: 'https://thezao.com',
    siteName: 'The ZAO',
    images: [
      {
        // Absolute thezao.com URL (IMan review, iman-desk #106): shares show the real domain, and
        // vercel.app does not load from Zambia. public/og-image.png is served at this path once DNS
        // moves; until then a preview of the rebuild shows no image, because Webflow 404s it.
        url: 'https://thezao.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The ZAO - a home where artists own their work',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The ZAO - a home where artists own their work',
    description: 'A decentralized impact network. Live-traded music, governance you earn, built in the open.',
    images: ['https://thezao.com/og-image.png'],
  },
  icons: {
    icon: [{ url: '/favicon-32.png', sizes: '32x32', type: 'image/png' }],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#03182f" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@graph': [
                {
                  '@type': 'Organization',
                  '@id': 'https://thezao.com/#org',
                  name: 'The ZAO',
                  url: 'https://thezao.com',
                  description:
                    'A decentralized impact network - a home where members build, ship, and graduate real products together, and where artists own their margin, data, and IP.',
                  foundingDate: '2024',
                  founder: { '@type': 'Person', name: 'Zaal Panthaki', alternateName: 'BetterCallZaal' },
                  sameAs: ['https://farcaster.xyz/~/channel/zao', 'https://paragraph.com/@thezao'],
                  knowsAbout: [
                    'Web3 music',
                    'Creator economy',
                    'DAO governance',
                    'Farcaster',
                    'Solana',
                    'Music incubator',
                  ],
                  logo: { '@type': 'ImageObject', url: 'https://thezao.com/logo.png' },
                },
                {
                  '@type': 'WebSite',
                  '@id': 'https://thezao.com/#website',
                  url: 'https://thezao.com',
                  name: 'The ZAO',
                  publisher: { '@id': 'https://thezao.com/#org' },
                },
                {
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'What is The ZAO?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'The ZAO is a decentralized impact network, founded in 2024. It is a home where members build, ship, and graduate real products together, and where artists own their margin, data, and IP. It runs on Farcaster and Base.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What does The ZAO build?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'The ZAO builds creator infrastructure in the open, including WaveWarZ (live-traded music battles on Solana), COC Concertz (metaverse concerts), ZAOstock (a festival), ZAO OS (the incubator lab), and ZABAL Gamez (a build-a-thon program).',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'How do you earn standing in The ZAO?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Standing is earned through Respect - an onchain reputation earned by contributing and being ranked by peers each week. Respect is non-transferable, so it is a record of contribution, not a currency. The ZAO is community-first, not token-first.',
                      },
                    },
                  ],
                },
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Reveal />
      </body>
    </html>
  )
}
