import React, { useEffect } from 'react';
import { Mail, CheckCircle, Shield, Award, Users, ArrowRight } from 'lucide-react';
import content from '../data/content.json';
import InnerHeroCanvas from '../components/InnerHeroCanvas';

export default function Careers() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-ink pt-16 sm:pt-20 lg:pt-24 pb-28 lg:pb-16">
      {/* Header */}
      <section className="relative bg-cream border-b border-line py-12 sm:py-16 lg:py-24 overflow-hidden">
        {/* Full-Bleed Kinetic Background Motion (Zero Text) */}
        <InnerHeroCanvas variant="careers" />

        <div className="relative z-10 max-w-container mx-auto px-5 lg:px-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px] border border-red/20 shadow-sm">
              Talent &amp; Culture
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-black mt-4 tracking-tight leading-[1.08]">
              Careers at LESL
            </h1>
            <p className="text-lg sm:text-xl text-grey mt-4 max-w-2xl font-normal leading-relaxed">
              {content.careers.body}
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-line text-xs font-mono text-grey">
              <span className="font-bold text-red">COREN &amp; NSE ACCREDITED PROJECTS</span>
              <span>•</span>
              <span>ZERO-COMPROMISE WORK SAFETY CULTURE</span>
              <span>•</span>
              <span>MERIT-BASED PROFESSIONAL GROWTH</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Narrative */}
      <section className="py-20 border-b border-line">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 text-center space-y-8">
          <div className="w-16 h-16 bg-red-tint text-red rounded-[6px] flex items-center justify-center mx-auto border border-red/20 shadow-sm">
            <Mail className="w-8 h-8" />
          </div>

          <div className="space-y-4">
            <h2 className="text-3xl font-extrabold text-black tracking-tight">
              {content.careers.headline}
            </h2>
            <p className="text-base text-grey leading-relaxed max-w-xl mx-auto">
              We continually look for skilled electrical engineers, mechanical technicians, certified welders, and HSE officers committed to strict international safety standards.
            </p>
          </div>

          <div className="pt-4">
            <a
              href={`mailto:${content.company.email}?subject=Technical%20Application%20-%20LESL`}
              className="inline-flex items-center gap-3 bg-red hover:bg-red-deep text-white font-bold text-base px-8 py-4 rounded-[6px] shadow-md transition-all hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Email Your CV to {content.company.email}</span>
              <ArrowRight className="w-5 h-5 text-yellow" />
            </a>
          </div>

          <p className="text-xs text-grey">
            Please include your resume, certifications (COREN / NSE / HSE if applicable), and location preferences.
          </p>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-cream">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Our Culture
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
              Why Engineers Choose LESL
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[6px] border border-line shadow-sm">
              <Shield className="w-8 h-8 text-red mb-4" />
              <h3 className="text-lg font-bold text-black mb-2">Safety Above All</h3>
              <p className="text-sm text-grey leading-relaxed">
                100,000 safe man-hours without lost-time injury. We provide top-tier PPE, regular drills, and prioritize site wellbeing.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[6px] border border-line shadow-sm">
              <Award className="w-8 h-8 text-red mb-4" />
              <h3 className="text-lg font-bold text-black mb-2">High-Profile Installations</h3>
              <p className="text-sm text-grey leading-relaxed">
                Work on multi-megawatt Jenbacher gas generators, 11 kV substations, and complex industrial piping across Nigeria.
              </p>
            </div>

            <div className="bg-white p-8 rounded-[6px] border border-line shadow-sm">
              <Users className="w-8 h-8 text-red mb-4" />
              <h3 className="text-lg font-bold text-black mb-2">Local Content Development</h3>
              <p className="text-sm text-grey leading-relaxed">
                Continuous mentorship, technical apprentice training, and career progression for Nigerian engineers and technicians.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
