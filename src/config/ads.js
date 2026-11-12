const env = import.meta.env;

export const adsConfig = {
  enabled: (env.VITE_ADS_ENABLED ?? 'true') !== 'false',
  client: (env.VITE_ADSENSE_CLIENT || 'ca-pub-7504961737515196').trim(),
  slots: {
    leaderboard: (env.VITE_AD_SLOT_LEADERBOARD || '').trim(),
    rectangle: (env.VITE_AD_SLOT_RECTANGLE || '').trim(),
    skyscraper: (env.VITE_AD_SLOT_SKYSCRAPER || '').trim(),
    mobile: (env.VITE_AD_SLOT_MOBILE || '').trim(),
  },
  pdfCountdown: Math.max(0, parseInt(env.VITE_PDF_AD_COUNTDOWN || '5', 10) || 5),
  sizeLabels: {
    leaderboard: '728×90 / Responsive',
    rectangle: '300×250',
    skyscraper: '160×600',
    mobile: '320×100',
  },
};

export function canShowAds() {
  return Boolean(adsConfig.enabled && adsConfig.client);
}

export function hasSlot(size) {
  return Boolean(canShowAds() && adsConfig.slots[size]);
}

export function getSlot(size) {
  return adsConfig.slots[size] || '';
}
