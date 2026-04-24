import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { pricingPlans } from '../../lib/siteContent';

gsap.registerPlugin(ScrollTrigger);

const headingLines = [['REAL', 'PRICING.'], ['NO', 'SALES', 'CALL'], ['REQUIRED.']];

const plans = pricingPlans;

export default function Pricing() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);

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
          onEnter: () => gsap.to(words, { y: '0%', duration: 1.04, ease: 'power4.out', stagger: 0.06 }),
        });
      }

      const cards = gsap.utils.toArray<HTMLElement>('.pricing-plan');
      gsap.set(cards, { clipPath: 'inset(0 100% 0 0)' });
      gsap.set(scanRef.current, { xPercent: -125 });
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top 64%', once: true },
      });
      tl.to(scanRef.current, { xPercent: 128, duration: 1.25, ease: 'power3.inOut' })
        .to(cards, { clipPath: 'inset(0 0% 0 0)', duration: 0.82, stagger: 0.12, ease: 'power4.out' }, 0.22);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="ax-section relative overflow-hidden" style={{ background: 'var(--ax-bg)' }}>
      <div ref={scanRef} className="pointer-events-none absolute left-0 top-[47%] h-[2px] w-full" style={{ background: 'linear-gradient(90deg, transparent, var(--ax-lime), transparent)', boxShadow: '0 0 28px rgba(200,255,0,0.28)' }} />
      <div className="ax-container">
      <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>PRICING</p>
      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <h2 ref={headingRef} className="font-bold uppercase" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif', fontSize: 'clamp(42px,5.5vw,86px)', letterSpacing: '-0.045em', lineHeight: 0.9 }}>
          {headingLines.map((line) => (
            <span key={line.join(' ')} className="block">
              {line.map((word) => <span key={word} className="word-mask mr-[0.2em]"><span className="reveal-word block">{word}</span></span>)}
            </span>
          ))}
        </h2>
        <p className="max-w-2xl text-base leading-7 md:text-lg" style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}>
          Choose the path that matches the business. Monthly keeps the upfront cost low. Ownership gives you the keys from day one. Larger rebuilds get scoped cleanly.
        </p>
      </div>

      <div className="mt-[var(--content-gap)] grid gap-8 lg:grid-cols-3">
        {plans.map((plan, index) => (
          <article
            key={plan.name}
            className="pricing-plan group relative overflow-hidden border p-7 transition-colors duration-300 hover:border-[var(--ax-lime)] md:p-9"
            style={{
              background: 'linear-gradient(180deg, rgba(15,15,15,0.98), rgba(6,6,6,0.96))',
              borderColor: index === 0 ? 'rgba(200,255,0,0.48)' : 'var(--ax-border)',
              borderRadius: 0,
            }}
          >
            <div
              className="pointer-events-none absolute inset-0 opacity-50 transition-transform duration-500 group-hover:translate-x-3"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(235,235,235,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(235,235,235,0.032) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                maskImage: 'linear-gradient(180deg, #000, transparent 78%)',
              }}
            />
            <div className="absolute left-0 top-0 h-[3px] w-full origin-left scale-x-50 transition-transform duration-500 group-hover:scale-x-100" style={{ background: index === 0 ? 'var(--ax-lime)' : 'rgba(235,235,235,0.18)' }} />
            <span className="relative mb-4 block text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgba(235,235,235,0.22)', fontFamily: 'Geist, sans-serif' }}>
                MODE / {String(index + 1).padStart(2, '0')}
            </span>
            <div className="relative flex min-h-[86px] items-start justify-between gap-5">
              <h3 className="text-2xl font-semibold tracking-[-0.04em]" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{plan.name}</h3>
              {plan.tag && <span className="border px-3 py-2 text-[9px] font-semibold uppercase tracking-[0.2em]" style={{ borderColor: 'rgba(200,255,0,0.36)', color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>{plan.tag}</span>}
            </div>
            <p className="relative mt-8 text-4xl font-bold tracking-[-0.055em]" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{plan.price}</p>
            <p className="relative mt-5 min-h-[104px] text-base leading-7" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>{plan.description}</p>
            <div className="relative my-8 h-px w-full transition-transform duration-500 group-hover:translate-x-3" style={{ background: 'linear-gradient(90deg, var(--ax-lime), rgba(235,235,235,0.1), transparent)' }} />
            <ul className="relative space-y-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-3 text-sm" style={{ color: 'rgba(235,235,235,0.7)', fontFamily: 'Geist, sans-serif' }}>
                  <span style={{ color: 'var(--ax-lime)' }}>—</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <a href="#contact" className="relative mt-10 inline-flex items-center gap-4 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>
              Select path <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </a>
          </article>
        ))}
      </div>
      </div>
    </section>
  );
}
