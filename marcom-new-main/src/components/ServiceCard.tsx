import React from 'react';
import { Link } from 'react-router-dom';
import { ServiceDetail } from '../types';
import { getMainPhotoForService } from '../data/servicePhotoStore';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

interface ServiceCardProps {
  service: ServiceDetail;
  index: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const mainPhoto = getMainPhotoForService(service.slug);

  return (
    <div className="group relative flex flex-col bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
      {/* Real Visual Photo Header Banner */}
      <Link
        to={`/services/${service.slug}`}
        className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950 flex flex-col justify-between text-white block"
      >
        {/* Main Photo Image */}
        <img
          src={mainPhoto}
          alt={service.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 filter brightness-95"
        />

        {/* Contrast Gradient Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-slate-950/50" />

        {/* Top Badges */}
        <div className="relative z-10 flex items-center justify-between p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300 bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-md border border-white/10 shadow-xs">
            {service.category}
          </span>
          <span className="font-mono text-xs text-white font-extrabold bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded-md border border-white/10">
            0{index + 1}
          </span>
        </div>

        {/* Bottom Tag Badge */}
        <div className="relative z-10 mt-auto p-4 flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-xs text-[11px] font-semibold text-white border border-white/20">
            <span className="text-slate-300">Format:</span>
            <span className="text-amber-400 font-bold truncate max-w-[180px]">
              {service.title}
            </span>
          </div>
        </div>

        {/* Color accent line on bottom of image */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-rose-600 transition-all group-hover:h-1.5 z-10" />
      </Link>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/services/${service.slug}`}>
            <h3 className="text-xl font-bold text-slate-900 group-hover:text-rose-600 transition-colors">
              {service.title}
            </h3>
          </Link>

          <p className="mt-2.5 text-sm text-slate-600 leading-relaxed line-clamp-3">
            {service.shortDescription}
          </p>

          {/* Sub-services highlight pills/list */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Key Capabilities
            </p>
            <ul className="space-y-1.5 text-xs text-slate-700">
              {service.subServices.slice(0, 3).map((sub, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-600 font-bold shrink-0">✓</span>
                  <span className="truncate">{sub.name}</span>
                </li>
              ))}
              {service.subServices.length > 3 && (
                <li className="text-[11px] text-slate-400 font-medium pl-4">
                  +{service.subServices.length - 3} more sub-categories
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Card Footer Actions */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
          <Link
            to={`/book-now?service=${encodeURIComponent(service.title)}`}
            className="text-xs font-bold text-slate-700 hover:text-rose-600 bg-slate-100 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition-colors"
          >
            Book Campaign
          </Link>

          <Link
            to={`/services/${service.slug}`}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-rose-600 group-hover:text-rose-700 transition-colors"
          >
            <span>Explore</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
