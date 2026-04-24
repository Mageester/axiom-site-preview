import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function FinalCTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const readyRef = useRef<HTMLHeadingElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(readyRef.current, { clipPath: 'inset(0 0 100% 0)', y: 70 });
      gsap.set(contentRef.current, { clipPath: 'inset(0 100% 0 0)' });
      gsap.set(scanRef.current, { xPercent: -120 });

      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 62%', once: true },
      });

      tl.to(readyRef.current, { clipPath: 'inset(0 0 0% 0)', y: 0, duration: 0.32, ease: 'power4.out' })
        .to(scanRef.current, { xPercent: 125, duration: 0.9, ease: 'power3.inOut' }, 0.08)
        .to(contentRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.72, ease: 'power4.inOut' }, 0.34);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="relative flex min-h-[92vh] items-center overflow-hidden py-32" style={{ paddingLeft: 'var(--page-pad-x)', paddingRight: 'var(--page-pad-x)', background: 'var(--ax-bg)' }}>
      <img src="/logoclear-320.webp" alt="" className="pointer-events-none absolute left-1/2 top-1/2 w-[92vw] max-w-[980px] -translate-x-1/2 -translate-y-1/2" style={{ opacity: 0.07, mixBlendMode: 'screen' }} />
      <div className="absolute inset-0 opacity-[0.16]" style={{ backgroundImage: 'linear-gradient(rgba(235,235,235,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(235,235,235,0.04) 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
      <div ref={scanRef} className="pointer-events-none absolute left-0 top-1/2 h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--ax-lime), transparent)', boxShadow: '0 0 36px rgba(200,255,0,0.38)' }} />

      <div className="relative z-10 max-w-6xl">
        <h2 ref={readyRef} className="font-bold uppercase" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif', fontSize: 'clamp(76px,16vw,230px)', letterSpacing: '-0.065em', lineHeight: 0.84 }}>
          READY?
        </h2>
        <div ref={contentRef} className="mt-14 grid gap-10 md:grid-cols-[0.85fr_1fr] md:items-end">
          <p className="max-w-2xl text-xl leading-8 md:text-2xl" style={{ color: 'rgba(235,235,235,0.72)', fontFamily: 'Geist, sans-serif' }}>
            Tell us what the business needs. We’ll point you to the right path.
          </p>
          <div className="flex flex-col gap-5 md:items-start">
            <Link to="/start-a-project" className="inline-flex w-fit items-center gap-5 px-7 py-4 text-[12px] font-semibold uppercase tracking-[0.16em]" style={{ background: 'var(--ax-lime)', color: 'var(--ax-bg)', fontFamily: 'Geist, sans-serif', borderRadius: 0 }}>
              Start a project <span>→</span>
            </Link>
            <p className="text-[11px] uppercase tracking-[0.22em]" style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}>
              Review → Scope → Build → Launch
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
