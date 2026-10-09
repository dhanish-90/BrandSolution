import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { getMainPhotoForService, getServicePhotos } from '../data/servicePhotoStore';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Calendar,
  MessageCircle,
  Play,
  Pause
} from 'lucide-react';

interface HeroSlide {
  id: number;
  serviceSlug: string;
  title: string;
  tagline: string;
  description: string;
  link: string;
  tag: string;
  accent: string;
  stat: string;
  statLabel: string;
  photoKeyword: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    serviceSlug: 'wall-painting-advertising',
    title: 'Wall Painting Advertising',
    tagline: 'High-Impact Regional Line of Sight',
    description: 'High-impact wall branding transforming large public walls, flyovers, highways, and rural markets into 24/7 uncluttered brand assets across India.',
    link: '/services/wall-painting-advertising',
    tag: 'National Specialty Since 2000',
    accent: '#c81e2b',
    stat: '5,000+',
    statLabel: 'Highway & City Walls Executed',
    photoKeyword: 'Dhārā Highway Mural Campaign'
  },
  {
    id: 2,
    serviceSlug: 'mobile-van-activity',
    title: 'Mobile Van Activity',
    tagline: 'On-Ground Experiential Roadshows',
    description: 'Take your brand directly to the audience with customized stage vans, 4K outdoor LED video screens, live product sampling, and sound systems.',
    link: '/services/mobile-van-activity',
    tag: 'Direct Consumer Engagement',
    accent: '#0284c7',
    stat: '250+',
    statLabel: 'Towns & Mandis Covered Monthly',
    photoKeyword: 'Roadshow Display Van with 4K LED Screen'
  },
  {
    id: 3,
    serviceSlug: 'outdoor-advertising',
    title: 'Bus & Highway Transit Media',
    tagline: 'Rolling Megasites in High-Density Corridors',
    description: 'Turn everyday journeys into brand experiences with high-visibility bus branding across busy interstate highways, city hubs, and arterial transit routes.',
    link: '/services/outdoor-advertising',
    tag: 'Mass Mobility Reach',
    accent: '#d97706',
    stat: '1.2M+',
    statLabel: 'Daily Roadside Impressions',
    photoKeyword: 'State Transit Bus Full Wrap'
  },
  {
    id: 4,
    serviceSlug: 'train-branding',
    title: 'Train Branding',
    tagline: 'Pan-India Commuter Saturation',
    description: 'Reach millions of inter-city commuters with high-dwell train wrapping across major Indian Railway networks and metropolitan rapid transit corridors.',
    link: '/services/train-branding',
    tag: 'National Rail Media',
    accent: '#059669',
    stat: '10M+',
    statLabel: 'Inter-City Commuters Reached',
    photoKeyword: 'Indian Railways Express Coach Wrap'
  },
  {
    id: 5,
    serviceSlug: 'signage-fabrication',
    title: 'Signage & Fabrication Advertising',
    tagline: 'Architectural Glow Signs & 3D Letters',
    description: 'Precision engineered 3D acrylic channel letters, ACP cladding, directional pylons, and IP67 LED glow signs manufactured in our in-house plant.',
    link: '/services/signage-fabrication',
    tag: 'In-House Fabrication Plant',
    accent: '#9333ea',
    stat: '500+',
    statLabel: 'Commercial Outlets Rebranded',
    photoKeyword: '3D Front-Lit Acrylic LED Signage'
  },
  {
    id: 6,
    serviceSlug: 'btl-activation',
    title: 'BTL Activation',
    tagline: 'Tactile Consumer Touchpoints',
    description: 'Interactive on-ground campaigns that connect your brand directly with customers through premier mall activations, sampling drives, and pop-up canopies.',
    link: '/services/btl-activation',
    tag: 'Experiential Footfalls',
    accent: '#e11d48',
    stat: '100K+',
    statLabel: 'Verified Consumer Interactions',
    photoKeyword: 'Mall & Canopy Sampling Pavilion'
  },
  {
    id: 7,
    serviceSlug: 'metro-transit-branding',
    title: 'Metro Branding',
    tagline: 'Prime Urban Infrastructure Media',
    description: 'High-visibility branding across metro stations, pillar wraps, and transit spaces for maximum audience reach among affluent, daily urban commuters.',
    link: '/services/metro-transit-branding',
    tag: 'Metropolitan Corridors',
    accent: '#2563eb',
    stat: '100% Clutter-Free',
    statLabel: 'Illuminated Premium Displays',
    photoKeyword: 'Metro Pillars & Station Concourse Wraps'
  },
  {
    id: 8,
    serviceSlug: 'corporate-events',
    title: 'Corporate Event Services',
    tagline: 'End-to-End Production & Staging',
    description: 'End-to-end corporate event solutions that deliver memorable experiences, from 3D CAD stage design to curved 4K LED video backdrops and audio-visuals.',
    link: '/services/corporate-events',
    tag: 'VIP Stage & Production',
    accent: '#f59e0b',
    stat: '500-5,000',
    statLabel: 'Delegate Event Capacity',
    photoKeyword: 'Leadership Summit Arena & Curved LED'
  }
];

export const HeroSlider: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [, setRefreshKey] = useState(0);
  const slideDuration = 6500; // 6.5s per slide

  const active = slides[currentSlide];
  const activePhotoUrl = getMainPhotoForService(active.serviceSlug);
  const activeCollection = getServicePhotos(active.serviceSlug);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setProgress(0);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setProgress(0);
  }, []);

  // Automatic slide interval with progress bar
  useEffect(() => {
    if (!isPlaying) return;

    const intervalTime = 50;
    const increment = (intervalTime / slideDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          nextSlide();
          return 0;
        }
        return prev + increment;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isPlaying, nextSlide, slideDuration]);

  // Listen to photo update events
  useEffect(() => {
    const handleUpdate = () => setRefreshKey((k) => k + 1);
    window.addEventListener('marcom_photos_updated', handleUpdate);
    return () => window.removeEventListener('marcom_photos_updated', handleUpdate);
  }, []);

  return (
    <div
      className="relative overflow-hidden bg-slate-950 text-white min-h-[600px] lg:min-h-[680px] flex flex-col justify-between select-none"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* ========================================================= */}
      {/* 1. CINEMATIC FULL-BLEED SLIDE BACKGROUND PHOTO            */}
      {/* ========================================================= */}
      <div className="absolute inset-0 z-0">
        {/* Full-bleed active photo corresponding to the current slide */}
        <img
          key={active.serviceSlug + activePhotoUrl}
          src={activePhotoUrl}
          alt={active.title}
          className="w-full h-full object-cover object-center animate-in fade-in zoom-in-95 duration-700 filter brightness-90"
        />

        {/* Sophisticated gradient scrim: dark on left for text legibility, clear on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      </div>

      {/* ========================================================= */}
      {/* 2. FOREGROUND CONTENT THAT CHANGES ACCORDING TO PHOTO     */}
      {/* (VERIFIED PHOTO EXECUTION BOX DELETED AS REQUESTED)       */}
      {/* ========================================================= */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20 z-10 w-full flex-1 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Top Kicker Bar with Category and Tagline */}
          <div className="flex items-center gap-3 mb-4 flex-wrap">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400 bg-rose-950/90 border border-rose-800/80 px-3 py-1 rounded-md shadow-xs">
              {active.tag}
            </span>
            <span className="text-slate-300 text-xs font-semibold flex items-center gap-1.5 drop-shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {active.tagline}
            </span>
          </div>

          {/* Slide Title matching the photo */}
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight drop-shadow-md text-balance">
            {active.title}
          </h1>

          {/* Slide Description */}
          <p className="mt-4 text-base sm:text-lg text-slate-100 leading-relaxed drop-shadow-xs font-normal max-w-2xl">
            {active.description}
          </p>

          {/* Metrics Pill & Pan-India Badge */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2.5 py-2 px-3.5 rounded-lg bg-slate-900/90 border border-slate-700/80 text-xs text-slate-200 backdrop-blur-md shadow-md">
              <span className="font-mono text-sm font-extrabold text-white">
                {active.stat}
              </span>
              <span className="text-slate-300 font-medium">{active.statLabel}</span>
            </div>

            <div className="inline-flex items-center gap-2 py-2 px-3 rounded-lg bg-slate-900/85 border border-slate-800 text-xs text-slate-300 backdrop-blur-md">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Pan-India Ground Audited Inventory</span>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-3.5">
            <Link
              to={active.link}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm sm:text-base font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-xl shadow-lg hover:shadow-rose-600/30 transition-all cursor-pointer group"
            >
              <span>Explore Service</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              to="/book-now"
              className="inline-flex items-center gap-2 px-5 py-3.5 text-sm sm:text-base font-bold text-white bg-slate-900/90 hover:bg-slate-800 rounded-xl border border-slate-700 hover:border-slate-500 backdrop-blur-md transition-all cursor-pointer"
            >
              <span>Book a Campaign</span>
              <Calendar className="w-4 h-4 text-slate-300" />
            </Link>

            <a
              href={`https://wa.me/919999688445?text=${encodeURIComponent(
                `Hello Marcom Brand Solution, I want to book an advertising campaign for: ${active.title}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3.5 text-sm sm:text-base font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-xl shadow-md transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. BOTTOM SLIDE STRIP: THUMBNAILS & TRANSITION CONTROLS   */}
      {/* ========================================================= */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full border-t border-slate-800/80 bg-slate-950/75 backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Thumbnails of All 8 Slides with Visible Photos */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0 scrollbar-none w-full sm:w-auto">
            {slides.map((slide, index) => {
              const thumbImg = getMainPhotoForService(slide.serviceSlug);
              const isActive = currentSlide === index;

              return (
                <button
                  key={slide.id}
                  onClick={() => {
                    setCurrentSlide(index);
                    setProgress(0);
                  }}
                  className={`flex items-center gap-2 px-2.5 py-1.5 rounded-xl border transition-all cursor-pointer shrink-0 text-left ${
                    isActive
                      ? 'bg-slate-900 border-rose-500 shadow-md ring-1 ring-rose-500/40'
                      : 'bg-slate-950/80 border-slate-800 hover:border-slate-700 opacity-60 hover:opacity-100'
                  }`}
                  title={slide.title}
                >
                  <div className="w-9 h-6 rounded-md overflow-hidden bg-slate-900 border border-slate-700 shrink-0">
                    <img
                      src={thumbImg}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-[11px] font-bold text-white whitespace-nowrap max-w-[100px] truncate">
                    {slide.title.replace(' Advertising', '').replace(' Services', '')}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Slide Navigation & Indicator */}
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-300 hidden sm:inline">
              Slide: <strong className="text-white">0{active.id} / 0{slides.length}</strong>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={prevSlide}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Previous Slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextSlide}
                className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
                aria-label="Next Slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
