import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, ArrowUpRight, ShieldCheck, Scale } from 'lucide-react';
import content from '../data/content.json';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-28 lg:pb-12 border-t border-white/10" aria-label="Footer">
      <div className="max-w-container mx-auto px-5 lg:px-10">
        {/* Main Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          {/* Column 1: Brand & Description */}
          <div className="lg:col-span-4 flex flex-col gap-5">
            <Link to="/" className="inline-block" aria-label="LESL Home">
              <img
                src={`/${content.brand.logo_on_dark}`}
                alt="LESL Logo"
                width="140"
                height="40"
                style={{ aspectRatio: '140 / 40' }}
                className="h-10 w-[140px] max-w-full object-contain shrink-0"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              {content.company.what_we_are}. Delivering power plants, gas generators, factory systems, and mechanical installations across Nigeria and West Africa.
            </p>
          </div>

          {/* Column 2: Company Navigation */}
          <div className="lg:col-span-2">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-yellow mb-5">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="text-white/75 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-white/75 hover:text-white transition-colors">
                  All Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-white/75 hover:text-white transition-colors">
                  Our Projects
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-white/75 hover:text-white transition-colors">
                  Visual Gallery
                </Link>
              </li>
              <li>
                <Link to="/partners" className="text-white/75 hover:text-white transition-colors">
                  Clients &amp; Partners
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/75 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-white/75 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-yellow mb-5">Services</h3>
            <ul className="space-y-2.5 text-sm">
              {content.services.map((svc) => (
                <li key={svc.slug}>
                  <Link
                    to={`/services/${svc.slug}`}
                    className="text-white/75 hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{svc.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-white/30 group-hover:text-yellow transition-colors" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact & Office */}
          <div className="lg:col-span-3 flex flex-col gap-4 text-sm">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-yellow mb-1">Head Office</h3>
            
            <a
              href="https://maps.google.com/?q=70+Opebi+Road,+Ikeja,+Lagos,+Nigeria"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 text-white/80 hover:text-yellow transition-colors group cursor-pointer"
              title="Open office address in Google Maps"
            >
              <MapPin className="w-4 h-4 text-red shrink-0 mt-1 group-hover:text-yellow transition-colors" />
              <span>{content.company.head_office}</span>
            </a>

            <div className="flex flex-col gap-1.5 pt-1">
              {content.company.phones.map((phone) => (
                <a
                  key={phone}
                  href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
                  className="flex items-center gap-3 text-white/80 hover:text-yellow transition-colors group"
                  title={`Call ${phone}`}
                >
                  <Phone className="w-4 h-4 text-red shrink-0 group-hover:text-yellow transition-colors" />
                  <span>{phone}</span>
                </a>
              ))}
            </div>

            <a
              href={`mailto:${content.company.email}`}
              className="flex items-center gap-3 text-white/80 hover:text-yellow transition-colors group cursor-pointer"
              title="Send an email to LESL"
            >
              <Mail className="w-4 h-4 text-red shrink-0 group-hover:text-yellow transition-colors" />
              <span>{content.company.email}</span>
            </a>

            <div className="flex items-start gap-3 text-white/80 text-xs pt-1">
              <Clock className="w-4 h-4 text-yellow shrink-0 mt-0.5" />
              <div>
                <p>{content.company.hours}</p>
                <p className="text-yellow/90 mt-0.5 font-medium">Replies within 24 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Legal Section */}
        <div className="py-6 border-b border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-white/80">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4 text-yellow shrink-0" />
            <span className="font-bold text-white/90 uppercase tracking-wider font-mono">Legal &amp; Regulatory Compliance:</span>
          </div>
          <div className="flex flex-wrap items-center gap-6 text-white/85">
            <Link to="/legal/terms" className="hover:text-yellow transition-colors font-medium">
              Terms of Service
            </Link>
            <span className="text-white/20">&bull;</span>
            <Link to="/legal/privacy" className="hover:text-yellow transition-colors font-medium">
              Privacy Policy
            </Link>
            <span className="text-white/20">&bull;</span>
            <span className="text-white/75">NEMSA Standards Compliant</span>
          </div>
        </div>

        {/* Bottom Sub-bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/80">
          <div>
            &copy; {new Date().getFullYear()} {content.company.name}. All rights reserved.
          </div>

          <div className="text-yellow font-semibold tracking-wider font-mono">
            {content.company.tagline}
          </div>
        </div>
      </div>
    </footer>
  );
}
