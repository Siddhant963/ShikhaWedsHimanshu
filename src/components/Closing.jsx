import { ArrowUp } from 'lucide-react';
import { smooth, useCopy } from '../lib.js';
import Magnetic from './Magnetic.jsx';
import SplitWords from './SplitWords.jsx';

export default function Closing() {
  const { t } = useCopy();
  const top = () => (smooth.lenis ? smooth.lenis.scrollTo(0, { duration: 2 }) : window.scrollTo({ top: 0, behavior: 'smooth' }));
  return (
    <>
      <section className="closing section">
        <div className="wrap narrow center">
          <span className="closing-orn" aria-hidden="true" data-reveal>❀ ✦ ❀</span>
          <h2 className="h1"><SplitWords text={t.closing.title} /></h2>
          <p className="lede" data-reveal>{t.closing.text}</p>
        </div>
      </section>
      <footer className="footer">
        <span className="floral" aria-hidden="true">❀ ❋ ❀</span>
        <p>{t.footer.wish}</p>
        <strong>Shikha &amp; Himanshu</strong>
        <p>{t.footer.line}</p>
        <span className="floral" aria-hidden="true">ॐ शुभ विवाह ॐ</span>
        <Magnetic>
          <button type="button" className="btn btn-ghost" onClick={top}><ArrowUp size={15} strokeWidth={1.5} /> {t.footer.top}</button>
        </Magnetic>
      </footer>
    </>
  );
}
