import React from 'react';
import {
  GraduationCap,
  Wrench,
  Award,
  ShieldCheck,
  Scale,
  BadgeCheck,
  HeartPulse,
  HardHat,
} from 'lucide-react';

const PILLARS_DATA = [
  {
    num: '01',
    title: 'Safety Training',
    desc: 'Mandatory continuous drills and certified technical safety modules for every operative.',
    icon: GraduationCap,
  },
  {
    num: '02',
    title: 'Tools Knowledge',
    desc: 'Calibrated industrial instruments, rigorous pre-job inspection, and specialized tooling protocols.',
    icon: Wrench,
  },
  {
    num: '03',
    title: 'Experience',
    desc: 'Decades of combined field expertise across high-voltage substations and heavy industrial plants.',
    icon: Award,
  },
  {
    num: '04',
    title: 'Safety First',
    desc: 'Absolute right to stop work. Non-negotiable hazard isolation before any system energization.',
    icon: ShieldCheck,
  },
  {
    num: '05',
    title: 'Regulations',
    desc: 'Strict compliance with Nigerian Electricity Management Services Agency (NEMSA) and international manufacturer engineering standards.',
    icon: Scale,
  },
  {
    num: '06',
    title: 'Insurance',
    desc: 'Full comprehensive third-party, equipment, and workmen compensation liability coverage.',
    icon: BadgeCheck,
  },
  {
    num: '07',
    title: 'Health',
    desc: 'Active occupational health monitoring, ergonomic field protocols, and environmental care.',
    icon: HeartPulse,
  },
  {
    num: '08',
    title: 'Protection',
    desc: 'Certified personal protective gear, flame-retardant uniforms, and arc-flash protection.',
    icon: HardHat,
  },
];

export default function WorkSafetyPillars({ variant = 'on-red' }) {
  const isRed = variant === 'on-red';

  return (
    <div className="w-full">
      {/* Decorative Circuit Busbar Line */}
      <div className="relative mb-8 hidden md:block" aria-hidden="true">
        <svg viewBox="0 0 1000 36" fill="none" className="w-full h-8 overflow-visible">
          {/* Main Busbar Line */}
          <line
            x1="20"
            y1="18"
            x2="980"
            y2="18"
            stroke={isRed ? 'rgba(255, 255, 255, 0.25)' : 'rgba(217, 37, 28, 0.25)'}
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          {/* Traveling Pulse Line */}
          <line
            x1="20"
            y1="18"
            x2="980"
            y2="18"
            stroke="#FFF500"
            strokeWidth="2.5"
            strokeDasharray="80 320"
            className="animate-[pulse_3s_ease-in-out_infinite]"
          />
          {/* 8 Busbar Junction Nodes */}
          {[60, 190, 320, 450, 580, 710, 840, 940].map((cx, i) => (
            <g key={i}>
              <circle
                cx={cx}
                cy="18"
                r="6"
                fill={isRed ? '#D9251C' : '#FFFFFF'}
                stroke="#FFF500"
                strokeWidth="2"
              />
              <circle
                cx={cx}
                cy="18"
                r="2.5"
                fill="#FFF500"
                className="animate-ping"
                style={{ animationDuration: `${2 + (i % 3)}s` }}
              />
            </g>
          ))}
        </svg>
      </div>

      {/* 8 Pillars Responsive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {PILLARS_DATA.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={p.num}
              data-reveal
              style={{ transitionDelay: `${idx * 40}ms` }}
              className={`relative rounded-[6px] p-5 transition-all duration-300 hover:-translate-y-1 ${
                isRed
                  ? 'bg-black/30 border border-white/15 hover:border-yellow/60 hover:bg-black/45 text-white'
                  : 'bg-white border border-line hover:border-red hover:shadow-card text-ink'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-xs font-mono font-bold tracking-widest ${
                    isRed ? 'text-yellow' : 'text-red'
                  }`}
                >
                  {p.num}
                </span>
                <div
                  className={`p-2 rounded-[4px] ${
                    isRed ? 'bg-white/10 text-yellow' : 'bg-red-tint text-red'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <h4
                className={`text-base font-extrabold tracking-tight mb-2 ${
                  isRed ? 'text-white' : 'text-black'
                }`}
              >
                {p.title}
              </h4>

              <p
                className={`text-xs leading-relaxed font-normal ${
                  isRed ? 'text-white/80' : 'text-grey'
                }`}
              >
                {p.desc}
              </p>

              <div
                className={`w-6 h-0.5 mt-4 transition-all duration-300 ${
                  isRed ? 'bg-yellow/40 group-hover:w-12 group-hover:bg-yellow' : 'bg-red/30'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
