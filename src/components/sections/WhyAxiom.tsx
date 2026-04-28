import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whyAxiomPoints } from '../../lib/siteContent';
import { motionDuration, motionEase, motionStagger, prefersReducedMotion } from '../../lib/motion';

gsap.registerPlugin(ScrollTrigger);

const headingLines = [
  ['WHAT', 'WE'],
  ['WON’T', 'SHIP.'],
];

const points = whyAxiomPoints;

export default function WhyAxiom() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const reduced = prefersReducedMotion();
      const words = headingRef.current?.querySelectorAll('.reveal-word');
      if (words?.length) {
        gsap.set(words, { y: reduced ? '0%' : '105%' });
        if (!reduced) {
          ScrollTrigger.create({
            trigger: headingRef.current,
            start: 'top 82%',
            once: true,
            onEnter: () => gsap.to(words, { y: '0%', duration: motionDuration.scene, ease: motionEase.reveal, stagger: motionStagger.word }),
          });
        }
      }

      const rows = gsap.utils.toArray<HTMLElement>('.why-cell');
      if (reduced) {
        gsap.set(rows, { opacity: 1, x: 0 });
        return;
      }

      gsap.fromTo(
        rows,
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          duration: motionDuration.reveal,
          stagger: motionStagger.card,
          ease: motionEase.settle,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="why" className="ax-section w-full border-t" style={{ background: 'var(--ax-bg)', borderColor: 'var(--ax-border)' }}>
      <div className="ax-container">
        <div className="grid gap-[var(--content-gap)] lg:grid-cols-[0.8fr_1fr] lg:gap-20">
          <div>
            <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>WHY AXIOM</p>
            <h2 ref={headingRef} className="font-bold uppercase" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif', fontSize: 'clamp(46px,6vw,96px)', letterSpacing: '-0.045em', lineHeight: 0.9 }}>
              {headingLines.map((line) => (
                <span key={line.join(' ')} className="block">
                  {line.map((word) => <span key={word} className="word-mask" style={{ marginRight: '0.22em' }}><span className="reveal-word block">{word}</span></span>)}
                </span>
              ))}
            </h2>
            <p className="mt-8 text-base leading-7 md:text-lg" style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}>
              A weak site hides the offer, buries proof, loads slowly, or dies after launch. We build against that.
            </p>
          </div>

          <div className="grid gap-px border" style={{ borderColor: 'var(--ax-border)' }}>
            {points.map(([title, body]) => (
              <article key={title} className="why-cell relative p-7 md:p-9 border-b last:border-b-0" style={{ background: 'var(--ax-surface)', borderColor: 'var(--ax-border)' }}>
                <h3 className="relative mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--ax-text)] font-geist">
                  {title}
                </h3>
                <p className="relative mt-4 max-w-lg text-base leading-7 text-[rgba(235,235,235,0.58)] font-geist">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
