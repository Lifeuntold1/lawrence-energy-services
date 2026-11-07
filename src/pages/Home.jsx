import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Shield,
  Zap,
  CheckCircle2,
  ChevronDown,
  Wrench,
  Package,
  GraduationCap,
} from 'lucide-react';
import content from '../data/content.json';
import Marquee from '../components/Marquee';
import HeroArt from '../components/HeroArt';
import FreeSwipeRail from '../components/FreeSwipeRail';
import WorkSafetyPillars from '../components/WorkSafetyPillars';
import Lightbox from '../components/Lightbox';
import LeaderModal from '../components/LeaderModal';
import { initScrollAnimations, refreshScroll } from '../lib/motion';

export default function Home() {
  const [activeTab, setActiveTab] = useState('who');
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);
  const [leaderModalOpen, setLeaderModalOpen] = useState(false);
  const railRef = useRef(null);

  useEffect(() => {
    const cleanup = initScrollAnimations();
    refreshScroll();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const serviceIcons = {
    electrical: <Zap className="w-6 h-6 text-red" />,
    mechanical: <Wrench className="w-6 h-6 text-red" />,
    supply: <Package className="w-6 h-6 text-red" />,
    consultancy: <GraduationCap className="w-6 h-6 text-red" />,
  };

  const servicePhotos = {
    electrical: 'assets/projects/kano-30mw-panels.jpg',
    mechanical: 'assets/projects/nbc-whrb.jpg',
    supply: 'assets/projects/mamuda-11kv-cabling.jpg',
    consultancy: 'assets/projects/rmu-service.jpg',
  };

  // Distinct projects for the rail including landmark SBC Ikeja IPP
  const railProjectIds = [
    'sbc-ikeja-ipp',
    'mamuda-30mw-jenbacher',
    'elebele-9mw-ipp',
    'oando-brass-3mw',
    'schneider-ogba-turbines',
    'kano-30mw-greenfield',
  ];
  const featuredRailProjects = railProjectIds
    .map((id) => content.projects.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="bg-white text-ink overflow-hidden">
      {/* 1. HERO SECTION - Architectural Technical Whiteprint with Precision Kinetic Motion */}
      <section className="relative min-h-0 sm:min-h-screen flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-14 lg:pt-28 lg:pb-20 bg-[#FAF9F5] text-ink border-b border-line overflow-hidden">
        {/* Subtle CAD Drafting Grid and Engineering Backdrop */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/projects/mamuda-30mw-jenbacher.jpg"
            alt="Power Plant Installation by LESL"
            className="w-full h-full object-cover object-center opacity-[0.05] mix-blend-multiply filter grayscale select-none scale-105"
          />
          {/* Subtle Ambient Radial Warmth */}
          <div className="absolute top-1/4 left-1/4 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-red/5 via-yellow/10 to-transparent blur-[120px] pointer-events-none" />
          {/* Architectural Technical Drafting Grid (36px CAD spacing) */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: 'linear-gradient(to right, #1E293B 1px, transparent 1px), linear-gradient(to bottom, #1E293B 1px, transparent 1px)',
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        {/* Ambient Kinetic Motion Art Watermark on Mobile with High-Contrast Pop */}
        <div className="lg:hidden absolute -right-8 sm:-right-6 top-[36%] sm:top-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] opacity-[0.52] sm:opacity-[0.54] pointer-events-none z-0 overflow-hidden select-none filter drop-shadow-[0_15px_35px_rgba(17,24,39,0.12)]">
          <HeroArt className="w-full scale-105" theme="light" />
        </div>

        {/* Soft Mobile Text Contrast Veil (Guarantees 100% Copy Legibility) */}
        <div className="lg:hidden absolute left-0 top-0 bottom-0 w-3/5 bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/90 to-transparent pointer-events-none z-[1]" />

        <div className="relative z-10 max-w-container mx-auto px-5 lg:px-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Hero Column */}
          <div className="lg:col-span-7 flex flex-col items-start gap-4 sm:gap-5 pt-1 lg:pt-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[4px] bg-red/10 border border-red/30 text-red text-xs font-mono font-bold tracking-widest uppercase">
              <Zap className="w-3.5 h-3.5 fill-red text-red" />
              <span>Lawrence Energy Services Limited</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[70px] xl:text-[74px] font-extrabold tracking-tight text-ink leading-[1.16] sm:leading-[1.14]">
              <span className="block">Engineering</span>
              <span className="block mt-1 sm:mt-2 text-ink">that keeps</span>
              <span className="block mt-1.5 sm:mt-2.5">
                <span className="inline-block px-2.5 sm:px-3.5 pt-1 sm:pt-1.5 pb-2 sm:pb-2.5 mr-1 sm:mr-1.5 bg-[#FFD700] text-black font-extrabold tracking-tight rounded-[4px] shadow-xs rotate-0 align-middle leading-none">
                  industry
                </span><span>running.</span>
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-grey leading-relaxed max-w-2xl font-normal">
              {content.hero.sub}
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 w-full sm:w-auto pt-6 sm:pt-2">
              <Link
                to="/quote"
                className="inline-flex items-center justify-center gap-3 bg-red hover:bg-red-deep text-white font-extrabold text-sm sm:text-base px-7 py-3.5 sm:py-4 rounded-[6px] shadow-md hover:shadow-lg transition-all hover:-translate-y-1 active:translate-y-0 group cursor-pointer"
              >
                <span>Request a quote</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-yellow transition-transform group-hover:translate-x-1" />
              </Link>

              <Link
                to="/projects"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-cream text-black font-bold text-sm sm:text-base px-6 py-3.5 sm:py-4 rounded-[6px] border border-line shadow-xs transition-all hover:-translate-y-1 cursor-pointer"
              >
                <span>See our work</span>
              </Link>
            </div>

            {/* 3 Proof Chips */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-3 text-xs text-grey-dark font-semibold border-t border-line w-full max-w-xl">
              <span className="inline-flex items-center gap-2 bg-white border border-line px-3 py-1.5 rounded-[4px] shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-red shrink-0" />
                <span>About 400 MW built</span>
              </span>
              <span className="inline-flex items-center gap-2 bg-white border border-line px-3 py-1.5 rounded-[4px] shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-red shrink-0" />
                <span>100,000 safe man-hours</span>
              </span>
              <span className="inline-flex items-center gap-2 bg-white border border-line px-3 py-1.5 rounded-[4px] shadow-2xs">
                <CheckCircle2 className="w-3.5 h-3.5 text-red shrink-0" />
                <span>Since 2009</span>
              </span>
            </div>
          </div>

          {/* Desktop-Only Right SVG Transmission Tower + Piping + Gear Art */}
          <div className="hidden lg:flex lg:col-span-5 justify-center items-center w-full max-w-[440px] xl:max-w-[500px] mx-auto">
            <HeroArt className="w-full" theme="light" />
          </div>
        </div>

        {/* Scroll Cue */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-grey text-xs font-semibold uppercase tracking-wider select-none">
          <span>Scroll</span>
          <ChevronDown className="w-4 h-4 animate-bounce text-red" />
        </div>
      </section>

      {/* 2. MOVING WORD STRIP */}
      <section className="bg-red border-y border-red-deep py-2.5" aria-label="Specialization Track">
        <Marquee items={content.hero.marquee_words} type="text" />
      </section>

      {/* Kinetic Energy Bus Line */}
      <div className="energy-line-container">
        <div className="energy-line-pulse" />
      </div>

      {/* 3. FOUR BALANCED SERVICES */}
      <section className="py-24 bg-white" id="services">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
                Core Disciplines
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-black mt-3 tracking-tight">
                Complete Engineering Services
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-red font-bold text-sm hover:underline shrink-0"
            >
              <span>Explore all technical capabilities</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.services.map((svc) => (
              <div
                key={svc.slug}
                data-reveal
                className="group relative bg-white border border-line rounded-[6px] overflow-hidden shadow-card hover:shadow-hover hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[4/3] overflow-hidden bg-black/10">
                    <img
                      src={`/${servicePhotos[svc.slug]}`}
                      alt={svc.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-white p-2.5 rounded-[6px] shadow-md border border-line">
                      {serviceIcons[svc.slug]}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-black group-hover:text-red transition-colors leading-snug mb-3">
                      {svc.title}
                    </h3>
                    <p className="text-sm text-grey leading-relaxed line-clamp-3">
                      {svc.short}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/services/${svc.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-red group-hover:text-red-deep transition-colors"
                  >
                    <span>View full scope</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <div className="w-full h-1 bg-transparent group-hover:bg-red mt-4 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kinetic Energy Bus Line */}
      <div className="energy-line-container">
        <div className="energy-line-pulse" />
      </div>

      {/* 4. ABOUT US (TABS + TRUE PROOF NUMBERS) */}
      <section className="py-24 bg-cream border-y border-line" id="about">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
            {/* Left Photo with Evans Pharm Capstone Gas Turbines (Order 2 on Mobile so Text Comes First) */}
            <div className="order-2 lg:order-1 lg:col-span-5 relative mt-6 lg:mt-0" data-reveal>
              <div className="relative rounded-[6px] overflow-hidden border-2 border-line shadow-card bg-black">
                <img
                  src="/assets/projects/evans-pharm-capstone.jpg"
                  alt="Turbine Installation at Evans Pharm"
                  className="w-full h-auto object-cover aspect-[4/5]"
                  loading="lazy"
                />
              </div>

              {/* Yellow Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-yellow text-black border-2 border-black px-6 py-4 rounded-[6px] shadow-xl">
                <p className="text-2xl sm:text-3xl font-extrabold leading-none tracking-tight">Since 2009</p>
              </div>
            </div>

            {/* Right Tabbed Narrative (Order 1 on Mobile so Users Read About First) */}
            <div className="order-1 lg:order-2 lg:col-span-7 flex flex-col gap-6" data-reveal>
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
                  About LESL
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
                  Over a Decade of Engineering Integrity
                </h2>
              </div>

              {/* Tabs Switcher */}
              <div className="flex border-b border-line gap-2 sm:gap-6">
                <button
                  type="button"
                  onClick={() => setActiveTab('who')}
                  className={`pb-3 text-sm sm:text-base font-bold transition-all relative ${
                    activeTab === 'who' ? 'text-red' : 'text-grey hover:text-black'
                  }`}
                >
                  Who We Are
                  {activeTab === 'who' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-red rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('mission')}
                  className={`pb-3 text-sm sm:text-base font-bold transition-all relative ${
                    activeTab === 'mission' ? 'text-red' : 'text-grey hover:text-black'
                  }`}
                >
                  Our Mission
                  {activeTab === 'mission' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-red rounded-full" />
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('vision')}
                  className={`pb-3 text-sm sm:text-base font-bold transition-all relative ${
                    activeTab === 'vision' ? 'text-red' : 'text-grey hover:text-black'
                  }`}
                >
                  Our Vision
                  {activeTab === 'vision' && (
                    <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-red rounded-full" />
                  )}
                </button>
              </div>

              {/* Tab Content Display */}
              <div className="min-h-[140px] text-base text-grey leading-relaxed">
                {activeTab === 'who' && (
                  <div className="space-y-4">
                    <p>{content.about.intro}</p>
                    <p className="font-semibold text-black">{content.about.why_choose}</p>
                  </div>
                )}
                {activeTab === 'mission' && (
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-black">{content.about.mission}</p>
                    <p>{content.about.approach}</p>
                  </div>
                )}
                {activeTab === 'vision' && (
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-black">{content.about.vision}</p>
                    <p>
                      We deliver systems that strengthen industrial manufacturing across Nigeria, ensuring businesses maintain uninterrupted power.
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 bg-black hover:bg-ink text-white font-bold text-sm px-6 py-3 rounded-[6px] transition-colors"
                >
                  <span>Learn more about our team and values</span>
                  <ArrowRight className="w-4 h-4 text-yellow" />
                </Link>
              </div>
            </div>
          </div>

          {/* 4 True Sourced Stats Counters */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-12 border-t border-line">
            {content.stats.map((stat, idx) => {
              const valStr = String(stat.value);
              const cleanNumber = parseFloat(valStr.replace(/[^0-9.]/g, '')) || 0;
              const unitLabel = stat.unit || stat.suffix;
              return (
                <div key={idx} className="bg-white p-6 rounded-[6px] border border-line shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="h-1 w-10 bg-red mb-4" />
                    <div className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-black flex items-baseline flex-wrap">
                      {stat.prefix && <span className="text-base sm:text-xl font-bold text-grey mr-1">{stat.prefix}</span>}
                      <span data-counter={cleanNumber}>{valStr}</span>
                      {unitLabel && <span className="text-lg sm:text-2xl font-bold text-red ml-1.5">{unitLabel}</span>}
                    </div>
                    <p className="text-xs sm:text-sm font-semibold text-grey mt-2 leading-snug">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. FEATURED PROJECTS FREE-SWIPE RAIL */}
      <section className="py-24 bg-white" id="projects">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
                Portfolio
              </span>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-black mt-3 tracking-tight">
                Work We Are Proud Of
              </h2>
              <p className="text-sm text-grey mt-2">
                Real engineering installations delivered across Nigeria. Swipe or use arrows to explore.
              </p>
            </div>
            <div className="flex items-center gap-4 sm:gap-6 shrink-0">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 text-red font-bold text-sm hover:underline"
              >
                <span>View all projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="hidden sm:flex items-center gap-2 pl-4 sm:pl-6 border-l border-line">
                <button
                  type="button"
                  onClick={() => railRef.current?.scroll('left')}
                  aria-label="Scroll projects left"
                  className="w-10 h-10 rounded-full border border-line bg-white hover:bg-cream text-black hover:text-red flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => railRef.current?.scroll('right')}
                  aria-label="Scroll projects right"
                  className="w-10 h-10 rounded-full border border-line bg-white hover:bg-cream text-black hover:text-red flex items-center justify-center transition-all duration-200 shadow-sm active:scale-95 cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Non-blocking Free Swipe Rail */}
          <FreeSwipeRail
            ref={railRef}
            projects={featuredRailProjects}
            onSelectProject={(proj) => setSelectedProject(proj)}
          />
        </div>
      </section>

      {/* 6. HOW WE WORK (PROCESS) */}
      <section className="py-24 bg-cream border-t border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Our Process
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
              Rigorous Execution From Plan to Handover
            </h2>
            <p className="text-sm text-grey mt-2">
              Every stage is planned with cost, timeline, and international safety compliance in mind.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {content.process.steps.map((step) => (
              <div
                key={step.n}
                data-reveal
                className="relative bg-white border border-line p-6 rounded-[6px] shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="text-3xl font-extrabold text-red mb-3 font-mono">
                    {step.n}
                  </div>
                  <h3 className="text-lg font-bold text-black mb-2">{step.title}</h3>
                  <p className="text-sm text-grey leading-relaxed">{step.text}</p>
                </div>
                <div className="w-8 h-1 bg-yellow mt-6" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Kinetic Energy Bus Line */}
      <div className="energy-line-container">
        <div className="energy-line-pulse" />
      </div>

      {/* 7. SAFETY BAND (WITH ALL 8 PILLARS REDRAWN) */}
      <section className="bg-red text-white py-24 border-y border-red-deep" id="safety">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          {/* Safety Header and Highlights */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
            <div className="lg:col-span-7 flex flex-col gap-5">
              <div className="inline-flex items-center gap-2 bg-black/25 text-yellow text-xs font-mono font-bold tracking-widest uppercase px-3 py-1 rounded-[4px] w-max">
                <Shield className="w-4 h-4 text-yellow" />
                <span>Zero Compromise</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
                {content.safety.headline}
              </h2>
              <p className="text-base sm:text-lg text-white/95 leading-relaxed font-normal">
                {content.safety.body}
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div className="bg-white text-black p-6 rounded-[6px] shadow-xl border border-white/20">
                <p className="text-3xl sm:text-4xl font-extrabold text-red">100,000</p>
                <p className="text-sm font-bold text-ink mt-1">Safe man-hours without a lost-time injury</p>
              </div>

              <div className="bg-white text-black p-6 rounded-[6px] shadow-xl border border-white/20">
                <p className="text-3xl sm:text-4xl font-extrabold text-black">1st Place</p>
                <p className="text-sm font-bold text-ink mt-1">
                  Ranked #1 for safety compliance among Cummins West Africa vendors
                </p>
              </div>
            </div>
          </div>

          {/* Work Safety Pillars */}
          <div className="pt-4">
            <div className="mb-6">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                Work Safety Pillars
              </h3>
            </div>
            <WorkSafetyPillars variant="on-red" />
          </div>
        </div>
      </section>

      {/* 8. CLIENTS & PARTNERS */}
      <section className="py-24 bg-white" id="partners">
        <div className="max-w-container mx-auto px-5 lg:px-10 mb-12">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Trusted Partnerships
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
              Backed by Global and Domestic Industry Leaders
            </h2>
            <p className="text-sm text-grey mt-2">
              For over a decade, premier brands across West Africa have relied on LESL for critical power systems.
            </p>
          </div>
        </div>

        {/* Dual Marquees of Client Logos (100% natural full color) */}
        <div className="space-y-4 mb-16">
          <Marquee items={content.clients.filter((c) => c.logo).slice(0, 10)} type="logo" />
          <Marquee items={content.clients.filter((c) => c.logo).slice(9)} type="logo" reverse />
        </div>

        {/* 3 Strategic Partner Cards */}
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.partners.map((partner) => (
              <div
                key={partner.slug}
                data-reveal
                className="bg-white border-t-4 border-t-red border border-line p-6 rounded-[6px] shadow-card flex flex-col justify-between"
              >
                <div>
                  <div className="h-16 flex items-center mb-6">
                    <img
                      src={`/assets/client-logos/${partner.logo}`}
                      alt={partner.name}
                      className="max-h-12 max-w-[150px] object-contain"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-lg font-bold text-black mb-3">{partner.name}</h3>
                  <p className="text-sm text-grey leading-relaxed">{partner.story}</p>
                </div>

                {partner.highlight && (
                  <div className="mt-6 bg-cream border border-line p-3.5 rounded-[4px] text-xs font-semibold text-black">
                    <span className="text-red font-bold">Key Milestones: </span>
                    {partner.highlight}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/partners"
              className="inline-flex items-center gap-2 text-red font-bold text-sm hover:underline"
            >
              <span>Read our complete partner case studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. LEADERS SPOTLIGHT (EXACT ORGANOGRAM ORDER) */}
      <section className="py-24 bg-cream border-t border-line" id="leadership">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
                Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
                Seasoned Engineering Executives
              </h2>
            </div>
            <Link
              to="/about#org-chart"
              className="inline-flex items-center gap-2 text-red font-bold text-sm hover:underline shrink-0"
            >
              <span>View Company Structure</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Leaders Grid */}
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
                  {idx === 0 && (
                    <div className="absolute top-2 left-2 bg-yellow text-black text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-[4px] shadow">
                      Chairman & Managing Director
                    </div>
                  )}
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

      {/* 10. QUESTIONS & ANSWERS (FAQ) */}
      <section className="py-24 bg-white border-t border-line" id="faq">
        <div className="max-w-3xl mx-auto px-5 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Common Inquiries
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-black mt-3 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {content.faq.map((item, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="border border-line rounded-[6px] overflow-hidden transition-colors"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-base text-black hover:text-red transition-colors focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span>{item.q}</span>
                    <span className="text-xl font-bold ml-4 text-red">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-grey leading-relaxed border-t border-line/60 pt-3">
                      {item.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 11. BIG CALL BAND (GAS PIPING PHOTO UNDER DEEP RED OVERLAY) */}
      <section className="relative py-20 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/projects/gas-piping-burner.jpg"
            alt="Gas Piping to Boiler Burner"
            className="w-full h-full object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-red-deep/95 via-red/90 to-black/90" />
        </div>

        <div className="relative z-10 max-w-container mx-auto px-5 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-8 text-center sm:text-left">
          <div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
              Plan Your Power Installation With Confidence
            </h2>
            <p className="text-sm sm:text-base font-normal text-white/90 mt-2 max-w-xl">
              Speak directly with our technical leadership. Fast turnaround, precision engineering, and verified field compliance.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 shrink-0">
            <Link
              to="/quote"
              className="inline-flex items-center gap-2 bg-yellow hover:bg-yellow-gold text-black font-extrabold text-sm px-8 py-4 rounded-[6px] shadow-lg transition-transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Request a quote</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </Link>

            <Link
              to="/book"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold text-sm px-7 py-4 rounded-[6px] border border-white/30 backdrop-blur-sm transition-transform hover:-translate-y-0.5"
            >
              <span>Book consultation</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Modals */}
      <Lightbox
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <LeaderModal
        isOpen={leaderModalOpen}
        onClose={() => setLeaderModalOpen(false)}
      />
    </div>
  );
}
