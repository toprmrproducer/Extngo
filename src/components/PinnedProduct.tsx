'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'

export default function PinnedProduct() {
  const wrapRef = useRef<HTMLDivElement>(null)
  const innerRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    const wrap = wrapRef.current
    const inner = innerRef.current
    if (!wrap || !inner) return

    const update = () => {
      const heroA = document.querySelector('[data-product-anchor="hero"]')
      const detailA = document.querySelector('[data-product-anchor="detail"]')
      const orangeA = document.querySelector('[data-product-anchor="orange"]')
      const detailSection = document.getElementById('product-detail')
      const diffSection = document.getElementById('product-differences')

      let x: number, y: number, w: number, h: number

      if (heroA && detailA && orangeA) {
        const hr = heroA.getBoundingClientRect()
        const dr = detailA.getBoundingClientRect()
        const or = orangeA.getBoundingClientRect()
        const vh = window.innerHeight
        
        // Hero to Detail transition
        const start1 = vh * 0.8
        const end1 = vh * 0.3
        let p1 = 0
        if (dr.top <= start1) {
          p1 = (start1 - dr.top) / (start1 - end1)
        }
        p1 = Math.max(0, Math.min(1, p1))
        
        // Detail to Differences transition
        const start2 = vh * 1.0
        const end2 = vh * 0.5
        let p2 = 0
        if (or.top <= start2 && p1 >= 1) {
          p2 = (start2 - or.top) / (start2 - end2)
        }
        p2 = Math.max(0, Math.min(1, p2))
        
        // Enhanced easing for smoother animation
        const e1 = p1 < 0.5 
          ? 4 * p1 * p1 * p1 
          : 1 - Math.pow(-2 * p1 + 2, 3) / 2
        
        const e2 = p2 < 0.5 
          ? 4 * p2 * p2 * p2 
          : 1 - Math.pow(-2 * p2 + 2, 3) / 2

        if (p2 > 0) {
          // Transitioning from detail to differences
          const dx = dr.left + (or.left - dr.left) * e2
          const dy = dr.top + (or.top - dr.top) * e2
          const dw = dr.width + (or.width - dr.width) * e2
          const dh = dr.height + (or.height - dr.height) * e2
          x = dx
          y = dy
          w = dw
          h = dh
        } else {
          // Transitioning from hero to detail
          x = hr.left + (dr.left - hr.left) * e1
          y = hr.top + (dr.top - hr.top) * e1
          w = hr.width + (dr.width - hr.width) * e1
          h = hr.height + (dr.height - hr.height) * e1
        }
      } else if (detailA && orangeA) {
        const dr = detailA.getBoundingClientRect()
        const or = orangeA.getBoundingClientRect()
        const vh = window.innerHeight
        const start = vh * 1.0
        const end = vh * 0.5
        let p = 0
        if (or.top <= start) {
          p = (start - or.top) / (start - end)
        }
        p = Math.max(0, Math.min(1, p))
        const e = p < 0.5 
          ? 4 * p * p * p 
          : 1 - Math.pow(-2 * p + 2, 3) / 2
        
        x = dr.left + (or.left - dr.left) * e
        y = dr.top + (or.top - dr.top) * e
        w = dr.width + (or.width - dr.width) * e
        h = dr.height + (or.height - dr.height) * e
      } else if (detailA) {
        const dr = detailA.getBoundingClientRect()
        x = dr.left
        y = dr.top
        w = dr.width
        h = dr.height
      } else if (orangeA) {
        const or = orangeA.getBoundingClientRect()
        x = or.left
        y = or.top
        w = or.width
        h = or.height
      } else {
        wrap.style.opacity = '0'
        wrap.style.visibility = 'hidden'
        return
      }

      wrap.style.transform = `translate3d(${x}px, ${y}px, 0)`
      wrap.style.width = `${w}px`
      wrap.style.height = `${h}px`

      // Hide when past differences section
      if (diffSection) {
        const sr = diffSection.getBoundingClientRect()
        const past = sr.bottom <= 0
        wrap.style.opacity = past ? '0' : '1'
        wrap.style.visibility = past ? 'hidden' : 'visible'
      } else if (detailSection) {
        const sr = detailSection.getBoundingClientRect()
        const past = sr.bottom <= 0
        wrap.style.opacity = past ? '0' : '1'
        wrap.style.visibility = past ? 'hidden' : 'visible'
      } else {
        wrap.style.opacity = '1'
        wrap.style.visibility = 'visible'
      }

      if (!wrap.dataset.ready && w > 0) {
        wrap.dataset.ready = '1'
        inner.style.animation = 'pinnedProductIn 1.2s .3s cubic-bezier(.16,.84,.44,1) forwards'
      }
    }

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(update)
    }

    update()
    const t = setTimeout(update, 80)
    const t2 = setTimeout(update, 300)
    const t3 = setTimeout(update, 800)

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(rafRef.current)
      clearTimeout(t)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        zIndex: 20,
        pointerEvents: 'none',
        willChange: 'transform, width, height, opacity',
        transition: 'opacity .35s ease',
      }}
    >
      <div
        ref={innerRef}
        style={{
          width: '100%',
          height: '100%',
          opacity: 0,
          transform: 'scale(.92)',
          transition: 'transform 0.6s cubic-bezier(.16,.84,.44,1)',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            animation: 'heroFloat 8s 2s ease-in-out infinite',
            filter: 'drop-shadow(0 40px 60px rgba(60,40,20,.3)) drop-shadow(0 15px 25px rgba(60,40,20,.18))',
            transition: 'filter 0.4s ease',
          }}
        >
          <Image
            src="/product-reel.png"
            alt="Extngo 50ft retractable CAT6 cable reel"
            fill
            style={{ objectFit: 'contain' }}
          />
        </div>
      </div>
    </div>
  )
}
