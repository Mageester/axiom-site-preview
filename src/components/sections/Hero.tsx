import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

// The heading split into lines, then words
// Each word gets wrapped in a mask div by our GSAP setup
const headingLines = [
  ['We', 'build', 'digital'],
  ['infrastructure', 'for'],
  ['businesses', 'that', { text: 'mean', accent: true }, { text: 'it.', accent: true }],
];

export default function Hero() {
  const heroRef    = useRef<HTMLElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLDivElement>(null);
  const scrollRef  = useRef<HTMLDivElement>(null);

  // ─── Word reveal animation ───────────────────────────────────────
  useEffect(() => {
    if (!heroRef.current) return;
    const words = heroRef.current.querySelectorAll('.reveal-word');

    // Set initial state — words below their container
    gsap.set(words, { y: '105%' });

    // Animate each word up, staggered
    gsap.to(words, {
      y: '0%',
      duration: 1.0,
      ease: 'power4.out',
      stagger: 0.08,
      delay: 0.5,
    });
  }, []);

  // ─── Sub-label + CTA reveal ───────────────────────────────────────
  useEffect(() => {
    gsap.set([subRef.current, ctaRef.current, scrollRef.current], {
      opacity: 0,
      y: 16,
    });

    gsap.to(subRef.current, {
      opacity: 1, y: 0,
      duration: 0.7,
      ease: 'power3.out',
      delay: 1.2,
    });

    gsap.to(ctaRef.current, {
      opacity: 1, y: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: 1.5,
    });

    gsap.to(scrollRef.current, {
      opacity: 1, y: 0,
      duration: 0.6,
      ease: 'power3.out',
      delay: 1.8,
    });
  }, []);

  // ─── Dot grid canvas ─────────────────────────────────────────────
  useEffect(() => {
    const canvas  = canvasRef.current;
    if (!canvas) return;
    const ctx     = canvas.getContext('2d');
    if (!ctx) return;

    let mouse     = { x: -999, y: -999 };
    let animFrame: number;

    const COLS    = 22;
    const ROWS    = 32;
    const RADIUS  = 1.8;
    
    let GAP_X = 0;
    let GAP_Y = 0;
    
    const REACH   = 130;

    // Resize handler
    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      GAP_X = canvas.offsetWidth / COLS;
      GAP_Y = canvas.offsetHeight / ROWS;
    };
    resize();
    window.addEventListener('resize', resize);

    // Mouse tracking — relative to canvas
    const onMouseMove = (e: MouseEvent) => {
      const rect  = canvas.getBoundingClientRect();
      mouse.x     = e.clientX - rect.left;
      mouse.y     = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x    = GAP_X * col + GAP_X / 2;
          const y    = GAP_Y * row + GAP_Y / 2;
          const dist = Math.hypot(mouse.x - x, mouse.y - y);
          const t    = Math.max(0, 1 - dist / REACH); // 0→1

          // Interpolate between base color and lime
          const baseR = 28,  baseG = 28,  baseB = 28;   // #1c1c1c
          const limeR = 200, limeG = 255, limeB = 0;    // #c8ff00

          const r = Math.round(baseR + (limeR - baseR) * t);
          const g = Math.round(baseG + (limeG - baseG) * t);
          const b = Math.round(baseB + (limeB - baseB) * t);

          ctx.beginPath();
          ctx.arc(x, y, RADIUS + t * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgb(${r},${g},${b})`;
          ctx.globalAlpha = 0.4 + t * 0.6;
          ctx.fill();
          ctx.globalAlpha = 1;
        }
      }

      animFrame = requestAnimationFrame(draw);
    };
    draw();

    // Fade canvas in (Removed)
    // gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 1.2, delay: 1.6 });

    return () => {
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden"
      style={{ paddingTop: '64px' }} /* navbar height */
    >
      {/* ── Left content ── */}
      <div 
        className="relative z-10 w-full lg:w-1/2" 
        style={{ paddingLeft: 'clamp(24px, 6vw, 96px)', paddingRight: 'clamp(24px, 6vw, 96px)' }}
      >

        {/* Eyebrow */}
        <div
          className="mb-8 overflow-hidden"
          style={{ opacity: 0 }}
          ref={el => { if (el) gsap.to(el, { opacity: 1, duration: 0.5, delay: 0.3 }) }}
        >
          <span
            className="font-geist text-[var(--color-ax-muted)]"
            style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}
          >
            Web & AI Agency · KW Ontario
          </span>
        </div>

        {/* ── HEADING — word mask reveal ── */}
        <h1
          className="font-geist font-bold"
          style={{
            fontSize: 'clamp(48px, 6.5vw, 92px)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
            color: '#ebebeb',
          }}
        >
          {headingLines.map((line, li) => (
            <span key={li} className="block">
              {line.map((word, wi) => {
                const text    = typeof word === 'string' ? word : word.text;
                const accent  = typeof word === 'object' && word.accent;
                return (
                  // The outer div is the MASK — overflow: hidden clips the word
                  <span
                    key={wi}
                    className="word-mask"
                    style={{ marginRight: '0.25em' }}
                  >
                    {/* The inner span is the WORD — starts at y:105%, GSAP moves it to 0 */}
                    <span
                      className="reveal-word inline-block"
                      style={{ color: accent ? '#a8e000' : 'inherit' }}
                    >
                      {text}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        {/* Sub-label */}
        <p
          ref={subRef}
          className="mt-8 font-geist text-[var(--color-ax-muted)]"
          style={{ fontSize: '14px', letterSpacing: '0.02em', lineHeight: 1.6 }}
        >
          High-performance web and AI systems.<br />
          Kitchener-Waterloo, Ontario.
        </p>

        {/* CTAs */}
        <div
          ref={ctaRef}
          className="mt-10 flex items-center gap-6"
        >
          <a
            href="#contact"
            className="bg-[var(--color-ax-lime)] text-[var(--color-ax-bg)] font-geist font-semibold hover:bg-[#d4ff33] transition-colors duration-150 inline-block no-underline rounded-none"
            style={{ fontSize: '12px', letterSpacing: '0.08em', padding: '13px 26px', borderRadius: '0' }}
          >
            Start a Project
          </a>
          <a
            href="#work"
            className="font-geist text-[var(--color-ax-muted)] hover:text-[var(--color-ax-text)] transition-colors duration-200"
            style={{ fontSize: '13px', letterSpacing: '0.02em', textDecoration: 'underline', textUnderlineOffset: '4px' }}
          >
            View Work
          </a>
        </div>

        {/* Scroll indicator */}
        <div
          ref={scrollRef}
          className="absolute bottom-10 left-8 md:left-16 flex flex-col items-center gap-3"
        >
          <span
            className="font-geist text-[#333333]"
            style={{ fontSize: '10px', letterSpacing: '0.2em', writingMode: 'vertical-lr' }}
          >
            SCROLL
          </span>
          <div className="relative h-10 w-px overflow-hidden bg-[var(--color-ax-border)]">
            <div
              className="absolute top-0 left-0 w-full bg-[var(--color-ax-lime)]"
              style={{
                height: '40%',
                animation: 'scrollLine 2s ease-in-out infinite',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Right: dot grid canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute right-0 top-0 hidden lg:block"
        style={{
          width: '50%',
          height: '100vh',
          opacity: 1,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </section>
  );
}
