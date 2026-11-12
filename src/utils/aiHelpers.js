export function makeSummary(cv) {
  const skills = (cv.skills || '')
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 4);
  const years = cv.experience?.length
    ? `${cv.experience.length * 2}+ years`
    : 'several years';
  return `${cv.role || 'Professional'} with ${years} of experience. Strong in ${
    skills.join(', ') || 'core domain skills'
  }. Proven track record of delivering measurable impact and collaborating across teams.`;
}

export function improveBullet(text) {
  if (!text?.trim()) {
    return 'Delivered measurable results by improving process efficiency and stakeholder alignment.';
  }
  let t = text.trim();
  if (!/^[A-Z]/.test(t)) t = t.charAt(0).toUpperCase() + t.slice(1);
  if (!/[.!?]$/.test(t)) t += '.';
  if (!/\d|%|increase|improve|reduce|led|owned|launched|delivered/i.test(t)) {
    t = t.replace(/\.$/, '') + ', resulting in clearer outcomes and stronger team delivery.';
  }
  return t;
}

export function atsScan(cv, jobText = '') {
  const text = [
    cv.summary,
    cv.skills,
    ...(cv.experience || []).map((e) => `${e.role} ${e.description}`),
    ...(cv.projects || []).map((p) => `${p.name} ${p.detail}`),
  ]
    .join(' ')
    .toLowerCase();

  const jobWords = (jobText || '')
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3);

  const uniqueJob = [...new Set(jobWords)].slice(0, 40);
  const matched = uniqueJob.filter((w) => text.includes(w));
  const missing = uniqueJob.filter((w) => !text.includes(w)).slice(0, 12);
  const score = uniqueJob.length
    ? Math.min(98, Math.round((matched.length / uniqueJob.length) * 100))
    : Math.min(92, 55 + (cv.skills?.split(',').length || 0) * 3);

  return { score, matched: matched.slice(0, 12), missing };
}

export function buildCoverLetter(cv, role, company) {
  return `Dear Hiring Manager,

I am writing to express my interest in the ${role || cv.role || 'open position'} role at ${
    company || 'your company'
  }. With experience as a ${cv.role} and a track record of delivering clear results, I am confident I can contribute quickly.

${cv.summary || ''}

I would welcome the opportunity to discuss how my background aligns with your needs.

Sincerely,
${cv.name}`;
}
