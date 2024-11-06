import * as React from 'react';
import { BREAKPOINTS } from '../../lib/tokens';

const desktopBreakpoint = BREAKPOINTS.find((b) => b.name === 'desktop');
const MOBILE_BREAKPOINT = desktopBreakpoint ? desktopBreakpoint.minWidth : 0; // min width in pixels

export function useIsMobile(): boolean {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };
    mql.addEventListener('change', onChange);
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return !!isMobile;
}
