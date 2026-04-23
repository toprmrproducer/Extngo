'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

function FloatingSpec({
  label,
  value,
  angle,
  distance,
  delay,
  accent,
}: {
  label: string
  value: string
  angle: number
  distance: number
  delay: number
  accent: string
}) {
  const x = Math.cos((angle * Math.PI) / 180) * distance
  const y = Math.sin((angle * Math.PI) / 180) * distance

  return (
    <div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
        opacity: 0,
        animation: `fadeInSpec 0.7s ${delay}s ease-out forwards`,
        pointerEvents: 'none',
        zIndex: 30,
      }}
    >
      <div
        className="floating-spec"
        style={{
          padding: '8px 14px',
          borderRadius: 14,
          background: 'rgba(255, 255, 255, 0.78)',
          border: '1px solid rgba(26, 26, 26, 0.08)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          animation: `floatSpec 5s ${delay + 0.6}s ease-in-out infinite`,
          whiteSpace: 'nowrap',
          display: 'flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: 6,
            height: 6,
            borderRadius: '50%',
            background: accent,
            flexShrink: 0,
          }}
        />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div
            style={{
              fontSize: 9,
              letterSpacing: '1.6px',
              textTransform: 'uppercase',
              color: '#8A8A8A',
              fontWeight: 700,
              lineHeight: 1,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              color: '#1A1A1A',
              letterSpacing: '0.2px',
              lineHeight: 1.1,
            }}
          >
            {value}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ProductDifferences() {
  const sectionRef = useRef<HTMLElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const greenSpecs = [
    { label: 'Length', value: '33 Feet (10 Meter)', angle: 90, distance: 250 },
    { label: 'Extngo Dimensions in Inches', value: '3 × 5.1 × 6.5', angle: -150, distance: 240 },
    { label: 'Extngo Dimensions in CM', value: '7.6 × 13 × 16.5', angle: 160, distance: 235 },
    { label: 'Extngo Green Weight in LBS', value: '1.6', angle: -35, distance: 220 },
    { label: 'Extngo Green Weight in KG', value: '0.7', angle: 20, distance: 235 },
  ]

  const orangeSpecs = [
    { label: 'Length', value: '50 Feet (15 Meter)', angle: 90, distance: 250 },
    { label: 'Extngo Dimensions in Inches', value: '3 × 5.1 × 6.5', angle: -30, distance: 240 },
    { label: 'Extngo Dimensions in CM', value: '7.6 × 13 × 16.5', angle: 20, distance: 235 },
    { label: 'Extngo Orange Weight in LBS', value: '1.8', angle: -145, distance: 220 },
    { label: 'Extngo Orange Weight in KG', value: '0.8', angle: 160, distance: 235 },
  ]

  return (
    <>
      <style jsx>{`
        @keyframes floatSpec {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        @keyframes fadeInSpec {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes slideUpProduct {
          from {
            opacity: 0;
            transform: translateY(220px) scale(0.92);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .product-container {
          animation: ${isVisible ? 'slideUpProduct 1.2s cubic-bezier(0.16, 0.84, 0.44, 1) forwards' : 'none'};
          opacity: ${isVisible ? 1 : 0};
          position: relative;
          z-index: 25;
        }
      `}</style>

      <section
        ref={sectionRef}
        id="product-differences"
        style={{
          position: 'relative',
          background: '#FFFFFF',
          width: '100%',
          minHeight: '100vh',
          padding: 'clamp(80px, 12vh, 140px) clamp(28px, 6vw, 96px)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {/* Section Title */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(64px, 10vh, 100px)' }}>
          <h2
            className="hero-display"
            style={{
              margin: 0,
              fontSize: 'clamp(40px, 5vw, 64px)',
              lineHeight: 1.02,
              fontWeight: 800,
              color: 'var(--ink)',
              letterSpacing: '-0.035em',
            }}
          >
            Product <span style={{ fontStyle: 'italic', fontWeight: 400 }}>Differences</span>
          </h2>
          <p
            style={{
              margin: '16px auto 0',
              color: '#3A3A3A',
              fontSize: 17,
              lineHeight: 1.55,
              maxWidth: 560,
            }}
          >
            Compare our two models and find the perfect fit for your needs
          </p>
        </div>

        {/* Comparison Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 450px), 1fr))',
            gap: 'clamp(48px, 8vw, 120px)',
            width: '100%',
            maxWidth: 1400,
          }}
        >
          {/* Green Product - Left */}
          <div
            className="product-container"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animationDelay: '0s',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 13px',
                borderRadius: 999,
                background: 'rgba(76, 175, 80, 0.12)',
                border: '1px solid rgba(76, 175, 80, 0.25)',
                color: '#2E7D32',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: 48,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4CAF50' }} />
              EXTNGO Green
            </div>

            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 400,
                aspectRatio: '1/1',
              }}
            >
              <div
                data-product-anchor="green"
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                }}
              >
                <div
                  className="green-product-float"
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    animation: 'heroFloat 8s 1.4s ease-in-out infinite',
                    filter:
                      'drop-shadow(0 40px 60px rgba(40, 80, 40, 0.28)) drop-shadow(0 15px 25px rgba(40, 80, 40, 0.18))',
                  }}
                >
                  <Image
                    src="/product-green.png"
                    alt="Extngo Green 33ft retractable CAT6 cable reel"
                    fill
                    style={{ objectFit: 'contain' }}
                  />
                </div>
              </div>

              {/* Floating Specs */}
              {greenSpecs.map((spec, i) => (
                <FloatingSpec
                  key={i}
                  label={spec.label}
                  value={spec.value}
                  angle={spec.angle}
                  distance={spec.distance}
                  delay={0.3 + i * 0.12}
                  accent="#4CAF50"
                />
              ))}
            </div>
          </div>

          {/* Orange Product - Right (Pinned from Hero) */}
          <div
            className="product-container"
            style={{
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              animationDelay: '0.2s',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '7px 13px',
                borderRadius: 999,
                background: 'rgba(232, 67, 26, 0.08)',
                border: '1px solid rgba(232, 67, 26, 0.22)',
                color: 'var(--accent)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: 48,
              }}
            >
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent)' }} />
              EXTNGO Orange
            </div>

            <div
              style={{
                position: 'relative',
                width: '100%',
                maxWidth: 400,
                aspectRatio: '1/1',
              }}
            >
              {/* Invisible placeholder to match green product's Image space */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  height: '100%',
                }}
              >
                {/* Anchor point for pinned product - positioned exactly like green product image */}
                <div
                  data-product-anchor="orange"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                  }}
                />
              </div>

              {/* Floating Specs */}
              {orangeSpecs.map((spec, i) => (
                <FloatingSpec
                  key={i}
                  label={spec.label}
                  value={spec.value}
                  angle={spec.angle}
                  distance={spec.distance}
                  delay={0.3 + i * 0.12}
                  accent="var(--accent)"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
