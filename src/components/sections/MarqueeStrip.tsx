import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const items = ['WEBSITES', 'AI SYSTEMS', 'BRANDING', 'PERFORMANCE', 'KW ONTARIO', 'CORE WEB VITALS', 'EDGE-FIRST'];

export default function MarqueeStrip() {
  const stripRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!stripRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 24,
        ease: 'none',
        repeat: -1,
      });

      gsap.fromTo(
        scanRef.current,
        { xPercent: -110 },
        {
          xPercent: 110,
          ease: 'none',
          scrollTrigger: {
            trigger: stripRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.7,
          },
        }
      );
    }, stripRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={stripRef}
      className="relative overflow-hidden border-y py-6"
      style={{ background: 'var(--ax-bg)', borderColor: 'var(--ax-border)' }}
      aria-label="Axiom system capabilities"
    >
      <div
        ref={scanRef}
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(200,255,0,0.16), transparent)' }}
      />
      <div ref={trackRef} className="flex w-max items-center">
        {[...items, ...items, ...items, ...items].map((item, index) => (
          <div key={`${item}-${index}`} className="flex items-center">
            <span
              className="px-8 text-[13px] font-semibold uppercase tracking-[0.3em]"
              style={{ color: index % 3 === 0 ? 'var(--ax-lime)' : 'rgba(235,235,235,0.5)', fontFamily: 'Geist, sans-serif' }}
            >
              {item}
            </span>
            <span className="h-1.5 w-1.5" style={{ background: 'var(--ax-lime)', opacity: 0.72 }} />
          </div>
        ))}
      </div>
    </section>
  );
}
