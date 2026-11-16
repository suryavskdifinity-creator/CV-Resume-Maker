import React from 'react';
import { ShieldCheck, Zap, Heart } from 'lucide-react';
import PageHero from '../components/ui/PageHero';

export default function About({ onNavigate }) {
  return (
    <main className="legal-page">
      <PageHero eyebrow="ABOUT CVORA" title="A free resume studio, built by Suraj Vishwakarma">
        <p>CVora helps job seekers create a professional, ATS-friendly resume in minutes — without accounts, watermarks or paywalls.</p>
      </PageHero>
      <div className="container about-body">
        <div className="about-cards">
          <div className="aside-card"><Zap size={22} /><h3>Fast</h3><p>Pick a template, fill in a guided form and watch the live preview update as you type.</p></div>
          <div className="aside-card"><ShieldCheck size={22} /><h3>Private</h3><p>Your resume is stored in your browser. We do not need your account or upload your data.</p></div>
          <div className="aside-card"><Heart size={22} /><h3>Free</h3><p>Every template and the PDF download are free. The site is supported by advertising.</p></div>
        </div>
        <h2>Why we built it</h2>
        <p>Many resume builders let you design a document and then ask for payment at the download step. CVora is built on the opposite idea: a good resume should not cost money. We maintain a growing library of templates — from strict ATS layouts to modern creative designs — and publish practical guides so you can write a stronger resume.</p>
        <p><button type="button" className="btn btn-primary" onClick={() => onNavigate('templates')}>Browse templates</button> <button type="button" className="btn btn-outline" onClick={() => onNavigate('blog')}>Read the guides</button></p>
      </div>
    </main>
  );
}
