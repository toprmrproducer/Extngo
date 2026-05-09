import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Geist } from 'next/font/google'
import './globals.css'

const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-bricolage',
  display: 'swap',
})

const geist = Geist({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-geist',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://extngo-eight.vercel.app'),
  title: {
    default: 'Extngo',
    template: '%s | Extngo',
  },
  description: 'The world\'s first retractable flat ethernet cable reel. 50ft CAT6, zero tangles, zero trip hazards.',
  keywords: ['retractable ethernet cable', 'flat ethernet cable', 'CAT6 cable', 'cable reel', 'ethernet cable management', 'network cable', 'cable organizer'],
  authors: [{ name: 'Extngo' }],
  creator: 'Extngo',
  publisher: 'Extngo',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://extngo-eight.vercel.app',
    siteName: 'Extngo',
    title: 'Extngo',
    description: 'The world\'s first retractable flat ethernet cable reel. 50ft CAT6, zero tangles, zero trip hazards.',
    images: [
      {
        url: '/hero.png',
        width: 1200,
        height: 630,
        alt: 'Extngo Retractable Ethernet Cable',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Extngo',
    description: 'The world\'s first retractable flat ethernet cable reel. 50ft CAT6, zero tangles, zero trip hazards.',
    images: ['/hero.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} ${bricolage.variable}`}>
      <head>
        <link rel="canonical" href="https://extngo-eight.vercel.app" />
        <meta name="theme-color" content="#E8431A" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/logo.png" />
        <link rel="apple-touch-icon" href="/logo.png" />
        
        {/* Preload critical assets */}
        <link rel="preload" as="image" href="/product-reel.png" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  )
}
