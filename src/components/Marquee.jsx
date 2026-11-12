import React from 'react';
import { Zap } from 'lucide-react';

export default function Marquee({
  items = [],
  reverse = false,
  speed = 'normal',
  type = 'text',
  className = '',
}) {
  // Duplicate array for seamless infinite scroll
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div
      className={`marquee-container overflow-hidden whitespace-nowrap select-none py-3 ${className}`}
      aria-hidden="true"
    >
      <div className={reverse ? 'animate-marquee-reverse' : 'animate-marquee'}>
        {repeated.map((item, idx) => (
          <div key={idx} className="inline-flex items-center mx-6">
            {type === 'text' ? (
              <div className="flex items-center gap-6">
                <span className="text-xl sm:text-2xl font-bold tracking-tight text-white uppercase">
                  {item}
                </span>
                <Zap className="w-4 h-4 text-yellow fill-yellow shrink-0" />
              </div>
            ) : (
              <div className="logo-tile bg-white border border-line rounded-[6px] w-[140px] sm:w-[170px] h-[75px] sm:h-[90px] p-2.5 sm:p-3 flex items-center justify-center shadow-sm shrink-0">
                <img
                  src={`/${item.logo}`}
                  alt={item.name}
                  width="145"
                  height="64"
                  style={{ aspectRatio: '145 / 64' }}
                  className="max-h-14 sm:max-h-16 max-w-[125px] sm:max-w-[145px] object-contain"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
