/**
 * Central Photo Registry for Marcom Brand Solution
 * Supports default curated assets (including user-uploaded Dhara Wall Painting)
 * and allows manual one-by-one photo overrides via LocalStorage.
 */

export interface ServicePhoto {
  serviceId: string;
  title: string;
  defaultUrl: string;
  caption: string;
  aspectRatio?: string;
}

export const defaultPhotos: Record<string, ServicePhoto> = {
  'wall-painting-advertising': {
    serviceId: 'wall-painting-advertising',
    title: 'Wall Painting Advertising (Dhara Oil Mural Execution)',
    defaultUrl: '/images/wall-painting-dhara.png',
    caption: 'Dhara Kachi Ghani Mustard Oil & Refined Oil Highway Mural • SR 65',
    aspectRatio: '16/9'
  },
  'mobile-van-activity': {
    serviceId: 'mobile-van-activity',
    title: 'Mobile Van Activity & Roadshows',
    defaultUrl: '/images/mobile-van.png',
    caption: 'Tata Roadshow Stage Van with 4K LED Screen & Live Product Demo',
    aspectRatio: '16/9'
  },
  'outdoor-advertising': {
    serviceId: 'outdoor-advertising',
    title: 'Bus & Transit Advertising',
    defaultUrl: '/images/bus-branding.png',
    caption: 'Full-Wrap Inter-City State Transit Bus on High-Density Route',
    aspectRatio: '16/9'
  },
  'metro-transit-branding': {
    serviceId: 'metro-transit-branding',
    title: 'Indian Railways & Metro Train Branding',
    defaultUrl: '/images/train-branding.png',
    caption: 'Indian Railways Express Train Full Exterior Vinyl Coach Wrap',
    aspectRatio: '16/9'
  },
  'signage-fabrication': {
    serviceId: 'signage-fabrication',
    title: 'Signage & Fabrication Advertising',
    defaultUrl: '/images/signage-fabrication.png',
    caption: '3D Front-Lit Acrylic & ACP LED Glow Lettering Signboard',
    aspectRatio: '16/9'
  },
  'btl-activation': {
    serviceId: 'btl-activation',
    title: 'BTL & Experiential Marketing',
    defaultUrl: '/images/btl-activation.png',
    caption: 'Mall Experiential Sampling Canopy Arena with Brand Kiosks',
    aspectRatio: '16/9'
  },
  'metro-branding': {
    serviceId: 'metro-branding',
    title: 'Metro Station Concourse & Pillar Media',
    defaultUrl: '/images/metro-branding.png',
    caption: 'Delhi Metro Concourse Takeover & 360 Pillar Wraps',
    aspectRatio: '16/9'
  },
  'corporate-events': {
    serviceId: 'corporate-events',
    title: 'Corporate Event Production & Staging',
    defaultUrl: '/images/corporate-events.png',
    caption: 'Annual Leadership Summit Arena with 3D Stage & Curved LED Screen',
    aspectRatio: '16/9'
  }
};

/**
 * Helper to get the active photo for any service.
 * Checks localStorage first for manual photo changes made by the user.
 */
export function getActivePhoto(serviceKey: string): string {
  try {
    const saved = localStorage.getItem(`marcom_photo_${serviceKey}`);
    if (saved) return saved;
  } catch {
    // ignore localStorage errors in restricted environments
  }
  return defaultPhotos[serviceKey]?.defaultUrl || '/images/wall-painting-dhara.png';
}

/**
 * Helper to save a manual photo for a service.
 */
export function setActivePhoto(serviceKey: string, photoDataUrlOrLink: string): void {
  try {
    localStorage.setItem(`marcom_photo_${serviceKey}`, photoDataUrlOrLink);
  } catch (err) {
    console.error('Failed to save custom photo to localStorage:', err);
  }
}

/**
 * Reset a service photo back to default.
 */
export function resetActivePhoto(serviceKey: string): void {
  try {
    localStorage.removeItem(`marcom_photo_${serviceKey}`);
  } catch {
    // ignore
  }
}
