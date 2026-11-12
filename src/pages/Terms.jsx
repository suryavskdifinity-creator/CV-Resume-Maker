import React from 'react';
import { ShieldCheck, FileText, LockKeyhole, Mail } from 'lucide-react';

export default function Terms() {
  return <main className="legal-page">
    <section className="legal-hero"><div className="container">
      <div className="eyebrow"><FileText size={14}/> CVORA · LEGAL</div>
      <h1>Terms &amp; Conditions</h1>
      <p>Clear, practical information about using CVora AI Resume Studio.</p>
      <small>Last updated: 11 November 2026</small>
    </div></section>
    <div className="container legal-layout">
      <aside className="legal-toc"><strong>On this page</strong>
        <a href="#acceptance">Acceptance</a><a href="#service">The service</a><a href="#content">Your content</a><a href="#privacy">Privacy &amp; cookies</a><a href="#ads">Advertising</a><a href="#disclaimer">Disclaimer</a><a href="#contact">Contact</a>
      </aside>
      <article className="legal-content">
        <section id="acceptance"><h2><ShieldCheck/> 1. Acceptance of these terms</h2><p>By accessing or using CVora, you agree to these Terms &amp; Conditions. If you do not agree, please do not use the service. You must use CVora in compliance with applicable laws and these terms.</p></section>
        <section id="service"><h2><FileText/> 2. The CVora service</h2><p>CVora provides browser-based tools to create, edit, preview and export resumes and related career documents. Features may change as the product is improved. We aim to keep the core resume-building experience available, but do not guarantee uninterrupted or error-free service.</p><p>Resume templates, writing suggestions and automated checks are provided as tools to assist you. They do not guarantee an interview, job offer, ATS pass or employment outcome.</p></section>
        <section id="content"><h2><LockKeyhole/> 3. Your content and responsibilities</h2><p>You retain responsibility for the information you enter, upload or export. You confirm that you have the rights and permissions needed to use that content. You should review every resume carefully before sharing it with an employer.</p><p>Do not submit unlawful, misleading, infringing or confidential information that you are not authorised to use. Keep your own copies of important documents. Unless a feature clearly says otherwise, resume data may be stored locally in your browser; clearing browser storage can remove locally saved data.</p></section>
        <section id="privacy"><h2><LockKeyhole/> 4. Privacy and cookies</h2><p>CVora may use essential browser storage to remember your work and preferences. Where analytics or non-essential cookies are used, your choices should be respected through the consent controls presented on the site. Please avoid entering sensitive personal information that is not necessary for a resume.</p></section>
        <section id="ads"><h2>5. Advertising and third-party services</h2><p>CVora may display advertisements, including Google AdSense ads, to support the service. Ad availability and placement are controlled by the advertising provider and may depend on publisher approval, site eligibility, consent settings and regional requirements. Third-party websites and services have their own terms and privacy practices.</p></section>
        <section id="disclaimer"><h2>6. Disclaimer and limitation</h2><p>The service and its outputs are provided on an “as available” basis. To the extent permitted by law, CVora makes no warranties that generated content is accurate, complete or suitable for a particular application. You are responsible for verifying facts, dates, qualifications and contact details before using an exported document.</p></section>
        <section id="contact"><h2><Mail/> 7. Contact</h2><p>For questions about these terms or the CVora service, contact <a href="mailto:suraj.infotechsolution@gmail.com">suraj.infotechsolution@gmail.com</a>.</p></section>
        <p className="legal-note">These terms are a general product-use notice and are not legal advice. Please obtain jurisdiction-specific legal review before publishing CVora commercially.</p>
      </article>
    </div>
  </main>;
}
