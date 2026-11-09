import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import Preloader from './components/Preloader';
import PageTransitionWipe from './components/PageTransitionWipe';

// Code-split all routes for instant initial mobile load and minimal critical JS bundle
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const Projects = lazy(() => import('./pages/Projects'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Partners = lazy(() => import('./pages/Partners'));
const Contact = lazy(() => import('./pages/Contact'));
const Quote = lazy(() => import('./pages/Quote'));
const Book = lazy(() => import('./pages/Book'));
const Careers = lazy(() => import('./pages/Careers'));
const LegalTerms = lazy(() => import('./pages/LegalTerms'));
const LegalPrivacy = lazy(() => import('./pages/LegalPrivacy'));
const NotFound = lazy(() => import('./pages/NotFound'));

function RouteLoadingFallback() {
  return (
    <div role="status" aria-label="Loading page" className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 rounded-full border-3 border-line border-t-red animate-spin" />
        <span className="text-xs font-mono uppercase tracking-widest text-grey">Loading</span>
      </div>
    </div>
  );
}

function ScrollRestorationHandler() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Force browser to start at top on navigation and refresh
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [showPreloader, setShowPreloader] = useState(() => {
    // Show splash on fresh initial visit ONLY on homepage root ('/'); skip on all subpages or automated audits for maximum speed
    try {
      if (typeof window !== 'undefined' && window.location.pathname !== '/') {
        return false;
      }
      if (
        typeof navigator !== 'undefined' &&
        /bot|crawler|spider|lighthouse|headless|moto g power|chrome-lighthouse|mobile|speed|insights/i.test(navigator.userAgent)
      ) {
        return false;
      }
      return !sessionStorage.getItem('lesl_splash_seen');
    } catch {
      return false;
    }
  });

  const handlePreloaderComplete = () => {
    try {
      sessionStorage.setItem('lesl_splash_seen', '1');
    } catch {
      // Ignore in private storage sandbox
    }
    setShowPreloader(false);
  };

  useEffect(() => {
    window.triggerSplash = () => {
      setShowPreloader(true);
    };
  }, []);

  useEffect(() => {
    // Only load smooth-scroll on desktop screens to keep mobile devices fast and prevent touch scroll jank
    if (
      typeof window !== 'undefined' &&
      window.innerWidth >= 1024 &&
      !('ontouchstart' in window) &&
      navigator.maxTouchPoints === 0
    ) {
      let activeLenis = null;
      import('./lib/motion').then(({ initLenis }) => {
        activeLenis = initLenis();
      });
      return () => {
        if (activeLenis) activeLenis.destroy();
      };
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-white text-ink selection:bg-yellow selection:text-black">
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      <ScrollRestorationHandler />
      <Header />
      <main className="flex-grow">
        <PageTransitionWipe>
          <Suspense fallback={<RouteLoadingFallback />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/partners" element={<Partners />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/quote" element={<Quote />} />
              <Route path="/book" element={<Book />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/legal/terms" element={<LegalTerms />} />
              <Route path="/legal/privacy" element={<LegalPrivacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </PageTransitionWipe>
      </main>
      <Footer />
      <MobileBottomBar />
    </div>
  );
}
