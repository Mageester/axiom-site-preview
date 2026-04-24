import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const headingLines = [
  ['We', 'build', 'digital'],
  ['infrastructure', 'for'],
  ['businesses', 'that', { text: 'mean', accent: true }, { text: 'it.', accent: true }],
];

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const handoffRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);
  const canvasStateRef = useRef({ compression: 0, intensity: 0, scrollPulse: 0 });

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      const words = gsap.utils.toArray<HTMLElement>('.reveal-word');
      const accentWords = gsap.utils.toArray<HTMLElement>('.accent-word');

      gsap.set(words, { y: '108%', rotateX: -18, transformOrigin: '50% 100%' });
      gsap.set([eyebrowRef.current, subRef.current, ctaRef.current, scrollRef.current], { opacity: 0, y: 18 });
      gsap.set(headingRef.current, { scale: 1.025, transformOrigin: '0% 50%' });
      gsap.set(visualRef.current, { opacity: 0.72, x: 26 });
      gsap.set(handoffRef.current, { scaleY: 0, transformOrigin: '50% 100%' });
      gsap.set(transitionRef.current, { opacity: 0 });

      const intro = gsap.timeline({ delay: 0.34 });
      intro
        .to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0)
        .to(words, {
          y: '0%',
          rotateX: 0,
          duration: 1.15,
          ease: 'power4.out',
          stagger: 0.068,
        }, 0.16)
        .to(headingRef.current, {
          scale: 1,
          duration: 0.9,
          ease: 'expo.out',
        }, 0.68)
        .to(accentWords, {
          textShadow: '0 0 18px rgba(200,255,0,0.34)',
          duration: 0.42,
          stagger: 0.055,
          yoyo: true,
          repeat: 1,
          ease: 'power2.inOut',
        }, 1.14)
        .to(visualRef.current, { opacity: 1, x: 0, duration: 1.1, ease: 'power4.out' }, 0.64)
        .to(subRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 1.16)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 1.34)
        .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 1.52);

      const scrollState = canvasStateRef.current;
      gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.72,
          invalidateOnRefresh: true,
        },
      })
        .to(headingRef.current, {
          y: -58,
          scale: 0.9,
          letterSpacing: '-0.055em',
          ease: 'none',
        }, 0)
        .to(contentRef.current, {
          y: -28,
          x: 10,
          ease: 'none',
        }, 0)
        .to(subRef.current, {
          y: -14,
          letterSpacing: '0.06em',
          ease: 'none',
        }, 0)
        .to(ctaRef.current, {
          y: -22,
          scale: 0.965,
          transformOrigin: '0% 50%',
          ease: 'none',
        }, 0)
        .to(visualRef.current, {
          x: -34,
          scaleX: 0.9,
          scaleY: 1.04,
          transformOrigin: '78% 50%',
          ease: 'none',
        }, 0)
        .to(scrollRef.current, { y: -18, opacity: 0.18, ease: 'none' }, 0)
        .to(scrollState, {
          compression: 1,
          intensity: 1,
          scrollPulse: 1,
          ease: 'none',
        }, 0)
        .to(transitionRef.current, {
          opacity: 1,
          ease: 'none',
        }, 0.2)
        .to(handoffRef.current, {
          scaleY: 1,
          ease: 'none',
        }, 0.48);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let animFrame: number;
    let running = true;
    let scanStart = performance.now() + 950;
    const COLS = 28;
    const ROWS = 38;
    const DOT_R = 1.38;
    const REACH = 176;
    const SCAN_EVERY = 4300;

    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    requestAnimationFrame(setSize);
    window.addEventListener('resize', setSize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = e.clientX - rect.left;
      mouse.ty = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouse.tx = -9999;
      mouse.ty = -9999;
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const draw = (now: number) => {
      if (!running) return;

      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const { compression, intensity, scrollPulse } = canvasStateRef.current;

      mouse.x += (mouse.tx - mouse.x) * 0.1;
      mouse.y += (mouse.ty - mouse.y) * 0.1;

      ctx.clearRect(0, 0, W, H);

      if (now - scanStart > SCAN_EVERY * 20) {
        scanStart = now;
      }

      const cycle = ((now - scanStart) % SCAN_EVERY) / SCAN_EVERY;
      const scanX = W * (cycle * 1.28 - 0.14);
      const scanWidth = 54 + intensity * 52;
      const activeSweep = cycle < 0.64 ? 1 : Math.max(0, 1 - (cycle - 0.64) / 0.18);
      const gapX = (W / COLS) * (1 - compression * 0.18);
      const gapY = (H / ROWS) * (1 + compression * 0.08);
      const originX = W * (0.5 + compression * 0.06);
      const baseAlpha = 0.26 + intensity * 0.1;

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const centeredCol = col - (COLS - 1) / 2;
          const x = originX + centeredCol * gapX;
          const y = gapY * row + gapY / 2;
          if (x < -12 || x > W + 12) continue;

          const dist = Math.hypot(mouse.x - x, mouse.y - y);
          const cursorT = Math.max(0, 1 - dist / REACH);
          const scanDist = Math.abs(x - scanX) + Math.abs(y - H * 0.52) * 0.16;
          const scanT = Math.max(0, 1 - scanDist / scanWidth) * activeSweep;
          const edgeT = Math.max(0, 1 - Math.abs(x - W * 0.5) / (W * 0.62));
          const t = Math.min(1, cursorT * 0.9 + scanT * 0.32 + scrollPulse * edgeT * 0.24);
          const r = Math.round(30 + (200 - 30) * t);
          const g = Math.round(32 + (255 - 32) * t);
          const b = Math.round(28 * (1 - t));

          ctx.beginPath();
          ctx.arc(x, y, DOT_R + t * 1.65 + compression * 0.16, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${baseAlpha + t * 0.62})`;
          ctx.fill();
        }
      }

      if (activeSweep > 0.01) {
        const gradient = ctx.createLinearGradient(scanX - scanWidth, 0, scanX + scanWidth, 0);
        gradient.addColorStop(0, 'rgba(200,255,0,0)');
        gradient.addColorStop(0.5, `rgba(200,255,0,${0.02 + intensity * 0.025})`);
        gradient.addColorStop(1, 'rgba(200,255,0,0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(scanX - scanWidth, 0, scanWidth * 2, H);
      }

      animFrame = requestAnimationFrame(draw);
    };

    animFrame = requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      style={{
        position: 'relative',
        display: 'flex',
        minHeight: '100svh',
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: '72px',
        background: '#060606',
      }}
    >
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '820px',
          paddingLeft: 'var(--page-pad-x)',
          paddingRight: 'var(--page-pad-x)',
          willChange: 'transform',
        }}
        className="lg:w-3/5"
      >
        <div ref={eyebrowRef} style={{ marginBottom: '30px', opacity: 0 }}>
          <span style={{ fontFamily: 'Geist, sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#555555' }}>
            Web & AI Agency / KW Ontario
          </span>
        </div>

        <h1
          ref={headingRef}
          style={{
            fontFamily: 'Geist, sans-serif',
            fontWeight: 700,
            fontSize: 'clamp(44px, 5.4vw, 78px)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
            color: '#ebebeb',
            willChange: 'transform',
            textWrap: 'balance',
          }}
        >
          {headingLines.map((line, li) => (
            <span key={li} style={{ display: 'block' }}>
              {line.map((word, wi) => {
                const text = typeof word === 'string' ? word : word.text;
                const accent = typeof word === 'object' && word.accent;
                return (
                  <span key={wi} className="word-mask" style={{ marginRight: '0.22em' }}>
                    <span className={`reveal-word${accent ? ' accent-word' : ''}`} style={{ color: accent ? '#c8ff00' : 'inherit' }}>
                      {text}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p ref={subRef} style={{ marginTop: '30px', fontFamily: 'Geist, sans-serif', fontSize: '14px', letterSpacing: '0.02em', lineHeight: 1.7, color: '#555555', opacity: 0 }}>
          High-performance web and AI systems.<br />
          Kitchener-Waterloo, Ontario.
        </p>

        <div ref={ctaRef} style={{ marginTop: '32px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '18px 28px', opacity: 0, willChange: 'transform' }}>
          <a href="#contact" style={{ display: 'inline-block', background: '#c8ff00', color: '#060606', fontFamily: 'Geist, sans-serif', fontWeight: 600, fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '14px 28px', borderRadius: 0, textDecoration: 'none', transition: 'background 0.15s ease' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#d4ff33')}
            onMouseLeave={e => (e.currentTarget.style.background = '#c8ff00')}>
            Start a Project
          </a>
          <a href="#work" style={{ fontFamily: 'Geist, sans-serif', fontSize: '13px', letterSpacing: '0.03em', color: '#555555', textDecoration: 'underline', textUnderlineOffset: '5px', transition: 'color 0.2s ease' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#ebebeb')}
            onMouseLeave={e => (e.currentTarget.style.color = '#555555')}>
            View Work
          </a>
        </div>

      </div>

      <div ref={scrollRef} style={{ position: 'absolute', right: 'clamp(32px, 5vw, 72px)', bottom: '34px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', opacity: 0, zIndex: 11, willChange: 'transform, opacity' }}>
        <span style={{ fontFamily: 'Geist, sans-serif', fontSize: '9px', letterSpacing: '0.25em', color: '#2a2a2a', writingMode: 'vertical-lr', textTransform: 'uppercase' }}>Scroll</span>
        <div style={{ position: 'relative', width: '1px', height: '48px', background: '#1c1c1c', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '40%', background: '#c8ff00', animation: 'scrollLine 2s ease-in-out infinite' }} />
        </div>
      </div>

      <div ref={visualRef} style={{ position: 'absolute', right: 0, top: 0, width: '54%', minWidth: '520px', height: '100%', pointerEvents: 'none', zIndex: 0, willChange: 'transform, opacity' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, #060606 0%, rgba(6,6,6,0.64) 18%, rgba(6,6,6,0) 46%)', zIndex: 1 }} />
        <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      </div>

      <div ref={transitionRef} style={{ position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none', opacity: 0 }}>
        <div
          style={{
            position: 'absolute',
            inset: '9% 4% 8% 31%',
            backgroundImage:
              'linear-gradient(rgba(235,235,235,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(235,235,235,0.05) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
            maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 88%, transparent)',
          }}
        />
        <div style={{ position: 'absolute', left: '32%', top: '18%', width: '48%', height: '1px', background: 'rgba(200,255,0,0.22)' }} />
        <div style={{ position: 'absolute', left: '40%', top: '11%', width: '1px', height: '72%', background: 'rgba(235,235,235,0.06)' }} />
        <div style={{ position: 'absolute', left: '58%', top: '11%', width: '1px', height: '72%', background: 'rgba(235,235,235,0.06)' }} />
        <div style={{ position: 'absolute', left: '72%', top: '13%', width: '1px', height: '68%', background: 'rgba(200,255,0,0.12)' }} />
        <div style={{ position: 'absolute', left: '35%', top: '76%', width: '40%', height: '1px', background: 'rgba(235,235,235,0.08)' }} />
        {Array.from({ length: 8 }).map((_, idx) => (
          <span
            key={idx}
            style={{
              position: 'absolute',
              left: `${48 + idx * 4.3}%`,
              top: `${28 + (idx % 4) * 11}%`,
              width: '3px',
              height: '3px',
              background: '#c8ff00',
              opacity: 0.22,
              boxShadow: '0 0 10px rgba(200,255,0,0.35)',
            }}
          />
        ))}
      </div>

      <div
        ref={handoffRef}
        style={{
          position: 'absolute',
          right: '5vw',
          bottom: 0,
          width: '2px',
          height: '100%',
          background: '#c8ff00',
          zIndex: 12,
          opacity: 0.96,
          boxShadow: '-18px 0 28px rgba(200,255,0,0.08), 0 0 26px rgba(200,255,0,0.36), 8px 0 18px rgba(200,255,0,0.12)',
        }}
      />
    </section>
  );
}
