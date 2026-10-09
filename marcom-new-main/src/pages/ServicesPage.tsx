import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getEditableServices } from '../data/editableServicesStore';
import { Breadcrumb } from '../components/Breadcrumb';
import { getMainPhotoForService } from '../data/servicePhotoStore';
import {
  ArrowRight,
  Layers,
  CheckCircle2
} from 'lucide-react';

export const ServicesPage: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [servicesList, setServicesList] = useState(getEditableServices());

  // Listen to service update events
  useEffect(() => {
    const handleUpdate = () => {
      setServicesList(getEditableServices());
    };

    window.addEventListener('marcom_services_updated', handleUpdate);
    return () => {
      window.removeEventListener('marcom_services_updated', handleUpdate);
    };
  }, []);

  const categories = [
    'All',
    'Outdoor & Mural Media',
    'On-Ground Mobile Media',
    'Retail & Commercial Branding',
    'OOH & Large-Format Media',
    'Signage & Structural Fabrication',
    'Experiential & Consumer Activation',
    'Transit & Mass Mobility Media',
    'Corporate Production & Events'
  ];

  const filteredServices = selectedFilter === 'All'
    ? servicesList
    : servicesList.filter((s) => s.category === selectedFilter);

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Page Header Banner */}
      <div className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'Services' }]} />

          <div className="mt-4 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              Complete Capabilities Spectrum
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2 leading-tight">
              Advertising Services &amp; Categories
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              From large-scale highway wall paintings to pan-India transit wraps, mobile van roadshows, retail branding, and high-prestige corporate productions. Proven pan-India delivery across 28 states and Union Territories.
            </p>
          </div>

          {/* Quick Filter Navigation Buttons */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedFilter(cat)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === cat
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Services List / Grid Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="space-y-12">
          {filteredServices.map((service) => {
            const photoUrl = getMainPhotoForService(service.slug);

            return (
              <div
                key={service.id || service.slug}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all overflow-hidden"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Real Photo Visual Container */}
                  <Link
                    to={`/services/${service.slug}`}
                    className="lg:col-span-5 relative bg-slate-950 p-8 flex flex-col justify-between text-white min-h-[320px] lg:min-h-[400px] overflow-hidden group block"
                  >
                    {/* The photograph */}
                    <img
                      src={photoUrl}
                      alt={service.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/30" />

                    <div className="relative z-10 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-rose-200 bg-slate-950/80 backdrop-blur-xs px-3 py-1 rounded-md border border-white/10">
                        {service.category}
                      </span>
                    </div>

                    <div className="relative z-10 my-auto pt-6">
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
                        {service.title}
                      </h3>
                      <p className="text-xs text-amber-300 font-semibold mt-1">
                        {service.heroTagline}
                      </p>
                    </div>

                    <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/20 text-xs text-white/90">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        Since 2000
                      </span>
                      <span className="font-semibold text-rose-300">
                        Pan-India Delivery
                      </span>
                    </div>

                    {/* Accent Line */}
                    <div className="absolute bottom-0 inset-x-0 h-1.5 bg-rose-600 z-10" />
                  </Link>

                  {/* Details Container */}
                  <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-2">
                        <Layers className="w-4 h-4" />
                        <span>{service.subServices.length} Specialized Capabilities</span>
                      </div>

                      <p className="text-base text-slate-700 leading-relaxed font-normal">
                        {service.fullDescription}
                      </p>

                      {/* Sub-services Grid */}
                      <div className="mt-6 pt-6 border-t border-slate-100">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                          Sub-Services &amp; Formats Included:
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {service.subServices.map((sub, i) => (
                            <div
                              key={i}
                              className="p-3 bg-slate-50 rounded-xl border border-slate-100"
                            >
                              <h5 className="text-xs font-bold text-slate-900">
                                {sub.name}
                              </h5>
                              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-2">
                                {sub.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Action Bar */}
                    <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <span className="text-xs text-slate-500 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Audited GPS Photo Execution
                      </span>

                      <div className="flex items-center gap-3 w-full sm:w-auto">
                        <Link
                          to={`/services/${service.slug}`}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-slate-800 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-all cursor-pointer"
                        >
                          <span>Explore Details</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>

                        <Link
                          to={`/book-now?service=${encodeURIComponent(service.title)}`}
                          className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-xs transition-all cursor-pointer"
                        >
                          <span>Book Campaign</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
