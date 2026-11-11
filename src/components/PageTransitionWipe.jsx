import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { Zap } from 'lucide-react';
import { scrollToTopImmediate } from '../lib/motion';

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
      scrollToTopImmediate(location.hash);
      return;
    }

    setAnimating(true);
    setWipePhase('idle');

    let raf2 = 0;
    const raf1 = window.requestAnimationFrame(() => {
      raf2 = window.requestAnimationFrame(() => {
        setWipePhase('covering');
      });
    });

    // After curtain covers screen, reset scroll cleanly via Lenis + window
    const coverTimer = window.setTimeout(() => {
      scrollToTopImmediate(location.hash);
      setWipePhase('uncovering');
    }, 240);

    // After curtain finished uncovering
    const finishTimer = window.setTimeout(() => {
      setAnimating(false);
      setWipePhase('idle');
    }, 520);

    return () => {
      window.cancelAnimationFrame(raf1);
      window.cancelAnimationFrame(raf2);
      window.clearTimeout(coverTimer);
      window.clearTimeout(finishTimer);
    };
  }, [location.pathname, location.hash]);

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
