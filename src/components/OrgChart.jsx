import React from 'react';
import { Shield, Wrench, Zap, Users, Building, Laptop } from 'lucide-react';

export default function OrgChart() {
  return (
    <div className="w-full overflow-x-auto pb-8 pt-4">
      <div className="min-w-[860px] flex flex-col items-center select-none text-center">
        {/* Level 1: Management Board */}
        <div className="bg-white border-2 border-red text-black font-bold text-sm px-6 py-3 rounded-[6px] shadow-sm max-w-xs">
          Management Board
        </div>
        
        {/* Connector */}
        <div className="w-[2px] h-6 bg-red" />

        {/* Level 2: Chairman & Managing Director */}
        <div className="bg-yellow/30 border-2 border-red text-black font-bold text-sm px-8 py-3.5 rounded-[6px] shadow-sm max-w-sm">
          <p className="text-[11px] font-semibold text-red uppercase tracking-wider">Executive</p>
          Chairman & Managing Director
        </div>

        {/* Connector */}
        <div className="w-[2px] h-6 bg-red" />

        {/* Level 3: General Manager */}
        <div className="bg-yellow/30 border-2 border-red text-black font-bold text-sm px-6 py-3 rounded-[6px] shadow-sm max-w-xs">
          General Manager (Operations)
        </div>

        {/* Branching Line */}
        <div className="w-[2px] h-8 bg-red" />
        <div className="relative w-[780px] h-[2px] bg-red">
          {/* Left drop line to Project Dept */}
          <div className="absolute left-[200px] top-0 w-[2px] h-8 bg-red" />
          {/* Right drop line to Admin Dept */}
          <div className="absolute right-[200px] top-0 w-[2px] h-8 bg-red" />
        </div>

        {/* Level 4: Two Major Departments */}
        <div className="w-full flex justify-between gap-8 pt-8 px-4">
          {/* Left: Project Department */}
          <div className="flex-1 bg-cream/60 border-2 border-red p-5 rounded-[6px] shadow-sm text-left">
            <div className="flex items-center gap-2 border-b border-red/20 pb-3 mb-4">
              <Wrench className="w-5 h-5 text-red" />
              <h4 className="font-bold text-base text-black uppercase tracking-wide">
                Project Department
              </h4>
            </div>

            <div className="space-y-4">
              {/* Site Manager Block */}
              <div className="bg-white border border-red/40 p-3 rounded-[6px]">
                <p className="font-bold text-xs text-red uppercase tracking-wider mb-2">
                  Site Manager
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                  <div className="bg-line/40 p-2 rounded">
                    <p className="font-semibold text-black">Supervisory Head (Electrical)</p>
                    <p className="text-grey text-[11px] mt-1">Electrical Technicians &amp; Trainees</p>
                  </div>
                  <div className="bg-line/40 p-2 rounded">
                    <p className="font-semibold text-black">Head, Site Operations</p>
                    <p className="text-grey text-[11px] mt-1">GG Operators &amp; Operator Trainees</p>
                  </div>
                  <div className="bg-line/40 p-2 rounded">
                    <p className="font-semibold text-black">Supervisory Head (Mechanical)</p>
                    <p className="text-grey text-[11px] mt-1">Mechanical Technicians &amp; Trainees</p>
                  </div>
                </div>
              </div>

              {/* Safety Block */}
              <div className="bg-white border border-red/40 p-3 rounded-[6px] flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-red uppercase tracking-wider">
                    Safety Manager
                  </p>
                  <p className="text-xs text-grey mt-0.5">Assistant Safety Manager &rarr; Safety Assistant</p>
                </div>
                <Shield className="w-4 h-4 text-red shrink-0" />
              </div>
            </div>
          </div>

          {/* Right: Administrative Department */}
          <div className="flex-1 bg-cream/60 border-2 border-red p-5 rounded-[6px] shadow-sm text-left">
            <div className="flex items-center gap-2 border-b border-red/20 pb-3 mb-4">
              <Building className="w-5 h-5 text-red" />
              <h4 className="font-bold text-base text-black uppercase tracking-wide">
                Administrative Department
              </h4>
            </div>

            <div className="space-y-3">
              <div className="bg-white border border-red/40 p-3 rounded-[6px] flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-black">I.T. Department</p>
                  <p className="text-grey text-[11px]">Systems, network infrastructure, technical telemetry</p>
                </div>
                <Laptop className="w-4 h-4 text-red shrink-0" />
              </div>

              <div className="bg-white border border-red/40 p-3 rounded-[6px]">
                <p className="font-bold text-xs text-black">Accounts / Admin Manager</p>
                <p className="text-grey text-[11px] mt-0.5">
                  Stock &amp; Store Inventory Officer, Office Secretary, Drivers, Cleaners, Office Clerk
                </p>
              </div>

              <div className="bg-white border border-red/40 p-3 rounded-[6px] flex items-center justify-between">
                <div>
                  <p className="font-bold text-xs text-black">HR / Legal &amp; Compliance</p>
                  <p className="text-grey text-[11px]">Regulatory filings, employment standards, legal contracts</p>
                </div>
                <Users className="w-4 h-4 text-red shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
