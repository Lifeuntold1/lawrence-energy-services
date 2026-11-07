import React, { useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight, Tag } from 'lucide-react';

export default function Lightbox({
  isOpen,
  project,
  photoIndex = 0,
  onClose,
  onNext,
  onPrev,
}) {
  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNext) onNext();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
    },
    [isOpen, onClose, onNext, onPrev]
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !project) return null;

  const currentPhoto =
    project.photos && project.photos[photoIndex]
      ? project.photos[photoIndex]
      : project.photos?.[0];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 sm:p-6 transition-opacity duration-300"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={project.title}
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 text-white hover:text-yellow min-w-[48px] min-h-[48px] flex items-center justify-center p-2.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-all focus-visible:outline-none"
        aria-label="Close photo viewer"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev / Next Navigation Arrows */}
      {onPrev && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-3 sm:left-6 z-20 text-white hover:text-yellow min-w-[48px] min-h-[48px] flex items-center justify-center p-2.5 rounded-full bg-white/15 hover:bg-white/25 transition-all active:scale-95 focus-visible:outline-none"
          aria-label="Previous photo"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}

      {onNext && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-3 sm:right-6 z-20 text-white hover:text-yellow min-w-[48px] min-h-[48px] flex items-center justify-center p-2.5 rounded-full bg-white/15 hover:bg-white/25 transition-all active:scale-95 focus-visible:outline-none"
          aria-label="Next photo"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Main Content Modal */}
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative rounded-[6px] overflow-hidden bg-black/40 border border-white/15 max-h-[70vh] flex items-center justify-center">
          <img
            src={`/${currentPhoto}`}
            alt={project.title}
            className="max-h-[70vh] max-w-full object-contain select-none"
          />
        </div>

        {/* White Caption Bar below photo */}
        <div className="w-full bg-white text-ink p-4 sm:p-5 rounded-b-[6px] mt-2 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              {project.tags && project.tags[0] && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider bg-cream text-red px-2 py-0.5 rounded-[4px] border border-line">
                  <Tag className="w-3 h-3 text-red" />
                  {project.tags[0]}
                </span>
              )}
              {project.photos && project.photos.length > 1 && (
                <span className="text-xs text-grey">
                  Photo {photoIndex + 1} of {project.photos.length}
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-bold text-black">{project.title}</h3>
            <p className="text-sm text-grey mt-0.5">{project.caption}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
