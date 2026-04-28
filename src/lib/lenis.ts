import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { coarsePointer, prefersReducedMotion } from './motion';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
let ticker: ((time: number) => void) | null = null;

export function initLenis(): Lenis | null {
  destroyLenis();

  if (prefersReducedMotion() || coarsePointer()) {
    ScrollTrigger.refresh();
    return null;
  }

  lenisInstance = new Lenis({
    lerp: 0.08,
    smoothWheel: true,
    syncTouch: false,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  ticker = (time: number) => {
    lenisInstance?.raf(time * 1000);
  };

  gsap.ticker.add(ticker);
  gsap.ticker.lagSmoothing(0);
  ScrollTrigger.refresh();

  return lenisInstance;
}

export function destroyLenis() {
  if (ticker) {
    gsap.ticker.remove(ticker);
    ticker = null;
  }

  lenisInstance?.destroy();
  lenisInstance = null;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
