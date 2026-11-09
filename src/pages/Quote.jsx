import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, FileText, Zap } from 'lucide-react';
import content from '../data/content.json';
import InnerHeroCanvas from '../components/InnerHeroCanvas';

export default function Quote() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: 'Electrical',
    location: '',
    details: '',
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
    if (formData.honeypot) return;
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
              Commercial &amp; Technical Estimation
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-black mt-4 tracking-tight leading-[1.08]">
              Request a Quote
            </h1>
            <p className="text-lg sm:text-xl font-bold text-black mt-4 max-w-2xl leading-relaxed">
              Provide your technical requirements. Our engineering team prepares a tailored bill of quantities and project estimate.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-line text-xs font-mono text-grey">
              <span className="font-bold text-red">DETAILED ENGINEERING BILL OF QUANTITIES</span>
              <span>•</span>
              <span className="font-bold text-black/85">FAST 24 TO 48 HOUR ESTIMATE TURNAROUND</span>
              <span>•</span>
              <span className="font-bold text-black/85">TRANSPARENT FIXED-PRICE CONTRACT TERMS</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Section */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          {submitted ? (
            <div className="bg-cream border-2 border-red p-8 sm:p-12 rounded-[6px] text-center shadow-lg space-y-6">
              <div className="w-16 h-16 bg-red text-yellow rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-extrabold text-black">Request Received</h2>
              <p className="text-base text-grey max-w-md mx-auto leading-relaxed">
                {content.forms.success_quote}
              </p>
              <div className="p-4 bg-white border border-line rounded-[6px] text-xs font-semibold text-black max-w-md mx-auto">
                <p>Have engineering drawings or single-line diagrams ready?</p>
                <p className="text-grey mt-1">You can attach and send them directly in response to our email confirmation.</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    name: '',
                    company: '',
                    email: '',
                    phone: '',
                    service: 'Electrical',
                    location: '',
                    details: '',
                    honeypot: '',
                  });
                }}
                className="inline-flex items-center gap-2 text-xs font-bold text-red hover:underline pt-2"
              >
                <span>Submit another quote request</span>
              </button>
            </div>
          ) : (
            <div className="bg-white border border-line rounded-xl p-5 sm:p-8 lg:p-12 shadow-card">
              <div className="border-b border-line pb-6 mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-black">Project Specification Form</h2>
                <p className="text-xs sm:text-sm text-grey mt-1">
                  All fields marked with an asterisk (*) are required to calculate an accurate quote.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot field */}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
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
                      placeholder="e.g. Engr. Chuka Obi"
                      className="w-full min-h-[52px] px-4 py-3.5 rounded-lg border border-line bg-white text-ink text-base placeholder:text-grey/50 focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                      Company / Organization *
                    </label>
                    <input
                      type="text"
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="e.g. Apex Industrial Works Ltd"
                      className="w-full min-h-[52px] px-4 py-3.5 rounded-lg border border-line bg-white text-ink text-base placeholder:text-grey/50 focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. c.obi@apexworks.ng"
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
                      placeholder="e.g. +234 803 123 4567"
                      className="w-full min-h-[52px] px-4 py-3.5 rounded-lg border border-line bg-white text-ink text-base placeholder:text-grey/50 focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                      Primary Service Needed *
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full min-h-[52px] px-4 py-3.5 rounded-lg border border-line bg-white text-ink text-base focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs"
                    >
                      <option value="Electrical">Electrical Installation &amp; Maintenance</option>
                      <option value="Mechanical">Mechanical Installation &amp; Piping</option>
                      <option value="Supply">Sales &amp; Equipment Supply</option>
                      <option value="Consultancy and training">Consultancy, Testing &amp; Training</option>
                      <option value="Not sure">Not Sure / Multi-disciplinary</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                      Project Location (State / City) *
                    </label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="e.g. Ikeja, Lagos or Challawa, Kano"
                      className="w-full min-h-[52px] px-4 py-3.5 rounded-lg border border-line bg-white text-ink text-base placeholder:text-grey/50 focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                    Scope Details &amp; Technical Requirements *
                  </label>
                  <textarea
                    name="details"
                    rows={6}
                    required
                    value={formData.details}
                    onChange={handleChange}
                    placeholder="Describe capacity (e.g. MW rating, piping medium, generator models, timeline targets)..."
                    className="w-full p-4 rounded-lg border border-line bg-white text-ink text-base placeholder:text-grey/50 focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs min-h-[140px]"
                  />
                  <p className="text-xs text-grey mt-2">
                    Note: Technical drawings or SLDs can be sent directly by email after we reply.
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[58px] sm:min-h-[64px] py-4 px-6 inline-flex items-center justify-center gap-3 bg-yellow hover:bg-yellow-gold active:bg-yellow-gold text-black font-extrabold text-base sm:text-lg tracking-wide rounded-xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Submit Request for Quote</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-black shrink-0" />
                </button>

                <div className="pt-2 text-center text-xs text-grey flex items-center justify-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-red" />
                  <span>Your information is held in strict commercial confidence.</span>
                </div>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
