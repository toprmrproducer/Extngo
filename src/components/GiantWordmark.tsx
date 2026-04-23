'use client'

import { useEffect, useRef, useState } from 'react'

interface GiantWordmarkProps {
  shown?: boolean
  tone?: 'light' | 'dark'
}

export default function GiantWordmark({ shown = true, tone = 'light' }: GiantWordmarkProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [scrollScale, setScrollScale] = useState(0.75) // Start at 75% size

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const container = el.offsetParent || el.parentElement
    if (!container) return

    let raf = 0
    const onMove = (e: MouseEvent) => {
      const r = (container as HTMLElement).getBoundingClientRect()
      const cx = e.clientX - r.left - r.width / 2
      const cy = e.clientY - r.top - r.height / 2
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setPos({ x: cx / r.width, y: cy / r.height })
      })
    }
    const onLeave = () => setPos({ x: 0, y: 0 })

    container.addEventListener('mousemove', onMove as any)
    container.addEventListener('mouseleave', onLeave)

    return () => {
      container.removeEventListener('mousemove', onMove as any)
      container.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Scroll-based scale effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const windowHeight = window.innerHeight
      // Scale from 0.75 to 1.5 as user scrolls through first viewport
      const scale = 0.75 + Math.min((scrollY / windowHeight) * 0.75, 0.75)
      setScrollScale(scale)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll() // Initial call

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!shown) return null

  const color = tone === 'light' ? 'rgba(26,26,26,1)' : 'rgba(255,255,255,1)'
  const anim = tone === 'light' ? 'heroWordmark' : 'heroWordmarkDark'
  const tx = -pos.x * 28
  const ty = -pos.y * 16

  // Gradient colors based on tone
  const gradientStart = tone === 'light' ? 'rgba(26,26,26,0)' : 'rgba(255,255,255,0)'
  const gradientEnd = tone === 'light' ? 'rgba(26,26,26,1)' : 'rgba(255,255,255,1)'

  return (
    <div
      ref={ref}
      className="giant-wordmark hero-display"
      style={{
        position: 'absolute',
        top: '84px',
        left: 0,
        right: 0,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        fontSize: '22vw',
        fontWeight: 700,
        color,
        opacity: 0,
        animation: `${anim} 1.6s .2s cubic-bezier(.2,.7,.2,1) forwards`,
        pointerEvents: 'none',
        userSelect: 'none',
        whiteSpace: 'nowrap',
        letterSpacing: '-0.07em',
        lineHeight: 0.78,
        zIndex: 1,
        willChange: 'transform',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          transform: `translate3d(${tx}px, ${ty}px, 0) scale(${scrollScale})`,
          transition: 'transform .4s cubic-bezier(.2,.7,.3,1)',
          background: `linear-gradient(to top, ${gradientStart} 0%, ${gradientEnd} 40%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        EXTNGO
      </span>
    </div>
  )
}
