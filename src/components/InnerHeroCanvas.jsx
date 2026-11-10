import React, { useEffect } from 'react';

const VARIANT_IMAGES = {
  about: {
    webp: '/assets/projects/elebele-9mw-ipp.webp',
    jpg: '/assets/projects/elebele-9mw-ipp.jpg',
  },
  services: {
    webp: '/assets/projects/sbc-ikeja-4-4mw-1.webp',
    jpg: '/assets/projects/sbc-ikeja-4-4mw-1.jpg',
  },
  projects: {
    webp: '/assets/projects/mamuda-30mw-jenbacher.webp',
    jpg: '/assets/projects/mamuda-30mw-jenbacher.jpg',
  },
  gallery: {
    webp: '/assets/projects/kano-30mw-panels.webp',
    jpg: '/assets/projects/kano-30mw-panels.jpg',
  },
  partners: {
    webp: '/assets/projects/partners-logo-grid.webp',
    jpg: '/assets/projects/partners-logo-grid.jpg',
  },
  careers: {
    webp: '/assets/projects/safety-award.webp',
    jpg: '/assets/projects/safety-award.jpg',
  },
  contact: {
    webp: '/assets/projects/contact-hero.webp',
    jpg: '/assets/projects/contact-hero.jpg',
  },
};

/**
 * InnerHeroCanvas
 * 
 * Delivers full-bleed authentic industrial project photography paired with
 * architectural scrims, technical CAD grid textures, and minimalist vector motion.
 * Uses high-performance WebP assets and pure CSS background cover to preserve
 * exact image aspect ratios without mobile distortion and maximize Lighthouse performance.
 */
export default function InnerHeroCanvas({ variant = 'about', className = '', image = null }) {
  const defaultEntry = VARIANT_IMAGES[variant] || VARIANT_IMAGES.about;
  const bgJpg = image || defaultEntry.jpg;
  const bgWebp = image
    ? image.replace(/\.(jpg|jpeg|png)$/i, '.webp')
    : defaultEntry.webp;

  // Preload hero background image with high fetchpriority for instant Largest Contentful Paint (LCP)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const existing = document.querySelector(`link[rel="preload"][href="${bgWebp}"]`);
    if (!existing) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.type = 'image/webp';
      link.href = bgWebp;
      link.fetchPriority = 'high';
      document.head.appendChild(link);
      return () => {
        if (link && link.parentNode) {
          link.parentNode.removeChild(link);
        }
      };
    }
  }, [bgWebp]);

  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Authentic Base Cover Image (Full 4K/3K Resolution, Natural Saturation, Zero Distortion) */}
      <picture className="absolute inset-0 w-full h-full pointer-events-none select-none">
        <source srcSet={bgWebp} type="image/webp" />
        <img
          src={bgJpg}
          alt=""
          loading="eager"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-700 ${
            variant === 'partners'
              ? 'opacity-35 sm:opacity-50 object-center'
              : variant === 'contact'
              ? 'opacity-100 object-[55%_22%] sm:object-[72%_25%]'
              : 'opacity-100 object-center'
          }`}
          style={{
            imageRendering: 'auto',
          }}
        />
      </picture>

      {/* 2. Directional Soft-Blur (In-place GPU blur exclusively under text column; 0% blur on Contact, Partners, and right flank) */}
      {variant !== 'partners' && variant !== 'contact' && (
        <div
          className="mask-hero-blur absolute inset-0 pointer-events-none"
          style={{
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            backgroundColor: 'rgba(250, 249, 245, 0.01)',
          }}
        />
      )}

      {/* 3. Directional Parchment Scrim: solid text clarity on left, completely transparent on right */}
      <div
        className={`absolute inset-0 pointer-events-none ${
          variant === 'partners'
            ? 'bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/90 sm:via-[#FAF9F5]/70 to-[#FAF9F5]/25 sm:to-transparent'
            : variant === 'contact'
            ? 'bg-[linear-gradient(to_bottom,#FAF9F5_0%,#FAF9F5_35%,rgba(250,249,245,0.85)_65%,transparent_90%)] sm:bg-[linear-gradient(to_right,#FAF9F5_0%,#FAF9F5_32%,rgba(250,249,245,0.88)_50%,rgba(250,249,245,0.30)_68%,transparent_82%)]'
            : 'bg-[linear-gradient(to_bottom,#FAF9F5_0%,#FAF9F5_45%,rgba(250,249,245,0.95)_65%,rgba(250,249,245,0.60)_82%,transparent_96%)] sm:bg-[linear-gradient(to_right,#FAF9F5_0%,#FAF9F5_28%,rgba(250,249,245,0.94)_44%,rgba(250,249,245,0.78)_58%,rgba(250,249,245,0.25)_68%,transparent_78%)]'
        }`}
      />
      <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-[#FAF9F5]/60 to-transparent pointer-events-none" />

      {/* 4. Precision Architectural Horizon Datum */}
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
