import React from 'react';
import { Mail, Sparkles } from 'lucide-react';

export default function Footer({ onNavigate }) {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="container footer-grid footer-grid-wide">
        <div className="footer-brand">
          <div className="brand-mark">
            <Sparkles size={16} />
          </div>
          <div>
            <strong>CVora</strong>
            <span>by Suraj Vishwakarma</span>
          </div>
          <p>
            Free AI resume studio. Build ATS-friendly CVs with 120+ templates.
            No watermark. Local privacy. Supported by Google Ads.
          </p>
          <a className="footer-email" href="mailto:suraj.infotechsolution@gmail.com">
            <Mail size={14} /> suraj.infotechsolution@gmail.com
          </a>
        </div>

        <div className="footer-col">
          <h4>Resume</h4>
          <button type="button" onClick={() => onNavigate('editor')}>AI Resume Builder</button>
          <button type="button" onClick={() => onNavigate('templates')}>Resume Templates</button>
          <button type="button" onClick={() => onNavigate('tools')}>AI Writing Tools</button>
          <button type="button" onClick={() => onNavigate('editor')}>Download PDF</button>
        </div>

        <div className="footer-col">
          <h4>Job seekers</h4>
          <button type="button" onClick={() => onNavigate('templates')}>Browse designs</button>
          <button type="button" onClick={() => onNavigate('tools')}>Keyword match</button>
          <button type="button" onClick={() => onNavigate('home')}>How it works</button>
          <a href="mailto:suraj.infotechsolution@gmail.com">Career questions</a>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <span>CVora by Suraj</span>
          <span>Suraj Vishwakarma</span>
          <a href="mailto:suraj.infotechsolution@gmail.com">Partnerships</a>
          <button type="button" onClick={() => onNavigate('terms')}>Terms of use</button>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <a href="mailto:suraj.infotechsolution@gmail.com">Contact us</a>
          <a href="mailto:suraj.infotechsolution@gmail.com">Report a bug</a>
          <button type="button" onClick={() => onNavigate('terms')}>Privacy</button>
          <span>Free · Ad-supported</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <p>© {year} CVora by Suraj Vishwakarma · All rights reserved.</p>
        <a href="mailto:suraj.infotechsolution@gmail.com">suraj.infotechsolution@gmail.com</a>
      </div>
    </footer>
  );
}
