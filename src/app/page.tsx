'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, m, LazyMotion, domAnimation } from 'framer-motion'
import Script from 'next/script'
import HeroSafe from '@/components/HeroSafe'
import PinnedProduct from '@/components/PinnedProduct'
import ProductDetail from '@/components/ProductDetail'
import ProductDifferences from '@/components/ProductDifferences'
import WhoItsFor from '@/components/WhoItsFor'
import Testimonials from '@/components/Testimonials'
import Cta from '@/components/Cta'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setHeroVisible(window.scrollY < window.innerHeight * 1.1)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Extngo Retractable Ethernet Cable',
    description: 'The world\'s first retractable flat ethernet cable reel. 50ft CAT6, zero tangles, zero trip hazards.',
    image: 'https://extngo-eight.vercel.app/hero.png',
    brand: {
      '@type': 'Brand',
      name: 'Extngo',
    },
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      url: 'https://extngo-eight.vercel.app',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '2000',
    },
  }

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Extngo',
    url: 'https://extngo-eight.vercel.app',
    logo: 'https://extngo-eight.vercel.app/logo.png',
    sameAs: [],
  }

  return (
    <LazyMotion features={domAnimation}>
      <Script
        id="structured-data-product"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Script
        id="structured-data-organization"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />

      {/* Fixed navbar */}
      <NavBar delayBase={0.05} />

      {/* Hero — AnimatePresence gives it a proper exit animation */}
      <AnimatePresence>
        {heroVisible && (
          <m.div
            key="hero"
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.5, ease: [0.4, 0, 1, 1] } }}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0,
              width: '100%',
              height: '100dvh',
              overflow: 'hidden',
              zIndex: 1,
            }}
          >
            <HeroSafe animKey={0} showWordmark={true} />
          </m.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div style={{ height: '100dvh', position: 'relative', zIndex: 2, pointerEvents: 'none' }} />

      {/* Content stack */}
      <div style={{ position: 'relative', zIndex: 3, background: '#FFFFFF' }}>
        <ProductDetail />
        <ProductDifferences />
        <PinnedProduct />
        <WhoItsFor />
        <Testimonials />
        <Cta />
        <Footer />
      </div>
    </LazyMotion>
  )
}
