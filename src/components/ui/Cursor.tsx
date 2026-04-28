import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { coarsePointer, prefersReducedMotion } from '../../lib/motion';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    if (!dot || !ring || !label || prefersReducedMotion() || coarsePointer()) return;

    const setDotX = gsap.quickSetter(dot, 'x', 'px');
    const setDotY = gsap.quickSetter(dot, 'y', 'px');
    const setRingX = gsap.quickSetter(ring, 'x', 'px');
    const setRingY = gsap.quickSetter(ring, 'y', 'px');
    const mouse = { x: -80, y: -80 };
    const ringPos = { x: -80, y: -80 };
    let raf = 0;
    let visible = false;
    let hovering = false;

    const stopIfSettled = () => {
      const dx = mouse.x - ringPos.x;
      const dy = mouse.y - ringPos.y;
      return !hovering && Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1;
    };

    const tick = () => {
      ringPos.x += (mouse.x - ringPos.x) * 0.16;
      ringPos.y += (mouse.y - ringPos.y) * 0.16;
      setRingX(ringPos.x - 20);
      setRingY(ringPos.y - 20);

      if (stopIfSettled()) {
        raf = 0;
        return;
      }

      raf = requestAnimationFrame(tick);
    };

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;

      mouse.x = event.clientX;
      mouse.y = event.clientY;
      setDotX(mouse.x - 4);
      setDotY(mouse.y - 4);

      if (!visible) {
        visible = true;
        ringPos.x = mouse.x;
        ringPos.y = mouse.y;
        gsap.to([dot, ring], { opacity: 1, duration: 0.25, ease: 'power2.out' });
      }

      wake();
    };

    const onPointerOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [data-cursor]') as HTMLElement | null;
      if (!interactive) return;

      hovering = true;
      gsap.to(ring, { scale: 2.1, duration: 0.28, ease: 'power2.out' });
      gsap.to(dot, { scale: 0.2, duration: 0.2, ease: 'power2.out' });

      if (interactive.dataset.cursor === 'view') {
        label.textContent = 'VIEW';
        gsap.to(label, { opacity: 1, duration: 0.18 });
      }

      wake();
    };

    const onPointerOut = (event: PointerEvent) => {
      const target = event.target as HTMLElement | null;
      const interactive = target?.closest('a, button, [data-cursor]');
      if (!interactive) return;

      hovering = false;
      gsap.to(ring, { scale: 1, duration: 0.34, ease: 'power2.out' });
      gsap.to(dot, { scale: 1, duration: 0.2, ease: 'power2.out' });
      gsap.to(label, { opacity: 0, duration: 0.14 });
      wake();
    };

    const onLeave = () => {
      visible = false;
      gsap.to([dot, ring], { opacity: 0, duration: 0.2, ease: 'power2.out' });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('pointerout', onPointerOut, { passive: true });
    document.addEventListener('mouseleave', onLeave);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full"
        style={{ width: '8px', height: '8px', backgroundColor: '#c8ff00', opacity: 0, willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full bg-transparent"
        style={{ width: '40px', height: '40px', border: '1px solid rgba(200,255,0,0.44)', opacity: 0, willChange: 'transform' }}
      >
        <span
          ref={labelRef}
          className="select-none font-geist text-[9px] font-medium tracking-widest text-[var(--ax-lime)] opacity-0"
        />
      </div>
    </>
  );
}
