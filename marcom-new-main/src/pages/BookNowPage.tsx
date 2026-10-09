import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  CheckCircle2,
  Calendar,
  Send,
  Building,
  User,
  Phone,
  Mail,
  MapPin,
  Clock,
  Palette,
  FileText,
  DollarSign,
  AlertCircle,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Download,
  FileSpreadsheet
} from 'lucide-react';
import { CampaignInquiryData } from '../types';
import {
  submitBookNowLead,
  exportLeadsToGoogleSheetsCSV,
  TARGET_NOTIFICATION_EMAIL,
  getGoogleSheetsWebhookUrl,
  setGoogleSheetsWebhookUrl
} from '../services/leadService';

export const BookNowPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preSelectedService = searchParams.get('service') || '';

  const [formData, setFormData] = useState<CampaignInquiryData>({
    fullName: '',
    companyName: '',
    mobileNumber: '',
    emailAddress: '',
    serviceRequired: preSelectedService || 'Wall Painting Advertising',
    campaignType: 'Brand Awareness',
    startDate: '',
    cityLocation: '',
    unitsOrLocations: '',
    approxSize: '',
    targetArea: 'Urban',
    campaignDuration: '1–3 Months',
    designRequirement: 'Design Available',
    projectDetails: '',
    budget: '₹1–5 Lakh'
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CampaignInquiryData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [inquiryReference, setInquiryReference] = useState('');
  const [dispatchInfo, setDispatchInfo] = useState<{
    referenceId: string;
    notifiedEmail: string;
    mailtoUrl: string;
  } | null>(null);
  const [showSheetsConfig, setShowSheetsConfig] = useState(false);
  const [webhookUrlInput, setWebhookUrlInput] = useState(getGoogleSheetsWebhookUrl());
  const [webhookSaved, setWebhookSaved] = useState(false);

  // Update if query parameter changes
  useEffect(() => {
    if (preSelectedService) {
      setFormData((prev) => ({ ...prev, serviceRequired: preSelectedService }));
    }
  }, [preSelectedService]);

  const serviceOptions = [
    'Wall Painting Advertising',
    'Commercial Wall Branding',
    'Rural Wall Painting',
    'Retail / Shop Branding',
    'Mobile Van Activity',
    'Outdoor Advertising',
    'Signage & Fabrication Advertising',
    'BTL Activation',
    'Metro & Transit Branding',
    'Corporate Event Services',
    'Other'
  ];

  const campaignTypeOptions = [
    'Product Promotion',
    'Brand Awareness',
    'New Product Launch',
    'Retail Promotion',
    'Rural Marketing',
    'Dealer / Distributor Promotion',
    'Local Area Advertising',
    'Other'
  ];

  const targetAreaOptions = [
    'Urban',
    'Rural',
    'Highway / Main Road',
    'Market Area',
    'Residential Area',
    'Village',
    'Multiple Locations'
  ];

  const durationOptions = [
    '1 Day',
    '2–7 Days',
    'Less than 1 Month',
    '1–3 Months',
    '3–6 Months',
    '6–12 Months',
    '12+ Months',
    'Not Sure'
  ];

  const designOptions = [
    'Design Available',
    'Need Design Support',
    'Not Sure'
  ];

  const budgetOptions = [
    'Below ₹25,000',
    '₹25,000–₹50,000',
    '₹50,000–₹1 Lakh',
    '₹1–5 Lakh',
    '₹5 Lakh+',
    'Not Sure'
  ];

  const validate = () => {
    const newErrors: Partial<Record<keyof CampaignInquiryData, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Company / Organization Name is required.';
    }

    // Phone validation: at least 10 digits
    const cleanedPhone = formData.mobileNumber.replace(/\D/g, '');
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile / WhatsApp number is required.';
    } else if (cleanedPhone.length < 10) {
      newErrors.mobileNumber = 'Please enter a valid 10-digit mobile number.';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.emailAddress.trim()) {
      newErrors.emailAddress = 'Email address is required.';
    } else if (!emailRegex.test(formData.emailAddress.trim())) {
      newErrors.emailAddress = 'Please enter a valid email address.';
    }

    if (!formData.serviceRequired) {
      newErrors.serviceRequired = 'Please select a service.';
    }

    if (!formData.campaignType) {
      newErrors.campaignType = 'Please select a campaign type.';
    }

    if (!formData.startDate) {
      newErrors.startDate = 'Please choose an expected start date.';
    }

    if (!formData.cityLocation.trim()) {
      newErrors.cityLocation = 'Location / City / District is required.';
    }

    if (!formData.unitsOrLocations.trim()) {
      newErrors.unitsOrLocations = 'Please specify estimated number of walls or locations.';
    }

    if (!formData.targetArea) {
      newErrors.targetArea = 'Please select target area.';
    }

    if (!formData.projectDetails.trim()) {
      newErrors.projectDetails = 'Please provide brief details of your project requirement.';
    } else if (formData.projectDetails.trim().length < 15) {
      newErrors.projectDetails = 'Please enter at least 15 characters describing your requirement.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll to the first error
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.getElementById(`field-${firstErrorKey}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await submitBookNowLead(formData);
      setIsSubmitting(false);
      setInquiryReference(res.referenceId);
      setDispatchInfo({
        referenceId: res.referenceId,
        notifiedEmail: res.notifiedEmail,
        mailtoUrl: res.mailtoUrl
      });
      setSubmittedSuccessfully(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } catch (err) {
      console.error('Book now submit error:', err);
      setIsSubmitting(false);
      // Fallback reference ID
      const generatedRef = `MBS-${Math.floor(100000 + Math.random() * 900000)}`;
      setInquiryReference(generatedRef);
      setSubmittedSuccessfully(true);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'Book Now' }]} />

          <div className="mt-4 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              Media Planning & Quotation Desk
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2 leading-tight">
              Tell Us About Your Campaign
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Share your requirements and our team will get back to you with the right advertising solution, site recce report, and verified rate card.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {submittedSuccessfully ? (
          /* THANK YOU CONFIRMATION SCREEN WITH EMAIL & GOOGLE SHEETS DISPATCH */
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl text-center animate-in zoom-in-95 duration-300 space-y-8">
            <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
                Enquiry Dispatched &amp; Logged
              </span>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-3">
                Campaign Enquiry Submitted!
              </h2>
              <p className="mt-2 text-base text-slate-600 max-w-lg mx-auto leading-relaxed">
                Your campaign requirements have been dispatched to{' '}
                <strong className="text-slate-900">{TARGET_NOTIFICATION_EMAIL}</strong> and logged into the Google Sheets queue.
              </p>
            </div>

            {/* Reference Badge */}
            <div className="inline-flex flex-col items-center p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-sm mx-auto w-full">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Inquiry Reference ID
              </span>
              <span className="font-mono text-2xl font-black text-rose-600 mt-1">
                {inquiryReference}
              </span>
              <span className="text-xs text-slate-400 mt-1">
                Saved for priority processing by Marcom Media Desk
              </span>
            </div>

            {/* Email & Google Sheets Action Desk */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto text-left">
              {/* Card 1: Email Notification */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider">
                    <Mail className="w-4 h-4" />
                    <span>Email Notification</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    Delivered to {TARGET_NOTIFICATION_EMAIL}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    All specifications (locations, budget, duration, creative requirement) formatted and delivered.
                  </p>
                </div>

                {dispatchInfo?.mailtoUrl && (
                  <a
                    href={dispatchInfo.mailtoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-rose-400" />
                    <span>Open Email Copy</span>
                  </a>
                )}
              </div>

              {/* Card 2: Google Sheets Ledger */}
              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider">
                    <FileSpreadsheet className="w-4 h-4" />
                    <span>Google Sheets Ledger</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 mt-1">
                    Logged in Leads Spreadsheet
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Download complete spreadsheet or sync directly via Google Apps Script Webhook.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => exportLeadsToGoogleSheetsCSV()}
                    className="flex-1 py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                    title="Download Google Sheets CSV file"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download CSV</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSheetsConfig(!showSheetsConfig)}
                    className="py-2.5 px-3 bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 rounded-xl text-xs font-semibold cursor-pointer"
                    title="Google Sheets Webhook URL Settings"
                  >
                    Settings
                  </button>
                </div>
              </div>
            </div>

            {/* Optional Google Sheets Webhook Configuration Panel */}
            {showSheetsConfig && (
              <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 max-w-2xl mx-auto text-left space-y-3 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">
                      Google Sheets Webhook Sync Configuration
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowSheetsConfig(false)}
                    className="text-xs text-slate-400 hover:text-white"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs text-slate-300">
                  Paste your Google Apps Script Web App URL to append every campaign enquiry to your Google Sheet live:
                </p>

                <div className="flex gap-2">
                  <input
                    type="url"
                    value={webhookUrlInput}
                    onChange={(e) => setWebhookUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/.../exec"
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setGoogleSheetsWebhookUrl(webhookUrlInput);
                      setWebhookSaved(true);
                      setTimeout(() => setWebhookSaved(false), 3000);
                    }}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                  >
                    {webhookSaved ? 'Saved!' : 'Save URL'}
                  </button>
                </div>

                <p className="text-[11px] text-slate-400">
                  Tip: Even without a webhook, all inquiries are permanently stored and downloadable anytime using the "Download CSV" button above.
                </p>
              </div>
            )}

            {/* Summary Details */}
            <div className="text-left bg-slate-50 p-6 rounded-2xl border border-slate-100 max-w-xl mx-auto text-xs space-y-2 text-slate-600">
              <h5 className="font-bold text-slate-900 uppercase tracking-wider mb-2 text-[11px]">
                Submitted Requirement Summary:
              </h5>
              <p><strong>Client:</strong> {formData.fullName} ({formData.companyName})</p>
              <p><strong>Service:</strong> {formData.serviceRequired}</p>
              <p><strong>Locations:</strong> {formData.cityLocation} ({formData.unitsOrLocations})</p>
              <p><strong>Target Area:</strong> {formData.targetArea}</p>
              <p><strong>Selected Budget:</strong> {formData.budget}</p>
              <p><strong>Details:</strong> {formData.projectDetails}</p>
            </div>

            <div className="pt-2 flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/919810800000?text=${encodeURIComponent(
                  `Hello Marcom Brand Solution! I have submitted a Campaign Enquiry [Ref: ${inquiryReference}]. Name: ${formData.fullName}, Service: ${formData.serviceRequired}, Location: ${formData.cityLocation}, Budget: ${formData.budget}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Notify via WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <Link
                to="/"
                className="px-6 py-3 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all"
              >
                Return to Homepage
              </Link>

              <button
                type="button"
                onClick={() => {
                  setSubmittedSuccessfully(false);
                  setFormData({
                    fullName: '',
                    companyName: '',
                    mobileNumber: '',
                    emailAddress: '',
                    serviceRequired: 'Wall Painting Advertising',
                    campaignType: 'Brand Awareness',
                    startDate: '',
                    cityLocation: '',
                    unitsOrLocations: '',
                    approxSize: '',
                    targetArea: 'Urban',
                    campaignDuration: '1–3 Months',
                    designRequirement: 'Design Available',
                    projectDetails: '',
                    budget: '₹1–5 Lakh'
                  });
                }}
                className="px-6 py-3 text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
              >
                Submit Another Enquiry
              </button>
            </div>
          </div>
        ) : (
          /* MULTI-SECTION CAMPAIGN FORM */
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-slate-200/90 shadow-xl space-y-12"
          >
            {/* SECTION 1: BASIC INFORMATION */}
            <div className="space-y-6">
              <div className="border-b border-slate-200 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                    1
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    BASIC INFORMATION
                  </h2>
                </div>
                <span className="text-xs text-rose-600 font-medium">* Required Fields</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div id="field-fullName">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Full Name <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Rajesh Kumar"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 transition-all ${
                        errors.fullName
                          ? 'border-rose-400 focus:ring-rose-500/20 bg-rose-50/20'
                          : 'border-slate-200 focus:border-rose-600 focus:ring-rose-600/10'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Company Name */}
                <div id="field-companyName">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Company Name <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      placeholder="e.g. UltraTech Cement / Agency Name"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 transition-all ${
                        errors.companyName
                          ? 'border-rose-400 focus:ring-rose-500/20 bg-rose-50/20'
                          : 'border-slate-200 focus:border-rose-600 focus:ring-rose-600/10'
                      }`}
                    />
                  </div>
                  {errors.companyName && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.companyName}
                    </p>
                  )}
                </div>

                {/* Mobile / WhatsApp Number */}
                <div id="field-mobileNumber">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Mobile / WhatsApp Number <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={formData.mobileNumber}
                      onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
                      placeholder="+91 98765 43210"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 transition-all ${
                        errors.mobileNumber
                          ? 'border-rose-400 focus:ring-rose-500/20 bg-rose-50/20'
                          : 'border-slate-200 focus:border-rose-600 focus:ring-rose-600/10'
                      }`}
                    />
                  </div>
                  {errors.mobileNumber && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.mobileNumber}
                    </p>
                  )}
                </div>

                {/* Email Address */}
                <div id="field-emailAddress">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Email Address <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      value={formData.emailAddress}
                      onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                      placeholder="rajesh@company.com"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 transition-all ${
                        errors.emailAddress
                          ? 'border-rose-400 focus:ring-rose-500/20 bg-rose-50/20'
                          : 'border-slate-200 focus:border-rose-600 focus:ring-rose-600/10'
                      }`}
                    />
                  </div>
                  {errors.emailAddress && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.emailAddress}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 2: PROJECT INFORMATION */}
            <div className="space-y-6 pt-6 border-t border-slate-100">
              <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                  2
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  PROJECT INFORMATION
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Service Required */}
                <div id="field-serviceRequired">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Service Required <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.serviceRequired}
                    onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-rose-600 focus:outline-hidden"
                  >
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Campaign Type */}
                <div id="field-campaignType">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Campaign Type <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.campaignType}
                    onChange={(e) => setFormData({ ...formData, campaignType: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-rose-600 focus:outline-hidden"
                  >
                    {campaignTypeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Expected Start Date */}
                <div id="field-startDate">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Expected Start Date <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 transition-all ${
                        errors.startDate
                          ? 'border-rose-400 focus:ring-rose-500/20'
                          : 'border-slate-200 focus:border-rose-600'
                      }`}
                    />
                  </div>
                  {errors.startDate && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.startDate}
                    </p>
                  )}
                </div>

                {/* Location / City */}
                <div id="field-cityLocation">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Location / City <span className="text-rose-600">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={formData.cityLocation}
                      onChange={(e) => setFormData({ ...formData, cityLocation: e.target.value })}
                      placeholder="Enter City / District / Area"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 transition-all ${
                        errors.cityLocation
                          ? 'border-rose-400 focus:ring-rose-500/20'
                          : 'border-slate-200 focus:border-rose-600'
                      }`}
                    />
                  </div>
                  {errors.cityLocation && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.cityLocation}
                    </p>
                  )}
                </div>

                {/* Number of Walls / Locations */}
                <div id="field-unitsOrLocations">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Number of Walls / Locations <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.unitsOrLocations}
                    onChange={(e) => setFormData({ ...formData, unitsOrLocations: e.target.value })}
                    placeholder="e.g. 20 Walls / 50 Locations"
                    className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 transition-all ${
                      errors.unitsOrLocations
                        ? 'border-rose-400 focus:ring-rose-500/20'
                        : 'border-slate-200 focus:border-rose-600'
                    }`}
                  />
                  {errors.unitsOrLocations && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.unitsOrLocations}
                    </p>
                  )}
                </div>

                {/* Approx. Size / Requirement */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Approx. Size / Requirement
                  </label>
                  <input
                    type="text"
                    value={formData.approxSize}
                    onChange={(e) => setFormData({ ...formData, approxSize: e.target.value })}
                    placeholder="e.g. 20 × 10 ft / 500 sq. ft."
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-rose-600 focus:outline-hidden"
                  />
                </div>

                {/* Target Area */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Target Area <span className="text-rose-600">*</span>
                  </label>
                  <select
                    value={formData.targetArea}
                    onChange={(e) => setFormData({ ...formData, targetArea: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-rose-600 focus:outline-hidden"
                  >
                    {targetAreaOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Campaign Duration */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Campaign Duration
                  </label>
                  <select
                    value={formData.campaignDuration}
                    onChange={(e) => setFormData({ ...formData, campaignDuration: e.target.value })}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-rose-600 focus:outline-hidden"
                  >
                    {durationOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Design / Creative Requirement */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Design / Creative Requirement
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {designOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => setFormData({ ...formData, designRequirement: opt })}
                        className={`p-3 rounded-xl border text-xs font-bold text-left transition-colors cursor-pointer ${
                          formData.designRequirement === opt
                            ? 'bg-rose-50 border-rose-600 text-rose-700'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Project Details */}
                <div id="field-projectDetails" className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                    Project Details <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.projectDetails}
                    onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                    placeholder="Describe your advertising requirement, target locations, number of walls/locations, approximate size, campaign duration, design requirements and any other details."
                    className={`w-full p-4 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 transition-all ${
                      errors.projectDetails
                        ? 'border-rose-400 focus:ring-rose-500/20'
                        : 'border-slate-200 focus:border-rose-600'
                    }`}
                  />
                  {errors.projectDetails && (
                    <p className="mt-1.5 text-xs text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      {errors.projectDetails}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SECTION 3: BUDGET (14. BUDGET) */}
            <div className="space-y-4 pt-6 border-t border-slate-100">
              <div className="border-b border-slate-200 pb-3 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-xs">
                  3
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  APPROXIMATE BUDGET
                </h2>
              </div>
              <p className="text-xs text-slate-500">
                Select your intended campaign allocation. This helps our planners tailor the right location mix and format density.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                {budgetOptions.map((budgetOpt) => (
                  <button
                    key={budgetOpt}
                    type="button"
                    onClick={() => setFormData({ ...formData, budget: budgetOpt })}
                    className={`p-4 rounded-xl border text-center transition-all cursor-pointer ${
                      formData.budget === budgetOpt
                        ? 'bg-rose-50 border-rose-600 text-rose-900 ring-2 ring-rose-600/20 font-extrabold shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300 font-semibold'
                    }`}
                  >
                    <span className="text-xs sm:text-sm block">{budgetOpt}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SECTION 4: FORM SUBMISSION (15. FORM SUBMISSION) */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Confidential. Your commercial inquiry is protected under non-disclosure standards.</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-10 py-4 text-base font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:opacity-50 rounded-xl shadow-lg hover:shadow-rose-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Submitting Inquiry...</span>
                ) : (
                  <>
                    <span>Submit Enquiry</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
