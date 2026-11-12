import React, { useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { ArrowRight } from 'lucide-react';

const FreeSwipeRail = forwardRef(function FreeSwipeRail({ projects, onSelectProject }, ref) {
  const scrollRef = useRef(null);
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeftPos = useRef(0);
  const hasDragged = useRef(false);
  const [isDragging, setIsDragging] = useState(false);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  useImperativeHandle(ref, () => ({
    scroll,
  }));

  // Desktop Mouse Drag-to-Swipe Handlers
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    isMouseDown.current = true;
    hasDragged.current = false;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftPos.current = scrollRef.current.scrollLeft;
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown.current || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1.5;
    if (Math.abs(walk) > 6) {
      hasDragged.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftPos.current - walk;
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    isMouseDown.current = false;
    setIsDragging(false);
  };

  const handleCardClick = (proj) => {
    // If the user was dragging the rail to scroll, don't open the modal
    if (hasDragged.current) return;
    onSelectProject(proj);
  };

  return (
    <div className="relative">
      {/* Free-Swipe Horizontal Rail Container */}
      <div
        ref={scrollRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave}
        className={`flex gap-6 overflow-x-auto pb-6 pt-2 no-scrollbar select-none overscroll-x-contain ${
          isDragging ? 'cursor-grabbing scroll-auto' : 'cursor-grab scroll-smooth'
        }`}
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {projects.map((proj) => (
          <div
            key={proj.id}
            onClick={() => handleCardClick(proj)}
            className="flex-none w-[82vw] sm:w-[360px] lg:w-[400px] bg-white border border-line rounded-[6px] overflow-hidden shadow-card hover:shadow-hover hover:-translate-y-1.5 cursor-pointer group transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-[4/3] overflow-hidden bg-black/10">
                <img
                  src={`/${proj.photos[0]}`}
                  alt={proj.title}
                  width="400"
                  height="300"
                  style={{ aspectRatio: '4 / 3' }}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                  loading="lazy"
                  draggable={false}
                />
                <div className="absolute top-3 right-3 bg-black/85 text-white text-[11px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-[4px] border border-white/20">
                  {proj.tags[0]}
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="text-base sm:text-lg font-extrabold text-black group-hover:text-red transition-colors leading-snug">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-grey mt-2 line-clamp-2 leading-relaxed">
                  {proj.caption}
                </p>
              </div>
            </div>

            <div className="p-5 sm:p-6 pt-0">
              <div className="flex items-center justify-between text-xs font-bold text-red pt-3 border-t border-line/60">
                <span>View Project Data</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default FreeSwipeRail;
