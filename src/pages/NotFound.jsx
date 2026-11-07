import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowRight, Home, Wrench, Image, Phone } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="bg-white text-ink min-h-[80vh] flex items-center justify-center pt-28 pb-20">
      <div className="max-w-xl mx-auto px-5 text-center space-y-6">
        <div className="w-16 h-16 bg-red-tint text-red rounded-full flex items-center justify-center mx-auto shadow-sm">
          <Zap className="w-8 h-8 fill-red" />
        </div>

        <span className="text-xs font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
          Error 404
        </span>

        <h1 className="text-4xl sm:text-5xl font-extrabold text-black tracking-tight">
          Page Not Found
        </h1>

        <p className="text-base text-grey leading-relaxed">
          Oops. We cannot find the page you requested. It may have moved or been renamed. Use the links below to return to our main sections.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <Link
            to="/"
            className="flex flex-col items-center gap-2 p-3 rounded-[6px] border border-line bg-cream hover:border-red transition-colors text-xs font-bold text-black"
          >
            <Home className="w-4 h-4 text-red" />
            <span>Home</span>
          </Link>

          <Link
            to="/services"
            className="flex flex-col items-center gap-2 p-3 rounded-[6px] border border-line bg-cream hover:border-red transition-colors text-xs font-bold text-black"
          >
            <Wrench className="w-4 h-4 text-red" />
            <span>Services</span>
          </Link>

          <Link
            to="/projects"
            className="flex flex-col items-center gap-2 p-3 rounded-[6px] border border-line bg-cream hover:border-red transition-colors text-xs font-bold text-black"
          >
            <Image className="w-4 h-4 text-red" />
            <span>Projects</span>
          </Link>

          <Link
            to="/contact"
            className="flex flex-col items-center gap-2 p-3 rounded-[6px] border border-line bg-cream hover:border-red transition-colors text-xs font-bold text-black"
          >
            <Phone className="w-4 h-4 text-red" />
            <span>Contact</span>
          </Link>
        </div>

        <div className="pt-4">
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-yellow hover:bg-yellow-gold text-black font-bold text-sm px-8 py-3.5 rounded-[6px] shadow transition-transform hover:-translate-y-0.5"
          >
            <span>Request a quote</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </Link>
        </div>
      </div>
    </div>
  );
}
