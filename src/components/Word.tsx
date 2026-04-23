'use client'

import { CSSProperties, ReactNode } from 'react'

interface WordProps {
  children: ReactNode
  delay?: number
  className?: string
  style?: CSSProperties
}

export default function Word({ children, delay = 0, className = '', style = {} }: WordProps) {
  return (
    <span className={`word ${className}`} style={style}>
      <span style={{ animationDelay: `${delay}s` }}>{children}</span>
    </span>
  )
}
