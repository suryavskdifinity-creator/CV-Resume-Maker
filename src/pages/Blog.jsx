import React from 'react';
import { ArrowRight, ArrowLeft, Clock } from 'lucide-react';
import AdSlot from '../components/ads/AdSlot';
import PageHero from '../components/ui/PageHero';
import { articles } from '../data/articles';

function Sidebar({ onNavigate }) {
  return (
    <aside className="blog-side">
      <div className="aside-card dark-card">
        <h3>Build your resume free</h3>
        <p>150+ templates, live preview, free PDF.</p>
        <button type="button" onClick={() => onNavigate('templates')}>Browse templates <ArrowRight size={15} /></button>
      </div>
      <div className="sticky-ad-col">
        <AdSlot size="rectangle" />
        <AdSlot size="skyscraper" />
      </div>
    </aside>
  );
}

export default function Blog({ slug, onNavigate, onOpenArticle }) {
  const article = articles.find((a) => a.slug === slug);

  if (article) {
    const mid = Math.floor(article.body.length / 2);
    return (
      <main className="blog-page">
        <div className="container blog-layout">
          <article className="blog-article">
            <button type="button" className="back-link" onClick={() => onNavigate('blog')}><ArrowLeft size={15} /> All guides</button>
            <div className="eyebrow">{article.category}</div>
            <h1>{article.title}</h1>
            <p className="article-meta"><Clock size={14} /> {article.read} · CVora by Suraj</p>
            <AdSlot size="infeed" className="article-ad" />
            {article.body.map((b, i) => (
              <React.Fragment key={i}>
                {i === mid && <AdSlot size="infeed" className="article-ad" />}
                {b[0] === 'h' && <h2>{b[1]}</h2>}
                {b[0] === 'p' && <p>{b[1]}</p>}
                {b[0] === 'ul' && <ul>{b[1].map((x) => <li key={x}>{x}</li>)}</ul>}
              </React.Fragment>
            ))}
            <div className="article-cta">
              <h3>Ready to put this into practice?</h3>
              <button type="button" className="btn btn-primary" onClick={() => onNavigate('editor')}>Build my resume <ArrowRight size={16} /></button>
            </div>
            <AdSlot size="leaderboard" />
            <h3 className="more-title">More guides</h3>
            <div className="blog-grid small">
              {articles.filter((a) => a.slug !== slug).slice(0, 2).map((a) => (
                <button key={a.slug} type="button" className="blog-card" onClick={() => onOpenArticle(a.slug)}>
                  <span className="blog-cat">{a.category}</span><strong>{a.title}</strong><span className="blog-read">{a.read}</span>
                </button>
              ))}
            </div>
          </article>
          <Sidebar onNavigate={onNavigate} />
        </div>
      </main>
    );
  }

  return (
    <main className="blog-page">
      <PageHero eyebrow="CVORA GUIDES" title="Resume tips & career advice">
        <p>Practical, no-fluff guides to help you write a stronger resume and land more interviews.</p>
      </PageHero>
      <div className="container ad-band"><AdSlot size="leaderboard" /></div>
      <div className="container blog-layout">
        <div className="blog-grid">
          {articles.map((a, i) => (
            <React.Fragment key={a.slug}>
              <button type="button" className="blog-card" onClick={() => onOpenArticle(a.slug)}>
                <span className="blog-cat">{a.category}</span>
                <strong>{a.title}</strong>
                <p>{a.excerpt}</p>
                <span className="blog-read"><Clock size={13} /> {a.read} <ArrowRight size={14} /></span>
              </button>
              {i === 1 && <div className="feed-ad"><AdSlot size="infeed" /></div>}
            </React.Fragment>
          ))}
        </div>
        <Sidebar onNavigate={onNavigate} />
      </div>
    </main>
  );
}
