import { Crown, Heart, Users, Sparkles } from 'lucide-react';
import { useCopy } from '../lib.js';
import SplitWords from './SplitWords.jsx';

const ICONS = [Crown, Heart, Users, Sparkles];

export default function Party() {
  const { t } = useCopy();
  const p = t.party;
  return (
    <section className="party section" id="party">
      <div className="wrap narrow center">
        <p className="eyebrow" data-reveal>{p.eyebrow}</p>
        <h2 className="h2 lg"><SplitWords text={p.title} /></h2>
      </div>
      <ul className="wrap party-list">
        {p.items.map(([title, name, text], i) => {
          const Icon = ICONS[i];
          return (
            <li key={title} data-reveal data-cursor="hover">
              <Icon size={26} strokeWidth={1} aria-hidden="true" />
              <h3>{title}</h3>
              {name && <p className="party-name">{name}</p>}
              <p>{text}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
