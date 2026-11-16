import React, { useEffect, useRef } from 'react';
import { adsConfig, hasSlot, getSlot } from '../../config/ads';

/**
 * Responsive AdSense unit.
 * - Renders only when a slot ID exists (VITE_AD_SLOT_* or VITE_AD_SLOT_DEFAULT);
 *   Auto ads from the <head> script keep working either way.
 * - Reserves space (no layout shift) and collapses itself if no ad is filled.
 * - Labelled "Advertisement" (AdSense policy: never ask people to click).
 */
export default function AdSlot({ size = 'rectangle', className = '', label = 'Advertisement' }) {
  const ref = useRef(null);
  const pushed = useRef(false);
  const live = hasSlot(size);

  useEffect(() => {
    if (!live || !ref.current || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* ad blocker or script not ready */
    }
  }, [live]);

  if (!live) return null;

  return (
    <aside className={`ad-slot ad-live ad-${size} ${className}`} aria-label="Advertisement">
      <span className="ad-label">{label}</span>
      <ins
        ref={ref}
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adsConfig.client}
        data-ad-slot={getSlot(size)}
        data-ad-format={size === 'infeed' ? 'fluid' : 'auto'}
        data-ad-layout={size === 'infeed' ? 'in-article' : undefined}
        data-full-width-responsive="true"
      />
    </aside>
  );
}
