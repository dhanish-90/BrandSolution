import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { getEditableServiceBySlug, getEditableServices } from '../data/editableServicesStore';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  getServicePhotos,
  getMainPhotoForService,
  GalleryPhoto
} from '../data/servicePhotoStore';
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  MapPin,
  Clock,
  ShieldCheck,
  Target,
  Maximize2,
  PhoneCall,
  MessageCircle
} from 'lucide-react';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [zoomedPhoto, setZoomedPhoto] = useState<GalleryPhoto | null>(null);

  const service = getEditableServiceBySlug(slug || '');

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const activePhoto = getMainPhotoForService(service.slug);
  const collection = getServicePhotos(service.slug);

  // Related services
  const relatedServices = getEditableServices()
    .filter((s) => s.slug !== service.slug)
    .slice(0, 3);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Large Hero Header Banner with Real Photo Background */}
      <div className="relative bg-slate-950 text-white py-16 lg:py-24 overflow-hidden border-b border-slate-800">
        {/* Real Photo Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src={activePhoto}
            alt={service.title}
            className="w-full h-full object-cover object-center filter brightness-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb
            items={[
              { label: 'Services', href: '/services' },
              { label: service.title }
            ]}
          />

          <div className="mt-6 max-w-3xl">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/80 border border-rose-800/80 px-3 py-1 rounded-md">
                {service.category}
              </span>
              <span className="text-slate-300 text-xs font-semibold">
                Since 2000 • Pan-India Verified Execution
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              {service.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
              {service.fullDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to={`/book-now?service=${encodeURIComponent(service.title)}`}
                className="px-6 py-3.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Book This Service</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <a
                href={`https://wa.me/919810800000?text=${encodeURIComponent(
                  `Hello Marcom Brand Solution, I want to inquire about rates for: ${service.title}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Rates</span>
              </a>

              <a
                href="tel:+919810800000"
                className="px-5 py-3.5 text-sm font-bold text-slate-200 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all flex items-center gap-2 cursor-pointer"
              >
                <PhoneCall className="w-4 h-4 text-rose-400" />
                <span>Call Media Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview / Scope */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Service Overview
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1 mb-4">
                Strategic Scope &amp; Delivery Capabilities
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                {service.fullDescription}
              </p>
            </section>

            {/* VERIFIED EXECUTION GALLERY (CLEAN PORTFOLIO DISPLAY) */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/90 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-100">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                    Verified Execution Showcase
                  </span>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1">
                    {service.title} — Campaign Portfolio
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Click any photograph to view high-resolution verification inspection.
                  </p>
                </div>

                <span className="text-xs text-slate-400 font-medium">
                  {collection.photos.length} Verified Locations
                </span>
              </div>

              {/* Photo Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {collection.photos.map((photo) => (
                  <div
                    key={photo.id}
                    onClick={() => setZoomedPhoto(photo)}
                    className="group rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 hover:border-slate-400 transition-all flex flex-col justify-between cursor-pointer hover:shadow-md"
                  >
                    {/* Visual Image */}
                    <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-950">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <div className="absolute top-2.5 right-2.5 z-10 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="p-1.5 rounded-lg bg-black/75 text-white text-xs shadow-md flex items-center gap-1">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </span>
                      </div>

                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[11px] text-white">
                        <span className="flex items-center gap-1 bg-black/70 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10">
                          <MapPin className="w-3 h-3 text-rose-400" />
                          <span className="truncate max-w-[140px]">{photo.location}</span>
                        </span>
                      </div>
                    </div>

                    {/* Photo Details */}
                    <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                      <div>
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                          {photo.title}
                        </h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                          {photo.caption}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Verified Execution</span>
                        </span>
                        <span className="text-rose-600 font-bold group-hover:underline">
                          View Full Screen →
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Sub-Services Grid */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Service Breakdown
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1 mb-6">
                Specialized Sub-Formats &amp; Capabilities
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.subServices.map((sub, i) => (
                  <div
                    key={i}
                    className="p-5 rounded-xl border border-slate-200/90 bg-slate-50/50 hover:bg-white hover:border-slate-300 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-600 shrink-0 mt-1.5" />
                      <div>
                        <h3 className="text-base font-bold text-slate-900">
                          {sub.name}
                        </h3>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                          {sub.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Benefits & Impact */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Why Choose Marcom Brand Solution
              </span>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mt-1 mb-6">
                Key Benefits &amp; Campaign Advantages
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {service.benefits.map((benefit, i) => (
                  <div key={i} className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-slate-800">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Suitable Campaign Types */}
            <section className="bg-white rounded-2xl p-8 border border-slate-200/90 shadow-xs">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-5 h-5 text-rose-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  Ideal Applications
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight mb-6">
                Recommended For Campaigns Such As
              </h2>

              <div className="flex flex-wrap gap-2.5">
                {service.suitableCampaigns.map((camp, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700"
                  >
                    • {camp}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Specifications & Sticky Booking CTA */}
          <div className="lg:col-span-4 space-y-8">
            {/* Quick Specs Box */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
              <h3 className="text-base font-bold text-slate-900 mb-4 pb-3 border-b border-slate-100 flex items-center justify-between">
                <span>Technical Specifications</span>
                <span className="text-xs font-mono text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                  Since 2000
                </span>
              </h3>

              <div className="space-y-4">
                {service.specs.map((spec, i) => (
                  <div key={i} className="text-xs">
                    <span className="text-slate-400 block font-medium">{spec.label}</span>
                    <span className="text-slate-800 font-bold mt-0.5 block">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Booking Widget */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 border border-slate-800 shadow-xl space-y-5">
              <div>
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-rose-400">
                  Direct Media Booking
                </span>
                <h3 className="text-lg font-bold text-white mt-1">
                  Plan a {service.title} Campaign
                </h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Submit campaign dates and target districts to receive customized site recce and rate estimate.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  to={`/book-now?service=${encodeURIComponent(service.title)}`}
                  className="w-full py-3 bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Submit Campaign Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href={`https://wa.me/919810800000?text=${encodeURIComponent(
                    `Hello Marcom Brand Solution, I want to inquire about rates for: ${service.title}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-400 space-y-1.5">
                <p className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% Legal Municipal Approvals</span>
                </p>
                <p className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Pan-India Single-Point Accountability</span>
                </p>
              </div>
            </div>

            {/* Related Services */}
            <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                Other Advertising Services
              </h4>
              <div className="space-y-3">
                {relatedServices.map((rel) => (
                  <Link
                    key={rel.id}
                    to={`/services/${rel.slug}`}
                    className="group block p-3 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50 transition-all"
                  >
                    <h5 className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                      {rel.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                      {rel.shortDescription}
                    </p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox / Zoomed Full-Screen Modal */}
      {zoomedPhoto && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-in fade-in"
          onClick={() => setZoomedPhoto(null)}
        >
          <div className="relative max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setZoomedPhoto(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-rose-400 text-sm font-bold flex items-center gap-1 cursor-pointer"
            >
              ✕ Close
            </button>
            <div className="rounded-2xl overflow-hidden border-2 border-slate-700 shadow-2xl bg-black">
              <img
                src={zoomedPhoto.url}
                alt={zoomedPhoto.title}
                className="w-full h-auto max-h-[80vh] object-contain mx-auto"
              />
            </div>
            <div className="mt-3 p-4 bg-slate-900 rounded-xl border border-slate-800 text-white flex items-center justify-between">
              <div>
                <h4 className="font-bold text-amber-300">{zoomedPhoto.title}</h4>
                <p className="text-xs text-slate-300">{zoomedPhoto.caption}</p>
              </div>
              <span className="text-xs text-slate-400">{zoomedPhoto.location}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
