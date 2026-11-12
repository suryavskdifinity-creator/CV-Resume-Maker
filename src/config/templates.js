/**
 * CVora template library — inspired by popular gallery patterns
 * (Classic, ATS, Corporate, Modern, Creative…) with original layouts & colors.
 * Free PDF + Google Ads (no paywall).
 */

export const ACCENTS = [
  '#0f766e', '#1d4ed8', '#b45309', '#7c3aed', '#be123c', '#0369a1',
  '#15803d', '#c2410c', '#4338ca', '#0e7490', '#a21caf', '#334155',
  '#047857', '#1e40af', '#9a3412', '#6d28d9', '#9f1239', '#155e75',
  '#166534', '#1e3a8a', '#854d0e', '#5b21b6', '#881337', '#0f172a',
];

/** Structural layouts rendered by ResumePreview */
export const BASE_LAYOUTS = [
  { id: 'classic', label: 'Classic', desc: 'Single-column, robust career history' },
  { id: 'sidebar', label: 'Sidebar', desc: 'Two-column with bold left rail' },
  { id: 'header', label: 'Header', desc: 'Strong top band and clear hierarchy' },
  { id: 'timeline', label: 'Timeline', desc: 'Corporate timeline for experience' },
  { id: 'ats', label: 'ATS', desc: 'Maximum scanner-friendly simplicity' },
  { id: 'modern', label: 'Modern', desc: 'Tech-inspired, skill-forward' },
  { id: 'minimal', label: 'Minimal', desc: 'Airy centered typography' },
  { id: 'executive', label: 'Executive', desc: 'Dense senior leadership format' },
];

export const CATEGORIES = [
  'All',
  'Professional',
  'ATS Friendly',
  'Modern',
  'Creative',
  'Simple',
  'Corporate',
  'Minimalist',
  'Two Column',
];

/**
 * Named templates similar in *role* to popular galleries,
 * with original CVora structure + unique color themes.
 */
const NAMED = [
  // Professional / Classic
  { name: 'Classic', type: 'Professional', layout: 'classic', color: '#1e3a8a', desc: 'Classically structured for a robust career history.' },
  { name: 'Traditional', type: 'Professional', layout: 'classic', color: '#334155', desc: 'Full-page traditional sections, highly readable.' },
  { name: 'Professional', type: 'Professional', layout: 'header', color: '#0f766e', desc: 'Organized structure with a touch of personality.' },
  { name: 'Corporate', type: 'Corporate', layout: 'timeline', color: '#0f172a', desc: 'Elegant timeline structure for corporate roles.' },
  { name: 'Authority', type: 'Corporate', layout: 'executive', color: '#1e293b', desc: 'Bold hierarchy when you need to impress.' },
  { name: 'Polished', type: 'Professional', layout: 'header', color: '#0e7490', desc: 'Blend of charm, readability and elegance.' },
  { name: 'Essential', type: 'Simple', layout: 'classic', color: '#475569', desc: 'Fresh and functional balance.' },
  { name: 'Harmonized', type: 'Professional', layout: 'classic', color: '#115e59', desc: 'Streamlined professional with a human touch.' },

  // ATS
  { name: 'Prime ATS', type: 'ATS Friendly', layout: 'ats', color: '#1e40af', desc: 'Streamlined for maximum ATS compatibility.' },
  { name: 'Pure ATS', type: 'ATS Friendly', layout: 'ats', color: '#334155', desc: 'Ultra-clean single column for scanners.' },
  { name: 'Specialist ATS', type: 'ATS Friendly', layout: 'ats', color: '#0f766e', desc: 'Skills-forward ATS-optimized layout.' },
  { name: 'Simple ATS', type: 'ATS Friendly', layout: 'ats', color: '#475569', desc: 'Clean modern design, easy for ATS to read.' },
  { name: 'Precision ATS', type: 'ATS Friendly', layout: 'ats', color: '#1d4ed8', desc: 'Highlighted skills section, ATS-ready.' },
  { name: 'Header ATS', type: 'ATS Friendly', layout: 'header', color: '#0369a1', desc: 'Dedicated achievements focus, ATS-safe.' },
  { name: 'Two Column ATS', type: 'Two Column', layout: 'sidebar', color: '#1e3a8a', desc: 'Simple two-tone, easy to scan.' },
  { name: 'Momentum ATS', type: 'ATS Friendly', layout: 'ats', color: '#0f172a', desc: 'Fast-scan layout for high-volume applications.' },

  // Modern / Two column
  { name: 'Clean', type: 'Modern', layout: 'modern', color: '#0d9488', desc: 'Bold, clean formatting with modern spacing.' },
  { name: 'Clear', type: 'Two Column', layout: 'sidebar', color: '#0369a1', desc: 'Striking header, professional two-column body.' },
  { name: 'Balanced', type: 'Modern', layout: 'sidebar', color: '#7c3aed', desc: 'Eye-catching contrast, modern structure.' },
  { name: 'Defined', type: 'Modern', layout: 'modern', color: '#4f46e5', desc: 'Web-inspired layout for achievements.' },
  { name: 'Modern', type: 'Modern', layout: 'modern', color: '#0891b2', desc: 'Tech-inspired, skill-point visual hierarchy.' },
  { name: 'Industrial', type: 'Minimalist', layout: 'minimal', color: '#57534e', desc: 'Modern minimalist with graceful clarity.' },
  { name: 'Nordic', type: 'Minimalist', layout: 'minimal', color: '#0f766e', desc: 'Cool, airy Nordic-inspired simplicity.' },
  { name: 'Summit', type: 'Modern', layout: 'header', color: '#0e7490', desc: 'Confident header band for rising professionals.' },

  // Creative (still professional, not wild)
  { name: 'Vivid', type: 'Creative', layout: 'header', color: '#c2410c', desc: 'Powerful modern template with bold section highlights.' },
  { name: 'Creative', type: 'Creative', layout: 'sidebar', color: '#a21caf', desc: 'Showcase expertise with refined artistic accents.' },
  { name: 'Visionary', type: 'Creative', layout: 'modern', color: '#7c3aed', desc: 'Fluid energy with style for creative fields.' },
  { name: 'Color Splash', type: 'Creative', layout: 'header', color: '#e11d48', desc: 'Strong accent color with professional restraint.' },
  { name: 'Pastel', type: 'Creative', layout: 'minimal', color: '#db2777', desc: 'Soft accent, open whitespace, excellent readability.' },
  { name: 'Ember', type: 'Creative', layout: 'sidebar', color: '#ea580c', desc: 'Warm accent sidebar for marketing & design.' },
  { name: 'Aurora', type: 'Creative', layout: 'header', color: '#8b5cf6', desc: 'Soft violet header for standout creative roles.' },
  { name: 'Coral', type: 'Creative', layout: 'sidebar', color: '#f43f5e', desc: 'Warm coral rail for people-facing roles.' },

  // Simple / Minimalist
  { name: 'Minimalist', type: 'Minimalist', layout: 'minimal', color: '#64748b', desc: 'Clean orderly structure with stylish minimalism.' },
  { name: 'Simple', type: 'Simple', layout: 'classic', color: '#64748b', desc: 'No-fuss single column for any industry.' },
  { name: 'Mono', type: 'Simple', layout: 'ats', color: '#292524', desc: 'Monochrome focus on content only.' },
  { name: 'Quiet', type: 'Minimalist', layout: 'minimal', color: '#57534e', desc: 'Understated elegance, maximum whitespace.' },
  { name: 'Focus', type: 'Simple', layout: 'classic', color: '#1e40af', desc: 'Content-first with a single strong accent.' },
  { name: 'Linear', type: 'Simple', layout: 'timeline', color: '#0f766e', desc: 'Straight timeline flow for clear progression.' },
  { name: 'Bare', type: 'Minimalist', layout: 'ats', color: '#78716c', desc: 'Ultra-light chrome for pure readability.' },
  { name: 'Slate', type: 'Simple', layout: 'classic', color: '#475569', desc: 'Neutral slate professional default.' },

  // More named variants for volume + uniqueness
  { name: 'Executive', type: 'Corporate', layout: 'executive', color: '#0f172a', desc: 'Streamlined multi-zone structure for seniors.' },
  { name: 'Statement', type: 'Creative', layout: 'header', color: '#4c1d95', desc: 'Electric accent header with minimalist body.' },
  { name: 'Elegant', type: 'Professional', layout: 'sidebar', color: '#9f1239', desc: 'Friendly two-column with refined type.' },
  { name: 'Bold', type: 'Modern', layout: 'header', color: '#b91c1c', desc: 'Strong name treatment, minimalist outline.' },
  { name: 'Half Tone', type: 'Creative', layout: 'sidebar', color: '#0369a1', desc: 'Personal story emphasis with classic structure.' },
  { name: 'Calligraphic', type: 'Creative', layout: 'minimal', color: '#7c2d12', desc: 'Eye-catching titles, balanced columns.' },
  { name: 'Academic', type: 'Professional', layout: 'classic', color: '#1e3a5f', desc: 'Education-forward classic academic layout.' },
  { name: 'Mercer', type: 'Corporate', layout: 'timeline', color: '#1e293b', desc: 'Consulting-ready timeline and metrics focus.' },
];

function expandTemplates() {
  const list = [];
  let idx = 0;

  // Base named set
  for (const t of NAMED) {
    list.push({
      id: `${t.layout}-${t.name.toLowerCase().replace(/\s+/g, '-')}-${idx}`,
      name: t.name,
      type: t.type,
      color: t.color,
      layout: t.layout,
      desc: t.desc,
    });
    idx++;
  }

  // Color variants of each named template to reach 100+
  const extraColors = [
    '#0f766e', '#1d4ed8', '#b45309', '#7c3aed', '#be123c', '#0369a1',
    '#15803d', '#c2410c', '#4338ca', '#0e7490',
  ];
  for (const t of NAMED) {
    for (let c = 0; c < 2; c++) {
      const color = extraColors[(idx + c) % extraColors.length];
      if (color === t.color) continue;
      list.push({
        id: `${t.layout}-${t.name.toLowerCase().replace(/\s+/g, '-')}-v${c}-${idx}`,
        name: `${t.name} ${c === 0 ? 'Teal' : 'Accent'}`,
        type: t.type,
        color,
        layout: t.layout,
        desc: t.desc,
      });
      idx++;
    }
  }

  return list.slice(0, 120);
}

export const templates = expandTemplates();

export const starterSkills = [
  'Communication', 'Problem solving', 'Project management', 'Team leadership',
  'Data analysis', 'Figma', 'Excel', 'Research', 'Python', 'SQL',
];
