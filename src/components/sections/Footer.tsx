export default function Footer() {
  const links = ['Work', 'Process', 'About', 'Pricing'];

  return (
    <footer className="relative overflow-hidden border-t px-[clamp(32px,7vw,108px)] py-14 md:py-20" style={{ background: 'var(--ax-bg)', borderColor: 'var(--ax-border)' }}>
      <img src="/logoclear-320.webp" alt="" className="pointer-events-none absolute bottom-[-34%] right-[-4%] w-[72vw] max-w-[840px]" style={{ opacity: 0.055, mixBlendMode: 'screen' }} />
      <div className="relative z-10 grid gap-10 md:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center border" style={{ borderColor: 'rgba(200,255,0,0.28)', background: 'rgba(200,255,0,0.025)' }}>
              <img src="/logoclear-320.webp" alt="" className="h-7 w-7 object-contain" style={{ opacity: 0.86 }} />
            </span>
            <h2 className="text-lg font-semibold uppercase tracking-[0.14em]" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>Axiom Infrastructure</h2>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6" style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}>Websites built to convert. Not to decorate.</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'rgba(200,255,0,0.62)', fontFamily: 'Geist, sans-serif' }}>Pages</p>
          <div className="mt-4 flex flex-col gap-3">
            {links.map((link) => (
              <a key={link} href={`#${link === 'About' ? 'about' : link.toLowerCase()}`} className="text-sm" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>{link}</a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'rgba(200,255,0,0.62)', fontFamily: 'Geist, sans-serif' }}>Contact</p>
          <div className="mt-4 flex flex-col gap-3">
            <a href="mailto:contact@getaxiom.ca" className="text-sm" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>contact@getaxiom.ca</a>
            <a href="tel:+12267531833" className="text-sm" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>(226) 753-1833</a>
            <a href="#contact" className="text-sm" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>Start a project</a>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'rgba(200,255,0,0.62)', fontFamily: 'Geist, sans-serif' }}>Legal</p>
          <div className="mt-4 flex flex-col gap-3">
            <a href="#privacy" className="text-sm" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>Privacy Policy</a>
            <a href="#terms" className="text-sm" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>Terms of Service</a>
          </div>
        </div>
      </div>
      <div className="relative z-10 mt-16 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between" style={{ borderColor: 'var(--ax-border)' }}>
        <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}>© 2026 Axiom Infrastructure.</p>
        <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: 'rgba(235,235,235,0.28)', fontFamily: 'Geist, sans-serif' }}>System shutdown / stable</p>
      </div>
    </footer>
  );
}
