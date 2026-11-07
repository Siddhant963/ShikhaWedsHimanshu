import { useLayoutEffect, useRef } from 'react';
import { Gem, Leaf, Flower2, Flame, Clock, CalendarDays } from 'lucide-react';
import { gsap, MOTION_OK, useCopy } from '../lib.js';
import SplitWords from './SplitWords.jsx';

const ICONS = { ring: Gem, leaf: Leaf, flower: Flower2, flame: Flame };

export default function Events() {
  const { t, lang } = useCopy();
  const e = t.events;
  const root = useRef(null);
  const track = useRef(null);

  // Desktop: pinned horizontal story. Mobile / reduced motion: natural vertical stack.
  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(`${MOTION_OK} and (min-width: 900px)`, () => {
      const el = track.current;
      const dist = () => el.scrollWidth - window.innerWidth;
      gsap.to(el, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: {
          trigger: root.current.querySelector('.pin'),
          pin: true,
          scrub: 0.8,
          start: 'top top',
          end: () => `+=${dist()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
      gsap.fromTo('.ev-progress span', { scaleX: 0 }, {
        scaleX: 1, ease: 'none', transformOrigin: 'left',
        scrollTrigger: { trigger: root.current.querySelector('.pin'), start: 'top top', end: () => `+=${dist()}`, scrub: true },
      });
      gsap.utils.toArray('.ev-num').forEach((n) => {
        gsap.from(n, {
          yPercent: 30, opacity: 0, ease: 'none',
          scrollTrigger: { trigger: n, containerAnimation: gsap.getTweensOf(el)[0], start: 'left 95%', end: 'left 60%', scrub: true },
        });
      });
    }, root);
    mm.add(`${MOTION_OK} and (max-width: 899px)`, () => {
      gsap.utils.toArray('.ev-card').forEach((card) => {
        gsap.from(card, { opacity: 0, y: 50, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: card, start: 'top 88%', once: true } });
      });
    }, root);
    return () => mm.revert();
  }, [lang]);

  return (
    <section className="events" id="celebrations" ref={root}>
      <div className="wrap narrow center section-pad">
        <p className="eyebrow" data-reveal>{e.eyebrow}</p>
        <h2 className="h2 lg"><SplitWords text={e.title} /></h2>
      </div>

      <div className="pin">
        <div className="ev-track" ref={track}>
          {e.items.map((it) => {
            const Icon = ICONS[it.icon];
            const info = e.list[it.key];
            return (
              <article className="ev-card" key={it.key} data-cursor="hover">
                <span className="ev-num" aria-hidden="true">{it.day}</span>
                <div className="ev-body">
                  <Icon size={30} strokeWidth={1} className="ev-icon" aria-hidden="true" />
                  <p className="ev-month">{it.weekday} · {e.month}</p>
                  <h3>{info.name}</h3>
                  <p className="ev-meta"><CalendarDays size={15} strokeWidth={1.4} /> {info.date}</p>
                  <p className="ev-meta"><Clock size={15} strokeWidth={1.4} /> {info.time}</p>
                  <p className="ev-text">{info.text}</p>
                </div>
              </article>
            );
          })}
        </div>
        <div className="ev-progress" aria-hidden="true"><span /></div>
      </div>

      <div className="wrap narrow center ev-note-wrap">
        <p className="note" data-reveal><strong>{e.noteTitle}</strong>{e.note}</p>
      </div>
    </section>
  );
}
