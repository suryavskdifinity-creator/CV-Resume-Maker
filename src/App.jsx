import React, { useCallback, useEffect, useState } from 'react';
import { Download, X } from 'lucide-react';
import { initialCV } from './data/initialCV';
import { adsConfig, canShowAds } from './config/ads';
import { exportResumePdf } from './utils/exportPdf';
import Topbar from './components/layout/Topbar';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import AdSlot from './components/ads/AdSlot';
import Toast from './components/ui/Toast';
import ResumePreview from './components/resume/ResumePreview';
import Home from './pages/Home';
import Templates from './pages/Templates';
import Editor from './pages/Editor';
import Tools from './pages/Tools';
import Terms from './pages/Terms';

export default function App() {
  const [page, setPage] = useState('home');
  const [cv, setCv] = useState(() => {
    try {
      return { ...initialCV, ...JSON.parse(localStorage.getItem('cvora-data') || '{}') };
    } catch {
      return initialCV;
    }
  });
  const [saved, setSaved] = useState(true);
  const [toast, setToast] = useState('');
  const [showPdfAd, setShowPdfAd] = useState(false);
  const [pdfCountdown, setPdfCountdown] = useState(0);

  useEffect(() => {
    // Google AdSense Auto ads are enabled only when the environment has a publisher ID.
    if (!adsConfig.enabled || !/^ca-pub-\d+$/.test(adsConfig.client)) return;
    const existing = document.querySelector('script[data-cvora-adsense="true"]');
    if (existing) return;
    const script = document.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.dataset.cvoraAdsense = 'true';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(adsConfig.client)}`;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    localStorage.setItem('cvora-data', JSON.stringify(cv));
    setSaved(true);
  }, [cv]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2800);
    return () => clearTimeout(t);
  }, [toast]);

  useEffect(() => {
    if (pdfCountdown <= 0) return;
    const t = setTimeout(() => setPdfCountdown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [pdfCountdown]);

  const go = useCallback((p) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const update = useCallback((key, value) => {
    setSaved(false);
    setCv((prev) => ({ ...prev, [key]: value }));
  }, []);

  const updateList = useCallback((key, index, field, value) => {
    setSaved(false);
    setCv((prev) => {
      const list = [...(prev[key] || [])];
      list[index] = { ...list[index], [field]: value };
      return { ...prev, [key]: list };
    });
  }, []);

  const addItem = useCallback((key, blank) => {
    setSaved(false);
    setCv((prev) => ({ ...prev, [key]: [...(prev[key] || []), blank] }));
  }, []);

  const removeItem = useCallback((key, index) => {
    setSaved(false);
    setCv((prev) => ({
      ...prev,
      [key]: (prev[key] || []).filter((_, i) => i !== index),
    }));
  }, []);

  const applyTemplate = useCallback(
    (t) => {
      update('template', t.id);
      update('accent', t.color);
      update('layout', t.layout);
      setToast(`Template “${t.name}” applied`);
      go('editor');
    },
    [update, go]
  );

  const requestPdf = () => {
    if (!canShowAds()) {
      void doPdfDownload();
      return;
    }
    setShowPdfAd(true);
    setPdfCountdown(adsConfig.pdfCountdown);
  };

  const doPdfDownload = async () => {
    setToast('Preparing PDF…');
    const el = document.getElementById('cv-print-root');
    try {
      const result = await exportResumePdf(el, cv.name);
      if (result.method === 'jspdf') {
        setToast('PDF downloaded');
      } else {
        setToast('Choose “Save as PDF” in the print dialog');
      }
    } catch {
      window.print();
      setToast('Choose “Save as PDF” in the print dialog');
    }
  };

  const confirmPdf = () => {
    setShowPdfAd(false);
    setTimeout(() => {
      void doPdfDownload();
    }, 180);
  };

  return (
    <div className="app-shell">
      <Topbar />
      <Header page={page} onNavigate={go} />

      {page === 'home' && (
        <Home cv={cv} onNavigate={go} onApplyTemplate={applyTemplate} />
      )}
      {page === 'templates' && <Templates onApplyTemplate={applyTemplate} />}
      {page === 'editor' && (
        <Editor
          cv={cv}
          saved={saved}
          onUpdate={update}
          onUpdateList={updateList}
          onAddItem={addItem}
          onRemoveItem={removeItem}
          onNavigate={go}
          onRequestPdf={requestPdf}
          onToast={setToast}
        />
      )}
      {page === 'terms' && <Terms />}
      {page === 'tools' && (
        <Tools
          cv={cv}
          onUpdate={update}
          onUpdateList={updateList}
          onNavigate={go}
          onToast={setToast}
        />
      )}

      <Footer onNavigate={go} />

      {showPdfAd && (
        <div className="modal-overlay pdf-ad-overlay">
          <div className="modal-card pdf-ad-modal" role="dialog" aria-modal="true">
            <h3>Almost ready — free PDF</h3>
            <p className="pdf-ad-copy">
              CVora is free because of ads. Please view this sponsored message, then download your resume.
            </p>
            <div className="pdf-ad-box">
              <AdSlot size="rectangle" label="Sponsored — click if interested" className="ad-center" />
            </div>
            <p className="pdf-ad-note">
              After the timer, your PDF will download. Thank you for supporting free tools.
            </p>
            <div className="modal-actions">
              {pdfCountdown > 0 ? (
                <button className="btn btn-primary" type="button" disabled>
                  Continue in {pdfCountdown}s…
                </button>
              ) : (
                <button className="btn btn-primary" type="button" onClick={confirmPdf}>
                  Download PDF now
                </button>
              )}
              <button className="btn btn-outline" type="button" onClick={() => setShowPdfAd(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Always in DOM for reliable PDF / print */}
      <div id="cv-print-root" className="print-root" aria-hidden="true">
        <ResumePreview cv={cv} />
      </div>
    </div>
  );
}

