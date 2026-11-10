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
      {/* 1. Authentic Industrial Background Cover Image (Preserves Natural Aspect Ratio on Mobile & Desktop) */}
      <div
        className={`absolute inset-0 w-full h-full pointer-events-none select-none bg-no-repeat bg-cover transition-opacity duration-700 ${
          variant === 'partners'
            ? 'opacity-30 sm:opacity-45 bg-[position:center_center]'
            : variant === 'contact'
            ? 'opacity-95 sm:opacity-100 bg-[position:55%_22%] sm:bg-[position:72%_25%]'
            : 'opacity-95 sm:opacity-100 bg-[position:center_center]'
        }`}
        style={{
          backgroundImage: `url("${bgWebp}"), url("${bgJpg}")`,
          filter:
            variant === 'partners'
              ? 'contrast(1.02) brightness(1.02)'
              : 'contrast(1.08) brightness(1.08) saturate(1.10)',
        }}
      />

      {/* 2. Directional Parchment Scrim: solid text clarity on left, completely transparent & bright on right */}
      <div
        className={`absolute inset-0 ${
          variant === 'partners'
            ? 'bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/90 sm:via-[#FAF9F5]/70 to-[#FAF9F5]/25 sm:to-transparent'
            : 'bg-[linear-gradient(to_right,#FAF9F5_0%,#FAF9F5_22%,rgba(250,249,245,0.85)_42%,transparent_62%)] sm:bg-[linear-gradient(to_right,#FAF9F5_0%,#FAF9F5_18%,rgba(250,249,245,0.85)_28%,rgba(250,249,245,0.35)_38%,transparent_48%)]'
        }`}
      />
      <div className="absolute inset-x-0 bottom-0 h-8 bg-gradient-to-t from-[#FAF9F5]/70 to-transparent" />

      {/* 3. Subtle Technical CAD Blueprint Grid (Masked to text column only so photography remains razor sharp) */}
      <div 
        className="absolute inset-0 opacity-25 pointer-events-none" 
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.04) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          maskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 18%, transparent 38%)',
          WebkitMaskImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 18%, transparent 38%)'
        }}
      />

      {/* 4. Soft Architectural Ambient Energy Glow (Subtle bottom-left baseline anchor) */}
      <div
        className="absolute -bottom-32 left-0 w-[420px] h-[420px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(217,37,28,0.04) 0%, rgba(255,245,0,0.02) 40%, transparent 70%)',
        }}
      />

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
