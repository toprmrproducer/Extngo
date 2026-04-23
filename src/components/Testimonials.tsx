'use client'

import { useRef, useState } from 'react'
import { m, LazyMotion, domAnimation, useInView } from 'framer-motion'
import { fadeUp, staggerContainer } from '@/lib/motion'

// ── Stars ────────────────────────────────────────────────────────────────────
function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-2.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={i < count ? '#F5C518' : '#ddd'} stroke="none">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  )
}

// ── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, size = 36 }: { name: string; size?: number }) {
  const initials = name.split(' ').map(n => n[0]).join('').slice(0, 2)
  const hue = name.charCodeAt(0) * 17 % 360
  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      background: `hsl(${hue},55%,72%)`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: size * 0.36, fontWeight: 700,
      color: `hsl(${hue},55%,28%)`,
      flexShrink: 0, letterSpacing: '-0.02em',
    }}>
      {initials}
    </div>
  )
}

// ── Video card ───────────────────────────────────────────────────────────────
function VideoTestimonialCard({ delay }: { delay: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)
  const [muted, setMuted] = useState(true)
  const [hovered, setHovered] = useState(false)

  const toggle = () => {
    const v = videoRef.current
    if (!v) return
    if (playing) { v.pause(); setPlaying(false) }
    else { v.play(); setPlaying(true) }
  }

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation()
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setMuted(v.muted)
  }

  return (
    <m.div
      variants={fadeUp}
      transition={{ delay }}
      onClick={toggle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.02 }}
      style={{
        borderRadius: 20, overflow: 'hidden', position: 'relative',
        aspectRatio: '1/1', maxHeight: 180, background: '#111',
        cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
        willChange: 'transform',
      }}
    >
      <video
        ref={videoRef}
        src="/testimonial.mp4"
        loop muted playsInline
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Overlay */}
      <m.div
        animate={{ background: playing ? 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)' : 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 100%)' }}
        transition={{ duration: 0.4 }}
        style={{ position: 'absolute', inset: 0 }}
      />

      {/* Play button — shows when paused OR hovered */}
      <m.div
        animate={{ opacity: playing && !hovered ? 0 : 1 }}
        transition={{ duration: 0.25 }}
        style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'rgba(255,255,255,0.18)',
          border: '1.5px solid rgba(255,255,255,0.45)',
          backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff" stroke="none">
            {playing ? <rect x="6" y="4" width="4" height="16" rx="1" /> : <polygon points="5 3 19 12 5 21 5 3" />}
          </svg>
        </div>
      </m.div>

      {/* Bottom info */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 16px', display: 'flex', alignItems: 'flex-end',
        justifyContent: 'space-between', zIndex: 2,
      }}>
        <div>
          <div className="flex gap-0.5 mb-1.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#F5C518" stroke="none">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            ))}
          </div>
          <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>Marcus Reid</p>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: 0 }}>Network Engineer</p>
        </div>
        <m.button
          onClick={toggleMute}
          whileTap={{ scale: 0.9 }}
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.25)',
            backdropFilter: 'blur(6px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: '#fff',
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
        </m.button>
      </div>

      {/* Video badge */}
      <div style={{
        position: 'absolute', top: 14, left: 14,
        padding: '4px 10px', borderRadius: 999,
        background: 'rgba(232,67,26,0.85)', backdropFilter: 'blur(6px)',
        color: '#fff', fontSize: 10, fontWeight: 700,
        letterSpacing: '1.5px', textTransform: 'uppercase',
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#fff', display: 'inline-block' }} />
        Video
      </div>
    </m.div>
  )
}

// ── Testimonial card ─────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'James Harlow',     handle: '@jharlow_it',  role: 'IT Director, NovaTech',         quote: 'Ran 50ft through our server room without a single snag. The retract mechanism is buttery smooth — nothing else comes close.', rating: 5, col: 0 },
  { name: 'Priya Menon',      handle: '@priya.av',    role: 'AV Specialist',                  quote: 'I really appreciate how clean the install looks. No more gaffer tape over cables in conference rooms.', rating: 5, col: 1, featured: true },
  { name: 'Linda Shaw',       handle: '@lindashaw',   role: 'Event Producer',                 quote: 'Set up and struck in under 10 minutes at a trade show. Game changer for live events.', rating: 5, col: 2, portrait: true },
  { name: 'Victoria Weston',  handle: '@v.weston',    role: 'Facilities Manager, Meridian',   quote: 'We replaced all our under-carpet runs with Extngo. Zero complaints from staff, zero trip hazards. The flat profile is genuinely impressive.', rating: 5, col: 0 },
  { name: 'Henry Vane',       handle: '@henryvane',   role: 'Co-Founder, Loremipsum Co.',     quote: 'Best CAT6 I\'ve used. The retract is satisfying every single time.', rating: 4, col: 2 },
  { name: 'Elizabeth Hallward', handle: '@e.hallward', role: 'Office Manager',                quote: 'Ordered three for our open-plan office. Cables are finally invisible. Worth every penny.', rating: 5, col: 0 },
  { name: 'Isabella Lester',  handle: '@isabella.l',  role: 'Home Office Setup',              quote: 'Clean desk, clean mind. Extngo made my WFH setup look professional.', rating: 5, col: 1 },
  { name: 'Basil Hallward',   handle: '@basil.h',     role: 'Co-Founder, Example.com',        quote: '"The build quality is exceptional. Feels like it was designed by someone who actually runs cable for a living."', rating: 5, col: 2 },
]

function TestimonialCard({ t, delay }: { t: typeof TESTIMONIALS[0]; delay: number }) {
  const isFeatured = (t as any).featured
  const isPortrait = (t as any).portrait

  return (
    <m.div
      variants={fadeUp}
      transition={{ delay }}
      whileHover={{ y: -3, boxShadow: isFeatured ? '0 32px 80px rgba(0,0,0,0.28)' : '0 8px 32px rgba(0,0,0,0.1)' }}
      style={{
        background: isFeatured ? '#1A1A1A' : '#fff',
        color: isFeatured ? '#fff' : 'var(--ink)',
        borderRadius: 20,
        padding: isPortrait ? 0 : isFeatured ? '20px 22px 18px' : '16px 18px 14px',
        boxShadow: isFeatured ? '0 24px 64px rgba(0,0,0,0.18)' : '0 2px 16px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.05)',
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: isPortrait ? 'flex-end' : 'space-between',
        minHeight: isPortrait ? 200 : isFeatured ? 160 : 'auto',
        willChange: 'transform',
        cursor: 'default',
      }}
    >
      {/* Portrait */}
      {isPortrait && (
        <>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(/more.jpg)', backgroundSize: 'cover', backgroundPosition: 'center top', filter: 'grayscale(20%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 55%)' }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '18px 20px 20px' }}>
            <Stars count={t.rating} />
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.55, margin: '0 0 14px' }}>{t.quote}</p>
            <div className="flex items-center gap-2.5">
              <Avatar name={t.name} size={32} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>{t.name}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', margin: 0 }}>{t.handle}</p>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Featured */}
      {isFeatured && !isPortrait && (
        <>
          <div style={{ position: 'absolute', bottom: 16, right: 20, fontFamily: 'Georgia,serif', fontSize: 120, lineHeight: 1, color: 'rgba(255,255,255,0.06)', pointerEvents: 'none', userSelect: 'none' }}>&ldquo;</div>
          <div className="flex items-center gap-3 mb-4">
            <Avatar name={t.name} size={44} />
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: '#fff', margin: 0 }}>{t.name}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', margin: 0 }}>{t.handle}</p>
            </div>
          </div>
          <Stars count={t.rating} />
          <p style={{ fontSize: 17, fontWeight: 500, lineHeight: 1.55, color: 'rgba(255,255,255,0.92)', margin: 0 }}>{t.quote}</p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', marginTop: 16 }}>{t.role}</p>
        </>
      )}

      {/* Standard */}
      {!isFeatured && !isPortrait && (
        <>
          <div>
            <Stars count={t.rating} />
            <p style={{ fontSize: 13.5, lineHeight: 1.6, color: '#2A2A2A', margin: '0 0 16px' }}>{t.quote}</p>
          </div>
          <div className="flex items-center gap-2.5">
            <Avatar name={t.name} size={34} />
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--ink)', margin: 0 }}>{t.name}</p>
              <p style={{ fontSize: 11, color: '#999', margin: 0 }}>{t.role}</p>
            </div>
          </div>
        </>
      )}
    </m.div>
  )
}

// ── Main export ──────────────────────────────────────────────────────────────
export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { once: true, margin: '-8% 0px' })

  const col0 = TESTIMONIALS.filter(t => t.col === 0)
  const col1 = TESTIMONIALS.filter(t => t.col === 1)
  const col2 = TESTIMONIALS.filter(t => t.col === 2)

  const getDelay = (t: typeof TESTIMONIALS[0]) => 0.05 + TESTIMONIALS.indexOf(t) * 0.07

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        style={{
          background: '#F0EDE8',
          padding: 'clamp(40px,5vh,64px) clamp(24px,5vw,80px)',
          overflow: 'hidden',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {/* Header */}
        <m.div
          className="text-center mb-8"
          variants={staggerContainer(0.1, 0)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <m.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full mb-4"
            style={{
              padding: '6px 14px',
              background: 'rgba(232,67,26,.08)',
              border: '1px solid rgba(232,67,26,.2)',
              color: 'var(--accent)',
              fontSize: 11, fontWeight: 600,
              letterSpacing: '2px', textTransform: 'uppercase',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
            Customer Reviews
          </m.div>

          <m.h2
            variants={fadeUp}
            className="font-display"
            style={{
              fontSize: 'clamp(28px,3vw,44px)',
              fontWeight: 800, letterSpacing: '-0.035em',
              lineHeight: 1.05, color: 'var(--ink)', margin: '0 0 10px',
            }}
          >
            Trusted by Pros<br />
            <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Everywhere.</span>
          </m.h2>

          <m.p
            variants={fadeUp}
            style={{ fontSize: 14, color: '#666', maxWidth: 440, margin: '0 auto', lineHeight: 1.5 }}
          >
            From server rooms to stage floors — here&apos;s what people are saying about Extngo.
          </m.p>
        </m.div>

        {/* Masonry grid */}
        <m.div
          variants={staggerContainer(0.07, 0.1)}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid gap-3"
          style={{ gridTemplateColumns: 'repeat(3, 1fr)', alignItems: 'start' }}
        >
          {/* Col 0 */}
          <div className="flex flex-col gap-3">
            {col0.map(t => <TestimonialCard key={t.name} t={t} delay={getDelay(t)} />)}
          </div>

          {/* Col 1 — offset + video */}
          <div className="flex flex-col gap-3" style={{ marginTop: 20 }}>
            <VideoTestimonialCard delay={0.1} />
            {col1.map(t => <TestimonialCard key={t.name} t={t} delay={getDelay(t)} />)}
          </div>

          {/* Col 2 — offset */}
          <div className="flex flex-col gap-3" style={{ marginTop: 10 }}>
            {col2.map(t => <TestimonialCard key={t.name} t={t} delay={getDelay(t)} />)}
          </div>
        </m.div>
      </section>
    </LazyMotion>
  )
}
