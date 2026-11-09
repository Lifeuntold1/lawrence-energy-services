import React from 'react';

const VARIANT_IMAGES = {
  about: '/assets/projects/elebele-9mw-ipp.jpg',
  services: '/assets/projects/sbc-ikeja-4-4mw-1.jpg',
  projects: '/assets/projects/mamuda-30mw-jenbacher.jpg',
  gallery: '/assets/projects/kano-30mw-panels.jpg',
  partners: '/assets/projects/partners-logo-grid.jpg',
  careers: '/assets/projects/safety-award.jpg',
  contact: '/assets/projects/contact-hero.jpg',
};

/**
 * InnerHeroCanvas
 * 
 * Delivers full-bleed authentic industrial project photography paired with
 * architectural scrims, technical CAD grid textures, and minimalist vector motion.
 */
export default function InnerHeroCanvas({ variant = 'about', className = '', image = null }) {
  const bgImg = image || VARIANT_IMAGES[variant] || VARIANT_IMAGES.about;

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Authentic Industrial Background Photo (Clear, crisp, high-contrast) */}
      <img
        src={bgImg}
        alt=""
        width="1920"
        height="1080"
        className={`absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-transform duration-700 ${
          variant === 'partners'
            ? 'object-right sm:object-center opacity-85 sm:opacity-95'
            : variant === 'contact'
            ? 'object-right sm:object-[72%_25%] opacity-60 sm:opacity-80'
            : variant === 'services'
            ? 'object-right sm:object-center opacity-65 sm:opacity-85'
            : 'object-center opacity-50 sm:opacity-75'
        }`}
        style={
          variant === 'partners'
            ? { filter: 'contrast(1.04) brightness(1.01)' }
            : variant === 'contact'
            ? { filter: 'contrast(1.08) saturate(1.15) brightness(1.02)' }
            : variant === 'services'
            ? { filter: 'contrast(1.12) saturate(1.2) brightness(1.03)' }
            : { filter: 'contrast(1.14) saturate(1.25) brightness(1.02)' }
        }
        loading="eager"
      />

      {/* 2. Directional Parchment Scrim: solid text clarity on left, crystal-clear engineering facility/logos on right */}
      <div className={`absolute inset-0 ${
        variant === 'partners'
          ? 'bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/80 sm:via-[#FAF9F5]/40 to-transparent'
          : variant === 'contact'
          ? 'bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/85 sm:via-[#FAF9F5]/55 to-transparent'
          : variant === 'services'
          ? 'bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/80 sm:via-[#FAF9F5]/45 to-transparent'
          : 'bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/88 sm:via-[#FAF9F5]/65 to-[#FAF9F5]/20 sm:to-transparent'
      }`} />
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#FAF9F5] to-transparent" />

      {/* 3. Subtle Technical CAD Blueprint Grid */}
      <div 
        className="absolute inset-0 opacity-40" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />

      {/* 4. Soft Architectural Ambient Energy Glow */}
      <div className="absolute -top-40 right-10 w-[550px] h-[550px] bg-gradient-to-bl from-yellow/12 via-red/8 to-transparent rounded-full blur-[130px]" />
      <div className="absolute -bottom-40 left-10 w-[450px] h-[450px] bg-gradient-to-tr from-red/8 via-yellow/5 to-transparent rounded-full blur-[120px]" />

      {/* 5. Precision Architectural Horizon Datum */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-line/80 to-transparent" />

      {/* 6. Bold, Minimalist Vector Engineering Motifs */}
      {variant === 'about' && <AboutMotion />}
      {variant === 'services' && <ServicesMotion />}
      {variant === 'projects' && <ProjectsMotion />}
      {variant === 'gallery' && <GalleryMotion />}
      {variant === 'partners' && <PartnersMotion />}
      {variant === 'contact' && <ContactMotion />}
      {variant === 'careers' && <CareersMotion />}
    </div>
  );
}

/* ================= 1. ABOUT US: STATUESQUE POWER TRANSMISSION ARC ================= */
function AboutMotion() {
  return (
    <svg
      viewBox="0 0 1440 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="about-arc-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#D9251C" stopOpacity="0.05" />
          <stop offset="50%" stopColor="#FFF500" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#D9251C" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      {/* Bold Catenary Transmission Arc */}
      <path
        d="M -100 380 C 350 180, 1050 180, 1540 380"
        stroke="url(#about-arc-grad)"
        strokeWidth="2.5"
        className="opacity-90"
      />

      {/* Supporting Structural Baseline */}
      <path
        d="M 200 420 L 1240 420"
        stroke="rgba(12, 12, 12, 0.08)"
        strokeWidth="1.5"
        strokeDasharray="12 8"
      />

      {/* Slow, Elegant Pulsing Energy Node */}
      <circle r="4.5" fill="#FFF500" className="opacity-80">
        <animateMotion
          path="M -100 380 C 350 180, 1050 180, 1540 380"
          dur="14s"
          keyPoints="0;1;0"
          keyTimes="0;0.5;1"
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

/* ================= 2. SERVICES: PURE HARMONIC VOLTAGE SINE WAVE ================= */
function ServicesMotion() {
  return (
    <svg
      viewBox="0 0 1440 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="services-sine-grad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFF500" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#FFF500" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D9251C" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Bold, Elegant Primary Sine Waveform */}
      <path
        d="M -60 230 Q 320 110, 700 230 T 1460 230"
        stroke="url(#services-sine-grad)"
        strokeWidth="2.5"
        className="opacity-80"
      />

      {/* Harmonic Secondary Wave */}
      <path
        d="M -60 230 Q 320 350, 700 230 T 1460 230"
        stroke="rgba(217, 37, 28, 0.2)"
        strokeWidth="1.5"
      />

      {/* Slow Sinusoidal Traveling Pulse */}
      <circle r="4" fill="#FFF500" className="opacity-90">
        <animateMotion
          path="M -60 230 Q 320 110, 700 230 T 1460 230"
          dur="11s"
          keyPoints="0;1;0"
          keyTimes="0;0.5;1"
          calcMode="spline"
          keySplines="0.4 0 0.2 1; 0.4 0 0.2 1"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}

/* ================= 3. PROJECTS: BOLD STRUCTURAL GIRDER ELEVATION ================= */
function ProjectsMotion() {
  return (
    <svg
      viewBox="0 0 1440 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Monumental Triangulated Truss Line */}
      <path
        d="M 120 440 L 480 200 L 840 440 L 1200 200 L 1480 380"
        stroke="rgba(12, 12, 12, 0.08)"
        strokeWidth="1.5"
      />

      {/* Primary Structural Tension Vector */}
      <path
        d="M 480 200 L 1200 200"
        stroke="#FFF500"
        strokeWidth="2"
        strokeOpacity="0.45"
      />

      {/* Ground Reference Plane */}
      <line x1="80" y1="440" x2="1400" y2="440" stroke="rgba(217, 37, 28, 0.2)" strokeWidth="1.5" />

      {/* Subtle Apex Marker */}
      <circle cx="480" cy="200" r="4" fill="#FFF500" fillOpacity="0.7" />
      <circle cx="1200" cy="200" r="4" fill="#D9251C" fillOpacity="0.6" />
    </svg>
  );
}

/* ================= 4. GALLERY: MINIMALIST CONCENTRIC APERTURE RINGS ================= */
function GalleryMotion() {
  return (
    <svg
      viewBox="0 0 1440 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Pure Concentric Precision Focus Rings (Anchored to Right) */}
      <g transform="translate(1180, 230)">
        <circle cx="0" cy="0" r="220" stroke="rgba(12, 12, 12, 0.06)" strokeWidth="1.5" />
        <circle cx="0" cy="0" r="160" stroke="#FFF500" strokeWidth="1.8" strokeOpacity="0.35" strokeDasharray="16 8" />
        <circle cx="0" cy="0" r="100" stroke="rgba(217, 37, 28, 0.2)" strokeWidth="1.5" />

        {/* Minimal Optical Datum Lines */}
        <line x1="-240" y1="0" x2="240" y2="0" stroke="rgba(12, 12, 12, 0.08)" strokeWidth="1" />
        <line x1="0" y1="-240" x2="0" y2="240" stroke="rgba(12, 12, 12, 0.08)" strokeWidth="1" />

        <circle cx="0" cy="0" r="4" fill="#FFF500" fillOpacity="0.75" />
      </g>
    </svg>
  );
}

/* ================= 5. PARTNERS: CONTINENTAL INTERCONNECTION ARTERIES ================= */
function PartnersMotion() {
  return (
    <svg
      viewBox="0 0 1440 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <linearGradient id="partners-artery-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#D9251C" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#FFF500" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#D9251C" stopOpacity="0.1" />
        </linearGradient>
      </defs>

      {/* East-West Interconnection Trunk */}
      <path
        d="M -80 320 C 420 180, 980 360, 1520 190"
        stroke="url(#partners-artery-grad)"
        strokeWidth="2.2"
        className="opacity-80"
      />

      {/* Complementary North-South Alliance Arc */}
      <path
        d="M 300 480 C 650 160, 1100 240, 1400 -20"
        stroke="rgba(12, 12, 12, 0.08)"
        strokeWidth="1.5"
      />

      {/* Interconnection Intersection Node */}
      <g transform="translate(740, 260)">
        <circle cx="0" cy="0" r="28" stroke="#FFF500" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="0" cy="0" r="4" fill="#D9251C" fillOpacity="0.7" />
      </g>
    </svg>
  );
}

/* ================= 6. CONTACT / QUOTE / BOOK: EXPANSIVE SIGNAL WAVEFRONTS ================= */
function ContactMotion() {
  return (
    <svg
      viewBox="0 0 1440 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Calm, Expanding Telecommunication Wavefronts */}
      <g transform="translate(1200, 230)">
        <circle cx="0" cy="0" r="90" stroke="#FFF500" strokeWidth="1.5" strokeOpacity="0.4" />
        <circle cx="0" cy="0" r="170" stroke="rgba(217, 37, 28, 0.2)" strokeWidth="1.5" strokeDasharray="12 6" />
        <circle cx="0" cy="0" r="250" stroke="rgba(12, 12, 12, 0.07)" strokeWidth="1.2" />

        <circle cx="0" cy="0" r="4.5" fill="#FFF500" fillOpacity="0.8" />
      </g>
    </svg>
  );
}

/* ================= 7. CAREERS: UPWARD STRUCTURAL CANTILEVER ================= */
function CareersMotion() {
  return (
    <svg
      viewBox="0 0 1440 460"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full object-cover"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Upward Ascending Architectural Diagonal */}
      <path
        d="M 100 420 L 780 180 L 1400 90"
        stroke="#FFF500"
        strokeWidth="2.2"
        strokeOpacity="0.4"
      />

      {/* Structural Cantilever Tension Cables */}
      <path
        d="M 280 420 L 780 180 M 520 420 L 780 180 M 960 420 L 780 180"
        stroke="rgba(217, 37, 28, 0.15)"
        strokeWidth="1.2"
      />

      <circle cx="780" cy="180" r="4" fill="#D9251C" fillOpacity="0.75" />
    </svg>
  );
}
