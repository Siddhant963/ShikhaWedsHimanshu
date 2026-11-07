import { useLayoutEffect, useRef } from 'react';
import { gsap, MOTION_OK, useCopy } from '../lib.js';
import { IMAGES } from '../content.js';
import Photo from './Photo.jsx';
import SplitWords from './SplitWords.jsx';

function Lane({ side, data, chapters, portrait, label, chapterWord, pending }) {
  return (
    <div className={`lane lane-${side}`}>
      <div className="lane-head" data-reveal>
        <div className="avatar" data-cursor="hover">
          <Photo src={portrait} alt={data.name} label={label} position="center 20%" />
        </div>
        <p className="role">{data.role}</p>
        <h3>{data.name}</h3>
        <p className="tag">{data.tag}</p>
      </div>
      <ol className="chapters">
        {chapters.map(([title, body], i) => (
          <li className="chapter" key={title} data-chapter>
            <span className="chapter-no">{chapterWord} 0{i + 1}</span>
            <h4>{title}</h4>
            <p>{body}</p>
            <em className="pending">{pending}</em>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Story() {
  const { t } = useCopy();
  const s = t.story;
  const root = useRef(null);

  useLayoutEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(MOTION_OK, () => {
      // spine line draws as you scroll
      gsap.fromTo('.spine-fill', { scaleY: 0 }, {
        scaleY: 1, ease: 'none', transformOrigin: 'top',
        scrollTrigger: { trigger: '.roadmap', start: 'top 70%', end: 'bottom 70%', scrub: true },
      });
      gsap.utils.toArray('[data-chapter]').forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 50, duration: 1.1, ease: 'expo.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        });
      });
      gsap.utils.toArray('.pillar').forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 40, duration: 1.1, delay: i * 0.1, ease: 'expo.out',
          scrollTrigger: { trigger: '.pillars', start: 'top 85%', once: true },
        });
      });
      // the two lanes drift at slightly different speeds on wide screens
      if (window.matchMedia('(min-width: 900px)').matches) {
        gsap.to('.lane-groom', { y: 70, ease: 'none', scrollTrigger: { trigger: '.roadmap', start: 'top bottom', end: 'bottom top', scrub: 0.6 } });
      }
    }, root);
    return () => mm.revert();
  }, []);

  return (
    <section className="story section" id="story" ref={root}>
      <div className="wrap narrow center">
        <p className="eyebrow" data-reveal>{s.eyebrow}</p>
        <h2 className="h2 lg"><SplitWords text={s.title} /></h2>
        <p className="lede" data-reveal>{s.body}</p>
      </div>

      <div className="wrap roadmap">
        <div className="roadmap-title center" data-reveal>
          <span className="orn">❀ ✦ ॐ ✦ ❀</span>
          <h3>{s.roadmapTitle}</h3>
        </div>
        <div className="spine" aria-hidden="true"><span className="spine-fill" /></div>
        <div className="lanes">
          <Lane side="bride" data={s.bride} chapters={s.brideChapters} portrait={IMAGES.bride} label="S" chapterWord={s.chapter} pending={s.pending} />
          <Lane side="groom" data={s.groom} chapters={s.groomChapters} portrait={IMAGES.groom} label="H" chapterWord={s.chapter} pending={s.pending} />
        </div>
      </div>

      <div className="wrap pillars">
        {s.pillars.map(([title, body]) => (
          <article className="pillar" key={title}>
            <span className="pillar-orn" aria-hidden="true">✦</span>
            <h4>{title}</h4>
            <p>{body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
