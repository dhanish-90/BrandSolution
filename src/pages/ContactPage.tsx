import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  AlertCircle,
  Building2,
  Globe,
  ArrowRight
} from 'lucide-react';
import { submitContactLead, TARGET_NOTIFICATION_EMAIL } from '../services/leadService';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'New Business / Media Inquiry',
    message: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [dispatchInfo, setDispatchInfo] = useState<{ referenceId: string; mailtoUrl: string } | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email.';
    } else if (!emailRegex.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    const cleanPhone = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide your contact number.';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit phone number.';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const res = await submitContactLead(formData);
      setDispatchInfo({
        referenceId: res.referenceId,
        mailtoUrl: res.mailtoUrl
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Contact lead submit error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'Contact Us' }]} />

          <div className="mt-4 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              Get In Touch With Our Media Team
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2 leading-tight">
              Contact Marcom Brand Solution
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Have an advertising requirement, tender proposal, or nationwide campaign planned? Connect directly with our senior media planners and project heads.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Corporate Information & Interactive Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  Head Office & Media Desk
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  MARCOM BRAND SOLUTION PVT. LTD.
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Incorporated & Operating Since 2000
                </p>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-100 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Corporate Address
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                      213-214 2nd floor harsha complex ghazipur delhi-110096, India.
                    </p>
                    
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Direct Media Lines
                    </h3>
                    <div className="space-y-1 mt-0.5">
                      <a href="tel:+919999688445" className="text-xs text-slate-800 hover:text-rose-600 font-semibold block">
                        +91 9999688445 (Director / Media Desk)
                      </a>
                      <a href="tel:011XXXXXXXX" className="text-xs text-slate-600 hover:text-rose-600 block">
                        011-44725827 (Head Office Boardline)
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Official Email
                    </h3>
                    <div className="space-y-0.5 mt-0.5">
                      <a href="mailto:info@brandsolution.in" className="text-xs text-rose-600 font-semibold hover:underline block">
                        info@brandsolution.in
                      </a>
                      <a href="mailto:dinesh@brandsolution.in" className="text-xs text-slate-600 hover:underline block">
                        dinesh@brandsolution.in
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Business Hours
                    </h3>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Monday to Saturday: 9:30 AM to 6:30 PM IST
                    </p>
                    <p className="text-[11px] text-slate-400">
                      Sunday: Closed (On-ground campaign monitoring 24/7)
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp Quick Action Button */}
              <div className="pt-4 border-t border-slate-100">
                <a
                  href="https://wa.me/919999688445?text=Hello%20Marcom%20Brand%20Solution,%20I%20would%20like%20to%20inquire%20about%20advertising%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat With Media Planner on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Turnkey Assurance Badge */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 border border-slate-800">
              <h4 className="text-sm font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Government & Corporate Empanelment
              </h4>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                We handle turnkey documentation, municipal taxes, site clearances, and audited completion certificates for public and private tenders.
              </p>
            </div>
          </div>

          {/* Right Column: Contact & Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-lg">
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  Send a Message
                </span>
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                  Get in Touch
                </h2>
                <p className="text-xs text-slate-500 mt-1">
                  Leave a message and our client relationships lead will respond within 4 business hours.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center animate-in zoom-in-95 duration-200">
                  <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                    Enquiry Delivered
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-3">
                    Message Sent Successfully
                  </h3>
                  <p className="text-xs text-slate-600 mt-2 max-w-md mx-auto leading-relaxed">
                    A notification with your campaign enquiry has been sent to{' '}
                    <strong className="text-slate-900">{TARGET_NOTIFICATION_EMAIL}</strong>.
                    Our media planning desk will contact you within 2 hours.
                  </p>

                  {dispatchInfo && (
                    <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600 max-w-sm mx-auto flex items-center justify-between">
                      <span className="font-semibold">Reference ID:</span>
                      <span className="font-mono font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                        {dispatchInfo.referenceId}
                      </span>
                    </div>
                  )}

                  <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                    {dispatchInfo?.mailtoUrl && (
                      <a
                        href={dispatchInfo.mailtoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2.5 text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all cursor-pointer flex items-center gap-2 shadow-sm"
                      >
                        <Mail className="w-3.5 h-3.5 text-rose-400" />
                        <span>Send Email to {TARGET_NOTIFICATION_EMAIL}</span>
                      </a>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setDispatchInfo(null);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          subject: 'New Business / Media Inquiry',
                          message: ''
                        });
                      }}
                      className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Your Name <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Rajesh Kumar"
                        className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 transition-all ${
                          errors.name
                            ? 'border-rose-400 focus:ring-rose-500/20'
                            : 'border-slate-200 focus:border-rose-600'
                        }`}
                      />
                      {errors.name && (
                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Email Address <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@company.com"
                        className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 transition-all ${
                          errors.email
                            ? 'border-rose-400 focus:ring-rose-500/20'
                            : 'border-slate-200 focus:border-rose-600'
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Mobile Number <span className="text-rose-600">*</span>
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className={`w-full px-4 py-2.5 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 transition-all ${
                          errors.phone
                            ? 'border-rose-400 focus:ring-rose-500/20'
                            : 'border-slate-200 focus:border-rose-600'
                        }`}
                      />
                      {errors.phone && (
                        <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-rose-600 focus:outline-hidden"
                      >
                        <option value="New Business / Media Inquiry">New Business / Media Inquiry</option>
                        <option value="Wall Painting Campaign">Wall Painting Campaign</option>
                        <option value="Mobile Van Roadshow">Mobile Van Roadshow</option>
                        <option value="Outdoor Hoardings & Transit">Outdoor Hoardings & Transit</option>
                        <option value="Tender / Vendor Registration">Tender / Vendor Registration</option>
                        <option value="Other Query">Other Query</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Your Message <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share your media campaign requirements, target states, timeline, or queries..."
                      className={`w-full p-4 bg-slate-50 border rounded-xl text-sm focus:outline-hidden focus:ring-2 transition-all ${
                        errors.message
                          ? 'border-rose-400 focus:ring-rose-500/20'
                          : 'border-slate-200 focus:border-rose-600'
                      }`}
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-rose-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <p className="text-[11px] text-slate-400">
                      Looking to plan an extensive campaign?{' '}
                      <Link to="/book-now" className="text-rose-600 font-semibold hover:underline">
                        Use our Campaign Booking Form
                      </Link>
                    </p>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-8 py-3.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:opacity-50 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer shrink-0"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                      <Send className="w-4 h-4" />
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Interactive Google Maps / Location Section */}
        <div className="mt-16 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Location Map
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-0.5">
                Our Corporate Office
              </h3>
            </div>
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-rose-600" />
              213-214 2nd floor harsha complex ghazipur delhi-110096, India.
            </span>
          </div>

          {/* Clean Map Container */}
          <div className="relative aspect-21/9 w-full rounded-2xl overflow-hidden border border-slate-200 bg-slate-100">
            <iframe
              title="Marcom Brand Solution Corporate Location Map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d437.74762809284437!2d77.3172657!3d28.6303308!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5c5b1fa3f314515%3A0x35f8b947fc5aae5e!2sBrand%20Solution!5e0!3m2!1sen!2sin!4v1791442705211!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full min-h-[320px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
