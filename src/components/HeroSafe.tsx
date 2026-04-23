'use client'

import HeroScene from './HeroScene'
import GiantWordmark from './GiantWordmark'
import Word from './Word'

interface HeroSafeProps {
  animKey?: number
  showWordmark?: boolean
  wordmarkTone?: 'light' | 'dark'
}

export default function HeroSafe({ animKey = 0, showWordmark = true, wordmarkTone = 'dark' }: HeroSafeProps) {
  return (
    <div
      key={animKey}
      className="hero-root hero-live"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#0A0A0A',
      }}
    >
      <HeroScene />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(10,10,10,.96) 0%, rgba(10,10,10,.88) 28%, rgba(10,10,10,.6) 48%, rgba(10,10,10,.25) 65%, rgba(10,10,10,0) 82%)',
          zIndex: 2,
        }}
      />

      <div style={{ position: 'absolute', inset: 0, zIndex: 3 }}>
        <GiantWordmark shown={showWordmark} tone={wordmarkTone} />
      </div>

      <span className="bracket tl" style={{ opacity: 0.3 }} />
      <span className="bracket tr" style={{ opacity: 0.3 }} />
      <span className="bracket bl" style={{ opacity: 0.3 }} />
      <span className="bracket br" style={{ opacity: 0.3 }} />

      <div
        data-product-anchor="hero"
        style={{
          position: 'absolute',
          right: 'clamp(120px, 14vw, 240px)',
          bottom: 'clamp(24px, 4vw, 64px)',
          width: 'clamp(180px, 22vw, 340px)',
          aspectRatio: '1/1',
          zIndex: 3,
          pointerEvents: 'none',
        }}
      />

      <div style={{ position: 'relative', zIndex: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
        {/* spacer for fixed nav */}
        <div style={{ height: 72 }} />

        <div
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            padding: '0 clamp(28px, 6vw, 96px)',
          }}
        >
          <div style={{ maxWidth: 720 }}>
            <div
              className="anim-fade-up"
              style={{
                animationDelay: '.35s',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '8px 14px',
                borderRadius: 999,
                background: 'rgba(232,67,26,.15)',
                border: '1px solid rgba(232,67,26,.35)',
                color: 'var(--accent)',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: 28,
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  boxShadow: '0 0 0 4px rgba(232,67,26,.3)',
                }}
              />
              New · 50ft CAT6 Reel
            </div>

            <h1
              className="hero-headline hero-display"
              style={{
                margin: 0,
                fontSize: 'clamp(44px, 5vw, 68px)',
                lineHeight: 1.02,
                fontWeight: 800,
                color: '#FFFFFF',
                letterSpacing: '-0.03em',
              }}
            >
              <div style={{ overflow: 'hidden' }}>
                <Word delay={0.45}>Never</Word>
              </div>
              <div style={{ overflow: 'hidden' }}>
                <Word delay={0.6}>lose&nbsp;your</Word>
              </div>
              <div style={{ overflow: 'hidden', marginTop: 4 }}>
                <Word delay={0.95} className="orange-sweep">
                  network&nbsp;again
                </Word>
              </div>
            </h1>

            <p
              className="hero-sub anim-fade-up"
              style={{
                animationDelay: '1.25s',
                margin: '24px 0 0',
                maxWidth: 520,
                color: 'rgba(255,255,255,0.75)',
                fontSize: 16,
                lineHeight: 1.55,
                fontWeight: 400,
              }}
            >
              The world&apos;s first retractable flat ethernet cable reel.
              <br />
              50ft CAT6, zero tangles, zero trip hazards.
            </p>

            <div
              className="hero-cta-row anim-fade-up"
              style={{
                animationDelay: '1.5s',
                display: 'flex',
                gap: 14,
                marginTop: 36,
                flexWrap: 'wrap',
              }}
            >
              <button 
                className="btn btn-primary"
                style={{
                  background: 'var(--accent)',
                  color: '#FFFFFF',
                  border: 'none',
                  padding: '16px 28px',
                  fontSize: 16,
                  fontWeight: 600,
                  boxShadow: '0 10px 30px rgba(232,67,26,.4), 0 0 0 1px rgba(232,67,26,.3)',
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                Shop on Amazon
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ marginLeft: 2 }}
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
              <button 
                className="btn btn-ghost"
                style={{
                  background: 'rgba(255,255,255,.1)',
                  color: '#FFFFFF',
                  border: '1.5px solid rgba(255,255,255,.25)',
                  padding: '15px 26px',
                  fontSize: 16,
                  fontWeight: 600,
                  backdropFilter: 'blur(10px)',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                B2B Inquiry
              </button>
            </div>

            <div
              className="anim-fade-up"
              style={{
                animationDelay: '1.75s',
                display: 'flex',
                gap: 28,
                marginTop: 42,
                color: 'rgba(255,255,255,0.6)',
                fontSize: 13,
                flexWrap: 'wrap',
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'inline-flex', gap: 1 }}>
                  {[0, 1, 2, 3, 4].map((i) => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#E8431A">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </span>
                <span style={{ color: '#FFFFFF', fontWeight: 600 }}>4.9</span>
                <span>· 1,284 reviews</span>
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                Free shipping · 30-day returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
