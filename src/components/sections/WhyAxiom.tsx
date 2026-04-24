import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whyAxiomPoints } from '../../lib/siteContent';

gsap.registerPlugin(ScrollTrigger);

const headingLines = [['WHAT', 'WE'], ["WON'T", 'SHIP.']];

const points = whyAxiomPoints;

export default function WhyAxiom() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const statementRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const headingWords = headingRef.current?.querySelectorAll('.reveal-word');
      if (headingWords?.length) {
        gsap.set(headingWords, { y: '105%' });
        ScrollTrigger.create({
          trigger: headingRef.current,
          start: 'top 82%',
          once: true,
          onEnter: () => gsap.to(headingWords, { y: '0%', duration: 1.05, ease: 'power4.out', stagger: 0.065 }),
        });
      }

      const words = statementRef.current?.querySelectorAll('.why-word');
      if (words?.length) {
        gsap.set(words, { y: '105%' });
        ScrollTrigger.create({
          trigger: statementRef.current,
          start: 'top 80%',
          once: true,
          onEnter: () => gsap.to(words, { y: '0%', duration: 0.9, ease: 'power4.out', stagger: 0.024 }),
        });
      }

      gsap.utils.toArray<HTMLElement>('.why-cell').forEach((cell, index) => {
        const edge = cell.querySelector('.why-edge');
        gsap.set(cell, { clipPath: 'inset(0 100% 0 0)' });
        gsap.set(edge, { scaleY: 0, transformOrigin: '50% 0%' });
        const tl = gsap.timeline({
          scrollTrigger: { trigger: cell, start: 'top 82%', once: true },
        });
        tl.to(cell, { clipPath: 'inset(0 0% 0 0)', duration: 0.82, ease: 'power4.inOut', delay: index * 0.04 })
          .to(edge, { scaleY: 1, duration: 0.45, ease: 'power3.out' }, '-=0.24');
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statement = 'A site is weak when the offer is unclear, proof is buried, load time drags, or the handoff dies after launch. We build against that.';

  return (
    <section ref={sectionRef} id="about" className="relative overflow-hidden px-[clamp(32px,7vw,108px)] py-32 md:py-40" style={{ background: 'var(--ax-bg)' }}>
      <div className="relative border px-6 py-10 md:px-10 md:py-14" style={{ background: 'var(--ax-surface)', borderColor: 'var(--ax-border)' }}>
        <img src="/logoclear-320.webp" alt="" className="pointer-events-none absolute right-[-4%] top-[-8%] w-[58vw] max-w-[680px]" style={{ opacity: 0.055, mixBlendMode: 'screen' }} />
        <div className="relative z-10">
          <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>WHY AXIOM</p>
          <h2 ref={headingRef} className="font-bold uppercase" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif', fontSize: 'clamp(46px,6vw,92px)', letterSpacing: '-0.045em', lineHeight: 0.9 }}>
            {headingLines.map((line) => (
              <span key={line.join(' ')} className="block">
                {line.map((word) => <span key={word} className="word-mask mr-[0.2em]"><span className="reveal-word block">{word}</span></span>)}
              </span>
            ))}
          </h2>
          <p ref={statementRef} className="mt-10 max-w-5xl text-3xl font-semibold leading-[1.08] tracking-[-0.04em] md:text-6xl" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>
            {statement.split(' ').map((word, index) => (
              <span key={`${word}-${index}`} className="word-mask mr-[0.18em]">
                <span className="why-word inline-block">{word}</span>
              </span>
            ))}
          </p>

          <div className="mt-16 grid gap-px md:grid-cols-2" style={{ background: 'var(--ax-border)' }}>
            {points.map(([title, body], index) => (
              <article key={title} className="why-cell relative min-h-[220px] overflow-hidden p-6 md:p-8" style={{ background: 'var(--ax-surface)' }}>
                <div className="why-edge absolute bottom-0 left-0 top-0 w-[2px]" style={{ background: 'var(--ax-lime)' }} />
                <span className="text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'rgba(200,255,0,0.64)', fontFamily: 'Geist, sans-serif' }}>{String(index + 1).padStart(2, '0')}</span>
                <h3 className="mt-8 text-2xl font-semibold tracking-[-0.03em]" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{title}</h3>
                <p className="mt-5 text-base leading-7" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>{body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
