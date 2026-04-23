// ProductDetail — white-bg section directly after the hero.
// Left column: the anchor where the pinned product lands (animated in
// from hero bottom-right via product-pinned.jsx).
// Right column: the real product pitch — name, price, description, chips,
// CTAs. Content-dense but restrained; the pinned reel earns the spotlight.

function ProductDetail() {
  return (
    <section id="product-detail" className="detail-section" style={{
      position:'relative',
      background:'#FFFFFF',
      minHeight:'100vh',
      padding:'clamp(64px, 10vh, 120px) clamp(28px, 6vw, 96px)',
      display:'grid',
      gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',
      gap:'clamp(32px, 6vw, 80px)',
      alignItems:'center',
    }}>
      {/* LEFT — product anchor stage */}
      <div style={{
        position:'relative',display:'flex',justifyContent:'center',alignItems:'center',
        minHeight:'clamp(360px, 60vh, 620px)',
      }}>
        {/* Soft warm disc */}
        <div aria-hidden="true" style={{
          position:'absolute',
          width:'min(560px, 90%)',aspectRatio:'1/1',borderRadius:'50%',
          background:'radial-gradient(circle at 35% 30%, #FFF9F2, #F5ECDC 55%, #E6D7BD 100%)',
          opacity:.55,
        }}/>
        {/* Dashed ring */}
        <div aria-hidden="true" style={{
          position:'absolute',
          width:'min(500px, 85%)',aspectRatio:'1/1',borderRadius:'50%',
          border:'1px dashed rgba(26,26,26,.15)',
        }}/>
        {/* Arc label around the disc */}
        <svg aria-hidden="true" viewBox="0 0 500 500" style={{
          position:'absolute',width:'min(500px, 85%)',aspectRatio:'1/1',
          overflow:'visible',opacity:.55,
        }}>
          <defs>
            <path id="arcTop" d="M 60 250 A 190 190 0 0 1 440 250"/>
          </defs>
          <text fontFamily="'Bricolage Grotesque', sans-serif" fontSize="12"
                fontWeight="600" letterSpacing="4" fill="#6D6D6D">
            <textPath href="#arcTop" startOffset="8%">
              CAT6 · 1 GBPS · 50 FT · RETRACTABLE · MADE BY IT PROS
            </textPath>
          </text>
        </svg>
        {/* Anchor — matches the settle size of the pinned product */}
        <div data-product-anchor="detail" style={{
          position:'relative',
          width:'clamp(260px, 38vw, 460px)',aspectRatio:'1/1',
          pointerEvents:'none',
        }}/>
        {/* Micro specs around the disc */}
        <span style={microSpec('tl')}>50 FT / 15 M</span>
        <span style={microSpec('tr')}>1 GBPS</span>
        <span style={microSpec('bl')}>1.8 LBS</span>
        <span style={microSpec('br')}>CAT6 FLAT</span>
      </div>

      {/* RIGHT — product details */}
      <div style={{maxWidth:560}}>
        <div style={{
          display:'inline-flex',alignItems:'center',gap:10,
          padding:'7px 13px',borderRadius:999,
          background:'rgba(232,67,26,.08)',
          border:'1px solid rgba(232,67,26,.22)',
          color:'var(--accent)',fontSize:11,fontWeight:600,
          letterSpacing:'2px',textTransform:'uppercase',
          marginBottom:24,
        }}>
          <span style={{width:6,height:6,borderRadius:'50%',background:'var(--accent)'}}/>
          Retractable · CAT6 Flat
        </div>

        <h2 className="hero-display" style={{
          margin:0,fontSize:'clamp(36px, 4vw, 56px)',lineHeight:1.02,
          fontWeight:800,color:'var(--ink)',letterSpacing:'-0.035em',
        }}>
          More cable than you<br/>
          <span style={{fontStyle:'italic',fontWeight:400}}>think you have.</span>
        </h2>

        <p style={{
          margin:'22px 0 0',color:'#3A3A3A',fontSize:17,lineHeight:1.55,maxWidth:480,
        }}>
          EXTNGO is a flat CAT6 reel built by IT pros for the road. 50 feet of gigabit
          cable that tucks under carpet without bulging, deploys only the length you
          need, and rolls back to a palm-sized case when the job is done.
        </p>

        {/* Price + CTA cluster */}
        <div style={{
          marginTop:32,display:'flex',alignItems:'center',gap:20,flexWrap:'wrap',
        }}>
          <div>
            <div style={{fontSize:11,letterSpacing:'2px',textTransform:'uppercase',color:'#8A8A8A',fontWeight:600,marginBottom:4}}>Price</div>
            <div style={{fontSize:36,fontWeight:700,color:'var(--ink)',letterSpacing:'-0.02em',lineHeight:1}}>
              $79.<span style={{fontSize:22}}>99</span>
            </div>
          </div>
          <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
            <button className="cta-primary" style={{
              background:'var(--accent)',color:'#fff',border:0,
              padding:'14px 22px',borderRadius:999,fontWeight:600,fontSize:14,
              letterSpacing:'.3px',cursor:'pointer',
              boxShadow:'0 10px 24px rgba(232,67,26,.28)',
            }}>Add to cart →</button>
            <button style={{
              background:'transparent',color:'var(--ink)',
              border:'1.5px solid rgba(26,26,26,.18)',
              padding:'13px 20px',borderRadius:999,fontWeight:600,fontSize:14,
              cursor:'pointer',
            }}>See full specs</button>
          </div>
        </div>

        {/* Spec chips */}
        <div style={{
          marginTop:36,display:'flex',flexWrap:'wrap',gap:8,
        }}>
          {[
            ['Speed','1 Gbps'],
            ['Length','50 ft / 15 m'],
            ['Weight','1.8 lbs / 800 g'],
            ['Dimensions','7.5 × 13 × 16.5 cm'],
            ['Connectors','RJ45 Male–Female'],
          ].map(([k,v]) => (
            <div key={k} style={{
              display:'flex',alignItems:'baseline',gap:8,
              padding:'10px 14px',borderRadius:12,
              background:'rgba(26,26,26,.03)',
              border:'1px solid rgba(26,26,26,.08)',
              fontSize:13,
            }}>
              <span style={{color:'#8A8A8A',fontSize:10,letterSpacing:'1.5px',textTransform:'uppercase',fontWeight:600}}>{k}</span>
              <span style={{color:'var(--ink)',fontWeight:600}}>{v}</span>
            </div>
          ))}
        </div>

        {/* Included line */}
        <div style={{
          marginTop:28,display:'flex',alignItems:'center',gap:12,
          padding:'14px 16px',borderRadius:14,
          background:'linear-gradient(180deg, rgba(232,67,26,.05), rgba(232,67,26,.02))',
          border:'1px solid rgba(232,67,26,.15)',
        }}>
          <div style={{
            width:36,height:36,borderRadius:10,background:'#1A1A1A',flexShrink:0,
            display:'grid',placeItems:'center',color:'#fff',fontSize:11,fontWeight:700,letterSpacing:'.5px',
          }}>+1</div>
          <div>
            <div style={{fontSize:11,letterSpacing:'2px',textTransform:'uppercase',color:'var(--accent)',fontWeight:600,marginBottom:2}}>Free in every box</div>
            <div style={{fontSize:14,color:'var(--ink)',fontWeight:500}}>
              Male–Male retractable patch cable. One less thing to buy.
            </div>
          </div>
        </div>
      </div>

      {/* Responsive — single column on narrow */}
      <style>{`
        @media (max-width: 920px) {
          .detail-section{grid-template-columns: 1fr !important; padding: 56px 24px !important}
          .detail-section [data-product-anchor="detail"]{width: clamp(220px, 60vw, 320px) !important}
        }
      `}</style>
    </section>
  );
}

function microSpec(pos) {
  const base = {
    position:'absolute',fontSize:10,letterSpacing:'2px',
    textTransform:'uppercase',fontWeight:700,color:'#8A8A8A',
    padding:'6px 10px',background:'rgba(255,255,255,.75)',
    border:'1px solid rgba(26,26,26,.08)',borderRadius:999,
    backdropFilter:'blur(6px)',
  };
  const map = {
    tl:{top:'12%',left:'8%'},
    tr:{top:'14%',right:'6%'},
    bl:{bottom:'16%',left:'6%'},
    br:{bottom:'12%',right:'10%'},
  };
  return { ...base, ...map[pos] };
}

Object.assign(window, { ProductDetail });
