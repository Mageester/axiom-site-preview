import { ReactNode, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { motionDuration, motionEase, prefersReducedMotion } from '../../lib/motion';

export default function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation();
  const shellRef = useRef<HTMLDivElement>(null);
  const wipeRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shell = shellRef.current;
    const wipe = wipeRef.current;
    const block = blockRef.current;
    if (!shell || !wipe || !block) return;

    if (prefersReducedMotion()) {
      gsap.set([shell, wipe, block], { clearProps: 'all' });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.killTweensOf([shell, wipe, block]);

      gsap.fromTo(
        shell,
        { opacity: 0, y: 20, clipPath: 'inset(18px 0 0 0)' },
        { opacity: 1, y: 0, clipPath: 'inset(0px 0 0 0)', duration: motionDuration.reveal, ease: motionEase.settle }
      );

      gsap.fromTo(
        block,
        { scaleX: 0, transformOrigin: '0% 50%' },
        { scaleX: 1, duration: 0.34, ease: motionEase.sweep, yoyo: true, repeat: 1, repeatDelay: 0.08 }
      );

      gsap.fromTo(
        wipe,
        { xPercent: -105 },
        { xPercent: 105, duration: motionDuration.sweep, ease: motionEase.sweep, delay: 0.08 }
      );
    });

    return () => ctx.revert();
  }, [location.pathname]);

  return (
    <>
      <div
        ref={wipeRef}
        className="pointer-events-none fixed left-0 top-[72px] z-40 h-px w-full"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(200,255,0,0.9), transparent)',
          boxShadow: '0 0 30px rgba(200,255,0,0.28)',
          transform: 'translateX(-105%)',
        }}
      />
      <div
        ref={blockRef}
        className="pointer-events-none fixed left-0 top-[72px] z-30 h-[3px] w-full origin-left"
        style={{
          background: 'rgba(200,255,0,0.86)',
          transform: 'scaleX(0)',
        }}
      />
      <div ref={shellRef}>{children}</div>
    </>
  );
}
