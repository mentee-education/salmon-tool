/*
 * Section navigation for the one-page site. Wide screens (1100px and up): logo lockup, six primary anchors
 * with room to breathe, a "More" disclosure for the rest, and a quiet PDF link. The bar compacts on scroll.
 * Narrower screens: a Menu button opens a full-height panel listing every section (focus trapped, Esc closes).
 * Menus stay left aligned.
 */
import { useEffect, useRef, useState } from "react";
import { R2_BASE } from "@/data/committee";

export const PRIMARY = [
  { id: "committee", label: "The Committee" },
  { id: "process", label: "How It Was Built" },
  { id: "findings", label: "What We Found" },
  { id: "tool", label: "The Tool" },
  { id: "films", label: "Films" },
  { id: "materials", label: "Research Materials" },
];
export const MORE = [
  { id: "cycle", label: "Growth Cycle" },
  { id: "questions", label: "Guiding Questions" },
  { id: "faq", label: "About the Research" },
  { id: "learn", label: "Learn More" },
];
// page order, for scroll-spy and the full menu (Title Case everywhere in navigation)
export const SECTIONS = [
  { id: "films", label: "Films" }, { id: "committee", label: "The Committee" }, { id: "process", label: "How It Was Built" },
  { id: "findings", label: "What We Found" }, { id: "cycle", label: "Growth Cycle" }, { id: "tool", label: "The Tool" },
  { id: "questions", label: "Guiding Questions" }, { id: "materials", label: "Research Materials" }, { id: "faq", label: "About the Research" },
  { id: "learn", label: "Learn More" },
];

const RED = "#9B2335";
const INK = "#1a1a18";

export default function SectionNav() {
  const [active, setActive] = useState("");
  const [compact, setCompact] = useState(false);
  const [progress, setProgress] = useState(0);
  const [more, setMore] = useState(false);
  const [menu, setMenu] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const menuBtn = useRef<HTMLButtonElement>(null);
  const opened = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      setCompact(window.scrollY > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      const y = window.scrollY + 140;
      let current = "";
      for (const s of SECTIONS) { const el = document.getElementById(s.id); if (el && el.offsetTop <= y) current = s.id; }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  useEffect(() => {
    if (!more) return;
    const click = (e: MouseEvent) => { if (!moreRef.current?.contains(e.target as Node)) setMore(false); };
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setMore(false); };
    document.addEventListener("mousedown", click); document.addEventListener("keydown", key);
    return () => { document.removeEventListener("mousedown", click); document.removeEventListener("keydown", key); };
  }, [more]);

  useEffect(() => {
    if (!menu) { if (opened.current) menuBtn.current?.focus(); return; }
    opened.current = true;
    const panel = panelRef.current;
    const focusables = () => Array.from(panel?.querySelectorAll<HTMLElement>("a, button") ?? []);
    focusables()[0]?.focus();
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setMenu(false); return; }
      if (e.key !== "Tab") return;
      const f = focusables(); if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("keydown", key); document.body.style.overflow = ""; };
  }, [menu]);

  const link = (on: boolean): React.CSSProperties => ({
    fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: 15, fontWeight: 500, letterSpacing: "0.005em",
    whiteSpace: "nowrap", textDecoration: "none", color: on ? RED : "#2b2b28", paddingBottom: 5,
  });
  const moreActive = MORE.some((m) => m.id === active);

  return (
    <header className="sticky top-0 z-[900]" style={{ background: compact ? "rgba(255,255,255,0.92)" : "#ffffff", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)", borderBottom: "1px solid #e6e0d6", boxShadow: compact ? "0 6px 24px rgba(29,23,20,0.08)" : "none", transition: "box-shadow .3s ease" }}>
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-[1000] focus:px-3 focus:py-2" style={{ background: "#fff", color: RED }}>Skip to content</a>
      <div className="mx-auto flex items-center px-5 sm:px-8" style={{ maxWidth: 1320, height: compact ? 60 : 72, transition: "height .3s ease" }}>
        <a href="#top" className="flex items-center gap-3 shrink-0 no-underline mr-10" aria-label="SALMON, back to top">
          <img src={`${R2_BASE}/brand/salmon-mark.png`} alt="" width={40} height={40} style={{ width: 40, height: 40, borderRadius: "50%", boxShadow: "0 0 0 1px #e2ddd5" }} />
          <span className="flex flex-col" style={{ lineHeight: 1.05 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.2rem", color: RED, letterSpacing: "0.03em" }}>SALMON</span>
            <span className="hidden sm:inline" style={{ fontFamily: "'Source Serif 4', serif", fontStyle: "italic", fontSize: "0.72rem", color: "#5f5f58", marginTop: 2 }}>Seabird Island</span>
          </span>
        </a>

        <nav aria-label="Sections" className="hidden min-[1100px]:flex items-center gap-7 flex-1">
          {PRIMARY.map((s) => (
            <a key={s.id} href={`#${s.id}`} aria-current={active === s.id ? "true" : undefined} className="nav-link" style={link(active === s.id)}>{s.label}</a>
          ))}
          <div ref={moreRef} className="relative">
            <button type="button" aria-expanded={more} aria-controls="nav-more" onClick={() => setMore((v) => !v)} className="nav-link cursor-pointer inline-flex items-center gap-1.5" data-active={moreActive ? "true" : undefined} style={{ ...link(moreActive), background: "none", border: 0 }}>
              More <span aria-hidden="true" style={{ display: "inline-block", transform: more ? "rotate(180deg)" : "none", transition: "transform .2s" }}>&#9662;</span>
            </button>
            {more && (
              <ul id="nav-more" className="absolute left-0 list-none m-0 p-2" style={{ top: "calc(100% + 12px)", minWidth: 230, background: "#fffdf8", border: "1px solid #e2ddd5", boxShadow: "0 16px 40px rgba(29,23,20,0.12)" }}>
                {MORE.map((m) => (
                  <li key={m.id}><a href={`#${m.id}`} onClick={() => setMore(false)} className="hv block px-4 py-3 no-underline" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: INK }}><span className="hv-title">{m.label}</span></a></li>
                ))}
              </ul>
            )}
          </div>
        </nav>



        <button ref={menuBtn} type="button" aria-expanded={menu} aria-controls="nav-panel" onClick={() => setMenu(true)} className="min-[1100px]:hidden ml-auto inline-flex items-center gap-2.5 cursor-pointer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: INK, background: "none", border: 0, padding: "12px 4px" }}>
          <span aria-hidden="true" className="flex flex-col gap-[5px]"><span style={{ width: 22, height: 2, background: INK }} /><span style={{ width: 22, height: 2, background: INK }} /><span style={{ width: 14, height: 2, background: INK }} /></span>
          Menu
        </button>
      </div>

      <span aria-hidden="true" className="absolute left-0 bottom-0 h-[2px] w-full origin-left" style={{ background: RED, transform: `scaleX(${progress})` }} />

      {menu && (
        <div id="nav-panel" ref={panelRef} role="dialog" aria-modal="true" aria-label="Sections" className="fixed inset-0 z-[1000] overflow-y-auto" style={{ background: "#fdfcf9" }}>
          <div className="flex items-center justify-between px-5 sm:px-8" style={{ height: 72, borderBottom: "1px solid #e2ddd5" }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.2rem", color: RED }}>SALMON</span>
            <button type="button" onClick={() => setMenu(false)} className="cursor-pointer" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: INK, background: "none", border: 0, padding: "12px 4px" }}>Close <span aria-hidden="true">&#10005;</span></button>
          </div>
          <nav aria-label="All sections" className="px-5 sm:px-8 py-6">
            <ol className="list-none m-0 p-0">
              {[{ id: "top", label: "Overview" }, ...SECTIONS].map((s, i) => (
                <li key={s.id} style={{ borderTop: i ? "1px solid #e6dfd3" : undefined }}>
                  <a href={`#${s.id}`} onClick={() => setMenu(false)} className="hv flex items-baseline gap-4 py-4 no-underline">
                    <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: RED, width: 22 }}>{String(i).padStart(2, "0")}</span>
                    <span className="hv-title" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 26, color: active === s.id ? RED : INK }}>{s.label}</span>
                  </a>
                </li>
              ))}
            </ol>

          </nav>
        </div>
      )}
    </header>
  );
}
