'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { m, LazyMotion, domAnimation, useInView } from 'framer-motion'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/motion'

function FloatingSpec({
  label, value, angle, distance, delay, accent, scale = 1,
}: {
  label: string; value: string; angle: number; distance: number; delay: number; accent: string; scale?: number
}) {
  const d = distance * scale
  const x = Math.cos((angle * Math.PI) / 180) * d
  const y = Math.sin((angle * Math.PI) / 180) * d

  return (
    <m.div
      variants={fadeIn}
      transition={{ delay }}
      style={{
        position: 'absolute',
        left: '50%', top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        pointerEvents: 'none',
        zIndex: 30,
      }}
    >
      <div
        style={{
          padding: scale < 0.7 ? '5px 9px' : '8px 14px',
          borderRadius: 14,
          background: 'rgba(255,255,255,0.78)',
          border: '1px solid rgba(26,26,26,0.08)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.06), 0 2px 6px rgba(0,0,0,0.04)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          animation: `floatSpec 5s ${delay + 0.6}s ease-in-out infinite`,
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: scale < 0.7 ? 6 : 10,
          willChange: 'transform',
        }}
      >
        <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent, flexShrink: 0 }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ fontSize: scale < 0.7 ? 7.5 : 9, letterSpacing: '1.6px', textTransform: 'uppercase', color: '#8A8A8A', fontWeight: 700, lineHeight: 1 }}>{label}</div>
          <div style={{ fontSize: scale < 0.7 ? 10.5 : 13, fontWeight: 700, color: '#1A1A1A', letterSpacing: '0.2px', lineHeight: 1.1 }}>{value}</div>
        </div>
      </div>
    </m.div>
  )
}

const GREEN_SPECS = [
  { label: 'Length', value: '33 Feet (10 Meter)', angle: 90, distance: 220 },
  { label: 'Dimensions (in)', value: '3 × 5.1 × 6.5', angle: -150, distance: 210 },
  { label: 'Dimensions (cm)', value: '7.6 × 13 × 16.5', angle: 160, distance: 205 },
  { label: 'Weight (lbs)', value: '1.6', angle: -35, distance: 195 },
  { label: 'Weight (kg)', value: '0.7', angle: 20, distance: 205 },
]

const ORANGE_SPECS = [
  { label: 'Length', value: '50 Feet (15 Meter)', angle: 90, distance: 220 },
  { label: 'Dimensions (in)', value: '3 × 5.1 × 6.5', angle: -30, distance: 210 },
  { label: 'Dimensions (cm)', value: '7.6 × 13 × 16.5', angle: 20, distance: 205 },
  { label: 'Weight (lbs)', value: '1.8', angle: -145, distance: 195 },
  { label: 'Weight (kg)', value: '0.8', angle: 160, distance: 205 },
]

export default function ProductDifferences() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })

  // Scale down spec distances on smaller viewports
  const [specScale, setSpecScale] = useState(1)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 400) setSpecScale(0.55)
      else if (w < 540) setSpecScale(0.65)
      else if (w < 768) setSpecScale(0.78)
      else setSpecScale(1)
    }
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={ref}
        id="product-differences"
        style={{
          position: 'relative',
          background: '#FFFFFF',
          width: '100%',
          minHeight: '100vh',
          padding: 'clamp(80px,12vh,140px) clamp(28px,6vw,96px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Title */}
        <m.div
          style={{ textAlign: 'center', marginBottom: 'clamp(64px,10vh,100px)' }}
          variants={staggerContainer(0.12, 0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <m.h2
            variants={fadeUp}
            className="font-display"
            style={{
              margin: 0,
              fontSize: 'clamp(36px,5vw,64px)',
              lineHeight: 1.02,
              fontWeight: 800,
              color: 'var(--ink)',
              letterSpacing: '-0.035em',
            }}
          >
            Product <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Differences</span>
          </m.h2>
          <m.p
            variants={fadeUp}
            style={{ margin: '16px auto 0', color: '#3A3A3A', fontSize: 17, lineHeight: 1.55, maxWidth: 560 }}
          >
            Compare our two models and find the perfect fit for your needs
          </m.p>
        </m.div>

        {/* Comparison grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
            gap: 'clamp(48px,8vw,120px)',
            width: '100%',
            maxWidth: 1400,
            overflow: 'visible',
          }}
        >
          {/* Green */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.1 }}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full mb-12"
              style={{
                padding: '7px 13px',
                background: 'rgba(76,175,80,0.12)',
                border: '1px solid rgba(76,175,80,0.25)',
                color: '#2E7D32',
                fontSize: 11, fontWeight: 600,
                letterSpacing: '2px', textTransform: 'uppercase',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50' }} />
              EXTNGO Green
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: 380, aspectRatio: '1/1', overflow: 'visible' }}>
              <div
                style={{
                  position: 'relative', width: '100%', height: '100%',
                  animation: 'heroFloat 8s 1.4s ease-in-out infinite',
                  filter: 'drop-shadow(0 40px 60px rgba(40,80,40,0.28)) drop-shadow(0 15px 25px rgba(40,80,40,0.18))',
                  willChange: 'transform',
                }}
              >
                <Image src="/product-green.png" alt="Extngo Green 33ft retractable CAT6 cable reel" fill style={{ objectFit: 'contain' }} />
              </div>

              <m.div
                variants={staggerContainer(0.1, 0.3)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="product-floating-specs"
                style={{ position: 'absolute', inset: 0 }}
              >
                {GREEN_SPECS.map((s, i) => (
                  <FloatingSpec key={i} {...s} delay={0.3 + i * 0.1} accent="#4CAF50" scale={specScale} />
                ))}
              </m.div>
            </div>
          </m.div>

          {/* Orange */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.22 }}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <div
              className="inline-flex items-center gap-2 rounded-full mb-12"
              style={{
                padding: '7px 13px',
                background: 'rgba(232,67,26,0.08)',
                border: '1px solid rgba(232,67,26,0.22)',
                color: 'var(--accent)',
                fontSize: 11, fontWeight: 600,
                letterSpacing: '2px', textTransform: 'uppercase',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              EXTNGO Orange
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: 380, aspectRatio: '1/1', overflow: 'visible' }}>
              {/* Anchor for PinnedProduct */}
              <div
                data-product-anchor="orange"
                style={{ position: 'absolute', inset: 0 }}
              />

              <m.div
                variants={staggerContainer(0.1, 0.3)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="product-floating-specs"
                style={{ position: 'absolute', inset: 0 }}
              >
                {ORANGE_SPECS.map((s, i) => (
                  <FloatingSpec key={i} {...s} delay={0.3 + i * 0.1} accent="var(--accent)" scale={specScale} />
                ))}
              </m.div>
            </div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
