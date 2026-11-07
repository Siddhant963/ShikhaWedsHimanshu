import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { gsap, MOTION_OK, smooth, useCopy } from '../lib.js';
import { IMAGES } from '../content.js';
import Photo from './Photo.jsx';
import SplitWords from './SplitWords.jsx';

const LABELS = { couple: 'S ♥ H', bride: 'S', groom: 'H' };
const POS = { couple: 'center 25%', bride: 'center 20%', groom: 'center 22%' };

export default function Gallery() {
  const { t, lang } = useCopy();
  const g = t.gallery;
  const root = useRef(null);
  const [active, setActive] = useState(null);
  const trigger = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray('.g-item').forEach((item) => {
        const frame = item.querySelector('.g-frame');
        const img = item.querySelector('img, .photo-fallback');
        gsap.from(frame, {
          clipPath: 'inset(0 0 100% 0)', duration: 1.5, ease: 'power4.inOut',
          scrollTrigger: { trigger: item, start: 'top 85%', once: true },
        });
        gsap.fromTo(img, { scale: 1.25 }, {
          scale: 1.0, ease: 'none',
          scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true },
        });
        gsap.fromTo(img, { yPercent: -6 }, {
          yPercent: 6, ease: 'none',
          scrollTrigger: { trigger: item, start: 'top bottom', end: 'bottom top', scrub: true },
        });
      });
    }, root);
    return () => mm.revert();
  }, []);

  const close = useCallback(() => { setActive(null); trigger.current?.focus(); }, []);
  const step = useCallback((d) => setActive((i) => (i === null ? i : (i + d + g.items.length) % g.items.length)), [g.items.length]);

  useEffect(() => {
    if (active === null) return;
    smooth.lenis?.stop();
    document.documentElement.style.overflow = 'hidden';
    const key = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', key);
    return () => {
      window.removeEventListener('keydown', key);
      document.documentElement.style.overflow = '';
      smooth.lenis?.start();
    };
  }, [active, close, step]);

  const cur = active !== null ? g.items[active] : null;

  return (
    <section className="gallery section" id="gallery" ref={root} data-lang={lang}>
      <div className="wrap narrow center">
        <p className="eyebrow" data-reveal>{g.eyebrow}</p>
        <h2 className="h2 lg"><SplitWords text={g.title} /></h2>
      </div>

      <div className="wrap g-grid">
        {g.items.map((it, i) => (
          <figure className={`g-item g-${it.key}`} key={it.key}>
            <button
              type="button"
              className="g-frame"
              data-cursor="view"
              data-cursor-label={g.view}
              aria-label={`${g.view}: ${it.title}`}
              onClick={(e) => { trigger.current = e.currentTarget; setActive(i); }}
            >
              <Photo src={IMAGES[it.key]} alt={it.alt} label={LABELS[it.key]} position={POS[it.key]} />
            </button>
            <figcaption>
              <span className="cap-no">0{i + 1}</span>
              <span className="cap-title">{it.title}</span>
              <span className="cap-text">{it.text}</span>
            </figcaption>
          </figure>
        ))}
      </div>
      <p className="wrap narrow center g-more" data-reveal>{g.more}</p>

      <AnimatePresence>
        {cur && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={cur.title}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={close}
          >
            <button type="button" className="lb-btn lb-close" onClick={close} aria-label={g.closeLb} autoFocus><X size={24} strokeWidth={1.3} /></button>
            <button type="button" className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label={g.prev}><ChevronLeft size={30} strokeWidth={1.2} /></button>
            <button type="button" className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label={g.next}><ChevronRight size={30} strokeWidth={1.2} /></button>
            <AnimatePresence mode="wait">
              <motion.figure
                key={cur.key}
                className="lb-fig"
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                onClick={(e) => e.stopPropagation()}
              >
                <Photo src={IMAGES[cur.key]} alt={cur.alt} label={LABELS[cur.key]} position="center" eager />
                <figcaption>
                  <strong>{cur.title}</strong>
                  <span>{cur.text}</span>
                  <small>{active + 1} / {g.items.length}</small>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
