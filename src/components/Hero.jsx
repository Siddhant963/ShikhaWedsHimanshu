import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap, MOTION_OK, useCopy, useMedia } from '../lib.js';
import { IMAGES } from '../content.js';
import Photo from './Photo.jsx';
import SplitWords from './SplitWords.jsx';

const Petals = lazy(() => import('./Petals.jsx'));

const Letters = ({ text }) =>
  text.split('').map((c, i) => (
    <span className="ltr-mask" aria-hidden="true" key={i}><span className="ltr">{c}</span></span>
  ));

export default function Hero({ ready, guest }) {
  const { t } = useCopy();
  const root = useRef(null);
  const [inView, setInView] = useState(true);
  const motionOk = useMedia(MOTION_OK);
  const small = useMedia('(max-width: 720px)');

  // Entrance — runs once the envelope has opened.
  useLayoutEffect(() => {
    if (!ready) return;
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });
      tl.from('.hero-eyebrow', { opacity: 0, y: 20, duration: 1.2 }, 0.1)
        .from('.hero h1 .ltr', { yPercent: 115, rotate: 6, duration: 1.4, stagger: 0.04 }, 0.2)
        .from('.hero .amp', { opacity: 0, scale: 0.4, duration: 1.4 }, 0.7)
        .from('.hero-arch', { clipPath: 'inset(100% 0 0 0)', duration: 1.8, ease: 'power4.inOut' }, 0.5)
        .from('.hero-arch img, .hero-arch .photo-fallback', { scale: 1.35, duration: 2.2, ease: 'power3.out' }, 0.5)
        .from('.hero-rise', { opacity: 0, y: 24, duration: 1.2, stagger: 0.12 }, 1.1)
        .from('.hero-scroll', { opacity: 0, duration: 1 }, 2);
      gsap.to('.hero-scroll svg', { y: 6, repeat: -1, yoyo: true, duration: 1, ease: 'sine.inOut' });

      // Parallax on scroll
      gsap.to('.hero-arch img, .hero-arch .photo-fallback', {
        yPercent: 12, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-copy', {
        yPercent: -14, opacity: 0.2, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
      gsap.to('.hero-glow', {
        yPercent: 25, ease: 'none',
        scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true },
      });
    }, root);
    return () => mm.revert();
  }, [ready]);

  // Only run the 3D loop while the hero is on screen.
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0 });
    io.observe(root.current);
    return () => io.disconnect();
  }, []);

  return (
    <section className="hero" id="home" ref={root}>
      <div className="hero-glow" aria-hidden="true" />
      {motionOk && (
        <Suspense fallback={null}>
          <Petals count={small ? 16 : 34} active={ready && inView} />
        </Suspense>
      )}
      <div className="hero-copy">
        <div className="hero-om hero-rise" aria-hidden="true">ॐ</div>
        <p className="hero-eyebrow">{t.hero.eyebrow}</p>
        <h1 aria-label="Shikha & Himanshu">
          <span className="name"><Letters text="Shikha" /></span>
          <span className="amp" aria-hidden="true">&amp;</span>
          <span className="name"><Letters text="Himanshu" /></span>
        </h1>
        <p className="hero-sub hero-rise">{t.hero.sub}</p>
      </div>

      <figure className="hero-arch" data-cursor="view" data-cursor-label="❀">
        <Photo src={IMAGES.hero} alt={t.hero.alt} label="S ❦ H" eager position="center 30%" />
      </figure>

      <div className="hero-foot">
        <p className="hero-greet hero-rise">{guest ? t.guest(guest) : t.guestDefault}</p>
        <p className="hero-invite hero-rise">
          {t.hero.invite[0]}<br />{t.hero.invite[1]}
        </p>
        <p className="hero-dates hero-rise">{t.hero.dates}</p>
      </div>

      <div className="hero-scroll" aria-hidden="true">
        <span>{t.hero.scroll}</span><ChevronDown size={18} strokeWidth={1.2} />
      </div>
    </section>
  );
}

export { SplitWords };
