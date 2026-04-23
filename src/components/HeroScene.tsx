'use client'

import { CSSProperties } from 'react'
import Image from 'next/image'

interface HeroSceneProps {
  style?: CSSProperties
  kenBurns?: boolean
}

export default function HeroScene({ style = {}, kenBurns = true }: HeroSceneProps) {
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', ...style }}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          animation: kenBurns ? 'heroKen 14s ease-out forwards' : 'none',
          transformOrigin: '60% 55%',
        }}
      >
        <Image
          src="/hero.png"
          alt="Hero background"
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center 60%',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,.3) 0%, rgba(0,0,0,.1) 30%, rgba(0,0,0,.1) 70%, rgba(0,0,0,.25) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
