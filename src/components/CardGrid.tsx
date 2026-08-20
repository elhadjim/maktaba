import { Link } from 'react-router-dom';

export interface CardItem {
  href: string;
  title: string;
  description: string;
}

export default function CardGrid({ items, exploreLabel }: { items: CardItem[]; exploreLabel: string }) {
  return (
    <ul className="cards-grid">
      {items.map((item, i) => (
        <li className="card" key={item.href}>
          <Link className="card-link" to={item.href} aria-label={item.title} />
          <span className="card-num">{String(i + 1).padStart(2, '0')}</span>
          <h2 className="card-title">{item.title}</h2>
          <p className="card-desc">{item.description}</p>
          <span className="card-arrow">{exploreLabel} →</span>
        </li>
      ))}
    </ul>
  );
}
