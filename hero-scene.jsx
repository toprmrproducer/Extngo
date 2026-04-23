// Hero background — real product photo, desaturated/lightened for
// light-theme legibility. Ken Burns slow zoom on load.

function HeroScene({ style = {}, kenBurns = true }) {
  return (
    <div style={{position:'absolute',inset:0,overflow:'hidden',...style}}>
      <div style={{
        position:'absolute',inset:0,
        backgroundImage:"url('assets/hero-bg.jpg')",
        backgroundSize:'cover',
        backgroundPosition:'center 60%',
        filter:'saturate(.85) brightness(1.03) contrast(.98)',
        animation: kenBurns ? 'heroKen 14s ease-out forwards' : 'none',
        transformOrigin:'60% 55%',
      }}/>
      {/* Soft lightening wash so the image feels part of a light theme */}
      <div style={{
        position:'absolute',inset:0,
        background:'linear-gradient(180deg, rgba(246,243,238,.25) 0%, rgba(246,243,238,.0) 30%, rgba(246,243,238,.0) 70%, rgba(246,243,238,.2) 100%)',
        pointerEvents:'none',
      }}/>
    </div>
  );
}

Object.assign(window, { HeroScene });
