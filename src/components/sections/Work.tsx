import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { workProjects } from '../../lib/siteContent';

gsap.registerPlugin(ScrollTrigger);

const projects = workProjects.filter((project) => project.homepage);

const headingLines = [['Selected', 'Work']];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll('.reveal-word');
      if (words?.length) {
        gsap.set(words, { y: '108%', rotateX: -10, transformOrigin: '50% 100%' });
        ScrollTrigger.create({
          trigger: headingRef.current,
          start: 'top 82%',
          once: true,
          onEnter: () => {
            gsap.to(words, {
              y: '0%',
              rotateX: 0,
              duration: 1,
              ease: 'power4.out',
              stagger: 0.08,
            });
          },
        });
      }

      const cards = gsap.utils.toArray<HTMLElement>('.work-card');
      cards.forEach((card) => {
        const visualContainer = card.querySelector('.visual-container');
        const innerVisual = card.querySelector('.inner-visual');
        const metadata = card.querySelector('.metadata');
        const scanline = card.querySelector('.card-scanline');
        const fragments = card.querySelectorAll('.interface-fragment');
        const proofLines = card.querySelectorAll('.proof-line');

        gsap.set(visualContainer, { clipPath: 'inset(0 100% 0 0)' });
        gsap.set(innerVisual, { scale: 1.08, x: '-10%', opacity: 0.72 });
        gsap.set(metadata, { opacity: 0, y: 18 });
        gsap.set(fragments, { clipPath: 'inset(0 100% 0 0)' });
        gsap.set(proofLines, { scaleX: 0, transformOrigin: '0% 50%' });
        gsap.set(scanline, { xPercent: -120 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 78%',
          },
        });

        tl.to(visualContainer, {
          clipPath: 'inset(0 0% 0 0)',
          duration: 1.25,
          ease: 'power4.inOut',
        })
          .to(innerVisual, {
            scale: 1,
            x: '0%',
            opacity: 1,
            duration: 1.25,
            ease: 'power4.inOut',
          }, 0)
          .to(scanline, {
            xPercent: 135,
            duration: 1.05,
            ease: 'power3.inOut',
          }, 0.18)
          .to(fragments, {
            clipPath: 'inset(0 0% 0 0)',
            duration: 0.65,
            stagger: 0.055,
            ease: 'power3.out',
          }, 0.54)
          .to(proofLines, {
            scaleX: 1,
            duration: 0.48,
            stagger: 0.06,
            ease: 'power3.out',
          }, 0.64)
          .to(metadata, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
          }, 0.72);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full pb-32 pt-28 lg:pt-36"
      style={{
        paddingLeft: 'clamp(32px, 7vw, 108px)',
        paddingRight: 'clamp(32px, 4vw, 64px)',
        background: 'var(--ax-bg)',
      }}
    >
      <div className="mb-16 md:mb-24 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <h2
          ref={headingRef}
          className="font-geist font-bold"
          style={{
            fontSize: 'clamp(44px, 5.4vw, 84px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.94,
            color: '#ebebeb',
          }}
        >
          {headingLines.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => (
                <span key={wi} className="word-mask" style={{ marginRight: '0.22em' }}>
                  <span className="reveal-word block">{word}</span>
                </span>
              ))}
            </span>
          ))}
        </h2>

        <div className="hidden md:block text-right">
          <p className="font-geist text-[10px] uppercase tracking-[0.24em] text-[rgba(200,255,0,0.55)]">Work Index / Loaded</p>
          <p className="mt-2 font-geist text-xs uppercase tracking-[0.22em] text-[rgba(235,235,235,0.28)]">03 client systems</p>
        </div>
      </div>

      <div className="flex flex-col gap-20 md:gap-28">
        {projects.map((project, idx) => (
          <a
            key={project.title}
            href={`#project-${idx}`}
            data-cursor="view"
            className="work-card group block w-full no-underline"
          >
            <div className="visual-container relative overflow-hidden aspect-[16/9] md:aspect-[21/9] border bg-[var(--ax-surface)]" style={{ borderColor: 'rgba(235,235,235,0.13)' }}>
              <div className="inner-visual relative h-full w-full transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'linear-gradient(rgba(235,235,235,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(235,235,235,0.05) 1px, transparent 1px)',
                    backgroundSize: '44px 44px',
                    backgroundPosition: 'center center',
                  }}
                />
                <div
                  className="absolute inset-0 opacity-60"
                  style={{
                    background:
                      'linear-gradient(90deg, rgba(6,6,6,0.92), rgba(15,15,15,0.46) 48%, rgba(6,6,6,0.76)), linear-gradient(180deg, rgba(200,255,0,0.05), transparent 35%, rgba(200,255,0,0.035))',
                  }}
                />

                <div className="card-scanline absolute top-0 h-full w-[18%] bg-[linear-gradient(90deg,transparent,rgba(200,255,0,0.16),transparent)] opacity-80" />

                <div className="absolute left-6 top-6 flex items-center gap-3 md:left-8 md:top-8">
                  <span className="h-2 w-2 bg-[var(--ax-lime)] shadow-[0_0_14px_rgba(200,255,0,0.55)]" />
                  <span className="font-geist text-[10px] uppercase tracking-[0.24em] text-[rgba(235,235,235,0.62)]">{project.status}</span>
                </div>

                <span className="absolute right-6 top-6 font-geist text-[10px] uppercase tracking-[0.24em] text-[rgba(200,255,0,0.58)] md:right-8 md:top-8">
                  {project.code}
                </span>

                <div className="absolute inset-x-6 bottom-6 grid grid-cols-12 gap-3 md:inset-x-8 md:bottom-8">
                  <div className="interface-fragment col-span-12 border border-[rgba(235,235,235,0.1)] bg-[rgba(6,6,6,0.56)] p-4 md:col-span-7">
                    <div className="mb-4 flex items-center justify-between">
                      <span className="font-geist text-[9px] uppercase tracking-[0.22em] text-[rgba(200,255,0,0.58)]">{project.niche}</span>
                      <span className="font-geist text-[9px] uppercase tracking-[0.22em] text-[rgba(235,235,235,0.28)]">Conversion path</span>
                    </div>
                    <div className="space-y-2">
                      <div className="proof-line h-px w-full bg-[rgba(235,235,235,0.18)]" />
                      <div className="proof-line h-px w-4/5 bg-[rgba(200,255,0,0.38)]" />
                      <div className="proof-line h-px w-3/5 bg-[rgba(235,235,235,0.13)]" />
                    </div>
                  </div>
                  <div className="interface-fragment col-span-12 border border-[rgba(200,255,0,0.18)] bg-[rgba(200,255,0,0.035)] p-4 md:col-span-5">
                    <span className="font-geist text-[9px] uppercase tracking-[0.22em] text-[rgba(235,235,235,0.3)]">Axiom changed</span>
                    <p className="mt-3 max-h-[60px] overflow-hidden font-geist text-xs leading-5 text-[rgba(235,235,235,0.62)]">{project.changed}</p>
                  </div>
                  <div className="interface-fragment col-span-3 h-2 bg-[rgba(235,235,235,0.16)]" />
                  <div className="interface-fragment col-span-2 h-2 bg-[rgba(200,255,0,0.34)]" />
                  <div className="interface-fragment col-span-4 h-2 bg-[rgba(235,235,235,0.1)]" />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-geist text-4xl font-bold uppercase tracking-[0.18em] text-[rgba(235,235,235,0.12)] md:text-6xl">
                    {project.niche}
                  </span>
                </div>

                <div className="absolute bottom-0 left-0 h-[3px] w-full origin-left scale-x-0 bg-[var(--ax-lime)] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100" />
              </div>
            </div>

            <div className="metadata mt-5 flex flex-col gap-4 md:mt-7 md:flex-row md:items-center md:justify-between">
              <div>
                <h3 className="font-geist text-2xl font-semibold tracking-tight text-[var(--ax-text)] md:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-2 font-geist text-xs uppercase tracking-[0.2em] text-[rgba(235,235,235,0.48)] md:text-sm">
                  {project.category}
                </p>
                <p className="mt-3 max-w-2xl font-geist text-sm leading-6 text-[rgba(235,235,235,0.46)]">
                  {project.result}
                </p>
              </div>
              <div className="border px-4 py-2 font-geist text-[10px] font-medium uppercase tracking-[0.2em] text-[rgba(200,255,0,0.64)]" style={{ borderColor: 'rgba(235,235,235,0.12)' }}>
                {project.status}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
