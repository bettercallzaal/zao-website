import type { MetadataRoute } from 'next'

// Lets phones add thezao.com to the home screen as The ZAO, with the logo and the site's navy.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The ZAO',
    short_name: 'The ZAO',
    description: 'A decentralized impact network where artists own their work.',
    start_url: '/',
    display: 'standalone',
    background_color: '#03182f',
    theme_color: '#03182f',
    icons: [
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  }
}
