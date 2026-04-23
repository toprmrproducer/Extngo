'use client'

import { useEffect, useRef, useState } from 'react'

// ── SVG icons (subtle, 15–20% opacity) ──────────────────────────────────────
function ServerIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
      <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/>
      <line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  )
}

function ConferenceIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
      <circle cx="9" cy="7" r="4"/>
      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
    </svg>
  )
}

function HotelIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}

function EventIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
    </svg>
  )
}

function HomeOfficeIcon() {
  return (
    <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
      <line x1="8" y1="21" x2="16" y2="21"/>
      <line x1="12" y1="17" x2="12" y2="21"/>
    </svg>
  )
}

// ── Card data ────────────────────────────────────────────────────────────────
const CARDS = [
  {
    title: 'IT Server Rooms',
    badge: 'Enterprise',
    stat: '50ft',
    sub: 'Rack to rack runs',
    bg: '#1C2128',
    icon: <ServerIcon />,
    image: '/IT.jpeg',
  },
  {
    title: 'Conference Rooms',
    badge: 'AV Install',
    stat: '1Gbps',
    sub: 'Zero trip hazards',
    bg: '#1A2E1A',
    icon: <ConferenceIcon />,
    image: '/Conference.jpeg',
  },
  {
    title: 'Hotel & Hospitality',
    badge: 'Facilities',
    stat: 'CAT6',
    sub: 'Under carpet routing',
    bg: '#1A1F2E',
    icon: <HotelIcon />,
    image: '/Hotel.jpeg',
  },
  {
    title: 'Trade Shows & Events',
    badge: 'On the Road',
    stat: '33ft',
    sub: 'Fast deploy & retract',
    bg: '#2A1F14',
    icon: <EventIcon />,
    image: '/Event.jpeg',
  },
  {
    title: 'Home Office',
    badge: 'Remote Work',
    stat: 'Flat',
    sub: 'Clean desk setups',
    bg: '#1E1428',
    icon: <HomeOfficeIcon />,
    image: '/House.jpeg',
  },
]

const STATS = [
  { number: '2,400+', label: 'Verified Reviews' },
  { number: '4.8★', label: 'Avg Rating' },
  { number: '50ft', label: 'Max Cable Length' },
  { number: '1Gbps', label: 'Data Speed' },
]

const CARD_GAP = 16
const VISIBLE_COUNT = 3
const CARD_HEIGHT = 560 // fixed container height — no layout jump

export default function WhoItsFor() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const prev = () => setActive(a => Math.max(0, a - 1))
  const next = () => setActive(a => Math.min(CARDS.length - 1, a + 1))

  // Window of visible cards — no remounting, just CSS transitions
  const windowStart = Math.min(
    Math.max(0, active - Math.floor(VISIBLE_COUNT / 2)),
    CARDS.length - VISIBLE_COUNT
  )
  const windowEnd = windowStart + VISIBLE_COUNT - 1

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');

        .wif-section {
          background: #F5F3EF;
          padding: clamp(72px, 10vh, 120px) clamp(40px, 6vw, 96px);
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .wif-grid {
          display: grid;
          grid-template-columns: 40% 1fr;
          gap: 48px;
          align-items: center;
          width: 100%;
        }

        .wif-headline {
          font-family: var(--font-bricolage), sans-serif;
          font-size: clamp(40px, 4vw, 58px);
          line-height: 1.05;
          font-weight: 800;
          color: var(--ink);
          letter-spacing: -0.035em;
          margin: 0 0 20px;
        }

        .wif-desc {
          font-family: var(--font-geist), sans-serif;
          font-size: 15px;
          line-height: 1.65;
          color: #3A3A3A;
          margin: 0 0 28px;
        }

        .wif-btn-primary {
          display: none;
        }
        .wif-btn-secondary {
          display: none;
        }

        .wif-carousel-wrap {
          overflow: hidden;
          position: relative;
          width: 100%;
          height: ${CARD_HEIGHT}px;
        }

        .wif-track {
          display: flex;
          gap: ${CARD_GAP}px;
          align-items: flex-end;
          width: 100%;
          height: 100%;
        }

        .wif-card {
          border-radius: 16px;
          position: relative;
          overflow: hidden;
          cursor: pointer;
          /* All transitions on the same timing — no layout jump */
          transition:
            flex 0.55s cubic-bezier(0.4, 0, 0.2, 1),
            max-width 0.55s cubic-bezier(0.4, 0, 0.2, 1),
            height 0.55s cubic-bezier(0.4, 0, 0.2, 1),
            opacity 0.4s ease,
            transform 0.3s ease,
            box-shadow 0.3s ease;
          min-width: 0;
          will-change: flex, height, opacity;
        }

        .wif-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 48px rgba(0,0,0,0.22);
        }

        .wif-card-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.15;
          color: #fff;
          pointer-events: none;
        }

        .wif-card-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          padding: 4px 10px;
          border-radius: 999px;
          background: rgba(255,255,255,0.15);
          border: 1px solid rgba(255,255,255,0.25);
          color: #fff;
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 1.2px;
          text-transform: uppercase;
          font-family: var(--font-geist), sans-serif;
          backdrop-filter: blur(6px);
        }

        .wif-card-stat {
          position: absolute;
          top: 12px;
          right: 14px;
          font-family: 'Bebas Neue', sans-serif;
          font-size: 28px;
          color: rgba(255,255,255,0.9);
          line-height: 1;
        }

        .wif-card-bottom {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 60px 18px 22px;
          background: linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%);
        }

        .wif-card-title {
          font-family: var(--font-geist), sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 5px;
          line-height: 1.25;
        }

        .wif-card-sub {
          font-family: var(--font-geist), sans-serif;
          font-size: 12px;
          color: rgba(255,255,255,0.65);
          margin: 0;
        }

        .wif-arrows {
          display: flex;
          gap: 10px;
          margin-top: 18px;
          justify-content: flex-end;
        }

        .wif-arrow {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1.5px solid #ccc;
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.2s;
          color: #111;
        }
        .wif-arrow:hover:not(:disabled) {
          background: #111;
          border-color: #111;
          color: #fff;
          transform: scale(1.05);
        }
        .wif-arrow:disabled { opacity: 0.3; cursor: default; }

        .wif-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          border-top: 1px solid #ddd;
          margin-top: 56px;
          width: 100%;
        }

        .wif-stat {
          padding: 28px 0 0;
          text-align: center;
        }

        .wif-stat-num {
          font-family: 'Bebas Neue', sans-serif;
          font-size: 36px;
          color: #111;
          line-height: 1;
          display: block;
        }

        .wif-stat-label {
          font-family: var(--font-geist), sans-serif;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.4px;
          color: #999;
          margin-top: 6px;
          display: block;
        }

        /* Fade-up animation */
        .wif-fadein {
          opacity: 0;
          transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .wif-fadein.visible {
          opacity: 1;
          transform: translateY(0);
        }

        @media (max-width: 860px) {
          .wif-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .wif-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 0;
          }
          .wif-stat {
            border-bottom: 1px solid #eee;
          }
        }

        @media (max-width: 480px) {
          .wif-stats {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>

      <section ref={sectionRef} className="wif-section">
        <div className={`wif-grid wif-fadein${visible ? ' visible' : ''}`}>
          {/* Left column */}
          <div style={{ paddingTop: 8 }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '7px 13px',
              borderRadius: 999,
              background: 'rgba(232,67,26,.08)',
              border: '1px solid rgba(232,67,26,.22)',
              color: 'var(--accent)',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: 20,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              Where It&apos;s Used
            </div>
            <h2 className="wif-headline hero-display">
              Server Room.<br />
              Stage Floor.<br />
              <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Hotel Room.</span>
            </h2>
            <p className="wif-desc">
              Extngo fits wherever cables need to run and retract. Built for pros who can&apos;t afford downtime or trip hazards.
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button className="btn btn-primary" style={{ fontSize: 14, padding: '13px 32px' }}>
                Shop Now
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                </svg>
              </button>
              <button className="btn btn-ghost" style={{ fontSize: 14, padding: '13px 32px' }}>
                See All Use Cases
              </button>
            </div>
          </div>

          {/* Right column — carousel */}
          <div>
            <div className="wif-carousel-wrap">
              <div className="wif-track">
                {CARDS.map((card, i) => {
                  const isActive = i === active
                  const inWindow = i >= windowStart && i <= windowEnd
                  return (
                    <div
                      key={i}
                      className="wif-card"
                      style={{
                        flex: !inWindow ? '0 0 0' : isActive ? '3 0 0' : '1 0 0',
                        maxWidth: !inWindow ? 0 : undefined,
                        height: isActive ? CARD_HEIGHT : CARD_HEIGHT * 0.78,
                        opacity: inWindow ? 1 : 0,
                        background: card.bg,
                        pointerEvents: inWindow ? 'auto' : 'none',
                      }}
                      onClick={() => inWindow && setActive(i)}
                      role="button"
                      tabIndex={inWindow ? 0 : -1}
                      aria-label={card.title}
                      onKeyDown={e => e.key === 'Enter' && inWindow && setActive(i)}
                    >
                      {card.image ? (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          backgroundImage: `url(${card.image})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
                          transform: isActive ? 'scale(1.04)' : 'scale(1)',
                        }} />
                      ) : (
                        <div
                          className="wif-card-icon"
                          style={{
                            transform: `translate(-50%, -50%) scale(${isActive ? 1.8 : 1})`,
                            transition: 'transform 0.55s cubic-bezier(0.4,0,0.2,1)',
                          }}
                        >
                          {card.icon}
                        </div>
                      )}
                      {card.image && (
                        <div style={{
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%)',
                          zIndex: 1,
                        }} />
                      )}
                      <div className="wif-card-badge" style={{ zIndex: 2 }}>{card.badge}</div>
                      <div className="wif-card-stat" style={{ fontSize: isActive ? 38 : 22, transition: 'font-size 0.55s cubic-bezier(0.4,0,0.2,1)', zIndex: 2 }}>{card.stat}</div>
                      <div className="wif-card-bottom" style={{ zIndex: 2 }}>
                        <p className="wif-card-title">{card.title}</p>
                        <p className="wif-card-sub">{card.sub}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Arrow nav */}
            <div className="wif-arrows">
              <button className="wif-arrow" onClick={prev} disabled={active === 0} aria-label="Previous">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6"/>
                </svg>
              </button>
              <button className="wif-arrow" onClick={next} disabled={active === CARDS.length - 1} aria-label="Next">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6"/>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Stats strip */}
        <div className="wif-stats">
          {STATS.map((s, i) => (
            <div
              key={i}
              className={`wif-stat wif-fadein${visible ? ' visible' : ''}`}
              style={{ transitionDelay: `${0.2 + i * 0.1}s` }}
            >
              <span className="wif-stat-num">{s.number}</span>
              <span className="wif-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
