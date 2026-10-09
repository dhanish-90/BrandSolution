import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { AnimatedCounter } from '../components/AnimatedCounter';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Users,
  Briefcase,
  CheckCircle2,
  MapPin,
  Clock,
  Compass,
  Zap,
  Target
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Header Banner */}
      <div className="bg-slate-950 text-white py-16 lg:py-20 relative overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'About Us' }]} />

          <div className="mt-4 max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-500">
              Corporate Heritage Since 2000
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mt-2 leading-tight">
              Building Brands. Creating Visibility. Delivering Impact.
            </h1>
            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
              Marcom Brand Solution Pvt. Ltd. is a full-service Advertising, Branding, Brand Activation and Event Solutions company helping businesses, organizations and brands across India build visibility, engage their target audiences and create impactful brand experiences.
            </p>
          </div>
        </div>
      </div>

      {/* Main Narrative & Philosophy */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-6 text-slate-700 text-base leading-relaxed">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Strategic Advertising & On-Ground Execution Across India
            </h2>

            <p>
              From wall painting and outdoor advertising to retail branding, mobile van activities, BTL activations, signage, transit branding and corporate events, we bring together strategy, creativity and on-ground execution to help brands connect with the right audience.
            </p>

            <p>
              Our approach combines market understanding, creative thinking, professional execution and strong project management to deliver campaigns that are practical, impactful and aligned with our clients' objectives.
            </p>

            <p>
              Founded in 2000, we have evolved from regional wall painting pioneers into a premier, multi-disciplinary advertising powerhouse. We bridge the critical gap between high-level brand strategy and ruthless ground-level execution in diverse markets—from Tier-1 megacities to the innermost agricultural mandis of India.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <Link
                to="/contact-us"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-md transition-all group"
              >
                <span>Contact Now</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/services"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-slate-800 bg-white hover:bg-slate-100 rounded-xl border border-slate-200 transition-all"
              >
                <span>View All Services</span>
              </Link>
            </div>
          </div>

          {/* Right Feature Card */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-8 border border-slate-200/90 shadow-lg">
            <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Award className="w-5 h-5 text-rose-600" />
              Our Core Execution Tenets
            </h3>

            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl">
                <Compass className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Line-of-Sight Mastery</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Rigorous recce for unobstructed viewing angles, traffic dwell time, and natural sight lines.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl">
                <Zap className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">In-House Production</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Dedicated fabrication workshop with CNC routing, high-GSM flex printing, and experienced master painters.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl">
                <ShieldCheck className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">100% Legal Clearance</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Direct liaison with state and municipal authorities ensuring uninterrupted campaign lifecycle.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-slate-50 rounded-xl">
                <Target className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Audited Accountability</h4>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Geo-tagged, time-stamped visual audit reporting delivered in real-time.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Core Statistics (Prompt Requirement) */}
        <div className="mt-20 bg-slate-900 rounded-3xl p-8 sm:p-12 text-white border border-slate-800 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-rose-400">
              By The Numbers
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              Two Decades of Excellence
            </h3>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <div className="text-4xl sm:text-5xl font-extrabold text-rose-500">
                <AnimatedCounter end={20} suffix="+" />
              </div>
              <p className="mt-2 text-sm sm:text-base font-bold text-white">
                Years of Experience
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Founded & Operating Since 2000
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <div className="text-4xl sm:text-5xl font-extrabold text-white">
                <AnimatedCounter end={100} suffix="+" />
              </div>
              <p className="mt-2 text-sm sm:text-base font-bold text-white">
                Happy Clients
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Blue-chip, Government & Corporate
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <div className="text-4xl sm:text-5xl font-extrabold text-rose-500">
                <AnimatedCounter end={1000} suffix="+" separator={true} />
              </div>
              <p className="mt-2 text-sm sm:text-base font-bold text-white">
                Campaigns Completed
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Audited & Successfully Delivered
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700">
              <div className="text-4xl sm:text-5xl font-extrabold text-white">
                <AnimatedCounter end={30} suffix="+" />
              </div>
              <p className="mt-2 text-sm sm:text-base font-bold text-white">
                Qualified Experts
              </p>
              <p className="mt-1 text-xs text-slate-400">
                Engineers, Artists & Project Managers
              </p>
            </div>
          </div>
        </div>

        {/* Pan-India Footprint Matrix */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-600">
              Geographic Coverage
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Pan-India Execution Network
            </h3>
            <p className="text-slate-600 text-sm mt-2">
              With dedicated operational hubs and field supervisors, we deploy simultaneous multi-state advertising campaigns with zero delays.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600" />
                North & Central Hub
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Delhi NCR, Uttar Pradesh, Haryana, Punjab, Rajasthan, Madhya Pradesh, Uttarakhand & Himachal Pradesh.
              </p>
              <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">
                Over 500+ Active Highway Sites
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600" />
                East & North-East Hub
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Bihar, Jharkhand, West Bengal, Odisha, Assam & Seven Sister State corridors.
              </p>
              <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">
                Specialized Rural Wall Networks
              </span>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200">
              <h4 className="text-base font-bold text-slate-900 mb-2 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-600" />
                West & South Corridors
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                Maharashtra, Gujarat, Karnataka, Andhra Pradesh, Telangana & Tamil Nadu transit linkages.
              </p>
              <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-md">
                Metro & Transit Media Inventory
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Contact CTA */}
        <div className="mt-16 text-center">
          <Link
            to="/contact-us"
            className="inline-flex items-center gap-2 px-8 py-4 text-base font-bold text-white bg-slate-900 hover:bg-slate-800 rounded-xl shadow-md transition-all group"
          >
            <span>Contact Now for Corporate Discussion</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};
