import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Zap,
  Wrench,
  Package,
  GraduationCap,
  CheckCircle,
  ArrowRight,
  FileCheck,
  HelpCircle,
  ArrowLeft,
} from 'lucide-react';
import content from '../data/content.json';
import Lightbox from '../components/Lightbox';
import InnerHeroCanvas from '../components/InnerHeroCanvas';
import { initScrollAnimations, refreshScroll } from '../lib/motion';

export default function ServiceDetail() {
  const { slug } = useParams();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = initScrollAnimations();
    refreshScroll();
    return () => {
      if (cleanup) cleanup();
    };
  }, [slug]);

  const service = content.services.find((s) => s.slug === slug);
  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const serviceIcons = {
    electrical: <Zap className="w-8 h-8 text-red" />,
    mechanical: <Wrench className="w-8 h-8 text-red" />,
    supply: <Package className="w-8 h-8 text-red" />,
    consultancy: <GraduationCap className="w-8 h-8 text-red" />,
  };

  const serviceHeroImages = {
    electrical: '/assets/projects/sbc-ikeja-4-4mw-1.jpg',
    mechanical: '/assets/projects/nbc-whrb.jpg',
    supply: '/assets/projects/kano-30mw-panels.jpg',
    consultancy: '/assets/projects/safety-award.jpg',
  };

  const relatedProjectIds = {
    electrical: ['kano-30mw-panels', 'mamuda-11kv-cabling', 'switchgear-11kv', 'rmu-service'],
    mechanical: ['nbc-whrb', 'cooling-radiator-34mw', 'gas-piping-burner', 'generator-room-soundproofing'],
    supply: ['switchgear-11kv', 'control-panel', 'cooling-radiator-34mw'],
    consultancy: ['safety-award', 'rmu-service'],
  };

  const relatedProjects = (relatedProjectIds[slug] || [])
    .map((id) => content.projects.find((p) => p.id === id))
    .filter(Boolean);

  const otherServices = content.services.filter((s) => s.slug !== slug);

  return (
    <div className="bg-white text-ink pt-16 sm:pt-20 lg:pt-24 pb-28 lg:pb-16">
      {/* 1. Header Banner */}
      <section className="relative bg-[#FAF9F5] text-ink border-b border-line py-12 sm:py-16 lg:py-24 overflow-hidden">
        {/* Full-Bleed Kinetic Background Motion with Authentic Project Photography */}
        <InnerHeroCanvas
          variant="services"
          image={serviceHeroImages[slug] || '/assets/projects/switchgear-11kv.jpg'}
        />

        <div className="relative z-10 max-w-container mx-auto px-5 lg:px-10">
          <div className="max-w-3xl">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-bold text-red uppercase tracking-wider mb-4 hover:underline"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to All Services</span>
            </Link>

            <div className="flex items-center gap-4 mt-2">
              <div className="p-3.5 bg-red-tint text-red rounded-[6px] border border-red/20 shrink-0 shadow-sm">
                {serviceIcons[slug]}
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold text-black tracking-tight leading-tight">
                {service.title}
              </h1>
            </div>

            <p className="text-lg sm:text-xl font-bold text-black mt-4 max-w-2xl leading-relaxed">
              {service.short}
            </p>

            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-line text-xs font-mono text-grey">
              <span className="font-bold text-red">END-TO-END TURNKEY TESTING</span>
              <span>•</span>
              <span className="font-bold text-black/85">CERTIFIED EQUIPMENT FIELD ENGINEERS</span>
              <span>•</span>
              <span className="font-bold text-black/85">FULL PERFORMANCE GUARANTEE</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Full Scope Checklist */}
      <section className="py-20 border-b border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Technical Scope
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black mt-2 tracking-tight">
              What Is Included in This Service
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 bg-white p-5 rounded-[6px] border border-line shadow-sm hover:border-red transition-colors"
              >
                <CheckCircle className="w-5 h-5 text-red shrink-0 mt-0.5" />
                <span className="text-sm font-semibold text-black leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Handover Deliverables */}
      <section className="py-20 bg-cream border-b border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
              Documentation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-black mt-2 tracking-tight">
              Handover Papers and Certification
            </h2>
            <p className="text-sm text-grey mt-1">
              Every job is completed with full engineering sign-off and warranty documentation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {content.about.do_deliver.map((del, idx) => (
              <div
                key={idx}
                className="bg-white p-5 rounded-[6px] border border-line shadow-sm flex items-start gap-3"
              >
                <FileCheck className="w-5 h-5 text-red shrink-0 mt-0.5" />
                <span className="text-xs font-semibold text-ink leading-relaxed">{del}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Related Projects */}
      {relatedProjects.length > 0 && (
        <section className="py-20 border-b border-line">
          <div className="max-w-container mx-auto px-5 lg:px-10">
            <div className="flex items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
                  Track Record
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-black mt-2 tracking-tight">
                  Related Projects Delivered
                </h2>
              </div>
              <Link
                to="/projects"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red hover:underline"
              >
                <span>View all projects</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProjects.map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => setSelectedProject(proj)}
                  className="bg-white border border-line rounded-[6px] overflow-hidden shadow-sm hover:shadow-card cursor-pointer group transition-all"
                >
                  <div className="relative aspect-[4/3] bg-black/10 overflow-hidden">
                    <img
                      src={`/${proj.photos[0]}`}
                      alt={proj.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-bold text-black group-hover:text-red transition-colors leading-snug">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-grey mt-1 line-clamp-2">{proj.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 5. Other Services Strip */}
      <section className="py-16 bg-cream border-b border-line">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <h3 className="text-base font-bold text-black uppercase tracking-wider mb-6">
            Other Capabilities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherServices.map((svc) => (
              <Link
                key={svc.slug}
                to={`/services/${svc.slug}`}
                className="bg-white p-5 rounded-[6px] border border-line hover:border-red transition-all flex items-center justify-between group shadow-sm"
              >
                <div>
                  <h4 className="text-sm font-bold text-black group-hover:text-red transition-colors">
                    {svc.title}
                  </h4>
                  <p className="text-xs text-grey mt-1 line-clamp-1">{svc.short}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-grey group-hover:text-red transition-colors shrink-0 ml-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Quote CTA */}
      <section className="py-16 bg-black text-white">
        <div className="max-w-container mx-auto px-5 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Request a quote for {service.title}
            </h2>
            <p className="text-white/70 text-sm mt-1">
              Provide your project requirements. We reply with technical specifications within 24 hours.
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

      <Lightbox
        isOpen={!!selectedProject}
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
}
