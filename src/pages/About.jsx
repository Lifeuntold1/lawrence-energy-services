import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Shield,
  CheckCircle2,
} from 'lucide-react';
import content from '../data/content.json';
import OrgChart from '../components/OrgChart';
import LeaderModal from '../components/LeaderModal';
import WorkSafetyPillars from '../components/WorkSafetyPillars';
import InnerHeroCanvas from '../components/InnerHeroCanvas';
import { initScrollAnimations, refreshScroll } from '../lib/motion';

export default function About() {
  const [leaderModalOpen, setLeaderModalOpen] = useState(false);

  useEffect(() => {
    const cleanup = initScrollAnimations();
    refreshScroll();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div className="bg-white text-ink pt-16 sm:pt-20 lg:pt-24 pb-28 lg:pb-16">
      {/* 1. PAGE HEADER */}
      <section className="relative bg-[#FAF9F5] text-ink border-b border-line py-12 sm:py-16 lg:py-24 overflow-hidden">
        {/* Full-Bleed Kinetic Background Motion with Authentic Project Photography */}
        <InnerHeroCanvas variant="about" />

        <div className="relative z-10 max-w-container mx-auto px-5 lg:px-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px] border border-red/20 shadow-sm">
              Company Heritage
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-black mt-4 tracking-tight leading-[1.08]">
              About LESL
            </h1>
            <p className="text-lg sm:text-xl font-bold text-black mt-4 max-w-2xl leading-relaxed">
              Industrial engineering services and contracting firm founded in 2009, incorporated in 2012. Building heavy power and factory systems across West Africa.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-line text-xs font-mono text-grey">
              <span className="font-bold text-red">ESTABLISHED 2009 WITH NATIONWIDE REACH</span>
              <span>•</span>
              <span className="font-bold text-black/85">100,000 ACCIDENT-FREE MAN-HOURS</span>
              <span>•</span>
              <span className="font-bold text-black/85">FULLY ACCREDITED NEMSA CONTRACTOR</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. OUR STORY & APPROACH */}
      <section className="py-20 border-b border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black tracking-tight">
                Engineering Nigeria's Industrial Backbone
              </h2>
              <p className="text-base text-grey leading-relaxed">
                {content.about.intro}
              </p>
              <p className="text-base text-grey leading-relaxed">
                {content.about.why_choose}
              </p>
              <div className="p-5 bg-cream border-l-4 border-l-red rounded-r-[6px]">
                <p className="text-base font-semibold text-black">
                  Our Approach: {content.about.approach}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative rounded-[6px] overflow-hidden border border-line shadow-card">
                <img
                  src="/assets/projects/elebele-9mw-ipp.jpg"
                  alt="LESL 9MW Power Plant Elebele"
                  className="w-full h-auto object-cover aspect-[4/3]"
                />
                <div className="p-4 bg-white border-t border-line">
                  <p className="text-xs font-mono font-bold text-red uppercase tracking-wider">Independent Power Project</p>
                  <p className="text-sm font-bold text-black mt-0.5">9 MW Independent Power Plant at Elebele, Yenagoa, Bayelsa State</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OUR RECORD SPEAKS FOR ITSELF (SOURCED BIG NUMBERS) */}
      <section className="py-20 bg-cream border-b border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Proven Performance
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
              Our Record Speaks for Itself
            </h2>
            <p className="text-sm text-grey mt-2">
              Verifiable engineering statistics sourced directly from audited project records and vendor evaluations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.stats.map((stat, idx) => {
              const valStr = String(stat.value);
              const cleanNumber = parseFloat(valStr.replace(/[^0-9.]/g, '')) || 0;
              return (
                <div
                  key={idx}
                  data-reveal
                  className="bg-white p-7 rounded-[6px] border border-line shadow-sm flex flex-col justify-between"
                >
                  <div>
                    <div className="h-1.5 w-10 bg-red mb-4 rounded-full" />
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black flex items-baseline flex-wrap">
                      {stat.prefix && (
                        <span className="text-base sm:text-xl font-bold text-grey mr-1">
                          {stat.prefix}
                        </span>
                      )}
                      {stat.type !== 'badge' ? (
                        <span data-counter={cleanNumber}>{valStr}</span>
                      ) : (
                        <span>{valStr}</span>
                      )}
                      {(stat.unit || stat.suffix) && (
                        <span className="text-lg sm:text-2xl font-bold text-red ml-1.5">
                          {stat.unit || stat.suffix}
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-bold text-black mt-3">{stat.label}</p>
                    <p className="text-xs text-grey mt-1 leading-relaxed">{stat.detail}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-line/60 flex items-center gap-1.5 text-[11px] font-mono text-grey">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red" />
                    <span>Verified Project Metric</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. MISSION & VISION */}
      <section className="py-20 bg-white border-b border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-cream border-t-4 border-t-red border border-line p-8 rounded-[6px] shadow-sm">
              <div className="w-12 h-12 bg-red-tint rounded-[6px] flex items-center justify-center mb-6">
                <Target className="w-6 h-6 text-red" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Our Mission</h3>
              <p className="text-base text-grey leading-relaxed">{content.about.mission}</p>
            </div>

            <div className="bg-cream border-t-4 border-t-yellow border border-line p-8 rounded-[6px] shadow-sm">
              <div className="w-12 h-12 bg-yellow/20 rounded-[6px] flex items-center justify-center mb-6">
                <Eye className="w-6 h-6 text-black" />
              </div>
              <h3 className="text-xl font-bold text-black mb-3">Our Vision</h3>
              <p className="text-base text-grey leading-relaxed">{content.about.vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SEVEN CORE VALUES */}
      <section className="py-20 bg-cream border-b border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Guiding Principles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
              Our Core Values
            </h2>
            <p className="text-sm text-grey mt-2">
              The ethical framework guiding every technical decision on site.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.values.map((val, idx) => (
              <div
                key={idx}
                className="bg-white border border-line p-6 rounded-[6px] shadow-sm hover:border-red transition-colors flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-cream text-red font-extrabold text-sm flex items-center justify-center mb-4 border border-line font-mono">
                    0{idx + 1}
                  </div>
                  <h3 className="text-base font-bold text-black mb-1">{val.name}</h3>
                  <p className="text-sm text-grey leading-relaxed">{val.line}</p>
                </div>
                <div className="w-6 h-1 bg-yellow mt-5" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. WHAT MAKES US DIFFERENT & WHO WE SERVE */}
      <section className="py-20 bg-white border-b border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: What sets us apart */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
                  Competitive Edge
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-black mt-2 tracking-tight">
                  What Sets LESL Apart
                </h2>
              </div>

              <div className="space-y-3">
                {content.about.different.map((point, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 bg-cream p-4 rounded-[6px] border border-line"
                  >
                    <CheckCircle className="w-5 h-5 text-red shrink-0 mt-0.5" />
                    <span className="text-sm font-semibold text-ink">{point}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Who we serve */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
                  Sectors
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-black mt-2 tracking-tight">
                  Who We Serve
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.about.who_we_serve.map((sector, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 bg-cream p-3.5 rounded-[6px] border border-line text-xs font-semibold text-black"
                  >
                    <Briefcase className="w-4 h-4 text-red shrink-0" />
                    <span>{sector}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WORK SAFETY PILLARS */}
      <section className="py-20 bg-cream border-b border-line" id="safety-pillars">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Zero Compromise
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
              Work Safety Pillars
            </h2>
            <p className="text-sm text-grey mt-2">
              The foundational safety standard enforced across all active project sites.
            </p>
          </div>

          <WorkSafetyPillars variant="light" />
        </div>
      </section>

      {/* 8. DRAWN ORGANOGRAM (ORG CHART) */}
      <section className="py-20 bg-white border-b border-line" id="org-chart">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Team &amp; Management
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
              Company Organization Chart
            </h2>
            <p className="text-sm text-grey mt-2">
              Clear accountability across management, field engineering, safety, and operations.
            </p>
          </div>

          <OrgChart />
        </div>
      </section>

      {/* 9. LEADERSHIP TEAM (EXACT ORGANOGRAM REPORTING ORDER) */}
      <section className="py-20 bg-cream border-b border-line" id="leadership">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Executive Team
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
              Our Leadership
            </h2>
            <p className="text-sm text-grey mt-2">
              Reporting structure: Chairman & Managing Director, Director of Operations, and Senior Team Heads.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {content.leaders.map((leader, idx) => (
              <div
                key={idx}
                onClick={idx === 0 ? () => setLeaderModalOpen(true) : undefined}
                className={`bg-white border border-line rounded-[6px] overflow-hidden shadow-sm hover:shadow-card transition-all group ${
                  idx === 0 ? 'cursor-pointer ring-2 ring-red/30' : ''
                }`}
              >
                <div className="relative aspect-[4/5] bg-black/10 overflow-hidden">
                  <img
                    src={`/${leader.photo}`}
                    alt={leader.name}
                    className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-sm font-bold text-black leading-snug group-hover:text-red transition-colors">
                    {leader.name}
                  </h3>
                  <p className="text-xs text-grey mt-1">{leader.title}</p>
                  {idx === 0 && (
                    <span className="inline-block text-[11px] font-bold text-red mt-3 hover:underline">
                      View profile &rarr;
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10. SAFETY REPUTATION CTA */}
      <section className="py-20 bg-red text-white">
        <div className="max-w-container mx-auto px-5 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-yellow bg-black/20 px-3 py-1 rounded-[4px]">
              Safety Excellence
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
              100,000 Safe Man-Hours Without Lost-Time Injury
            </h2>
            <p className="text-white/90 text-sm sm:text-base mt-2">
              Ranked first for safety compliance by Cummins West Africa. We protect lives, machines, and client investments.
            </p>
          </div>

          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-yellow hover:bg-yellow-gold text-black font-extrabold text-sm px-8 py-4 rounded-[6px] shadow-lg shrink-0 transition-transform hover:-translate-y-0.5"
          >
            <span>Request a quote</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <LeaderModal
        isOpen={leaderModalOpen}
        onClose={() => setLeaderModalOpen(false)}
      />
    </div>
  );
}
