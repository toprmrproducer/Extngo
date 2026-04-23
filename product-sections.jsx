// product-sections.jsx — Supporting sections below the detail block.
// Five content zones, each driven by a reusable <Split> or <Banner>
// primitive so the rhythm stays predictable: image ↔ copy, alternating
// sides, with a full-bleed editorial banner and a color-variant showcase.

// ── Reusable split section ────────────────────────────────────────
function Split({ eyebrow, title, body, img, alt, flip=false, bg='#FFFFFF', ink='#1A1A1A' }) {
  return (
    <section className="split-section" style={{
      background:bg, color:ink,
      padding:'clamp(72px, 12vh, 140px) clamp(28px, 6vw, 96px)',
    }}>
      <div className="split-grid" style={{
        display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',
        gap:'clamp(40px, 7vw, 96px)',alignItems:'center',
        maxWidth:1400,margin:'0 auto',
        direction: flip ? 'rtl' : 'ltr',
      }}>
        {/* Image */}
        <div style={{direction:'ltr',position:'relative'}}>
          <div style={{
            position:'relative',aspectRatio:'4/3',borderRadius:20,overflow:'hidden',
            background:'#F5ECDC',
            boxShadow:'0 40px 60px -30px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.04)',
          }}>
            <img src={img} alt={alt} style={{
              width:'100%',height:'100%',objectFit:'cover',display:'block',
            }}/>
          </div>
          {/* Decorative tag */}
          <div style={{
            position:'absolute',top:-14,left:flip?undefined:24,right:flip?24:undefined,
            padding:'7px 12px',borderRadius:999,
            background:'#1A1A1A',color:'#fff',
            fontSize:10,letterSpacing:'2px',fontWeight:700,textTransform:'uppercase',
          }}>{eyebrow}</div>
        </div>

        {/* Copy */}
        <div style={{direction:'ltr',maxWidth:540}}>
          <h3 className="hero-display" style={{
            margin:0,fontSize:'clamp(30px, 3.2vw, 46px)',lineHeight:1.05,
            fontWeight:800,letterSpacing:'-0.03em',color:ink,
          }}>{title}</h3>
          <div style={{
            marginTop:24,color:ink==='#FFFFFF'?'rgba(255,255,255,.75)':'#3A3A3A',
            fontSize:16,lineHeight:1.6,
          }}>{body}</div>
        </div>
      </div>
      <style>{`
        @media (max-width: 920px){
          .split-section .split-grid{grid-template-columns:1fr !important;direction:ltr !important}
        }
      `}</style>
    </section>
  );
}

// ── Use cases: 5-up grid ──────────────────────────────────────────
function UseCases() {
  const cases = [
    { n:'01', t:'USB over Ethernet',     d:'Pair with a USB-over-Ethernet adapter to safely move USB serial data up to 100 ft.' },
    { n:'02', t:'HDMI extension',        d:'Run an HDMI signal up to 100 ft with an HDMI-over-Ethernet adapter — no lag, no loss.' },
    { n:'03', t:'Audio & video',         d:'One cable for A/V signal up to 100 ft — perfect for production and events.' },
    { n:'04', t:'Vehicle diagnostics',   d:'Diagnose vehicles remotely with ENET — stay 100 ft away from the bay floor.' },
    { n:'05', t:'Any Ethernet device',   d:'If it speaks Ethernet, it speaks EXTNGO. Light, portable, and ready on demand.' },
  ];
  return (
    <section style={{
      background:'#F6F3EE',padding:'clamp(72px, 12vh, 140px) clamp(28px, 6vw, 96px)',
    }}>
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <div style={{
          display:'flex',justifyContent:'space-between',alignItems:'flex-end',
          gap:32,flexWrap:'wrap',marginBottom:56,
        }}>
          <div>
            <div style={{
              fontSize:11,letterSpacing:'2px',textTransform:'uppercase',
              color:'var(--accent)',fontWeight:700,marginBottom:16,
            }}>Beyond networking</div>
            <h3 className="hero-display" style={{
              margin:0,fontSize:'clamp(32px, 3.6vw, 52px)',lineHeight:1.02,
              fontWeight:800,letterSpacing:'-0.035em',maxWidth:720,
            }}>Five ways to use EXTNGO — <span style={{fontStyle:'italic',fontWeight:400}}>other than</span> networking.</h3>
          </div>
          <div style={{fontSize:14,color:'#6D6D6D',maxWidth:320,lineHeight:1.5}}>
            Anything that moves data over Ethernet moves farther with a reel of EXTNGO in the bag.
          </div>
        </div>

        <div style={{
          display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(240px, 1fr))',gap:16,
        }}>
          {cases.map((c,i) => (
            <div key={i} style={{
              background:'#fff',padding:'28px 24px',borderRadius:16,
              border:'1px solid rgba(26,26,26,.06)',
              transition:'transform .3s, box-shadow .3s',
              display:'flex',flexDirection:'column',gap:14,minHeight:220,
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-4px)';e.currentTarget.style.boxShadow='0 20px 40px -20px rgba(0,0,0,.15)';}}
            onMouseLeave={e=>{e.currentTarget.style.transform='none';e.currentTarget.style.boxShadow='none';}}>
              <div style={{
                display:'inline-flex',width:'fit-content',fontSize:11,letterSpacing:'2px',
                fontWeight:700,color:'var(--accent)',
              }}>{c.n}</div>
              <div style={{fontSize:20,fontWeight:700,color:'var(--ink)',letterSpacing:'-0.015em',lineHeight:1.2}}>
                {c.t}
              </div>
              <div style={{fontSize:14,color:'#6D6D6D',lineHeight:1.55,marginTop:'auto'}}>
                {c.d}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Safe & secure ─────────────────────────────────────────────────
function SafeSecure() {
  return (
    <Split
      eyebrow="Safe & Secure"
      title={<>Hard-wired trust.<br/><span style={{fontStyle:'italic',fontWeight:400}}>Where Wi-Fi can't go.</span></>}
      body={<>
        <p style={{margin:0}}>
          In a SMART world, data is the product. Car shops use EXTNGO to keep diagnostic
          sessions stable across the bay. Wind-turbine techs pull it up the tower for
          remote firmware pushes.
        </p>
        <p style={{margin:'14px 0 0'}}>
          Anywhere a wireless link would be a liability, EXTNGO gives you a hard line —
          long enough to keep people safe, short enough to pack in a laptop bag.
        </p>
      </>}
      img="assets/use-car.png"
      alt="Vehicle diagnostic session using EXTNGO"
    />
  );
}

// ── Streaming & gaming ────────────────────────────────────────────
function StreamingGaming() {
  return (
    <Split
      eyebrow="Streaming & Gaming"
      title={<>Zero lag. Zero mess.<br/><span style={{fontStyle:'italic',fontWeight:400}}>All the cable.</span></>}
      body={<>
        <p style={{margin:0}}>
          There's nothing faster than copper. EXTNGO kills the audio-video drift of
          Wi-Fi streams and delivers a stable gigabit to any temp setup — hotel rooms,
          LAN parties, friend's basement.
        </p>
        <p style={{margin:'14px 0 0'}}>
          When the match is done, roll it back into the reel. No cable mess. No regret.
        </p>
      </>}
      img="assets/use-lan.png"
      alt="LAN topology with connected devices"
      flip={true}
      bg="#FAF7F2"
    />
  );
}

// ── Conference banner (full-bleed) ────────────────────────────────
function ConferenceBanner() {
  return (
    <section style={{
      position:'relative',width:'100%',height:'clamp(420px, 60vh, 620px)',
      overflow:'hidden',background:'#1A1A1A',
    }}>
      <img src="assets/conference-room.png" alt="Orange-chair conference room" style={{
        position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',
        opacity:.85,
      }}/>
      <div style={{
        position:'absolute',inset:0,
        background:'linear-gradient(90deg, rgba(26,26,26,.85) 0%, rgba(26,26,26,.55) 40%, rgba(26,26,26,.15) 100%)',
      }}/>
      <div style={{
        position:'relative',height:'100%',maxWidth:1400,margin:'0 auto',
        padding:'clamp(48px, 8vh, 96px) clamp(28px, 6vw, 96px)',
        display:'flex',flexDirection:'column',justifyContent:'center',
      }}>
        <div style={{
          fontSize:11,letterSpacing:'3px',textTransform:'uppercase',
          color:'var(--accent)',fontWeight:700,marginBottom:24,
        }}>For every venue</div>
        <h3 className="hero-display" style={{
          margin:0,fontSize:'clamp(40px, 5vw, 72px)',lineHeight:1.02,
          fontWeight:800,letterSpacing:'-0.035em',color:'#fff',maxWidth:780,
        }}>
          Portability. Flexibility.<br/>
          <span style={{fontStyle:'italic',fontWeight:400,color:'#F5ECDC'}}>Secure connectivity —</span><br/>
          tight schedule or not.
        </h3>
        <div style={{
          marginTop:28,color:'rgba(255,255,255,.7)',fontSize:16,lineHeight:1.55,maxWidth:540,
        }}>
          When a client walks you into a temp boardroom and asks for LAN in the next ten
          minutes, EXTNGO is the best answer on the road.
        </div>
      </div>
    </section>
  );
}

// ── Specs on the fly ──────────────────────────────────────────────
function SpecsOnTheFly() {
  const specs = [
    { t:'Fast transfer',  v:'1 Gbps',        d:'Built for 4K streaming, lag-free gaming, large file pushes.' },
    { t:'Compact size',   v:'7.5 × 13 × 16.5 cm', d:'Smaller than a DSLR. Tucks next to a laptop without complaint.' },
    { t:'Light weight',   v:'1.8 lbs / 800 g',   d:'Carry 50 feet of gigabit in one hand. All day.' },
    { t:'Easy fit',       v:'Any bag',       d:'Slips into any laptop bag or tool case without the bulge.' },
    { t:'Large in size',  v:'50 ft / 15 m',  d:'CAT6 flat cable that passes under carpet — no bulges, no trip hazards.' },
  ];
  return (
    <section style={{
      background:'#FFFFFF',padding:'clamp(72px, 12vh, 140px) clamp(28px, 6vw, 96px)',
    }}>
      <div style={{
        maxWidth:1400,margin:'0 auto',
        display:'grid',gridTemplateColumns:'minmax(0,.9fr) minmax(0,1.1fr)',
        gap:'clamp(40px, 7vw, 96px)',alignItems:'center',
      }} className="specs-grid">
        <div style={{position:'relative'}}>
          <div style={{
            aspectRatio:'3/4',borderRadius:20,overflow:'hidden',
            background:'#F5ECDC',
            boxShadow:'0 40px 60px -30px rgba(0,0,0,.18), 0 0 0 1px rgba(0,0,0,.04)',
          }}>
            <img src="assets/specs-lifestyle.png" alt="EXTNGO held at side" style={{
              width:'100%',height:'100%',objectFit:'cover',display:'block',
            }}/>
          </div>
          <div style={{
            position:'absolute',top:-14,left:24,padding:'7px 12px',borderRadius:999,
            background:'var(--accent)',color:'#fff',
            fontSize:10,letterSpacing:'2px',fontWeight:700,textTransform:'uppercase',
          }}>Specs on the fly</div>
        </div>

        <div>
          <h3 className="hero-display" style={{
            margin:0,fontSize:'clamp(32px, 3.6vw, 52px)',lineHeight:1.02,
            fontWeight:800,letterSpacing:'-0.035em',color:'var(--ink)',
          }}>
            Numbers that<br/>
            <span style={{fontStyle:'italic',fontWeight:400}}>travel with you.</span>
          </h3>
          <div style={{
            marginTop:40,display:'flex',flexDirection:'column',
            borderTop:'1px solid rgba(26,26,26,.1)',
          }}>
            {specs.map((s,i)=>(
              <div key={i} style={{
                display:'grid',gridTemplateColumns:'140px 160px 1fr',gap:24,
                padding:'22px 0',
                borderBottom:'1px solid rgba(26,26,26,.1)',
                alignItems:'baseline',
              }}>
                <div style={{fontSize:11,letterSpacing:'2px',textTransform:'uppercase',fontWeight:700,color:'#8A8A8A'}}>{s.t}</div>
                <div style={{fontSize:22,fontWeight:700,letterSpacing:'-0.02em',color:'var(--accent)'}}>{s.v}</div>
                <div style={{fontSize:14,color:'#3A3A3A',lineHeight:1.5}}>{s.d}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 920px){
          .specs-grid{grid-template-columns:1fr !important}
          .specs-grid > div > div[style*="grid-template-columns"]{grid-template-columns:1fr !important}
        }
      `}</style>
    </section>
  );
}

// ── Color variants ────────────────────────────────────────────────
function ColorVariants() {
  const colors = [
    { name:'Orange', len:'50 ft', m:'15 m', hex:'#E8431A', accent:'#FFEFE6' },
    { name:'Green',  len:'33 ft', m:'10 m', hex:'#4A9D3E', accent:'#ECF5E9' },
  ];
  return (
    <section style={{
      background:'#F6F3EE',padding:'clamp(72px, 12vh, 140px) clamp(28px, 6vw, 96px)',
    }}>
      <div style={{maxWidth:1400,margin:'0 auto'}}>
        <div style={{textAlign:'center',marginBottom:56,maxWidth:720,margin:'0 auto 56px'}}>
          <div style={{
            fontSize:11,letterSpacing:'2px',textTransform:'uppercase',
            color:'var(--accent)',fontWeight:700,marginBottom:16,
          }}>Color-coded by length</div>
          <h3 className="hero-display" style={{
            margin:0,fontSize:'clamp(32px, 3.6vw, 52px)',lineHeight:1.02,
            fontWeight:800,letterSpacing:'-0.035em',color:'var(--ink)',
          }}>
            No guessing.<br/>
            <span style={{fontStyle:'italic',fontWeight:400}}>Just grab the color.</span>
          </h3>
          <p style={{marginTop:20,color:'#6D6D6D',fontSize:16,lineHeight:1.55}}>
            Orange is 50 ft. Green is 33 ft. At a glance — no guesswork, no hauling
            out more cable than you need.
          </p>
        </div>

        <div style={{
          display:'grid',gridTemplateColumns:'repeat(auto-fit, minmax(280px, 1fr))',
          gap:24,maxWidth:960,margin:'0 auto',
        }}>
          {colors.map((c,i)=>(
            <div key={i} style={{
              background:c.accent,borderRadius:20,padding:'32px 28px',
              border:`1.5px solid ${c.hex}30`,
              position:'relative',overflow:'hidden',
            }}>
              <div style={{
                fontSize:10,letterSpacing:'2px',textTransform:'uppercase',fontWeight:700,
                color:c.hex,marginBottom:12,
              }}>EXTNGO {c.name}</div>
              <div style={{
                fontSize:48,fontWeight:800,letterSpacing:'-0.03em',color:'var(--ink)',lineHeight:1,
              }}>{c.len}</div>
              <div style={{fontSize:16,color:'#6D6D6D',marginTop:4}}>{c.m}</div>
              <div style={{
                position:'absolute',right:-20,bottom:-30,width:180,height:180,borderRadius:'50%',
                background:c.hex,opacity:.85,filter:'blur(40px)',
              }}/>
              <div style={{
                position:'absolute',right:20,top:20,width:56,height:56,borderRadius:'50%',
                background:c.hex,
                boxShadow:'inset 0 4px 10px rgba(255,255,255,.35), 0 10px 20px rgba(0,0,0,.15)',
              }}/>
            </div>
          ))}
        </div>

        {/* Product photo of both */}
        <div style={{marginTop:48,display:'flex',justifyContent:'center'}}>
          <img src="assets/color-variants.png" alt="Orange and green EXTNGO reels" style={{
            maxWidth:'min(560px, 90%)',width:'100%',height:'auto',display:'block',
            filter:'drop-shadow(0 30px 40px rgba(0,0,0,.15))',
          }}/>
        </div>
      </div>
    </section>
  );
}

// ── Bonus retractable unit ────────────────────────────────────────
function BonusUnit() {
  return (
    <section style={{
      background:'#1A1A1A',color:'#fff',
      padding:'clamp(72px, 12vh, 140px) clamp(28px, 6vw, 96px)',
      position:'relative',overflow:'hidden',
    }}>
      <div style={{maxWidth:1200,margin:'0 auto',
        display:'grid',gridTemplateColumns:'minmax(0,1fr) minmax(0,1fr)',
        gap:'clamp(40px, 7vw, 96px)',alignItems:'center',
      }} className="bonus-grid">
        <div>
          <div style={{
            display:'inline-flex',alignItems:'center',gap:10,
            padding:'8px 14px',borderRadius:999,
            background:'rgba(232,67,26,.15)',
            border:'1px solid rgba(232,67,26,.35)',
            color:'var(--accent)',fontSize:11,fontWeight:700,
            letterSpacing:'2px',textTransform:'uppercase',marginBottom:24,
          }}>
            <span style={{width:6,height:6,borderRadius:'50%',background:'var(--accent)'}}/>
            Free in every box
          </div>
          <h3 className="hero-display" style={{
            margin:0,fontSize:'clamp(36px, 4vw, 56px)',lineHeight:1.02,
            fontWeight:800,letterSpacing:'-0.035em',color:'#fff',
          }}>
            One cable you won't<br/>
            <span style={{fontStyle:'italic',fontWeight:400,color:'#FFD8C4'}}>have to buy twice.</span>
          </h3>
          <p style={{
            marginTop:24,color:'rgba(255,255,255,.7)',fontSize:16,lineHeight:1.6,maxWidth:480,
          }}>
            Every EXTNGO ships with a small CAT6 flat Male–Male retractable patch — the
            last link between your EXTNGO and your device. No extra trip to the store,
            no scrambling for a short cable at the worst possible moment.
          </p>
          <div style={{
            marginTop:28,display:'flex',alignItems:'center',gap:14,
            padding:'14px 18px',borderRadius:14,
            background:'rgba(255,255,255,.05)',
            border:'1px solid rgba(255,255,255,.1)',
          }}>
            <div style={{
              width:44,height:44,borderRadius:12,background:'var(--accent)',
              display:'grid',placeItems:'center',flexShrink:0,fontSize:20,fontWeight:700,
            }}>✓</div>
            <div>
              <div style={{fontSize:14,fontWeight:600,color:'#fff'}}>Saves you $12–18</div>
              <div style={{fontSize:13,color:'rgba(255,255,255,.6)',marginTop:2}}>
                vs. buying a separate retractable patch cable.
              </div>
            </div>
          </div>
        </div>

        <div style={{position:'relative',display:'flex',justifyContent:'center'}}>
          <div style={{
            position:'absolute',inset:'15% 10%',
            background:'radial-gradient(circle, rgba(232,67,26,.3), transparent 65%)',
            filter:'blur(30px)',
          }}/>
          <img src="assets/retractable-unit.png" alt="Male-Male retractable patch cable" style={{
            position:'relative',maxWidth:'min(440px, 90%)',width:'100%',height:'auto',
            filter:'drop-shadow(0 30px 50px rgba(0,0,0,.5))',
          }}/>
        </div>
      </div>
      <style>{`
        @media (max-width: 920px){
          .bonus-grid{grid-template-columns:1fr !important}
        }
      `}</style>
    </section>
  );
}

// ── Footer CTA ────────────────────────────────────────────────────
function FooterCTA() {
  return (
    <section style={{
      background:'#F6F3EE',padding:'clamp(80px, 14vh, 160px) clamp(28px, 6vw, 96px)',
      textAlign:'center',
    }}>
      <div style={{maxWidth:720,margin:'0 auto'}}>
        <h3 className="hero-display" style={{
          margin:0,fontSize:'clamp(40px, 5vw, 72px)',lineHeight:1.02,
          fontWeight:800,letterSpacing:'-0.035em',color:'var(--ink)',
        }}>
          More cable.<br/>
          <span style={{fontStyle:'italic',fontWeight:400,color:'var(--accent)'}}>Less hassle.</span>
        </h3>
        <p style={{
          marginTop:24,fontSize:18,color:'#6D6D6D',lineHeight:1.55,
        }}>Ship today. Free retractable patch in every box.</p>
        <div style={{
          marginTop:36,display:'flex',gap:12,justifyContent:'center',flexWrap:'wrap',
        }}>
          <button style={{
            background:'var(--accent)',color:'#fff',border:0,
            padding:'16px 28px',borderRadius:999,fontWeight:600,fontSize:15,
            cursor:'pointer',boxShadow:'0 14px 30px rgba(232,67,26,.28)',
          }}>Add to cart — $79.99 →</button>
          <button style={{
            background:'transparent',color:'var(--ink)',
            border:'1.5px solid rgba(26,26,26,.18)',
            padding:'15px 26px',borderRadius:999,fontWeight:600,fontSize:15,cursor:'pointer',
          }}>Compare lengths</button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, {
  UseCases, SafeSecure, StreamingGaming,
  ConferenceBanner, SpecsOnTheFly, ColorVariants, BonusUnit, FooterCTA,
});
