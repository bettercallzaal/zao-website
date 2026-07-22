import type { Metadata } from 'next'
import './globals.css'
import { Reveal } from '@/components/Reveal'

export const metadata: Metadata = {
  title: 'The ZAO - Web3 Music Community & Incubator',
  description: 'A web3 music community and incubator for artists, creators, and builders.',
  keywords: ['web3', 'music', 'community', 'incubator', 'artists', 'creators'],
  openGraph: {
    title: 'The ZAO',
    description: 'Web3 music community and incubator',
    url: 'https://thezao.com',
    siteName: 'The ZAO',
    images: [
      {
        url: 'https://thezao.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The ZAO',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The ZAO',
    description: 'Web3 music community and incubator',
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
        <meta name="theme-color" content="#141e27" />
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
                    'A web3 music community and incubator - a home where members build, ship, and graduate real products together, and where artists own their margin, data, and IP.',
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
                        text: 'The ZAO is a web3 music community and incubator, founded in 2024. It is a home where members build, ship, and graduate real products together, and where artists own their margin, data, and IP. It runs on Farcaster and Base.',
                      },
                    },
                    {
                      '@type': 'Question',
                      name: 'What does The ZAO build?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'The ZAO builds creator infrastructure in the open, including WaveWarZ (live-traded music battles on Solana), COC Concertz (metaverse concerts), ZAOstock (a festival), ZAO OS (the incubator lab), and ZABAL Games (a build-a-thon program).',
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
