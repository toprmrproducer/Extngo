'use client'

import { useEffect, useRef, useState } from 'react'
import { m, LazyMotion, domAnimation, useInView, AnimatePresence } from 'framer-motion'
import { spring } from '@/lib/motion'

// ── Icons ────────────────────────────────────────────────────────────────────
const ServerIcon = () => (
  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
  </svg>
)
const ConferenceIcon = () => (
  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
    <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
)
const HotelIcon = () => (
  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
)
const EventIcon = () => (
  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
)
const HomeOfficeIcon = () => (
  <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/>
  </svg>
)

// ── Data ─────────────────────────────────────────────────────────────────────
const CARDS = [
  { title: 'IT Server Rooms',      badge: 'Enterprise',   stat: '50ft',  sub: 'Rack to rack runs',      bg: '#1C2128', icon: <ServerIcon />,     image: '/It.webp' },
  { title: 'Conference Rooms',     badge: 'AV Install',   stat: '1Gbps', sub: 'Zero trip hazards',      bg: '#1A2E1A', icon: <ConferenceIcon />, image: '/Conference.webp' },
  { title: 'Hotel & Hospitality',  badge: 'Facilities',   stat: 'CAT6',  sub: 'Under carpet routing',   bg: '#1A1F2E', icon: <HotelIcon />,      image: '/Hotel.webp' },
  { title: 'Trade Shows & Events', badge: 'On the Road',  stat: '33ft',  sub: 'Fast deploy & retract',  bg: '#2A1F14', icon: <EventIcon />,      image: '/Event.webp' },
  { title: 'Home Office',          badge: 'Remote Work',  stat: 'Flat',  sub: 'Clean desk setups',      bg: '#1E1428', icon: <HomeOfficeIcon />, image: '/house.webp' },
]

const STATS = [
  { number: '2,400+', label: 'Verified Reviews' },
  { number: '4.8★',   label: 'Avg Rating' },
  { number: '50ft',   label: 'Max Cable Length' },
  { number: '1Gbps',  label: 'Data Speed' },
]

const CARD_HEIGHT = 520
const CARD_GAP = 16

function useVisibleCount() {
  const [count, setCount] = useState(3)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      if (w < 640) setCount(1)
      else if (w < 960) setCount(2)
      else setCount(3)
    }
    update()
    window.addEventListener('resize', update, { passive: true })
    return () => window.removeEventListener('resize', update)
  }, [])
  return count
}

// ── Arrow button ─────────────────────────────────────────────────────────────
function ArrowButton({ disabled, onClick, d, label }: { disabled: boolean; onClick: () => void; d: string; label: string }) {
  const [hov, setHov] = useState(false)
  const active = !disabled && hov
  return (
    <m.button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      whileTap={!disabled ? { scale: 0.93 } : {}}
      style={{
        width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
        border: `1.5px solid ${active ? '#1A1A1A' : 'rgba(26,26,26,0.35)'}`,
        background: active ? '#1A1A1A' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: disabled ? 'default' : 'pointer',
        opacity: disabled ? 0.3 : 1,
        transition: 'background 0.2s ease, border-color 0.2s ease',
      }}
    >
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={active ? '#ffffff' : '#1A1A1A'} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points={d} />
      </svg>
    </m.button>
  )
}

export default function WhoItsFor() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-10% 0px' })
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const visibleCount = useVisibleCount()

  // Drag state for swipe gesture
  const dragStartX = useRef(0)

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setActive(a => (a + 1) % CARDS.length)
    }, 3200)
  }

  useEffect(() => {
    if (inView && !hovered) startTimer()
    else if (timerRef.current) clearInterval(timerRef.current)
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [inView, hovered])

  // Pause on tab hidden
  useEffect(() => {
    const onVis = () => {
      if (document.hidden) { if (timerRef.current) clearInterval(timerRef.current) }
      else if (inView && !hovered) startTimer()
    }
    document.addEventListener('visibilitychange', onVis)
    return () => document.removeEventListener('visibilitychange', onVis)
  }, [inView, hovered])

  const prev = () => { setActive(a => Math.max(0, a - 1)); startTimer() }
  const next = () => { setActive(a => Math.min(CARDS.length - 1, a + 1)); startTimer() }

  const windowStart = Math.min(Math.max(0, active - Math.floor(visibleCount / 2)), CARDS.length - visibleCount)
  const windowEnd = windowStart + visibleCount - 1

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        id="use-cases"
        style={{
          background: '#F5F3EF',
          padding: 'clamp(64px,8vh,100px) clamp(28px,6vw,96px)',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Main grid — left copy | right carousel */}
        <div
          className="wif-grid-responsive"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: 'clamp(32px,5vw,64px)',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* Left — copy */}
          <div>
            <m.div
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1, ease: [0,0,0.2,1] }}
              className="inline-flex items-center gap-2.5 rounded-full"
              style={{
                padding: '7px 13px', marginBottom: 20,
                background: 'rgba(232,67,26,.08)',
                border: '1px solid rgba(232,67,26,.22)',
                color: 'var(--accent)',
                fontSize: 11, fontWeight: 600,
                letterSpacing: '2px', textTransform: 'uppercase',
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              Where It&apos;s Used
            </m.div>

            <m.h2
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease: [0,0,0.2,1] }}
              className="font-display"
              style={{
                fontSize: 'clamp(32px,3.5vw,54px)',
                lineHeight: 1.05, fontWeight: 800,
                color: 'var(--ink)', letterSpacing: '-0.035em',
                margin: '0 0 18px',
              }}
            >
              Server Room.<br />
              Stage Floor.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Hotel Room.</span>
            </m.h2>

            <m.p
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3, ease: [0,0,0.2,1] }}
              style={{ fontSize: 15, lineHeight: 1.65, color: '#3A3A3A', margin: '0 0 28px', maxWidth: 380 }}
            >
              Extngo fits wherever cables need to run and retract. Built for pros who can&apos;t afford downtime or trip hazards.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4, ease: [0,0,0.2,1] }}
              className="wif-buttons-desktop"
              style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
            >
              <m.a
                href="https://www.amazon.com/EXTNGO-Flat-Portable-Speed-Swiftly-Networks-Cascadable-Connector-UTP/dp/B01LVZ3UI6?ref_=ast_sto_dp&th=1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: 14, padding: '13px 28px', textDecoration: 'none' }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Shop Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </m.a>
              <m.a
                href="#product-differences"
                className="btn btn-ghost"
                style={{ fontSize: 14, padding: '13px 28px', textDecoration: 'none' }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                See All Use Cases
              </m.a>
            </m.div>
          </div>

          {/* Right — carousel */}
          <m.div
            initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0,0,0.2,1] }}
          >
            {/* Card track */}
            <div
              style={{ overflow: 'hidden', position: 'relative', width: '100%', height: 'clamp(340px,58vh,520px)' }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onTouchStart={e => { dragStartX.current = e.touches[0].clientX }}
              onTouchEnd={e => {
                const dx = e.changedTouches[0].clientX - dragStartX.current
                if (dx < -50) next()
                else if (dx > 50) prev()
              }}
            >
              <div style={{ display: 'flex', gap: CARD_GAP, width: '100%', height: '100%' }}>
                {CARDS.map((card, i) => {
                  const isActive = i === active
                  const inWindow = i >= windowStart && i <= windowEnd
                  return (
                    <m.div
                      key={i}
                      onClick={() => { if (inWindow) { setActive(i); startTimer() } }}
                      role="button"
                      tabIndex={inWindow ? 0 : -1}
                      aria-label={card.title}
                      onKeyDown={e => e.key === 'Enter' && inWindow && setActive(i)}
                      animate={{
                        flex: !inWindow ? 0 : isActive ? 3 : 1,
                        opacity: inWindow ? 1 : 0,
                        fontSize: isActive ? 'clamp(20px,3vw,36px)' : 'clamp(13px,2vw,20px)',
                      }}
                      transition={spring.gentle}
                      style={{
                        borderRadius: 16,
                        position: 'relative',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        minWidth: 0,
                        height: '100%',
                        background: card.bg,
                        pointerEvents: inWindow ? 'auto' : 'none',
                        willChange: 'flex, opacity',
                      }}
                      whileHover={inWindow ? { y: -4, boxShadow: '0 20px 48px rgba(0,0,0,0.22)' } : {}}
                    >
                      {card.image && (
                        <m.div
                          animate={{ scale: isActive ? 1.04 : 1 }}
                          transition={spring.gentle}
                          style={{
                            position: 'absolute', inset: 0,
                            backgroundImage: `url(${card.image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                          }}
                        />
                      )}
                      {card.image && (
                        <div style={{
                          position: 'absolute', inset: 0,
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.65) 100%)',
                          zIndex: 1,
                        }} />
                      )}
                      {!card.image && (
                        <m.div
                          animate={{ scale: isActive ? 1.8 : 1 }}
                          transition={spring.gentle}
                          style={{
                            position: 'absolute', top: '50%', left: '50%',
                            transform: 'translate(-50%, -50%)',
                            opacity: 0.15, color: '#fff', pointerEvents: 'none',
                          }}
                        >
                          {card.icon}
                        </m.div>
                      )}
                      <div style={{
                        position: 'absolute', top: 14, left: 14, zIndex: 2,
                        padding: '4px 10px', borderRadius: 999,
                        background: 'rgba(255,255,255,0.15)',
                        border: '1px solid rgba(255,255,255,0.25)',
                        color: '#fff', fontSize: 10, fontWeight: 600,
                        letterSpacing: '1.2px', textTransform: 'uppercase',
                        backdropFilter: 'blur(6px)',
                      }}>
                        {card.badge}
                      </div>
                      <m.div
                        animate={{ fontSize: isActive ? 'clamp(20px,3vw,36px)' : 'clamp(13px,2vw,20px)' }}
                        transition={spring.gentle}
                        style={{
                          position: 'absolute', top: 12, right: 14, zIndex: 2,
                          fontFamily: 'var(--font-bricolage)',
                          color: 'rgba(255,255,255,0.9)', lineHeight: 1, fontWeight: 800,
                        }}
                      >
                        {card.stat}
                      </m.div>
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 2,
                        padding: '56px 18px 20px',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)',
                      }}>
                        <p style={{ fontSize: 15, fontWeight: 700, color: '#fff', margin: '0 0 4px', lineHeight: 1.25 }}>{card.title}</p>
                        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', margin: 0 }}>{card.sub}</p>
                      </div>
                    </m.div>
                  )
                })}
              </div>
            </div>

            {/* Dots + Arrows — same row, below carousel */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 16 }}>
              {/* Dots */}
              <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                {CARDS.map((_, i) => (
                  <m.button
                    key={i}
                    onClick={() => { setActive(i); startTimer() }}
                    animate={{ width: i === active ? 20 : 6, background: i === active ? '#1A1A1A' : '#bbb' }}
                    transition={{ duration: 0.3 }}
                    style={{ height: 6, borderRadius: 999, border: 'none', cursor: 'pointer', padding: 0, flexShrink: 0 }}
                    aria-label={`Go to card ${i + 1}`}
                  />
                ))}
              </div>

              {/* Arrows */}
              <div style={{ display: 'flex', gap: 8 }}>
                {[
                  { dir: 'prev', disabled: active === 0, onClick: prev, d: '15,18 9,12 15,6' },
                  { dir: 'next', disabled: active === CARDS.length - 1, onClick: next, d: '9,18 15,12 9,6' },
                ].map(({ dir, disabled, onClick, d }) => (
                  <ArrowButton key={dir} disabled={disabled} onClick={onClick} d={d} label={dir === 'prev' ? 'Previous' : 'Next'} />
                ))}
              </div>
            </div>

            {/* Buttons — mobile only, shown below carousel */}
            <m.div
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5, ease: [0,0,0.2,1] }}
              className="wif-buttons-mobile"
              style={{ display: 'none', gap: 12, flexWrap: 'wrap', marginTop: 20 }}
            >
              <m.a
                href="https://www.amazon.com/EXTNGO-Flat-Portable-Speed-Swiftly-Networks-Cascadable-Connector-UTP/dp/B01LVZ3UI6?ref_=ast_sto_dp&th=1"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ fontSize: 14, padding: '13px 28px', flex: 1, justifyContent: 'center', textDecoration: 'none' }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                Shop Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </m.a>
              <m.a
                href="#product-differences"
                className="btn btn-ghost"
                style={{ fontSize: 14, padding: '13px 28px', flex: 1, justifyContent: 'center', textDecoration: 'none' }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
              >
                See All Use Cases
              </m.a>
            </m.div>
          </m.div>
        </div>

        {/* Stats strip */}
        <div
          className="wif-stats-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            borderTop: '1px solid #ddd',
            marginTop: 48,
          }}
        >
          {STATS.map((s, i) => (
            <m.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + i * 0.08, ease: [0,0,0.2,1] }}
              style={{ padding: '24px 0 0', textAlign: 'center' }}
            >
              <span style={{
                fontFamily: 'var(--font-bricolage)',
                fontSize: 'clamp(24px,4vw,34px)', color: '#111', lineHeight: 1,
                display: 'block', fontWeight: 800,
              }}>
                {s.number}
              </span>
              <span style={{
                fontSize: 11, textTransform: 'uppercase',
                letterSpacing: '1.4px', color: '#999',
                marginTop: 6, display: 'block',
              }}>
                {s.label}
              </span>
            </m.div>
          ))}
        </div>
      </section>
    </LazyMotion>
  )
}
