// Hero v2 — Bold: editorial light theme. Split layout, asymmetric type,
// product framed in a circular "spotlight" disc with orange ring, meta
// indicators laid out like a magazine masthead. Same animation vocabulary
// as Safe but remixed.

function HeroBold({ animKey = 0, showWordmark = true }) {
  return (
    <div key={animKey} className="hero-root hero-live" style={{
      position:'relative',width:'100%',height:'100%',overflow:'hidden',
      background:'#F6F3EE',
    }}>
      {/* Faint paper grain + soft radial */}
      <div style={{
        position:'absolute',inset:0,
        background:'radial-gradient(1200px 700px at 85% 50%, rgba(232,67,26,.10), transparent 60%), radial-gradient(900px 500px at 12% 20%, rgba(27,42,74,.08), transparent 60%)',
        zIndex:1,
      }}/>

      {/* Giant faded wordmark */}
      <div style={{position:'absolute',inset:0,zIndex:2,opacity:.6}}>
        <GiantWordmark shown={showWordmark} tone="light"/>
      </div>

      {/* Vertical rule on left */}
      <div className="anim-fade-in" style={{
        animationDelay:'.3s',
        position:'absolute',left:'calc(clamp(28px, 6vw, 96px) - 24px)',top:90,bottom:60,
        width:1,background:'rgba(26,26,26,.10)',zIndex:3,
      }}/>

      {/* Corner brackets */}
      <span className="bracket tl"/>
      <span className="bracket br"/>

      {/* Content */}
      <div style={{position:'relative',zIndex:4,display:'flex',flexDirection:'column',height:'100%'}}>
        <NavBar delayBase={0.05}/>

        {/* Body: left copy, right product disc */}
        <div style={{
          flex:1,display:'grid',
          gridTemplateColumns:'minmax(0,1.1fr) minmax(0,.9fr)',
          alignItems:'center',
          gap:40,
          padding:'0 clamp(28px, 6vw, 96px) 0',
        }}>
          {/* LEFT */}
          <div style={{maxWidth:720,position:'relative'}}>
            {/* Issue meta row */}
            <div className="anim-fade-up" style={{
              animationDelay:'.3s',
              display:'flex',alignItems:'center',gap:14,
              color:'var(--muted)',fontSize:11,fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',
              marginBottom:34,
            }}>
              <span>Vol. 01</span>
              <span style={{width:18,height:1,background:'rgba(26,26,26,.2)'}}/>
              <span>The Cable Reel, Reimagined</span>
              <span style={{width:18,height:1,background:'rgba(26,26,26,.2)'}}/>
              <span style={{color:'var(--accent)'}}>Now Shipping</span>
            </div>

            {/* Headline — ExtraBold 800, ~60-68px */}
            <h1 className="hero-headline hero-display" style={{
              margin:0,fontSize:'clamp(48px, 5.2vw, 68px)',lineHeight:1.02,
              fontWeight:800,color:'var(--ink)',letterSpacing:'-0.035em',
            }}>
              <div style={{overflow:'hidden'}}>
                <Word delay={0.45}>Portable.</Word>
              </div>
              <div style={{overflow:'hidden'}}>
                <Word delay={0.6} style={{
                  color:'transparent',
                  WebkitTextStroke:'1.5px var(--ink)',
                  fontStyle:'italic',fontWeight:400,
                  letterSpacing:'-0.04em',
                }}>Connected.</Word>
              </div>
              <div style={{overflow:'hidden',marginTop:6,display:'flex',alignItems:'baseline',gap:'0.18em',flexWrap:'wrap'}}>
                <Word delay={0.95} className="orange-sweep" style={{fontWeight:600}}>Enterprise</Word>
                <Word delay={1.1} style={{
                  fontStyle:'italic',fontWeight:400,color:'var(--ink-2)',letterSpacing:'-0.04em',
                }}>scale.</Word>
              </div>
            </h1>

            {/* Sub */}
            <div className="anim-fade-up hero-sub" style={{animationDelay:'1.3s',marginTop:32,display:'flex',gap:18,alignItems:'flex-start',maxWidth:540}}>
              <span style={{
                display:'inline-block',flex:'0 0 auto',marginTop:10,
                width:34,height:2,background:'var(--accent)',
              }}/>
              <p style={{margin:0,color:'var(--ink)',fontSize:17,lineHeight:1.55,opacity:.78,fontWeight:400}}>
                The world's first retractable flat ethernet cable reel.
                <br/>
                <span style={{color:'var(--muted)'}}>50ft CAT6. Zero tangles. Zero trip hazards.</span>
              </p>
            </div>

            {/* CTA row */}
            <div className="hero-cta-row anim-fade-up" style={{
              animationDelay:'1.55s',
              display:'flex',gap:14,marginTop:40,flexWrap:'wrap',alignItems:'center',
            }}>
              <button className="btn btn-primary">
                Shop on Amazon
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:2}}><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </button>
              <button className="btn btn-ghost" style={{background:'transparent',borderColor:'rgba(26,26,26,.2)'}}>
                B2B Inquiry
              </button>
              <div style={{display:'flex',alignItems:'center',gap:10,marginLeft:8,color:'var(--muted)',fontSize:13}}>
                <span style={{display:'inline-flex',gap:1}}>
                  {[0,1,2,3,4].map(i => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#E8431A"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                  ))}
                </span>
                <span style={{color:'var(--ink)',fontWeight:600}}>4.9</span>
                <span>/ 1,284</span>
              </div>
            </div>
          </div>

          {/* RIGHT — product disc */}
          <div className="anim-fade-in" style={{
            animationDelay:'.35s',
            position:'relative',height:'100%',display:'flex',alignItems:'center',justifyContent:'center',
          }}>
            {/* Rotating dashed ring */}
            <div style={{
              position:'absolute',width:'min(520px, 85%)',aspectRatio:'1/1',
              borderRadius:'50%',border:'1px dashed rgba(26,26,26,.2)',
              animation:'heroRing 60s linear infinite',
            }}/>
            {/* Orange accent arc */}
            <svg viewBox="0 0 520 520" style={{position:'absolute',width:'min(560px, 90%)',aspectRatio:'1/1'}}>
              <defs>
                <path id="arcPath" d="M 260,10 A 250,250 0 0 1 510,260" fill="none"/>
              </defs>
              <circle cx="260" cy="260" r="250" fill="none" stroke="rgba(232,67,26,.25)" strokeWidth="1.5"/>
              <text fontFamily="'Bricolage Grotesque',sans-serif" fontSize="11" letterSpacing="4" fill="var(--accent)" fontWeight="600">
                <textPath href="#arcPath" startOffset="0">RETRACTABLE · 50FT · CAT6 · FLAT · ZERO-TANGLE · </textPath>
              </text>
            </svg>

            {/* Spotlight disc */}
            <div style={{
              position:'relative',width:'min(440px, 70%)',aspectRatio:'1/1',borderRadius:'50%',
              background:'radial-gradient(circle at 35% 30%, #FFF9F2, #F0E7D6 55%, #D9CBB4 100%)',
              boxShadow:'0 40px 80px -30px rgba(60,40,20,.35), inset 0 2px 0 rgba(255,255,255,.6)',
              overflow:'hidden',
              animation:'heroKen 14s ease-out forwards',
              transformOrigin:'center',
            }}>
              {/* Product inside disc */}
              <img src="assets/product-reel.png" alt="Extngo reel"
                   style={{
                     width:'78%',height:'78%',objectFit:'contain',display:'block',
                     margin:'auto',position:'absolute',inset:0,
                     filter:'drop-shadow(0 20px 30px rgba(60,40,20,.25))',
                   }}/>
            </div>

            {/* Callout labels */}
            <div className="anim-fade-up" style={{
              animationDelay:'1.2s',
              position:'absolute',top:'14%',right:'6%',
              display:'flex',alignItems:'center',gap:10,
              fontSize:11,letterSpacing:'2px',textTransform:'uppercase',fontWeight:600,color:'var(--ink)',
            }}>
              <span style={{width:28,height:1,background:'var(--ink)'}}/>
              <span>Gigabit · CAT6</span>
            </div>
            <div className="anim-fade-up" style={{
              animationDelay:'1.35s',
              position:'absolute',bottom:'12%',left:'4%',
              display:'flex',alignItems:'center',gap:10,
              fontSize:11,letterSpacing:'2px',textTransform:'uppercase',fontWeight:600,color:'var(--ink)',
            }}>
              <span>Retracts in&nbsp;3s</span>
              <span style={{width:28,height:1,background:'var(--ink)'}}/>
            </div>
          </div>
        </div>

        {/* Bottom ticker */}
        <div className="anim-fade-up" style={{
          animationDelay:'1.8s',
          display:'flex',alignItems:'center',gap:40,
          padding:'18px clamp(28px, 6vw, 96px) 28px',
          color:'var(--muted)',fontSize:11,fontWeight:600,letterSpacing:'2px',textTransform:'uppercase',
          borderTop:'1px solid rgba(26,26,26,.08)',
          flexWrap:'wrap',
        }}>
          <span style={{color:'var(--ink)'}}>Featured in</span>
          <span>Wired</span>
          <span style={{opacity:.4}}>·</span>
          <span>The Verge</span>
          <span style={{opacity:.4}}>·</span>
          <span>Fast Company</span>
          <span style={{opacity:.4}}>·</span>
          <span>Core77</span>
          <span style={{marginLeft:'auto',color:'var(--accent)',display:'flex',alignItems:'center',gap:6}}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'var(--accent)',boxShadow:'0 0 0 4px rgba(232,67,26,.18)'}}/>
            Free shipping
          </span>
        </div>
      </div>
    </div>
  );
}

// Extra keyframes that aren't shared
(function(){
  if (document.getElementById('hero-bold-css')) return;
  const s = document.createElement('style');
  s.id = 'hero-bold-css';
  s.textContent = `@keyframes heroRing{from{transform:rotate(0)}to{transform:rotate(360deg)}}`;
  document.head.appendChild(s);
})();

Object.assign(window, { HeroBold });
