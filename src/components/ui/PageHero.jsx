import React from 'react';

export default function PageHero({ eyebrow, title, children }) {
  return (
    <section className="legal-hero">
      <div className="container">
        <div className="eyebrow">{eyebrow}</div>
        <h1>{title}</h1>
        {children}
      </div>
    </section>
  );
}
