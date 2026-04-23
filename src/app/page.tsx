'use client'

import { useEffect, useState } from 'react'
import HeroSafe from '@/components/HeroSafe'
import PinnedProduct from '@/components/PinnedProduct'
import ProductDetail from '@/components/ProductDetail'
import ProductDifferences from '@/components/ProductDifferences'
import WhoItsFor from '@/components/WhoItsFor'
import Testimonials from '@/components/Testimonials'
import NavBar from '@/components/NavBar'

export default function Home() {
  const [heroVisible, setHeroVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => setHeroVisible(window.scrollY < window.innerHeight)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      {/* Fixed navbar — always on top */}
      <NavBar delayBase={0.05} />

      {/* Fixed hero background — unmounted once scrolled past */}
      {heroVisible && (
        <div
          className="hero-screen"
          data-screen-label="01 Hero"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            width: '100%',
            height: '100vh',
            overflow: 'hidden',
            zIndex: 1,
          }}
        >
          <HeroSafe animKey={0} showWordmark={true} />
        </div>
      )}

      {/* Spacer for hero section */}
      <div style={{ height: '100vh', position: 'relative', zIndex: 2, pointerEvents: 'none' }} />

      {/* Content that slides up - NO overflow properties */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          background: '#FFFFFF',
        }}
      >
        <div data-screen-label="02 Product Detail">
          <ProductDetail />
        </div>

        <div data-screen-label="03 Product Differences">
          <ProductDifferences />
        </div>

        <PinnedProduct />

        <div data-screen-label="04 Who It's For">
          <WhoItsFor />
        </div>

        <div data-screen-label="05 Testimonials">
          <Testimonials />
        </div>
      </div>
    </>
  )
}
