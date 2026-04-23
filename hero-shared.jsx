// Shared pieces for hero variations — anim hooks, logo, nav, CTAs.

// ── Animation orchestration ─────────────────────────────────────
// A key that bumps replays the CSS animations by remounting.
const AnimCtx = React.createContext({ key: 0, wordmark: true, replay: () => {} });

function useAnimState() {
  const [key, setKey] = React.useState(0);
  const [wordmark, setWordmark] = React.useState(true);
  return {
    key,
    wordmark,
    setWordmark,
    replay: () => setKey(k => k + 1),
  };
}

// Inject keyframes + util classes once.
(function injectHeroCSS(){
  if (typeof document === 'undefined') return;
  if (document.getElementById('hero-css')) return;
  const s = document.createElement('style');
  s.id = 'hero-css';
  s.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=Geist:wght@300;400;500;600;700;800;900&display=swap');

    :root{
      --ink:#1A1A1A;
      --ink-2:#1B2A4A;
      --muted:#6D6D6D;
      --accent:#E8431A;
      --accent-soft:#FFE8E0;
      --bg:#F6F3EE;
      --bg-2:#ECE7DE;
      --line:rgba(26,26,26,.10);
    }

    .hero-root{font-family:'Geist','Inter',-apple-system,BlinkMacSystemFont,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased}
    .hero-display{font-family:'Bricolage Grotesque','Geist',sans-serif;letter-spacing:-0.02em;font-optical-sizing:auto}

    /* Keyframes */
    @keyframes heroFadeUp{from{opacity:0;transform:translate3d(0,22px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes heroFadeDown{from{opacity:0;transform:translate3d(0,-12px,0)}to{opacity:1;transform:translate3d(0,0,0)}}
    @keyframes heroFadeIn{from{opacity:0}to{opacity:1}}
    @keyframes heroWordmark{from{opacity:0;transform:scale(1.06) translate3d(0,0,0);letter-spacing:-0.06em}to{opacity:.09;transform:scale(1) translate3d(0,0,0);letter-spacing:-0.07em}}
    @keyframes heroWordmarkDark{from{opacity:0;transform:scale(1.06)}to{opacity:.13;transform:scale(1)}}
    @keyframes heroKen{from{transform:scale(1.12)}to{transform:scale(1.0)}}
    @keyframes heroOrangeSweep{
      0%{background-size:0% 100%}
      100%{background-size:100% 100%}
    }
    @keyframes heroUnderline{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @keyframes heroBracketIn{from{opacity:0;transform:scale(.85)}to{opacity:1;transform:scale(1)}}
    @keyframes heroCursor{0%,49%{opacity:1}50%,100%{opacity:0}}
    @keyframes heroProductIn{
      0%{opacity:0;transform:translate3d(60px,30px,0) scale(.92) rotate(-4deg)}
      100%{opacity:1;transform:translate3d(0,0,0) scale(1) rotate(0)}
    }
    @keyframes heroFloat{
      0%,100%{transform:translate3d(0,0,0) rotate(0)}
      50%{transform:translate3d(0,-10px,0) rotate(.6deg)}
    }

    .anim-fade-up{opacity:0;animation:heroFadeUp .9s cubic-bezier(.2,.7,.2,1) forwards}
    .anim-fade-down{opacity:0;animation:heroFadeDown .7s cubic-bezier(.2,.7,.2,1) forwards}
    .anim-fade-in{opacity:0;animation:heroFadeIn .9s ease-out forwards}

    /* Watermark: heavy/black, very large */
    .giant-wordmark{font-weight:900 !important;font-family:'Bricolage Grotesque','Geist',sans-serif;letter-spacing:-0.05em}

    /* Nav link underline for active state */
    .navlink{position:relative;padding:6px 2px;color:var(--ink);opacity:.75;font-size:15px;font-weight:400;letter-spacing:0;transition:opacity .2s}
    .navlink:hover{opacity:1}
    .navlink.active{opacity:1}
    .navlink.active::after{content:'';position:absolute;left:0;right:0;bottom:0;height:2px;background:var(--accent);transform-origin:left;animation:heroUnderline .7s .9s cubic-bezier(.2,.7,.2,1) both}

    /* Orange highlight sweep for "Enterprise Scale." */
    .orange-sweep{
      color:var(--accent);
      position:relative;
      display:inline-block;
    }
    .orange-sweep::after{
      content:'';position:absolute;left:0;right:0;bottom:.06em;height:.08em;
      background:var(--accent);transform-origin:left;transform:scaleX(0);
      animation:heroUnderline .9s 1.5s cubic-bezier(.2,.7,.2,1) forwards;
      border-radius:2px;
    }

    /* Staggered word reveal */
    .word{display:inline-block;overflow:hidden;vertical-align:baseline}
    .word > span{display:inline-block;transform:translate3d(0,110%,0);opacity:0;animation:heroFadeUp .9s cubic-bezier(.2,.7,.2,1) forwards}

    /* Button */
    .btn{display:inline-flex;align-items:center;gap:10px;padding:14px 22px;border-radius:999px;font-weight:500;font-size:15px;letter-spacing:0;transition:transform .2s,box-shadow .2s,background .2s,color .2s;cursor:pointer;border:0}
    .btn-primary{background:var(--accent);color:#fff;box-shadow:0 8px 24px -8px rgba(232,67,26,.55),0 1px 0 rgba(255,255,255,.2) inset}
    .btn-primary:hover{transform:translateY(-1px);box-shadow:0 14px 28px -10px rgba(232,67,26,.7),0 1px 0 rgba(255,255,255,.2) inset}
    .btn-ghost{background:rgba(26,26,26,.03);color:var(--ink);border:1px solid var(--line);backdrop-filter:blur(8px)}
    .btn-ghost:hover{background:rgba(26,26,26,.06);transform:translateY(-1px)}

    /* Corner brackets */
    .bracket{position:absolute;width:18px;height:18px;opacity:0;animation:heroBracketIn .7s .4s cubic-bezier(.2,.7,.2,1) forwards}
    .bracket::before,.bracket::after{content:'';position:absolute;background:var(--ink);opacity:.55}
    .bracket.tl{top:24px;left:24px}
    .bracket.tl::before{top:0;left:0;width:10px;height:1.5px}
    .bracket.tl::after{top:0;left:0;width:1.5px;height:10px}
    .bracket.tr{top:24px;right:24px}
    .bracket.tr::before{top:0;right:0;width:10px;height:1.5px}
    .bracket.tr::after{top:0;right:0;width:1.5px;height:10px}
    .bracket.bl{bottom:24px;left:24px}
    .bracket.bl::before{bottom:0;left:0;width:10px;height:1.5px}
    .bracket.bl::after{bottom:0;left:0;width:1.5px;height:10px}
    .bracket.br{bottom:24px;right:24px}
    .bracket.br::before{bottom:0;right:0;width:10px;height:1.5px}
    .bracket.br::after{bottom:0;right:0;width:1.5px;height:10px}

    /* Scoped responsive: artboards in canvas are fixed-size so we target the live prototype class */
    .hero-live{container-type:inline-size}
    @container (max-width: 760px){
      .hero-live .nav-center{display:none}
      .hero-live .hero-headline{font-size:56px !important;line-height:1.02 !important}
      .hero-live .hero-sub{font-size:15px !important}
      .hero-live .hero-cta-row{flex-direction:column;align-items:stretch}
      .hero-live .hero-cta-row .btn{justify-content:center}
      .hero-live .giant-wordmark{font-size:36vw !important}
    }

    /* Tweaks panel */
    .tweaks{position:fixed;right:16px;bottom:16px;z-index:100;background:#fff;border:1px solid var(--line);border-radius:14px;box-shadow:0 12px 40px -12px rgba(0,0,0,.25),0 2px 0 rgba(0,0,0,.02);padding:14px;min-width:220px;font-family:'Inter',sans-serif;font-size:13px;color:var(--ink)}
    .tweaks h4{margin:0 0 10px;font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted);font-weight:600}
    .tweaks .row{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:8px 0}
    .tweaks .row + .row{border-top:1px dashed var(--line)}
    .tweaks button.action{background:var(--ink);color:#fff;border:0;padding:8px 12px;border-radius:8px;font-size:12px;font-weight:600;cursor:pointer}
    .tweaks button.action:hover{background:var(--accent)}
    .switch{position:relative;width:36px;height:20px;background:rgba(26,26,26,.15);border-radius:999px;cursor:pointer;transition:background .2s;border:0;padding:0;flex:0 0 auto}
    .switch::after{content:'';position:absolute;top:2px;left:2px;width:16px;height:16px;border-radius:50%;background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.2);transition:transform .2s}
    .switch.on{background:var(--accent)}
    .switch.on::after{transform:translateX(16px)}
  `;
  document.head.appendChild(s);
})();

// ── Logo ────────────────────────────────────────────────────────
function ExtngoLogo({ size = 22 }) {
  return (
    <div style={{display:'flex',alignItems:'center',gap:10,fontFamily:"'Bricolage Grotesque','Geist',sans-serif",fontWeight:700,fontSize:size,letterSpacing:'-0.01em'}}>
      <div style={{
        width:size*1.05,height:size*1.05,borderRadius:'50%',
        background:'var(--accent)',
        display:'flex',alignItems:'center',justifyContent:'center',
        color:'#fff',fontSize:size*0.55,fontWeight:700,
        boxShadow:'0 4px 12px -4px rgba(232,67,26,.6)',
        flex:'0 0 auto',
      }}>
        <svg width={size*0.55} height={size*0.55} viewBox="0 0 16 16" fill="none">
          <path d="M3 8h10M8 3v10M4.5 4.5l7 7M11.5 4.5l-7 7" stroke="#fff" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </div>
      <span style={{display:'flex',alignItems:'baseline',gap:0}}>
        <span style={{color:'var(--ink)'}}>extn</span>
        <span style={{color:'var(--ink)'}}>go</span>
        <span style={{color:'var(--ink-2)',marginLeft:2,fontWeight:600,opacity:.7,fontSize:size*0.75}}>.com</span>
      </span>
    </div>
  );
}

// ── Nav ─────────────────────────────────────────────────────────
function NavBar({ delayBase = 0.05 }) {
  const links = ['Home','Products','Reviews','About','Contact'];
  return (
    <nav style={{
      display:'flex',alignItems:'center',justifyContent:'space-between',
      padding:'22px 40px',position:'relative',zIndex:5,
    }}>
      <div className="anim-fade-down" style={{animationDelay:`${delayBase}s`}}>
        <ExtngoLogo size={23}/>
      </div>
      <div className="nav-center" style={{display:'flex',gap:36,position:'absolute',left:'50%',transform:'translateX(-50%)'}}>
        {links.map((l,i) => (
          <a key={l} href="#"
             className={`navlink anim-fade-down ${i===0?'active':''}`}
             style={{animationDelay:`${delayBase + 0.08 + i*0.07}s`, textDecoration:'none'}}>
            {l}
          </a>
        ))}
      </div>
      <button className="anim-fade-down btn btn-ghost"
              style={{animationDelay:`${delayBase + 0.5}s`, padding:'10px 18px', fontSize:13}}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        B2B Inquiry
      </button>
    </nav>
  );
}

// ── Staggered headline word ──────────────────────────────────────
function Word({ children, delay = 0, className = '', style = {} }) {
  return (
    <span className={`word ${className}`} style={style}>
      <span style={{animationDelay:`${delay}s`}}>{children}</span>
    </span>
  );
}

// ── Giant wordmark background ────────────────────────────────────
// Fade-in + mouse-parallax: tracks pointer within its nearest positioned
// ancestor (the hero) and shifts itself by a small factor for depth.
function GiantWordmark({ shown = true, tone = 'light' }) {
  const ref = React.useRef(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Parallax container = the hero (nearest positioned ancestor)
    const container = el.offsetParent || el.parentElement;
    if (!container) return;
    let raf = 0;
    const onMove = (e) => {
      const r = container.getBoundingClientRect();
      const cx = e.clientX - r.left - r.width / 2;
      const cy = e.clientY - r.top - r.height / 2;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setPos({ x: cx / r.width, y: cy / r.height });
      });
    };
    const onLeave = () => setPos({ x: 0, y: 0 });
    container.addEventListener('mousemove', onMove);
    container.addEventListener('mouseleave', onLeave);
    return () => {
      container.removeEventListener('mousemove', onMove);
      container.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!shown) return null;
  const color = tone === 'light' ? 'rgba(26,26,26,1)' : 'rgba(255,255,255,1)';
  const anim = tone === 'light' ? 'heroWordmark' : 'heroWordmarkDark';
  // Small parallax shift — opposite to pointer for depth illusion
  const tx = -pos.x * 28;
  const ty = -pos.y * 16;

  return (
    <div
      ref={ref}
      className="giant-wordmark hero-display"
      style={{
        position:'absolute',top:'84px',left:0,right:0,display:'flex',alignItems:'flex-start',justifyContent:'center',
        fontSize:'22vw',fontWeight:700,color,
        opacity:0, animation:`${anim} 1.6s .2s cubic-bezier(.2,.7,.2,1) forwards`,
        pointerEvents:'none', userSelect:'none',
        whiteSpace:'nowrap', letterSpacing:'-0.07em',
        lineHeight:0.78,
        zIndex:1,
        willChange:'transform',
        ['--pxShift']: `translate3d(${tx}px, ${ty}px, 0)`,
      }}
    >
      <span style={{
        display:'inline-block',
        transform:`translate3d(${tx}px, ${ty}px, 0)`,
        transition:'transform .4s cubic-bezier(.2,.7,.3,1)',
      }}>
        EXTNGO
      </span>
    </div>
  );
}

// Export to window for other babel scripts
Object.assign(window, { useAnimState, AnimCtx, ExtngoLogo, NavBar, Word, GiantWordmark });
