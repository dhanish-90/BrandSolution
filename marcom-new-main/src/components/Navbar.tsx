import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Logo } from './Logo';
import { getEditableServices } from '../data/editableServicesStore';
import {
  ChevronDown,
  Menu,
  X,
  PhoneCall,
  ArrowRight,
  Sparkles,
  Layers,
  MapPin,
  MessageCircle
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [servicesList, setServicesList] = useState(getEditableServices());
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Listen to services store updates
  useEffect(() => {
    const handleUpdate = () => {
      setServicesList(getEditableServices());
    };
    window.addEventListener('marcom_services_updated', handleUpdate);
    return () => window.removeEventListener('marcom_services_updated', handleUpdate);
  }, []);

  // Scroll detection for sticky header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdownOpen(false);
  }, [location.pathname]);

  // Click outside to close services dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setServicesDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <>
      {/* Top Utility Bar with Pan-India Presence & Phone */}
      {/* <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-6 hidden sm:block border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-rose-500" />
              Pan-India Execution Network • 28 States &amp; UTs
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-slate-400">
              Tender &amp; Corporate Empaneled Media Agency
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="tel:+919810800000"
              className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors"
            >
              <PhoneCall className="w-3 h-3 text-rose-500" />
              <span className="font-semibold">+91 98108 0XXXXX</span>
            </a>
            <span className="text-slate-600">|</span>
            <Link
              to="/contact-us"
              className="text-slate-300 hover:text-rose-400 transition-colors"
            >
              info@brandsolution.in
            </Link>
          </div>
        </div>
      </div> */}

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
            : 'bg-white border-b border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Zone 1: Brand Wordmark */}
            <div className="shrink-0">
              <Logo size="md" />
            </div>

            {/* Zone 2: Navigation Links (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              <Link
                to="/"
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                  isActive('/') && location.pathname === '/'
                    ? 'text-rose-600 bg-rose-50/60'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              {/* Services with Dropdown Feature & Work Preview */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                    isActive('/services')
                      ? 'text-rose-600 bg-rose-50/60'
                      : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                  aria-expanded={servicesDropdownOpen}
                >
                  <span>Services</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      servicesDropdownOpen ? 'rotate-180 text-rose-600' : 'text-slate-400'
                    }`}
                  />
                </button>

                {/* Dropdown Menu with Services Highlights */}
                {servicesDropdownOpen && (
                  <div
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-[780px] bg-white rounded-xl shadow-2xl border border-slate-200/90 p-5 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
                  >
                    <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <Layers className="w-4 h-4 text-rose-600" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-800">
                          Comprehensive Advertising &amp; Brand Solutions
                        </span>
                      </div>
                      <Link
                        to="/services"
                        className="text-xs font-semibold text-rose-600 hover:text-rose-700 flex items-center gap-1"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        View All Services &amp; Categories
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>

                    <div className="grid grid-cols-2 gap-2.5 max-h-[380px] overflow-y-auto p-1">
                      {servicesList.map((service) => (
                        <Link
                          key={service.id || service.slug}
                          to={`/services/${service.slug}`}
                          className="group flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200/60"
                          onClick={() => setServicesDropdownOpen(false)}
                        >
                          <div
                            className={`w-10 h-10 rounded-md shrink-0 flex items-center justify-center text-white bg-gradient-to-br ${
                              service.galleryItems?.[0]?.bgGradient || 'from-rose-600 to-slate-900'
                            } shadow-xs group-hover:scale-105 transition-transform`}
                          >
                            <span className="text-xs font-black tracking-tight uppercase">
                              {service.title.slice(0, 2)}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-600 transition-colors truncate">
                                {service.title}
                              </h4>
                              <span className="text-[10px] text-slate-400 shrink-0">
                                {service.subServices.length} categories
                              </span>
                            </div>
                            <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                              {service.shortDescription}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-3.5 pt-3 border-t border-slate-100 bg-slate-50 -mx-5 -mb-5 p-4 rounded-b-xl flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-slate-600">
                        <Sparkles className="w-3.5 h-3.5 text-rose-600" />
                        <span>Need customized highway or multi-state activations?</span>
                      </div>
                      <Link
                        to="/book-now"
                        className="text-xs font-bold text-slate-900 hover:text-rose-600 flex items-center gap-1"
                        onClick={() => setServicesDropdownOpen(false)}
                      >
                        Request Custom Media Plan
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              <Link
                to="/our-clients"
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                  isActive('/our-clients')
                    ? 'text-rose-600 bg-rose-50/60'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Our Clients
              </Link>

              <Link
                to="/about-us"
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                  isActive('/about-us')
                    ? 'text-rose-600 bg-rose-50/60'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                About Us
              </Link>

              <Link
                to="/contact-us"
                className={`px-3 py-2 text-sm font-semibold rounded-md transition-colors whitespace-nowrap ${
                  isActive('/contact-us')
                    ? 'text-rose-600 bg-rose-50/60'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                Contact Us
              </Link>
            </nav>

            {/* Zone 3: Primary Action (WhatsApp + Book Now) */}
            <div className="flex items-center gap-2">
              <a
                href="https://wa.me/919999688445?text=Hello%20Marcom%20Brand%20Solution,%20I%20would%20like%20to%20inquire%20about%20advertising%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 rounded-lg shadow-xs transition-colors whitespace-nowrap cursor-pointer"
                title="Chat on WhatsApp"
              >
                {/* WhatsApp SVG Icon */}
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.301-.15-1.782-.879-2.058-.98-.277-.1-.478-.15-.68.15-.201.301-.78 1.002-.956 1.203-.176.2-.352.226-.653.075s-1.272-.469-2.423-1.496c-.896-.799-1.501-1.786-1.677-2.087-.176-.301-.019-.464.132-.614.136-.135.301-.352.452-.528.15-.176.2-.301.301-.502.101-.2.05-.377-.025-.528-.075-.15-.68-1.639-.93-2.247-.245-.593-.493-.512-.68-.521l-.578-.01c-.2 0-.528.075-.804.377s-1.055 1.03-1.055 2.512 1.08 2.914 1.231 3.115c.15.201 2.126 3.246 5.15 4.553.719.311 1.28.497 1.718.636.723.23 1.38.197 1.9.12.58-.087 1.782-.728 2.033-1.432.251-.703.251-1.306.176-1.432-.076-.126-.277-.201-.578-.352zm-5.467 7.608h-.005a10.024 10.024 0 01-5.111-1.398l-.367-.218-3.797.996 1.013-3.7-.24-.382a10.046 10.046 0 01-1.542-5.352c0-5.541 4.509-10.05 10.053-10.05 2.684 0 5.208 1.046 7.106 2.946a10.007 10.007 0 012.944 7.104c0 5.543-4.51 10.054-10.051 10.054zm8.528-18.577C18.293 1.173 15.307.003 12.005 0 5.438 0 .084 5.354.082 11.921c0 2.098.549 4.146 1.593 5.952L0 24l6.305-1.654a11.87 11.87 0 005.696 1.448h.005c6.565 0 11.919-5.355 11.922-11.924 0-3.182-1.24-6.173-3.395-8.457z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              <Link
                to="/book-now"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-lg shadow-sm hover:shadow-md transition-all whitespace-nowrap cursor-pointer group"
              >
                <span>Book Now</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>

              {/* Mobile Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg focus:outline-hidden focus-visible:ring-2 focus-visible:ring-rose-600"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6 text-slate-900" />
                ) : (
                  <Menu className="w-6 h-6 text-slate-900" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[65px] bottom-0 bg-white z-40 overflow-y-auto border-t border-slate-200 p-5 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className={`px-4 py-3 rounded-lg text-base font-bold transition-colors ${
                  isActive('/') && location.pathname === '/'
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Home
              </Link>

              {/* Mobile Services Accordion */}
              <div className="rounded-lg bg-slate-50 p-3">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-200">
                  <Link
                    to="/services"
                    className="text-base font-bold text-slate-900 hover:text-rose-600"
                  >
                    Services ({servicesList.length} Categories)
                  </Link>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </div>
                <div className="grid grid-cols-1 gap-1 pl-1 max-h-48 overflow-y-auto">
                  {servicesList.map((service) => (
                    <Link
                      key={service.id || service.slug}
                      to={`/services/${service.slug}`}
                      className="py-1.5 text-sm font-medium text-slate-600 hover:text-rose-600 flex items-center justify-between"
                    >
                      <span>{service.title}</span>
                      <span className="text-xs text-slate-400">Explore</span>
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                to="/our-clients"
                className={`px-4 py-3 rounded-lg text-base font-bold transition-colors ${
                  isActive('/our-clients')
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Our Clients
              </Link>

              <Link
                to="/about-us"
                className={`px-4 py-3 rounded-lg text-base font-bold transition-colors ${
                  isActive('/about-us')
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                About Us
              </Link>

              <Link
                to="/contact-us"
                className={`px-4 py-3 rounded-lg text-base font-bold transition-colors ${
                  isActive('/contact-us')
                    ? 'bg-rose-50 text-rose-600'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                Contact Us
              </Link>

              <div className="pt-4 mt-2 border-t border-slate-200 space-y-2.5">
                <Link
                  to="/book-now"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-base font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md"
                >
                  <span>Book a Campaign</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>

                <a
                  href="https://wa.me/919999688445?text=Hello%20Marcom%20Brand%20Solution,%20I%20would%20like%20to%20inquire%20about%20advertising%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-5 py-3.5 text-base font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 space-y-1">
                <p className="font-semibold text-slate-700">MARCOM BRAND SOLUTION PVT. LTD.</p>
                <p>Since 2000 • Pan-India Advertising &amp; Media Solutions</p>
                <p className="text-rose-600 font-semibold pt-1">Call: +91 98108 XXXXX</p>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
