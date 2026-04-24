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
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Word mask reveal
  useEffect(() => {
    const words = heroRef.current?.querySelectorAll('.reveal-word');
    if (!words?.length) return;
    gsap.set(words, { y: '105%' });
    const tl = gsap.timeline({ delay: 0.4 });
    tl.to(words, { y: '0%', duration: 1.1, ease: 'power4.out', stagger: 0.075 });
    return () => { tl.kill(); };
  }, []);

  // Eyebrow + sub + cta + scroll reveal
  useEffect(() => {
    gsap.set([eyebrowRef.current, subRef.current, ctaRef.current, scrollRef.current], { opacity: 0, y: 20 });
    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(eyebrowRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 0)
      .to(subRef.current, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.1)
      .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.35)
      .to(scrollRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.6);
    return () => { tl.kill(); };
  }, []);

  // Scroll parallax on heading
  useEffect(() => {
    if (!headingRef.current) return;
    const st = ScrollTrigger.create({
      trigger: heroRef.current,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      onUpdate: (self) => {
        gsap.set(headingRef.current, {
          y: self.progress * -80,
          opacity: 1 - self.progress * 1.5,
        });
      },
    });
    return () => { st.kill(); };
  }, []);

  // Dot grid canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const mouse = { x: -9999, y: -9999 };
    let animFrame: number;
    let running = true;
    const COLS = 24, ROWS = 34, DOT_R = 1.6, REACH = 140;

    const setSize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    requestAnimationFrame(setSize);
    window.addEventListener('resize', setSize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener('mousemove', onMouseMove);

    const draw = () => {
      if (!running) return;
      const rect = canvas.getBoundingClientRect();
      const W = rect.width, H = rect.height;
      ctx.clearRect(0, 0, W, H);
      const gapX = W / COLS, gapY = H / ROWS;
      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          const x = gapX * col + gapX / 2;
          const y = gapY * row + gapY / 2;
          const dist = Math.hypot(mouse.x - x, mouse.y - y);
          const t = Math.max(0, 1 - dist / REACH);
          const r = Math.round(28 + (200 - 28) * t);
          const g = Math.round(28 + (255 - 28) * t);
          const b = Math.round(28 + (0 - 28) * t);
          ctx.beginPath();
          ctx.arc(x, y, DOT_R + t * 2, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${r},${g},${b},${0.35 + t * 0.65})`;
          ctx.fill();
        }
      }
      animFrame = requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    return () => {
      running = false;
      cancelAnimationFrame(animFrame);
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section ref={heroRef} id="hero" style={{ position: 'relative', display: 'flex', minHeight: '100vh', alignItems: 'center', overflow: 'hidden', paddingTop: '64px' }}>

      {/* Left content */}
      <div ref={eyebrowRef as any} style={{ position: 'relative', zIndex: 10, width: '100%', paddingLeft: 'clamp(32px, 7vw, 108px)', paddingRight: 'clamp(32px, 4vw, 64px)' }} className="lg:w-1/2">

        <div ref={eyebrowRef} style={{ marginBottom: '40px', opacity: 0 }}>
          <span style={{ fontFamily: 'Geist, sans-serif', fontSize: '11px', letterSpacing: '0.22em', textTransform: 'uppercase', color: '#555555' }}>
            Web & AI Agency · KW Ontario
          </span>
        </div>

        <h1 ref={headingRef} style={{ fontFamily: 'Geist, sans-serif', fontWeight: 700, fontSize: 'clamp(52px, 6.8vw, 96px)', letterSpacing: '-0.04em', lineHeight: 0.93, color: '#ebebeb', willChange: 'transform, opacity' }}>
          {headingLines.map((line, li) => (
            <span key={li} style={{ display: 'block' }}>
              {line.map((word, wi) => {
                const text = typeof word === 'string' ? word : word.text;
                const accent = typeof word === 'object' && word.accent;
                return (
                  <span key={wi} className="word-mask" style={{ marginRight: '0.22em' }}>
                    <span className="reveal-word" style={{ color: accent ? '#c8ff00' : 'inherit' }}>
                      {text}
                    </span>
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p ref={subRef} style={{ marginTop: '36px', fontFamily: 'Geist, sans-serif', fontSize: '14px', letterSpacing: '0.02em', lineHeight: 1.7, color: '#555555', opacity: 0 }}>
          High-performance web and AI systems.<br />
          Kitchener-Waterloo, Ontario.
        </p>

        <div ref={ctaRef} style={{ marginTop: '44px', display: 'flex', alignItems: 'center', gap: '28px', opacity: 0 }}>
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

        <div ref={scrollRef} style={{ position: 'absolute', bottom: '40px', left: 'clamp(32px, 7vw, 108px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px', opacity: 0 }}>
          <span style={{ fontFamily: 'Geist, sans-serif', fontSize: '9px', letterSpacing: '0.25em', color: '#2a2a2a', writingMode: 'vertical-lr', textTransform: 'uppercase' }}>Scroll</span>
          <div style={{ position: 'relative', width: '1px', height: '48px', background: '#1c1c1c', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '40%', background: '#c8ff00', animation: 'scrollLine 2s ease-in-out infinite' }} />
          </div>
        </div>
      </div>

      {/* Dot grid canvas */}
      <canvas ref={canvasRef} style={{ position: 'absolute', right: 0, top: 0, width: '50%', height: '100%', pointerEvents: 'none', zIndex: 0 }} />
    </section>
  );
}