import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Video, Building2, CheckCircle2, ArrowRight } from 'lucide-react';
import content from '../data/content.json';
import InnerHeroCanvas from '../components/InnerHeroCanvas';

export default function Book() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    topic: 'Electrical Installation',
    meetingType: 'In person',
    date: '',
    time: '10:00 AM',
    note: '',
    honeypot: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Today formatted as YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const dayOfWeek = selectedDate.getUTCDay();
    // 0 is Sunday, 6 is Saturday
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      alert('Meetings are scheduled Monday to Friday only (9:00 am - 5:00 pm). Please select a weekday.');
      return;
    }
    setFormData({ ...formData, date: e.target.value });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.honeypot) return;
    setSubmitted(true);
  };

  const timeSlots = [
    '09:00 AM',
    '09:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '12:00 PM',
    '12:30 PM',
    '01:00 PM',
    '01:30 PM',
    '02:00 PM',
    '02:30 PM',
    '03:00 PM',
    '03:30 PM',
    '04:00 PM',
    '04:30 PM',
  ];

  return (
    <div className="bg-white text-ink pt-16 sm:pt-20 lg:pt-24 pb-28 lg:pb-20">
      {/* Header */}
      <section className="relative bg-[#FAF9F5] text-ink border-b border-line py-12 sm:py-16 lg:py-24 overflow-hidden">
        {/* Full-Bleed Kinetic Background Motion with Authentic Project Photography */}
        <InnerHeroCanvas variant="contact" image="/assets/projects/sbc-ikeja-4-4mw-1.jpg" />

        <div className="relative z-10 max-w-container mx-auto px-5 lg:px-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px] border border-red/20 shadow-sm">
              Consultation Scheduling
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-black mt-4 tracking-tight leading-[1.08]">
              Book a Technical Consultation
            </h1>
            <p className="text-lg sm:text-xl text-grey mt-4 max-w-2xl font-normal leading-relaxed">
              Schedule a 30 to 60 minute briefing with the General Manager or designated lead project engineer.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-line text-xs font-mono text-grey">
              <span className="font-bold text-red">DIRECT ONE-ON-ONE CHIEF ENGINEER BRIEFING</span>
              <span>•</span>
              <span>CUSTOM POWER &amp; PIPING ARCHITECTURE REVIEW</span>
              <span>•</span>
              <span>ZERO CONSULTATION OBLIGATION</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Form Area */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          {submitted ? (
            <div className="bg-cream border-2 border-red p-8 sm:p-12 rounded-[6px] text-center shadow-lg space-y-6">
              <div className="w-16 h-16 bg-red text-yellow rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-extrabold text-black">Consultation Requested</h2>
              <p className="text-base text-grey max-w-md mx-auto leading-relaxed">
                Thank you. We got your booking request. We will review engineering calendar availability and confirm your session time by email within 24 hours.
              </p>
              <div className="p-4 bg-white border border-line rounded-[6px] text-xs font-semibold text-black max-w-md mx-auto text-left space-y-1">
                <p><span className="text-red font-bold">Selected Format:</span> {formData.meetingType}</p>
                <p><span className="text-red font-bold">Proposed Date:</span> {formData.date}</p>
                <p><span className="text-red font-bold">Slot:</span> {formData.time}</p>
              </div>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="inline-flex items-center gap-2 text-xs font-bold text-red hover:underline pt-2"
              >
                <span>Book another session</span>
              </button>
            </div>
          ) : (
            <div className="bg-white border border-line rounded-xl p-5 sm:p-8 lg:p-12 shadow-card">
              <div className="border-b border-line pb-6 mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-black">Meeting Request Details</h2>
                <p className="text-xs sm:text-sm text-grey mt-1">
                  Sessions run Monday to Friday, 9:00 am to 5:00 pm. Duration is 30 to 60 minutes.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Honeypot */}
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
                      placeholder="e.g. Femi Alabi"
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
                      placeholder="e.g. Consolidated Breweries Plc"
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
                      placeholder="e.g. f.alabi@company.com"
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
                      placeholder="e.g. +234 802 345 6789"
                      className="w-full min-h-[52px] px-4 py-3.5 rounded-lg border border-line bg-white text-ink text-base placeholder:text-grey/50 focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                      Consultation Topic *
                    </label>
                    <select
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      className="w-full min-h-[52px] px-4 py-3.5 rounded-lg border border-line bg-white text-ink text-base focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs"
                    >
                      <option value="Electrical Installation">Electrical Plant Installation</option>
                      <option value="Gas Turbines and Generators">Gas Turbines &amp; Jenbacher Sets</option>
                      <option value="Mechanical and Piping">Mechanical Fabrication &amp; Piping</option>
                      <option value="Equipment Supply">Turnkey Equipment Supply</option>
                      <option value="Testing and Commissioning">High Voltage Testing &amp; Commissioning</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                      Meeting Format *
                    </label>
                    <div className="grid grid-cols-2 gap-3 min-h-[52px]">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, meetingType: 'In person' })}
                        className={`flex items-center justify-center gap-2 rounded-lg border text-xs sm:text-sm font-bold transition-all px-3 py-2.5 ${
                          formData.meetingType === 'In person'
                            ? 'bg-red text-white border-red shadow-sm'
                            : 'bg-cream text-black border-line hover:border-red'
                        }`}
                      >
                        <Building2 className="w-4 h-4 shrink-0" />
                        <span>In Person</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, meetingType: 'Online' })}
                        className={`flex items-center justify-center gap-2 rounded-lg border text-xs sm:text-sm font-bold transition-all px-3 py-2.5 ${
                          formData.meetingType === 'Online'
                            ? 'bg-red text-white border-red shadow-sm'
                            : 'bg-cream text-black border-line hover:border-red'
                        }`}
                      >
                        <Video className="w-4 h-4 shrink-0" />
                        <span>Online</span>
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                      Preferred Date (Weekdays Only) *
                    </label>
                    <input
                      type="date"
                      name="date"
                      required
                      min={today}
                      value={formData.date}
                      onChange={handleDateChange}
                      className="w-full min-h-[52px] px-4 py-3.5 rounded-lg border border-line bg-white text-ink text-base focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                      Preferred Time Slot (9:00 AM - 5:00 PM) *
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full min-h-[52px] px-4 py-3.5 rounded-lg border border-line bg-white text-ink text-base focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>
                          {slot}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-black mb-2">
                    Agenda / Preliminary Project Information
                  </label>
                  <textarea
                    name="note"
                    rows={4}
                    value={formData.note}
                    onChange={handleChange}
                    placeholder="Provide context on your site, anticipated equipment needs, or questions for our engineers..."
                    className="w-full p-4 rounded-lg border border-line bg-white text-ink text-base placeholder:text-grey/50 focus:border-red focus:ring-2 focus:ring-red/20 focus:outline-none transition-all shadow-xs min-h-[120px]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[58px] sm:min-h-[64px] py-4 px-6 inline-flex items-center justify-center gap-3 bg-red hover:bg-red-deep active:bg-red-deep text-white font-extrabold text-base sm:text-lg tracking-wide rounded-xl shadow-lg hover:shadow-xl active:scale-[0.99] transition-all cursor-pointer"
                >
                  <span>Request Consultation Slot</span>
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 text-yellow shrink-0" />
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
