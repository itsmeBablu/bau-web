export const motionEase = {
  smooth: 'power3.out',
  enter: 'power4.out',
  settle: 'power2.inOut',
} as const;

export const motionDuration = {
  quick: 0.35,
  base: 0.7,
  reveal: 1.05,
} as const;

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}
