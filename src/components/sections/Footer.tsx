import { Link } from 'react-router-dom';

export default function Footer() {
  const links = ['Work', 'Process', 'About', 'Pricing'];

  return (
    <footer className="ax-section-sm relative overflow-hidden border-t" style={{ background: 'var(--ax-bg)', borderColor: 'var(--ax-border)' }}>
      <img src="/logoclear-320.webp" alt="" className="pointer-events-none absolute bottom-[-18%] right-[-8%] w-[78vw] max-w-[900px]" style={{ opacity: 0.04, mixBlendMode: 'screen' }} />
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full" style={{ background: 'linear-gradient(90deg, transparent, rgba(200,255,0,0.42), transparent)' }} />
      <div className="ax-container relative z-10 grid gap-12 md:grid-cols-[1.35fr_0.65fr_0.75fr_0.65fr]">
        <div>
          <div className="max-w-[330px]">
            <h2 className="text-xl font-semibold uppercase tracking-[0.16em]" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>Axiom Infrastructure</h2>
            <div className="mt-6 h-px w-20" style={{ background: 'rgba(200,255,0,0.5)' }} />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-6" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>Websites built to convert. Not to decorate.</p>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'rgba(200,255,0,0.62)', fontFamily: 'Geist, sans-serif' }}>Pages</p>
          <div className="mt-4 flex flex-col gap-3">
            {links.map((link) => (
              <Link key={link} to={`/${link.toLowerCase()}`} className="text-sm transition-colors hover:text-[var(--ax-text)]" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>{link}</Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'rgba(200,255,0,0.62)', fontFamily: 'Geist, sans-serif' }}>Contact</p>
          <div className="mt-4 flex flex-col gap-3">
            <a href="mailto:contact@getaxiom.ca" className="text-sm transition-colors hover:text-[var(--ax-text)]" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>contact@getaxiom.ca</a>
            <a href="tel:+12267531833" className="text-sm transition-colors hover:text-[var(--ax-text)]" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>(226) 753-1833</a>
            <Link to="/start-a-project" className="text-sm transition-colors hover:text-[#d4ff33]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>Start a project</Link>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'rgba(200,255,0,0.62)', fontFamily: 'Geist, sans-serif' }}>Legal</p>
          <div className="mt-4 flex flex-col gap-3">
            <Link to="/privacy" className="text-sm transition-colors hover:text-[var(--ax-text)]" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>Privacy Policy</Link>
            <Link to="/terms" className="text-sm transition-colors hover:text-[var(--ax-text)]" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>Terms of Service</Link>
          </div>
        </div>
      </div>
      <div className="ax-container relative z-10 mt-16 flex flex-col gap-4 border-t pt-6 md:flex-row md:items-center md:justify-between" style={{ borderColor: 'var(--ax-border)' }}>
        <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}>© 2026 Axiom Infrastructure.</p>
        <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: 'rgba(235,235,235,0.28)', fontFamily: 'Geist, sans-serif' }}>System shutdown / stable</p>
      </div>
    </footer>
  );
}
