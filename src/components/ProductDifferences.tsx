'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { m, LazyMotion, domAnimation, useInView } from 'framer-motion'
import { fadeUp, fadeIn, staggerContainer } from '@/lib/motion'

function AmazonButton({ href, bg, bgHover, border, borderHover, color, price }: {
  href: string; bg: string; bgHover: string; border: string; borderHover: string; color: string; price?: string
}) {
  return (
    <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
      {price && (
        <div style={{ textAlign: 'center' }}>
          <span style={{ fontSize: 24, fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.5px' }}>{price}</span>
          <span style={{ fontSize: 12, color: '#8A8A8A', marginLeft: 6, fontWeight: 500 }}>on Amazon</span>
        </div>
      )}
    <a
      href={href}
      target={href !== '#' ? '_blank' : undefined}
      rel={href !== '#' ? 'noopener noreferrer' : undefined}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 7,
        padding: '10px 20px', borderRadius: 999,
        background: bg, border: `1px solid ${border}`,
        color, fontSize: 13, fontWeight: 600,
        textDecoration: 'none', letterSpacing: '0.3px',
        transition: 'background 0.2s, border-color 0.2s',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.background = bgHover
        el.style.borderColor = borderHover
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLAnchorElement
        el.style.background = bg
        el.style.borderColor = border
      }}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
      Buy on Amazon
      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 17 17 7" /><path d="M7 7h10v10" />
      </svg>
    </a>
    </div>
  )
}

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

const BLUE_SPECS = [
  { label: 'Length', value: '15 Metres (49.2 ft)', angle: 90, distance: 220 },
  { label: 'Interface', value: 'USB-C to RJ45', angle: -150, distance: 210 },
  { label: 'Speed', value: '1 Gbps', angle: 160, distance: 205 },
  { label: 'Design', value: 'Retractable Reel', angle: -35, distance: 195 },
  { label: 'Drivers', value: 'Plug & Play', angle: 20, distance: 205 },
]

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
          minHeight: '140vh',
          padding: 'clamp(80px,12vh,140px) clamp(28px,6vw,96px) clamp(120px,16vh,200px)',
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
            Each model is built for a different setup. Find yours below.
          </m.p>
        </m.div>

        {/* Top row: Blue + Orange */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, minmax(0, 420px))',
            justifyContent: 'center',
            gap: 'clamp(48px,8vw,140px)',
            width: '100%',
            maxWidth: 1400,
            overflow: 'visible',
          }}
        >
          {/* Blue */}
          <m.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
            transition={{ delay: 0.1 }}
            style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          >
            <Link
              href="/products/blue"
              className="inline-flex items-center gap-2 rounded-full mb-12"
              style={{
                padding: '7px 13px',
                background: 'rgba(33,150,243,0.10)',
                border: '1px solid rgba(33,150,243,0.28)',
                color: '#1565C0',
                fontSize: 11, fontWeight: 600,
                letterSpacing: '2px', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#2196F3' }} />
              EXTNGO USB-C to Ethernet
            </Link>

            <div style={{ textAlign: 'center', width: '100%', marginBottom: 20 }}>
              <p style={{ margin: 0, fontSize: 13, color: '#5A5A5A', lineHeight: 1.5 }}>
                <span style={{ fontWeight: 700, color: '#1A1A1A' }}>Best for:</span> USB-C devices, events, offices &amp; field setups
              </p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8, padding: '4px 11px', borderRadius: 6, background: 'rgba(33,150,243,0.08)', border: '1px solid rgba(33,150,243,0.18)', fontSize: 11, fontWeight: 700, color: '#1565C0', letterSpacing: '0.4px' }}>
                Tough-Flat™ &mdash; Survives Foot &amp; Vehicle Traffic
              </span>
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: 420, aspectRatio: '1/1', overflow: 'visible' }}>
              <div
                style={{
                  position: 'relative', width: '100%', height: '100%',
                  animation: 'heroFloat 8s 1.0s ease-in-out infinite',
                  filter: 'drop-shadow(0 40px 60px rgba(20,60,120,0.28)) drop-shadow(0 15px 25px rgba(20,60,120,0.18))',
                  willChange: 'transform',
                }}
              >
                <Image src="/product-blue.png" alt="Extngo Blue 100ft retractable CAT6 cable reel" fill style={{ objectFit: 'contain' }} />
              </div>

              <m.div
                variants={staggerContainer(0.1, 0.3)}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                className="product-floating-specs"
                style={{ position: 'absolute', inset: 0 }}
              >
                {BLUE_SPECS.map((s, i) => (
                  <FloatingSpec key={i} {...s} delay={0.3 + i * 0.1} accent="#2196F3" scale={specScale} />
                ))}
              </m.div>
            </div>

            <AmazonButton
              href="https://www.amazon.com/dp/B0GJD6W12Y"
              bg="rgba(33,150,243,0.06)" bgHover="rgba(33,150,243,0.14)"
              border="rgba(33,150,243,0.2)" borderHover="rgba(33,150,243,0.45)"
              color="#1565C0"
              price="$70.02"
            />
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

            <div style={{ textAlign: 'center', width: '100%', marginBottom: 20 }}>
              <p style={{ margin: 0, fontSize: 13, color: '#5A5A5A', lineHeight: 1.5 }}>
                <span style={{ fontWeight: 700, color: '#1A1A1A' }}>Best for:</span> Large rooms, conference setups &amp; IT fieldwork
              </p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8, padding: '4px 11px', borderRadius: 6, background: 'rgba(232,67,26,0.08)', border: '1px solid rgba(232,67,26,0.18)', fontSize: 11, fontWeight: 700, color: 'var(--accent)', letterSpacing: '0.4px' }}>
                50ft Reach &mdash; Cascadable to 100ft
              </span>
            </div>

            <div style={{ position: 'relative', width: '100%', maxWidth: 420, aspectRatio: '1/1', overflow: 'visible' }}>
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

            <AmazonButton
              href="https://www.amazon.com/EXTNGO-Flat-Portable-Speed-Swiftly-Networks-Cascadable-Connector-UTP/dp/B01LVZ3UI6?ref_=ast_sto_dp&th=1"
              bg="rgba(232,67,26,0.06)" bgHover="rgba(232,67,26,0.14)"
              border="rgba(232,67,26,0.2)" borderHover="rgba(232,67,26,0.45)"
              color="var(--accent)"
              price="$79.99"
            />
          </m.div>
        </div>

        {/* Bottom center: Green */}
        <m.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ delay: 0.34 }}
          style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'clamp(48px,8vw,100px)', width: 'min(420px, 100%)' }}
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

          <div style={{ textAlign: 'center', width: '100%', marginBottom: 20 }}>
            <p style={{ margin: 0, fontSize: 13, color: '#5A5A5A', lineHeight: 1.5 }}>
              <span style={{ fontWeight: 700, color: '#1A1A1A' }}>Best for:</span> Home office &amp; everyday travel
            </p>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, marginTop: 8, padding: '4px 11px', borderRadius: 6, background: 'rgba(76,175,80,0.08)', border: '1px solid rgba(76,175,80,0.18)', fontSize: 11, fontWeight: 700, color: '#2E7D32', letterSpacing: '0.4px' }}>
              Lightest Model &mdash; $10 Less Than Orange
            </span>
          </div>

          <div style={{ position: 'relative', width: '100%', maxWidth: 420, aspectRatio: '1/1', overflow: 'visible' }}>
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

          <AmazonButton
            href="https://www.amazon.com/EXTNGO-Flat-Portable-Speed-Swiftly-Networks-Cascadable-Connector-UTP/dp/B01LW2YNJ4?ref_=ast_sto_dp&th=1"
            bg="rgba(76,175,80,0.06)" bgHover="rgba(76,175,80,0.14)"
            border="rgba(76,175,80,0.2)" borderHover="rgba(76,175,80,0.45)"
            color="#2E7D32"
            price="$69.99"
          />
        </m.div>
      </section>
    </LazyMotion>
  )
}
