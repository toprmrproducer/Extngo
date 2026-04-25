'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { m, AnimatePresence, LazyMotion, domAnimation } from 'framer-motion'
import { fadeDown, menuPanel, slideInRight, buttonTap } from '@/lib/motion'

const LINKS = [
  { label: 'Home',     href: '#' },
  { label: 'Products', href: '#product-differences' },
  { label: 'Reviews',  href: '#reviews' },
  { label: 'About',    href: '#use-cases' },
  { label: 'Contact',  href: '#contact' },
]

export default function NavBar({ delayBase = 0.05 }: { delayBase?: number }) {
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
    if (!menuOpen) return
    const close = () => setMenuOpen(false)
    window.addEventListener('scroll', close, { passive: true, once: true })
    return () => window.removeEventListener('scroll', close)
  }, [menuOpen])

  const textColor      = onHero ? 'rgba(255,255,255,0.85)' : 'rgba(26,26,26,0.85)'
  const textColorFull  = onHero ? '#FFFFFF' : '#1A1A1A'
  const borderColor    = onHero ? 'rgba(255,255,255,0.12)' : 'rgba(26,26,26,0.10)'
  const btnBg          = onHero ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.06)'
  const navBg          = onHero ? 'rgba(10,10,10,0.35)' : 'rgba(255,255,255,0.65)'
  const navBorder      = onHero ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.08)'
  const menuBg         = onHero ? 'rgba(10,10,10,0.92)' : 'rgba(255,255,255,0.92)'

  return (
    <LazyMotion features={domAnimation}>
      {/* ── Main nav bar ── */}
      <m.nav
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'clamp(14px,2.5vh,22px) clamp(20px,5vw,40px)',
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 100,
          background: navBg,
          backdropFilter: 'blur(18px) saturate(180%)',
          WebkitBackdropFilter: 'blur(18px) saturate(180%)',
          borderBottom: `1px solid ${navBorder}`,
          transition: 'background 0.35s cubic-bezier(0.25,0.46,0.45,0.94), border-color 0.35s cubic-bezier(0.25,0.46,0.45,0.94)',
        }}
      >
        {/* Logo */}
        <m.div
          variants={fadeDown}
          initial="hidden"
          animate="visible"
          transition={{ delay: delayBase }}
          style={{ position: 'relative', zIndex: 2 }}
        >
          <Image
            src="/logo.png"
            alt="Extngo"
            width={110}
            height={36}
            style={{ objectFit: 'contain', transition: 'filter 0.35s ease' }}
            sizes="(max-width: 480px) 90px, 110px"
            priority
          />
        </m.div>

        {/* Desktop center links */}
        <div
          className="hidden md:flex gap-9 absolute left-1/2 -translate-x-1/2"
        >
          {LINKS.map((l, i) => (
            <m.a
              key={l.label}
              href={l.href}
              className={`navlink ${i === 0 ? 'active' : ''}`}
              style={{ color: textColor, transition: 'color 0.35s ease, opacity 0.2s' }}
              variants={fadeDown}
              initial="hidden"
              animate="visible"
              transition={{ delay: delayBase + 0.08 + i * 0.07 }}
            >
              {l.label}
            </m.a>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3" style={{ position: 'relative', zIndex: 2 }}>
          {/* Desktop CTA */}
          <m.button
            className="hidden md:inline-flex items-center gap-2.5 rounded-full font-medium text-sm cursor-pointer border"
            style={{
              padding: '10px 18px',
              fontSize: 13,
              background: btnBg,
              color: textColorFull,
              borderColor: borderColor,
              transition: 'background 0.35s ease, color 0.35s ease, border-color 0.35s ease',
            }}
            variants={fadeDown}
            initial="hidden"
            animate="visible"
            transition={{ delay: delayBase + 0.5 }}
            whileHover={{ y: -2 }}
            whileTap={buttonTap}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
            B2B Inquiry
          </m.button>

          {/* Hamburger — mobile only */}
          <m.button
            className="flex md:hidden flex-col justify-center items-center gap-[5px] w-10 h-10 bg-transparent border-none cursor-pointer p-2 rounded-lg"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            whileTap={{ scale: 0.9 }}
          >
            <span style={{
              display: 'block', width: 22, height: 2,
              background: textColorFull, borderRadius: 2,
              transition: 'background 0.35s, transform 0.25s',
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: 22, height: 2,
              background: textColorFull, borderRadius: 2,
              transition: 'background 0.35s, opacity 0.25s',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: 22, height: 2,
              background: textColorFull, borderRadius: 2,
              transition: 'background 0.35s, transform 0.25s',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </m.button>
        </div>
      </m.nav>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {menuOpen && (
          <m.div
            key="mobile-menu"
            variants={menuPanel}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0,
              zIndex: 99,
              background: menuBg,
              backdropFilter: 'blur(24px) saturate(180%)',
              WebkitBackdropFilter: 'blur(24px) saturate(180%)',
              padding: 'clamp(70px,10vh,88px) clamp(20px,5vw,32px) 32px',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
          >
            {LINKS.map((l, i) => (
              <m.a
                key={l.label}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                custom={i}
                variants={slideInRight}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="mobile-menu-link"
                style={{
                  padding: '14px 0',
                  fontSize: 20,
                  fontWeight: 600,
                  color: onHero ? '#FFFFFF' : '#1A1A1A',
                  textDecoration: 'none',
                  borderBottom: `1px solid ${onHero ? 'rgba(255,255,255,0.08)' : 'rgba(26,26,26,0.08)'}`,
                }}
              >
                {l.label}
              </m.a>
            ))}

            <m.button
              className="flex items-center justify-center gap-2.5 rounded-full font-semibold cursor-pointer border-0 mt-5"
              style={{
                padding: '14px 22px',
                fontSize: 15,
                background: 'var(--accent)',
                color: '#fff',
                boxShadow: '0 8px 24px -8px rgba(232,67,26,.55)',
              }}
              onClick={() => setMenuOpen(false)}
              variants={fadeDown}
              initial="hidden"
              animate="visible"
              transition={{ delay: LINKS.length * 0.06 + 0.05 }}
              whileTap={buttonTap}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              B2B Inquiry
            </m.button>
          </m.div>
        )}
      </AnimatePresence>
    </LazyMotion>
  )
}
