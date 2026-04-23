// PinnedProduct — single product image rendered at the page level,
// position:fixed relative to viewport, interpolated between two DOM
// anchor rects (data-product-anchor="hero" and "detail").
//
// - On hero: matches the hero anchor's on-screen rect.
// - On scroll, once the detail section starts entering the viewport,
//   smoothly lerps to the detail anchor's rect.
// - When detail is fully in view, the product sits at the detail anchor.
//
// Important: the outer wrapper ONLY receives the ref-set transform for
// position. The entrance fade + idle float live on inner children so
// they don't clobber the positional transform.

function PinnedProduct() {
  const wrapRef = React.useRef(null);
  const innerRef = React.useRef(null);
  const rafRef = React.useRef(0);

  React.useEffect(() => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;

    const update = () => {
      const heroA = document.querySelector('[data-product-anchor="hero"]');
      const detailA = document.querySelector('[data-product-anchor="detail"]');
      if (!heroA) return;
      const hr = heroA.getBoundingClientRect();
      const dr = detailA ? detailA.getBoundingClientRect() : hr;
      const vh = window.innerHeight;

      const start = vh * 0.80;
      const end = vh * 0.30;
      let p = 0;
      if (detailA && dr.top <= start) {
        p = (start - dr.top) / (start - end);
      }
      p = Math.max(0, Math.min(1, p));
      const e = p * p * (3 - 2 * p);

      const x = hr.left + (dr.left - hr.left) * e;
      const y = hr.top + (dr.top - hr.top) * e;
      const w = hr.width + (dr.width - hr.width) * e;
      const h = hr.height + (dr.height - hr.height) * e;

      wrap.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      wrap.style.width = `${w}px`;
      wrap.style.height = `${h}px`;

      // Reveal once we have real dimensions
      if (!wrap.dataset.ready && w > 0) {
        wrap.dataset.ready = '1';
        // Trigger entrance on the INNER element (safe — doesn't touch wrap transform)
        inner.style.animation = 'pinnedProductIn 1.0s .4s cubic-bezier(.2,.7,.2,1) forwards';
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    // Initial sync — run twice to catch layout settle after fonts/images
    update();
    const t = setTimeout(update, 80);
    const t2 = setTimeout(update, 300);
    const t3 = setTimeout(update, 800);

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    // Also re-sync after img load
    const img = inner.querySelector('img');
    if (img) img.addEventListener('load', update);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (img) img.removeEventListener('load', update);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(t); clearTimeout(t2); clearTimeout(t3);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      aria-hidden="true"
      style={{
        position:'fixed',
        top:0,left:0,
        width:0,height:0,
        zIndex:20,
        pointerEvents:'none',
        willChange:'transform, width, height',
      }}
    >
      {/* Inner: entrance fade/scale — does NOT touch wrapper transform */}
      <div
        ref={innerRef}
        style={{
          width:'100%',height:'100%',
          opacity:0,
          transform:'scale(.92)',
        }}
      >
        {/* Float layer: its own gentle loop */}
        <div style={{
          width:'100%',height:'100%',
          animation:'heroFloat 6s 2s ease-in-out infinite',
          filter:'drop-shadow(0 40px 60px rgba(60,40,20,.3)) drop-shadow(0 15px 25px rgba(60,40,20,.18))',
        }}>
          <img src="assets/product-reel.png"
               alt="Extngo 50ft retractable CAT6 cable reel"
               style={{width:'100%',height:'100%',objectFit:'contain',display:'block'}}/>
        </div>
      </div>
    </div>
  );
}

// Entrance keyframe that ONLY touches opacity + scale (no translate) so
// it never conflicts with the positional transform on the wrapper.
(function(){
  if (document.getElementById('pinned-product-css')) return;
  const s = document.createElement('style');
  s.id = 'pinned-product-css';
  s.textContent = `@keyframes pinnedProductIn{0%{opacity:0;transform:scale(.92)}100%{opacity:1;transform:scale(1)}}`;
  document.head.appendChild(s);
})();

Object.assign(window, { PinnedProduct });
