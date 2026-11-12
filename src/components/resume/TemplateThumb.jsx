import React from 'react';

/**
 * Realistic mini CV preview — closer to full resume cards (resume.io style).
 */
export default function TemplateThumb({
  layout = 'classic',
  color = '#6366f1',
  name = 'Alex Morgan',
  role = 'Product Designer',
}) {
  const style = { '--t-accent': color };
  const first = (name || 'A').split(' ')[0];

  /* Sidebar / two-column */
  if (layout === 'sidebar') {
    return (
      <div className="tthumb tthumb-rich tthumb-sidebar" style={style}>
        <div className="tt-side">
          <div className="tt-avatar" />
          <div className="tt-side-name">{first}</div>
          <div className="tt-side-role">{role}</div>
          <div className="tt-side-block">
            <b>Contact</b>
            <i /><i /><i />
          </div>
          <div className="tt-side-block">
            <b>Skills</b>
            <span className="tt-chip" /><span className="tt-chip" /><span className="tt-chip short" />
          </div>
        </div>
        <div className="tt-main">
          <div className="tt-sec-label">Profile</div>
          <div className="tt-line" /><div className="tt-line mid" /><div className="tt-line short" />
          <div className="tt-sec-label">Experience</div>
          <div className="tt-job-row"><strong /><em /></div>
          <div className="tt-line" /><div className="tt-line mid" />
          <div className="tt-job-row"><strong /><em /></div>
          <div className="tt-line short" />
          <div className="tt-sec-label">Education</div>
          <div className="tt-line mid" />
        </div>
      </div>
    );
  }

  /* Header / modern with top bar */
  if (layout === 'header' || layout === 'modern') {
    return (
      <div className="tthumb tthumb-rich tthumb-topbar" style={style}>
        <div className="tt-bar" />
        <div className="tt-body">
          <div className="tt-name center">{name}</div>
          <div className="tt-role center">{role}</div>
          <div className="tt-contact-row center-row">
            <i /><i /><i />
          </div>
          <div className="tt-sec-label">Profile</div>
          <div className="tt-line" /><div className="tt-line mid" />
          <div className="tt-sec-label">Experience</div>
          <div className="tt-job-row"><strong /><em /></div>
          <div className="tt-line" /><div className="tt-line short" />
          <div className="tt-job-row"><strong /><em /></div>
          <div className="tt-line mid" />
          <div className="tt-sec-label">Skills</div>
          <div className="tt-skill-row">
            <span /><span /><span /><span className="short" />
          </div>
        </div>
      </div>
    );
  }

  /* Timeline */
  if (layout === 'timeline') {
    return (
      <div className="tthumb tthumb-rich tthumb-standard" style={style}>
        <div className="tt-name">{name}</div>
        <div className="tt-role">{role}</div>
        <div className="tt-contact-row"><i /><i /><i /></div>
        <div className="tt-rule" />
        <div className="tt-sec-label">Experience</div>
        <div className="tt-timeline">
          <div className="tt-tl-item">
            <span className="tt-dot" />
            <div>
              <div className="tt-job-row"><strong /><em /></div>
              <div className="tt-line" /><div className="tt-line mid" />
            </div>
          </div>
          <div className="tt-tl-item">
            <span className="tt-dot" />
            <div>
              <div className="tt-job-row"><strong /><em /></div>
              <div className="tt-line short" />
            </div>
          </div>
        </div>
        <div className="tt-sec-label">Education</div>
        <div className="tt-line mid" />
      </div>
    );
  }

  /* Minimal */
  if (layout === 'minimal') {
    return (
      <div className="tthumb tthumb-rich tthumb-minimal" style={style}>
        <div className="tt-name center large">{name}</div>
        <div className="tt-role center">{role}</div>
        <div className="tt-contact-row center-row"><i /><i /><i /></div>
        <div className="tt-rule thin" />
        <div className="tt-sec-label center-text">Profile</div>
        <div className="tt-line center-block" /><div className="tt-line mid center-block" />
        <div className="tt-sec-label center-text">Experience</div>
        <div className="tt-job-row"><strong /><em /></div>
        <div className="tt-line" /><div className="tt-line short" />
        <div className="tt-sec-label center-text">Skills</div>
        <div className="tt-skill-row center-row">
          <span /><span /><span />
        </div>
      </div>
    );
  }

  /* Executive denser */
  if (layout === 'executive') {
    return (
      <div className="tthumb tthumb-rich tthumb-executive" style={style}>
        <div className="tt-exec-head">
          <div className="tt-name">{name}</div>
          <div className="tt-role">{role}</div>
          <div className="tt-contact-row"><i /><i /><i /></div>
        </div>
        <div className="tt-exec-rule" />
        <div className="tt-exec-row">
          <div className="tt-sec small">Summary</div>
          <div className="tt-lines-tight">
            <div className="tt-line" /><div className="tt-line mid" />
          </div>
        </div>
        <div className="tt-exec-row">
          <div className="tt-sec small">Experience</div>
          <div className="tt-lines-tight">
            <div className="tt-job-row"><strong /><em /></div>
            <div className="tt-line" /><div className="tt-line short" />
            <div className="tt-job-row"><strong /><em /></div>
            <div className="tt-line mid" />
          </div>
        </div>
        <div className="tt-exec-row">
          <div className="tt-sec small">Education</div>
          <div className="tt-lines-tight">
            <div className="tt-line mid" />
          </div>
        </div>
      </div>
    );
  }

  /* classic + ats default */
  return (
    <div className="tthumb tthumb-rich tthumb-standard" style={style}>
      <div className="tt-name">{name}</div>
      <div className="tt-role">{role}</div>
      <div className="tt-contact-row"><i /><i /><i /></div>
      <div className="tt-rule" />
      <div className="tt-sec-label">Professional Summary</div>
      <div className="tt-line" /><div className="tt-line mid" /><div className="tt-line short" />
      <div className="tt-sec-label">Experience</div>
      <div className="tt-job-row"><strong /><em /></div>
      <div className="tt-line" /><div className="tt-line mid" />
      <div className="tt-job-row"><strong /><em /></div>
      <div className="tt-line short" />
      <div className="tt-sec-label">Education</div>
      <div className="tt-job-row"><strong /><em /></div>
      <div className="tt-line mid" />
      <div className="tt-sec-label">Skills</div>
      <div className="tt-skill-row">
        <span /><span /><span /><span className="short" />
      </div>
    </div>
  );
}
