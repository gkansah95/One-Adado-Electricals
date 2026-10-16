import React, { useState } from 'react';
import { Phone, MapPin, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

interface HeroProps {
  onRequestQuote: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onRequestQuote }) => {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="home" className="relative pt-8 pb-16 lg:pt-14 lg:pb-24 overflow-hidden">
      {/* Subtle brand geometry background accents */}
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-[#79CDEE]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -z-10 w-80 h-80 bg-[#18266B]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed location kicker */}
            <div className="flex items-center gap-2 text-xs font-bold text-[#18266B] mb-4">
              <MapPin className="w-4 h-4 text-[#18266B] shrink-0" />
              <span>Dome Pillar 2, near Perfect Primary School, Ghana</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18266B] tracking-tight leading-[1.15] text-balance">
              Professional Electrical Services for Homes and Industry
            </h1>

            {/* Supporting Text */}
            <p className="mt-5 text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              House wiring, factory electrical works, installations, electric fencing, and maintenance. Contact One Adado Electricals Ventures to discuss your project.
            </p>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={onRequestQuote}
                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg text-sm font-bold uppercase tracking-wider text-[#18266B] bg-[#F4C64F] hover:bg-[#e6b73b] active:scale-95 transition-all shadow-md hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18266B] cursor-pointer"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="tel:+233242374880"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg text-sm font-bold text-[#18266B] bg-white hover:bg-slate-50 border border-slate-300 shadow-xs active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18266B]"
              >
                <Phone className="w-4 h-4 text-[#18266B]" />
                <span>Call Us: <span className="tabular-nums">+233 24 237 4880</span></span>
              </a>
            </div>

            {/* Factual Core Specialisations (Unboxed text with typographic bullet separators) */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-semibold text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-[#18266B]" />
                Domestic House Wiring
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <Zap className="w-4 h-4 text-[#F4C64F]" />
                Factory Three-Phase Power
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-700">High-Tensile Electric Fencing</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="text-slate-700">Sawmill &amp; Corn Mill Installation</span>
            </div>
          </div>

          {/* Right Image Frame Column */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Frame Rim with brand colors */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#18266B] to-[#79CDEE] rounded-2xl opacity-20 blur-sm" />

              <div className="relative rounded-2xl overflow-hidden bg-white shadow-xl border-2 border-white ring-1 ring-slate-200/70">
                {!imageError ? (
                  <img
                    src="/src/assets/images/hero_electrical_work_1792151882355.jpg"
                    alt="One Adado Electricals Ventures master electrician inspecting industrial switchgear and power distribution board"
                    className="w-full h-80 sm:h-96 object-cover object-center"
                    referrerPolicy="no-referrer"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="w-full h-80 sm:h-96 bg-gradient-to-br from-[#18266B] to-[#0d1640] p-8 flex flex-col justify-center items-center text-white text-center">
                    <Zap className="w-14 h-14 text-[#F4C64F] mb-4" />
                    <h3 className="text-xl font-bold">ONE ADADO ELECTRICALS</h3>
                    <p className="text-sm text-[#79CDEE] mt-2">Domestic &amp; Industrial Electrical Works</p>
                    <p className="text-xs text-slate-300 mt-4">Dome Pillar 2, near Perfect Primary School, Ghana</p>
                  </div>
                )}

                {/* Subdued Caption Banner */}
                <div className="bg-[#18266B] p-4 text-white flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold text-[#F4C64F] uppercase tracking-wider">
                      Technical Standards
                    </p>
                    <p className="text-xs text-slate-200">
                      Safe, disciplined electrical installations for residential &amp; industrial setups
                    </p>
                  </div>
                  <div className="shrink-0 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[#79CDEE]">
                    <Zap className="w-4 h-4 fill-current" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
