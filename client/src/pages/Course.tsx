/*
 * The SALMON Course — overview with progress and lesson cards.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COURSE } from "@/data/course";
import { ArrowRight, CheckCircle2, Circle, Clock } from "lucide-react";

export const PROGRESS_KEY = "salmon-course-progress-v1";

export function loadProgress(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
  } catch {
    return {};
  }
}

export default function Course() {
  const [done, setDone] = useState<Record<string, boolean>>(loadProgress);

  useEffect(() => {
    window.scrollTo(0, 0);
    setDone(loadProgress());
  }, []);

  const total = COURSE.lessons.length;
  const completed = COURSE.lessons.filter((l) => done[l.slug]).length;
  const pct = Math.round((completed / total) * 100);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--section-main)" }}>
      <Navbar />

      {/* Header on dark */}
      <section className="pt-32 pb-14" style={{ background: "oklch(0.15 0.012 260)" }}>
        <div className="container">
          <div
            className="text-xs uppercase tracking-widest mb-4"
            style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.66 0.18 30)", letterSpacing: "0.2em" }}
          >
            The SALMON Course
          </div>
          <h1
            className="m-0 mb-5 max-w-3xl"
            style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: "clamp(2.4rem, 6vw, 4.2rem)", letterSpacing: "-0.02em", lineHeight: 1.02, color: "oklch(0.985 0.002 95)" }}
          >
            Learn the framework,<br />lesson by lesson
          </h1>
          <p className="max-w-2xl text-base leading-relaxed m-0 mb-8" style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.84 0.005 95)" }}>
            Six short lessons walk you through SALMON — where it comes from, how the lifecycle
            stages work, and what every evaluation area asks of educators and administrators.
            Your progress stays on this device.
          </p>

          {/* progress */}
          <div className="flex items-center gap-4 max-w-md">
            <div className="flex-1 h-2 overflow-hidden" style={{ background: "oklch(0.985 0.002 95 / 0.14)" }}>
              <div className="h-full transition-all duration-500" style={{ width: `${pct}%`, background: "oklch(0.60 0.19 30)" }} />
            </div>
            <span className="text-sm shrink-0" style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.88 0.004 95)" }}>
              {completed} of {total} complete
            </span>
          </div>
        </div>
      </section>

      {/* Lessons */}
      <section className="py-16 flex-1">
        <div className="container">
          <div className="flex flex-col gap-4">
            {COURSE.lessons.map((lesson, i) => {
              const isDone = !!done[lesson.slug];
              return (
                <Link key={lesson.slug} href={`/lessons/${lesson.slug}`}>
                  <span
                    className="group flex items-center gap-5 p-6 md:p-7 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                    style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", boxShadow: "0 1px 3px oklch(0 0 0 / 0.05)" }}
                  >
                    <span
                      className="hidden sm:flex items-center justify-center shrink-0 w-12 h-12"
                      style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: "1.2rem", color: isDone ? "white" : "var(--crimson-mid)", background: isDone ? "var(--crimson-mid)" : "oklch(from var(--crimson-mid) l c h / 0.1)" }}
                    >
                      {i + 1}
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-muted)", letterSpacing: "0.12em" }}>
                        {lesson.eyebrow} · <Clock size={11} style={{ display: "inline", verticalAlign: "-1px" }} /> {lesson.minutes} min
                      </span>
                      <span className="block text-lg md:text-xl leading-snug" style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: "var(--text-heading)", letterSpacing: "-0.01em" }}>
                        {lesson.title}
                      </span>
                    </span>
                    <span className="shrink-0 flex items-center gap-3">
                      {isDone ? (
                        <CheckCircle2 size={22} style={{ color: "var(--crimson-mid)" }} />
                      ) : (
                        <Circle size={22} style={{ color: "var(--card-border)" }} />
                      )}
                      <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" style={{ color: "var(--crimson-mid)" }} />
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5" style={{ background: "oklch(0.16 0.012 260)" }}>
            <p className="m-0 text-base max-w-xl" style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.92 0.004 95)" }}>
              Prefer the document itself? Read all 24 pages of the tool, or open the Reflection
              Library and start writing.
            </p>
            <span className="flex gap-3 shrink-0">
              <Link href="/tool">
                <span className="inline-flex px-5 py-3 text-sm font-semibold cursor-pointer transition-opacity hover:opacity-90" style={{ fontFamily: "'Inter', sans-serif", background: "oklch(0.60 0.19 30)", color: "white" }}>Read the Tool</span>
              </Link>
              <Link href="/reflect">
                <span className="inline-flex px-5 py-3 text-sm font-semibold cursor-pointer transition-opacity hover:opacity-80" style={{ fontFamily: "'Inter', sans-serif", border: "1px solid oklch(0.985 0.002 95 / 0.35)", color: "oklch(0.985 0.002 95)" }}>Reflect</span>
              </Link>
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
