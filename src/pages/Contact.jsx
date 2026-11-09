import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, ExternalLink } from 'lucide-react';
import content from '../data/content.json';
import InnerHeroCanvas from '../components/InnerHeroCanvas';

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    honeypot: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard bot submission
    setSubmitted(true);
  };

  return (
    <div className="bg-white text-ink pt-16 sm:pt-20 lg:pt-24 pb-28 lg:pb-20">
      {/* Header */}
      <section className="relative bg-[#FAF9F5] text-ink border-b border-line py-12 sm:py-16 lg:py-24 overflow-hidden">
        {/* Full-Bleed Kinetic Background Motion with Authentic Project Photography */}
        <InnerHeroCanvas variant="contact" />

        <div className="relative z-10 max-w-container mx-auto px-5 lg:px-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px] border border-red/20 shadow-sm">
              Direct Inquiries
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-black mt-4 tracking-tight leading-[1.08]">
              Contact LESL
            </h1>
            <p className="text-lg sm:text-xl text-grey mt-4 max-w-2xl font-normal leading-relaxed">
              Reach our engineering operations desk in Ikeja, Lagos. We reply to all inquiries within 24 hours.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-line text-xs font-mono text-grey">
              <span className="font-bold text-red">GUARANTEED 24-HOUR PROPOSAL DISPATCH</span>
              <span>•</span>
              <span>DIRECT ACCESS TO LEAD PROJECT ENGINEERS</span>
              <span>•</span>
              <span>ON-SITE INDUSTRIAL AUDITS NATIONWIDE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Contact Grid */}
      <section className="py-20">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left Column: Office Details */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-extrabold text-black tracking-tight">
                  Lagos Head Office
                </h2>
                <p className="text-sm text-grey mt-1">
                  Central coordination and technical project dispatch.
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-tint rounded-[6px] shrink-0">
                    <MapPin className="w-5 h-5 text-red" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black">Address</h3>
                    <p className="text-sm font-semibold text-grey mt-0.5">{content.company.head_office}</p>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                        content.company.head_office
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-red hover:underline mt-2"
                    >
                      <span>Open in Google Maps</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-tint rounded-[6px] shrink-0">
                    <Phone className="w-5 h-5 text-red" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black">Telephone</h3>
                    <div className="space-y-1 mt-0.5">
                      {content.company.phones.map((phone) => (
                        <p key={phone}>
                          <a
                            href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                            className="text-sm font-semibold text-grey hover:text-red transition-colors"
                          >
                            {phone}
                          </a>
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-tint rounded-[6px] shrink-0">
                    <Mail className="w-5 h-5 text-red" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black">Email</h3>
                    <p className="text-sm font-semibold text-grey mt-0.5">
                      <a
                        href={`mailto:${content.company.email}`}
                        className="hover:text-red transition-colors"
                      >
                        {content.company.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-red-tint rounded-[6px] shrink-0">
                    <Clock className="w-5 h-5 text-red" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-black">Working Hours</h3>
                    <p className="text-sm font-semibold text-grey mt-0.5">{content.company.hours}</p>
                    <p className="text-xs font-bold text-red mt-1">Guaranteed response within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Form */}
            <div className="lg:col-span-7 bg-cream border border-line p-5 sm:p-8 lg:p-10 rounded-xl shadow-sm">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-16 h-16 bg-red text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                    <CheckCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold text-black">Message Delivered</h3>
                  <p className="text-sm text-grey max-w-md mx-auto">
                    {content.forms.success_quote}
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '', honeypot: '' });
                    }}
                    className="inline-flex items-center gap-2 text-xs font-bold text-red hover:underline pt-4"
                  >
                    <span>Send another message</span>
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-line pb-4 mb-6">
                    <h3 className="text-xl sm:text-2xl font-bold text-black">Send a Message</h3>
                    <p className="text-xs sm:text-sm text-grey mt-1">Fill out the form below. All fields are required.</p>
                  </div>

                  {/* Honeypot field for bot suppression */}
                  <div className="hidden" aria-hidden="true">
                    <input
                      type="text"
                      name="honeypot"
                      value={formData.honeypot}
                      onChange={handleChange}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Babatunde Adeleke"
                      className="w-full min-h-[52px] px-4 py-3.5 rounded-lg border border-line bg-white text-ink text-base placeholder:text-grey/50 focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. name@company.ng"
                        className="w-full min-h-[52px] px-4 py-3.5 rounded-lg border border-line bg-white text-ink text-base placeholder:text-grey/50 focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="e.g. +234 803 000 0000"
                        className="w-full min-h-[52px] px-4 py-3.5 rounded-lg border border-line bg-white text-ink text-base placeholder:text-grey/50 focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                      Message / Project Details *
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your engineering, installation, or supply requirements..."
                      className="w-full p-4 rounded-lg border border-line bg-white text-ink text-base placeholder:text-grey/50 focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs min-h-[140px]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full min-h-[58px] sm:min-h-[64px] py-4 px-6 inline-flex items-center justify-center gap-3 bg-red hover:bg-red-deep active:bg-red-deep text-white font-extrabold text-base sm:text-lg tracking-wide rounded-xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all cursor-pointer"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5 sm:w-6 sm:h-6 text-yellow shrink-0" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
