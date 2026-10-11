// COO Branding: Accordion with warm tones, red accent on open
// Fonts: DM Sans titles, Source Serif 4 body

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  title: string;
  content: React.ReactNode;
}

interface FntAccordionProps {
  items: AccordionItem[];
  bordered?: boolean;
}

export default function FntAccordion({ items, bordered = true }: FntAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="overflow-hidden"
      style={{
        border: bordered ? "1px solid #d4cfc6" : "none",
        borderRadius: "2px",
      }}
    >
      {items.map((item, index) => (
        <div
          key={index}
          style={{
            borderBottom: index < items.length - 1 ? "1px solid #d4cfc6" : "none",
          }}
        >
          <button
            onClick={() => toggle(index)}
            className="w-full flex justify-between items-center px-4 sm:px-6 py-4 sm:py-[18px] border-none text-left cursor-pointer transition-colors"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              backgroundColor: openIndex === index ? "#fdfcf9" : "#ffffff",
            }}
            onMouseEnter={(e) => {
              if (openIndex !== index) e.currentTarget.style.backgroundColor = "#f8f6f2";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = openIndex === index ? "#fdfcf9" : "#ffffff";
            }}
          >
            <span
              className="font-semibold text-[15px] sm:text-[17px] pr-2"
              style={{ color: openIndex === index ? "#9B2335" : "#1a1a18" }}
            >
              {item.title}
            </span>
            <ChevronDown
              className="shrink-0 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200"
              style={{
                transform: openIndex === index ? "rotate(180deg)" : "rotate(0deg)",
                color: openIndex === index ? "#9B2335" : "#3d3d39",
              }}
            />
          </button>
          {openIndex === index && (
            <div
              className="px-4 sm:px-6 py-3 sm:py-4 pb-4 sm:pb-5 text-[14px] sm:text-[16px]"
              style={{
                borderTop: "1px solid #d4cfc6",
                fontFamily: "'Source Serif 4', serif",
                lineHeight: 1.75,
                color: "#3d3d39",
                backgroundColor: "#fdfcf9",
              }}
            >
              {item.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
