import React, { useState, useEffect } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  MessageSquare,
  AlertCircle,
  CheckCircle,
  Loader2,
  Clock,
  Info,
} from 'lucide-react';

interface ContactProps {
  selectedService: string;
  onOpenPrivacy: () => void;
}

export const Contact: React.FC<ContactProps> = ({ selectedService, onOpenPrivacy }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    service: selectedService || 'Factory electrical works',
    location: '',
    message: '',
    bot_field: '', // honeypot
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverFeedback, setServerFeedback] = useState<string>('');
  const [backendConfigured, setBackendConfigured] = useState<boolean | null>(null);

  // Sync selectedService prop if updated from services card
  useEffect(() => {
    if (selectedService) {
      setFormData((prev) => ({ ...prev, service: selectedService }));
    }
  }, [selectedService]);

  // Check backend email configuration status on mount
  useEffect(() => {
    fetch('/api/contact/status')
      .then((res) => res.json())
      .then((data) => {
        if (typeof data.configured === 'boolean') {
          setBackendConfigured(data.configured);
        }
      })
      .catch(() => {
        // Fallback gracefully
        setBackendConfigured(false);
      });
  }, []);

  const serviceOptions = [
    'Factory electrical works',
    'House wiring',
    'Sawmill installation',
    'Corn mill installation',
    'Security electric fencing',
    'Pole extension works',
    'Electrical maintenance',
    'Other enquiry',
  ];

  const validate = () => {
    const errors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (formData.fullName.trim().length < 2) {
      errors.fullName = 'Name must be at least 2 characters';
    } else if (formData.fullName.trim().length > 100) {
      errors.fullName = 'Name cannot exceed 100 characters';
    }

    const phoneClean = formData.phone.trim();
    const phoneRegex = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]{6,20}$/;
    if (!phoneClean) {
      errors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phoneClean)) {
      errors.phone = 'Enter a valid phone number (e.g. +233 24 237 4880 or 024 237 4880)';
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        errors.email = 'Enter a valid email address';
      }
    }

    if (!formData.service) {
      errors.service = 'Please select a service';
    }

    if (!formData.message.trim()) {
      errors.message = 'Please provide details about your electrical project';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    } else if (formData.message.trim().length > 2000) {
      errors.message = 'Message cannot exceed 2000 characters';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('submitting');
    setServerFeedback('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus('success');
        setServerFeedback(
          data.message || 'Your enquiry has been successfully delivered to kelvinadado6@gmail.com.'
        );
        // Reset form fields except service
        setFormData({
          fullName: '',
          phone: '',
          email: '',
          service: formData.service,
          location: '',
          message: '',
          bot_field: '',
        });
      } else {
        setStatus('error');
        setServerFeedback(
          data.error ||
            'We were unable to deliver your message at this time. Please call or email the owner directly.'
        );
      }
    } catch {
      setStatus('error');
      setServerFeedback(
        'Connection error while reaching the server. Please call +233 24 237 4880 or email kelvinadado6@gmail.com directly.'
      );
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <p className="text-xs font-bold text-[#18266B] uppercase tracking-wider mb-2">
            Get In Touch
          </p>
          <h2 className="text-3xl font-extrabold text-[#18266B] tracking-tight sm:text-4xl">
            Contact One Adado Electricals Ventures
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Submit your electrical requirements below or contact us directly by phone or email to discuss domestic, industrial, or fencing work.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Direct Contact Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#F5F8FC] rounded-2xl p-6 sm:p-8 border border-slate-200">
              <h3 className="text-xl font-bold text-[#18266B] mb-2">
                Business Contact Details
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Direct contact with Kelvin Adado for domestic &amp; industrial electrical services.
              </p>

              {/* Contact actions list */}
              <div className="space-y-4">
                {/* Primary Phone */}
                <div className="flex items-start gap-4 p-3.5 bg-white rounded-xl border border-slate-200/80">
                  <div className="w-10 h-10 rounded-lg bg-[#18266B] text-white flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#F4C64F]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Primary Phone
                    </span>
                    <a
                      href="tel:+233242374880"
                      className="text-base font-bold text-[#18266B] hover:underline tabular-nums block"
                    >
                      +233 24 237 4880
                    </a>
                  </div>
                  <a
                    href="tel:+233242374880"
                    className="self-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#18266B] bg-[#F5F8FC] hover:bg-[#F4C64F] rounded-md border border-slate-200 transition-colors"
                  >
                    Call
                  </a>
                </div>

                {/* Secondary Phone */}
                <div className="flex items-start gap-4 p-3.5 bg-white rounded-xl border border-slate-200/80">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F8FC] border border-slate-200 text-[#18266B] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Secondary Phone
                    </span>
                    <a
                      href="tel:+233530876133"
                      className="text-base font-bold text-[#18266B] hover:underline tabular-nums block"
                    >
                      +233 53 087 6133
                    </a>
                  </div>
                  <a
                    href="tel:+233530876133"
                    className="self-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#18266B] bg-[#F5F8FC] hover:bg-slate-200 rounded-md border border-slate-200 transition-colors"
                  >
                    Call
                  </a>
                </div>

                {/* Email */}
                <div className="flex items-start gap-4 p-3.5 bg-white rounded-xl border border-slate-200/80">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F8FC] border border-slate-200 text-[#18266B] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Official Email
                    </span>
                    <a
                      href="mailto:kelvinadado6@gmail.com"
                      className="text-sm font-bold text-[#18266B] hover:underline truncate block"
                    >
                      kelvinadado6@gmail.com
                    </a>
                  </div>
                  <a
                    href="mailto:kelvinadado6@gmail.com"
                    className="self-center px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#18266B] bg-[#F5F8FC] hover:bg-slate-200 rounded-md border border-slate-200 transition-colors"
                  >
                    Email
                  </a>
                </div>

                {/* Location & Directions */}
                <div className="flex items-start gap-4 p-3.5 bg-white rounded-xl border border-slate-200/80">
                  <div className="w-10 h-10 rounded-lg bg-[#F5F8FC] border border-slate-200 text-[#18266B] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Workshop / Base Location
                    </span>
                    <p className="text-xs font-medium text-slate-700 leading-snug">
                      Dome Pillar 2, near Perfect Primary School, Ghana
                    </p>
                  </div>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Dome+Pillar+2+near+Perfect+Primary+School+Accra+Ghana"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="self-center inline-flex items-center gap-1 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-[#18266B] bg-[#F5F8FC] hover:bg-slate-200 rounded-md border border-slate-200 transition-colors whitespace-nowrap"
                  >
                    <span>Directions</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* WhatsApp Button (Strictly Kept Disabled Until Confirmed by Owner as specified) */}
              <div className="mt-6 pt-5 border-t border-slate-200">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-700">WhatsApp Messaging</span>
                    <span className="text-[11px] text-amber-700 font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Pending Owner Confirmation
                    </span>
                  </div>

                  <button
                    type="button"
                    disabled
                    aria-disabled="true"
                    title="WhatsApp is currently inactive pending owner verification that +233 24 237 4880 is registered for WhatsApp"
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold text-slate-400 bg-slate-100 border border-slate-200 cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4 opacity-50" />
                    <span>Chat on WhatsApp (Currently Disabled)</span>
                  </button>

                  <p className="text-[11px] text-slate-500 italic">
                    The flyer confirms the phone number (+233 24 237 4880) but does not confirm WhatsApp registration. In accordance with policy, this button remains disabled until Kelvin Adado confirms active WhatsApp service.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Working Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <h3 className="text-xl font-bold text-[#18266B] mb-2">
                Send an Enquiry Directly
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Messages are routed directly to <span className="font-semibold text-slate-700">kelvinadado6@gmail.com</span>.
              </p>

              {/* Status Banner when SMTP is not configured */}
              {backendConfigured === false && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-amber-900 leading-relaxed">
                    <p className="font-bold mb-1">Email Delivery System Status:</p>
                    <p>
                      The server is awaiting live SMTP credentials in environment variables (see handover instructions). For immediate electrical enquiries, call Kelvin Adado directly on{' '}
                      <a href="tel:+233242374880" className="font-bold underline text-[#18266B]">
                        +233 24 237 4880
                      </a>{' '}
                      or email{' '}
                      <a href="mailto:kelvinadado6@gmail.com" className="font-bold underline text-[#18266B]">
                        kelvinadado6@gmail.com
                      </a>.
                    </p>
                  </div>
                </div>
              )}

              {/* Success Feedback State */}
              {status === 'success' && (
                <div className="mb-6 p-5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-bold text-emerald-900">Enquiry Submitted Successfully</h4>
                    <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
                      {serverFeedback}
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="mt-3 text-xs font-bold text-emerald-800 underline"
                    >
                      Send another enquiry
                    </button>
                  </div>
                </div>
              )}

              {/* Error Feedback State */}
              {status === 'error' && (
                <div className="mb-6 p-5 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
                  <AlertCircle className="w-6 h-6 text-rose-600 shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-rose-900">Submission Notice</h4>
                    <p className="text-xs text-rose-800 mt-1 leading-relaxed">
                      {serverFeedback}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href="tel:+233242374880"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 text-white rounded text-xs font-bold hover:bg-rose-700"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Call +233 24 237 4880</span>
                      </a>
                      <a
                        href="mailto:kelvinadado6@gmail.com"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-rose-800 border border-rose-300 rounded text-xs font-bold hover:bg-rose-50"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Email kelvinadado6@gmail.com</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Honeypot field for anti-bot protection (hidden from humans) */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="bot_field">Do not fill this</label>
                  <input
                    type="text"
                    id="bot_field"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.bot_field}
                    onChange={(e) => setFormData({ ...formData, bot_field: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label htmlFor="fullName" className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      required
                      placeholder="e.g. Kwame Mensah"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (formErrors.fullName) setFormErrors({ ...formErrors, fullName: '' });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#18266B] ${
                        formErrors.fullName ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'
                      }`}
                    />
                    {formErrors.fullName && (
                      <p className="mt-1 text-xs text-rose-600">{formErrors.fullName}</p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label htmlFor="phone" className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="e.g. +233 24 237 4880 or 024 123 4567"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (formErrors.phone) setFormErrors({ ...formErrors, phone: '' });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#18266B] ${
                        formErrors.phone ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'
                      }`}
                    />
                    {formErrors.phone && (
                      <p className="mt-1 text-xs text-rose-600">{formErrors.phone}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email Address (Optional) */}
                  <div>
                    <label htmlFor="email" className="block text-xs font-bold text-slate-700 mb-1">
                      Email Address <span className="text-xs font-normal text-slate-400">(Optional)</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      placeholder="e.g. yourname@domain.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (formErrors.email) setFormErrors({ ...formErrors, email: '' });
                      }}
                      className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#18266B] ${
                        formErrors.email ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'
                      }`}
                    />
                    {formErrors.email && (
                      <p className="mt-1 text-xs text-rose-600">{formErrors.email}</p>
                    )}
                  </div>

                  {/* Service Required */}
                  <div>
                    <label htmlFor="service" className="block text-xs font-bold text-slate-700 mb-1">
                      Service Required <span className="text-rose-600">*</span>
                    </label>
                    <select
                      id="service"
                      required
                      value={formData.service}
                      onChange={(e) => {
                        setFormData({ ...formData, service: e.target.value });
                        if (formErrors.service) setFormErrors({ ...formErrors, service: '' });
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white focus:outline-none focus:ring-2 focus:ring-[#18266B]"
                    >
                      {serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    {formErrors.service && (
                      <p className="mt-1 text-xs text-rose-600">{formErrors.service}</p>
                    )}
                  </div>
                </div>

                {/* Project Location (Optional) */}
                <div>
                  <label htmlFor="location" className="block text-xs font-bold text-slate-700 mb-1">
                    Project Location <span className="text-xs font-normal text-slate-400">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="e.g. Dome, Achimota, Madina, Tema, or Region"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#18266B]"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-xs font-bold text-slate-700 mb-1">
                    Project Details / Scope <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={4}
                    placeholder="Describe your domestic, factory, fencing, or maintenance project..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (formErrors.message) setFormErrors({ ...formErrors, message: '' });
                    }}
                    className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 bg-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#18266B] resize-y ${
                      formErrors.message ? 'border-rose-500 bg-rose-50/20' : 'border-slate-300'
                    }`}
                  />
                  {formErrors.message && (
                    <p className="mt-1 text-xs text-rose-600">{formErrors.message}</p>
                  )}
                </div>

                {/* Privacy Notice */}
                <p className="text-[11px] text-slate-500 leading-normal">
                  Your submitted details will be used solely by One Adado Electricals Ventures to respond to your project enquiry.{' '}
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="text-[#18266B] font-semibold underline hover:text-[#18266B]/80"
                  >
                    View Privacy Policy
                  </button>
                  .
                </p>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 px-6 rounded-lg text-xs font-bold uppercase tracking-wider text-[#18266B] bg-[#F4C64F] hover:bg-[#e6b73b] active:scale-[0.99] disabled:opacity-70 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#18266B] cursor-pointer flex items-center justify-center gap-2"
                >
                  {status === 'submitting' ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-[#18266B]" />
                      <span>Sending Enquiry to kelvinadado6@gmail.com...</span>
                    </>
                  ) : (
                    <span>Submit Enquiry</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
