import { createContext, useContext, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);
export { gsap, ScrollTrigger };

export const LangContext = createContext(null);
export const useCopy = () => useContext(LangContext);

// Shared lenis instance so the envelope can lock scroll and nav can scroll to anchors.
export const smooth = { lenis: null };

export const MOTION_OK = '(prefers-reduced-motion: no-preference)';
export const FINE_POINTER = '(hover: hover) and (pointer: fine)';

export function useMedia(query) {
  const [match, setMatch] = useState(() => (typeof window !== 'undefined' ? window.matchMedia(query).matches : false));
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setMatch(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return match;
}
