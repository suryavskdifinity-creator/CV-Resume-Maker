import React from 'react';

const splitLines = (value = '') => String(value).split(/\n|•/).map((s) => s.trim()).filter(Boolean);

export default function ResumePreview({ cv = {}, compact = false }) {
  const skills = (cv.skills || '').split(',').map((s) => s.trim()).filter(Boolean);
  const layout = cv.layout || 'classic';
  const monogram = (cv.name || 'YN').split(/\s+/).map((x) => x[0]).join('').slice(0, 2).toUpperCase();
  const contacts = [
    cv.email && `✉ ${cv.email}`,
    cv.phone && `☎ ${cv.phone}`,
    cv.location && `⌖ ${cv.location}`,
    cv.website && `↗ ${cv.website}`,
    cv.linkedin && `in ${cv.linkedin}`,
  ].filter(Boolean);

  const section = (title, content, extra = '') => content ? (
    <section className={`resume-section ${extra}`}>
      <h3>{title}</h3>
      {content}
    </section>
  ) : null;

  const summary = section('Profile', <p>{cv.summary || 'Results-driven professional with a strong record of delivering measurable outcomes, collaborating across teams and solving complex business challenges.'}</p>, 'summary-section');

  const experience = (cv.experience?.length ? cv.experience : [
    { role: 'Senior Product Designer', company: 'Northstar Digital', dates: '2022 — Present', description: 'Led end-to-end product design for customer-facing platforms, improving task completion and customer satisfaction through research-led experiences.' },
    { role: 'Product Designer', company: 'Brightside Studio', dates: '2019 — 2022', description: 'Partnered with product and engineering teams to launch accessible digital products and streamline design workflows.' },
  ]).map((e, i) => (
    <div className={`resume-entry ${layout === 'timeline' ? 'timeline-entry' : ''}`} key={i}>
      {layout === 'timeline' && <span className="tl-dot" />}
      <div className="entry-top"><strong>{e.role || 'Position title'}</strong><time>{e.dates || '2022 — Present'}</time></div>
      <div className="entry-sub">{e.company || 'Company name'}</div>
      {splitLines(e.description || '').length > 1 ? (
        <ul className="resume-bullets">{splitLines(e.description).map((line, j) => <li key={j}>{line}</li>)}</ul>
      ) : <p>{e.description || 'Describe your contribution, the tools you used and the measurable impact you made.'}</p>}
    </div>
  ));

  const education = (cv.education?.length ? cv.education : [
    { degree: 'B.A. in Business & Management', school: 'University of Northbridge', dates: '2015 — 2019', detail: 'Graduated with distinction' },
  ]).map((e, i) => (
    <div className="resume-entry" key={i}>
      <div className="entry-top"><strong>{e.degree || 'Degree / qualification'}</strong><time>{e.dates || '2015 — 2019'}</time></div>
      <div className="entry-sub">{e.school || 'University / institution'}</div>
      {e.detail && <p>{e.detail}</p>}
    </div>
  ));

  const skillContent = skills.length ? <div className={layout === 'modern' || layout === 'sidebar' ? 'skill-tags' : 'skill-columns'}>
    {skills.map((s) => <span className="skill-tag" key={s}>{s}</span>)}
  </div> : <div className="skill-tags">{['Communication', 'Leadership', 'Project Management', 'Data Analysis', 'Problem Solving', 'Strategic Planning'].map((s) => <span className="skill-tag" key={s}>{s}</span>)}</div>;

  const projects = (cv.projects || []).filter((x) => x.name || x.detail).map((x, i) => (
    <div className="resume-entry" key={i}><div className="entry-top"><strong>{x.name}</strong></div>{x.detail && <p>{x.detail}</p>}</div>
  ));

  return (
    <article className={`resume-paper layout-${layout} ${compact ? 'compact' : ''}`} style={{ '--accent': cv.accent || '#176b62' }}>
      {layout === 'sidebar' && (
        <aside className="resume-sidebar">
          <div className="rs-avatar">{monogram}</div>
          <div className="rs-side-name">{cv.name || 'Alex Morgan'}</div>
          <div className="rs-side-role">{cv.role || 'Product Designer'}</div>
          <div className="rs-side-rule" />
          <h4>Contact</h4>
          <div className="rs-contact">{contacts.map((c) => <span key={c}>{c}</span>)}</div>
          <h4>Core skills</h4>
          <ul className="rs-skill-list">{(skills.length ? skills : ['Communication', 'Leadership', 'Research', 'Strategy']).map((s) => <li key={s}>{s}</li>)}</ul>
          {cv.education?.length > 0 && <><h4>Education</h4><div className="rs-contact">{cv.education.map((e, i) => <span key={i}>{e.degree}<small>{e.school}</small></span>)}</div></>}
        </aside>
      )}
      <div className="resume-main">
        <header className={`resume-header ${['header', 'modern', 'executive'].includes(layout) ? 'has-topbar' : ''} ${['minimal', 'ats'].includes(layout) ? 'is-minimal' : ''}`}>
          {['header', 'modern', 'executive'].includes(layout) && <div className="resume-topbar" />}
          <div className="resume-header-inner">
            <div className="resume-identity">
              <h1>{cv.name || 'Alex Morgan'}</h1>
              <p className="resume-role">{cv.role || 'Product Designer'}</p>
            </div>
            {layout !== 'sidebar' && <div className="resume-contact">{contacts.length ? contacts.map((c) => <span key={c}>{c}</span>) : <><span>✉ alex.morgan@email.com</span><span>☎ +1 555 010 2040</span><span>⌖ New York, NY</span></>}</div>}
          </div>
        </header>
        {summary}
        {section('Professional Experience', experience)}
        {section('Education', education)}
        {layout !== 'sidebar' && section('Skills & Expertise', skillContent)}
        {section('Selected Projects', projects)}
        {cv.certifications?.length > 0 && section('Certifications', <ul className="resume-bullets">{cv.certifications.map((x, i) => <li key={i}>{x}</li>)}</ul>)}
      </div>
    </article>
  );
}
