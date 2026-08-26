"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/lib/schema";

// The exact same `faqs` array is passed to faqPageSchema() server-side (see the
// item page), so the visible accordion and the FAQPage JSON-LD can never drift apart.
export function FaqSection({ faqs }: { faqs: FAQ[] }) {
  if (faqs.length === 0) return null;

  return (
    <Accordion.Root type="single" collapsible className="flex flex-col gap-3">
      {faqs.map((faq, i) => (
        <Accordion.Item
          key={i}
          value={`faq-${i}`}
          className="rounded-xl overflow-hidden"
          style={{ background: "#101018", border: "1px solid #22222f" }}
        >
          <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 p-4 text-left font-semibold" style={{ color: "#f4f4f8" }}>
            {faq.question}
            <ChevronDown size={18} aria-hidden className="flex-shrink-0 transition-transform group-data-[state=open]:rotate-180" style={{ color: "#3b82f6" }} />
          </Accordion.Trigger>
          <Accordion.Content className="px-4 pb-4 text-sm leading-relaxed" style={{ color: "#92929f" }}>
            {faq.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
