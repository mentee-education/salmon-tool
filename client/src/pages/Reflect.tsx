/*
 * Reflect — the SALMON Reflection Library.
 * All ten evaluation areas with the tool's real guiding questions,
 * a personal note space per area (saved locally), and print support.
 */
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { REFLECTION_GROUPS } from "@/data/reflections";
import { BookOpen, ChevronDown, Printer } from "lucide-react";

const STORAGE_KEY = "salmon-reflections-v1";

function loadNotes(): Record<string, string> {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function Reflect() {
  const [open, setOpen] = useState<string | null>(REFLECTION_GROUPS[0].areas[0].title);
  const [notes, setNotes] = useState<Record<string, string>>(loadNotes);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    } catch {}
  }, [notes]);

  const totalAreas = useMemo(() => REFLECTION_GROUPS.reduce((n, g) => n + g.areas.length, 0), []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--section-main)" }}>
      <SiteHeader />

      <section className="pt-14 sm:pt-20 pb-12" style={{ background: "var(--section-alt)" }}>
        <div className="container">
          <div
            className="text-xs uppercase tracking-widest mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}
          >
            The Reflection Library
          </div>
          <h1
            className="m-0 mb-5"
            style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(2.4rem, 6vw, 4.5rem)", letterSpacing: "-0.02em", lineHeight: 1.02, color: "var(--text-heading)" }}
          >
            The guiding questions,<br />
            <em style={{ color: "var(--crimson-mid)" }}>ready for a conversation</em>
          </h1>
          <p className="max-w-2xl text-base leading-relaxed m-0" style={{ fontFamily: "'Source Serif 4', serif", color: "var(--text-body)" }}>
            The {totalAreas} areas of the SALMON tool, with the exact reflection questions educators and administrators work through together. Each area grew out of the four themes educators named in the research. Notes you type stay on this device; print them for a growth conversation.
          </p>
          <div className="flex flex-wrap gap-3 mt-7 print:hidden">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 hover:opacity-90 cursor-pointer"
              style={{ fontFamily: "'DM Sans', sans-serif", background: "var(--crimson-mid)", color: "white", border: 0, letterSpacing: "0.04em" }}
            >
              <Printer size={15} /> Print my reflections
            </button>
            <Link href="/tool">
              <span
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold transition-all duration-200 hover:opacity-80 cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif", border: "1px solid oklch(from var(--crimson-mid) l c h / 0.5)", color: "var(--crimson-mid)", letterSpacing: "0.04em" }}
              >
                <BookOpen size={15} /> Read the full tool
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-14 flex-1">
        <div className="container">
          {REFLECTION_GROUPS.map((group) => (
            <div key={group.group} className="mb-12">
              <h2
                className="mb-5"
                style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.2rem, 2.4vw, 1.6rem)", letterSpacing: "-0.01em", color: "var(--text-heading)" }}
              >
                {group.group}
              </h2>
              <div className="flex flex-col gap-3">
                {group.areas.map((area) => {
                  const isOpen = open === area.title;
                  return (
                    <div key={area.title} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : area.title)}
                        aria-expanded={isOpen}
                        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left cursor-pointer"
                        style={{ background: "none", border: 0 }}
                      >
                        <span style={{ fontFamily: "'Source Serif 4', serif", fontWeight: 600, fontSize: "1rem", color: "var(--text-heading)" }}>
                          {area.title}
                        </span>
                        <span className="flex items-center gap-3 shrink-0">
                          <span className="hidden sm:inline text-xs" style={{ fontFamily: "'Source Serif 4', serif", color: "var(--text-muted)" }}>
                            Tool p.{area.page}
                          </span>
                          <ChevronDown
                            size={18}
                            style={{ color: "var(--crimson-mid)", transform: isOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}
                          />
                        </span>
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6">
                          <ol className="m-0 mb-5 pl-5 flex flex-col gap-3">
                            {area.questions.map((q, i) => (
                              <li key={i} className="text-[15px] leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif", color: "var(--text-body)" }}>
                                {q}
                              </li>
                            ))}
                          </ol>
                          <label className="block">
                            <span className="block text-xs uppercase tracking-widest mb-2" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.14em" }}>
                              My notes
                            </span>
                            <textarea
                              value={notes[area.title] || ""}
                              onChange={(e) => setNotes((n) => ({ ...n, [area.title]: e.target.value }))}
                              rows={3}
                              placeholder="What comes up for you? Notes stay on this device only."
                              className="w-full p-3 text-sm leading-relaxed"
                              style={{ fontFamily: "'Source Serif 4', serif", border: "1px solid var(--card-border)", background: "var(--section-main)", color: "var(--text-heading)", resize: "vertical" }}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          <div className="p-7 text-center" style={{ background: "#171412" }}>
            <p className="m-0 mb-4 text-base" style={{ fontFamily: "'Source Serif 4', serif", color: "#fdfcf9" }}>
              In the tool itself, every area pairs these questions with three columns:
              self-evaluation, administrator feedback, and coactive goal-setting.
            </p>
            <Link href="/tool">
              <span
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold transition-all duration-200 hover:opacity-90 cursor-pointer"
                style={{ fontFamily: "'DM Sans', sans-serif", background: "#9B2335", color: "white", letterSpacing: "0.04em" }}
              >
                <BookOpen size={15} /> See the pages
              </span>
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
