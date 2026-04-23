'use client'

import { useEffect, useRef, useState } from 'react'

function VideoTestimonialCard({ delay, visible }: { delay: number; visible: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) {
      v.pause()
      setPlaying(false)
    } else {
      v.play()
      setPlaying(true)
    }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <div
      className="tm-card"
      onClick={toggle}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.2,0.8,0.2,1) ${delay}s`,
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        aspectRatio: '1/1',
        maxHeight: 180,
        background: '#111',
        cursor: 'pointer',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
      }}
    >
      <video
        ref={videoRef}
        src="/testimonial.mp4"
        loop
        muted
        playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: playing
          ? 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)'
          : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 100%)',
        transition: 'background 0.4s ease',
      }} />

      {/* Play / Pause button */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: playing ? 0 : 1,
        transition: 'opacity 0.3s ease',
      }}>
        <div style={{
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
          border: '1.5px solid rgba(255,255,255,0.45)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="none">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      </div>

      {/* Bottom info */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: '14px 16px',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        zIndex: 2,
      }}>
        <div>
          <div style={{ display: 'flex', gap: 3, marginBottom: 6 }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#F5C518" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <p style={{ fontFamily: 'var(--font-geist)', fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>
            Marcus Reid
          </p>
          <p style={{ fontFamily: 'var(--font-geist)', fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: 0 }}>
            Network Engineer
          </p>
        </div>

        {/* Mute toggle */}
        <button
          onClick={toggleMute}
          style={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#fff',
          }}
          aria-label={muted ? 'Unmute' : 'Mute'}
        >
          {muted ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>
            </svg>
          )}
        </button>
      </div>

      {/* Video badge */}
      <div style={{
        position: 'absolute',
        top: 14,
        left: 14,
        padding: '4px 10px',
        borderRadius: 999,
        background: 'rgba(232,67,26,0.85)',
        backdropFilter: 'blur(6px)',
        color: '#fff',
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '1.5px',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-geist)',
        display: 'flex',
        alignItems: 'center',
        gap: 5,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
        Video
      </div>
    </div>
  )
}

const TESTIMONIALS = [
  {
    name: 'James Harlow',
    handle: '@jharlow_it',
    role: 'IT Director, NovaTech',
    quote: 'Ran 50ft through our server room without a single snag. The retract mechanism is buttery smooth — nothing else comes close.',
    rating: 5,
    size: 'sm',
    col: 0,
  },
  {
    name: 'Priya Menon',
    handle: '@priya.av',
    role: 'AV Specialist',
    quote: 'I really appreciate how clean the install looks. No more gaffer tape over cables in conference rooms.',
    rating: 5,
    size: 'lg',
    col: 1,
    featured: true,
  },
  {
    name: 'Linda Shaw',
    handle: '@lindashaw',
    role: 'Event Producer',
    quote: 'Set up and struck in under 10 minutes at a trade show. Game changer for live events.',
    rating: 5,
    size: 'md',
    col: 2,
    portrait: true,
  },
  {
    name: 'Victoria Weston',
    handle: '@v.weston',
    role: 'Facilities Manager, Meridian Co.',
    quote: 'We replaced all our under-carpet runs with Extngo. Zero complaints from staff, zero trip hazards. The flat profile is genuinely impressive — fits under any door threshold.',
    rating: 5,
    size: 'md',
    col: 0,
  },
  {
    name: 'Henry Vane',
    handle: '@henryvane',
    role: 'Co-Founder, Loremipsum Co.',
    quote: '"Cras fermentum odio eu feugiat pretium nibh nulla a sit" — that\'s how good this cable is. Seriously though, best CAT6 I\'ve used.',
    rating: 4,
    size: 'sm',
    col: 2,
  },
  {
    name: 'Elizabeth Hallward',
    handle: '@e.hallward',
    role: 'Office Manager',
    quote: 'Exciting job! Orci a scelerisque purus semper. At volutpat diam ut venenatis tellus in metus. Nisl vel pretium lectus quam id.',
    rating: 5,
    size: 'lg',
    col: 0,
    bottom: true,
  },
  {
    name: 'Isabella Lester',
    handle: '@isabella.l',
    role: 'Home Office Setup',
    quote: 'Sodales ut etiam sit amet nisl. Semper feugiat nibh sed pulvinar proin amet. Proinamet nulla morbi eu non gravida.',
    rating: 5,
    size: 'md',
    col: 1,
    bottom: true,
  },
  {
    name: 'Basil Hallward',
    handle: '@basil.h',
    role: 'Co-Founder, Example.com',
    quote: '"Enim lobortis scelerisque fermentum dui faucibus. Sodales ut etiam sit amet nisl. Semper feugiat nibh sed pulvinar proin gravida facilisis morbi tempus iaculis phasellus."',
    rating: 5,
    size: 'sm',
    col: 2,
    bottom: true,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: 'flex', gap: 3, marginBottom: 10 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? '#F5C518' : '#ddd'} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2)
  const hue = name.charCodeAt(0) * 17 % 360
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: `hsl(${hue}, 55%, 72%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: size * 0.36,
      fontWeight: 700,
      color: `hsl(${hue}, 55%, 28%)`,
      flexShrink: 0,
      fontFamily: 'var(--font-geist)',
      letterSpacing: '-0.02em',
    }}>
      {initials}
    </div>
  )
}

function TestimonialCard({
  t,
  delay,
  visible,
}: {
  t: typeof TESTIMONIALS[0]
  delay: number
  visible: boolean
}) {
  const isFeatured = t.featured
  const isPortrait = t.portrait

  return (
    <div
      className="tm-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(32px)',
        transition: `opacity 0.65s ease ${delay}s, transform 0.65s cubic-bezier(0.2,0.8,0.2,1) ${delay}s`,
        background: isFeatured ? '#1A1A1A' : '#fff',
        color: isFeatured ? '#fff' : 'var(--ink)',
        borderRadius: 20,
        padding: isPortrait ? 0 : isFeatured ? '20px 22px 18px' : '16px 18px 14px',
        boxShadow: isFeatured
          ? '0 24px 64px rgba(0,0,0,0.18)'
          : '0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isPortrait ? 'flex-end' : 'space-between',
        minHeight: isPortrait ? 200 : isFeatured ? 160 : 'auto',
      }}
    >
      {/* Portrait card — image fills card */}
      {isPortrait && (
        <>
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'url(/public/more.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
            filter: 'grayscale(20%)',
          }} />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)',
          }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '18px 20px 20px' }}>
            <Stars count={t.rating} />
            <p style={{
              fontFamily: 'var(--font-geist)',
              fontSize: 13,
              color: 'rgba(255,255,255,0.9)',
              lineHeight: 1.55,
              margin: '0 0 14px',
            }}>{t.quote}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Avatar name={t.name} size={32} />
              <div>
                <p style={{ fontFamily: 'var(--font-geist)', fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>{t.name}</p>
                <p style={{ fontFamily: 'var(--font-geist)', fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{t.handle}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Featured card */}
      {isFeatured && !isPortrait && (
        <>
          {/* Big quote mark */}
          <div style={{
            position: 'absolute',
            bottom: 16,
            right: 20,
            fontFamily: 'Georgia, serif',
            fontSize: 120,
            lineHeight: 1,
            color: 'rgba(255,255,255,0.06)',
            pointerEvents: 'none',
            userSelect: 'none',
          }}>&ldquo;</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Avatar name={t.name} size={44} />
            <div>
              <p style={{ fontFamily: 'var(--font-geist)', fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>{t.name}</p>
              <p style={{ fontFamily: 'var(--font-geist)', fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{t.handle}</p>
            </div>
          </div>
          <Stars count={t.rating} />
          <p style={{
            fontFamily: 'var(--font-geist)',
            fontSize: 17,
            fontWeight: 500,
            lineHeight: 1.55,
            color: 'rgba(255,255,255,0.92)',
            margin: 0,
          }}>{t.quote}</p>
          <p style={{
            fontFamily: 'var(--font-geist)',
            fontSize: 12,
            color: 'rgba(255,255,255,0.35)',
            marginTop: 16,
          }}>{t.role}</p>
        </>
      )}

      {/* Standard card */}
      {!isFeatured && !isPortrait && (
        <>
          <div>
            <Stars count={t.rating} />
            <p style={{
              fontFamily: 'var(--font-geist)',
              fontSize: 13.5,
              lineHeight: 1.6,
              color: '#2A2A2A',
              margin: '0 0 16px',
            }}>{t.quote}</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Avatar name={t.name} size={34} />
            <div>
              <p style={{ fontFamily: 'var(--font-geist)', fontSize: 13, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>{t.name}</p>
              <p style={{ fontFamily: 'var(--font-geist)', fontSize: 11, color: '#999', margin: 0 }}>{t.role}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // Split into 3 columns
  const col0 = TESTIMONIALS.filter(t => t.col === 0)
  const col1 = TESTIMONIALS.filter(t => t.col === 1)
  const col2 = TESTIMONIALS.filter(t => t.col === 2)

  const getDelay = (t: typeof TESTIMONIALS[0]) => {
    const idx = TESTIMONIALS.indexOf(t)
    return 0.05 + idx * 0.07
  }

  return (
    <>
      <style>{`
        .tm-section {
          background: #F0EDE8;
          padding: clamp(40px, 5vh, 64px) clamp(24px, 5vw, 80px);
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .tm-header {
          text-align: center;
          margin-bottom: 32px;
        }

        .tm-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          background: rgba(232,67,26,.08);
          border: 1px solid rgba(232,67,26,.2);
          color: var(--accent);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          font-family: var(--font-geist);
          margin-bottom: 18px;
        }

        .tm-headline {
          font-family: var(--font-bricolage);
          font-size: clamp(28px, 3vw, 44px);
          font-weight: 800;
          letter-spacing: -0.035em;
          line-height: 1.05;
          color: var(--ink);
          margin: 0 0 10px;
        }

        .tm-sub {
          font-family: var(--font-geist);
          font-size: 14px;
          color: #666;
          max-width: 440px;
          margin: 0 auto;
          line-height: 1.5;
        }

        .tm-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
          align-items: start;
          flex: 1;
        }

        .tm-col {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .tm-col:nth-child(2) {
          margin-top: 20px;
        }

        .tm-col:nth-child(3) {
          margin-top: 10px;
        }

        .tm-card {
          will-change: opacity, transform;
        }

        @media (max-width: 860px) {
          .tm-grid {
            grid-template-columns: 1fr 1fr;
          }
          .tm-col:nth-child(3) {
            display: none;
          }
        }

        @media (max-width: 560px) {
          .tm-grid {
            grid-template-columns: 1fr;
          }
          .tm-col:nth-child(2),
          .tm-col:nth-child(3) {
            display: none;
          }
        }
      `}</style>

      <section ref={sectionRef} className="tm-section">
        {/* Header */}
        <div
          className="tm-header"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(24px)',
            transition: 'opacity 0.7s ease, transform 0.7s ease',
          }}
        >
          <div className="tm-pill">
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
            Customer Reviews
          </div>
          <h2 className="tm-headline hero-display">
            Trusted by Pros<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Everywhere.</span>
          </h2>
          <p className="tm-sub">
            From server rooms to stage floors — here&apos;s what people are saying about Extngo.
          </p>
        </div>

        {/* Masonry grid */}
        <div className="tm-grid">
          <div className="tm-col">
            {col0.map(t => (
              <TestimonialCard key={t.name} t={t} delay={getDelay(t)} visible={visible} />
            ))}
          </div>
          <div className="tm-col">
            <VideoTestimonialCard delay={0.1} visible={visible} />
            {col1.map(t => (
              <TestimonialCard key={t.name} t={t} delay={getDelay(t)} visible={visible} />
            ))}
          </div>
          <div className="tm-col">
            {col2.map(t => (
              <TestimonialCard key={t.name} t={t} delay={getDelay(t)} visible={visible} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
