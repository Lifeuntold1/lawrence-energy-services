import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Grid,
  Columns,
  ArrowRight,
  Filter,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  X,
} from 'lucide-react';
import content from '../data/content.json';
import InnerHeroCanvas from '../components/InnerHeroCanvas';
import { initScrollAnimations, refreshScroll } from '../lib/motion';

const GALLERY_PHOTOS = [
  {
    id: 'sbc-ikeja-ipp',
    title: '17.6 MW Gas Generator Installation for SBC Ikeja IPP',
    client: 'Seven-Up Bottling Company (SBC)',
    location: 'SBC Ikeja Plant, Oregun, Ikeja',
    category: 'Power Generation',
    specs: '17.6 MW (4 × 4.4 MW CAT Sets) / Complete BOPs',
    src: 'assets/projects/sbc-ikeja-4-4mw-2.jpg',
    caption: 'Procurement of installation materials, complete electrical and mechanical installation, and commissioning of four 4.4 MW Caterpillar gas generator sets with all balance of plant systems.',
  },
  {
    id: 'mamuda-30mw-jenbacher',
    title: '30 MW Synchronised Jenbacher Gas Generator Sets',
    client: 'Mamuda Group',
    location: 'Challawa, Kano',
    category: 'Power Generation',
    specs: '30 MW / Natural Gas / Synchronised Grid',
    src: 'assets/projects/mamuda-30mw-jenbacher.jpg',
    caption: 'Full turnkey installation, synchronization, and commissioning of multiple Jenbacher gas-fueled engine sets providing prime power for heavy manufacturing.',
  },
  {
    id: 'elebele-9mw-ipp',
    title: '9 MW Independent Power Plant (IPP)',
    client: 'Bayelsa State Government',
    location: 'Elebele, Yenagoa, Bayelsa State',
    category: 'Power Generation',
    specs: '9 MW / Turnkey Generation / 33 kV Substation',
    src: 'assets/projects/elebele-9mw-ipp.jpg',
    caption: 'Engineering, balance of plant, synchronization switchgear, and step-up transformer installation for the Elebele Independent Power Project.',
  },
  {
    id: 'oando-brass-3mw',
    title: '3 MW Power Plant at Crude Oil Terminal',
    client: 'RCE Overseas / Oando Brass',
    location: 'Brass Island, Bayelsa State',
    category: 'Power Generation',
    specs: '3 MW Prime Power / Marine Environment',
    src: 'assets/projects/oando-brass-3mw.jpg',
    caption: 'Offshore logistics, mechanical positioning, and electrical commissioning of 3 MW prime power units for terminal operations.',
  },
  {
    id: 'evans-pharm-capstone',
    title: 'Dual 2 MW Capstone Microturbine Installation',
    client: 'Evans Medical Plc',
    location: 'Agbara Industrial Zone, Ogun State',
    category: 'Power Generation',
    specs: '4 MW Combined / Capstone Turbines',
    src: 'assets/projects/evans-pharm-capstone.jpg',
    caption: 'Precision installation and exhaust heat integration of two 2 MW low-emission Capstone microturbine generators for pharmaceutical manufacturing.',
  },
  {
    id: 'schneider-ogba-turbines',
    title: 'Three 65 kW Gas Turbine Generating Sets',
    client: 'Schneider Electric',
    location: 'Ogba, Ikeja, Lagos',
    category: 'Power Generation',
    specs: '195 kW / Low Emission / Dual Fuel',
    src: 'assets/projects/schneider-ogba-turbines.jpg',
    caption: 'Electrical paralleling and mechanical installation of three compact turbine units integrated into Schneider Electric facilities.',
  },
  {
    id: 'schneider-ogba-turbines-2',
    title: 'Turbine Exhaust Stack & Thermal Lagging',
    client: 'Schneider Electric',
    location: 'Ogba, Ikeja, Lagos',
    category: 'Piping & Boilers',
    specs: 'High-Temperature Exhaust / Clad Insulation',
    src: 'assets/projects/schneider-ogba-turbines-2.jpg',
    caption: 'Fabrication and erection of stainless steel exhaust ductwork and thermal lagging for gas turbine installations.',
  },
  {
    id: 'kano-30mw-greenfield',
    title: '30 MW Greenfield Power Station Construction',
    client: 'Mamuda Group',
    location: 'Challawa, Kano',
    category: 'Power Generation',
    specs: 'Civil, Mechanical & Electrical Balance of Plant',
    src: 'assets/projects/kano-30mw-greenfield.jpg',
    caption: 'Ground-up plant construction including generator foundations, structural steel frames, cable trenches, and overhead crane rails.',
  },
  {
    id: 'kano-30mw-panels',
    title: '30 MW Central Synchronization & Control Desk',
    client: 'Mamuda Group',
    location: 'Challawa, Kano',
    category: 'Substations & Switchgear',
    specs: '30 MW Paralleling / PLC Automation / SCADA',
    src: 'assets/projects/kano-30mw-panels.jpg',
    caption: 'Assembly and commissioning of high-specification synchronization and protection panels controlling 30 MW aggregate power generation.',
  },
  {
    id: 'mamuda-11kv-cabling',
    title: '11 kV High Voltage Underground Distribution',
    client: 'Mamuda Group',
    location: 'Challawa, Kano',
    category: 'Distribution & Cabling',
    specs: '11 kV XLPE Armoured / Dual Feeder Lines',
    src: 'assets/projects/mamuda-11kv-cabling.jpg',
    caption: 'Trenching, bedding, and laying of 11,000 V cross-linked polyethylene armoured cables linking generation skids to main factory substations.',
  },
  {
    id: 'mamuda-11kv-cabling-2',
    title: '11 kV Heat-Shrink Cable Termination & Jointing',
    client: 'Mamuda Group',
    location: 'Challawa, Kano',
    category: 'Distribution & Cabling',
    specs: '11 kV Raychem Terminations / Hi-Pot Tested',
    src: 'assets/projects/mamuda-11kv-cabling-2.jpg',
    caption: 'Certified heat-shrink terminations, stress control tubes, and high-potential insulation resistance testing before line energization.',
  },
  {
    id: 'nbc-whrb',
    title: 'Waste Heat Recovery Boiler (WHRB) Erection',
    client: 'Nigerian Bottling Company (NBC)',
    location: 'Port Harcourt, Rivers State',
    category: 'Piping & Boilers',
    specs: 'Steam Generation / Flue Gas Heat Recovery',
    src: 'assets/projects/nbc-whrb.jpg',
    caption: 'Mechanical installation and high-pressure steam tie-ins for a cogeneration waste heat boiler capturing exhaust thermal energy.',
  },
  {
    id: 'nbc-whrb-2',
    title: 'Waste Heat Boiler Steam Manifold & High-Pressure Valves',
    client: 'Nigerian Bottling Company (NBC)',
    location: 'Port Harcourt, Rivers State',
    category: 'Piping & Boilers',
    specs: 'Schedule 80 Carbon Steel / X-Ray Inspected',
    src: 'assets/projects/nbc-whrb-2.jpg',
    caption: 'ASME-compliant high-pressure welded steam pipe manifold, non-return valves, and thermodynamic steam traps.',
  },
  {
    id: 'cooling-radiator-34mw',
    title: 'Cooling Radiator for 34 MW Gas Engine',
    client: 'Power Plant Facility',
    location: 'Industrial Estate, Nigeria',
    category: 'Piping & Boilers',
    specs: '34 MW Heat Dissipation / Dual Circuit / Variable Speed Array',
    src: 'assets/projects/cooling-radiator-3-4mw.jpg',
    caption: 'Rooftop electric cooling fan array and heat exchanger installation engineered for 34 MW gas engine jacket water and intercooler cooling circuits.',
  },
  {
    id: 'gas-piping-burner',
    title: 'High-Pressure Gas Supply to Boiler Burner',
    client: '7up Bottling Company Kano',
    location: 'Kano, Nigeria',
    category: 'Piping & Boilers',
    specs: 'Natural Gas / Certified Flanged Runs',
    src: 'assets/projects/gas-piping-burner.jpg',
    caption: 'Double-block-and-bleed gas train installation, slam-shut safety valves, and burner interconnecting pipeline for Seven-Up Bottling Company (SBC) Kano.',
  },
  {
    id: 'generator-room-soundproofing',
    title: 'Engine Room Soundproofing to Attain Up to 69 dB',
    client: 'Major Food Manufacturer',
    location: 'Ikeja Industrial Zone, Lagos',
    category: 'Factory Automation',
    specs: 'Acoustic Attenuation to 69 dB / Splitters & Dampers',
    src: 'assets/projects/generator-room-soundproofing.jpg',
    caption: 'Complete acoustic engineering including perforated galvanized sound panels, intake silencer louvers, and vibration isolators engineered to attain noise reduction up to 69 dB.',
  },
  {
    id: 'generator-room-soundproofing-2',
    title: 'Acoustic Attenuation Baffles & Air Dampers',
    client: 'Major Food Manufacturer',
    location: 'Ikeja Industrial Zone, Lagos',
    category: 'Factory Automation',
    specs: 'High-Volume Air Flow / Fire-Rated Dampers',
    src: 'assets/projects/generator-room-soundproofing-2.jpg',
    caption: 'Inlet air acoustic baffles engineered to supply maximum combustion and cooling air while mitigating plant sound pollution.',
  },
  {
    id: 'generator-room-soundproofing-3',
    title: 'Heavy Acoustic Double Doors & Escape Latches',
    client: 'Major Food Manufacturer',
    location: 'Ikeja Industrial Zone, Lagos',
    category: 'Factory Automation',
    specs: '45 dB STC Rating / Panic Hardware',
    src: 'assets/projects/generator-room-soundproofing-3.jpg',
    caption: 'Custom fabricated acoustic seals, emergency panic exit hardware, and noise-damping wall panelling.',
  },
  {
    id: 'switchgear-11kv',
    title: '11 kV Air-Insulated Switchgear Substation',
    client: 'Industrial Plant',
    location: 'Ogun State, Nigeria',
    category: 'Substations & Switchgear',
    specs: '11 kV / 1250 A / Vacuum Circuit Breakers',
    src: 'assets/projects/switchgear-11kv.jpg',
    caption: 'Assembly, copper busbar torquing, secondary wiring, and dielectric withstand testing of 11 kV switchgear lineup.',
  },
  {
    id: 'switchgear-11kv-2',
    title: 'Switchgear Relay Panel & Bus Compartments',
    client: 'Industrial Plant',
    location: 'Ogun State, Nigeria',
    category: 'Substations & Switchgear',
    specs: 'Microprocessor Protection / Arc Flash Relay',
    src: 'assets/projects/switchgear-11kv-2.jpg',
    caption: 'Digital overcurrent, earth fault, and differential relay calibration and secondary injection testing.',
  },
  {
    id: 'control-panel',
    title: 'Custom Motor Control Center (MCC) & Automatic Transfer Switch (ATS)',
    client: 'Industrial Client',
    location: 'Lagos, Nigeria',
    category: 'Substations & Switchgear',
    specs: 'Automatic Transfer / VFD Speed Control',
    src: 'assets/projects/control-panel.jpg',
    caption: 'Turnkey fabrication of modular motor control centers with variable speed drives and automatic mains failure switching.',
  },
  {
    id: 'rmu-service',
    title: 'Ring Main Unit (RMU) Overhaul & Gas Check',
    client: 'Commercial Substation',
    location: 'Lagos State',
    category: 'Safety & Commissioning',
    specs: 'SF6 Gas Insulated / 24 kV Rating',
    src: 'assets/projects/sbc-ikeja-4-4mw-1.jpg',
    caption: 'Turnkey installation, MV switchgear, SF6 gas verification, mechanism lubrication, and high-voltage circuit breaker commissioning.',
  },
  {
    id: 'rmu-service-2',
    title: 'Ring Main Unit High-Voltage Cable Termination Testing',
    client: 'Commercial Substation',
    location: 'Lagos State',
    category: 'Safety & Commissioning',
    specs: 'VLF (0.1 Hz) High-Voltage Insulation Test',
    src: 'assets/projects/rmu-service-2.jpg',
    caption: 'VLF (0.1 Hz) high-voltage insulation withstand testing to ensure integrity of new compact ring main substation feeds.',
  },
  {
    id: 'safety-award',
    title: '100,000 Safe Man-Hours Safety Recognition',
    client: 'Lagos Free Zone (LFZ)',
    location: 'Ibeju Lekki, Lagos',
    category: 'Safety & Commissioning',
    specs: 'Zero Lost-Time Injury / Top Ranked Vendor',
    src: 'assets/projects/safety-award.jpg',
    caption: 'Formal industry recognition awarded to LESL by Lagos Free Zone (LFZ) for 100,000 safe man-hours executed without a single lost-time incident.',
  },
];

const CATEGORIES = [
  'All Photos',
  'Power Generation',
  'Substations & Switchgear',
  'Piping & Boilers',
  'Distribution & Cabling',
  'Factory Automation',
  'Safety & Commissioning',
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All Photos');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'cinema'
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const railRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const cleanup = initScrollAnimations();
    refreshScroll();
    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  const filteredPhotos =
    activeCategory === 'All Photos'
      ? GALLERY_PHOTOS
      : GALLERY_PHOTOS.filter((p) => p.category === activeCategory);

  const openLightbox = (photo, idx) => {
    setSelectedPhoto(photo);
    setCurrentIndex(idx);
  };

  const nextPhoto = () => {
    const nextIdx = (currentIndex + 1) % filteredPhotos.length;
    setCurrentIndex(nextIdx);
    setSelectedPhoto(filteredPhotos[nextIdx]);
  };

  const prevPhoto = () => {
    const prevIdx = (currentIndex - 1 + filteredPhotos.length) % filteredPhotos.length;
    setCurrentIndex(prevIdx);
    setSelectedPhoto(filteredPhotos[prevIdx]);
  };

  const scrollRail = (direction) => {
    if (railRef.current) {
      const offset = direction === 'left' ? -420 : 420;
      railRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white text-ink pt-16 sm:pt-20 lg:pt-24 pb-28 lg:pb-16 min-h-screen">
      {/* 1. PAGE HEADER */}
      <section className="relative bg-[#FAF9F5] text-ink border-b border-line py-12 sm:py-16 lg:py-24 overflow-hidden">
        {/* Full-Bleed Kinetic Background Motion with Authentic Project Photography */}
        <InnerHeroCanvas variant="gallery" />

        <div className="relative z-10 max-w-container mx-auto px-5 lg:px-10">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px] border border-red/20 shadow-sm">
              Field Execution Archive
            </span>
            <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-extrabold text-black mt-4 tracking-tight leading-[1.08]">
              Engineering in the Field
            </h1>
            <p className="text-lg sm:text-xl text-grey mt-4 max-w-2xl font-normal leading-relaxed">
              A photographic record of power plants, high-voltage substations, industrial piping, and factory installations delivered across Nigeria.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-8 pt-6 border-t border-line text-xs font-mono text-grey">
              <span className="font-bold text-red">UNCOMPROMISED BUILD QUALITY</span>
              <span>•</span>
              <span>HEAVY SUBSTATIONS &amp; GENERATION ASSETS</span>
              <span>•</span>
              <span>100% IN-HOUSE DIRECT WORKMANSHIP</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NON-STICKY CONTROLS & FILTER BAR (Clean Flow, No Scroll Hijack) */}
      <section className="bg-white border-b border-line py-5">
        <div className="max-w-container mx-auto px-5 lg:px-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Category Filter Pills with Clean Hidden Scrollbar */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none', WebkitOverflowScrolling: 'touch' }}>
            <span className="text-xs font-mono font-bold text-grey uppercase tracking-wider shrink-0 mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-red" />
              Focus Areas:
            </span>
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-[4px] text-xs font-bold tracking-wide transition-all shrink-0 select-none ${
                    active
                      ? 'bg-red text-white shadow-sm'
                      : 'bg-cream text-ink hover:border-red hover:text-red border border-line'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* View Mode Toggle */}
          <div className="hidden sm:flex items-center gap-2 bg-cream p-1 rounded-[6px] border border-line shrink-0">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              aria-label="Grid view"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-xs font-bold transition-colors ${
                viewMode === 'grid'
                  ? 'bg-red text-white shadow'
                  : 'text-grey hover:text-black'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Grid Canvas</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cinema')}
              aria-label="Cinema view"
              className={`flex items-center gap-2 px-3 py-1.5 rounded-[4px] text-xs font-bold transition-colors ${
                viewMode === 'cinema'
                  ? 'bg-red text-white shadow'
                  : 'text-grey hover:text-black'
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Cinema Rail</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3. MAIN GALLERY VIEW MODES */}
      <section className="py-16">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          {viewMode === 'grid' ? (
            /* ================= VIEW A: BRIGHT GRID CANVAS ================= */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredPhotos.map((photo, idx) => (
                <div
                  key={photo.id}
                  data-reveal
                  onClick={() => openLightbox(photo, idx)}
                  className="group relative bg-white border border-line rounded-[6px] overflow-hidden shadow-card hover:border-red hover:shadow-hover cursor-pointer transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] bg-black/10 overflow-hidden">
                    <img
                      src={`/${photo.src}`}
                      alt={photo.title}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-106"
                      loading="lazy"
                    />

                    {/* Category Tag */}
                    <div className="absolute top-3 left-3 bg-black/80 text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-[4px] border border-white/20">
                      {photo.category}
                    </div>
                  </div>

                  {/* Metadata & Technical Specs */}
                  <div className="p-6">
                    <div className="text-[11px] font-mono text-grey uppercase tracking-wider mb-1.5">
                      {photo.client} &bull; {photo.location}
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-black group-hover:text-red transition-colors leading-snug mb-3">
                      {photo.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-grey line-clamp-2 leading-relaxed">
                      {photo.caption}
                    </p>

                    <div className="mt-4 pt-3.5 border-t border-line/70 flex items-center justify-between text-xs font-mono text-red font-bold">
                      <span className="truncate pr-2">{photo.specs}</span>
                      <Maximize2 className="w-3.5 h-3.5 shrink-0 transition-transform group-hover:scale-115" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            /* ================= VIEW B: BRIGHT CINEMA RAIL ================= */
            <div className="relative">
              {/* Rail Navigation Controls */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-extrabold text-black">
                    Horizontal Project Scroller
                  </h3>
                  <p className="text-xs text-grey mt-0.5">
                    Click any card to view full technical project details.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => scrollRail('left')}
                    aria-label="Scroll left"
                    className="w-11 h-11 rounded-full border border-line bg-white hover:bg-cream hover:border-red text-black flex items-center justify-center transition-all duration-200 shadow-sm"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollRail('right')}
                    aria-label="Scroll right"
                    className="w-11 h-11 rounded-full border border-line bg-white hover:bg-cream hover:border-red text-black flex items-center justify-center transition-all duration-200 shadow-sm"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Track */}
              <div
                ref={railRef}
                className="flex gap-8 overflow-x-auto pb-8 pt-2 scroll-smooth select-none"
                style={{
                  touchAction: 'pan-y',
                  WebkitOverflowScrolling: 'touch',
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                {filteredPhotos.map((photo, idx) => (
                  <div
                    key={photo.id}
                    onClick={() => openLightbox(photo, idx)}
                    className="flex-none w-[85vw] sm:w-[460px] lg:w-[500px] bg-white border border-line rounded-[8px] overflow-hidden shadow-card hover:border-red hover:shadow-hover transition-all duration-300 cursor-pointer group"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-black/10">
                      <img
                        src={`/${photo.src}`}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute top-4 left-4 bg-black/85 text-yellow text-xs font-mono font-bold px-3 py-1 rounded">
                        {photo.category}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 bg-white/95 p-3.5 rounded shadow-md border border-line/80">
                        <p className="text-[11px] font-mono text-red font-bold uppercase">
                          {photo.client} &bull; {photo.location}
                        </p>
                        <h4 className="text-sm font-bold text-black truncate mt-0.5">
                          {photo.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 4. PROOF NUMBERS REASSURANCE BAND */}
      <section className="py-20 bg-red text-white border-y border-red-deep">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-yellow bg-black/30 px-3 py-1 rounded-[4px]">
                Proven Integrity
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                Engineering Backed by Real Field Verifications
              </h2>
              <p className="text-sm sm:text-base text-white/95 leading-relaxed font-normal">
                Every image represents active installations delivered and maintained by Lawrence Energy Services Limited for major industrial facilities across Nigeria.
              </p>
            </div>

            <div className="lg:col-span-5 flex flex-col sm:flex-row gap-4">
              <div className="flex-1 bg-white text-black p-6 rounded-[6px] shadow-lg">
                <p className="text-3xl font-extrabold text-red">100,000</p>
                <p className="text-xs font-bold text-ink mt-1 uppercase tracking-wider">
                  Safe Man-Hours Without LTI
                </p>
              </div>
              <div className="flex-1 bg-white text-black p-6 rounded-[6px] shadow-lg">
                <p className="text-3xl font-extrabold text-black">1st Place</p>
                <p className="text-xs font-bold text-ink mt-1 uppercase tracking-wider">
                  Cummins Safety Vendor Rank
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. IMMERSIVE LIGHTBOX MODAL */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedPhoto(null)}
        >
          {/* Top Bar */}
          <div
            className="flex items-center justify-between text-white border-b border-white/15 pb-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <span className="text-xs font-mono text-yellow uppercase tracking-widest">
                PHOTO {currentIndex + 1} OF {filteredPhotos.length}
              </span>
              <h3 className="text-base sm:text-lg font-bold text-white truncate max-w-xl">
                {selectedPhoto.title}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPhoto(null)}
              className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-red text-white flex items-center justify-center transition-colors"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Central Image with Navigation */}
          <div
            className="relative flex-grow flex items-center justify-center my-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={prevPhoto}
              className="absolute left-2 sm:left-4 z-10 w-12 h-12 rounded-full bg-black/80 border border-white/20 hover:border-yellow text-white hover:text-yellow flex items-center justify-center transition-all shadow-xl"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={`/${selectedPhoto.src}`}
              alt={selectedPhoto.title}
              className="max-h-[68vh] max-w-full object-contain rounded-[6px] shadow-2xl border border-white/10"
            />

            <button
              type="button"
              onClick={nextPhoto}
              className="absolute right-2 sm:right-4 z-10 w-12 h-12 rounded-full bg-black/80 border border-white/20 hover:border-yellow text-white hover:text-yellow flex items-center justify-center transition-all shadow-xl"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Technical Specs Sheet */}
          <div
            className="bg-[#111111] border border-white/15 rounded-[6px] p-4 sm:p-6 text-white max-w-4xl mx-auto w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono border-b border-white/10 pb-3 mb-3">
              <div>
                <span className="text-white/50 block">CLIENT:</span>
                <span className="text-white font-bold">{selectedPhoto.client}</span>
              </div>
              <div>
                <span className="text-white/50 block">LOCATION:</span>
                <span className="text-white font-bold">{selectedPhoto.location}</span>
              </div>
              <div>
                <span className="text-white/50 block">TECHNICAL SPECIFICATION:</span>
                <span className="text-yellow font-bold">{selectedPhoto.specs}</span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              {selectedPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
