import { useEffect, useLayoutEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';
import { gsap, ScrollTrigger, LangContext, MOTION_OK, smooth } from './lib.js';
import { COPY } from './content.js';
import Envelope from './components/Envelope.jsx';
import Cursor from './components/Cursor.jsx';
import Nav from './components/Nav.jsx';
import Hero from './components/Hero.jsx';
import Countdown from './components/Countdown.jsx';
import Story from './components/Story.jsx';
import Events from './components/Events.jsx';
import Venue from './components/Venue.jsx';
import Gallery from './components/Gallery.jsx';
import Party from './components/Party.jsx';
import Closing from './components/Closing.jsx';

function readGuest() {
  const raw = new URLSearchParams(window.location.search).get('to');
  return raw ? raw.trim().replace(/\s+/g, ' ').slice(0, 80) : '';
}

function initialLang() {
  try {
    const s = localStorage.getItem('shikha-himanshu-language');
    if (s === 'hi' || s === 'en') return s;
  } catch { /* storage unavailable */ }
  return 'en';
}

export default function App() {
  const [lang, setLangState] = useState(initialLang);
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);
  const guest = useMemo(readGuest, []);
  const t = COPY[lang];

  const setLang = (l) => {
    setLangState(l);
    try { localStorage.setItem('shikha-himanshu-language', l); } catch { /* ignore */ }
  };
  const ctx = useMemo(() => ({ t, lang, setLang }), [t, lang]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dataset.language = lang;
    document.title = t.title;
  }, [lang, t]);

  // Smooth scrolling (Lenis) wired into GSAP's ticker. Locked while the envelope is up.
  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    if (!window.matchMedia(MOTION_OK).matches) {
      document.documentElement.style.overflow = opened ? '' : 'hidden';
      return () => { document.documentElement.style.overflow = ''; };
    }
    const lenis = new Lenis({ duration: 1.25, easing: (x) => 1 - Math.pow(1 - x, 4), smoothWheel: true });
    smooth.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    if (!opened) lenis.stop();
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      smooth.lenis = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!opened) {
      document.documentElement.classList.add('locked');
      return;
    }
    document.documentElement.classList.remove('locked');
    document.documentElement.style.overflow = '';
    smooth.lenis?.start();
    ScrollTrigger.refresh();
  }, [opened]);

  // Generic scroll reveals for anything tagged data-reveal.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      gsap.utils.toArray('[data-reveal]').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 36, duration: 1.2, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 90%', once: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <LangContext.Provider value={ctx}>
      <Cursor />
      {!gone && <Envelope guest={guest} onOpen={() => setOpened(true)} onDone={() => setGone(true)} />}
      <Nav visible={opened} />
      <main id="top" className={opened ? 'is-open' : 'is-closed'} aria-hidden={!opened}>
        <Hero ready={opened} guest={guest} />
        <Countdown />
        <Story />
        <Events />
        <Venue />
        <Gallery />
        <Party />
        <Closing />
      </main>
    </LangContext.Provider>
  );
}
