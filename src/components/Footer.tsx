import React from 'react';
import { Phone, Mail, MapPin, Zap } from 'lucide-react';
import { CompanyLogo } from './CompanyLogo';

interface FooterProps {
  onOpenPrivacy: () => void;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrivacy, onRequestQuote }) => {
  const currentYear = 2026;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#18266B] text-white pt-16 pb-12 border-t-4 border-[#F4C64F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand & Overview (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-white/10 p-3 rounded-xl inline-block">
              <CompanyLogo size="md" />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed max-w-md">
              ONE ADADO ELECTRICALS VENTURES delivers professional domestic and industrial electrical installations across Ghana. From house wiring and three-phase factory power to electric security fencing and sawmill installations.
            </p>
            <div className="pt-2 text-xs text-[#79CDEE]">
              Location: Dome Pillar 2, near Perfect Primary School, Ghana
            </div>
          </div>

          {/* Quick Navigation (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#F4C64F] uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-medium text-slate-300">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('home')}
                  className="hover:text-white transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('about')}
                  className="hover:text-white transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('services')}
                  className="hover:text-white transition-colors"
                >
                  Electrical Services
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('our-work')}
                  className="hover:text-white transition-colors"
                >
                  Our Work
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact &amp; Enquiry
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="hover:text-[#79CDEE] transition-colors"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Core Services (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-[#F4C64F] uppercase tracking-wider">
              Services
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300">
              <li>Factory electrical works</li>
              <li>House wiring</li>
              <li>Sawmill installation</li>
              <li>Corn mill installation</li>
              <li>Security electric fencing</li>
              <li>Pole extension works</li>
              <li>Electrical maintenance</li>
            </ul>
          </div>

          {/* Direct Contacts (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-[#F4C64F] uppercase tracking-wider">
              Contact Kelvin Adado
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#F4C64F] shrink-0" />
                <a href="tel:+233242374880" className="hover:underline tabular-nums text-white font-semibold">
                  +233 24 237 4880
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#79CDEE] shrink-0" />
                <a href="tel:+233530876133" className="hover:underline tabular-nums">
                  +233 53 087 6133
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#F4C64F] shrink-0" />
                <a href="mailto:kelvinadado6@gmail.com" className="hover:underline truncate">
                  kelvinadado6@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1 text-slate-400">
                <MapPin className="w-4 h-4 text-[#79CDEE] shrink-0 mt-0.5" />
                <span>Dome Pillar 2, near Perfect Primary School, Ghana</span>
              </li>
            </ul>

            <div className="pt-2">
              <button
                type="button"
                onClick={onRequestQuote}
                className="w-full py-2 px-3 text-xs font-bold uppercase tracking-wider text-[#18266B] bg-[#F4C64F] hover:bg-[#e6b73b] rounded-lg transition-colors text-center"
              >
                Request a Quote
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Notices */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            &copy; {currentYear} ONE ADADO ELECTRICALS VENTURES. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={onOpenPrivacy}
              className="hover:text-white transition-colors underline"
            >
              Privacy Policy
            </button>
            <span className="text-slate-600">·</span>
            <span>Domestic &amp; Industrial Electrical Works</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
