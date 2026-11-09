import React, { useState, useEffect } from 'react';
import { Filter, ArrowRight, Tag } from 'lucide-react';
import content from '../data/content.json';
import Lightbox from '../components/Lightbox';
import InnerHeroCanvas from '../components/InnerHeroCanvas';
import { initScrollAnimations, refreshScroll } from '../lib/motion';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = initScrollAnimations();
    refreshScroll();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const filterList = content.project_filters;

  const filteredProjects =
    activeFilter === 'All'
      ? content.projects
      : content.projects.filter((p) => p.tags.includes(activeFilter));

  const handleOpenLightbox = (proj) => {
    setSelectedProject(proj);
    setSelectedPhotoIndex(0);
  };

  const handleNextPhoto = () => {
    if (!selectedProject || !selectedProject.photos) return;
    setSelectedPhotoIndex((prev) => (prev + 1) % selectedProject.photos.length);
  };

  const handlePrevPhoto = () => {
    if (!selectedProject || !selectedProject.photos) return;
    setSelectedPhotoIndex((prev) =>
      prev === 0 ? selectedProject.photos.length - 1 : prev - 1
    );
  };

  return (
    <div className="bg-white text-ink pt-16 sm:pt-20 lg:pt-24 pb-28 lg:pb-16">
      {/* 1. Header */}
      <section className="relative bg-[#FAF9F5] text-ink border-b border-line py-12 sm:py-16 lg:py-24 overflow-hidden">
        {/* Full-Bleed Kinetic Background Motion with Authentic Project Photography */}
        <InnerHeroCanvas variant="projects" />

        <div className="relative z-10 max-w-container mx-auto px-5 lg:px-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px] border border-red/20 shadow-sm">
              Portfolio of Execution
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-black mt-4 tracking-tight leading-[1.08]">
              Our Projects
            </h1>
            <p className="text-lg sm:text-xl text-grey mt-4 max-w-2xl font-normal leading-relaxed">
              Real work, in real places. High-voltage installations, synchronised gas generation, industrial piping, and factory automation across Nigeria.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-line text-xs font-mono text-grey">
              <span className="font-bold text-red">MULTI-MEGAWATT CAPACITY</span>
              <span>•</span>
              <span>RAPID NATIONWIDE MOBILIZATION</span>
              <span>•</span>
              <span>100% ON-TIME COMMISSIONING RECORD</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Static Filter Bar */}
      <section className="py-6 bg-white border-b border-line relative z-10">
        <div className="max-w-container mx-auto px-5 lg:px-10 flex items-center gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-grey mr-3 shrink-0">
            <Filter className="w-3.5 h-3.5 text-red" />
            <span>Filter:</span>
          </div>

          {filterList.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-[6px] text-xs font-bold tracking-wide transition-all shrink-0 focus-visible:outline-none ${
                  isActive
                    ? 'bg-red text-white shadow-sm'
                    : 'bg-cream text-ink border border-line hover:border-red hover:text-red'
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>
      </section>

      {/* 3. Project Gallery Grid */}
      <section className="py-16">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => (
              <div
                key={proj.id}
                onClick={() => handleOpenLightbox(proj)}
                className="group bg-white border border-line rounded-[6px] overflow-hidden shadow-sm hover:shadow-card cursor-pointer transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] bg-black/10 overflow-hidden">
                  <img
                    src={`/${proj.photos[0]}`}
                    alt={proj.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />

                  {/* Tag Chip */}
                  <div className="absolute top-3 right-3 bg-black/85 text-white text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-[4px] border border-white/20">
                    {proj.tags[0]}
                  </div>

                  {/* Multi-photo indicator if more than 1 photo */}
                  {proj.photos.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-white/90 text-black text-[10px] font-bold px-2 py-0.5 rounded shadow">
                      {proj.photos.length} Photos
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-base font-bold text-black group-hover:text-red transition-colors leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-xs text-grey mt-2 line-clamp-3 leading-relaxed">
                    {proj.caption}
                  </p>
                  <div className="mt-4 pt-3 border-t border-line/60 flex items-center justify-between text-xs font-bold text-red">
                    <span>View Project Details</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Component */}
      <Lightbox
        isOpen={!!selectedProject}
        project={selectedProject}
        photoIndex={selectedPhotoIndex}
        onClose={() => setSelectedProject(null)}
        onNext={
          selectedProject?.photos?.length > 1 ? handleNextPhoto : undefined
        }
        onPrev={
          selectedProject?.photos?.length > 1 ? handlePrevPhoto : undefined
        }
      />
    </div>
  );
}
