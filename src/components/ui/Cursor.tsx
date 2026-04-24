import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    
    if (!dot || !ring || !label) return;

    // Mouse position tracker
    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let isVisible = false;

    const onMove = (e: MouseEvent) => {
      if (!isVisible) {
        isVisible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.set(dot, { x: mouseX - 4, y: mouseY - 4 });
    };

    window.addEventListener('mousemove', onMove);

    // Ring follows with lag (inertia)
    const ticker = gsap.ticker.add(() => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      gsap.set(ring, { x: ringX - 20, y: ringY - 20 });
    });

    // Hover states
    const interactives = document.querySelectorAll('a, button, [data-cursor]');

    const onEnter = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const cursorType = el.dataset.cursor;

      gsap.to(ring, { scale: 2.5, duration: 0.3, ease: 'power2.out' });
      gsap.to(dot,  { scale: 0, duration: 0.2 });

      if (cursorType === 'view') {
        gsap.to(label, { opacity: 1, duration: 0.2 });
        label.textContent = 'VIEW →';
      }
    };

    const onLeave = () => {
      gsap.to(ring,  { scale: 1, duration: 0.4, ease: 'power2.out' });
      gsap.to(dot,   { scale: 1, duration: 0.2 });
      gsap.to(label, { opacity: 0, duration: 0.15 });
    };

    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(ticker);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Small dot — snaps to mouse */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 z-[9999] rounded-full"
        style={{ width: '8px', height: '8px', backgroundColor: '#c8ff00', willChange: 'transform', opacity: 0 }}
      />

      {/* Ring — lags behind */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 z-[9998] flex items-center justify-center rounded-full bg-transparent"
        style={{ width: '40px', height: '40px', border: '1px solid rgba(200,255,0,0.4)', willChange: 'transform', opacity: 0 }}
      >
        <span
          ref={labelRef}
          className="text-[9px] font-geist font-medium tracking-widest text-[var(--color-ax-lime)] opacity-0 select-none"
        />
      </div>
    </>
  );
}
