import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { marked } from 'marked';
import { splitSlides } from '../lib/slides';

interface Props {
  body: string;
  backHref: string;
}

function initialIndexFromHash(total: number): number {
  const fromHash = Number.parseInt(window.location.hash.replace('#', ''), 10);
  return Number.isFinite(fromHash) && fromHash >= 1 && fromHash <= total ? fromHash - 1 : 0;
}

export default function SlideViewer({ body, backHref }: Props) {
  const slides = useMemo(() => splitSlides(body), [body]);
  const slidesHtml = useMemo(() => slides.map((slide) => marked.parse(slide) as string), [slides]);
  const [index, setIndex] = useState(() => initialIndexFromHash(slides.length));

  useEffect(() => {
    window.history.replaceState(null, '', `#${index + 1}`);
  }, [index]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown' || event.key === ' ') {
        setIndex((i) => Math.min(i + 1, slides.length - 1));
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        setIndex((i) => Math.max(i - 1, 0));
      }
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [slides.length]);

  return (
    <div className="slide-viewer">
      <div className="slide-viewer__topbar">
        <Link className="nav-btn" to={backHref}>
          ← Retour
        </Link>
        <span className="slide-viewer__counter">
          {index + 1} / {slides.length}
        </span>
        <span className="slide-viewer__spacer" />
      </div>

      <div className="slide-viewer__stage">
        <div className="slide-card" dangerouslySetInnerHTML={{ __html: slidesHtml[index] ?? '' }} />
      </div>

      <div className="slide-viewer__bottombar">
        <button
          className="nav-btn"
          type="button"
          onClick={() => setIndex((i) => Math.max(i - 1, 0))}
          disabled={index === 0}
        >
          ← Précédent
        </button>
        <div className="nav-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              className={`nav-dot${i === index ? ' active' : ''}`}
              aria-label={`Aller à la diapositive ${i + 1}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
        <button
          className="nav-btn"
          type="button"
          onClick={() => setIndex((i) => Math.min(i + 1, slides.length - 1))}
          disabled={index === slides.length - 1}
        >
          Suivant →
        </button>
      </div>
    </div>
  );
}
