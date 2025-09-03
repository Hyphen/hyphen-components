export const prefersReducedMotion = (() => {
  // eslint-disable-line import/prefer-default-export
  let shouldReduceMotion: boolean | undefined;

  return () => {
    if (shouldReduceMotion === undefined) {
      const mediaQuery =
        typeof globalThis.window !== 'undefined' &&
        typeof globalThis.window.matchMedia === 'function'
          ? globalThis.window.matchMedia('(prefers-reduced-motion: reduce)')
          : undefined;
      shouldReduceMotion = !mediaQuery || mediaQuery.matches;
    }
    return shouldReduceMotion;
  };
})();
