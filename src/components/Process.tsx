import React from 'react';
import { MessageSquare, PhoneCall, FileCheck } from 'lucide-react';

export const Process: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Tell us what electrical work you need',
      description:
        'Submit our simple online enquiry form or call us directly. Select your required service—such as house wiring, factory power, electric fencing, or mill installation.',
      icon: MessageSquare,
    },
    {
      number: '02',
      title: 'Discuss the project details with the business',
      description:
        'Speak directly with the business owner to review your building plans, site requirements, machinery specs, and power needs in Dome or across Ghana.',
      icon: PhoneCall,
    },
    {
      number: '03',
      title: 'Agree on the quotation and next steps',
      description:
        'Receive a transparent project quotation with clear material and workmanship scopes, then agree on a practical schedule to start execution.',
      icon: FileCheck,
    },
  ];

  return (
    <section className="py-16 bg-[#F5F8FC] border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-bold text-[#18266B] uppercase tracking-wider mb-2">
            Simple Process
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18266B] tracking-tight">
            How to Get Started
          </h2>
          <p className="mt-3 text-sm text-slate-600">
            Getting your domestic or industrial electrical work started is straightforward and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-2xl p-7 border border-slate-200/80 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-[#18266B] text-white flex items-center justify-center shadow-xs">
                      <Icon className="w-5 h-5 text-[#F4C64F]" />
                    </div>
                    <span className="text-2xl font-black text-slate-200 tabular-nums">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#18266B] mb-2.5">
                    {step.title}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
