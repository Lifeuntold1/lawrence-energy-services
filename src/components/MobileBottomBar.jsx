import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, MessageCircle, FileText } from 'lucide-react';
import content from '../data/content.json';

export default function MobileBottomBar() {
  const whatsappUrl = `https://wa.me/${content.company.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20LESL%20Engineering,%20I%20would%20like%20to%20inquire%20about%20your%20services.`;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-xl border-t border-line pt-2.5 pb-[max(0.65rem,env(safe-area-inset-bottom))] px-3 shadow-[0_-6px_25px_rgba(0,0,0,0.12)] flex items-center gap-2 select-none"
      aria-label="Quick Actions"
    >
      <a
        href={`tel:${content.company.phones[0].replace(/[^0-9+]/g, '')}`}
        className="flex-1 flex items-center justify-center gap-2 h-12 border border-ink/20 bg-cream/70 text-ink font-bold text-[13px] rounded-lg transition-transform active:scale-95 cursor-pointer shadow-xs"
        aria-label="Call LESL Engineering"
      >
        <Phone className="w-4 h-4 text-red shrink-0" />
        <span>Call</span>
      </a>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-2 h-12 border border-emerald-600/30 bg-emerald-50 text-emerald-800 font-bold text-[13px] rounded-lg transition-transform active:scale-95 cursor-pointer shadow-xs"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
        <span>WhatsApp</span>
      </a>

      <Link
        to="/quote"
        className="flex-[1.25] flex items-center justify-center gap-2 h-12 bg-yellow hover:bg-yellow-gold active:bg-yellow-gold text-black font-extrabold text-[13px] rounded-lg shadow-sm transition-transform active:scale-95 cursor-pointer"
        aria-label="Request a Quote"
      >
        <FileText className="w-4 h-4 text-black shrink-0" />
        <span>Request Quote</span>
      </Link>
    </div>
  );
}
