'use client'

interface ExtngoLogoProps {
  size?: number
  isDark?: boolean
}

export default function ExtngoLogo({ size = 22, isDark = false }: ExtngoLogoProps) {
  const textColor = isDark ? '#FFFFFF' : 'var(--ink)'
  const textColor2 = isDark ? 'rgba(255,255,255,0.7)' : 'var(--ink-2)'
  
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        fontFamily: "var(--font-bricolage)",
        fontWeight: 700,
        fontSize: size,
        letterSpacing: '-0.01em',
      }}
    >
      <div
        style={{
          width: size * 1.05,
          height: size * 1.05,
          borderRadius: '50%',
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: size * 0.55,
          fontWeight: 700,
          boxShadow: '0 4px 12px -4px rgba(232,67,26,.6)',
          flex: '0 0 auto',
        }}
      >
        <svg width={size * 0.55} height={size * 0.55} viewBox="0 0 16 16" fill="none">
          <path
            d="M3 8h10M8 3v10M4.5 4.5l7 7M11.5 4.5l-7 7"
            stroke="#fff"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <span style={{ display: 'flex', alignItems: 'baseline', gap: 0 }}>
        <span style={{ color: textColor }}>extn</span>
        <span style={{ color: textColor }}>go</span>
        <span
          style={{
            color: textColor2,
            marginLeft: 2,
            fontWeight: 600,
            opacity: 0.7,
            fontSize: size * 0.75,
          }}
        >
          .com
        </span>
      </span>
    </div>
  )
}
