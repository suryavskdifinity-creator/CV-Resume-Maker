import React, { useEffect, useState } from 'react';
import {
  ArrowRight, Sparkles, ShieldCheck, WandSparkles, FileCheck2, Palette,
  Zap, Target, FileText, Download, LayoutTemplate, LockKeyhole,
  CheckCircle2,
} from 'lucide-react';
import ResumePreview from '../components/resume/ResumePreview';
import TemplateThumb from '../components/resume/TemplateThumb';
import AdSlot from '../components/ads/AdSlot';
import { templates } from '../config/templates';

const TYPING_WORDS = ['hired', 'noticed', 'promoted', 'shortlisted', 'interviewed'];

const STATS = [
  { value: '120+', label: 'Resume templates' },
  { value: '8', label: 'Layout styles' },
  { value: '100%', label: 'Free PDF export' },
  { value: '0', label: 'Account required' },
];

const FEATURES = [
  { icon: <WandSparkles size={22} />, title: 'AI writing helpers', text: 'Draft a strong summary and turn plain duties into impact-focused bullets in seconds.' },
  { icon: <FileCheck2 size={22} />, title: 'ATS-friendly designs', text: 'Clean structure, clear headings, and layouts recruiters and scanners can both read.' },
  { icon: <Palette size={22} />, title: 'Professional templates', text: 'Classic, modern, corporate, creative, and two-column styles with unique accent colors.' },
  { icon: <Zap size={22} />, title: 'Live preview', text: 'Every change updates the resume instantly. Drafts save locally in your browser.' },
  { icon: <Target size={22} />, title: 'Job keyword match', text: 'Paste a job description and see which skills and phrases to emphasize.' },
  { icon: <LockKeyhole size={22} />, title: 'Private by default', text: 'No forced signup. Your content stays on this device until you export.' },
];

const STEPS = [
  { n: '01', title: 'Pick a template', text: 'Browse Classic, ATS, Corporate, Modern, and Creative designs. Apply with one click.' },
  { n: '02', title: 'Fill in your story', text: 'Use the step-by-step builder for personal details, experience, education, and skills.' },
  { n: '03', title: 'Download your PDF', text: 'Preview live, then export a clean professional PDF — free, supported by ads.' },
];

function Typewriter() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const full = TYPING_WORDS[wordIndex];
    const speed = deleting ? 45 : 90;
    const pause = 1400;

    if (!deleting && text === full) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && text === '') {
      setDeleting(false);
      setWordIndex((i) => (i + 1) % TYPING_WORDS.length);
      return undefined;
    }

    const t = setTimeout(() => {
      setText((prev) =>
        deleting ? full.slice(0, prev.length - 1) : full.slice(0, prev.length + 1)
      );
    }, speed);
    return () => clearTimeout(t);
  }, [text, deleting, wordIndex]);

  return (
    <span className="typewriter-word">
      {text}
      <span className="type-cursor" aria-hidden="true" />
    </span>
  );
}

export default function Home({ cv, onNavigate, onApplyTemplate }) {
  const featured = templates.slice(0, 8);

  return (
    <main className="home-page home-rio">
      <section className="hero-rio">
        <div className="container hero-rio-grid">
          <div className="hero-rio-copy">
            <div className="hero-badge">
              <Sparkles size={14} />
              CVora by Suraj · Free AI resume studio
            </div>
            <h1>
              Create a resume that
              <br />
              gets you <Typewriter />
            </h1>
            <p className="hero-lead">
              Field-tested templates, AI writing tools, and a clean live editor.
              Build in minutes — download a polished PDF for free.
            </p>
            <div className="hero-cta-row">
              <button type="button" className="btn btn-primary btn-large" onClick={() => onNavigate('editor')}>
                Create my resume <ArrowRight size={18} />
              </button>
              <button type="button" className="btn btn-outline btn-large" onClick={() => onNavigate('templates')}>
                <LayoutTemplate size={17} /> Browse templates
              </button>
            </div>
            <div className="hero-trust-row">
              <div className="trust-avatars">
                <span>S</span><span>A</span><span>M</span><span>+</span>
              </div>
              <div className="trust-text">
                <strong>Trusted by ambitious professionals</strong>
                <small>Free forever · Local privacy · Built by Suraj Vishwakarma</small>
              </div>
            </div>
          </div>

           <div className="hero-art">
            <div className="art-backdrop" />
            <div className="floating-tag tag-top">
              <span>
                <Sparkles size={15} />
              </span>{" "}
              Smart writing tools
            </div>
            <div className="hero-resume-card">
              <div className="resume-window-bar">
                <i />
                <i />
                <i />
                <span>LIVE PREVIEW</span>
              </div>
              <ResumePreview cv={cv} compact />
            </div>
            <div className="floating-tag tag-score">
              <span className="score-ring">✓</span>
              <div>
                <strong>ATS-friendly</strong>
                <small>Clean & readable</small>
              </div>
            </div>
            <div className="floating-tag tag-pdf">
              <FileText size={18} />
              <div>
                <strong>PDF ready</strong>
                <small>Export in a click</small>
              </div>
            </div>
          </div>
          </div>
      </section>

      <section className="proof-strip">
        <div className="container proof-inner">
          {STATS.map((s) => (
            <div className="proof-item" key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="container ad-band">
        <AdSlot size="leaderboard" label="Sponsored" />
      </div>

      <section className="section templates-section">
        <div className="container">
          <div className="section-heading center">
            <div className="eyebrow">TESTED RESUME TEMPLATES</div>
            <h2>
              Designs recruiters
              <span className="gradient-text"> actually like</span>
            </h2>
            <p className="section-subtitle">
              Classic, ATS, corporate, modern, and creative layouts — apply free and export PDF.
            </p>
          </div>

          <div className="rio-template-grid">
            {featured.map((t, i) => (
              <button
                key={t.id}
                type="button"
                className="rio-template-card"
                onClick={() => onApplyTemplate(t)}
              >
                {i === 0 && <span className="rio-badge popular">Most popular</span>}
                {i === 1 && <span className="rio-badge rec">Recommended</span>}
                {i === 2 && <span className="rio-badge neu">New</span>}
                <div className="rio-thumb" style={{ '--accent': t.color }}>
                  <TemplateThumb layout={t.layout} color={t.color} />
                </div>
                <div className="rio-meta">
                  <strong>{t.name}</strong>
                  <span>{t.type}</span>
                </div>
                <span className="rio-use">
                  Use this template <ArrowRight size={14} />
                </span>
              </button>
            ))}
          </div>

          <div className="section-cta-center">
            <button type="button" className="btn btn-primary" onClick={() => onNavigate('templates')}>
              View all 120+ templates <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="section features-section">
        <div className="container">
          <div className="section-heading center">
            <div className="eyebrow">WHY CVORA</div>
            <h2>
              Everything you need to
              <span className="gradient-text"> stand out</span>
            </h2>
          </div>
          <div className="feature-grid-rio">
            {FEATURES.map((f) => (
              <article className="feature-card-rio" key={f.title}>
                <div className="feature-icon-rio">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section steps-section">
        <div className="container">
          <div className="section-heading center">
            <div className="eyebrow">HOW IT WORKS</div>
            <h2>
              Three steps to a
              <span className="gradient-text"> job-ready resume</span>
            </h2>
          </div>
          <div className="steps-row">
            {STEPS.map((s) => (
              <div className="step-card" key={s.n}>
                <span className="step-n">{s.n}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="container ad-band">
        <AdSlot size="rectangle" label="Sponsored" className="ad-center" />
      </div>

      <section className="cta-band">
        <div className="container cta-band-inner">
          <div>
            <h2>Ready to build your resume?</h2>
            <p>
              Free templates, AI helpers, and PDF export. <strong>CVora by Suraj Vishwakarma</strong> ·{' '}
              <a href="mailto:suraj.infotechsolution@gmail.com">suraj.infotechsolution@gmail.com</a>
            </p>
          </div>
          <button type="button" className="btn btn-primary btn-large" onClick={() => onNavigate('editor')}>
            Create my resume <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </main>
  );
}
