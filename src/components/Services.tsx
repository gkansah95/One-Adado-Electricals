import React from 'react';
import {
  Factory,
  Home,
  Trees,
  Wheat,
  ShieldAlert,
  UtilityPole,
  Wrench,
  ArrowRight,
} from 'lucide-react';

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  highlights: string[];
}

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'factory',
    title: 'Factory electrical works',
    description:
      'Installation and connection of heavy-duty industrial electrical circuits, three-phase power distribution switchboards, machine cabling, and motor control panels for factories and industrial workshops.',
    icon: Factory,
    highlights: ['Three-phase power panels', 'Industrial machinery wiring', 'Control & safety isolators'],
  },
  {
    id: 'house-wiring',
    title: 'House wiring',
    description:
      'Safe and compliant electrical wiring for new residential houses, multi-storey compounds, and renovation projects. Includes conduit laying, consumer units, earthing, lighting circuits, and socket outlets.',
    icon: Home,
    highlights: ['Conduit piping & flush cabling', 'Modern consumer units/breakers', 'Lighting & power points'],
  },
  {
    id: 'sawmill',
    title: 'Sawmill installation',
    description:
      'Electrical installation, wiring, and power integration for timber processing mills, bandsaws, heavy electric motors, starters, and high-load industrial cutting machinery.',
    icon: Trees,
    highlights: ['Heavy-duty motor connections', 'Starter switches & contactors', 'Overload protection'],
  },
  {
    id: 'corn-mill',
    title: 'Corn mill installation',
    description:
      'Robust single-phase and three-phase motor connections and control wiring for commercial and community grain, corn, and flour milling machinery.',
    icon: Wheat,
    highlights: ['Milling motor circuits', 'Vibration-resistant cabling', 'Safe power disconnect switches'],
  },
  {
    id: 'security-fencing',
    title: 'Security electric fencing',
    description:
      'Design, wiring, and installation of perimeter electric security fences on residential walls and commercial properties, including energizers, earth spikes, tensioners, and warning signboards.',
    icon: ShieldAlert,
    highlights: ['High-tensile fence wiring', 'Energizer installation', 'Alarm & warning indicators'],
  },
  {
    id: 'pole-extension',
    title: 'Pole extension works',
    description:
      'Overhead and surface electrical pole extension works, power line routing, aerial bundled cabling, and physical pole service connections to bring power directly to your site or building.',
    icon: UtilityPole,
    highlights: ['Overhead cabling routing', 'Pole hardware & stays', 'Service drop connections'],
  },
  {
    id: 'electrical-maintenance',
    title: 'Electrical maintenance',
    description:
      'Systematic fault-finding, circuit testing, breaker replacements, damaged wire repairs, load balancing, and routine maintenance for domestic and commercial facilities.',
    icon: Wrench,
    highlights: ['Electrical fault diagnosis', 'Wiring repair & upgrades', 'Preventive inspections'],
  },
];

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export const Services: React.FC<ServicesProps> = ({ onSelectService }) => {
  return (
    <section id="services" className="py-20 bg-[#F5F8FC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-bold text-[#18266B] uppercase tracking-wider mb-2">
            Technical Capabilities
          </p>
          <h2 className="text-3xl font-extrabold text-[#18266B] tracking-tight sm:text-4xl">
            Our Core Electrical Services
          </h2>
          <p className="mt-4 text-base text-slate-600">
            From residential compound wiring to heavy industrial and agricultural machinery power systems, explore our specialized services in Ghana.
          </p>
        </div>

        {/* 7 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES_LIST.map((service, index) => {
            const Icon = service.icon;
            const isFeatured = index === 0; // Factory electrical works featured styling

            return (
              <div
                key={service.id}
                className={`flex flex-col justify-between rounded-2xl bg-white p-7 border transition-all duration-200 hover:shadow-lg ${
                  isFeatured
                    ? 'border-[#18266B]/30 ring-1 ring-[#18266B]/15 lg:col-span-1'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <div>
                  {/* Icon & Service Number Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#F5F8FC] border border-slate-200/80 flex items-center justify-center text-[#18266B]">
                      <Icon className="w-6 h-6 text-[#18266B]" />
                    </div>
                    <span className="text-xs font-bold text-slate-400 tabular-nums">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className="text-lg font-bold text-[#18266B] tracking-tight mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 leading-relaxed mb-5">
                    {service.description}
                  </p>

                  {/* Highlight items */}
                  <ul className="mb-6 space-y-1.5 text-xs text-slate-500 font-medium border-t border-slate-100 pt-3">
                    {service.highlights.map((item) => (
                      <li key={item} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F4C64F]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Enquire Button that links directly to Contact Form with preselected service */}
                <button
                  type="button"
                  onClick={() => onSelectService(service.title)}
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-wider text-[#18266B] bg-[#F5F8FC] hover:bg-[#F4C64F] border border-slate-200/80 hover:border-[#F4C64F] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18266B] cursor-pointer group"
                >
                  <span>Enquire About This Service</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
