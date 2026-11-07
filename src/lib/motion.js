import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;

export function initLenis() {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) return null;

  // On touch/mobile devices, use native hardware-accelerated momentum scrolling.
  // This prevents touch hijacking, double-scrolling fighting, memory bloat, and mobile browser crashes.
  const isTouchDevice =
    typeof window !== 'undefined' &&
    ('ontouchstart' in window || navigator.maxTouchPoints > 0 || window.innerWidth < 1024);

  if (isTouchDevice) {
    return null;
  }

  if (lenisInstance) {
    lenisInstance.destroy();
  }

  lenisInstance = new Lenis({
    duration: 0.75,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 0,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenisInstance.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(500, 33);
  return lenisInstance;
}

export function initScrollAnimations() {
  const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (isReduced) {
    document.documentElement.classList.remove('js-motion');
    return () => {};
  }

  document.documentElement.classList.add('js-motion');

  // Prevent resize recalculation jank when mobile address bar collapses/expands
  ScrollTrigger.config({
    ignoreMobileResize: true,
  });

  const ctx = gsap.context(() => {
    // 1. Reveal up elements
    const revealEls = gsap.utils.toArray('[data-reveal]');
    revealEls.forEach((el) => {
      gsap.from(el, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      });
    });

    // 2. Counters
    const counterEls = gsap.utils.toArray('[data-counter]');
    counterEls.forEach((el) => {
      const targetVal = parseFloat(el.dataset.counter);
      const isDecimal = targetVal % 1 !== 0;
      const counterObj = { val: 0 };

      gsap.to(counterObj, {
        val: targetVal,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
        onUpdate: () => {
          if (isDecimal) {
            el.textContent = counterObj.val.toFixed(1);
          } else {
            el.textContent = Math.round(counterObj.val).toLocaleString('en-US');
          }
        },
      });
    });
  });

  return () => ctx.revert();
}

export function refreshScroll() {
  ScrollTrigger.refresh();
}
