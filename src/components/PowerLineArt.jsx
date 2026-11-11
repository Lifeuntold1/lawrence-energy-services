import React, { useId } from 'react';

export default function PowerLineArt({ className = '' }) {
  const uid = useId().replace(/:/g, '');
  const glowId = `glow-${uid}`;

  return (
    <div className={`relative select-none pointer-events-none ${className}`} aria-hidden="true">
      <svg
        viewBox="0 0 500 650"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto drop-shadow-[0_10px_25px_rgba(217,37,28,0.25)]"
      >
        {/* Transmission Tower Structure */}
        {/* Main Pylon Legs */}
        <line x1="250" y1="60" x2="160" y2="600" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        <line x1="250" y1="60" x2="340" y2="600" stroke="rgba(255,255,255,0.7)" strokeWidth="2.5" />
        
        {/* Grounding Base */}
        <line x1="130" y1="600" x2="370" y2="600" stroke="rgba(255,255,255,0.85)" strokeWidth="3" />
        
        {/* Cross Bracing Bars */}
        <line x1="175" y1="500" x2="325" y2="500" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <line x1="190" y1="400" x2="310" y2="400" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <line x1="205" y1="300" x2="295" y2="300" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
        <line x1="220" y1="200" x2="280" y2="200" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />

        {/* Diagonal X-Lattice Bracing */}
        <line x1="160" y1="600" x2="325" y2="500" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
        <line x1="340" y1="600" x2="175" y2="500" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
        <line x1="175" y1="500" x2="310" y2="400" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
        <line x1="325" y1="500" x2="190" y2="400" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
        <line x1="190" y1="400" x2="295" y2="300" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
        <line x1="310" y1="400" x2="205" y2="300" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
        <line x1="205" y1="300" x2="280" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
        <line x1="295" y1="300" x2="220" y2="200" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />

        {/* Cross Arms (Upper, Middle, Lower) */}
        {/* Upper Cross Arm */}
        <line x1="120" y1="130" x2="380" y2="130" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
        <line x1="120" y1="130" x2="235" y2="90" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        <line x1="380" y1="130" x2="265" y2="90" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />

        {/* Middle Cross Arm */}
        <line x1="80" y1="210" x2="420" y2="210" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
        <line x1="80" y1="210" x2="220" y2="160" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        <line x1="420" y1="210" x2="280" y2="160" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />

        {/* Lower Cross Arm */}
        <line x1="100" y1="290" x2="400" y2="290" stroke="rgba(255,255,255,0.9)" strokeWidth="2.5" />
        <line x1="100" y1="290" x2="210" y2="240" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />
        <line x1="400" y1="290" x2="290" y2="240" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" />

        {/* High Voltage Conductors / Lines */}
        <path
          d="M0 190 Q120 220 250 180 T500 200"
          stroke="rgba(255,245,0,0.4)"
          strokeWidth="1.8"
          strokeDasharray="4 2"
        />
        <path
          d="M0 270 Q140 310 250 260 T500 290"
          stroke="#FFF500"
          strokeWidth="2.2"
        />
        <path
          d="M0 350 Q160 400 250 340 T500 380"
          stroke="rgba(255,255,255,0.35)"
          strokeWidth="1.5"
        />

        {/* Animated Traveling Spark on Active Wire */}
        <circle r="4" fill="#FFF500" filter={`url(#${glowId})`}>
          <animateMotion
            path="M0 270 Q140 310 250 260 T500 290"
            dur="4s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Lightning Bolt Symbol at Pylon Apex */}
        <path
          d="M250 25 L245 42 L254 42 L248 60 L259 40 L250 40 Z"
          fill="#FFF500"
          stroke="#D9251C"
          strokeWidth="1.2"
        />

        <defs>
          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </div>
  );
}
