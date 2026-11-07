import { useLayoutEffect, useRef } from 'react';
import { gsap, ScrollTrigger, MOTION_OK } from '../lib.js';

// Masked word-by-word text reveal, triggered on scroll (or immediately with `now`).
export default function SplitWords({ text, as: Tag = 'span', className = '', now = false, delay = 0, stagger = 0.045 }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const words = el.querySelectorAll('.w > span');
      const tween = gsap.from(words, {
        yPercent: 110,
        rotate: 4,
        duration: 1.1,
        ease: 'expo.out',
        stagger,
        delay,
        paused: !now,
      });
      if (!now) {
        ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => tween.play() });
      }
    });
    return () => mm.revert();
  }, [text, now, delay, stagger]);

  const words = String(text).split(' ');
  return (
    <Tag ref={ref} className={`split ${className}`} aria-label={text}>
      {words.map((w, i) => (
        <span className="w" aria-hidden="true" key={`${i}-${w}`}>
          <span>{w}</span>{i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </Tag>
  );
}
