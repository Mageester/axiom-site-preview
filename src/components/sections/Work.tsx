import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Sentient Logistics',
    category: 'AI Pipeline / Next.js',
    year: '2026',
  },
  {
    title: 'Nexus Capital',
    category: 'Web Application / FinTech',
    year: '2025',
  },
  {
    title: 'Aegis Core',
    category: 'System Architecture / UI',
    year: '2025',
  },
];

const headingLines = [
  ['Selected', 'Work'],
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const stList: ScrollTrigger[] = [];

    // Heading Word Reveal
    const words = headingRef.current?.querySelectorAll('.reveal-word');
    if (words?.length) {
      gsap.set(words, { y: '105%' });
      stList.push(
        ScrollTrigger.create({
          trigger: headingRef.current,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(words, {
              y: '0%',
              duration: 1.1,
              ease: 'power4.out',
              stagger: 0.08,
            });
          },
          once: true,
        })
      );
    }

    // Project Cards Reveal
    const cards = sectionRef.current.querySelectorAll('.work-card');
    cards.forEach((card) => {
      const visualContainer = card.querySelector('.visual-container');
      const innerVisual = card.querySelector('.inner-visual');
      const metadata = card.querySelector('.metadata');

      // Initial state
      gsap.set(visualContainer, { clipPath: 'inset(0 100% 0 0)' });
      gsap.set(innerVisual, { scale: 1.1, x: '-15%' });
      gsap.set(metadata, { opacity: 0, y: 16 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
        },
      });

      stList.push(tl.scrollTrigger!);

      tl.to(visualContainer, {
        clipPath: 'inset(0 0% 0 0)',
        duration: 1.4,
        ease: 'power4.inOut',
      })
        .to(
          innerVisual,
          {
            scale: 1,
            x: '0%',
            duration: 1.4,
            ease: 'power4.inOut',
          },
          0
        )
        .to(
          metadata,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
          },
          '-=0.6'
        );
    });

    return () => {
      stList.forEach((t) => t?.kill());
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full pb-32 pt-32 lg:pt-48"
      style={{ paddingLeft: 'clamp(32px, 7vw, 108px)', paddingRight: 'clamp(32px, 4vw, 64px)' }}
    >
      <div className="mb-24 md:mb-32">
        <h2
          ref={headingRef}
          className="font-geist font-bold"
          style={{
            fontSize: 'clamp(40px, 5vw, 80px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
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
      </div>

      <div className="flex flex-col gap-24 md:gap-32">
        {projects.map((project, idx) => (
          <a
            key={idx}
            href={`#project-${idx}`}
            data-cursor="view"
            className="work-card group block w-full no-underline"
          >
            {/* Visual Container */}
            <div className="visual-container relative overflow-hidden aspect-[16/9] md:aspect-[21/9] bg-[var(--ax-surface)] border border-[var(--ax-border)]">
              {/* Inner Visual (Parallax & Scale) */}
              <div className="inner-visual w-full h-full relative transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]">
                {/* CSS Grid Pattern for placeholder */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'linear-gradient(var(--ax-border) 1px, transparent 1px), linear-gradient(90deg, var(--ax-border) 1px, transparent 1px)',
                    backgroundSize: '40px 40px',
                    backgroundPosition: 'center center',
                    opacity: 0.4,
                  }}
                />
                
                {/* Center abstract shape/text placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="font-geist font-bold text-[var(--ax-muted)] text-3xl md:text-5xl tracking-widest uppercase opacity-20">
                    {project.title.split(' ')[0]}
                  </span>
                </div>
              </div>

              {/* Hover Lime Bottom Panel */}
              <div className="absolute bottom-0 left-0 w-full h-3 bg-[var(--ax-lime)] transform translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 z-10" />
            </div>

            {/* Metadata (Sharp, Outside Container) */}
            <div className="metadata mt-6 md:mt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h3 className="font-geist font-semibold text-2xl md:text-3xl text-[var(--ax-text)] mb-2 tracking-tight">
                  {project.title}
                </h3>
                <p className="font-geist text-sm text-[var(--ax-muted)] tracking-widest uppercase">
                  {project.category}
                </p>
              </div>
              <div className="font-geist text-sm font-medium text-[var(--ax-muted)] px-4 py-2 border border-[var(--ax-border)] rounded-sm">
                {project.year}
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
