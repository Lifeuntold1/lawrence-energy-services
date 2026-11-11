import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Award, ArrowRight, Building, CheckCircle } from 'lucide-react';
import content from '../data/content.json';
import InnerHeroCanvas from '../components/InnerHeroCanvas';
import { initScrollAnimations, refreshScroll } from '../lib/motion';

export default function Partners() {
  useEffect(() => {
    const cleanup = initScrollAnimations();
    refreshScroll();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const clientsWithLogos = content.clients.filter((c) => c.logo);
  const clientsWithoutLogos = content.clients.filter((c) => !c.logo);

  return (
    <div className="bg-white text-ink pt-16 sm:pt-20 lg:pt-24 pb-28 lg:pb-16">
      {/* 1. Page Header */}
      <section className="relative bg-[#FAF9F5] text-ink border-b border-line py-12 sm:py-16 lg:py-24 overflow-hidden">
        {/* Full-Bleed Kinetic Background Motion with Authentic Project Photography */}
        <InnerHeroCanvas variant="partners" />

        <div className="relative z-10 max-w-container mx-auto px-5 lg:px-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px] border border-red/20 shadow-sm">
              Institutional Alliances
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-black mt-4 tracking-tight leading-[1.08]">
              Clients &amp; Partners
            </h1>
            <p className="text-lg sm:text-xl font-bold text-black mt-4 max-w-2xl leading-relaxed">
              Long-standing collaborations with multinational manufacturers and power infrastructure providers across West Africa.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-line text-xs font-mono text-grey">
              <span className="font-bold text-red">TRUSTED CLARKE ENERGY &amp; CUMMINS PARTNER</span>
              <span>•</span>
              <span className="font-bold text-black/85">TRUSTED BY CUMMINS WEST AFRICA, CLARKE ENERGY LTD &amp; 7UP BOTTLING COMPANY</span>
              <span>•</span>
              <span className="font-bold text-black/85">DECADE-LONG CLIENT RETENTION</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Partnership Figures */}
      <section className="py-12 bg-white border-b border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 bg-cream rounded-[6px] border border-line">
              <div className="flex items-baseline gap-1.5">
                <p className="text-3xl sm:text-4xl font-extrabold text-red">~400</p>
                <span className="text-lg font-bold text-red">MW</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-black mt-1">
                Installed Power Capacity
              </p>
              <p className="text-xs text-grey mt-1.5 leading-relaxed">
                Industrial power plants and Jenbacher gas generators commissioned with Clarke Energy across Nigeria since 2012.
              </p>
            </div>

            <div className="p-6 bg-cream rounded-[6px] border border-line">
              <div className="flex items-baseline gap-1.5">
                <p className="text-3xl sm:text-4xl font-extrabold text-black">12+</p>
                <span className="text-lg font-bold text-black">Years</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-red mt-1">
                Cummins &amp; Seven-Up Alliance
              </p>
              <p className="text-xs text-grey mt-1.5 leading-relaxed">
                Over a decade of continuous electrical and mechanical contracting across independent power and beverage facilities nationwide.
              </p>
            </div>

            <div className="p-6 bg-cream rounded-[6px] border border-line">
              <div className="flex items-baseline gap-1.5">
                <p className="text-3xl sm:text-4xl font-extrabold text-red">9</p>
                <span className="text-lg font-bold text-red">Bottling Plants</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-black mt-1">
                Seven-Up Bottling Co. Nationwide
              </p>
              <p className="text-xs text-grey mt-1.5 leading-relaxed">
                Turnkey power generation, factory electrical installations, and resident engineering teams deployed across all 9 regional beverage plants in Nigeria.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Detailed Strategic Partner Stories */}
      <section className="py-20 border-b border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10 space-y-12">
          <div className="max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Case Studies
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-2 tracking-tight">
              Strategic Industry Relationships
            </h2>
          </div>

          {content.partners.map((partner) => (
            <div
              key={partner.slug}
              className="bg-white border-t-4 border-t-red border border-line p-8 sm:p-10 rounded-[6px] shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
            >
              <div className="lg:col-span-4 flex flex-col gap-4">
                <div className="h-20 sm:h-24 flex items-center">
                  <img
                    src={`/assets/client-logos/${partner.logo}`}
                    alt={partner.name}
                    className="max-h-20 sm:max-h-24 max-w-[250px] sm:max-w-[290px] object-contain"
                    loading="lazy"
                  />
                </div>
                <h3 className="text-xl font-bold text-black">{partner.name}</h3>
                {partner.highlight && (
                  <div className="p-4 bg-yellow/20 border-l-4 border-l-black rounded-r-[4px] text-xs font-semibold text-black leading-relaxed">
                    {partner.highlight}
                  </div>
                )}
              </div>

              <div className="lg:col-span-8 space-y-4">
                <p className="text-sm sm:text-base text-grey leading-relaxed">
                  {partner.story}
                </p>

                {partner.bullets && (
                  <div className="space-y-2 pt-2">
                    <p className="text-xs font-bold uppercase tracking-wider text-black">
                      Delivered Programs &amp; Scopes:
                    </p>
                    {partner.bullets.map((bullet, bIdx) => (
                      <div key={bIdx} className="flex items-start gap-2.5 text-xs font-medium text-ink">
                        <CheckCircle className="w-4 h-4 text-red shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Complete Verified Client Wall */}
      <section className="py-20 bg-cream border-b border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Client Roster
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
              Verified Industrial Clients
            </h2>
            <p className="text-sm text-grey mt-2">
              Trusted by enterprise manufacturers, independent power producers, and multinational corporations across West Africa.
            </p>
          </div>

          {/* Logo Grid - Enlarged & High Visibility */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
            {clientsWithLogos.map((client, idx) => (
              <div
                key={idx}
                className="logo-tile bg-white border border-line rounded-[8px] p-3 sm:p-4 md:p-5 h-36 sm:h-44 md:h-48 flex items-center justify-center text-center shadow-sm hover:shadow-md hover:border-red/40 transition-all group overflow-hidden"
              >
                <img
                  src={`/${client.logo}`}
                  alt={client.name}
                  className={`object-contain transition-transform duration-300 group-hover:scale-110 ${
                    client.logo.includes('newbisco')
                      ? 'w-[96%] max-h-24 sm:max-h-28 scale-[1.3]'
                      : client.logo.includes('metal-packaging')
                      ? 'w-[94%] max-h-[6.5rem] sm:max-h-[7.5rem] scale-125'
                      : client.logo.includes('tgi')
                      ? 'w-[90%] max-h-[6.5rem] sm:max-h-[7.5rem] scale-125'
                      : client.logo.includes('primera')
                      ? 'w-[92%] max-h-[6.5rem] sm:max-h-[7.5rem] scale-[1.2]'
                      : client.logo.includes('clarke')
                      ? 'w-[94%] max-h-[6.5rem] sm:max-h-[7.5rem] scale-[1.2]'
                      : client.logo.includes('dufil')
                      ? 'w-[88%] max-h-28 sm:max-h-32 scale-[1.2]'
                      : client.logo.includes('cummins')
                      ? 'h-[80%] sm:h-[86%] max-h-28 sm:max-h-[8.5rem] w-auto scale-[1.15]'
                      : client.logo.includes('aspira') || client.logo.includes('mdv')
                      ? 'h-[80%] sm:h-[86%] max-h-28 sm:max-h-[8.5rem] w-auto scale-110'
                      : 'w-auto h-auto max-h-28 sm:max-h-[8.5rem] max-w-[88%] sm:max-w-[92%] scale-[1.15]'
                  }`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Name Chips for Clients Without Logos */}
          {clientsWithoutLogos.length > 0 && (
            <div className="mt-10 pt-8 border-t border-line flex flex-wrap items-center justify-center gap-4">
              <span className="text-xs font-bold text-grey uppercase tracking-wider">
                Additional Enterprise Clients:
              </span>
              {clientsWithoutLogos.map((client, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-white border border-line rounded-[6px] text-xs font-bold text-black shadow-sm"
                >
                  {client.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. CTA Strip */}
      <section className="py-16 bg-red text-white">
        <div className="max-w-container mx-auto px-5 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Partner With LESL for Your Next Build
            </h2>
            <p className="text-white/80 text-sm mt-1">
              Connect directly with our operations team for technical tenders and contracts.
            </p>
          </div>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-yellow hover:bg-yellow-gold text-black font-bold text-sm px-8 py-3.5 rounded-[6px] shadow-lg shrink-0 transition-transform hover:-translate-y-0.5"
          >
            <span>Request a quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
