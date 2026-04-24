import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring || !label) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let visible = false;
    let rafId: number;

    gsap.set([dot, ring], { opacity: 0 });

    const loop = () => {
      ringX += (mouseX - ringX) * 0.1;
      ringY += (mouseY - ringY) * 0.1;
      gsap.set(dot, { x: mouseX - 4, y: mouseY - 4 });
      gsap.set(ring, { x: ringX - 20, y: ringY - 20 });
      rafId = requestAnimationFrame(loop);
    };
    loop();

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.4, ease: 'power2.out' });
      }
    };
    window.addEventListener('mousemove', onMove);

    const onLeaveWindow = () => gsap.to([dot, ring], { opacity: 0, duration: 0.3 });
    const onEnterWindow = () => { if (visible) gsap.to([dot, ring], { opacity: 1, duration: 0.3 }); };
    document.addEventListener('mouseleave', onLeaveWindow);
    document.addEventListener('mouseenter', onEnterWindow);

    const onEnterLink = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      const type = el.dataset.cursor;
      gsap.to(ring, { scale: 2.2, duration: 0.35, ease: 'power3.out' });
      gsap.to(dot, { scale: 0, duration: 0.2 });
      if (type === 'view' && label) {
        label.textContent = 'VIEW →';
        gsap.to(label, { opacity: 1, duration: 0.2 });
      }
    };

    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.6)' });
      gsap.to(dot, { scale: 1, duration: 0.3 });
      gsap.to(label, { opacity: 0, duration: 0.15 });
    };

    const onClick = () => {
      gsap.to(dot, { scale: 0.6, duration: 0.1, yoyo: true, repeat: 1 });
    };
    window.addEventListener('click', onClick);

    const targets = document.querySelectorAll('a, button, [data-cursor]');
    targets.forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('mouseleave', onLeaveWindow);
      document.removeEventListener('mouseenter', onEnterWindow);
      targets.forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
      });
    };
  }, []);

  return (
    <>
      <div ref={dotRef} style={{ position: 'fixed', top: 0, left: 0, width: '8px', height: '8px', borderRadius: '50%', background: '#c8ff00', pointerEvents: 'none', zIndex: 99999, willChange: 'transform', mixBlendMode: 'difference' }} />
      <div ref={ringRef} style={{ position: 'fixed', top: 0, left: 0, width: '40px', height: '40px', borderRadius: '50%', border: '1px solid rgba(200,255,0,0.35)', background: 'transparent', pointerEvents: 'none', zIndex: 99998, willChange: 'transform', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span ref={labelRef} style={{ fontSize: '8px', fontFamily: 'Geist, sans-serif', fontWeight: 600, letterSpacing: '0.1em', color: '#c8ff00', opacity: 0, userSelect: 'none', whiteSpace: 'nowrap' }} />
      </div>
    </>
  );
}