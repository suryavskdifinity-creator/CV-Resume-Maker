import React, { useMemo, useState } from 'react';
import {
  LayoutTemplate, Download, UserRound, FileText, BriefcaseBusiness,
  GraduationCap, Award, Layers, Palette, Plus, Trash2, Sparkles,
  WandSparkles, Eye, Check, ChevronLeft, ChevronRight, ArrowRight,
} from 'lucide-react';
import Field from '../components/ui/Field';
import AdSlot from '../components/ads/AdSlot';
import ResumePreview from '../components/resume/ResumePreview';
import TemplateThumb from '../components/resume/TemplateThumb';
import { templates, ACCENTS, BASE_LAYOUTS, starterSkills } from '../config/templates';
import { makeSummary, improveBullet } from '../utils/aiHelpers';

const STEPS = [
  { id: 'personal', icon: <UserRound size={16} />, label: 'Personal', hint: 'Name & contact' },
  { id: 'summary', icon: <FileText size={16} />, label: 'Summary', hint: 'Your pitch' },
  { id: 'experience', icon: <BriefcaseBusiness size={16} />, label: 'Experience', hint: 'Work history' },
  { id: 'education', icon: <GraduationCap size={16} />, label: 'Education', hint: 'Schools' },
  { id: 'skills', icon: <Award size={16} />, label: 'Skills', hint: 'Strengths' },
  { id: 'projects', icon: <Layers size={16} />, label: 'Projects', hint: 'Optional' },
  { id: 'design', icon: <Palette size={16} />, label: 'Design', hint: 'Template & color' },
  { id: 'finish', icon: <Check size={16} />, label: 'Finish', hint: 'Preview & PDF' },
];

export default function Editor({
  cv,
  saved,
  onUpdate,
  onUpdateList,
  onAddItem,
  onRemoveItem,
  onNavigate,
  onRequestPdf,
  onToast,
}) {
  const [step, setStep] = useState(0);
  const active = STEPS[step].id;
  const current = templates.find((t) => t.id === cv.template) || templates[0];
  const isLast = step === STEPS.length - 1;
  const isFirst = step === 0;
  const progress = Math.round(((step + 1) / STEPS.length) * 100);

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));
  const goStep = (i) => setStep(i);

  const stepDone = useMemo(() => {
    return {
      personal: Boolean(cv.name && cv.role),
      summary: Boolean(cv.summary?.trim()),
      experience: (cv.experience || []).some((e) => e.role),
      education: (cv.education || []).some((e) => e.degree),
      skills: Boolean(cv.skills?.trim()),
      projects: true,
      design: Boolean(cv.layout && cv.accent),
      finish: true,
    };
  }, [cv]);

  return (
    <main className="editor-page wizard-page">
      {/* Progress header */}
      <div className="wizard-top">
        <div className="container wizard-top-inner">
          <div className="wizard-progress-block">
            <div className="wizard-progress-meta">
              <span className="wizard-step-label">
                Step {step + 1} of {STEPS.length} · {STEPS[step].label}
              </span>
              <span className="save-status">
                <i className={saved ? 'saved' : ''} />
                {saved ? 'Saved locally' : 'Saving…'}
              </span>
            </div>
            <div className="wizard-progress-bar">
              <div className="wizard-progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <div className="wizard-steps-row">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  className={`wizard-step-dot ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}
                  onClick={() => goStep(i)}
                  title={s.label}
                >
                  <span className="dot-icon">{i < step ? <Check size={12} /> : i + 1}</span>
                  <span className="dot-label">{s.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container wizard-layout">
        {/* Form column */}
        <div className="wizard-form-col">
          <div className="wizard-card">
            {active === 'personal' && (
              <div className="form-content">
                <div className="form-panel-head">
                  <h2>Personal details</h2>
                  <p>These appear at the top of your resume. Watch the live preview update as you type.</p>
                </div>
                <div className="field-grid">
                  <Field label="Full name" value={cv.name} onChange={(v) => onUpdate('name', v)} />
                  <Field label="Professional title" value={cv.role} onChange={(v) => onUpdate('role', v)} />
                  <Field label="Email" value={cv.email} onChange={(v) => onUpdate('email', v)} type="email" />
                  <Field label="Phone" value={cv.phone} onChange={(v) => onUpdate('phone', v)} />
                  <Field label="Location" value={cv.location} onChange={(v) => onUpdate('location', v)} />
                  <Field label="Website" value={cv.website} onChange={(v) => onUpdate('website', v)} />
                  <Field
                    label="LinkedIn"
                    value={cv.linkedin}
                    onChange={(v) => onUpdate('linkedin', v)}
                    placeholder="linkedin.com/in/..."
                  />
                </div>
              </div>
            )}

            {active === 'summary' && (
              <div className="form-content">
                <div className="form-panel-head">
                  <h2>Professional summary</h2>
                  <p>2–4 sentences that position you for the role you want.</p>
                </div>
                <Field
                  label="Summary"
                  value={cv.summary}
                  onChange={(v) => onUpdate('summary', v)}
                  type="textarea"
                />
                <button
                  className="btn btn-outline btn-sm ai-btn"
                  type="button"
                  onClick={() => {
                    onUpdate('summary', makeSummary(cv));
                    onToast('Summary drafted');
                  }}
                >
                  <Sparkles size={15} /> Draft with AI
                </button>
              </div>
            )}

            {active === 'experience' && (
              <div className="form-content">
                <div className="form-panel-head">
                  <h2>Work experience</h2>
                  <p>Lead with impact. Quantify results where possible.</p>
                </div>
                {(cv.experience || []).map((e, i) => (
                  <div className="repeat-block" key={i}>
                    <div className="repeat-head">
                      <strong>Role {i + 1}</strong>
                      <button className="icon-btn" type="button" onClick={() => onRemoveItem('experience', i)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="field-grid">
                      <Field label="Title" value={e.role} onChange={(v) => onUpdateList('experience', i, 'role', v)} />
                      <Field label="Company" value={e.company} onChange={(v) => onUpdateList('experience', i, 'company', v)} />
                      <Field
                        label="Dates"
                        value={e.dates}
                        onChange={(v) => onUpdateList('experience', i, 'dates', v)}
                        placeholder="2021 — Present"
                      />
                      <div className="field full">
                        <label>Description</label>
                        <textarea
                          value={e.description || ''}
                          onChange={(ev) => onUpdateList('experience', i, 'description', ev.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                    {i === 0 && (
                      <button
                        className="btn btn-outline btn-sm ai-btn"
                        type="button"
                        onClick={() => {
                          onUpdateList('experience', 0, 'description', improveBullet(cv.experience[0]?.description));
                          onToast('First experience bullet improved');
                        }}
                      >
                        <WandSparkles size={15} /> Improve first bullet
                      </button>
                    )}
                  </div>
                ))}
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() =>
                    onAddItem('experience', { role: '', company: '', dates: '', description: '' })
                  }
                >
                  <Plus size={16} /> Add experience
                </button>
              </div>
            )}

            {active === 'education' && (
              <div className="form-content">
                <div className="form-panel-head">
                  <h2>Education</h2>
                </div>
                {(cv.education || []).map((e, i) => (
                  <div className="repeat-block" key={i}>
                    <div className="repeat-head">
                      <strong>Education {i + 1}</strong>
                      <button className="icon-btn" type="button" onClick={() => onRemoveItem('education', i)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="field-grid">
                      <Field label="Degree" value={e.degree} onChange={(v) => onUpdateList('education', i, 'degree', v)} />
                      <Field label="School" value={e.school} onChange={(v) => onUpdateList('education', i, 'school', v)} />
                      <Field label="Dates" value={e.dates} onChange={(v) => onUpdateList('education', i, 'dates', v)} />
                      <Field
                        label="Detail"
                        value={e.detail}
                        onChange={(v) => onUpdateList('education', i, 'detail', v)}
                        placeholder="Honors, GPA, focus…"
                      />
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() => onAddItem('education', { degree: '', school: '', dates: '', detail: '' })}
                >
                  <Plus size={16} /> Add education
                </button>
              </div>
            )}

            {active === 'skills' && (
              <div className="form-content">
                <div className="form-panel-head">
                  <h2>Skills</h2>
                  <p>Comma-separated list. Put the most relevant first.</p>
                </div>
                <Field
                  label="Skills"
                  value={cv.skills}
                  onChange={(v) => onUpdate('skills', v)}
                  type="textarea"
                  placeholder="Product Design, Figma, Research…"
                />
                <div className="chip-row">
                  {starterSkills.map((s) => (
                    <button
                      key={s}
                      className="chip"
                      type="button"
                      onClick={() => {
                        const cur = (cv.skills || '').split(',').map((x) => x.trim()).filter(Boolean);
                        if (!cur.includes(s)) onUpdate('skills', [...cur, s].join(', '));
                      }}
                    >
                      + {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {active === 'projects' && (
              <div className="form-content">
                <div className="form-panel-head">
                  <h2>Projects</h2>
                  <p>Optional. Highlight 1–3 strong projects.</p>
                </div>
                {(cv.projects || []).map((p, i) => (
                  <div className="repeat-block" key={i}>
                    <div className="repeat-head">
                      <strong>Project {i + 1}</strong>
                      <button className="icon-btn" type="button" onClick={() => onRemoveItem('projects', i)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                    <div className="field-grid">
                      <Field label="Name" value={p.name} onChange={(v) => onUpdateList('projects', i, 'name', v)} />
                      <div className="field full">
                        <label>Detail</label>
                        <textarea
                          value={p.detail || ''}
                          onChange={(ev) => onUpdateList('projects', i, 'detail', ev.target.value)}
                          rows={2}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  className="btn btn-outline"
                  type="button"
                  onClick={() => onAddItem('projects', { name: '', detail: '' })}
                >
                  <Plus size={16} /> Add project
                </button>
              </div>
            )}

            {active === 'design' && (
              <div className="form-content">
                <div className="form-panel-head">
                  <h2>Design & template</h2>
                  <p>
                    Current: <strong>{current?.name || cv.template}</strong> — changes appear instantly in the preview.
                  </p>
                </div>
                <label className="standalone-label">Layout style</label>
                <div className="layout-row" style={{ marginBottom: 16 }}>
                  {BASE_LAYOUTS.map((l) => (
                    <button
                      key={l.id}
                      type="button"
                      className={`layout-chip ${cv.layout === l.id ? 'active' : ''}`}
                      onClick={() => onUpdate('layout', l.id)}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
                <label className="standalone-label">Accent color</label>
                <div className="color-row" style={{ marginBottom: 16 }}>
                  {ACCENTS.slice(0, 16).map((c) => (
                    <button
                      key={c}
                      type="button"
                      aria-label={`Choose ${c}`}
                      className={cv.accent === c ? 'color-selected' : ''}
                      style={{ background: c }}
                      onClick={() => onUpdate('accent', c)}
                    />
                  ))}
                </div>
                <label className="standalone-label">Templates (click to apply)</label>
                <div className="design-options">
                  {templates.filter((t) => t.layout === (cv.layout || 'classic')).slice(0, 12).map((t) => (
                    <button
                      className={`design-option ${cv.template === t.id ? 'chosen' : ''}`}
                      key={t.id}
                      type="button"
                      onClick={() => {
                        onUpdate('template', t.id);
                        onUpdate('accent', t.color);
                        onUpdate('layout', t.layout);
                      }}
                    >
                      <div className="design-thumb" style={{ '--accent': t.color }}>
                        <TemplateThumb layout={t.layout} color={t.color} name="A M" role="Role" />
                      </div>
                      <strong>{t.name}</strong>
                      <small>{t.type}</small>
                      {cv.template === t.id && (
                        <span className="chosen-check">
                          <Check size={12} />
                        </span>
                      )}
                    </button>
                  ))}
                </div>
                <button className="btn btn-outline btn-sm" type="button" onClick={() => onNavigate('templates')}>
                  <LayoutTemplate size={14} /> Browse all 120+ templates
                </button>
              </div>
            )}

            {active === 'finish' && (
              <div className="form-content finish-panel">
                <div className="form-panel-head">
                  <h2>Your resume is ready</h2>
                  <p>Review the live preview, then download a professional PDF.</p>
                </div>
                <div className="finish-checklist">
                  {STEPS.filter((s) => s.id !== 'finish').map((s) => (
                    <div key={s.id} className={`finish-check ${stepDone[s.id] ? 'ok' : ''}`}>
                      <Check size={16} />
                      <span>{s.label}</span>
                      <button type="button" className="linkish" onClick={() => goStep(STEPS.findIndex((x) => x.id === s.id))}>
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
                <div className="finish-actions">
                  <button className="btn btn-primary btn-large" type="button" onClick={onRequestPdf}>
                    <Download size={18} /> Download PDF
                  </button>
                  <p className="finish-note">
                    An ad may appear briefly before download — it keeps CVora free.
                  </p>
                </div>
                <div className="finish-ad">
                  <AdSlot size="rectangle" label="Sponsored" className="ad-center" />
                </div>
              </div>
            )}

            {/* Wizard footer nav */}
            <div className="wizard-nav">
              <button
                className="btn btn-outline"
                type="button"
                onClick={goBack}
                disabled={isFirst}
              >
                <ChevronLeft size={16} /> Back
              </button>
              <div className="wizard-nav-right">
                {!isLast ? (
                  <button className="btn btn-primary" type="button" onClick={goNext}>
                    Next <ChevronRight size={16} />
                  </button>
                ) : (
                  <button className="btn btn-primary" type="button" onClick={onRequestPdf}>
                    <Download size={16} /> Download PDF
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sticky live preview */}
        <aside className="wizard-preview-col">
          <div className="wizard-preview-card">
            <div className="preview-toolbar">
              <span>
                <Eye size={15} /> Live preview
              </span>
              {isLast && (
                <button className="btn btn-primary btn-sm" type="button" onClick={onRequestPdf}>
                  <Download size={14} /> PDF
                </button>
              )}
            </div>
            <div className="preview-canvas">
              <ResumePreview cv={cv} />
            </div>
            <p className="preview-note">Edits update here in real time.</p>
          </div>
        </aside>
      </div>
    </main>
  );
}
