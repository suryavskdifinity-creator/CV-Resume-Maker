import React, { useLayoutEffect, useRef, useState } from 'react';

const PAPER_W = 794; // A4 @ 96dpi (210mm)

/**
 * Fits a fixed-width A4 resume into whatever width its parent gives it.
 * Measures the container (ResizeObserver) so it is exact on every phone,
 * tablet and desktop — no hard-coded scale values or breakpoints.
 *
 * props:
 *  - maxHeight: crop the visible page to this height (px, in *scaled* units) – used for cards
 *  - fit: 'width' (default) scales to container width
 *  - maxScale: never upscale beyond this (default 1)
 */
export default function ScaledPaper({ children, maxHeight, maxScale = 1, className = '' }) {
  const outer = useRef(null);
  const inner = useRef(null);
  const [scale, setScale] = useState(0.4);
  const [innerH, setInnerH] = useState(1123);

  useLayoutEffect(() => {
    const el = outer.current;
    const inn = inner.current;
    if (!el || !inn) return undefined;
    const measure = () => {
      const w = el.clientWidth || PAPER_W;
      setScale(Math.min(maxScale, w / PAPER_W));
      setInnerH(inn.offsetHeight || 1123);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    ro.observe(inn);
    return () => ro.disconnect();
  }, [maxScale]);

  const h = innerH * scale;
  return (
    <div
      ref={outer}
      className={`scaled-paper ${className}`}
      style={{ height: maxHeight ? Math.min(h, maxHeight) : h }}
    >
      <div
        ref={inner}
        className="scaled-paper-inner"
        style={{ width: PAPER_W, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}
