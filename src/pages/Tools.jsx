import React, { useState } from 'react';
import { Target, Mail, WandSparkles, Search, Sparkles, Copy, ArrowRight, Check } from 'lucide-react';
import Field from '../components/ui/Field';
import AdSlot from '../components/ads/AdSlot';
import { atsScan, buildCoverLetter, makeSummary, improveBullet } from '../utils/aiHelpers';

export default function Tools({ cv, onUpdate, onUpdateList, onNavigate, onToast }) {
  const [jobText, setJobText] = useState('');
  const [toolResult, setToolResult] = useState('');
  const [coverRole, setCoverRole] = useState('');
  const [coverCompany, setCoverCompany] = useState('');
  const [coverLetter, setCoverLetter] = useState('');

  return (
    <main className="tools-page">
      <div className="page-hero">
        <div className="container">
          <div className="eyebrow">AI TOOLS</div>
          <h1>
            Writing helpers that
            <br />
            <span className="gradient-text">work offline</span>
          </h1>
          <p>
            Local, rule-based assistance — no API key required. Connect your own backend later
            for full generative AI.
          </p>
        </div>
      </div>

      <div className="container ad-band">
        <AdSlot size="leaderboard" label="Sponsored" />
      </div>

      <div className="container tools-layout">
        <div className="tools-main">
          <div className="tool-card glass-card">
            <div className="tool-head">
              <Target size={20} />
              <h3>ATS keyword scan</h3>
            </div>
            <p>Paste a job description to estimate keyword match against your current CV.</p>
            <textarea
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste job description here…"
              rows={5}
            />
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                const res = atsScan(cv, jobText);
                setToolResult(
                  `ATS match estimate: ${res.score}%\nMatched: ${res.matched.join(', ') || '—'}\nConsider adding: ${res.missing.join(', ') || '—'}`
                );
              }}
            >
              <Search size={16} /> Run scan
            </button>
            {toolResult && <pre className="tool-result">{toolResult}</pre>}
          </div>

          <div className="tool-card glass-card">
            <div className="tool-head">
              <Mail size={20} />
              <h3>Cover letter draft</h3>
            </div>
            <div className="field-grid">
              <Field label="Role" value={coverRole} onChange={setCoverRole} placeholder={cv.role} />
              <Field
                label="Company"
                value={coverCompany}
                onChange={setCoverCompany}
                placeholder="Company name"
              />
            </div>
            <button
              className="btn btn-primary"
              type="button"
              onClick={() => {
                setCoverLetter(buildCoverLetter(cv, coverRole, coverCompany));
                onToast('Cover letter generated');
              }}
            >
              <Sparkles size={16} /> Generate draft
            </button>
            {coverLetter && (
              <div className="cover-output">
                <pre>{coverLetter}</pre>
                <button
                  className="btn btn-outline btn-sm"
                  type="button"
                  onClick={() => {
                    navigator.clipboard?.writeText(coverLetter);
                    onToast('Copied to clipboard');
                  }}
                >
                  <Copy size={14} /> Copy
                </button>
              </div>
            )}
          </div>

          <div className="tool-card glass-card">
            <div className="tool-head">
              <WandSparkles size={20} />
              <h3>Quick CV actions</h3>
            </div>
            <div className="quick-actions">
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => {
                  onUpdate('summary', makeSummary(cv));
                  onToast('Summary drafted');
                }}
              >
                Draft summary
              </button>
              <button
                className="btn btn-outline"
                type="button"
                onClick={() => {
                  if (cv.experience?.[0]) {
                    onUpdateList(
                      'experience',
                      0,
                      'description',
                      improveBullet(cv.experience[0].description)
                    );
                    onToast('First bullet improved');
                  }
                }}
              >
                Improve first bullet
              </button>
              <button className="btn btn-outline" type="button" onClick={() => onNavigate('editor')}>
                Open editor
              </button>
            </div>
          </div>
        </div>

        <aside className="tools-aside">
          <div className="aside-card dark-card">
            <Sparkles size={22} />
            <h3>Better writing starts with a good first draft.</h3>
            <p>
              Our built-in helpers run locally in your browser. You stay in control of every edit.
            </p>
            <button type="button" onClick={() => onNavigate('editor')}>
              Open my CV <ArrowRight size={15} />
            </button>
          </div>
          <div className="aside-card glass-card">
            <h3>Quick checklist</h3>
            {[
              'Use a clear professional title',
              'Lead with measurable results',
              'Tailor skills to the role',
              'Check spelling and dates',
              'Save a PDF before applying',
            ].map((x) => (
              <div className="checklist-line" key={x}>
                <Check size={14} /> {x}
              </div>
            ))}
          </div>
          <AdSlot size="rectangle" label="Sponsored" />
        </aside>
      </div>
    </main>
  );
}
