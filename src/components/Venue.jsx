import { MapPin, ArrowUpRight } from 'lucide-react';
import { useCopy } from '../lib.js';
import { WEDDING } from '../content.js';
import Magnetic from './Magnetic.jsx';
import SplitWords from './SplitWords.jsx';

export default function Venue() {
  const { t } = useCopy();
  const v = t.venue;
  const href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(WEDDING.mapsQuery)}`;
  return (
    <section className="venue section" id="venue">
      <div className="venue-bg" aria-hidden="true" />
      <div className="wrap narrow center venue-inner">
        <MapPin size={34} strokeWidth={1} className="venue-pin" data-reveal aria-hidden="true" />
        <p className="eyebrow light" data-reveal>{v.eyebrow}</p>
        <h2 className="h1 light"><SplitWords text={v.name} /></h2>
        <p className="venue-addr" data-reveal>{v.address}</p>
        <p className="venue-text" data-reveal>{v.text}</p>
        <div data-reveal>
          <Magnetic>
            <a className="btn btn-gold" href={href} target="_blank" rel="noopener noreferrer">
              {v.cta} <ArrowUpRight size={16} strokeWidth={1.5} />
            </a>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
