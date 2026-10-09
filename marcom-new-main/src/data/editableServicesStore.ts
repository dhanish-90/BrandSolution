/**
 * Central Editable Services Store
 * Allows editing service titles, descriptions, categories, capabilities,
 * benefits, and suitable campaigns with IndexedDB + LocalStorage persistence.
 */

import { ServiceDetail } from '../types';
import { servicesData } from './servicesData';
import { saveToIndexedDB, loadFromIndexedDB } from './indexedDbStorage';

const SERVICES_STORAGE_KEY = 'marcom_editable_services_v1';
const SERVICES_INDEXEDDB_KEY = 'editable_services_list';

// In-memory cache for synchronous instant rendering
let servicesCache: ServiceDetail[] = [...servicesData];

// Initial hydration from localStorage
try {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(SERVICES_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as ServiceDetail[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        servicesCache = parsed;
      }
    }
  }
} catch {
  // Use default
}

// Asynchronous hydration from IndexedDB
if (typeof window !== 'undefined') {
  loadFromIndexedDB<ServiceDetail[]>(SERVICES_INDEXEDDB_KEY)
    .then((saved) => {
      if (saved && Array.isArray(saved) && saved.length > 0) {
        servicesCache = saved;
        window.dispatchEvent(new Event('marcom_services_updated'));
      }
    })
    .catch(() => {});
}

/**
 * Get all current services (merged with any user edits)
 */
export function getEditableServices(): ServiceDetail[] {
  return servicesCache;
}

/**
 * Get a specific service by slug
 */
export function getEditableServiceBySlug(slug: string): ServiceDetail | undefined {
  return servicesCache.find((s) => s.slug === slug);
}

/**
 * Persist services to memory, IndexedDB, and localStorage
 */
function saveServices(services: ServiceDetail[]): void {
  servicesCache = services;

  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('marcom_services_updated'));
  }

  saveToIndexedDB(services, SERVICES_INDEXEDDB_KEY).catch((err) => {
    console.warn('IndexedDB services save failed:', err);
  });

  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(SERVICES_STORAGE_KEY, JSON.stringify(services));
    }
  } catch {
    // Suppress quota exceeded in localStorage
  }
}

/**
 * Update an existing service
 */
export function updateEditableService(slug: string, updates: Partial<ServiceDetail>): void {
  const updatedList = servicesCache.map((service) => {
    if (service.slug === slug) {
      return {
        ...service,
        ...updates
      };
    }
    return service;
  });

  saveServices(updatedList);
}

/**
 * Add a brand new service
 */
export function addEditableService(newServiceData: {
  title: string;
  category: string;
  heroTagline?: string;
  shortDescription: string;
  fullDescription: string;
  subServices?: { name: string; description: string }[];
  benefits?: string[];
  suitableCampaigns?: string[];
  featuredImage?: string;
}): ServiceDetail {
  const baseSlug = newServiceData.title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || `service-${Date.now()}`;
  
  // Ensure unique slug
  let uniqueSlug = baseSlug;
  let counter = 1;
  while (servicesCache.some((s) => s.slug === uniqueSlug)) {
    uniqueSlug = `${baseSlug}-${counter++}`;
  }

  const newService: ServiceDetail = {
    id: `srv-${Date.now()}`,
    slug: uniqueSlug,
    title: newServiceData.title.trim(),
    category: newServiceData.category.trim() || 'Outdoor & Mural Media',
    heroTagline: newServiceData.heroTagline?.trim() || 'High-Impact Brand Visibility & Precision Media',
    shortDescription: newServiceData.shortDescription.trim(),
    fullDescription: newServiceData.fullDescription.trim(),
    featuredImage: newServiceData.featuredImage,
    subServices: newServiceData.subServices && newServiceData.subServices.length > 0
      ? newServiceData.subServices
      : [{ name: 'On-Ground Execution', description: 'Pan-India verified campaign deployment' }],
    benefits: newServiceData.benefits && newServiceData.benefits.length > 0
      ? newServiceData.benefits
      : ['100% Legal Municipal Permits', 'GPS Audited Execution', 'Dedicated Account Manager'],
    suitableCampaigns: newServiceData.suitableCampaigns && newServiceData.suitableCampaigns.length > 0
      ? newServiceData.suitableCampaigns
      : ['Product Promotion & Mass Awareness', 'Regional Brand Visibility'],
    specs: [
      { label: 'Turnaround Time', value: '48–72 Hours Mobilization' },
      { label: 'Reporting', value: 'GPS Photo Audited Ledger' },
      { label: 'Coverage', value: 'Pan-India 28 States' }
    ],
    accentColor: 'rose',
    galleryItems: [
      {
        title: `${newServiceData.title} Deployment`,
        location: 'Pan-India Network',
        caption: 'Verified high-resolution visual campaign execution',
        tag: 'Live Execution',
        imageUrl: newServiceData.featuredImage,
        bgGradient: 'from-rose-600 to-slate-900',
        patternType: 'mural'
      }
    ]
  };

  const updatedList = [...servicesCache, newService];
  saveServices(updatedList);
  return newService;
}

/**
 * Delete a service by slug
 */
export function deleteEditableService(slug: string): void {
  const updatedList = servicesCache.filter((s) => s.slug !== slug);
  saveServices(updatedList);
}

/**
 * Reset a single service to its original defaults
 */
export function resetEditableServiceToDefault(slug: string): void {
  const defaultItem = servicesData.find((s) => s.slug === slug);
  if (!defaultItem) return;

  const updatedList = servicesCache.map((service) => {
    if (service.slug === slug) {
      return JSON.parse(JSON.stringify(defaultItem));
    }
    return service;
  });

  saveServices(updatedList);
}

/**
 * Reset all services across the app to official defaults
 */
export function resetAllServicesToDefault(): void {
  saveServices(JSON.parse(JSON.stringify(servicesData)));
}
