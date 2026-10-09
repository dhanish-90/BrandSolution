import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  Award,
  CheckCircle2
} from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      {/* Upper Brand & Trust Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 border-b border-slate-800/80">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6">
            <Logo variant="dark" size="lg" />
            <p className="mt-4 text-sm text-slate-400 max-w-xl leading-relaxed">
              Marcom Brand Solution Pvt. Ltd. is a full-service Advertising, Branding, Brand Activation and Event Solutions company helping businesses, organizations and brands across India build visibility, engage their target audiences and create impactful brand experiences.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-5 text-xs text-slate-400">
              <span className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Since 2000
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <ShieldCheck className="w-4 h-4 text-rose-400" />
                Empaneled Media Network
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5 text-slate-300">
                <Award className="w-4 h-4 text-amber-400" />
                1,000+ Campaigns Delivered
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-start lg:justify-end gap-4 bg-slate-900/60 p-6 rounded-2xl border border-slate-800">
            <div>
              <h4 className="text-base font-bold text-white">Ready to plan your next campaign?</h4>
              <p className="text-xs text-slate-400 mt-1">Get custom site availability, route plans, and rate cards within 24 hours.</p>
            </div>
            <Link
              to="/book-now"
              className="inline-flex items-center gap-2 px-5 py-3 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 active:bg-rose-800 rounded-lg shrink-0 transition-colors shadow-sm"
            >
              <span>Book Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main 4-Column Directory */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: Company */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about-us" className="hover:text-rose-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/our-clients" className="hover:text-rose-400 transition-colors">
                  Our Clients
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-rose-400 transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/book-now" className="hover:text-rose-400 transition-colors">
                  Media Planning & Rate Card
                </Link>
              </li>
              <li>
                <span className="text-xs text-slate-400">
                  CIN: Registered Corporate Media Entity
                </span>
              </li>
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/services/wall-painting-advertising" className="hover:text-rose-400 transition-colors">
                  Wall Painting Advertising
                </Link>
              </li>
              <li>
                <Link to="/services/outdoor-advertising" className="hover:text-rose-400 transition-colors">
                  Outdoor Advertising (Hoardings & Transit)
                </Link>
              </li>
              <li>
                <Link to="/services/mobile-van-activity" className="hover:text-rose-400 transition-colors">
                  Mobile Van Activity & Roadshows
                </Link>
              </li>
              <li>
                <Link to="/services/btl-activation" className="hover:text-rose-400 transition-colors">
                  BTL Activation & Mall Setups
                </Link>
              </li>
              <li>
                <Link to="/services/metro-transit-branding" className="hover:text-rose-400 transition-colors">
                  Metro & Transit Branding
                </Link>
              </li>
              <li>
                <Link to="/services/signage-fabrication" className="hover:text-rose-400 transition-colors">
                  Signage & Fabrication Advertising
                </Link>
              </li>
              <li>
                <Link to="/services/corporate-events" className="hover:text-rose-400 transition-colors">
                  Corporate Event Services
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="hover:text-rose-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-rose-400 transition-colors">
                  All Advertising Services
                </Link>
              </li>
              <li>
                <Link to="/our-clients" className="hover:text-rose-400 transition-colors">
                  Clients & Reviews
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-rose-400 transition-colors">
                  About Our 20+ Years Journey
                </Link>
              </li>
              <li>
                <Link to="/contact-us" className="hover:text-rose-400 transition-colors">
                  Contact & Pan-India Offices
                </Link>
              </li>
              <li>
                <Link to="/book-now" className="hover:text-rose-400 transition-colors text-rose-400 font-semibold">
                  Book a Campaign Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Corporate Office */}
          <div>
            <h3 className="text-sm font-bold text-white tracking-wider uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600"></span>
              Contact
            </h3>
            <div className="space-y-3.5 text-sm text-slate-400">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-1" />
                <span>
                  Corporate Office:213-214 2nd floor harsha complex ghazipur delhi-110096, India.<br />
              
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-rose-500 shrink-0" />
                <a href="tel:+919999688445 " className="hover:text-white transition-colors">
                  +91 9999688445 / 011-44725827
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-rose-500 shrink-0" />
                <a href="mailto:info@brandsolution.in" className="hover:text-white transition-colors">
                  info@brandsolution.in 
                  dinesh@brandsolution.in
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>Monday – Saturday: 9:30 AM to 6:30 PM IST</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal & Copyright Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-slate-900 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-center sm:text-left">
          © MARCOM BRAND SOLUTION PVT. LTD. All Rights Reserved. Since 2000.
        </p>
        <div className="flex items-center gap-6">
          <Link to="/about-us" className="hover:text-slate-300 transition-colors">
            Brand Governance
          </Link>
          <span className="text-slate-800">•</span>
          <Link to="/contact-us" className="hover:text-slate-300 transition-colors">
            Safety & Municipal Compliance
          </Link>
          <span className="text-slate-800">•</span>
          <Link to="/book-now" className="hover:text-rose-400 transition-colors font-semibold">
            Book Now
          </Link>
        </div>
      </div>
    </footer>
  );
};
