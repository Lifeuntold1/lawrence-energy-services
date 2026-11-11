import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance = null;
let tickerCallback = null;

export function destroyLenis() {
  if (tickerCallback) {
    gsap.ticker.remove(tickerCallback);
    tickerCallback = null;
  }
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
}

export function scrollToTopImmediate(hash = '') {
  if (typeof window === 'undefined') return;

  if (hash) {
    const id = hash.replace(/^#/, '');
    const target = document.getElementById(id);
    if (target) {
      if (lenisInstance) {
        lenisInstance.scrollTo(target, { offset: -88, immediate: true });
      } else {
        target.scrollIntoView({ behavior: 'auto', block: 'start' });
      }
      return;
    }
  }

  if (lenisInstance) {
    lenisInstance.scrollTo(0, { immediate: true });
  }
  window.scrollTo(0, 0);
}

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

  destroyLenis();

  lenisInstance = new Lenis({
    duration: 0.7,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 1.0,
    touchMultiplier: 0,
  });

  lenisInstance.on('scroll', ScrollTrigger.update);

  tickerCallback = (time) => {
    if (lenisInstance) {
      lenisInstance.raf(time * 1000);
    }
  };
  gsap.ticker.add(tickerCallback);

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
    // 1. Reveal up elements (clearProps preserves Tailwind hover transforms after reveal)
    const revealEls = gsap.utils.toArray('[data-reveal]');
    revealEls.forEach((el) => {
      gsap.from(el, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        clearProps: 'opacity,transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          once: true,
        },
      });
    });

    // 2. Counters
    const counterEls = gsap.utils.toArray('[data-counter]');
    counterEls.forEach((el) => {
      const targetVal = parseFloat(el.dataset.counter);
      if (Number.isNaN(targetVal)) return;
      const isDecimal = targetVal % 1 !== 0;
      const suffix = el.dataset.counterSuffix || '';
      const counterObj = { val: 0 };

      gsap.to(counterObj, {
        val: targetVal,
        duration: 1.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
        onUpdate: () => {
          if (isDecimal) {
            el.textContent = `${counterObj.val.toFixed(1)}${suffix}`;
          } else {
            el.textContent = `${Math.round(counterObj.val).toLocaleString('en-US')}${suffix}`;
          }
        },
      });
    });
  });

  const settleTimer = window.setTimeout(() => {
    ScrollTrigger.refresh();
  }, 350);

  return () => {
    window.clearTimeout(settleTimer);
    ctx.revert();
  };
}

export function refreshScroll() {
  ScrollTrigger.refresh();
}
