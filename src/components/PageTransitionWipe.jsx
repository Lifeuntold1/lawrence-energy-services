import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';

export default function PageTransitionWipe({ children }) {
  const location = useLocation();
  const [animating, setAnimating] = useState(false);
  const [wipePhase, setWipePhase] = useState('idle'); // 'idle' -> 'covering' -> 'uncovering'
  const isFirstMount = useRef(true);

  useEffect(() => {
    // Avoid wipe transition on initial cold load for instant First Contentful Paint
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    // Check if reduced motion is requested
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced) {
      window.scrollTo(0, 0);
      return;
    }

    setAnimating(true);
    setWipePhase('covering');

    // After 220ms, curtain covers screen. Reset scroll to top immediately!
    const coverTimer = setTimeout(() => {
      window.scrollTo(0, 0);
      setWipePhase('uncovering');
    }, 240);

    // After 500ms, curtain finished uncovering
    const finishTimer = setTimeout(() => {
      setAnimating(false);
      setWipePhase('idle');
    }, 480);

    return () => {
      clearTimeout(coverTimer);
      clearTimeout(finishTimer);
    };
  }, [location.pathname]);

  return (
    <>
      {animating && (
        <div
          className={`fixed inset-0 z-50 pointer-events-none flex items-center justify-center bg-red transition-transform duration-300 ${
            wipePhase === 'covering'
              ? 'translate-x-0'
              : wipePhase === 'uncovering'
              ? 'translate-x-full'
              : '-translate-x-full'
          }`}
          style={{
            transitionTimingFunction: 'cubic-bezier(0.65, 0, 0.35, 1)',
          }}
          aria-hidden="true"
        >
          <div className="flex items-center gap-3 text-yellow font-extrabold text-2xl tracking-widest uppercase">
            <Zap className="w-8 h-8 fill-yellow animate-pulse" />
            <span>LESL</span>
          </div>
        </div>
      )}
      {children}
    </>
  );
}
