/*
 * Lesson player — formatted lesson content, embedded film where relevant,
 * the real evaluation-area material, mark-complete, prev/next.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useParams, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COURSE } from "@/data/course";
import { PROGRESS_KEY, loadProgress } from "./Course";
import { ArrowLeft, ArrowRight, CheckCircle2, Play } from "lucide-react";

const STAGE_SUMMARY = [
  { name: "Spawning", sub: "Initiating Growth", d: "Laying the foundation — exploring, discovering, and building core skills with support and mentorship." },
  { name: "Fry", sub: "Emerging Growth", d: "Finding the flow — gaining independence and actively applying foundational skills." },
  { name: "Smolt", sub: "Sustained Growth", d: "Consistent, confident practice — adapting fluidly and culturally responsive every day." },
  { name: "Returning Adult", sub: "Thriving & Leading", d: "Mentoring, modelling, and leading — nurturing the growth of students and colleagues." },
];

export default function Lesson() {
  const params = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const idx = COURSE.lessons.findIndex((l) => l.slug === params.slug);
  const lesson = COURSE.lessons[idx];
  const [playing, setPlaying] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>(loadProgress);

  useEffect(() => {
    window.scrollTo(0, 0);
    setPlaying(false);
  }, [params.slug]);

  const next = COURSE.lessons[idx + 1];
  const prev = COURSE.lessons[idx - 1];
  const isDone = lesson ? !!done[lesson.slug] : false;

  const markDone = useMemo(
    () => () => {
      if (!lesson) return;
      const n = { ...loadProgress(), [lesson.slug]: true };
      try {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(n));
      } catch {}
      setDone(n);
      if (next) navigate(`/lessons/${next.slug}`);
      else navigate("/course");
    },
    [lesson, next, navigate]
  );

  if (!lesson) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "var(--section-main)" }}>
        <Navbar />
        <div className="container pt-40 pb-20 text-center" style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-body)" }}>
          Lesson not found. <Link href="/course"><span className="underline cursor-pointer">Back to the course</span></Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--section-main)" }}>
      <Navbar />

      {/* Lesson header */}
      <section className="pt-32 pb-12" style={{ background: "oklch(0.15 0.012 260)" }}>
        <div className="container">
          <Link href="/course">
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest mb-6 cursor-pointer hover:opacity-80" style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.80 0.006 95)", letterSpacing: "0.14em" }}>
              <ArrowLeft size={13} /> The SALMON Course
            </span>
          </Link>
          <div className="text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.66 0.18 30)", letterSpacing: "0.2em" }}>
            {lesson.eyebrow} · {lesson.minutes} min
          </div>
          <h1 className="m-0 max-w-4xl" style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.6rem)", letterSpacing: "-0.02em", lineHeight: 1.05, color: "oklch(0.985 0.002 95)" }}>
            {lesson.title}
          </h1>
        </div>
      </section>

      <section className="py-14 flex-1">
        <div className="container" style={{ maxWidth: 880 }}>
          {/* Intro */}
          <p className="text-lg leading-relaxed mb-10" style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-heading)", fontWeight: 450 }}>
            {lesson.intro}
          </p>

          {/* Film */}
          {lesson.video && (
            <figure className="m-0 mb-12" style={{ border: "1px solid var(--card-border)" }}>
              <div className="relative aspect-video overflow-hidden">
                {playing ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${lesson.video}?autoplay=1`}
                    title={lesson.title}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ display: "block", border: 0 }}
                  />
                ) : (
                  <button type="button" onClick={() => setPlaying(true)} aria-label="Play film" className="group block w-full h-full relative cursor-pointer" style={{ border: 0, padding: 0, background: "none" }}>
                    <img src={`https://i.ytimg.com/vi/${lesson.video}/maxresdefault.jpg`} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" loading="lazy" />
                    <span className="absolute inset-0" style={{ background: "linear-gradient(to top, oklch(0.13 0.012 260 / 0.5), transparent 55%)" }} />
                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110" style={{ width: 68, height: 68, background: "oklch(0.60 0.19 30 / 0.95)", boxShadow: "0 8px 30px oklch(0 0 0 / 0.35)" }}>
                      <Play size={24} fill="white" color="white" style={{ marginLeft: 3 }} />
                    </span>
                  </button>
                )}
              </div>
              <figcaption className="px-4 py-3 text-xs" style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-muted)", background: "var(--card-bg)" }}>
                Watch before you read — the lesson lands differently once you've seen the place.
              </figcaption>
            </figure>
          )}

          {/* Lifecycle lesson: the four stages */}
          {lesson.slug === "the-lifecycle" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12">
              {STAGE_SUMMARY.map((s, i) => (
                <div key={s.name} className="p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                  <div className="text-xs uppercase tracking-widest mb-1" style={{ fontFamily: "'Inter', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.14em" }}>
                    Stage {i + 1} · {s.sub}
                  </div>
                  <div className="text-xl mb-2" style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: "var(--text-heading)" }}>{s.name}</div>
                  <p className="m-0 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-body)" }}>{s.d}</p>
                </div>
              ))}
            </div>
          )}

          {/* Method steps */}
          {"steps" in lesson && Array.isArray((lesson as any).steps) && (
            <div className="flex flex-col gap-4 mb-12">
              {(lesson as any).steps.map((s: string, i: number) => {
                const [head, ...rest] = s.split(":");
                return (
                  <div key={i} className="flex gap-5 p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                    <span className="shrink-0 flex items-center justify-center w-10 h-10" style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, color: "var(--crimson-mid)", background: "oklch(from var(--crimson-mid) l c h / 0.1)" }}>
                      {i + 1}
                    </span>
                    <div>
                      <div className="mb-1" style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, color: "var(--text-heading)" }}>{head.trim()}</div>
                      <p className="m-0 text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-body)" }}>{rest.join(":").trim()}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Evaluation areas */}
          {lesson.areas.map((area: any) => (
            <div key={area.title} className="mb-10">
              <h2 className="mb-3" style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 700, fontSize: "1.35rem", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>
                {area.title}
              </h2>
              {area.description && (
                <p className="text-[15px] leading-relaxed mb-5" style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-body)" }}>
                  {area.description}
                </p>
              )}
              {area.questions.length > 0 && (
                <div className="p-6" style={{ background: "var(--card-bg)", borderLeft: "3px solid var(--crimson-mid)", border: "1px solid var(--card-border)", borderLeftWidth: 3, borderLeftColor: "var(--crimson-mid)" }}>
                  <div className="text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'Inter', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.14em" }}>
                    Guiding reflection questions
                  </div>
                  <ol className="m-0 pl-5 flex flex-col gap-2.5">
                    {area.questions.map((q: string, i: number) => (
                      <li key={i} className="text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-body)" }}>{q}</li>
                    ))}
                  </ol>
                </div>
              )}
            </div>
          ))}

          {/* Complete / nav */}
          <div className="mt-14 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            {prev ? (
              <Link href={`/lessons/${prev.slug}`}>
                <span className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold cursor-pointer transition-opacity hover:opacity-80" style={{ fontFamily: "'Inter', sans-serif", border: "1px solid var(--card-border)", color: "var(--text-body)" }}>
                  <ArrowLeft size={15} /> {prev.eyebrow}
                </span>
              </Link>
            ) : <span />}
            <button
              type="button"
              onClick={markDone}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold cursor-pointer transition-opacity hover:opacity-90"
              style={{ fontFamily: "'Inter', sans-serif", background: "var(--crimson-mid)", color: "white", border: 0, letterSpacing: "0.03em" }}
            >
              <CheckCircle2 size={16} /> {isDone ? "Completed" : "Mark complete"}{next ? " · next lesson" : " · finish course"} <ArrowRight size={15} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
