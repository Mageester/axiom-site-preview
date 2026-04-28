export const motionEase = {
  reveal: 'power4.out',
  sweep: 'power4.inOut',
  settle: 'power3.out',
  linear: 'none',
} as const;

export const motionDuration = {
  fast: 0.42,
  reveal: 0.86,
  scene: 1.04,
  sweep: 0.72,
} as const;

export const motionStagger = {
  word: 0.055,
  item: 0.08,
  card: 0.1,
} as const;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const coarsePointer = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(pointer: coarse)').matches;
