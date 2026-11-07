import { useEffect, useRef } from 'react';
import { gsap, FINE_POINTER, MOTION_OK } from '../lib.js';

// Premium cursor: a dot + a trailing ring. Desktop / fine pointers only.
// States are driven by data-cursor="hover" | "view" | "text" on any element.
export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    if (!window.matchMedia(FINE_POINTER).matches) return;
    document.documentElement.classList.add('has-cursor');
    const smoothMotion = window.matchMedia(MOTION_OK).matches;
    const dur = smoothMotion ? 0.5 : 0;
    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50, opacity: 0 });
    const dx = gsap.quickTo(dot.current, 'x', { duration: 0.12, ease: 'power3' });
    const dy = gsap.quickTo(dot.current, 'y', { duration: 0.12, ease: 'power3' });
    const rx = gsap.quickTo(ring.current, 'x', { duration: dur, ease: 'power3' });
    const ry = gsap.quickTo(ring.current, 'y', { duration: dur, ease: 'power3' });

    let shown = false;
    const move = (e) => {
      if (!shown) {
        shown = true;
        gsap.set([dot.current, ring.current], { x: e.clientX, y: e.clientY });
        gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
      }
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    };

    const setState = (state, text) => {
      const r = ring.current;
      r.dataset.state = state;
      label.current.textContent = text || '';
      const size = state === 'view' ? 92 : state === 'hover' ? 64 : 38;
      gsap.to(r, { width: size, height: size, duration: 0.45, ease: 'power3.out' });
      gsap.to(dot.current, { scale: state === 'view' ? 0 : state === 'hover' ? 0.5 : 1, duration: 0.3 });
    };

    const over = (e) => {
      const el = e.target.closest?.('[data-cursor], a, button, [role="button"]');
      if (!el) return setState('idle');
      const kind = el.dataset?.cursor || 'hover';
      setState(kind, el.dataset?.cursorLabel);
    };
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 }) && (shown = false);
    const down = () => gsap.fromTo(dot.current, { scale: 0.6 }, { scale: 1, duration: 0.4, ease: 'back.out(3)', overwrite: 'auto' });

    window.addEventListener('mousemove', move, { passive: true });
    document.addEventListener('mouseover', over, { passive: true });
    document.addEventListener('mouseleave', leave);
    window.addEventListener('mousedown', down);
    return () => {
      document.documentElement.classList.remove('has-cursor');
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', over);
      document.removeEventListener('mouseleave', leave);
      window.removeEventListener('mousedown', down);
      gsap.killTweensOf([dot.current, ring.current]);
    };
  }, []);

  return (
    <div className="cursor" aria-hidden="true">
      <div className="cursor-ring" ref={ring} data-state="idle"><span ref={label} /></div>
      <div className="cursor-dot" ref={dot} />
    </div>
  );
}
