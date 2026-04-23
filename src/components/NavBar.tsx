'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

interface NavBarProps {
  delayBase?: number
}

export default function NavBar({ delayBase = 0.05 }: NavBarProps) {
  const links = ['Home', 'Products', 'Reviews', 'About', 'Contact']
  const [onHero, setOnHero] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const check = () => setOnHero(window.scrollY < window.innerHeight * 0.85)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  // Close menu on scroll
  useEffect(() => {
    if (menuOpen) {
      const close = () => setMenuOpen(false)
      window.addEventListener('scroll', close, { passive: true, once: true })
      return () => window.removeEventListener('scroll', close)
    }
  }, [menuOpen])

  const textColor = onHero ? 'rgba(255,255,255,0.85)' : 'rgba(26,26,26,0.85)'
  const textColorActive = onHero ? '#FFFFFF' : '#1A1A1A'
  const borderColor = onHero ? 'rgba(255,255,255,0.12)' : 'rgba(26,26,26,0.10)'
  const btnBg = onHero ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.06)'
  const menuBg = onHero ? 'rgba(10,10,10,0.85)' : 'rgba(255,255,255,0.85)'
  const navBg = onHero ? 'rgba(10,10,10,0.35)' : 'rgba(255,255,255,0.65)'
  const navBorder = onHero ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.08)'

  return (
    <>
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '22px 40px',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          background: navBg,
          backdropFilter: 'blur(18px) saturate(180%)',
          WebkitBackdropFilter: 'blur(18px) saturate(180%)',
          borderBottom: `1px solid ${navBorder}`,
          transition: 'background 0.35s ease, border-color 0.35s ease',
        }}
      >
        {/* Logo */}
        <div className="anim-fade-down" style={{ animationDelay: `${delayBase}s`, position: 'relative', zIndex: 2 }}>
          <Image
            src="/logo.png"
            alt="Extngo"
            width={110}
            height={36}
            style={{ objectFit: 'contain', transition: 'filter 0.35s ease' }}
            priority
          />
        </div>

        {/* Desktop center links */}
        <div
          className="nav-center"
          style={{
            display: 'flex',
            gap: 36,
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          {links.map((l, i) => (
            <a
              key={l}
              href="#"
              className={`navlink anim-fade-down ${i === 0 ? 'active' : ''}`}
              style={{
                animationDelay: `${delayBase + 0.08 + i * 0.07}s`,
                color: textColor,
                transition: 'color 0.35s ease, opacity 0.2s',
              }}
            >
              {l}
            </a>
          ))}
        </div>

        {/* Desktop CTA + Mobile hamburger */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, position: 'relative', zIndex: 2 }}>
          {/* Desktop CTA */}
          <button
            className="anim-fade-down btn btn-ghost nav-cta"
            style={{
              animationDelay: `${delayBase + 0.5}s`,
              padding: '10px 18px',
              fontSize: 13,
              background: btnBg,
              color: textColorActive,
              border: `1px solid ${borderColor}`,
              transition: 'background 0.35s ease, color 0.35s ease, border-color 0.35s ease',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            B2B Inquiry
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="nav-hamburger"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            style={{
              display: 'none',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
              width: 40,
              height: 40,
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              borderRadius: 8,
            }}
          >
            <span style={{ display: 'block', width: 22, height: 2, background: textColorActive, borderRadius: 2, transition: 'background 0.35s, transform 0.25s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: 22, height: 2, background: textColorActive, borderRadius: 2, transition: 'background 0.35s, opacity 0.25s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: 22, height: 2, background: textColorActive, borderRadius: 2, transition: 'background 0.35s, transform 0.25s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div
        className="nav-mobile-menu"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99,
          background: menuBg,
          backdropFilter: 'blur(24px) saturate(180%)',
          WebkitBackdropFilter: 'blur(24px) saturate(180%)',
          padding: '88px 32px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-110%)',
          transition: 'transform 0.35s cubic-bezier(0.2,0.7,0.2,1), background 0.35s ease',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {links.map((l, i) => (
          <a
            key={l}
            href="#"
            onClick={() => setMenuOpen(false)}
            style={{
              padding: '14px 0',
              fontSize: 20,
              fontWeight: 600,
              color: onHero ? '#FFFFFF' : '#1A1A1A',
              textDecoration: 'none',
              borderBottom: `1px solid ${onHero ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.08)'}`,
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateY(0)' : 'translateY(-8px)',
              transition: `opacity 0.3s ${0.05 + i * 0.05}s, transform 0.3s ${0.05 + i * 0.05}s`,
            }}
          >
            {l}
          </a>
        ))}
        <button
          className="btn btn-primary"
          style={{ marginTop: 20, justifyContent: 'center', fontSize: 15 }}
          onClick={() => setMenuOpen(false)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          B2B Inquiry
        </button>
      </div>
    </>
  )
}
