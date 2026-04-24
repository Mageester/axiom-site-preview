import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { processSteps } from '../../lib/siteContent';

gsap.registerPlugin(ScrollTrigger);

const headingLines = [['REVIEW.', 'SCOPE.'], ['BUILD.', 'LAUNCH.']];

const steps = processSteps;

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const mobileLineRef = useRef<HTMLDivElement>(null);

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

      const stations = gsap.utils.toArray<HTMLElement>('.process-station');
      gsap.set(stations, { clipPath: 'inset(0 100% 0 0)' });
      gsap.to(stations, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 0.9,
        stagger: 0.12,
        ease: 'power4.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%', once: true },
      });

      const path = pathRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 52%',
            end: 'bottom 58%',
            scrub: 0.8,
          },
        });
      }

      if (window.matchMedia('(min-width: 768px)').matches && pinRef.current && trackRef.current) {
        const distance = () => Math.max(0, trackRef.current!.scrollWidth - pinRef.current!.clientWidth);
        gsap.to(trackRef.current, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: pinRef.current,
            start: 'top top+=72',
            end: () => `+=${distance() + window.innerHeight * 0.7}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });
      }

      if (mobileLineRef.current) {
        gsap.fromTo(mobileLineRef.current, { scaleY: 0 }, {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: mobileLineRef.current, start: 'top 78%', end: 'bottom 30%', scrub: 0.7 },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="process" className="ax-section relative" style={{ background: 'var(--ax-bg)' }}>
      <div className="ax-container relative z-10">
        <p className="mb-7 text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>PROCESS</p>
        <h2 ref={headingRef} className="font-bold uppercase" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif', fontSize: 'clamp(46px,6vw,96px)', letterSpacing: '-0.045em', lineHeight: 0.9 }}>
          {headingLines.map((line) => (
            <span key={line.join(' ')} className="block">
              {line.map((word) => <span key={word} className="word-mask" style={{ marginRight: '0.22em' }}><span className="reveal-word block">{word}</span></span>)}
            </span>
          ))}
        </h2>
        <p className="mt-8 max-w-2xl text-base leading-7 md:text-lg" style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}>
          A clear build process with no guessing halfway through.
        </p>
      </div>

      <div ref={pinRef} className="relative mt-[var(--content-gap)] overflow-hidden md:h-[74vh] md:min-h-[640px] md:pt-16" style={{ paddingLeft: 'var(--page-pad-x)', paddingRight: 'var(--page-pad-x)' }}>
        <svg className="pointer-events-none absolute right-0 top-[170px] hidden h-20 md:block" style={{ left: 'var(--page-pad-x)' }} viewBox="0 0 1400 80" fill="none" preserveAspectRatio="none">
          <path ref={pathRef} d="M0 40 H1340" stroke="rgba(200,255,0,0.78)" strokeWidth="2" />
        </svg>

        <div ref={mobileLineRef} className="absolute bottom-20 top-10 w-px origin-top md:hidden" style={{ left: 'calc(var(--page-pad-x) + 10px)', background: 'var(--ax-lime)' }} />
        <div ref={trackRef} className="grid gap-6 md:flex md:w-max md:gap-12">
          {steps.map((step, index) => (
            <article key={step.title} className="process-station relative overflow-hidden border p-7 md:w-[430px] md:p-9" style={{ borderColor: 'var(--ax-border)', background: 'var(--ax-surface)' }}>
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(235,235,235,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(235,235,235,0.035) 1px, transparent 1px)',
                  backgroundSize: '34px 34px',
                  opacity: 0.8,
                }}
              />
              <div className="absolute left-0 top-0 h-full w-px" style={{ background: index === 0 ? 'var(--ax-lime)' : 'rgba(235,235,235,0.12)' }} />
              <div className="mb-8 flex items-center justify-between">
                <span className="relative text-[11px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}>{String(index + 1).padStart(2, '0')}</span>
                <span className="relative h-2 w-2" style={{ background: 'var(--ax-lime)', boxShadow: '0 0 18px rgba(200,255,0,0.55)' }} />
              </div>
              <span className="relative text-[10px] uppercase tracking-[0.24em]" style={{ color: 'rgba(235,235,235,0.28)', fontFamily: 'Geist, sans-serif' }}>{step.signal}</span>
              <h3 className="relative mt-5 text-4xl font-semibold tracking-[-0.04em]" style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}>{step.title}</h3>
              <p className="relative mt-6 min-h-[112px] text-base leading-7" style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}>{step.body}</p>
              <div className="relative mt-8 h-px w-full" style={{ background: 'linear-gradient(90deg, var(--ax-lime), transparent)' }} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
