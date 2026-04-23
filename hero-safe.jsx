// Hero v1 — Safe: faithful light-theme port of the ref.
// Full-bleed desaturated product scene + text overlay on left,
// giant faded EXTNGO wordmark behind, navbar on top.

function HeroSafe({ animKey = 0, showWordmark = true, wordmarkTone = 'light' }) {
  return (
    <div key={animKey} className="hero-root hero-live" style={{
      position:'relative',width:'100%',height:'100%',overflow:'hidden',
      background:'#F6F3EE',
    }}>
      {/* Layer: photo-like bg */}
      <HeroScene/>

      {/* Layer: strong light wash from left so text is readable over photo */}
      <div style={{
        position:'absolute',inset:0,
        background:'linear-gradient(90deg, rgba(246,243,238,.96) 0%, rgba(246,243,238,.88) 28%, rgba(246,243,238,.6) 48%, rgba(246,243,238,.25) 65%, rgba(246,243,238,0) 82%)',
        zIndex:2,
      }}/>

      {/* Layer: giant wordmark */}
      <div style={{position:'absolute',inset:0,zIndex:3}}>
        <GiantWordmark shown={showWordmark} tone={wordmarkTone}/>
      </div>

      {/* Corner brackets */}
      <span className="bracket tl"/>
      <span className="bracket tr"/>
      <span className="bracket bl"/>
      <span className="bracket br"/>

      {/* Main product anchor — the actual image is rendered at the page
          level (PinnedProduct) so it can animate into the next section. */}
      <div data-product-anchor="hero" style={{
        position:'absolute',
        right:'clamp(80px, 10vw, 180px)',
        bottom:'clamp(24px, 4vw, 64px)',
        width:'clamp(180px, 22vw, 340px)',
        aspectRatio:'1/1',
        zIndex:3,
        pointerEvents:'none',
      }}/>

      {/* Content stack */}
      <div style={{position:'relative',zIndex:4,display:'flex',flexDirection:'column',height:'100%'}}>
        <NavBar delayBase={0.05}/>

        {/* Hero body */}
        <div style={{
          flex:1,display:'flex',alignItems:'center',
          padding:'0 clamp(28px, 6vw, 96px)',
        }}>
          <div style={{maxWidth:720}}>
            {/* Eyebrow */}
            <div className="anim-fade-up" style={{
              animationDelay:'.35s',
              display:'inline-flex',alignItems:'center',gap:10,
              padding:'8px 14px',borderRadius:999,
              background:'rgba(232,67,26,.08)',
              border:'1px solid rgba(232,67,26,.22)',
              color:'var(--accent)',fontSize:12,fontWeight:600,
              letterSpacing:'2px',textTransform:'uppercase',
              marginBottom:28,
            }}>
              <span style={{width:6,height:6,borderRadius:'50%',background:'var(--accent)',boxShadow:'0 0 0 4px rgba(232,67,26,.2)'}}/>
              New · 50ft CAT6 Reel
            </div>

            {/* Headline — ExtraBold 800, ~60-68px */}
            <h1 className="hero-headline hero-display" style={{
              margin:0,fontSize:'clamp(44px, 5vw, 68px)',lineHeight:1.02,
              fontWeight:800,color:'var(--ink)',letterSpacing:'-0.03em',
            }}>
              <div style={{overflow:'hidden'}}>
                <Word delay={0.45}>Portable</Word>
              </div>
              <div style={{overflow:'hidden'}}>
                <Word delay={0.6}>Connectivity,</Word>
              </div>
              <div style={{overflow:'hidden',marginTop:4}}>
                <Word delay={0.95} className="orange-sweep">Enterprise&nbsp;Scale.</Word>
              </div>
            </h1>

            {/* Sub — regular 400, 15-16px */}
            <p className="hero-sub anim-fade-up" style={{
              animationDelay:'1.25s',
              margin:'24px 0 0',maxWidth:520,
              color:'var(--muted)',fontSize:16,lineHeight:1.55,fontWeight:400,
            }}>
              The world's first retractable flat ethernet cable reel.
              <br/>
              50ft CAT6, zero tangles, zero trip hazards.
            </p>

            {/* CTA row */}
            <div className="hero-cta-row anim-fade-up" style={{
              animationDelay:'1.5s',
              display:'flex',gap:14,marginTop:36,flexWrap:'wrap',
            }}>
              <button className="btn btn-primary">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                Shop on Amazon
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:2}}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
              <button className="btn btn-ghost">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                B2B Inquiry
              </button>
            </div>

            {/* Meta row */}
            <div className="anim-fade-up" style={{
              animationDelay:'1.75s',
              display:'flex',gap:28,marginTop:42,
              color:'var(--muted)',fontSize:13,flexWrap:'wrap',
            }}>
              <span style={{display:'flex',alignItems:'center',gap:8}}>
                <span style={{display:'inline-flex',gap:1}}>
                  {[0,1,2,3,4].map(i => (
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#E8431A"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </span>
                <span style={{color:'var(--ink)',fontWeight:600}}>4.9</span>
                <span>· 1,284 reviews</span>
              </span>
              <span style={{display:'flex',alignItems:'center',gap:6}}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                Free shipping · 30-day returns
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { HeroSafe });
