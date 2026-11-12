import React, { useMemo, useState } from 'react';
import { Search, Filter, Download, Star, Sparkles } from 'lucide-react';
import AdSlot from '../components/ads/AdSlot';
import ResumePreview from '../components/resume/ResumePreview';
import { templates, CATEGORIES, ACCENTS } from '../config/templates';
import { initialCV } from '../data/initialCV';

const BADGES = {
  0: { label: 'Most Popular', className: 'badge-popular' },
  1: { label: 'Recommended', className: 'badge-rec' },
  2: { label: 'New', className: 'badge-new' },
  5: { label: 'ATS Pick', className: 'badge-ats' },
};

export default function Templates({ onApplyTemplate, sampleCv }) {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [colorPick, setColorPick] = useState(null);
  const [hoverId, setHoverId] = useState(null);

  const cvBase = sampleCv || initialCV;

  const list = useMemo(() => {
    return templates.filter((t) => {
      const catOk = filter === 'All' || t.type === filter;
      const q = search.toLowerCase();
      const textOk = !q || `${t.name} ${t.type} ${t.desc}`.toLowerCase().includes(q);
      return catOk && textOk;
    });
  }, [filter, search]);

  return (
    <main className="templates-page gallery-pro">
      <div className="page-hero gallery-hero">
        <div className="container">
          <div className="eyebrow">TEMPLATE GALLERY</div>
          <h1>
            Choose a resume layout
            <br />
            <span className="gradient-text">recruiters trust</span>
          </h1>
          <p>
            Full preview of each design. Click <strong>Use free</strong> or <strong>Select</strong> to
            start editing — PDF export is free (ad-supported).
          </p>
          <div className="gallery-color-bar">
            <span className="color-bar-label">Accent color</span>
            <div className="color-dots">
              <button
                type="button"
                className={`color-dot none ${!colorPick ? 'active' : ''}`}
                onClick={() => setColorPick(null)}
                title="Default"
              >
                ✓
              </button>
              {ACCENTS.slice(0, 8).map((c) => (
                <button
                  key={c}
                  type="button"
                  className={`color-dot ${colorPick === c ? 'active' : ''}`}
                  style={{ background: c }}
                  onClick={() => setColorPick(c)}
                  aria-label={c}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container ad-band">
        <AdSlot size="leaderboard" label="Sponsored" />
      </div>

      <div className="container templates-layout gallery-layout">
        <aside className="templates-sidebar">
          <div className="filter-card glass-card">
            <h3>
              <Filter size={16} /> Categories
            </h3>
            <div className="filter-list">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={filter === c ? 'active' : ''}
                  onClick={() => setFilter(c)}
                >
                  {c}
                  {c !== 'All' && (
                    <span>{templates.filter((t) => t.type === c).length}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <AdSlot size="skyscraper" label="Sponsored" className="sticky-ad" />
        </aside>

        <div className="templates-main">
          <div className="templates-toolbar">
            <div className="search-wrap">
              <Search size={16} />
              <input
                placeholder="Search Classic, ATS, Corporate…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <span className="result-count">{list.length} templates</span>
          </div>

          {/* Full-page professional template cards */}
          <div className="full-template-grid">
            {list.map((t, idx) => {
              const badge = BADGES[idx];
              const accent = colorPick || t.color;
              const previewCv = {
                ...cvBase,
                template: t.id,
                accent,
                layout: t.layout,
              };
              return (
                <article
                  key={t.id}
                  className={`full-template-card ${hoverId === t.id ? 'is-hover' : ''}`}
                  onMouseEnter={() => setHoverId(t.id)}
                  onMouseLeave={() => setHoverId(null)}
                >
                  {badge && (
                    <span className={`pro-badge ${badge.className}`}>
                      {badge.label === 'Most Popular' && <Star size={10} />}
                      {badge.label === 'New' && <Sparkles size={10} />}
                      {badge.label}
                    </span>
                  )}

                  <div className="full-preview-wrap">
                    <div className="full-preview-scale">
                      <ResumePreview cv={previewCv} compact />
                    </div>
                    <div className="full-select-overlay">
                      <button
                        type="button"
                        className="btn btn-primary full-select-btn"
                        onClick={() => onApplyTemplate({ ...t, color: accent })}
                      >
                        Select
                      </button>
                    </div>
                  </div>

                  <div className="full-card-footer">
                    <div>
                      <strong>{t.name}</strong>
                      <small>{t.type}</small>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline btn-sm"
                      onClick={() => onApplyTemplate({ ...t, color: accent })}
                    >
                      <Download size={13} /> Use free
                    </button>
                  </div>
                </article>
              );
            })}
          </div>

          {list.length === 0 && (
            <div className="empty-state">No templates match. Try another filter.</div>
          )}

          <div className="ad-band">
            <AdSlot size="rectangle" label="Sponsored" className="ad-center" />
          </div>
        </div>
      </div>
    </main>
  );
}
