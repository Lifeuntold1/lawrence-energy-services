import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Phone,
  Menu,
  X,
  ArrowRight,
  ChevronDown,
  Building2,
  Users,
  Briefcase,
  Zap,
  Wrench,
  Package,
  GraduationCap,
  FileText,
} from 'lucide-react';
import content from '../data/content.json';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileDropdown, setMobileDropdown] = useState({ about: false, services: false });
  const closeTimeoutRef = useRef(null);
  const lastScrollYRef = useRef(0);
  const isScrolledRef = useRef(false);
  const isHiddenRef = useRef(false);
  const mobileMenuOpenRef = useRef(false);
  const activeDropdownRef = useRef(null);
  const navContainerRef = useRef(null);

  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    mobileMenuOpenRef.current = mobileMenuOpen;
  }, [mobileMenuOpen]);

  useEffect(() => {
    activeDropdownRef.current = activeDropdown;
  }, [activeDropdown]);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = Math.max(0, window.scrollY);
          const nextScrolled = currentScrollY > 40;
          const nextHidden =
            currentScrollY > 120 &&
            currentScrollY > lastScrollYRef.current &&
            !mobileMenuOpenRef.current &&
            !activeDropdownRef.current;

          if (nextScrolled !== isScrolledRef.current) {
            isScrolledRef.current = nextScrolled;
            setIsScrolled(nextScrolled);
          }

          if (nextHidden !== isHiddenRef.current) {
            isHiddenRef.current = nextHidden;
            setIsHidden(nextHidden);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on Escape or outside pointer click (supports iPad/touch/keyboard)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        setMobileMenuOpen(false);
      }
    };

    const handlePointerDown = (e) => {
      if (navContainerRef.current && !navContainerRef.current.contains(e.target)) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [location.pathname]);

  // Lock body scroll on mobile when menu drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const handleMouseEnter = (key) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setActiveDropdown(key);
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleMobileDropdown = (key) => {
    setMobileDropdown((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const navItems = [
    { label: 'Home', href: '/' },
    {
      key: 'about',
      label: 'About',
      href: '/about',
      hasDropdown: true,
      mainLabel: 'About LESL Overview',
      dropdownItems: [
        {
          label: 'Company Profile',
          desc: 'Leadership, corporate history, and governance structure',
          href: '/about',
          icon: Building2,
        },
        {
          label: 'Partners & Clients',
          desc: 'Multinational engineering partnerships and enterprise clients',
          href: '/partners',
          icon: Users,
        },
        {
          label: 'Projects',
          desc: 'Multi-megawatt installations delivered nationwide',
          href: '/projects',
          icon: Briefcase,
        },
      ],
    },
    {
      key: 'services',
      label: 'Services',
      href: '/services',
      hasDropdown: true,
      mainLabel: 'All Services Overview',
      dropdownItems: [
        {
          label: 'Electrical Installation & Care',
          desc: 'Substations, switchgear, cabling, and transformers',
          href: '/services/electrical',
          icon: Zap,
        },
        {
          label: 'Mechanical Installation & Care',
          desc: 'Gas turbines, generators, piping, and boilers',
          href: '/services/mechanical',
          icon: Wrench,
        },
        {
          label: 'Sales & Equipment Supply',
          desc: 'Original manufacturer spare parts, radiators, and industrial panels',
          href: '/services/supply',
          icon: Package,
        },
        {
          label: 'Consultancy & Training',
          desc: 'Industrial audits, safety compliance, and operator training',
          href: '/services/consultancy',
          icon: GraduationCap,
        },
      ],
    },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  // Light hero across all pages guarantees solid executive navigation with zero color-flipping
  const isSolid = true;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isHidden ? '-translate-y-full' : 'translate-y-0'
        } ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-card border-b border-line py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-line/60 py-3.5 sm:py-4'
        }`}
      >
        <div className="max-w-container mx-auto px-5 lg:px-10 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black"
            aria-label="Lawrence Energy Services Limited - Home"
          >
            <img
              src={
                isSolid
                  ? `/${content.brand.logo}`
                  : `/${content.brand.logo_on_dark}`
              }
              alt="LESL Logo"
              width="160"
              height="48"
              style={{ aspectRatio: '160 / 48' }}
              className="h-11 sm:h-13 lg:h-14 w-auto object-contain transition-all duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav ref={navContainerRef} className="hidden lg:flex items-center gap-7" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href);

              if (item.hasDropdown) {
                const isOpen = activeDropdown === item.key;

                return (
                  <div
                    key={item.key}
                    className="relative"
                    onMouseEnter={() => handleMouseEnter(item.key)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="flex items-center gap-0.5">
                      <Link
                        to={item.href}
                        onClick={() => setActiveDropdown(null)}
                        className={`relative py-1 text-[15px] font-semibold transition-colors duration-150 inline-flex items-center ${
                          isSolid
                            ? isActive || isOpen
                              ? 'text-red'
                              : 'text-ink hover:text-red'
                            : isActive || isOpen
                            ? 'text-yellow'
                            : 'text-white hover:text-yellow'
                        }`}
                      >
                        <span>{item.label}</span>
                        {isActive && (
                          <span
                            className={`absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full ${
                              isSolid ? 'bg-red' : 'bg-yellow'
                            }`}
                          />
                        )}
                      </Link>
                      <button
                        type="button"
                        onClick={() =>
                          setActiveDropdown((prev) => (prev === item.key ? null : item.key))
                        }
                        aria-expanded={isOpen}
                        aria-label={`Toggle ${item.label} submenu`}
                        className={`p-1.5 rounded transition-colors ${
                          isSolid
                            ? isActive || isOpen
                              ? 'text-red'
                              : 'text-ink hover:text-red'
                            : isActive || isOpen
                            ? 'text-yellow'
                            : 'text-white hover:text-yellow'
                        }`}
                      >
                        <ChevronDown
                          className={`w-4 h-4 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {/* Desktop Dropdown Panel */}
                    <div
                      className={`absolute top-full left-0 pt-2 transition-all duration-200 z-50 ${
                        isOpen
                          ? 'opacity-100 translate-y-0 pointer-events-auto'
                          : 'opacity-0 translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div className="w-80 bg-white rounded-[8px] shadow-2xl border border-line p-2 text-ink">
                        {/* Parent Page Overview Link */}
                        <Link
                          to={item.href}
                          onClick={() => setActiveDropdown(null)}
                          className="flex items-center justify-between p-2.5 rounded-[6px] bg-cream/70 hover:bg-yellow/20 text-black font-bold text-xs uppercase tracking-wide transition-colors mb-1.5 group"
                        >
                          <span className="group-hover:text-red transition-colors">{item.mainLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5 text-red group-hover:translate-x-1 transition-transform" />
                        </Link>

                        <div className="h-px bg-line/60 my-1" />

                        {/* Dropdown Child Links */}
                        <div className="space-y-0.5">
                          {item.dropdownItems.map((sub) => {
                            const IconComponent = sub.icon;
                            const isSubActive = location.pathname === sub.href;

                            return (
                              <Link
                                key={sub.href + sub.label}
                                to={sub.href}
                                onClick={() => setActiveDropdown(null)}
                                className={`flex items-start gap-3 p-2.5 rounded-[6px] transition-colors group ${
                                  isSubActive ? 'bg-cream text-red' : 'hover:bg-cream text-black'
                                }`}
                              >
                                <div className="p-1.5 rounded-[4px] bg-red-tint text-red group-hover:bg-red group-hover:text-white transition-colors shrink-0 mt-0.5">
                                  <IconComponent className="w-4 h-4" />
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-bold group-hover:text-red transition-colors leading-snug">
                                    {sub.label}
                                  </div>
                                  <div className="text-xs text-grey leading-tight mt-0.5 line-clamp-2">
                                    {sub.desc}
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative py-1 text-[15px] font-semibold transition-colors duration-150 ${
                    isSolid
                      ? isActive
                        ? 'text-red'
                        : 'text-ink hover:text-red'
                      : isActive
                      ? 'text-yellow'
                      : 'text-white hover:text-yellow'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[2.5px] rounded-full ${
                        isSolid ? 'bg-red' : 'bg-yellow'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-5">
            <a
              href={`tel:${content.company.phones[0].replace(/[^0-9+]/g, '')}`}
              className={`flex items-center gap-2 text-sm font-semibold transition-colors ${
                isSolid ? 'text-ink hover:text-red' : 'text-white hover:text-yellow'
              }`}
            >
              <Phone className="w-4 h-4 text-red" />
              <span>{content.company.phones[0]}</span>
            </a>

            <Link
              to="/quote"
              className="inline-flex items-center justify-center gap-2 bg-yellow hover:bg-yellow-gold text-black font-semibold text-sm px-5 py-2.5 rounded-[6px] shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group"
            >
              <span>Request a quote</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`lg:hidden min-w-[48px] min-h-[48px] flex items-center justify-center p-2.5 rounded-lg transition-transform active:scale-95 focus-visible:outline-none ${
              isSolid ? 'text-ink hover:bg-line/40' : 'text-white hover:bg-white/10'
            }`}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed inset-0 z-40 lg:hidden bg-red transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        style={{ top: '64px' }}
      >
        <div className="h-full flex flex-col justify-between p-6 bg-red overflow-y-auto">
          <nav className="flex flex-col gap-2 pt-4">
            {navItems.map((item, idx) => {
              const isActive =
                item.href === '/'
                  ? location.pathname === '/'
                  : location.pathname.startsWith(item.href);

              if (item.hasDropdown) {
                const isOpen = mobileDropdown[item.key];

                return (
                  <div key={item.key} className="border-b border-white/15 py-1">
                    <div className="flex items-center justify-between py-2">
                      <Link
                        to={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`text-2xl font-bold transition-transform ${
                          isActive ? 'text-yellow translate-x-2' : 'text-white'
                        }`}
                      >
                        {item.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => toggleMobileDropdown(item.key)}
                        className="min-w-[44px] min-h-[44px] flex items-center justify-center p-2 text-white/80 hover:text-white rounded-lg"
                        aria-expanded={!!isOpen}
                        aria-label={`Toggle ${item.label} sub-navigation`}
                      >
                        <ChevronDown
                          className={`w-6 h-6 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-yellow' : ''
                          }`}
                        />
                      </button>
                    </div>

                    {isOpen && (
                      <div className="pl-4 pb-3 flex flex-col gap-2.5 border-l-2 border-yellow/40 my-2">
                        <Link
                          to={item.href}
                          onClick={() => setMobileMenuOpen(false)}
                          className="text-yellow text-sm font-bold flex items-center gap-1.5 py-1"
                        >
                          <span>{item.mainLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        {item.dropdownItems.map((sub) => (
                          <Link
                            key={sub.href + sub.label}
                            to={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-white/90 hover:text-white text-sm font-medium py-1"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-2xl font-bold py-2 border-b border-white/15 transition-transform ${
                    isActive ? 'text-yellow translate-x-2' : 'text-white'
                  }`}
                  style={{ transitionDelay: `${idx * 30}ms` }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="pt-8 pb-12 flex flex-col gap-4 border-t border-white/20">
            <div className="text-white/80 text-sm">
              <p className="font-semibold text-white">Lagos Head Office</p>
              <p>{content.company.head_office}</p>
            </div>

            <a
              href={`tel:${content.company.phones[0].replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-3 text-white font-semibold text-base py-2"
            >
              <Phone className="w-5 h-5 text-yellow" />
              <span>{content.company.phones[0]}</span>
            </a>

            <Link
              to="/quote"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 bg-yellow text-black font-bold py-3.5 rounded-[6px] shadow-lg text-center"
            >
              <span>Request a quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
