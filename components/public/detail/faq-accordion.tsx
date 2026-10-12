"use client";

import { useState } from "react";
import type { FaqItem } from "@/lib/validation/internship-content";

export function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="border-t border-navy">
      {faqs.map((faq, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={faq.q} className="border-b border-border">
            <button
              type="button"
              className="accordion-btn"
              aria-expanded={isOpen}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{faq.q}</span>
              <span className="flex-none text-[22px] font-medium text-accent">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <p className="anim-menu m-0 py-0 pr-12 pb-6 text-ui leading-[1.65] text-body">
                {faq.a}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
