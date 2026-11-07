import React, { useEffect } from 'react';
import content from '../data/content.json';

export default function LegalPrivacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-white text-ink pt-16 sm:pt-20 lg:pt-24 pb-28 lg:pb-16">
      <section className="bg-cream border-b border-line py-10 sm:py-14">
        <div className="max-w-container mx-auto px-5 lg:px-10">
          <span className="text-xs font-bold uppercase tracking-widest text-red bg-red-tint px-3 py-1 rounded-[4px]">
            Privacy &amp; Data Protection
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-black mt-3 tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-sm text-grey mt-2">
            Nigeria Data Protection Act (NDPA) Compliant. Last updated: November 2026.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-3xl mx-auto px-5 lg:px-8 space-y-8 text-sm sm:text-base text-grey leading-relaxed">
          <div>
            <h2 className="text-xl font-bold text-black mb-3">1. Information We Collect</h2>
            <p>
              When you submit a quote request, schedule a technical consultation, or contact Lawrence Energy Services Limited, we collect your name, business email, telephone number, corporate entity name, and project specifications.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-3">2. How We Use Your Data</h2>
            <p>
              We process submitted data exclusively for technical communication, project quotation preparation, site inspection coordination, and business correspondence. We never sell, lease, or monetize your contact information.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-3">3. Data Security and Confidentiality</h2>
            <p>
              Engineering files, site coordinates, single-line diagrams, and corporate contact details are stored securely. Access is strictly limited to LESL engineering and project estimation personnel.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-3">4. Cookies and Web Analytics</h2>
            <p>
              Our website uses basic operational mechanisms strictly for site navigation performance and session continuity.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-black mb-3">5. Contact Our Compliance Desk</h2>
            <p>
              If you have inquiries regarding how your data is handled or wish to update your records, contact our Legal &amp; Compliance Department at {content.company.email} or by post at {content.company.head_office}.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
