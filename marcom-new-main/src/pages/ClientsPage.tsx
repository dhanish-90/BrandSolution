import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { clientsData, clientCategories, testimonialsData } from '../data/clientsData';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  ArrowRight,
  ShieldCheck,
  Star,
  Building2,
  CheckCircle,
  Quote,
  ChevronLeft,
  ChevronRight,
  Layers
} from 'lucide-react';

export const ClientsPage: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string>('All Sectors');
  const [activeTestimonial, setActiveTestimonial] = useState<number>(0);
  const [activeClientLogo, setActiveClientLogo] = useState<number>(0);

  const filteredClients = selectedSector === 'All Sectors'
    ? clientsData
    : clientsData.filter((c) => c.sector === selectedSector);
  const clientLogoSlides = clientsData.filter((client) =>
    client.logoUrl?.startsWith('/images/Client%20Logo/')
  );

  useEffect(() => {
    if (clientLogoSlides.length < 2) return;

    const intervalId = window.setInterval(() => {
      setActiveClientLogo((current) => (current + 1) % clientLogoSlides.length);
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [clientLogoSlides.length]);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);
  };

  const showPreviousClientLogo = () => {
    setActiveClientLogo((current) => (current - 1 + clientLogoSlides.length) % clientLogoSlides.length);
  };

  const showNextClientLogo = () => {
    setActiveClientLogo((current) => (current + 1) % clientLogoSlides.length);
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'Our Clients' }]} />

          <div className="mt-4 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              Trusted Partnerships Since 2000
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2 leading-tight">
              Our Clients & Industry Partners
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              We take immense pride in having partnered with over 100+ premier corporations, multinationals, public sector enterprises, and market disruptors across India for high-impact outdoor media, wall painting, and brand activations.
            </p>
          </div>

          {/* Sector Filter Bar */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {clientCategories.map((sector) => (
              <button
                key={sector}
                type="button"
                onClick={() => setSelectedSector(sector)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedSector === sector
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {sector}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Client Logo Wall / Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
              Corporate Client Roster
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Showing {filteredClients.length} verified client partners in {selectedSector}
            </p>
          </div>
          <span className="text-xs text-slate-400 font-medium hidden sm:inline">
            100% Authentic Brand Executions
          </span>
        </div>

        {/* Client Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-5">
          {filteredClients.map((client) => (
            <div
              key={client.id}
              className="group bg-white p-5 rounded-2xl border border-slate-200/90 hover:border-slate-300 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center"
            >
              {client.logoUrl && (
                <img
                  src={client.logoUrl}
                  alt={`${client.name} logo`}
                  className="w-full h-36 object-contain mb-4 group-hover:scale-105 transition-transform"
                />
              )}
              <h3 className="text-base font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
                {client.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Automatic Client Logo Slider */}
        {clientLogoSlides.length > 0 && (
          <section
            className="mt-20 py-12 px-4 sm:px-8 bg-white rounded-3xl border border-slate-200"
            aria-label="Client company logos"
            aria-roledescription="carousel"
          >
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
                Trusted By
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Our Company Logos
              </h2>
            </div>

            <div className="flex items-center gap-3 sm:gap-6 max-w-4xl mx-auto">
              <button
                type="button"
                onClick={showPreviousClientLogo}
                className="shrink-0 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                aria-label="Previous client logo"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="overflow-hidden flex-1">
                <div
                  className="flex transition-transform duration-700 ease-in-out"
                  style={{ transform: `translateX(-${activeClientLogo * 100}%)` }}
                >
                  {clientLogoSlides.map((client) => (
                    <div
                      key={`${client.id}-${client.logoUrl}`}
                      className="min-w-full flex flex-col items-center justify-center"
                    >
                      <img
                        src={client.logoUrl}
                        alt={`${client.name} logo`}
                        className="w-full h-48 sm:h-64 object-contain"
                      />
                      <p className="mt-4 text-base font-bold text-slate-900">
                        {client.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <button
                type="button"
                onClick={showNextClientLogo}
                className="shrink-0 p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                aria-label="Next client logo"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            <div className="mt-6 flex justify-center gap-2">
              {clientLogoSlides.map((client, index) => (
                <button
                  key={`${client.id}-${index}`}
                  type="button"
                  onClick={() => setActiveClientLogo(index)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    activeClientLogo === index ? 'w-6 bg-rose-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Show ${client.name} logo`}
                  aria-current={activeClientLogo === index ? 'true' : undefined}
                />
              ))}
            </div>
          </section>
        )}

        {/* 10. Client Reviews & Testimonials Section */}
        <div className="mt-20 pt-16 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Verified Testimonials
            </span>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              What Our Clients Say
            </h2>
            <p className="mt-2 text-slate-600 text-sm">
              Authentic feedback and campaign reviews from our corporate partners.
            </p>
          </div>

          {/* Interactive Testimonial Slider */}
          <div className="max-w-4xl mx-auto bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg relative">
            <Quote className="w-12 h-12 text-rose-100 absolute top-8 right-8 pointer-events-none" />

            <div className="flex items-center gap-1 text-amber-400 mb-6">
              {[...Array(testimonialsData[activeTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-amber-400" />
              ))}
            </div>

            <blockquote className="text-lg sm:text-xl text-slate-800 font-normal leading-relaxed italic">
              "{testimonialsData[activeTestimonial].quote}"
            </blockquote>

            <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h4 className="text-base font-bold text-slate-900">
                  {testimonialsData[activeTestimonial].clientName}
                </h4>
                <p className="text-xs text-rose-600 font-semibold mt-0.5">
                  {testimonialsData[activeTestimonial].designation}
                </p>
                <p className="text-xs text-slate-500 font-medium">
                  {testimonialsData[activeTestimonial].companyName}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevTestimonial}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  aria-label="Previous Testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-mono text-xs text-slate-400 px-2">
                  0{activeTestimonial + 1} / 0{testimonialsData.length}
                </span>
                <button
                  type="button"
                  onClick={nextTestimonial}
                  className="p-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
                  aria-label="Next Testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="mt-6 text-center text-[11px] text-slate-400 italic">
              * Client testimonials reflect verified campaign performance and may be customized upon request.
            </div>
          </div>
        </div>

        {/* Call to Action Bar */}
        <div className="mt-16 bg-slate-900 rounded-2xl p-8 sm:p-10 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div>
            <h3 className="text-xl font-bold text-white">
              Join Our Prestigious Roster of Successful Brands
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xl">
              From regional multi-wall initiatives to pan-India transit dominance, we deliver audited return on your media investment.
            </p>
          </div>
          <Link
            to="/book-now"
            className="px-6 py-3 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shrink-0 transition-colors shadow-sm"
          >
            Start Your Campaign
          </Link>
        </div>
      </div>
    </div>
  );
};
