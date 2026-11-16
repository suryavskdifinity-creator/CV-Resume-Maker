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
            Free AI resume studio. Build ATS-friendly CVs with 150+ templates.
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
          <button type="button" onClick={() => onNavigate('blog')}>Resume guides</button>
          <button type="button" onClick={() => onNavigate('home')}>How it works</button>
          <a href="mailto:suraj.infotechsolution@gmail.com">Career questions</a>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <button type="button" onClick={() => onNavigate('about')}>About CVora</button>
          <button type="button" onClick={() => onNavigate('blog')}>Guides &amp; tips</button>
          <button type="button" onClick={() => onNavigate('terms')}>Terms of use</button>
          <button type="button" onClick={() => onNavigate('privacy')}>Privacy policy</button>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <button type="button" onClick={() => onNavigate('contact')}>Contact us</button>
          <button type="button" onClick={() => onNavigate('contact')}>Report a bug</button>
          <a href="mailto:suraj.infotechsolution@gmail.com">Email us</a>
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
