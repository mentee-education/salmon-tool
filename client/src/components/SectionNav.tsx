/*
 * Sticky section navigation for the one-page site: logo mark left, section anchors left-aligned beside it,
 * scroll-spy highlight, PDF download right. On narrow screens the anchors scroll sideways in a second row.
 */
import { useEffect, useRef, useState } from "react";
import { R2_BASE } from "@/data/committee";

export const SECTIONS = [
  { id: "committee", label: "Committee" },
  { id: "process", label: "Process" },
  { id: "findings", label: "Findings" },
  { id: "cycle", label: "Growth cycle" },
  { id: "tool", label: "The tool" },
  { id: "questions", label: "Questions" },
  { id: "films", label: "Films" },
  { id: "materials", label: "Materials" },
  { id: "learn", label: "Learn more" },
];

const RED = "#9B2335";

export default function SectionNav() {
  const [active, setActive] = useState<string>("");
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const y = window.scrollY + 140;
      let current = "";
      for (const el of els) if (el.offsetTop <= y) current = el.id;
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    const link = rowRef.current?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (link && rowRef.current && window.innerWidth < 1024) {
      const row = rowRef.current;
      row.scrollTo({ left: link.offsetLeft - 16, behavior: "smooth" });
    }
  }, [active]);

  const linkStyle = (on: boolean): React.CSSProperties => ({
    fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.72rem", fontWeight: 600, letterSpacing: "0.08em",
    textTransform: "uppercase", whiteSpace: "nowrap", textDecoration: "none", color: on ? RED : "#3d3d39",
    borderBottom: `2px solid ${on ? RED : "transparent"}`, paddingBottom: 3,
  });

  return (
    <header className="sticky top-0 z-[900]" style={{ background: "rgba(253,252,249,0.97)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderBottom: "1px solid #e2ddd5" }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[1000] focus:px-3 focus:py-2" style={{ background: "#fff", color: RED }}>Skip to content</a>
      <div className="mx-auto flex items-center gap-6 px-4 sm:px-6" style={{ maxWidth: 1280, height: 64 }}>
        <a href="#top" className="flex items-center gap-2.5 shrink-0 no-underline" aria-label="SALMON, back to top">
          <img src={`${R2_BASE}/brand/salmon-mark.png`} alt="" width={40} height={40} style={{ width: 40, height: 40, borderRadius: "50%", boxShadow: "0 0 0 1px #e2ddd5" }} />
          <span className="flex flex-col" style={{ lineHeight: 1.05 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.2rem", color: RED, letterSpacing: "0.02em" }}>SALMON</span>
            <span className="hidden sm:inline" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "#5f5f58", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 3 }}>Seabird Island Community School</span>
          </span>
        </a>
        <nav aria-label="Sections" className="hidden xl:flex items-center gap-5 flex-1">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined} style={linkStyle(active === s.id)}>{s.label}</a>
          ))}
        </nav>
        <a href="/SALMON-Tool.pdf" target="_blank" rel="noopener noreferrer" className="ml-auto shrink-0 no-underline" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", background: RED, color: "#fff", padding: "9px 14px" }}>
          Download PDF
        </a>
      </div>
      <div ref={rowRef} className="xl:hidden overflow-x-auto" style={{ borderTop: "1px solid #ece7de", scrollbarWidth: "none" }}>
        <nav aria-label="Sections" className="flex items-center gap-5 px-4 sm:px-6 py-2.5" style={{ minWidth: "max-content" }}>
          {SECTIONS.map((s) => (
            <a key={s.id} data-id={s.id} href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined} style={linkStyle(active === s.id)}>{s.label}</a>
          ))}
        </nav>
      </div>
    </header>
  );
}
