import React, { useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';
import { CompanyLogo } from './CompanyLogo';

interface NavbarProps {
  onRequestQuote: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onRequestQuote }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Our Work', href: '#our-work' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-8">
          {/* Zone 1: Brand Wordmark & Logo */}
          <a
            href="#home"
            className="flex items-center gap-2 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18266B] rounded-lg p-1"
            aria-label="One Adado Electricals Ventures - Return to home"
          >
            <CompanyLogo size="md" />
          </a>

          {/* Zone 2: Navigation Links (Single line, text with subtle hover) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-700"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="whitespace-nowrap shrink-0 hover:text-[#18266B] transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#18266B] hover:after:w-full after:transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18266B] rounded"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Phone */}
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <a
              href="tel:+233242374880"
              className="hidden lg:flex items-center gap-2 text-xs font-bold text-[#18266B] hover:text-[#18266B]/80 transition-colors py-2 px-3 rounded-lg bg-[#F5F8FC] border border-slate-200/80"
              title="Call Kelvin Adado"
            >
              <Phone className="w-3.5 h-3.5 text-[#18266B]" />
              <span className="tabular-nums">+233 24 237 4880</span>
            </a>
            <button
              onClick={onRequestQuote}
              className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-[#18266B] bg-[#F4C64F] hover:bg-[#e6b73b] active:scale-95 transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18266B]"
            >
              Request a Quote
            </button>
          </div>

          {/* Mobile menu trigger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-[#18266B] hover:bg-slate-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18266B]"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-xl transition-all">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.href);
                }}
                className="px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-[#F5F8FC] hover:text-[#18266B] transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a
                href="tel:+233242374880"
                className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-bold text-[#18266B] bg-[#F5F8FC] border border-slate-200"
              >
                <Phone className="w-4 h-4" />
                <span className="tabular-nums">Call: +233 24 237 4880</span>
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="w-full py-3 rounded-lg text-sm font-bold text-[#18266B] bg-[#F4C64F] hover:bg-[#e6b73b] transition-colors uppercase tracking-wider text-center"
              >
                Request a Quote
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
