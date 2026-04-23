'use client'

import ExtngoLogo from './ExtngoLogo'

interface NavBarProps {
  delayBase?: number
}

export default function NavBar({ delayBase = 0.05 }: NavBarProps) {
  const links = ['Home', 'Products', 'Reviews', 'About', 'Contact']

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '22px 40px',
        position: 'relative',
        zIndex: 5,
      }}
    >
      <div className="anim-fade-down" style={{ animationDelay: `${delayBase}s` }}>
        <ExtngoLogo size={23} isDark={true} />
      </div>
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
              color: 'rgba(255,255,255,0.75)'
            }}
          >
            {l}
          </a>
        ))}
      </div>
      <button
        className="anim-fade-down btn btn-ghost"
        style={{ 
          animationDelay: `${delayBase + 0.5}s`, 
          padding: '10px 18px', 
          fontSize: 13,
          background: 'rgba(255,255,255,.08)',
          color: '#FFFFFF',
          border: '1px solid rgba(255,255,255,.15)',
        }}
      >
        <svg
          width="14"
          height="14"
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
    </nav>
  )
}
