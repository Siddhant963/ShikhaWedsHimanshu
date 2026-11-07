import { useEffect, useState } from 'react';
import { useCopy } from '../lib.js';
import { WEDDING } from '../content.js';
import SplitWords from './SplitWords.jsx';

const target = new Date(WEDDING.date).getTime();
const pad = (n) => String(n).padStart(2, '0');

function diff() {
  const ms = Math.max(0, target - Date.now());
  return {
    ms,
    days: Math.floor(ms / 864e5),
    hours: Math.floor(ms / 36e5) % 24,
    minutes: Math.floor(ms / 6e4) % 60,
    seconds: Math.floor(ms / 1e3) % 60,
  };
}

export default function Countdown() {
  const { t } = useCopy();
  const [d, setD] = useState(diff);
  useEffect(() => {
    const id = setInterval(() => setD(diff()), 1000);
    return () => clearInterval(id);
  }, []);
  const c = t.countdown;
  return (
    <section className="countdown" aria-labelledby="cd-title">
      <p className="eyebrow" data-reveal>{c.eyebrow}</p>
      <h2 id="cd-title" className="h2"><SplitWords text={c.title} /></h2>
      {d.ms > 0 ? (
        <div className="cd-grid" role="timer" aria-live="off">
          {['days', 'hours', 'minutes', 'seconds'].map((u) => (
            <div className="cd-cell" key={u} data-reveal>
              <span className="cd-num">{u === 'days' ? d[u] : pad(d[u])}</span>
              <span className="cd-label">{c.units[u]}</span>
            </div>
          ))}
        </div>
      ) : (
        <p className="cd-done">{c.done}</p>
      )}
    </section>
  );
}
