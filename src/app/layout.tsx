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
  title: 'Extngo · Hero',
  description: 'The world\'s first retractable flat ethernet cable reel. 50ft CAT6, zero tangles, zero trip hazards.',
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
      <body>{children}</body>
    </html>
  )
}
