import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pricingPlans } from '../../lib/siteContent';

gsap.registerPlugin(ScrollTrigger);

const headingLines = [
  ['PICK', 'THE'],
  ['BUILD', 'PATH.'],
];

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll('.reveal-word');
      if (words?.length) {
        gsap.set(words, { y: '105%' });
        ScrollTrigger.create({
          trigger: headingRef.current,
          start: 'top 82%',
          once: true,
          onEnter: () => gsap.to(words, { y: '0%', duration: 1.04, ease: 'power4.out', stagger: 0.066 }),
        });
      }

      const cards = gsap.utils.toArray<HTMLElement>('.pricing-card');
      gsap.fromTo(
        cards,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="ax-section w-full border-t" style={{ background: 'var(--ax-bg)', borderColor: 'var(--ax-border)' }}>
      <div className="ax-container">
        <div className="mb-[var(--content-gap)] grid gap-8 md:grid-cols-[1fr_0.6fr] md:items-end">
          <div>
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>PRICING</p>
            <h2 ref={headingRef} className="font-bold uppercase" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif', fontSize: 'clamp(46px,6vw,96px)', letterSpacing: '-0.045em', lineHeight: 0.9 }}>
              {headingLines.map((line) => (
                <span key={line.join(' ')} className="block">
                  {line.map((word) => <span key={word} className="word-mask" style={{ marginRight: '0.22em' }}><span className="reveal-word block">{word}</span></span>)}
                </span>
              ))}
            </h2>
          </div>
          <p className="text-base leading-7 md:text-lg" style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}>
            Monthly keeps upfront cost low. Ownership gives you the keys from day one. Larger builds are scoped cleanly.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {pricingPlans.map((plan, index) => (
            <article key={plan.name} className="pricing-card relative flex flex-col justify-between border p-8 md:p-10" style={{ borderColor: index === 0 ? 'rgba(200,255,0,0.48)' : 'var(--ax-border)', background: 'var(--ax-surface)' }}>
              {plan.tag && (
                <span className="absolute right-8 top-8 text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>{plan.tag}</span>
              )}
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em]" style={{ color: 'rgba(235,235,235,0.28)', fontFamily: 'Geist, sans-serif' }}>0{index + 1} / PATH</p>
                <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em]" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{plan.name}</h3>
                <p className="mt-8 text-[clamp(28px,3vw,36px)] font-bold tracking-[-0.04em]" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{plan.price}</p>
                <p className="mt-4 min-h-[56px] text-sm leading-6" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>{plan.description}</p>
              </div>
              <div className="mt-10 border-t pt-8" style={{ borderColor: 'var(--ax-border)' }}>
                <ul className="grid gap-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm" style={{ color: 'rgba(235,235,235,0.78)', fontFamily: 'Geist, sans-serif' }}>
                      <span style={{ color: 'var(--ax-lime)' }}>-</span> <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className="mt-10 flex w-full items-center justify-center border py-4 text-[11px] font-semibold uppercase tracking-[0.2em] transition-colors hover:bg-[rgba(235,235,235,0.02)]" style={{ borderColor: index === 0 ? 'rgba(200,255,0,0.5)' : 'var(--ax-border)', color: index === 0 ? 'var(--ax-text)' : 'rgba(235,235,235,0.68)', background: index === 0 ? 'rgba(200,255,0,0.08)' : 'transparent', fontFamily: 'Geist, sans-serif' }}>
                  Start a project
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
