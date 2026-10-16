import React, { useState, useEffect } from 'react';
import { Eye, X, Shield, ArrowUpRight } from 'lucide-react';

import factoryImg from '../assets/images/service_factory_industrial_1792151883138.jpg';
import houseWiringImg from '../assets/images/service_house_wiring_1792151884221.jpg';
import securityFencingImg from '../assets/images/service_security_fencing_1792151884706.jpg';
import maintenanceImg from '../assets/images/hero_electrical_work_1792151882355.jpg';

interface WorkItem {
  id: string;
  title: string;
  category: string;
  imageSrc: string;
  fallbackSrc: string;
  description: string;
}

const GALLERY_ITEMS: WorkItem[] = [
  {
    id: 'work-1',
    title: 'Industrial Factory Power Distribution & Cable Terminations',
    category: 'Factory electrical works',
    imageSrc: factoryImg || '/images/service_factory_industrial.jpg',
    fallbackSrc: '/images/service_factory_industrial.jpg',
    description:
      'High-capacity three-phase electrical control panel assembly, cable trays, and motor power routing for industrial manufacturing plants.',
  },
  {
    id: 'work-2',
    title: 'Domestic House Wiring & Flush-Mounted Consumer Unit',
    category: 'House wiring',
    imageSrc: houseWiringImg || '/images/service_house_wiring.jpg',
    fallbackSrc: '/images/service_house_wiring.jpg',
    description:
      'Neat conduit embedding, multi-circuit consumer unit installation, and modern domestic switchgear for residential buildings.',
  },
  {
    id: 'work-3',
    title: 'Perimeter Wall Security Electric Fence Installation',
    category: 'Security electric fencing',
    imageSrc: securityFencingImg || '/images/service_security_fencing.jpg',
    fallbackSrc: '/images/service_security_fencing.jpg',
    description:
      'Multi-strand high-tensile wire security electric fencing with spring tensioners and warning signage mounted along perimeter walling.',
  },
  {
    id: 'work-4',
    title: 'Comprehensive Switchgear Testing & Electrical Inspection',
    category: 'Electrical maintenance',
    imageSrc: maintenanceImg || '/images/hero_electrical_work.jpg',
    fallbackSrc: '/images/hero_electrical_work.jpg',
    description:
      'Hands-on diagnostic testing, busbar load measurements, and preventive maintenance on high-voltage distribution boards.',
  },
];

interface OurWorkProps {
  onRequestQuote: () => void;
}

export const OurWork: React.FC<OurWorkProps> = ({ onRequestQuote }) => {
  const [activeItem, setActiveItem] = useState<WorkItem | null>(null);

  // Handle ESC key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveItem(null);
      }
    };
    if (activeItem) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem]);

  return (
    <section id="our-work" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <p className="text-xs font-bold text-[#18266B] uppercase tracking-wider mb-2">
              Portfolio &amp; Workmanship
            </p>
            <h2 className="text-3xl font-extrabold text-[#18266B] tracking-tight sm:text-4xl">
              Representative Electrical Projects
            </h2>
            <p className="mt-3 text-base text-slate-600">
              A visual overview of the craftsmanship and technical discipline applied across our domestic, factory, and security electrical installations.
            </p>
          </div>

          <button
            type="button"
            onClick={onRequestQuote}
            className="inline-flex items-center gap-2 self-start md:self-end px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#18266B] bg-[#F5F8FC] hover:bg-[#F4C64F] border border-slate-200 transition-colors"
          >
            <span>Have a Similar Project?</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col rounded-xl overflow-hidden bg-white border border-slate-200 hover:border-slate-300 transition-all hover:shadow-md cursor-pointer"
              onClick={() => setActiveItem(item)}
            >
              {/* Image Container */}
              <div className="relative aspect-4/3 overflow-hidden bg-slate-100">
                <img
                  src={item.imageSrc}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    if (e.currentTarget.src !== item.fallbackSrc) {
                      e.currentTarget.src = item.fallbackSrc;
                    }
                  }}
                />
                <div className="absolute inset-0 bg-[#18266B]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-white/90 text-[#18266B] flex items-center justify-center shadow-lg">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-[#18266B] uppercase tracking-wider block mb-1">
                    {item.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-800 group-hover:text-[#18266B] transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                </div>
                <p className="mt-2 text-xs text-slate-500 line-clamp-2">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust & Craft Standards Note */}
        <div className="mt-12 p-5 rounded-xl bg-[#F5F8FC] border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-[#18266B] shrink-0" />
            <p className="text-xs sm:text-sm text-slate-700">
              Every domestic and industrial electrical installation adheres strictly to standard cable sizing, circuit protection, and earthing regulations.
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500 shrink-0">
            Dome Pillar 2, Ghana
          </span>
        </div>
      </div>

      {/* Accessible Lightbox Modal */}
      {activeItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => setActiveItem(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-white/20"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Close Button */}
            <button
              type="button"
              onClick={() => setActiveItem(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-slate-700 hover:text-black hover:bg-white shadow-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18266B]"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image */}
            <div className="relative aspect-16/10 sm:aspect-16/9 bg-slate-900">
              <img
                src={activeItem.imageSrc}
                alt={activeItem.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  if (e.currentTarget.src !== activeItem.fallbackSrc) {
                    e.currentTarget.src = activeItem.fallbackSrc;
                  }
                }}
              />
            </div>

            {/* Modal Body Info */}
            <div className="p-6 bg-white">
              <span className="text-xs font-bold text-[#18266B] uppercase tracking-wider block mb-1">
                {activeItem.category}
              </span>
              <h3 id="modal-title" className="text-lg font-bold text-slate-900 mb-2">
                {activeItem.title}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                {activeItem.description}
              </p>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-slate-100">
                <span className="text-xs text-slate-500">
                  Executed by One Adado Electricals Ventures
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setActiveItem(null);
                    onRequestQuote();
                  }}
                  className="px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider text-[#18266B] bg-[#F4C64F] hover:bg-[#e6b73b] transition-colors text-center"
                >
                  Discuss Your Project
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
