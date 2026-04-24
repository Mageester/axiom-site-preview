import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const navLinks = ['Work', 'Services', 'Process', 'Contact'];

export default function Navbar() {
  const navRef     = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);

  // Scroll listener for background transition
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Animate nav in on mount
  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.3 }
    );
  }, []);

  // Mobile overlay animation
  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    if (menuOpen) {
      gsap.set(overlay, { display: 'flex' });
      gsap.fromTo(overlay,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power4.inOut' }
      );
      gsap.fromTo(overlay.querySelectorAll('.mobile-link'),
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.5, ease: 'power3.out', delay: 0.3 }
      );
    } else {
      gsap.to(overlay, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.5,
        ease: 'power4.inOut',
        onComplete: () => gsap.set(overlay, { display: 'none' })
      });
    }
  }, [menuOpen]);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-8 transition-all duration-400"
        style={{
          height: '64px',
          background: scrolled ? 'rgba(6,6,6,0.92)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--ax-border)' : '1px solid transparent',
          transition: 'background 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease',
        }}
      >
        <a href="/" className="group flex items-center no-underline" aria-label="Axiom Infrastructure home">
          <img
            src="/logoclear-320.webp"
            alt="Axiom"
            className="block h-auto w-[104px] object-contain transition-opacity duration-300 md:w-[116px]"
            style={{ opacity: scrolled ? 0.92 : 0.86 }}
          />
          <span
            className="ml-3 hidden h-5 w-px transition-colors duration-300 sm:block"
            style={{ background: scrolled ? 'rgba(200,255,0,0.38)' : 'rgba(235,235,235,0.18)' }}
          />
          <span
            className="ml-3 hidden text-[10px] font-semibold uppercase tracking-[0.22em] sm:block"
            style={{ color: 'rgba(235,235,235,0.46)', fontFamily: 'Geist, sans-serif' }}
          >
            Infrastructure
          </span>
        </a>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-geist text-[var(--ax-muted)] hover:text-[var(--ax-text)] transition-colors duration-200"
              style={{ fontSize: '13px', letterSpacing: '0.02em' }}
            >
              {link}
            </a>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="hidden md:block bg-[var(--ax-lime)] text-[var(--ax-bg)] font-geist font-semibold hover:bg-[#d4ff33] transition-colors duration-150 rounded-none"
            style={{ fontSize: '12px', letterSpacing: '0.08em', padding: '10px 20px', borderRadius: '0' }}
          >
            Start a Project
          </a>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2 bg-transparent border-none"
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span
              className="block h-px bg-[var(--ax-text)] transition-all duration-300"
              style={{
                width: '22px',
                transform: menuOpen ? 'rotate(45deg) translate(4px, 4px)' : 'none',
              }}
            />
            <span
              className="block h-px bg-[var(--ax-text)] transition-all duration-300"
              style={{
                width: '22px',
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px bg-[var(--ax-text)] transition-all duration-300"
              style={{
                width: '22px',
                transform: menuOpen ? 'rotate(-45deg) translate(4px, -4px)' : 'none',
              }}
            />
          </button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-40 bg-[var(--ax-bg)] flex-col items-start justify-center px-8 gap-6"
        style={{ display: 'none', clipPath: 'inset(0 0 100% 0)' }}
      >
        {navLinks.map(link => (
          <a
            key={link}
            href={`#${link.toLowerCase()}`}
            className="mobile-link block font-geist font-medium text-[var(--ax-text)] no-underline"
            style={{ fontSize: '48px', letterSpacing: '-0.02em', lineHeight: 1.1 }}
            onClick={() => setMenuOpen(false)}
          >
            {link}
          </a>
        ))}
        <a
          href="#contact"
          className="mobile-link mt-4 inline-block bg-[var(--ax-lime)] text-[var(--ax-bg)] font-geist font-semibold no-underline rounded-none"
          style={{ fontSize: '13px', letterSpacing: '0.08em', padding: '14px 28px', borderRadius: '0' }}
          onClick={() => setMenuOpen(false)}
        >
          Start a Project
        </a>
      </div>
    </>
  );
}
