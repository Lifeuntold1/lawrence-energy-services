import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Wrench,
  Package,
  GraduationCap,
  ArrowRight,
  CheckCircle,
  FileText,
} from 'lucide-react';
import content from '../data/content.json';
import InnerHeroCanvas from '../components/InnerHeroCanvas';
import { initScrollAnimations, refreshScroll } from '../lib/motion';

export default function Services() {
  useEffect(() => {
    const cleanup = initScrollAnimations();
    refreshScroll();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const serviceIcons = {
    electrical: <Zap className="w-8 h-8 text-red" />,
    mechanical: <Wrench className="w-8 h-8 text-red" />,
    supply: <Package className="w-8 h-8 text-red" />,
    consultancy: <GraduationCap className="w-8 h-8 text-red" />,
  };

  const servicePhotos = {
    electrical: 'assets/projects/sbc-ikeja-4-4mw-1.jpg',
    mechanical: 'assets/projects/nbc-whrb.jpg',
    supply: 'assets/projects/kano-30mw-panels.jpg',
    consultancy: 'assets/projects/safety-award.jpg',
  };

  return (
    <div className="bg-white text-ink pt-16 sm:pt-20 lg:pt-24 pb-28 lg:pb-16">
      {/* Header */}
      <section className="relative bg-[#FAF9F5] text-ink border-b border-line py-12 sm:py-16 lg:py-24 overflow-hidden">
        {/* Full-Bleed Kinetic Background Motion with Authentic Project Photography */}
        <InnerHeroCanvas variant="services" />

        <div className="relative z-10 max-w-container mx-auto px-5 lg:px-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px] border border-red/20 shadow-sm">
              Engineering Capabilities
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-black mt-4 tracking-tight leading-[1.08]">
              Our Services
            </h1>
            <p className="text-lg sm:text-xl text-grey mt-4 max-w-2xl font-normal leading-relaxed">
              Four balanced engineering disciplines covering heavy industrial power plants, mechanical infrastructure, equipment procurement, and professional consultancy.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-line text-xs font-mono text-grey">
              <span className="font-bold text-red">TURNKEY ENGINEERING &amp; CONSTRUCTION</span>
              <span>•</span>
              <span>OVER 400 MW POWER COMMISSIONED</span>
              <span>•</span>
              <span>DIRECT MANUFACTURER PARTS &amp; WARRANTIES</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services List (4 Detailed Blocks with Full 33 Scope Items) */}
      <section className="py-20 border-b border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10 space-y-16">
          {content.services.map((svc, idx) => (
            <div
              key={svc.slug}
              id={svc.slug}
              data-reveal
              className={`grid grid-cols-1 lg:grid-cols-12 gap-10 items-start p-8 sm:p-10 rounded-[6px] border border-line ${
                idx % 2 === 1 ? 'bg-cream' : 'bg-white shadow-card'
              }`}
            >
              <div className={`lg:col-span-7 space-y-6 ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-tint rounded-[6px] border border-red/20">
                    {serviceIcons[svc.slug]}
                  </div>
                  <div>
                    <span className="text-xs font-mono font-bold text-red uppercase tracking-wider">
                      Engineering Discipline 0{idx + 1}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-extrabold text-black mt-0.5">
                      {svc.title}
                    </h2>
                  </div>
                </div>

                <p className="text-base text-grey leading-relaxed">{svc.short}</p>

                {/* Complete Portfolio Page 5 Line Items for this Category */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono font-bold text-black uppercase tracking-wider">
                    Full Technical Scope:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    {svc.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2 text-xs font-medium text-ink bg-white/70 p-2 rounded border border-line/60">
                        <CheckCircle className="w-3.5 h-3.5 text-red shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <Link
                    to={`/services/${svc.slug}`}
                    className="inline-flex items-center gap-2 bg-red hover:bg-red-deep text-white font-bold text-sm px-6 py-3 rounded-[6px] transition-colors"
                  >
                    <span>View project track record</span>
                    <ArrowRight className="w-4 h-4 text-yellow" />
                  </Link>

                  <Link
                    to="/quote"
                    className="inline-flex items-center gap-2 border border-ink text-ink font-semibold text-sm px-5 py-3 rounded-[6px] hover:bg-black hover:text-white transition-colors"
                  >
                    <span>Request quote</span>
                  </Link>
                </div>
              </div>

              <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="relative rounded-[6px] overflow-hidden border border-line shadow-sm">
                  <img
                    src={`/${servicePhotos[svc.slug]}`}
                    alt={svc.title}
                    className="w-full h-auto object-cover aspect-[4/3]"
                    loading="lazy"
                  />
                  <div className="p-4 bg-white border-t border-line">
                    <p className="text-xs font-mono font-bold text-red uppercase tracking-wider">LESL Field Installation</p>
                    <p className="text-sm font-bold text-black mt-0.5">{svc.title}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Handover Deliverables Section */}
      <section className="py-20 bg-cream border-b border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Turnkey Accountability
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
              What You Receive at Project Handover
            </h2>
            <p className="text-sm text-grey mt-2">
              Every installation concludes with complete documentation, testing certification, and warranty agreements.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.about.do_deliver.map((del, idx) => (
              <div
                key={idx}
                className="bg-white border border-line p-6 rounded-[6px] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-[6px] bg-red-tint flex items-center justify-center mb-4">
                    <FileText className="w-5 h-5 text-red" />
                  </div>
                  <h3 className="text-sm font-bold text-black mb-1 font-mono">Deliverable 0{idx + 1}</h3>
                  <p className="text-xs font-medium text-grey leading-relaxed">{del}</p>
                </div>
                <div className="w-8 h-1 bg-yellow mt-4" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="py-16 bg-red text-white">
        <div className="max-w-container mx-auto px-5 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Need technical advice for your facility?
            </h2>
            <p className="text-white/90 text-sm mt-1">
              Our site engineers evaluate plant specifications and provide clear cost estimates.
            </p>
          </div>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-yellow hover:bg-yellow-gold text-black font-extrabold text-sm px-8 py-3.5 rounded-[6px] shadow-lg shrink-0 transition-transform hover:-translate-y-0.5"
          >
            <span>Request a quote</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </Link>
        </div>
      </section>
    </div>
  );
}
