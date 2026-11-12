import React from 'react';
import { ShieldCheck, Sparkles } from 'lucide-react';

export default function Topbar() {
  return (
    <div className="topbar">
      <div className="container topbar-inner">
        <span>
          <ShieldCheck size={14} /> Free forever · No watermark · Local save
        </span>
        <span className="topbar-right">
          <Sparkles size={13} /> CVora by Suraj Vishwakarma · AI Resume Studio
        </span>
      </div>
    </div>
  );
}
