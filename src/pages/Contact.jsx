import React, { useState } from 'react';
import { Mail, Clock, MessageSquare } from 'lucide-react';
import PageHero from '../components/ui/PageHero';

const EMAIL = 'suraj.infotechsolution@gmail.com';

export default function Contact() {
  const [f, setF] = useState({ name: '', email: '', message: '' });
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const send = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`CVora message from ${f.name || 'a visitor'}`);
    const body = encodeURIComponent(`${f.message}\n\n— ${f.name} (${f.email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };
  return (
    <main className="legal-page">
      <PageHero eyebrow="CONTACT" title="Get in touch">
        <p>Feedback, bug reports, partnership ideas or template requests — we read every message.</p>
      </PageHero>
      <div className="container contact-grid">
        <form className="contact-form" onSubmit={send}>
          <label>Your name<input required value={f.name} onChange={set('name')} autoComplete="name" /></label>
          <label>Email<input required type="email" value={f.email} onChange={set('email')} autoComplete="email" /></label>
          <label>Message<textarea required rows={6} value={f.message} onChange={set('message')} /></label>
          <button className="btn btn-primary" type="submit"><Mail size={16} /> Send message</button>
          <small>This opens your email app with the message ready to send.</small>
        </form>
        <aside className="contact-side">
          <div className="aside-card"><Mail size={20} /><h3>Email</h3><a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
          <div className="aside-card"><Clock size={20} /><h3>Response time</h3><p>Usually within 1–2 working days.</p></div>
          <div className="aside-card"><MessageSquare size={20} /><h3>Template requests</h3><p>Tell us your profession and we may build a layout for it.</p></div>
        </aside>
      </div>
    </main>
  );
}
