import { prefersReducedMotion } from './prefersReducedMotion';

describe('prefersReducedMotion', () => {
  it('does not throw and returns true when window is undefined', () => {
    const originalWindow = (global as any).window;
    // Simulate server-side environment without window
    (global as any).window = undefined;

    expect(prefersReducedMotion()).toBe(true);

    (global as any).window = originalWindow;
  });
});
