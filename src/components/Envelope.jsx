import { useEffect, useRef, useState } from 'react';
import { gsap, MOTION_OK, useCopy } from '../lib.js';
import { IMAGES } from '../content.js';

// Click-to-open envelope intro (preserved from the original invitation),
// re-choreographed with a GSAP timeline.
export default function Envelope({ guest, onOpen, onDone }) {
  const { t, setLang, lang } = useCopy();
  const root = useRef(null);
  const stage = useRef(null);
  const [opened, setOpened] = useState(false);
  const [seal, setSeal] = useState(true);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!window.matchMedia(MOTION_OK).matches) return;
      gsap.from('.env-in', { y: 28, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.12, delay: 0.2 });
      gsap.from('.envelope-button', { y: 40, scale: 0.92, opacity: 0, duration: 1.4, ease: 'expo.out', delay: 0.5 });
      gsap.to('.envelope-hint', { y: -3, opacity: 1, duration: 1.2, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      gsap.to('.envelope-seal', { scale: 1.07, duration: 1.4, repeat: -1, yoyo: true, ease: 'sine.inOut' });
    }, root);
    return () => ctx.revert();
  }, []);

  const open = () => {
    if (opened) return;
    setOpened(true);
    const reduce = !window.matchMedia(MOTION_OK).matches;
    const tl = gsap.timeline({ onComplete: onDone });
    if (reduce) {
      tl.call(onOpen, [], 0).to(root.current, { opacity: 0, duration: 0.4 });
      return;
    }
    tl.call(onOpen, [], 1.9); // hero entrance starts while the envelope dissolves
    gsap.killTweensOf('.envelope-hint, .envelope-seal');
    tl.to('.env-text', { opacity: 0, y: -12, duration: 0.4, stagger: 0.05 })
      .to('.envelope-seal', { scale: 0.4, opacity: 0, duration: 0.45, ease: 'back.in(2)' }, 0)
      .to('.envelope-flap', { rotateX: 180, duration: 0.9, ease: 'power3.inOut' }, 0.2)
      .set('.envelope-flap', { zIndex: 1 }, 0.65)
      .to('.envelope-paper', { yPercent: -62, scale: 1.05, duration: 1.0, ease: 'power3.out' }, 0.85)
      .to(stage.current, { scale: 1.9, y: 80, duration: 1.3, ease: 'power3.in' }, 1.6)
      .to(root.current, { opacity: 0, duration: 0.8, ease: 'power2.inOut' }, 2.0);
  };

  return (
    <div className="envelope-intro" ref={root} role="dialog" aria-modal="true" aria-label={t.envelope.aria}>
      <div className="lang-switch env-lang env-in">
        {['en', 'hi'].map((l) => (
          <button key={l} type="button" aria-pressed={lang === l} className={lang === l ? 'on' : ''} onClick={() => setLang(l)}>
            {l === 'en' ? 'English' : 'हिंदी'}
          </button>
        ))}
      </div>
      <div className="envelope-stage" ref={stage}>
        <div className="envelope-kicker env-in env-text">{t.envelope.kicker}</div>
        <h2 className="envelope-title env-in env-text">{t.envelope.title}</h2>
        <p className="envelope-subtitle env-in env-text">
          <span>{guest ? t.guest(guest).replace(/,$/, '') + ', ' + t.envelope.invited.toLowerCase() : t.envelope.invited}</span>
          {' '}{t.envelope.sub}
        </p>
        <button type="button" className="envelope-button" onClick={open} aria-label={t.envelope.aria} data-cursor="view" data-cursor-label="Open" autoFocus>
          <span className="envelope-shadow" />
          <span className="envelope-paper" aria-hidden="true">
            {seal && <img className="paper-ganesh" src={IMAGES.ganesh} alt="" onError={() => setSeal(false)} />}
            {!seal && <span className="paper-om">ॐ</span>}
            <span className="paper-names">Shikha <i>&amp;</i> Himanshu</span>
            <span className="paper-line" />
            <span className="paper-date">{t.envelope.date}</span>
          </span>
          <span className="envelope-body" />
          <span className="envelope-flap" />
          <span className="envelope-border" />
          <span className="envelope-seal">❦</span>
        </button>
        <div className="envelope-hint env-in env-text">✦ {t.envelope.hint} ✦</div>
      </div>
      <div className="envelope-foot" aria-hidden="true">ॐ &nbsp; शुभ विवाह &nbsp; ॐ</div>
    </div>
  );
}
