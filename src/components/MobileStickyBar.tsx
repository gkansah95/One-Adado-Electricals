import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';

interface MobileStickyBarProps {
  onRequestQuote: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onRequestQuote }) => {
  return (
    <div
      aria-label="Quick Mobile Actions"
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200 px-3 py-2.5 shadow-lg pb-[max(0.625rem,env(safe-area-inset-bottom))]"
    >
      <div className="flex items-center gap-2 max-w-md mx-auto">
        {/* Quick Call Button */}
        <a
          href="tel:+233242374880"
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold text-[#18266B] bg-[#F5F8FC] border border-slate-300 active:bg-slate-200 transition-colors"
        >
          <Phone className="w-3.5 h-3.5 text-[#18266B]" />
          <span>Call Kelvin</span>
        </a>

        {/* Quick Quote Button */}
        <button
          type="button"
          onClick={onRequestQuote}
          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-lg text-xs font-bold uppercase tracking-wider text-[#18266B] bg-[#F4C64F] active:bg-[#e6b73b] transition-colors shadow-xs"
        >
          <span>Request Quote</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
