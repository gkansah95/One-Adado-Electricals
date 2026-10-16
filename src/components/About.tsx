import React from 'react';
import { CheckCircle2, MapPin, Phone, Mail } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-16 bg-white border-y border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <p className="text-xs font-bold text-[#18266B] uppercase tracking-wider mb-2">
            About Our Business
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18266B] tracking-tight">
            Reliable Domestic &amp; Industrial Electrical Services in Ghana
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4 text-slate-600 leading-relaxed text-base">
            <p>
              <strong className="text-[#18266B]">ONE ADADO ELECTRICALS VENTURES</strong> is an electrical services enterprise based in Dome Pillar 2, near Perfect Primary School, Ghana. We specialize in comprehensive domestic and industrial electrical works tailored to the practical needs of homeowners, business owners, and industrial facility operators.
            </p>
            <p>
              Our scope covers complete house wiring for new buildings and renovations, three-phase factory electrical engineering, sawmill and corn mill machinery power installations, security electric perimeter fencing, pole extension line works, and ongoing electrical maintenance.
            </p>
            <p>
              We believe in direct, transparent communication. When you reach out to discuss your electrical project, you communicate directly with the business to evaluate your exact technical requirements, establish safety-first installation practices, and receive an honest project quotation.
            </p>

            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-medium text-slate-700">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#18266B] shrink-0 mt-0.5" />
                <span>Domestic house wiring &amp; renovations</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#18266B] shrink-0 mt-0.5" />
                <span>Industrial factory power systems</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#18266B] shrink-0 mt-0.5" />
                <span>Agricultural &amp; industrial mill wiring</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-[#18266B] shrink-0 mt-0.5" />
                <span>Perimeter security electric fencing</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="bg-[#F5F8FC] rounded-2xl p-6 sm:p-8 border border-slate-200">
              <h3 className="text-lg font-bold text-[#18266B] mb-4">
                Verified Business Details
              </h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="text-xs font-semibold text-slate-500 uppercase">Enterprise Name</dt>
                  <dd className="font-bold text-slate-800 text-base mt-0.5">ONE ADADO ELECTRICALS VENTURES</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-500 uppercase">Primary Focus</dt>
                  <dd className="font-semibold text-slate-800 mt-0.5">Domestic and Industrial Electrical Works</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-500 uppercase">Operating Location</dt>
                  <dd className="font-semibold text-slate-800 mt-0.5 flex items-start gap-1.5">
                    <MapPin className="w-4 h-4 text-[#18266B] shrink-0 mt-0.5" />
                    <span>Dome Pillar 2, near Perfect Primary School, Ghana</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-500 uppercase">Direct Telephone Lines</dt>
                  <dd className="mt-1 flex flex-col gap-1 font-semibold text-[#18266B]">
                    <a href="tel:+233242374880" className="hover:underline flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" />
                      <span className="tabular-nums">+233 24 237 4880</span>
                    </a>
                    <a href="tel:+233530876133" className="hover:underline flex items-center gap-1.5 text-slate-700">
                      <Phone className="w-3.5 h-3.5" />
                      <span className="tabular-nums">+233 53 087 6133</span>
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold text-slate-500 uppercase">Official Enquiries Email</dt>
                  <dd className="mt-1">
                    <a href="mailto:kelvinadado6@gmail.com" className="font-semibold text-[#18266B] hover:underline flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" />
                      <span>kelvinadado6@gmail.com</span>
                    </a>
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
