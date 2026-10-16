import React, { useEffect } from 'react';
import { X, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-[#18266B] p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-[#F4C64F]" />
            <h3 id="privacy-title" className="text-base font-bold">
              Privacy Notice &amp; Data Policy
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            aria-label="Close privacy notice"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-slate-600 leading-relaxed">
          <div>
            <h4 className="font-bold text-[#18266B] text-base mb-1">
              ONE ADADO ELECTRICALS VENTURES
            </h4>
            <p className="text-xs text-slate-500">
              Domestic and Industrial Electrical Works • Dome Pillar 2, near Perfect Primary School, Ghana
            </p>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h5 className="font-bold text-slate-800 text-sm mb-1">1. Information We Collect</h5>
            <p>
              When you submit a project enquiry through our contact form or contact us via telephone or email, we collect only the personal information you voluntarily provide: your name, telephone number, email address (optional), project location (optional), and the project description or requirements.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 text-sm mb-1">2. How Your Details Are Used</h5>
            <p>
              Your contact details are used strictly to:
            </p>
            <ul className="list-disc pl-5 mt-1 space-y-1 text-xs">
              <li>Review your technical electrical requirements (house wiring, factory systems, fencing, etc.)</li>
              <li>Contact you directly to discuss project specifications, schedule site visits, and prepare an honest quotation</li>
              <li>Provide customer support and ongoing electrical maintenance communication</li>
            </ul>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 text-sm mb-1">3. Confidentiality &amp; Third Parties</h5>
            <p>
              We do not sell, rent, monetize, or distribute your personal details to any marketing third parties or outside brokers. Your enquiry information is held confidentially between you and ONE ADADO ELECTRICALS VENTURES.
            </p>
          </div>

          <div>
            <h5 className="font-bold text-slate-800 text-sm mb-1">4. Direct Contact</h5>
            <p>
              If you have any questions regarding your enquiry data or wish to update or delete your submitted information, you can contact the business owner directly:
            </p>
            <div className="mt-2 p-3 bg-[#F5F8FC] rounded-lg text-xs space-y-1 font-medium text-slate-700">
              <p>Email: kelvinadado6@gmail.com</p>
              <p>Telephone: +233 24 237 4880 / +233 53 087 6133</p>
              <p>Location: Dome Pillar 2, near Perfect Primary School, Ghana</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-white bg-[#18266B] hover:bg-[#18266B]/90 rounded-lg transition-colors"
          >
            Close Notice
          </button>
        </div>
      </div>
    </div>
  );
};
