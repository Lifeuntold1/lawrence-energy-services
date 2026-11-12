import React, { useEffect } from 'react';
import { X, CheckCircle, Award } from 'lucide-react';
import content from '../data/content.json';

export default function LeaderModal({ isOpen, onClose }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const leader = content.leaders[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 sm:p-6"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="leader-modal-title"
    >
      <div
        className="relative bg-white text-ink max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-[6px] shadow-2xl p-6 sm:p-8 border border-line"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 text-grey hover:text-black min-w-[48px] min-h-[48px] flex items-center justify-center p-2.5 rounded-full hover:bg-line/50 transition-all active:scale-95 focus-visible:outline-none"
          aria-label="Close dialog"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pb-6 border-b border-line">
          <img
            src={`/${leader.photo}`}
            alt={leader.name}
            width="112"
            height="144"
            style={{ aspectRatio: '112 / 144' }}
            className="w-28 h-36 object-cover rounded-[6px] border-2 border-red shadow-sm shrink-0"
            loading="lazy"
          />
          <div className="text-center sm:text-left">
            <span className="text-xs font-bold uppercase tracking-widest text-red-deep bg-red-tint px-2.5 py-1 rounded-[4px]">
              Executive Profile
            </span>
            <h2 id="leader-modal-title" className="text-2xl font-bold text-black mt-2">
              {leader.name}
            </h2>
            <p className="text-sm font-semibold text-grey mt-0.5">{leader.title}</p>
            <div className="flex items-center gap-1.5 text-xs text-black/70 mt-3 font-medium">
              <Award className="w-4 h-4 text-red" />
              <span>Over 20 years engineering leadership experience</span>
            </div>
          </div>
        </div>

        {/* Bio */}
        <div className="py-6 border-b border-line">
          <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-2">Background</h3>
          <p className="text-sm text-grey leading-relaxed">{leader.bio}</p>
        </div>

        {/* Skills */}
        <div className="pt-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-black mb-4">
            Core Engineering & Management Capabilities
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {leader.skills?.map((skill, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs font-medium text-ink bg-cream/70 p-2.5 rounded-[6px] border border-line">
                <CheckCircle className="w-4 h-4 text-red shrink-0 mt-0.5" />
                <span>{skill}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
