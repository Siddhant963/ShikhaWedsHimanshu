import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { smooth, useCopy } from '../lib.js';
import Magnetic from './Magnetic.jsx';

const LINKS = ['story', 'celebrations', 'venue', 'gallery', 'party'];

export function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (smooth.lenis) smooth.lenis.scrollTo(el, { offset: -10, duration: 1.6 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

export default function Nav({ visible }) {
  const { t, lang, setLang } = useCopy();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 80);
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);

  useEffect(() => {
    smooth.lenis?.[open ? 'stop' : 'start']?.();
    if (!open) return;
    const esc = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', esc);
    return () => window.removeEventListener('keydown', esc);
  }, [open]);

  const go = (id) => { setOpen(false); setTimeout(() => goTo(id), 60); };

  return (
    <header className={`nav ${solid ? 'solid' : ''} ${visible ? 'in' : ''}`}>
      <button type="button" className="nav-mark" onClick={() => go('home')} aria-label="Shikha & Himanshu — top">
        S<span>&amp;</span>H
      </button>
      <nav className="nav-links" aria-label="Wedding sections">
        {LINKS.map((id) => (
          <button key={id} type="button" onClick={() => go(id)}>{t.nav[id]}</button>
        ))}
      </nav>
      <div className="nav-end">
        <div className="lang-switch" role="group" aria-label={t.langLabel}>
          {['en', 'hi'].map((l) => (
            <button key={l} type="button" aria-pressed={lang === l} className={lang === l ? 'on' : ''} onClick={() => setLang(l)}>
              {l === 'en' ? 'EN' : 'हि'}
            </button>
          ))}
        </div>
        <button type="button" className="nav-burger" onClick={() => setOpen(true)} aria-label={t.menu} aria-expanded={open}>
          <Menu size={22} strokeWidth={1.4} />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="menu"
            role="dialog"
            aria-modal="true"
            aria-label={t.menu}
            initial={{ clipPath: 'circle(0% at 92% 4%)' }}
            animate={{ clipPath: 'circle(150% at 92% 4%)' }}
            exit={{ clipPath: 'circle(0% at 92% 4%)' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <button type="button" className="menu-close" onClick={() => setOpen(false)} aria-label={t.close}>
              <X size={26} strokeWidth={1.3} />
            </button>
            <ul>
              {LINKS.map((id, i) => (
                <motion.li key={id} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.07, duration: 0.6 }}>
                  <button type="button" onClick={() => go(id)}>
                    <small>0{i + 1}</small>{t.nav[id]}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="menu-foot">ॐ शुभ विवाह ॐ</div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export { Magnetic };
