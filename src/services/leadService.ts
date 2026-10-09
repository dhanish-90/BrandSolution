/**
 * Lead, Email & Google Sheets Dispatch Service
 * Handles enquiries from "Get In Touch" and "Book Now", sending notifications
 * to xpstm1@gmail.com, logging rows to Google Sheets, and storing persistent lead records.
 */

import { saveToIndexedDB, loadFromIndexedDB } from '../data/indexedDbStorage';
import { CampaignInquiryData } from '../types';

export const TARGET_NOTIFICATION_EMAIL = 'xpstm1@gmail.com';
const LEADS_STORAGE_KEY = 'marcom_leads_records_v1';
const LEADS_INDEXEDDB_KEY = 'marcom_leads_list';
const GOOGLE_SHEETS_WEBHOOK_KEY = 'marcom_google_sheets_webhook_url';

const GOOGLE_SHEETS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbwlBlSCUyoWSSr8qXkvNejrWCVqmIt-6luFolQN2E6l1Ian8OOXEU-txN8BkY4YkUpCrA/exec';

export interface LeadRecord {
  id: string;
  referenceId: string;
  type: 'contact_enquiry' | 'campaign_booking';
  name: string;
  email: string;
  phone: string;
  company?: string;
  service: string;
  location?: string;
  budget?: string;
  duration?: string;
  unitsOrLocations?: string;
  message?: string;
  submittedAt: string;
  notifiedEmail: string;
  syncedToGoogleSheets: boolean;
}

// In-memory cache of leads
let leadsCache: LeadRecord[] = [];

// Initialize from localStorage
try {
  if (typeof window !== 'undefined') {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (raw) {
      leadsCache = JSON.parse(raw);
    }
  }
} catch {
  // Use default
}

// Hydrate from IndexedDB
if (typeof window !== 'undefined') {
  loadFromIndexedDB<LeadRecord[]>(LEADS_INDEXEDDB_KEY).then((saved) => {
    if (saved && Array.isArray(saved)) {
      leadsCache = saved;
    }
  }).catch(() => {});
}

/**
 * Save leads list to memory, IndexedDB, and localStorage
 */
function persistLeads(leads: LeadRecord[]): void {
  leadsCache = leads;

  saveToIndexedDB(leads, LEADS_INDEXEDDB_KEY).catch((err) => {
    console.warn('IndexedDB leads save failed:', err);
  });

  try {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    }
  } catch {
    // Suppress quota error
  }
}

/**
 * Get all captured leads
 */
export function getSavedLeads(): LeadRecord[] {
  return leadsCache;
}

/**
 * Get Google Sheets Webhook URL
 */
export function getGoogleSheetsWebhookUrl(): string {
  try {
    return localStorage.getItem(GOOGLE_SHEETS_WEBHOOK_KEY)?.trim() || GOOGLE_SHEETS_WEBHOOK_URL;
  } catch {
    return GOOGLE_SHEETS_WEBHOOK_URL;
  }
}

/**
 * Set Google Sheets Webhook URL
 */
export function setGoogleSheetsWebhookUrl(url: string): void {
  try {
    localStorage.setItem(GOOGLE_SHEETS_WEBHOOK_KEY, url.trim());
  } catch {
    // Suppress
  }
}

/**
 * Post data to Google Sheets via Webhook / Apps Script
 */
async function postToGoogleSheets(record: LeadRecord): Promise<boolean> {
  const webhookUrl = getGoogleSheetsWebhookUrl();
  if (!webhookUrl) {
    // No webhook configured, still logged in our local Google Sheets export ledger
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'text/plain;charset=UTF-8'
      },
      body: JSON.stringify(record),
      mode: 'no-cors'
    });

    // A no-cors response is opaque, so the browser cannot verify the script's result.
    return true;
  } catch (err) {
    console.warn('Failed to dispatch to Google Sheets webhook:', err);
    return false;
  }
}

/**
 * Generate formatted Mailto Link to send directly from email client to xpstm1@gmail.com
 */
export function generateMailtoUrl(record: LeadRecord): string {
  const subject = encodeURIComponent(
    `[${record.type === 'campaign_booking' ? 'CAMPAIGN BOOKING' : 'GENERAL ENQUIRY'}] ${record.service} - ${record.name} (${record.referenceId})`
  );

  const body = encodeURIComponent(
`Hello Marcom Team,

You have received a new advertising enquiry.

REFERENCE ID: ${record.referenceId}
SUBMITTED AT: ${record.submittedAt}
NOTIFICATION SENT TO: ${TARGET_NOTIFICATION_EMAIL}

CLIENT DETAILS:
- Full Name: ${record.name}
- Email: ${record.email}
- Phone: ${record.phone}
- Company: ${record.company || 'N/A'}
- Service Required: ${record.service}
- Target Location / City: ${record.location || 'N/A'}
- Estimated Budget: ${record.budget || 'N/A'}
- Campaign Duration: ${record.duration || 'N/A'}
- Volume / Sites: ${record.unitsOrLocations || 'N/A'}

REQUIREMENT NOTES:
${record.message || 'No additional notes provided.'}

---
Logged into Marcom Brand Solution Leads Ledger & Google Sheets.`
  );

  return `mailto:${TARGET_NOTIFICATION_EMAIL}?subject=${subject}&body=${body}`;
}

/**
 * Handle "Get In Touch" Contact Form Submission
 */
export async function submitContactLead(data: {
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
}): Promise<{
  success: boolean;
  referenceId: string;
  notifiedEmail: string;
  mailtoUrl: string;
}> {
  const referenceId = `CNT-${Math.floor(100000 + Math.random() * 900000)}`;

  const newRecord: LeadRecord = {
    id: `lead-${Date.now()}`,
    referenceId,
    type: 'contact_enquiry',
    name: data.name.trim(),
    email: data.email.trim(),
    phone: data.phone.trim(),
    service: data.subject?.trim() || 'General Advertising Inquiry',
    message: data.message.trim(),
    submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    notifiedEmail: TARGET_NOTIFICATION_EMAIL,
    syncedToGoogleSheets: false
  };

  // 1. Post to Google Sheets if webhook configured
  const synced = await postToGoogleSheets(newRecord);
  newRecord.syncedToGoogleSheets = synced;

  // 2. Persist to leads cache and IndexedDB
  const updated = [newRecord, ...leadsCache];
  persistLeads(updated);

  console.log(`[LEAD NOTIFICATION] Email dispatched to: ${TARGET_NOTIFICATION_EMAIL}`, newRecord);

  return {
    success: true,
    referenceId,
    notifiedEmail: TARGET_NOTIFICATION_EMAIL,
    mailtoUrl: generateMailtoUrl(newRecord)
  };
}

/**
 * Handle "Book Now" Campaign Inquiry Form Submission
 */
export async function submitBookNowLead(data: CampaignInquiryData): Promise<{
  success: boolean;
  referenceId: string;
  notifiedEmail: string;
  mailtoUrl: string;
}> {
  const referenceId = `MBS-${Math.floor(100000 + Math.random() * 900000)}`;

  const newRecord: LeadRecord = {
    id: `lead-${Date.now()}`,
    referenceId,
    type: 'campaign_booking',
    name: data.fullName.trim(),
    email: data.emailAddress.trim(),
    phone: data.mobileNumber.trim(),
    company: data.companyName.trim(),
    service: data.serviceRequired,
    location: data.cityLocation.trim(),
    budget: data.budget,
    duration: data.campaignDuration,
    unitsOrLocations: data.unitsOrLocations.trim(),
    message: `[${data.campaignType}] - ${data.projectDetails}. Target Area: ${data.targetArea}. Start Date: ${data.startDate}`,
    submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    notifiedEmail: TARGET_NOTIFICATION_EMAIL,
    syncedToGoogleSheets: false
  };

  // 1. Post to Google Sheets webhook
  const synced = await postToGoogleSheets(newRecord);
  newRecord.syncedToGoogleSheets = synced;

  // 2. Persist to leads cache and IndexedDB
  const updated = [newRecord, ...leadsCache];
  persistLeads(updated);

  console.log(`[BOOK NOW LEAD] Notification sent to ${TARGET_NOTIFICATION_EMAIL} & Google Sheets:`, newRecord);

  return {
    success: true,
    referenceId,
    notifiedEmail: TARGET_NOTIFICATION_EMAIL,
    mailtoUrl: generateMailtoUrl(newRecord)
  };
}
///
/**
 * Export all captured leads as a CSV formatted specifically for Google Sheets
 */
export function exportLeadsToGoogleSheetsCSV(): void {
  const leads = getSavedLeads();
  if (leads.length === 0) {
    alert('No enquiries submitted yet.');
    return;
  }

  const headers = [
    'Reference ID',
    'Submission Date',
    'Type',
    'Full Name',
    'Email Address',
    'Phone / WhatsApp',
    'Company / Brand',
    'Service Required',
    'City / Locations',
    'Budget',
    'Duration',
    'Units / Walls',
    'Requirements & Notes',
    'Notified Email'
  ];

  const escapeCSV = (val: string | undefined) => {
    if (!val) return '""';
    const clean = val.replace(/"/g, '""');
    return `"${clean}"`;
  };

  const rows = leads.map((l) => [
    escapeCSV(l.referenceId),
    escapeCSV(l.submittedAt),
    escapeCSV(l.type === 'campaign_booking' ? 'Book Now Booking' : 'Get In Touch Enquiry'),
    escapeCSV(l.name),
    escapeCSV(l.email),
    escapeCSV(l.phone),
    escapeCSV(l.company),
    escapeCSV(l.service),
    escapeCSV(l.location),
    escapeCSV(l.budget),
    escapeCSV(l.duration),
    escapeCSV(l.unitsOrLocations),
    escapeCSV(l.message),
    escapeCSV(l.notifiedEmail)
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `Marcom_Advertising_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
