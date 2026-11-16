import React from 'react';
import PageHero from '../components/ui/PageHero';

const EMAIL = 'suraj.infotechsolution@gmail.com';

export default function Privacy() {
  return (
    <main className="legal-page">
      <PageHero eyebrow="CVORA · LEGAL" title="Privacy Policy">
        <p>How CVora handles your information, cookies and advertising.</p>
        <small>Last updated: 16 November 2026</small>
      </PageHero>
      <div className="container legal-layout">
        <aside className="legal-toc">
          <strong>On this page</strong>
          <a href="#collect">Information we handle</a><a href="#local">Resume data</a><a href="#cookies">Cookies</a>
          <a href="#ads">Google AdSense</a><a href="#rights">Your choices</a><a href="#children">Children</a><a href="#contact">Contact</a>
        </aside>
        <article className="legal-content">
          <section id="collect"><h2>1. Information we handle</h2>
            <p>CVora is a browser-based resume builder. You can use it without creating an account. We do not ask for passwords or payment details. If you email us, we receive your email address and message so that we can reply.</p></section>
          <section id="local"><h2>2. Your resume data</h2>
            <p>The details you type into the editor (name, contact information, work history and so on) are saved in your own browser using local storage so you do not lose your work. This data is not sent to our servers. Clearing your browser data removes it, so please download a PDF copy of anything important.</p></section>
          <section id="cookies"><h2>3. Cookies and similar technologies</h2>
            <p>CVora itself uses only essential browser storage to remember your resume draft. Third parties, including Google, may use cookies or similar technologies when they show advertising on our pages, as described below.</p></section>
          <section id="ads"><h2>4. Advertising — Google AdSense</h2>
            <p>We use Google AdSense to display ads that keep CVora free. Google and its partners may use cookies, including the DoubleClick cookie, to serve ads based on your visits to this and other websites. Google's use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the internet.</p>
            <p>You can opt out of personalised advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">Google Ads Settings</a>, or learn more at <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">How Google uses information from sites that use its services</a>. You can also visit <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">aboutads.info</a> to opt out of some third-party vendors' use of cookies for personalised advertising. Where required by law, we show a consent message for the European Economic Area, the UK and Switzerland.</p></section>
          <section id="rights"><h2>5. Your choices</h2>
            <p>You can clear local data at any time through your browser settings, block cookies in your browser, or use ad-blocking and privacy tools. Depending on where you live, you may have rights to access, correct or delete personal data we hold. Because resume content stays in your browser, we generally hold only the emails you send us.</p></section>
          <section id="children"><h2>6. Children</h2>
            <p>CVora is intended for people who are old enough to work or apply for study or work. We do not knowingly collect personal information from children under 13.</p></section>
          <section id="contact"><h2>7. Contact</h2>
            <p>Questions about this policy? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a>. We may update this policy from time to time and will change the date above when we do.</p></section>
        </article>
      </div>
    </main>
  );
}
