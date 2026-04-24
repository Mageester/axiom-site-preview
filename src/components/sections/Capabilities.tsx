import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Capability = {
  title: string;
  label: string;
  description: string;
};

const headingLines = [
  ['SYSTEMS', 'THAT', 'MAKE'],
  ['LOCAL', 'BUSINESSES'],
  ['LOOK', 'SERIOUS.'],
];

const stats = [
  { value: 90, suffix: '+', label: 'Lighthouse target' },
  { value: 2, prefix: '<', suffix: 's', label: 'Load-time target' },
  { value: 4, label: 'Core build systems' },
  { value: 0, label: 'Template dependency' },
];

const capabilities: Capability[] = [
  {
    title: 'Websites & Features',
    label: 'Interface systems',
    description:
      'Custom React interfaces, conversion-focused pages, booking paths, quote flows, service pages, and local-business systems built to feel established from the first click.',
  },
  {
    title: 'Visual Branding',
    label: 'Trust layer',
    description:
      'Sharp visual direction, typography, spacing, color systems, and web presence that make a business feel more trusted before the first conversation.',
  },
  {
    title: 'AI Integration',
    label: 'Operational tools',
    description:
      'Internal tools, lead systems, automations, AI-assisted workflows, and practical business utilities designed around real operations — not gimmicks.',
  },
  {
    title: 'Performance Audits',
    label: 'Technical cleanup',
    description:
      'Speed, accessibility, technical cleanup, mobile experience, SEO foundations, and interface reviews that expose what makes a site feel weak or slow.',
  },
];

const formatStat = (value: number, stat: (typeof stats)[number]) =>
  `${stat.prefix ?? ''}${Math.round(value)}${stat.suffix ?? ''}`;

export default function Capabilities() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const statValueRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
  const lineRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll('.reveal-word');
      const rows = gsap.utils.toArray<HTMLElement>('.capability-row');

      if (words?.length) {
        gsap.set(words, { y: prefersReduced ? '0%' : '105%', transformOrigin: '50% 100%' });

        if (!prefersReduced) {
          ScrollTrigger.create({
            trigger: headingRef.current,
            start: 'top 82%',
            once: true,
            onEnter: () => {
              gsap.to(words, {
                y: '0%',
                duration: 1.08,
                ease: 'power4.out',
                stagger: 0.064,
              });
            },
          });
        }
      }

      if (!prefersReduced) {
        gsap.set(panelRef.current, { clipPath: 'inset(0 0 100% 0)', y: 24 });
        gsap.set(rows, { clipPath: 'inset(0 100% 0 0)', x: 28 });
        gsap.set(scanRef.current, { scaleY: 0, transformOrigin: '50% 0%' });

        const intro = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 68%',
            once: true,
          },
        });

        intro
          .to(scanRef.current, {
            scaleY: 1,
            duration: 0.72,
            ease: 'power3.inOut',
          }, 0)
          .to(scanRef.current, {
            yPercent: 112,
            duration: 1.18,
            ease: 'power2.inOut',
          }, 0.08)
          .to(panelRef.current, {
            clipPath: 'inset(0 0 0% 0)',
            y: 0,
            duration: 1,
            ease: 'power4.inOut',
          }, 0.18)
          .to(rows, {
            clipPath: 'inset(0 0% 0 0)',
            x: 0,
            duration: 0.92,
            stagger: 0.09,
            ease: 'power4.out',
          }, 0.36);
      }

      ScrollTrigger.create({
        trigger: panelRef.current,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          stats.forEach((stat, index) => {
            const node = statValueRefs.current[index];
            if (!node) return;

            const counter = { value: 0 };
            gsap.to(counter, {
              value: stat.value,
              duration: prefersReduced ? 0 : 1.15,
              ease: 'power3.out',
              onUpdate: () => {
                node.textContent = formatStat(counter.value, stat);
              },
              onComplete: () => {
                node.textContent = formatStat(stat.value, stat);
              },
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      contentRefs.current.forEach((content, index) => {
        if (!content) return;

        const isActive = index === activeIndex;
        gsap.to(content, {
          height: isActive ? content.scrollHeight : 0,
          duration: 0.58,
          ease: 'power4.inOut',
        });
      });

      lineRefs.current.forEach((line, index) => {
        if (!line) return;
        gsap.to(line, {
          scaleX: index === activeIndex ? 1 : 0,
          duration: 0.5,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [activeIndex]);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="ax-section relative w-full"
      style={{
        background: 'var(--ax-bg)',
      }}
    >
      <div
        ref={scanRef}
        className="pointer-events-none absolute left-0 top-0 h-[46%] w-full"
        style={{
          background:
            'linear-gradient(180deg, transparent, rgba(200,255,0,0.2), transparent)',
          opacity: 0.72,
        }}
      />

      <div className="ax-container relative z-10">
      <div className="mb-[var(--content-gap)] max-w-5xl">
        <p
          className="mb-7 text-[11px] font-semibold uppercase tracking-[0.24em]"
          style={{ color: 'var(--ax-lime)', fontFamily: 'Geist, sans-serif' }}
        >
          CAPABILITIES
        </p>
        <h2
          ref={headingRef}
          className="font-bold uppercase"
          style={{
            color: 'var(--ax-text)',
            fontFamily: 'Geist, sans-serif',
            fontSize: 'clamp(42px, 6vw, 92px)',
            letterSpacing: '-0.045em',
            lineHeight: 0.9,
          }}
        >
          {headingLines.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line.map((word) => (
                <span key={word} className="word-mask" style={{ marginRight: '0.2em' }}>
                  <span className="reveal-word block">{word}</span>
                </span>
              ))}
            </span>
          ))}
        </h2>
        <p
          className="mt-8 max-w-2xl text-base leading-7 md:text-lg"
          style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}
        >
          Axiom builds the visible layer customers judge first — and the technical layer that keeps it fast, sharp, and reliable.
        </p>
      </div>

      <div className="relative z-10 grid gap-[var(--content-gap)] lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
        <aside className="lg:sticky lg:top-28">
          <div
            ref={panelRef}
            className="relative overflow-hidden border p-5 md:p-7"
            style={{
              background: 'var(--ax-surface)',
              borderColor: 'var(--ax-border)',
            }}
          >
            <div
              className="absolute bottom-0 left-0 top-0 w-[2px]"
              style={{
                background:
                  'linear-gradient(180deg, transparent, var(--ax-lime), rgba(200,255,0,0.1), transparent)',
              }}
            />
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(235,235,235,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(235,235,235,0.04) 1px, transparent 1px)',
                backgroundSize: '36px 36px',
                maskImage: 'linear-gradient(180deg, #000, transparent 82%)',
              }}
            />

            <div className="relative flex items-center justify-between border-b pb-5" style={{ borderColor: 'var(--ax-border)' }}>
              <span className="text-[10px] font-semibold uppercase tracking-[0.24em]" style={{ color: 'rgba(200,255,0,0.68)', fontFamily: 'Geist, sans-serif' }}>
                BUILD STANDARD
              </span>
              <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgba(235,235,235,0.28)', fontFamily: 'Geist, sans-serif' }}>
                EDGE-FIRST
              </span>
            </div>

            <div className="relative grid grid-cols-2">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="min-h-[124px] border-b py-6 pr-4 even:border-l even:pl-5 md:min-h-[148px]"
                  style={{ borderColor: 'var(--ax-border)' }}
                >
                  <span
                    ref={(node) => {
                      statValueRefs.current[index] = node;
                    }}
                    className="block text-[clamp(36px,4.5vw,58px)] font-bold tracking-[-0.06em]"
                    style={{ color: 'var(--ax-text)', fontFamily: 'Geist, sans-serif' }}
                  >
                    {formatStat(0, stat)}
                  </span>
                  <span className="mt-4 block text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--ax-muted)', fontFamily: 'Geist, sans-serif' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            <div className="relative flex flex-wrap gap-x-5 gap-y-2 pt-5 text-[10px] uppercase tracking-[0.22em]" style={{ color: 'rgba(235,235,235,0.34)', fontFamily: 'Geist, sans-serif' }}>
              <span>NO TEMPLATE SLUDGE</span>
              <span style={{ color: 'rgba(200,255,0,0.62)' }}>CONTROLLED BUILD</span>
              <span>LOCAL SYSTEMS</span>
            </div>
          </div>
        </aside>

        <div className="border-t" style={{ borderColor: 'var(--ax-border)' }}>
          {capabilities.map((item, index) => {
            const active = index === activeIndex;

            return (
              <div
                key={item.title}
                className="capability-row group border-b"
                style={{
                  borderColor: active ? 'rgba(200,255,0,0.46)' : 'var(--ax-border)',
                  background: active ? 'rgba(200,255,0,0.018)' : 'transparent',
                }}
              >
                <button
                  type="button"
                  className="grid w-full grid-cols-[42px_1fr] gap-4 py-8 text-left md:grid-cols-[72px_1fr_150px] md:gap-7 md:py-10"
                  onClick={() => setActiveIndex(index)}
                  aria-expanded={active}
                  aria-controls={`capability-panel-${index}`}
                >
                  <span
                    className="pt-1 text-[11px] font-semibold uppercase tracking-[0.22em] transition-colors"
                    style={{
                      color: active ? 'var(--ax-lime)' : 'var(--ax-muted)',
                      fontFamily: 'Geist, sans-serif',
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>
                    <span
                      className="block text-[clamp(26px,3vw,42px)] font-semibold tracking-[-0.04em] transition-colors"
                      style={{
                        color: active ? 'var(--ax-text)' : 'rgba(235,235,235,0.68)',
                        fontFamily: 'Geist, sans-serif',
                      }}
                    >
                      {item.title}
                    </span>
                    <span
                      className="mt-3 block text-[10px] uppercase tracking-[0.24em]"
                      style={{
                        color: active ? 'rgba(200,255,0,0.58)' : 'rgba(235,235,235,0.25)',
                        fontFamily: 'Geist, sans-serif',
                      }}
                    >
                      {item.label}
                    </span>
                  </span>
                  <span
                    className="hidden self-start justify-self-end border px-3 py-2 text-[10px] uppercase tracking-[0.2em] transition-colors md:block"
                    style={{
                      borderColor: active ? 'rgba(200,255,0,0.38)' : 'var(--ax-border)',
                      color: active ? 'rgba(200,255,0,0.68)' : 'rgba(235,235,235,0.28)',
                      fontFamily: 'Geist, sans-serif',
                    }}
                  >
                    {active ? 'OPEN' : 'READY'}
                  </span>
                </button>

                <div
                  ref={(node) => {
                    contentRefs.current[index] = node;
                  }}
                  id={`capability-panel-${index}`}
                  className="h-0 overflow-hidden"
                >
                  <div className="grid grid-cols-[42px_1fr] gap-4 pb-10 md:grid-cols-[72px_1fr_150px] md:gap-7 md:pb-12">
                    <div />
                    <p
                      className="max-w-2xl text-base leading-7 md:text-lg"
                      style={{ color: 'rgba(235,235,235,0.58)', fontFamily: 'Geist, sans-serif' }}
                    >
                      {item.description}
                    </p>
                    <div className="hidden md:block" />
                  </div>
                </div>

                <div className="h-[2px] origin-left scale-x-0" ref={(node) => { lineRefs.current[index] = node; }} style={{ background: 'var(--ax-lime)' }} />
              </div>
            );
          })}
        </div>
      </div>
      </div>
    </section>
  );
}
