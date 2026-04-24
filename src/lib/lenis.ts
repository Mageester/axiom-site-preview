import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export function initLenis(): Lenis {
  // Destroy previous instance if exists
  if (lenisInstance) {
    lenisInstance.destroy();
  }

  lenisInstance = new Lenis({
    lerp: 0.08,           // Lower = more inertia/weight (0.08 is very fluid)
    smoothWheel: true,
    syncTouch: false,
  });

  // Wire Lenis into GSAP ticker — critical for ScrollTrigger sync
  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance!.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
