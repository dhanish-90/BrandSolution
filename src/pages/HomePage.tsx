import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HeroSlider } from '../components/HeroSlider';
import { ServiceCard } from '../components/ServiceCard';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { WhatsAppWidget } from '../components/WhatsAppWidget';
import { getEditableServices } from '../data/editableServicesStore';
import { submitContactLead, TARGET_NOTIFICATION_EMAIL } from '../services/leadService';
import { clientsData, testimonialsData } from '../data/clientsData';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Briefcase,
  Calendar,
  CheckCircle2,
  MapPin,
  ChevronRight,
  Star,
  MessageCircle,
  PhoneCall,
  Mail,
  Zap,
  Clock,
  Target,
  Layers,
  Send,
  Building2,
  ChevronLeft,
} from 'lucide-react';

export const HomePage: React.FC = () => {
  // Services dynamic store state
  const [servicesList, setServicesList] = useState(getEditableServices());

  useEffect(() => {
    const handleUpdate = () => {
      setServicesList(getEditableServices());
    };

    window.addEventListener('marcom_services_updated', handleUpdate);
    return () => {
      window.removeEventListener('marcom_services_updated', handleUpdate);
    };
  }, []);

  // Client Reviews slider state
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  // Quick Contact / CTA Form State
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactService, setContactService] = useState('Wall Painting Advertising');
  const [contactLocation, setContactLocation] = useState('');
  const [isSubmittingContact, setIsSubmittingContact] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [contactDispatchInfo, setContactDispatchInfo] = useState<{ referenceId: string; mailtoUrl: string } | null>(null);

  const handleQuickContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactPhone.trim()) return;

    setIsSubmittingContact(true);

    try {
      const res = await submitContactLead({
        name: contactName.trim() || 'Website Visitor',
        phone: contactPhone.trim(),
        email: 'info@brandsolution.in',
        subject: `Quick Callback: ${contactService}`,
        message: `Client requested quick callback for: ${contactService}. Target location: ${contactLocation || 'Pan-India'}. Contact Phone: ${contactPhone}`
      });

      setContactDispatchInfo({
        referenceId: res.referenceId,
        mailtoUrl: res.mailtoUrl
      });
      setFormSent(true);

      // Also trigger WhatsApp for instant message
      const message = `Hello Marcom Brand Solution! I want to inquire about: ${contactService}. Location: ${contactLocation || 'Pan-India'}. Name: ${contactName || 'Corporate Client'}, Phone: ${contactPhone} [Ref: ${res.referenceId}]`;
      window.open(`https://wa.me/919999688445?text=${encodeURIComponent(message)}`, '_blank');
    } catch (err) {
      console.error('Quick contact dispatch failed:', err);
    } finally {
      setIsSubmittingContact(false);
    }
  };

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  return (
    <div className="flex flex-col min-h-screen relative bg-white">
      {/* ========================================================= */}
      {/* 1. HERO / SLIDER — PHOTO + SERVICE CONTENT ON EACH SLIDE  */}
      {/* ========================================================= */}
      <HeroSlider />

      {/* ========================================================= */}
      {/* 2. ABOUT COMPANY                                         */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-b border-slate-100" id="about-company">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200/60 text-xs font-bold text-rose-700 uppercase tracking-wider mb-4">
                <span>About Company</span>
                <span>•</span>
                <span>Since 2000</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight text-balance">
                Building Brands. Creating Visibility. Delivering Impact.
              </h2>

              <div className="mt-6 space-y-4 text-base sm:text-lg text-slate-600 leading-relaxed">
                <p>
                  <strong className="text-slate-900 font-semibold">Marcom Brand Solution Pvt. Ltd.</strong> is a full-service Advertising, Branding, Brand Activation and Event Solutions company helping businesses, organizations and brands across India build visibility, engage their target audiences and create impactful brand experiences.
                </p>
                <p>
                  From wall painting and outdoor advertising to retail branding, mobile van activities, BTL activations, signage, transit branding and corporate events, we bring together strategy, creativity and on-ground execution to help brands connect with the right audience.
                </p>
        
                <p>
                  Our approach combines market understanding, creative thinking, professional execution and strong project management to deliver campaigns that are practical, impactful and aligned with our clients' objectives.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link
                  to="/about-us"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl transition-all shadow-xs group"
                >
                  <span>Know More About Us</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href="https://wa.me/919999688445?text=Hello%20Marcom%20Brand%20Solution,%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-xl border border-emerald-200 transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-600" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right: Key Stats Box */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-8 border border-slate-800 shadow-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
                Track Record Since 2000
              </span>
              <h3 className="text-2xl font-bold text-white mt-1 mb-6">
                Two Decades of Excellence
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
                  <div className="text-3xl sm:text-4xl font-extrabold text-rose-500">
                    <AnimatedCounter end={20} suffix="+" />
                  </div>
                  <p className="mt-1 text-sm font-bold text-white">
                    Years of Experience
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Operating Since 2000
                  </p>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    <AnimatedCounter end={100} suffix="+" />
                  </div>
                  <p className="mt-1 text-sm font-bold text-white">
                    Happy Clients
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Leading National Brands
                  </p>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
                  <div className="text-3xl sm:text-4xl font-extrabold text-rose-500">
                    <AnimatedCounter end={1000} suffix="+" separator={true} />
                  </div>
                  <p className="mt-1 text-sm font-bold text-white">
                    Campaigns Completed
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Pan-India Delivery
                  </p>
                </div>

                <div className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/80">
                  <div className="text-3xl sm:text-4xl font-extrabold text-white">
                    <AnimatedCounter end={30} suffix="+" />
                  </div>
                  <p className="mt-1 text-sm font-bold text-white">
                    Qualified Experts
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Artisans & Media Planners
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 3. WHAT WE DO                                             */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-50 border-b border-slate-200/80" id="what-we-do">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Core Capabilities
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
                What We Do
              </h2>
              <p className="mt-2 text-base text-slate-600 max-w-2xl">
                Comprehensive advertising, transit branding, outdoor media, and on-ground brand activation services tailored for maximum audience reach across India.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700 whitespace-nowrap"
              >
                <span>View All Services</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Dynamic Services Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesList.map((service, index) => (
              <ServiceCard key={service.id || service.slug} service={service} index={index} />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-all cursor-pointer group"
            >
              <span>View Full Services Catalog & Work Gallery</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 4. WHY CHOOSE BRANDSOLUTION                              */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-b border-slate-200/80" id="why-choose-us">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              The BrandSolution Advantage
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
              Why Choose BrandSolution
            </h2>
            <p className="mt-2 text-base text-slate-600">
              We combine market insight, high-grade craftsmanship, and rigorous on-ground project management to give your campaigns unbeatable visibility and return on investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Pan-India Footprint
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Direct operations and execution networks across 28 States and Union Territories covering Tier-1 metros, Tier-2/3 cities, and agricultural rural mandis.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                100% Legal & Municipal Approvals
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Complete compliance with municipal corporations, national highways authorities (NHAI), and local bodies for uninterrupted campaign tenure.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                20+ Years Industry Heritage
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Serving since 2000 with a proven track record of over 1,000+ completed advertising campaigns for India's leading corporate and public sector brands.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                GPS Photo Auditing & Transparency
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Every site is verified with high-resolution photographs stamped with latitude, longitude coordinates, date, and time for transparent reporting.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                In-House Fabrication & Master Artisans
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Equipped with CNC routers, laser cutting machines, high-GSM flex printers, and master wall painters for exceptional finish and color accuracy.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200/90 hover:border-slate-300 hover:shadow-lg transition-all group">
              <div className="w-12 h-12 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold text-lg mb-5 group-hover:bg-rose-600 group-hover:text-white transition-colors">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">
                Single-Point Turnkey Accountability
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                From site recce and municipal clearance to fabrication, on-site painting, and ongoing maintenance, we manage every phase under one roof.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 5. OUR CLIENTS                                            */}
      {/* ========================================================= */}
      <section
  className="py-20 bg-slate-50 border-b border-slate-200/80"
  id="our-clients"
>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

    {/* Section Heading */}
    <div className="text-center max-w-3xl mx-auto mb-12">
      <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
        Trusted Partnerships
      </span>

      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
        Our Clients
      </h2>

      <p className="mt-2 text-slate-600 text-sm sm:text-base">
        Empaneled with over 100+ prestigious corporations, infrastructure
        giants, telecom leaders, and automobile conglomerates across India.
      </p>
    </div>

    {/* Client Logo Grid */}
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
      {clientsData.slice(0, 12).map((client) => (
        <div
          key={`${client.id}-${client.name}`}
          className="group flex flex-col items-center justify-center p-6 bg-white hover:bg-slate-50 rounded-2xl border border-slate-200/80 hover:border-slate-300 hover:shadow-md transition-all text-center"
        >

          {/* Company Logo */}
          <div className="w-24 h-20 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-3 mb-3 group-hover:scale-105 transition-transform overflow-hidden">
            {client.logoUrl ? (
              <img
                src={client.logoUrl}
                alt={`${client.name} logo`}
                className="max-w-full max-h-full object-contain"
                loading="lazy"
              />
            ) : (
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-white text-base"
                style={{ backgroundColor: client.brandColor }}
              >
                {client.name.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>

          {/* Company Name */}
          <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
            {client.name}
          </h4>

          {/* Sector */}
          <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
            {client.sector}
          </p>

          {/* Campaign */}
          <span className="text-[10px] text-rose-600 font-semibold mt-2 pt-2 border-t border-slate-100 w-full truncate">
            {client.campaignType}
          </span>

        </div>
      ))}
    </div>

    {/* View All Button */}
    <div className="mt-10 text-center">
      <Link
        to="/our-clients"
        className="inline-flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-800 hover:text-rose-600 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-xs"
      >
        <span>View All Featured Clients & Sector Matrix</span>
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>

  </div>
</section>

      {/* ========================================================= */}
      {/* 6. CLIENT REVIEWS                                         */}
      {/* ========================================================= */}
      <section className="py-20 bg-slate-900 text-white relative overflow-hidden" id="client-reviews">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Verified Feedback
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1">
              Client Reviews
            </h2>
            <p className="mt-2 text-slate-400 text-sm">
              What corporate marketing heads and brand leaders say about our on-ground execution.
            </p>
          </div>

          {/* Testimonial Presentation */}
          <div className="max-w-4xl mx-auto bg-slate-800/90 rounded-3xl p-8 sm:p-12 border border-slate-700 shadow-2xl relative">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(testimonialsData[activeReviewIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <span className="text-xs font-mono text-slate-400">
                Review 0{activeReviewIndex + 1} / 0{testimonialsData.length}
              </span>
            </div>

            <blockquote className="text-lg sm:text-xl text-slate-100 font-normal leading-relaxed italic">
              "{testimonialsData[activeReviewIndex].quote}"
            </blockquote>

            <div className="mt-8 pt-6 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-white">
                  {testimonialsData[activeReviewIndex].clientName}
                </h4>
                <p className="text-xs text-rose-400 font-semibold mt-0.5">
                  {testimonialsData[activeReviewIndex].designation}
                </p>
                <p className="text-xs text-slate-400">
                  {testimonialsData[activeReviewIndex].companyName}
                </p>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevReview}
                  className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  aria-label="Previous Review"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={nextReview}
                  className="p-2.5 rounded-full bg-slate-900 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                  aria-label="Next Review"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* 7. CONTACT / CTA                                          */}
      {/* ========================================================= */}
      <section className="py-20 bg-white border-t border-slate-200" id="contact-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-rose-950 rounded-3xl p-8 sm:p-12 lg:p-16 text-white shadow-2xl relative overflow-hidden border border-slate-800">
            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
              {/* Left Column: Direct Action & Information */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
                    Get In Touch
                  </span>
                  <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mt-1 leading-tight">
                    Ready to Launch Your Next High-Impact Campaign?
                  </h2>
                  <p className="mt-4 text-base text-slate-300 leading-relaxed">
                    Connect directly with our senior media planners for custom site availability, highway wall routes, vehicle fabrication estimates, and media rate cards.
                  </p>
                </div>

                <div className="space-y-3 pt-2 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <PhoneCall className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Direct Call: +919999688445/ 011-44725827</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Email: info@brandsolution.in</span>
                    dinesh@brandsolution.in
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>Corporate Office: 213-214 2nd floor harsha complex ghazipur delhi-110096 </span>
                    
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to="/book-now"
                    className="px-6 py-3.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-lg transition-all"
                  >
                    Book a Campaign Now
                  </Link>

                  <a
                    href="https://wa.me/919999688445?text=Hello%20Marcom%20Brand%20Solution,%20I%20would%20like%20to%20request%20a%20rate%20card."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-lg transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Right Column: Quick Callback Form */}
              <div className="lg:col-span-6 bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/15">
                <h3 className="text-lg font-bold text-white mb-2">
                  Request a Quick Callback
                </h3>
                <p className="text-xs text-slate-300 mb-6">
                  Fill in your details and our planning team will get back to you within 2 hours.
                </p>

                {formSent ? (
                  <div className="p-6 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-center space-y-3">
                    <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                    <h4 className="text-base font-bold text-white">Inquiry Received &amp; Logged</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Your callback enquiry has been sent to{' '}
                      <strong className="text-emerald-300">{TARGET_NOTIFICATION_EMAIL}</strong> and logged into our Google Sheets dispatch queue.
                    </p>

                    {contactDispatchInfo && (
                      <div className="p-2.5 bg-slate-900/80 rounded-lg border border-slate-700 text-xs text-slate-300 flex items-center justify-between">
                        <span>Ref ID:</span>
                        <span className="font-mono font-bold text-emerald-400">
                          {contactDispatchInfo.referenceId}
                        </span>
                      </div>
                    )}

                    <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2">
                      {contactDispatchInfo?.mailtoUrl && (
                        <a
                          href={contactDispatchInfo.mailtoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-lg border border-slate-700 flex items-center justify-center gap-1.5"
                        >
                          <Mail className="w-3.5 h-3.5 text-rose-400" />
                          <span>Open Email Copy</span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          setFormSent(false);
                          setContactDispatchInfo(null);
                          setContactPhone('');
                          setContactName('');
                        }}
                        className="w-full sm:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg"
                      >
                        Submit Another
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleQuickContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        placeholder="Rajesh Kumar / Company Name"
                        className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-rose-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">
                        Mobile / WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        placeholder="+91 98765XXXXX"
                        className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-rose-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Service Required
                        </label>
                        <select
                          value={contactService}
                          onChange={(e) => setContactService(e.target.value)}
                          className="w-full px-3 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white focus:outline-hidden focus:border-rose-500"
                        >
                          <option value="Wall Painting Advertising">Wall Painting</option>
                          <option value="Mobile Van Activity">Mobile Van Activity</option>
                          <option value="Outdoor Advertising">Outdoor Hoardings</option>
                          <option value="Signage & Fabrication">Signage & Fabrication</option>
                          <option value="BTL Activation">BTL Activation</option>
                          <option value="Metro & Transit Branding">Metro Branding</option>
                          <option value="Corporate Event Services">Corporate Events</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-300 mb-1">
                          Target Location / City
                        </label>
                        <input
                          type="text"
                          value={contactLocation}
                          onChange={(e) => setContactLocation(e.target.value)}
                          placeholder="e.g. UP, Delhi, Bihar"
                          className="w-full px-3.5 py-2.5 bg-slate-900/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-rose-500"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingContact}
                      className="w-full py-3.5 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 disabled:opacity-50 text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
                    >
                      <span>{isSubmittingContact ? 'Sending...' : 'Get Instant Rate Card & Callback'}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLOATING WHATSAPP CHAT BUTTON & POPUP WIDGET */}
      <WhatsAppWidget />
    </div>
  );
};
