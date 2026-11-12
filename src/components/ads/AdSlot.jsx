import React, { useEffect, useRef } from 'react';
import { adsConfig, canShowAds, hasSlot, getSlot } from '../../config/ads';

/**
 * Ad unit:
 * - With slot ID → real AdSense <ins> + push (no TagError)
 * - Client only → branded placeholder (Auto ads still run from index.html script)
 */
export default function AdSlot({
  label = 'Advertisement',
  size = 'rectangle',
  className = '',
}) {
  const ref = useRef(null);
  const pushed = useRef(false);

  const live = hasSlot(size);

  useEffect(() => {
    if (!live || !ref.current || pushed.current) return;
    try {
      const w = window;
      w.adsbygoogle = w.adsbygoogle || [];
      w.adsbygoogle.push({});
      pushed.current = true;
    } catch {
      /* ignore */
    }
  }, [live]);

  if (!adsConfig.enabled || !adsConfig.client) return null;

  const sizeClass =
    size === 'leaderboard'
      ? 'ad-leaderboard'
      : size === 'skyscraper'
      ? 'ad-skyscraper'
      : size === 'mobile'
      ? 'ad-mobile'
      : 'ad-rectangle';

  if (live) {
    return (
      <div className={`ad-slot ad-live ${sizeClass} ${className}`}>
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            minHeight:
              size === 'leaderboard' ? 90 : size === 'skyscraper' ? 600 : 250,
          }}
          data-ad-client={adsConfig.client}
          data-ad-slot={getSlot(size)}
          data-ad-format="auto"
          data-full-width-responsive="true"
          ref={ref}
        />
      </div>
    );
  }

  // Auto ads are injected site-wide. Do not render fake ad boxes without a real slot ID.
  return null;
}
