import React from 'react';
import { LayoutTemplate, Sparkles, FileText, Wand2 } from 'lucide-react';

const NAV = [
  { id: 'home', label: 'Home' },
  { id: 'templates', label: 'Templates' },
  { id: 'editor', label: 'Resume Builder' },
  { id: 'tools', label: 'AI Tools' },
];

export default function Header({ page, onNavigate }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <button type="button" className="brand" onClick={() => onNavigate('home')}>
          <span className="brand-mark">
            <Sparkles size={18} />
          </span>
          <span className="brand-text">
            <strong>CVora</strong>
            <small>BY SURAJ</small>
          </span>
        </button>

        <nav className="main-nav">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              className={page === item.id ? 'nav-link active' : 'nav-link'}
              onClick={() => onNavigate(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="btn btn-ghost btn-sm hide-mobile"
            onClick={() => onNavigate('templates')}
          >
            <LayoutTemplate size={15} /> Templates
          </button>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => onNavigate('editor')}
          >
            <FileText size={15} /> Build CV
          </button>
        </div>
      </div>
    </header>
  );
}
