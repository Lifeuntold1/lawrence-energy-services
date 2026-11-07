import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import content from '../data/content.json';

export default function LegalTerms() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-ink pt-16 sm:pt-20 lg:pt-24 pb-28 lg:pb-16">
      <section className="bg-cream border-b border-line py-10 sm:py-14">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <span className="text-xs font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
            Legal Information
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-black mt-3 tracking-tight">
            Terms of Service
          </h1>
          <p className="text-sm text-grey mt-2">
            Last updated: November 2026. Lawrence Energy Services Limited (LESL).
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 space-y-8 text-sm sm:text-base text-grey leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-black mb-3">1. Scope of Services</h2>
            <p>
              Lawrence Energy Services Limited ("LESL") provides industrial electrical and mechanical engineering, equipment procurement, testing, and commissioning services across Nigeria and West Africa. All commercial quotations, site assessments, and engineering deliverables are subject to individual written contracts signed by authorized corporate officers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-3">2. Quotations and Proposals</h2>
            <p>
              Informational inquiries submitted via {content.company.website} or email do not constitute binding engineering contracts until formalized in a mutually agreed Service Level Agreement or Engineering Procurement and Construction (EPC) agreement.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-3">3. Intellectual Property and Technical Drawings</h2>
            <p>
              All single-line diagrams, isometric designs, testing certifications, and technical literature furnished on this website or in project briefs remain the exclusive proprietary property of LESL and its respective equipment manufacturing partners.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-3">4. Health, Safety, and Compliance</h2>
            <p>
              LESL operates strictly under Nigerian and international industrial safety regulations, enforcing zero-tolerance lost-time injury standards on all client jobsites.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-3">5. Governing Law</h2>
            <p>
              These terms are governed by and construed in accordance with the laws of the Federal Republic of Nigeria. For questions regarding our commercial terms, please write to {content.company.email}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
