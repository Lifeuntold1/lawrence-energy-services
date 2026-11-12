import React, { useState, useEffect, useRef, useId, useCallback } from 'react';

// Exact CAD Gear Tooth Path Generator
function generateGearPath(cx, cy, rOuter, rRoot, numTeeth) {
  let path = '';
  const dTheta = (2 * Math.PI) / numTeeth;
  for (let i = 0; i < numTeeth; i++) {
    const a0 = i * dTheta;
    const a1 = a0 + dTheta * 0.25;
    const a2 = a0 + dTheta * 0.5;
    const a3 = a0 + dTheta * 0.75;
    const a4 = a0 + dTheta;

    const x0 = (cx + rRoot * Math.cos(a0)).toFixed(1);
    const y0 = (cy + rRoot * Math.sin(a0)).toFixed(1);
    const x1 = (cx + rOuter * Math.cos(a1)).toFixed(1);
    const y1 = (cy + rOuter * Math.sin(a1)).toFixed(1);
    const x2 = (cx + rOuter * Math.cos(a2)).toFixed(1);
    const y2 = (cy + rOuter * Math.sin(a2)).toFixed(1);
    const x3 = (cx + rRoot * Math.cos(a3)).toFixed(1);
    const y3 = (cy + rRoot * Math.sin(a3)).toFixed(1);
    const x4 = (cx + rRoot * Math.cos(a4)).toFixed(1);
    const y4 = (cy + rRoot * Math.sin(a4)).toFixed(1);

    if (i === 0) path += `M ${x0} ${y0} `;
    path += `L ${x1} ${y1} L ${x2} ${y2} L ${x3} ${y3} L ${x4} ${y4} `;
  }
  return path + 'Z';
}

export default function HeroArt({ className = '', theme = 'light' }) {
  const [sketchKey, setSketchKey] = useState(0);
  const [motionActive, setMotionActive] = useState(false);
  const [arcFlash, setArcFlash] = useState(false);
  const containerRef = useRef(null);
  const rafTiltRef = useRef(0);
  const uid = useId().replace(/:/g, '');
  const elecGlowId = `hero-elec-glow-${uid}`;
  const sparkGlowId = `hero-spark-glow-${uid}`;
  const fluidGradId = `fluid-surge-pulse-${uid}`;
  const catenaryGradId = `catenary-pulse-glow-${uid}`;

  const isLight = theme === 'light';

  // Precision color palette for technical architectural whiteprint
  const colors = isLight
    ? {
        tower: '#111827', // Deep graphite charcoal
        towerSpine: 'rgba(17, 24, 39, 0.28)',
        towerLattice: '#1F2937',
        insulatorStem: '#B45309',
        insulatorDisc: '#D97706',
        insulatorOrb: '#D9251C',
        summitBoltFill: '#D9251C',
        summitBoltStroke: '#B01E17',
        catenaryLine: '#334155', // Industrial dark slate cable
        catenaryPulseStart: '#D9251C',
        catenaryPulseEnd: '#F59E0B',
        pipeWall: '#1E293B',
        pipeMask: '#FAF9F5',
        pipeCenter: '#D9251C',
        pipeFlange: '#D9251C',
        pipeBolt: '#FFFFFF',
        valveBody: '#FAF9F5',
        valveStem: '#D9251C',
        valveAccent: '#D97706',
        gaugeDial: '#FFFFFF',
        gaugeRim: '#1E293B',
        gaugeTicks: '#64748B',
        gaugeNeedle: '#D9251C',
        skidBed1: '#1E293B',
        skidBed2: '#D9251C',
        gearDark: '#1E293B',
        gearAccent: '#D9251C',
        gearAmber: '#D97706',
        gearPinion: '#334155',
        pistonHead: '#D9251C',
        connectingRod: '#1E293B',
        dropShadow: 'drop-shadow-[0_15px_35px_rgba(17,24,39,0.12)]',
        ambientGlow: 'from-red/10 via-yellow/15 to-transparent',
      }
    : {
        tower: '#FFFFFF',
        towerSpine: 'rgba(255, 255, 255, 0.4)',
        towerLattice: '#FFFFFF',
        insulatorStem: '#FFD700',
        insulatorDisc: '#FF5722',
        insulatorOrb: '#FFD700',
        summitBoltFill: '#FFD700',
        summitBoltStroke: '#FF5722',
        catenaryLine: '#FFD700',
        catenaryPulseStart: '#FF5722',
        catenaryPulseEnd: '#FFD700',
        pipeWall: '#FFD700',
        pipeMask: '#141619',
        pipeCenter: '#FFFFFF',
        pipeFlange: '#FF5722',
        pipeBolt: '#FFFFFF',
        valveBody: '#141619',
        valveStem: '#FFFFFF',
        valveAccent: '#FFD700',
        gaugeDial: '#141619',
        gaugeRim: '#FFD700',
        gaugeTicks: '#FFD700',
        gaugeNeedle: '#FF5722',
        skidBed1: '#FFD700',
        skidBed2: '#FF5722',
        gearDark: '#FFD700',
        gearAccent: '#FF5722',
        gearAmber: '#FFD700',
        gearPinion: '#FFD700',
        pistonHead: '#FF5722',
        connectingRod: '#FFFFFF',
        dropShadow: 'drop-shadow-[0_20px_50px_rgba(255,87,34,0.35)]',
        ambientGlow: 'from-[#FF5722]/35 via-[#FFD700]/25 to-transparent',
      };

  useEffect(() => {
    const isReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      setMotionActive(true);
      return;
    }

    setMotionActive(false);
    const timer = window.setTimeout(() => {
      setMotionActive(true);
    }, 2000);

    return () => window.clearTimeout(timer);
  }, [sketchKey]);

  useEffect(() => {
    if (!motionActive) return;
    let flashOffTimer = 0;
    const arcInterval = window.setInterval(() => {
      setArcFlash(true);
      flashOffTimer = window.setTimeout(() => setArcFlash(false), 380);
    }, 3800);

    return () => {
      window.clearInterval(arcInterval);
      if (flashOffTimer) window.clearTimeout(flashOffTimer);
    };
  }, [motionActive]);

  useEffect(() => {
    return () => {
      if (rafTiltRef.current) window.cancelAnimationFrame(rafTiltRef.current);
    };
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!containerRef.current) return;
    if (
      typeof window !== 'undefined' &&
      (window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
        !window.matchMedia('(hover: hover)').matches)
    ) {
      return;
    }
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (rafTiltRef.current) window.cancelAnimationFrame(rafTiltRef.current);
    rafTiltRef.current = window.requestAnimationFrame(() => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const x = ((clientX - rect.left) / rect.width - 0.5) * 6;
      const y = ((clientY - rect.top) / rect.height - 0.5) * 6;
      el.style.transform = `perspective(1000px) rotateY(${(x * 0.4).toFixed(2)}deg) rotateX(${(-y * 0.4).toFixed(2)}deg)`;
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (rafTiltRef.current) window.cancelAnimationFrame(rafTiltRef.current);
    if (containerRef.current) {
      containerRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    }
  }, []);

  const handleReplaySketch = () => {
    setSketchKey((prev) => prev + 1);
  };

  // Pre-calculated gear profiles
  const turbineRingGearPath = generateGearPath(660, 620, 136, 118, 32);
  const spurGearPath = generateGearPath(470, 740, 75, 63, 24);
  const pinionGearPath = generateGearPath(565, 795, 41, 33, 16);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none group ${className}`}
      style={{
        transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
        transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)',
      }}
      role="img"
      aria-label="Lawrence Energy Services Hybrid Electrical and Mechanical Engineering Kinetic Art"
    >
      {/* Background Radial Glow */}
      <div
        className={`absolute inset-0 rounded-full bg-gradient-to-tr ${colors.ambientGlow} blur-[90px] pointer-events-none transition-opacity duration-1000 ${
          motionActive ? (arcFlash ? 'opacity-95' : 'opacity-70') : 'opacity-40'
        }`}
      />

      {/* Blueprint SVG Container */}
      <svg
        key={sketchKey}
        viewBox="0 0 900 1000"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-auto ${colors.dropShadow} overflow-visible ${
          motionActive ? 'blueprint-motion-active' : ''
        }`}
      >
        <defs>
          {/* Intense Electrical and Radiant Glow Filters (unique per instance for Safari) */}
          <filter id={elecGlowId} x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation={isLight ? "1.5" : "3.8"} result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <filter id={sparkGlowId} x="-60%" y="-60%" width="220%" height="220%">
            <feGaussianBlur stdDeviation={isLight ? "2.5" : "6"} result="brightBlur" />
            <feMerge>
              <feMergeNode in="brightBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Fluid Flow Gradient */}
          <linearGradient id={fluidGradId} x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.pipeFlange} stopOpacity="0.1" />
            <stop offset="45%" stopColor={colors.gearAccent} stopOpacity="0.95" />
            <stop offset="55%" stopColor={isLight ? "#FFB300" : "#FFFFFF"} stopOpacity="1" />
            <stop offset="100%" stopColor={colors.pipeFlange} stopOpacity="0.1" />
          </linearGradient>

          {/* Catenary Conductor Gradient */}
          <linearGradient id={catenaryGradId} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={colors.catenaryPulseStart} stopOpacity="0" />
            <stop offset="35%" stopColor={colors.catenaryPulseEnd} stopOpacity="0.9" />
            <stop offset="50%" stopColor={isLight ? "#D9251C" : "#FFFFFF"} stopOpacity="1" />
            <stop offset="65%" stopColor={colors.catenaryPulseEnd} stopOpacity="0.9" />
            <stop offset="100%" stopColor={colors.catenaryPulseStart} stopOpacity="0" />
          </linearGradient>

          <style>{`
            /* Hand-Drawn Blueprint Sketch Keyframes (Snappy 1.9s choreography) */
            @keyframes drawBlueprintStroke {
              0% {
                stroke-dashoffset: 2000;
                opacity: 0.25;
              }
              1% {
                opacity: 1;
              }
              100% {
                stroke-dashoffset: 0;
                opacity: 1;
              }
            }

            .sketch-pipe {
              stroke-dasharray: 2000;
              stroke-dashoffset: 2000;
              animation: drawBlueprintStroke 0.55s cubic-bezier(0.25, 1, 0.5, 1) 0.0s forwards;
            }

            .sketch-mech {
              stroke-dasharray: 2000;
              stroke-dashoffset: 2000;
              animation: drawBlueprintStroke 0.6s cubic-bezier(0.25, 1, 0.5, 1) 0.25s forwards;
            }

            .sketch-tower {
              stroke-dasharray: 2000;
              stroke-dashoffset: 2000;
              animation: drawBlueprintStroke 0.65s cubic-bezier(0.25, 1, 0.5, 1) 0.55s forwards;
            }

            .sketch-crossarms {
              stroke-dasharray: 2000;
              stroke-dashoffset: 2000;
              animation: drawBlueprintStroke 0.55s cubic-bezier(0.25, 1, 0.5, 1) 0.9s forwards;
            }

            .sketch-catenary {
              stroke-dasharray: 2000;
              stroke-dashoffset: 2000;
              animation: drawBlueprintStroke 0.6s cubic-bezier(0.25, 1, 0.5, 1) 1.25s forwards;
            }

            /* Once fully drawn, ensure all static lines become 100% solid with zero dash gaps */
            .blueprint-motion-active .sketch-pipe,
            .blueprint-motion-active .sketch-mech,
            .blueprint-motion-active .sketch-tower,
            .blueprint-motion-active .sketch-crossarms,
            .blueprint-motion-active .sketch-catenary {
              stroke-dasharray: none !important;
              stroke-dashoffset: 0 !important;
            }

            /* Continuous Kinetic Rotations and Harmonic Oscillations */
            @keyframes spinClockwise {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }

            @keyframes spinCounterClockwise {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }

            @keyframes pistonReciprocateMotion {
              0%, 100% { transform: translate(0px, 0px); }
              50% { transform: translate(-20px, -14px); }
            }

            @keyframes crankPinSpin {
              from { transform: rotate(0deg); }
              to { transform: rotate(-360deg); }
            }

            @keyframes gaugeNeedleOscillate1 {
              0%, 100% { transform: rotate(-16deg); }
              50% { transform: rotate(26deg); }
            }

            @keyframes gaugeNeedleOscillate2 {
              0%, 100% { transform: rotate(18deg); }
              50% { transform: rotate(-22deg); }
            }

            @keyframes fluidSurgeFlow {
              0% { stroke-dashoffset: 240; }
              100% { stroke-dashoffset: 0; }
            }

            @keyframes coronaFlicker {
              0%, 100% { transform: scale(1); opacity: 0.7; }
              50% { transform: scale(1.25); opacity: 1; }
            }

            @keyframes catenaryTravelingWave {
              0% { stroke-dashoffset: 800; }
              50% { stroke-dashoffset: -800; }
              100% { stroke-dashoffset: 800; }
            }

            .catenary-wave-active {
              stroke-dasharray: 160 540 !important;
              animation: catenaryTravelingWave 5.2s cubic-bezier(0.45, 0, 0.25, 1) infinite;
            }
          `}</style>
        </defs>

        {/* =========================================================================
            LAYER 1: ELECTRICAL TRANSMISSION TOWER (COMPLETE, UNBROKEN GEOMETRY)
            Every strut, leg, cross-arm and internal triangle is fully defined.
           ========================================================================= */}
        <g id="electrical-transmission-subsystem">
          {/* Foundation Footing Pads */}
          <path
            d="M 220 850 L 270 850 L 270 865 L 220 865 Z M 590 850 L 640 850 L 640 865 L 590 865 Z"
            fill={colors.insulatorDisc}
            stroke={colors.insulatorStem}
            strokeWidth="2.5"
            className="sketch-tower"
          />

          {/* Main Tower Pylon Legs (Ground to Apex) */}
          <path
            d="M 230 875 L 245 855 L 430 85 L 615 855 L 630 875"
            stroke={colors.tower}
            strokeWidth="4.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="sketch-tower"
          />

          {/* Vertical Centerline Structural Spine */}
          <path
            d="M 430 85 L 430 855"
            stroke={colors.towerSpine}
            strokeWidth="1.8"
            strokeDasharray="6 4"
            className="sketch-tower"
          />

          {/* Complete Horizontal Girders (All 6 Structural Tiers) */}
          <path
            d="
              M 410 175 L 450 175
              M 388 270 L 472 270
              M 358 415 L 502 415
              M 322 570 L 538 570
              M 284 725 L 576 725
              M 220 855 L 640 855
            "
            stroke={colors.tower}
            strokeWidth="3.5"
            strokeLinecap="round"
            className="sketch-tower"
          />

          {/* Complete Triangular X-Lattice Bracing (Zero Broken Triangles) */}
          {/* Tier 1 Apex Triangle */}
          <path
            d="M 410 175 L 430 85 L 450 175 Z"
            stroke={colors.towerLattice}
            strokeWidth="2.8"
            strokeLinejoin="round"
            className="sketch-tower"
          />

          {/* Tier 1 to 2 X-Lattice Triangles */}
          <path
            d="M 410 175 L 472 270 M 450 175 L 388 270 M 410 175 L 430 270 M 450 175 L 430 270"
            stroke={colors.towerLattice}
            strokeWidth="2.8"
            className="sketch-tower"
          />

          {/* Tier 2 to 3 X-Lattice Triangles */}
          <path
            d="M 388 270 L 502 415 M 472 270 L 358 415 M 388 270 L 430 342 M 472 270 L 430 342 M 358 415 L 430 342 M 502 415 L 430 342"
            stroke={colors.towerLattice}
            strokeWidth="2.8"
            className="sketch-tower"
          />

          {/* Tier 3 to 4 X-Lattice Triangles */}
          <path
            d="M 358 415 L 538 570 M 502 415 L 322 570 M 358 415 L 430 492 M 502 415 L 430 492 M 322 570 L 430 492 M 538 570 L 430 492"
            stroke={colors.towerLattice}
            strokeWidth="2.8"
            className="sketch-tower"
          />

          {/* Tier 4 to 5 X-Lattice Triangles */}
          <path
            d="M 322 570 L 576 725 M 538 570 L 284 725 M 322 570 L 430 647 M 538 570 L 430 647 M 284 725 L 430 647 M 576 725 L 430 647"
            stroke={colors.towerLattice}
            strokeWidth="2.8"
            className="sketch-tower"
          />

          {/* Tier 5 to Base Lattice Triangles */}
          <path
            d="M 284 725 L 615 855 M 576 725 L 245 855 M 284 725 L 430 790 M 576 725 L 430 790 M 245 855 L 430 790 M 615 855 L 430 790"
            stroke={colors.towerLattice}
            strokeWidth="2.8"
            className="sketch-tower"
          />

          {/* Cantilever Cross-Arms (3 Tiers with Complete Diagonal Stay Triangles) */}
          <g className="sketch-crossarms">
            {/* Top Cross-Arm (Tier 2, Y=270) */}
            <path
              d="M 220 270 L 640 270 M 220 270 L 430 190 M 640 270 L 430 190"
              stroke={colors.tower}
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Middle Cross-Arm (Tier 3, Y=415) */}
            <path
              d="M 140 415 L 720 415 M 140 415 L 430 305 M 720 415 L 430 305"
              stroke={colors.tower}
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Lower Cross-Arm (Tier 4, Y=570) */}
            <path
              d="M 160 570 L 700 570 M 160 570 L 430 460 M 700 570 L 430 460"
              stroke={colors.tower}
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Suspended Ceramic Insulator Strings */}
          <g className="sketch-crossarms">
            {[
              { x: 220, y: 270, h: 45 },
              { x: 640, y: 270, h: 45 },
              { x: 140, y: 415, h: 50 },
              { x: 720, y: 415, h: 50 },
              { x: 160, y: 570, h: 45 },
              { x: 700, y: 570, h: 45 },
            ].map((ins, ii) => (
              <g key={ii}>
                <line
                  x1={ins.x}
                  y1={ins.y}
                  x2={ins.x}
                  y2={ins.y + ins.h}
                  stroke={colors.insulatorStem}
                  strokeWidth="4"
                  strokeDasharray="4 2.5"
                />
                {[12, 22, 32].map((dy, ri) => (
                  <ellipse
                    key={ri}
                    cx={ins.x}
                    cy={ins.y + dy}
                    rx="6"
                    ry="2.2"
                    fill={colors.insulatorDisc}
                    stroke={colors.insulatorStem}
                    strokeWidth="1.2"
                  />
                ))}
                <circle
                  cx={ins.x}
                  cy={ins.y + ins.h}
                  r="4.8"
                  fill={colors.insulatorOrb}
                  stroke={colors.insulatorDisc}
                  strokeWidth="2"
                  filter={`url(#${elecGlowId})`}
                />
              </g>
            ))}
          </g>

          {/* Summit Lightning Bolt & Glowing Finial */}
          <g className="sketch-crossarms">
            {motionActive && (
              <>
                <circle
                  cx="430"
                  cy="58"
                  r="18"
                  stroke={colors.summitBoltFill}
                  strokeWidth="2"
                  fill="none"
                  style={{
                    transformBox: 'view-box',
                    transformOrigin: '430px 58px',
                    animation: 'coronaFlicker 2.8s ease-in-out infinite',
                  }}
                />
                <circle
                  cx="430"
                  cy="58"
                  r="36"
                  stroke={colors.summitBoltStroke}
                  strokeWidth="1.5"
                  strokeDasharray="5 4"
                  fill="none"
                  style={{
                    transformBox: 'view-box',
                    transformOrigin: '430px 58px',
                    animation: 'coronaFlicker 2.8s ease-in-out infinite 0.4s',
                  }}
                />
              </>
            )}

            <path
              d="M 430 25 L 418 64 L 434 64 L 420 98 L 444 56 L 430 56 Z"
              fill={colors.summitBoltFill}
              stroke={colors.summitBoltStroke}
              strokeWidth="2.5"
              strokeLinejoin="round"
              filter={`url(#${sparkGlowId})`}
              className={`transition-transform duration-200 ${
                motionActive && arcFlash ? 'scale-125' : 'scale-100'
              }`}
              style={{ transformBox: 'view-box', transformOrigin: '430px 60px' }}
            />
          </g>

          {/* 4 Sweeping Catenary Power Lines */}
          <path
            d="M 40 200 Q 230 255 430 190 T 820 230"
            stroke={colors.catenaryLine}
            strokeWidth="3.2"
            fill="none"
            strokeLinecap="round"
            className="sketch-catenary"
            filter={`url(#${elecGlowId})`}
          />
          <path
            d="M 25 310 Q 220 380 430 295 T 840 335"
            stroke={colors.catenaryLine}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            className="sketch-catenary"
            filter={`url(#${elecGlowId})`}
          />
          <path
            d="M 15 420 Q 210 500 440 395 T 850 435"
            stroke={colors.catenaryLine}
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
            className="sketch-catenary"
            filter={`url(#${sparkGlowId})`}
          />
          {motionActive && (
            <path
              d="M 15 420 Q 210 500 440 395 T 850 435"
              stroke={`url(#${catenaryGradId})`}
              strokeWidth="6"
              fill="none"
              strokeLinecap="round"
              filter={`url(#${sparkGlowId})`}
              className="catenary-wave-active"
            />
          )}
          <path
            d="M 10 540 Q 220 625 440 515 T 845 555"
            stroke={colors.catenaryLine}
            strokeWidth="3.5"
            fill="none"
            strokeLinecap="round"
            className="sketch-catenary"
            filter={`url(#${elecGlowId})`}
          />
        </g>

        {/* =========================================================================
            LAYER 2: MECHANICAL POWER SUBSYSTEM (BASE & RIGHT)
            Precision CAD gears, turbine, piston linkage and U-pipe in gold & orange.
            Translucent fills allow the electrical lattice behind to remain visible.
           ========================================================================= */}
        <g id="mechanical-engineering-subsystem">
          {/* Foundation Machine Skid Bed */}
          <g className="sketch-pipe">
            <line x1="200" y1="855" x2="680" y2="855" stroke={colors.skidBed1} strokeWidth="7" />
            <line x1="200" y1="863" x2="680" y2="863" stroke={colors.skidBed2} strokeWidth="2.5" />
            <rect x="225" y="850" width="55" height="15" fill={colors.skidBed2} stroke={colors.skidBed1} strokeWidth="2" rx="2" />
            <rect x="585" y="850" width="55" height="15" fill={colors.skidBed2} stroke={colors.skidBed1} strokeWidth="2" rx="2" />
            {[235, 250, 265, 595, 610, 625].map((bx, bi) => (
              <line key={bi} x1={bx} y1="850" x2={bx + 6} y2="865" stroke={colors.pipeBolt} strokeWidth="1.5" />
            ))}
          </g>

          {/* Thick U-Shaped Industrial Flanged Pipe Wrapping Underneath */}
          <g className="sketch-pipe">
            <path
              d="M 175 700 L 175 780 L 215 780 L 215 820 L 175 820 L 175 920 L 810 920 L 810 640 L 750 640"
              stroke={colors.pipeMask}
              strokeWidth="16"
              strokeLinecap="square"
              strokeLinejoin="miter"
            />
            <path
              d="M 175 700 L 175 780 L 215 780 L 215 820 L 175 820 L 175 920 L 810 920 L 810 640 L 750 640"
              stroke={colors.pipeWall}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M 175 700 L 175 780 L 215 780 L 215 820 L 175 820 L 175 920 L 810 920 L 810 640 L 750 640"
              stroke={colors.pipeCenter}
              strokeWidth="1.8"
              strokeDasharray="6 4"
              opacity="0.8"
            />

            {/* Flanged Joints with Hex Bolts */}
            {[
              { x: 175, y: 740, rot: 0 },
              { x: 235, y: 920, rot: 90 },
              { x: 660, y: 920, rot: 90 },
              { x: 755, y: 920, rot: 90 },
              { x: 810, y: 840, rot: 0 },
              { x: 810, y: 730, rot: 0 },
              { x: 775, y: 640, rot: 90 },
            ].map((flange, fi) => (
              <g key={fi} transform={`translate(${flange.x}, ${flange.y}) rotate(${flange.rot})`}>
                <rect x="-16" y="-5" width="32" height="10" fill={colors.pipeFlange} stroke={colors.pipeWall} strokeWidth="2" rx="2" />
                <circle cx="-10" cy="0" r="2.2" fill={colors.pipeBolt} />
                <circle cx="10" cy="0" r="2.2" fill={colors.pipeBolt} />
              </g>
            ))}
          </g>

          {/* Pulsing Fluid Surge Channel (Phase 2 Continuous Motion) */}
          {motionActive && (
            <path
              d="M 175 700 L 175 780 L 215 780 L 215 820 L 175 820 L 175 920 L 810 920 L 810 640 L 750 640"
              stroke={`url(#${fluidGradId})`}
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="80 160"
              style={{
                animation: 'fluidSurgeFlow 3.2s linear infinite',
              }}
            />
          )}

          {/* Industrial T-Handle Gate Valve */}
          <g transform="translate(708, 920)" className="sketch-pipe">
            <polygon points="-16,-6 16,-6 12,-20 -12,-20" fill={colors.valveBody} stroke={colors.pipeWall} strokeWidth="2.5" />
            <line x1="0" y1="-20" x2="0" y2="-62" stroke={colors.valveStem} strokeWidth="3.5" />
            <line x1="-3" y1="-32" x2="3" y2="-32" stroke={colors.valveAccent} strokeWidth="2" />
            <line x1="-3" y1="-44" x2="3" y2="-44" stroke={colors.valveAccent} strokeWidth="2" />
            <rect x="-10" y="-30" width="20" height="6" fill={colors.pipeFlange} stroke={colors.pipeWall} strokeWidth="1.5" rx="1" />
            <rect x="-24" y="-68" width="48" height="8" rx="4" fill={colors.pipeFlange} stroke={colors.pipeWall} strokeWidth="2" />
            <circle cx="0" cy="-64" r="5" fill={colors.valveAccent} stroke={colors.valveStem} strokeWidth="1.5" />
            <circle cx="-16" cy="-64" r="2" fill={colors.pipeBolt} />
            <circle cx="16" cy="-64" r="2" fill={colors.pipeBolt} />
          </g>

          {/* Pressure Gauge 1 (Left Pipe Branch) */}
          <g className="sketch-pipe">
            <g transform="translate(220, 660)">
              <line x1="0" y1="40" x2="0" y2="24" stroke={colors.pipeWall} strokeWidth="3" />
              <rect x="-5" y="24" width="10" height="6" fill={colors.pipeFlange} stroke={colors.pipeWall} strokeWidth="1.5" />
              <circle cx="0" cy="0" r="24" fill={colors.gaugeDial} stroke={colors.gaugeRim} strokeWidth="3.2" />
              <circle cx="0" cy="0" r="20" stroke={colors.gaugeTicks} strokeWidth="1" strokeDasharray="3 2" />
              {[-120, -90, -60, -30, 0, 30, 60, 90, 120].map((deg, di) => (
                <line
                  key={di}
                  x1="0"
                  y1="-14"
                  x2="0"
                  y2="-19"
                  stroke={colors.gaugeTicks}
                  strokeWidth="1.6"
                  transform={`rotate(${deg} 0 0)`}
                />
              ))}
            </g>
            <g
              style={{
                transformBox: 'view-box',
                transformOrigin: '220px 660px',
                animation: motionActive ? 'gaugeNeedleOscillate1 2.4s ease-in-out infinite' : 'none',
                willChange: 'transform',
              }}
            >
              <line x1="220" y1="660" x2="220" y2="643" stroke={colors.gaugeNeedle} strokeWidth="2.6" strokeLinecap="round" />
              <line x1="220" y1="660" x2="220" y2="664" stroke={colors.gaugeNeedle} strokeWidth="2.2" />
            </g>
            <circle cx="220" cy="660" r="3.2" fill={colors.gaugeRim} stroke={colors.gaugeDial} strokeWidth="1" />
          </g>

          {/* Pressure Gauge 2 (Intermediate Tube) */}
          <g className="sketch-pipe">
            <g transform="translate(525, 410)">
              <line x1="0" y1="28" x2="0" y2="18" stroke={colors.pipeWall} strokeWidth="2.5" />
              <circle cx="0" cy="0" r="20" fill={colors.gaugeDial} stroke={colors.gaugeRim} strokeWidth="3" />
              <circle cx="0" cy="0" r="16" stroke={colors.gaugeTicks} strokeWidth="1" strokeDasharray="3 2" />
              {[-90, -45, 0, 45, 90].map((deg, di) => (
                <line
                  key={di}
                  x1="0"
                  y1="-11"
                  x2="0"
                  y2="-16"
                  stroke={colors.gaugeTicks}
                  strokeWidth="1.5"
                  transform={`rotate(${deg} 0 0)`}
                />
              ))}
            </g>
            <g
              style={{
                transformBox: 'view-box',
                transformOrigin: '525px 410px',
                animation: motionActive ? 'gaugeNeedleOscillate2 2.1s ease-in-out infinite' : 'none',
                willChange: 'transform',
              }}
            >
              <line x1="525" y1="410" x2="525" y2="396" stroke={colors.gaugeNeedle} strokeWidth="2.5" strokeLinecap="round" />
            </g>
            <circle cx="525" cy="410" r="2.8" fill={colors.gaugeRim} />
          </g>

          {/* Turbine Structural Casing Shroud */}
          <g className="sketch-mech">
            <path
              d="M 525 640 L 525 500 L 780 500 L 780 780 L 735 780 L 735 855"
              stroke={colors.gearDark}
              strokeWidth="3.5"
              strokeLinejoin="round"
            />
            <path
              d="M 750 470 L 750 500 M 780 530 L 810 530"
              stroke={colors.gearAccent}
              strokeWidth="2.5"
            />
            <rect x="715" y="845" width="40" height="10" fill={colors.gearAccent} stroke={colors.gearDark} strokeWidth="2" rx="2" />
          </g>

          {/* Toothed Outer Ring Gear Encapsulating Multi-Blade Turbine Runner */}
          <g
            className="sketch-mech"
            style={{
              transformBox: 'view-box',
              transformOrigin: '660px 620px',
              animation: motionActive ? 'spinClockwise 12s linear infinite' : 'none',
              willChange: 'transform',
            }}
          >
            {/* Translucent fill allows tower struts behind to remain visible */}
            <path d={turbineRingGearPath} fill={isLight ? "rgba(240, 238, 230, 0.45)" : "rgba(20, 22, 25, 0.45)"} stroke={colors.gearDark} strokeWidth="3" />
            <circle cx="660" cy="620" r="114" stroke={colors.gearAccent} strokeWidth="3.2" fill="none" />
            <circle cx="660" cy="620" r="95" stroke={colors.gearAmber} strokeWidth="1.8" strokeDasharray="6 4" fill="none" />
            <circle cx="660" cy="620" r="76" stroke={colors.gearDark} strokeWidth="1.2" fill="none" />

            {/* 12 Curved Turbine Runner Blades */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, idx) => (
              <g key={idx} transform={`rotate(${angle} 660 620)`}>
                <path
                  d="M 660 588 C 678 570 690 535 705 508"
                  stroke={colors.gearDark}
                  strokeWidth="2.8"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M 660 588 C 672 574 682 546 695 516"
                  stroke={colors.gearAccent}
                  strokeWidth="1.4"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            ))}

            {/* Central Generator Shaft Hub */}
            <circle cx="660" cy="620" r="32" fill={colors.gearAccent} stroke={colors.gearDark} strokeWidth="3.5" />
            <circle cx="660" cy="620" r="14" fill={colors.gearAmber} stroke={colors.pipeBolt} strokeWidth="2" />
            <circle cx="660" cy="620" r="5" fill={colors.pipeBolt} />
            <line x1="660" y1="588" x2="660" y2="652" stroke={colors.pipeBolt} strokeWidth="2.5" />
            <line x1="628" y1="620" x2="692" y2="620" stroke={colors.pipeBolt} strokeWidth="2.5" />
          </g>

          {/* Interlocking Main Center Spur Gear (Rotates Counter-Clockwise 6s) */}
          <g
            className="sketch-mech"
            style={{
              transformBox: 'view-box',
              transformOrigin: '470px 740px',
              animation: motionActive ? 'spinCounterClockwise 6s linear infinite' : 'none',
              willChange: 'transform',
            }}
          >
            <path d={spurGearPath} fill={isLight ? "rgba(240, 238, 230, 0.55)" : "rgba(20, 22, 25, 0.55)"} stroke={colors.gearDark} strokeWidth="2.8" />
            <circle cx="470" cy="740" r="62" stroke={colors.gearAccent} strokeWidth="2.2" fill="none" />
            {[0, 60, 120, 180, 240, 300].map((deg, hi) => {
              const rad = (deg * Math.PI) / 180;
              const hx = 470 + 40 * Math.cos(rad);
              const hy = 740 + 40 * Math.sin(rad);
              return (
                <circle key={hi} cx={hx} cy={hy} r="12" fill={colors.gaugeDial} stroke={colors.gearDark} strokeWidth="1.8" />
              );
            })}
            <circle cx="470" cy="740" r="20" fill={colors.gearAccent} stroke={colors.gearDark} strokeWidth="3" />
            <circle cx="470" cy="740" r="8" fill={colors.gearAmber} stroke={colors.pipeBolt} strokeWidth="1.5" />
          </g>

          {/* Counter-Meshing Pinion Spur Gear (Rotates Clockwise 3.2s) */}
          <g
            className="sketch-mech"
            style={{
              transformBox: 'view-box',
              transformOrigin: '565px 795px',
              animation: motionActive ? 'spinClockwise 3.2s linear infinite' : 'none',
              willChange: 'transform',
            }}
          >
            <path d={pinionGearPath} fill={isLight ? "rgba(240, 238, 230, 0.65)" : "rgba(20, 22, 25, 0.65)"} stroke={colors.gearPinion} strokeWidth="2.5" />
            <circle cx="565" cy="795" r="32" stroke={colors.gearAccent} strokeWidth="2" fill="none" />
            <circle cx="565" cy="795" r="14" fill={colors.gearAccent} stroke={colors.gearPinion} strokeWidth="2.5" />
            <circle cx="565" cy="795" r="5" fill={colors.pipeBolt} />
            <line x1="565" y1="765" x2="565" y2="825" stroke={colors.pipeBolt} strokeWidth="2" />
            <line x1="535" y1="795" x2="595" y2="795" stroke={colors.pipeBolt} strokeWidth="2" />
          </g>

          {/* Engine Cylinder Housing with Cooling Fins */}
          <g className="sketch-mech">
            <g transform="translate(280, 785) rotate(-32)">
              <rect x="0" y="-22" width="75" height="44" rx="3" fill={isLight ? "#F1F0EA" : "#141619"} stroke={colors.gearDark} strokeWidth="2.8" />
              {[-18, -10, -2, 6, 14].map((fy, i) => (
                <line key={i} x1="-8" y1={fy} x2="0" y2={fy} stroke={colors.gearDark} strokeWidth="3" strokeLinecap="round" />
              ))}
              <line x1="0" y1="0" x2="75" y2="0" stroke={colors.gearAccent} strokeWidth="1.5" strokeDasharray="4 3" />
            </g>
          </g>

          {/* Crank Disc at Center (360, 840) */}
          <g
            className="sketch-mech"
            style={{
              transformBox: 'view-box',
              transformOrigin: '360px 840px',
              animation: motionActive ? 'crankPinSpin 2.4s linear infinite' : 'none',
              willChange: 'transform',
            }}
          >
            <circle cx="360" cy="840" r="42" fill={isLight ? "rgba(240, 238, 230, 0.65)" : "rgba(20, 22, 25, 0.65)"} stroke={colors.gearDark} strokeWidth="3" />
            <circle cx="360" cy="840" r="32" stroke={colors.gearAccent} strokeWidth="1.8" strokeDasharray="5 3" />
            <circle cx="360" cy="840" r="14" fill={colors.gearAccent} stroke={colors.gearDark} strokeWidth="2.5" />
            <circle cx="338" cy="824" r="5.5" fill={colors.gearAmber} stroke={colors.gearAccent} strokeWidth="2" />
          </g>

          {/* Reciprocating Connecting Rod & Piston Head */}
          <g
            className="sketch-mech"
            style={{
              animation: motionActive ? 'pistonReciprocateMotion 2.4s ease-in-out infinite' : 'none',
              willChange: 'transform',
            }}
          >
            <g transform="translate(295, 775) rotate(-32)">
              <rect x="5" y="-16" width="30" height="32" rx="2" fill={colors.pistonHead} stroke={colors.connectingRod} strokeWidth="2.2" />
              <line x1="15" y1="-16" x2="15" y2="16" stroke={colors.gearAmber} strokeWidth="1.8" />
              <line x1="25" y1="-16" x2="25" y2="16" stroke={colors.gearAmber} strokeWidth="1.8" />
            </g>
            <line x1="310" y1="785" x2="340" y2="826" stroke={colors.connectingRod} strokeWidth="4.5" strokeLinecap="round" />
            <line x1="310" y1="785" x2="340" y2="826" stroke={colors.pistonHead} strokeWidth="2" strokeLinecap="round" />
            <circle cx="310" cy="785" r="5" fill={colors.gearAmber} stroke={colors.connectingRod} strokeWidth="1.5" />
          </g>

          {/* =========================================================================
              INDUSTRIAL CONTROL CONSOLE & FIELD OPERATOR IN FULL PPE
              (Represents technical plant operations and active power dispatch)
             ========================================================================= */}
          <g className="sketch-mech" id="operator-and-control-panel">
            {/* Ground Equipment Skid Base Plate */}
            <rect
              x="660"
              y="918"
              width="200"
              height="14"
              rx="2"
              fill={isLight ? "#E2E8F0" : "#1E293B"}
              stroke={colors.gearDark}
              strokeWidth="2.4"
            />
            {/* Skid Anchor Bolts */}
            {[675, 710, 750, 790, 825, 850].map((bx, bi) => (
              <circle key={bi} cx={bx} cy="925" r="2.5" fill={colors.gearAccent} stroke={colors.gearDark} strokeWidth="1" />
            ))}

            {/* Industrial Power Distribution / Switchgear Enclosure */}
            <g id="switchgear-panel">
              {/* Outer Housing Cabinet */}
              <rect
                x="675"
                y="778"
                width="92"
                height="140"
                rx="4"
                fill={isLight ? "#FAF9F5" : "#181E29"}
                stroke={colors.gearDark}
                strokeWidth="3"
              />
              {/* Internal Bezel */}
              <rect
                x="682"
                y="786"
                width="78"
                height="124"
                rx="2"
                fill="none"
                stroke={isLight ? "rgba(17,24,39,0.18)" : "rgba(255,255,255,0.18)"}
                strokeWidth="1.2"
              />

              {/* Top Digital SCADA / Power Meter Display */}
              <rect
                x="688"
                y="795"
                width="66"
                height="28"
                rx="2"
                fill={isLight ? "#0F172A" : "#020617"}
                stroke={colors.gearAccent}
                strokeWidth="1.6"
              />
              {/* Digital Power Frequency / Voltage Wave Line */}
              <path
                d="M 693 809 Q 700 801 708 809 T 723 809 T 738 809 L 748 809"
                fill="none"
                stroke="#10B981"
                strokeWidth="1.8"
                strokeLinecap="round"
                className="animate-pulse"
              />
              {/* Mini Readout Status Dots */}
              <circle cx="744" cy="802" r="2" fill="#10B981" className="animate-ping" style={{ animationDuration: '2s' }} />
              <circle cx="738" cy="802" r="1.5" fill="#3B82F6" />

              {/* Status Indicator LED Lights (Green/Amber/Red with Alternating Phase Telemetry) */}
              <g id="panel-status-leds">
                <circle
                  cx="693"
                  cy="834"
                  r="3.2"
                  fill="#10B981"
                  stroke={colors.gearDark}
                  strokeWidth="1"
                  className="animate-led-green"
                />
                <circle
                  cx="704"
                  cy="834"
                  r="3.2"
                  fill="#F59E0B"
                  stroke={colors.gearDark}
                  strokeWidth="1"
                  className="animate-led-amber"
                />
                <circle
                  cx="715"
                  cy="834"
                  r="3.2"
                  fill="#EF4444"
                  stroke={colors.gearDark}
                  strokeWidth="1"
                  className="animate-led-red"
                />
              </g>

              {/* Analog Pressure / Output Dial */}
              <circle cx="739" cy="840" r="10" fill={colors.gaugeDial} stroke={colors.gearDark} strokeWidth="1.6" />
              <circle cx="739" cy="840" r="8" stroke={colors.gaugeTicks} strokeWidth="0.8" strokeDasharray="2 1.5" />
              <line
                x1="739"
                y1="840"
                x2="744"
                y2="834"
                stroke={colors.gaugeNeedle}
                strokeWidth="1.5"
                strokeLinecap="round"
                className="animate-pulse"
              />
              <circle cx="739" cy="840" r="1.8" fill={colors.gearRim || colors.gearDark} />

              {/* Heavy-Duty Breaker Switches / Rotary Controls */}
              <g id="panel-breakers">
                <rect x="689" y="858" width="16" height="15" rx="2" fill={colors.summitBoltFill} stroke={colors.gearDark} strokeWidth="1.4" />
                <line x1="697" y1="861" x2="697" y2="870" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

                <rect x="712" y="858" width="16" height="15" rx="2" fill={colors.gearAmber} stroke={colors.gearDark} strokeWidth="1.4" />
                <line x1="720" y1="861" x2="720" y2="870" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

                <rect x="735" y="858" width="16" height="15" rx="2" fill={colors.gearPinion} stroke={colors.gearDark} strokeWidth="1.4" />
                <line x1="743" y1="861" x2="743" y2="870" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              </g>

              {/* High-Voltage Danger Warning Triangle Emblem */}
              <polygon
                points="721,882 713,896 729,896"
                fill="#FFD700"
                stroke={colors.gearDark}
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Lightning Bolt Glyph */}
              <path
                d="M 721 885 L 718 890 L 722 890 L 719 895"
                fill="none"
                stroke={colors.gearDark}
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Ventilation / Cooling Louvers at Lower Panel */}
              {[901, 905, 909].map((ly, li) => (
                <line key={li} x1="690" y1={ly} x2="752" y2={ly} stroke={isLight ? "rgba(17,24,39,0.3)" : "rgba(255,255,255,0.3)"} strokeWidth="1.5" strokeLinecap="round" />
              ))}
            </g>

            {/* Industrial Armored Conduits Rising from Panel to Power Equipment */}
            <g id="power-conduits">
              {/* Conduit 1: Runs directly from top of panel to Turbine Generator Shaft Hub */}
              <path
                d="M 720 778 L 720 725 Q 720 680 690 655 L 668 640"
                fill="none"
                stroke={colors.pipeWall}
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <path
                d="M 720 778 L 720 725 Q 720 680 690 655 L 668 640"
                fill="none"
                stroke={colors.gearAccent}
                strokeWidth="1.2"
                strokeDasharray="4 4"
              />

              {/* Conduit 2: Runs from right side of panel into Main Electrical Bus & Catenary Line */}
              <path
                d="M 750 778 L 750 705 Q 750 635 780 595 L 810 530"
                fill="none"
                stroke={colors.pipeWall}
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Conduit Junction Couplings */}
              <rect x="714" y="774" width="12" height="6" rx="1" fill={colors.gearAccent} stroke={colors.gearDark} strokeWidth="1.2" />
              <rect x="744" y="774" width="12" height="6" rx="1" fill={colors.gearAccent} stroke={colors.gearDark} strokeWidth="1.2" />
            </g>

            {/* Field Engineer Operator in Complete PPE (Modeled on certified field engineer in jkimages.jpg) */}
            <g id="ppe-field-operator" transform="translate(768, 765)">
              {/* White Industrial Safety Helmet / Hard Hat (As in jkimages.jpg) */}
              <path
                d="M 26 22 C 26 9 46 9 46 22 Z"
                fill="#FFFFFF"
                stroke={colors.gearDark}
                strokeWidth="2"
              />
              {/* Helmet Top Ventilation Ridge */}
              <path
                d="M 33 11 Q 36 8 39 11 L 39 20 L 33 20 Z"
                fill="#E2E8F0"
                stroke={colors.gearDark}
                strokeWidth="1"
              />
              {/* Helmet Front Brim & Brow Protection */}
              <path
                d="M 22 23 Q 36 20 50 23"
                fill="none"
                stroke={colors.gearDark}
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              {/* LESL Safety Red Dot Badge on Helmet */}
              <circle cx="36" cy="16" r="2.2" fill={colors.summitBoltFill} />

              {/* Head Silhouette in Dark Charcoal with Beard Profile */}
              <circle cx="36" cy="28" r="9.5" fill={isLight ? "#111827" : "#0F172A"} stroke={colors.gearDark} strokeWidth="1.2" />
              {/* Ear Detail */}
              <circle cx="42" cy="29" r="2.2" fill={isLight ? "#1F2937" : "#1E293B"} />

              {/* Orange Safety Glasses / Goggles (Exact signature from jkimages.jpg) */}
              <rect x="25" y="24" width="10" height="5" rx="1.5" fill="#F97316" stroke="#EA580C" strokeWidth="0.8" />
              <rect x="27" y="25" width="4" height="2" rx="0.5" fill="#FED7AA" opacity="0.8" />

              {/* Neck & Work Collar */}
              <rect x="33" y="37" width="8" height="7" fill={isLight ? "#111827" : "#0F172A"} />

              {/* Torso: Industrial Work Coverall Jacket with Dual Neon-Lime Reflective Bands (As in jkimages.jpg) */}
              {/* Base Navy/Dark Slate Heavy-Duty Garment */}
              <path
                d="M 23 44 L 50 44 L 54 84 L 18 84 Z"
                fill={isLight ? "#1E293B" : "#0F172A"}
                stroke={colors.gearDark}
                strokeWidth="2.2"
              />
              {/* Upper Chest Grey Accent Panel */}
              <path
                d="M 25 44 L 49 44 L 50 56 L 23 56 Z"
                fill={isLight ? "#64748B" : "#334155"}
              />

              {/* Dual Neon-Lime Reflective Safety Bands (Exact signature from jkimages.jpg) */}
              {/* Band 1 across upper chest */}
              <rect x="22" y="56" width="30" height="5" fill="#84CC16" stroke="#4D7C0F" strokeWidth="0.5" />
              <line x1="22" y1="58.5" x2="52" y2="58.5" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Band 2 across mid torso */}
              <rect x="20" y="66" width="32" height="5" fill="#84CC16" stroke="#4D7C0F" strokeWidth="0.5" />
              <line x1="20" y1="68.5" x2="52" y2="68.5" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Vertical Radio / Tool Pocket on Chest */}
              <rect x="38" y="47" width="8" height="8" rx="1" fill={isLight ? "#334155" : "#1E293B"} stroke="#84CC16" strokeWidth="0.8" />

              {/* Right Arm: Confident Stance at Side */}
              <path
                d="M 49 49 L 54 68 L 52 82"
                fill="none"
                stroke={isLight ? "#1E293B" : "#0F172A"}
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Neon Band on Right Sleeve */}
              <line x1="51" y1="59" x2="54" y2="67" stroke="#84CC16" strokeWidth="3.5" />
              <circle cx="52" cy="84" r="4.5" fill="#D97706" stroke={colors.gearDark} strokeWidth="1.2" />

              {/* Industrial Work Trousers with Ankle Visibility Stripes */}
              {/* Left Leg */}
              <path
                d="M 21 84 L 34 84 L 32 136 L 18 136 Z"
                fill={isLight ? "#111827" : "#0A0E17"}
                stroke={colors.gearDark}
                strokeWidth="2.2"
              />
              {/* Reflective Neon Ankle Band */}
              <rect x="18" y="122" width="14" height="4" fill="#84CC16" />
              <line x1="18" y1="124" x2="32" y2="124" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Right Leg */}
              <path
                d="M 37 84 L 51 84 L 53 136 L 39 136 Z"
                fill={isLight ? "#1E293B" : "#0F172A"}
                stroke={colors.gearDark}
                strokeWidth="2.2"
              />
              {/* Reflective Neon Ankle Band */}
              <rect x="39" y="122" width="14" height="4" fill="#84CC16" />
              <line x1="39" y1="124" x2="53" y2="124" stroke="#FFFFFF" strokeWidth="1.5" />

              {/* Heavy-Duty Steel-Toe Safety Boots */}
              <path
                d="M 15 136 L 33 136 L 33 147 L 11 147 Q 11 141 15 136 Z"
                fill="#451A03"
                stroke={colors.gearDark}
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <path
                d="M 38 136 L 55 136 L 57 147 L 36 147 Q 36 141 38 136 Z"
                fill="#270F03"
                stroke={colors.gearDark}
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            </g>

            {/* Left Arm: Operating Control Panel Breaker Switch (Root coords at shoulder 792,814 for Safari & Chrome accuracy) */}
            <g id="engineer-operating-arm" className="animate-arm-pivot">
              <path
                d="M 792 814 L 771 823 L 759 820"
                fill="none"
                stroke={isLight ? "#1E293B" : "#0F172A"}
                strokeWidth="5.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Neon Band on Left Sleeve */}
              <line x1="777" y1="821" x2="782" y2="823" stroke="#84CC16" strokeWidth="4" />
              {/* Work Glove Operating Console */}
              <circle cx="757" cy="820" r="5" fill="#D97706" stroke={colors.gearDark} strokeWidth="1.2" />
              {/* Glove Grip Detail */}
              <circle cx="760" cy="817" r="2" fill="#B45309" />
            </g>
          </g>
        </g>

        {/* =========================================================================
            LAYER 3: CONTINUOUS TRAVELING ORBS & ARC FLASHES (PHASE 2)
           ========================================================================= */}
        {motionActive && (
          <g id="kinetic-energy-pulses">
            {/* Operator Control Panel Energy Surge Pulse (Powering the Equipment) */}
            <g>
              <circle r="6" fill="#10B981" filter={`url(#${sparkGlowId})`}>
                <animateMotion
                  path="M 720 778 L 720 725 Q 720 680 690 655 L 668 640"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3" fill="#FFFFFF">
                <animateMotion
                  path="M 720 778 L 720 725 Q 720 680 690 655 L 668 640"
                  dur="2.4s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* Secondary Pulse from Panel into Main Grid */}
            <g>
              <circle r="6.5" fill={colors.summitBoltFill} filter={`url(#${sparkGlowId})`}>
                <animateMotion
                  path="M 750 778 L 750 705 Q 750 635 780 595 L 810 530"
                  dur="3s"
                  begin="-1.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3.2" fill="#FFD700">
                <animateMotion
                  path="M 750 778 L 750 705 Q 750 635 780 595 L 810 530"
                  dur="3s"
                  begin="-1.2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>
            {/* Orb on Catenary 1 */}
            <g>
              <circle r="7.5" fill={colors.catenaryPulseEnd} filter={`url(#${sparkGlowId})`}>
                <animateMotion
                  path="M 40 200 Q 230 255 430 190 T 820 230"
                  dur="4.2s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="4" fill={colors.pipeBolt}>
                <animateMotion
                  path="M 40 200 Q 230 255 430 190 T 820 230"
                  dur="4.2s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* Orb on Catenary 2 (Bidirectional Sweep) */}
            <g>
              <circle r="8.5" fill={colors.catenaryPulseEnd} filter={`url(#${sparkGlowId})`}>
                <animateMotion
                  path="M 25 310 Q 220 380 430 295 T 840 335"
                  dur="4.8s"
                  keyPoints="0;1;0"
                  keyTimes="0;0.5;1"
                  calcMode="spline"
                  keySplines="0.45 0 0.25 1; 0.45 0 0.25 1"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="4.5" fill={colors.pipeBolt}>
                <animateMotion
                  path="M 25 310 Q 220 380 430 295 T 840 335"
                  dur="4.8s"
                  keyPoints="0;1;0"
                  keyTimes="0;0.5;1"
                  calcMode="spline"
                  keySplines="0.45 0 0.25 1; 0.45 0 0.25 1"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* High-Energy Pulse Orb on Catenary 3 */}
            <g>
              <circle r="10.5" fill={colors.catenaryPulseStart} filter={`url(#${sparkGlowId})`}>
                <animateMotion
                  path="M 15 420 Q 210 500 440 395 T 850 435"
                  dur="3.8s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="5.5" fill={colors.pipeBolt}>
                <animateMotion
                  path="M 15 420 Q 210 500 440 395 T 850 435"
                  dur="3.8s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* Secondary Staggered Orb on Catenary 3 */}
            <g>
              <circle r="7.5" fill={colors.catenaryPulseStart} filter={`url(#${elecGlowId})`}>
                <animateMotion
                  path="M 15 420 Q 210 500 440 395 T 850 435"
                  dur="3.8s"
                  begin="-1.9s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="3.5" fill={colors.catenaryPulseEnd}>
                <animateMotion
                  path="M 15 420 Q 210 500 440 395 T 850 435"
                  dur="3.8s"
                  begin="-1.9s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* Orb on Catenary 4 */}
            <g>
              <circle r="8" fill={colors.catenaryPulseEnd} filter={`url(#${sparkGlowId})`}>
                <animateMotion
                  path="M 10 540 Q 220 625 440 515 T 845 555"
                  dur="5.4s"
                  repeatCount="indefinite"
                />
              </circle>
              <circle r="4" fill={colors.pipeBolt}>
                <animateMotion
                  path="M 10 540 Q 220 625 440 515 T 845 555"
                  dur="5.4s"
                  repeatCount="indefinite"
                />
              </circle>
            </g>

            {/* High-Voltage Arc Flash Sparks */}
            {arcFlash && (
              <g filter={`url(#${sparkGlowId})`}>
                <path
                  d="M 220 315 L 245 350 L 230 358 L 260 390"
                  stroke={colors.insulatorOrb}
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  fill="none"
                  className="animate-ping"
                  style={{ animationDuration: '0.38s' }}
                />
                <path
                  d="M 640 315 L 615 348 L 628 356 L 600 388"
                  stroke={colors.catenaryPulseEnd}
                  strokeWidth="3.2"
                  strokeLinecap="round"
                  fill="none"
                />
                <circle cx="430" cy="85" r="16" fill={colors.summitBoltFill} opacity="0.85" className="animate-pulse" />
              </g>
            )}
          </g>
        )}
      </svg>

      {/* Desktop-Only Hover Replay Icon Button (Hidden on Mobile) */}
      <div className="hidden lg:flex absolute bottom-3 right-3 items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
        <button
          onClick={handleReplaySketch}
          type="button"
          aria-label="Replay sketch animation"
          title="Replay Sketch"
          className={`w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer focus-visible:outline-none focus-visible:ring-2 ${
            isLight
              ? 'bg-white/95 border border-line text-ink hover:text-red hover:border-red hover:bg-cream focus-visible:ring-red shadow-xs'
              : 'bg-[#141619]/90 border border-[#FFD700]/40 text-[#FFD700] hover:text-white hover:border-[#FFD700] hover:bg-[#FF5722]/35 focus-visible:ring-[#FFD700] shadow-xl'
          }`}
        >
          <svg
            className="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
