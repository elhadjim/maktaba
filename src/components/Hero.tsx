import type { ReactNode } from 'react';

export default function Hero({ eyebrow, title, children }: { eyebrow: string; title: string; children?: ReactNode }) {
  return (
    <div className="hero">
      <p className="hero-eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      {children}
    </div>
  );
}
