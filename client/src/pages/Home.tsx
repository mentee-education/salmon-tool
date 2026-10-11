/*
 * Home Page — "From the River" edition (2026-10)
 * The page leads with the real place: Jason's film of Seabird Island Community School,
 * the printed tool itself, and films made with the community.
 * Sections: Film hero, SALMON acronym, Cycle diagram + Stage cards, Inside the Tool,
 * Films from the Community, Process Steps, CTA
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ChevronDown, Play, X, FileText } from "lucide-react";

const EGGS_IMG = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/salmon-eggs.png";
const FRY_IMG = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/salmon-fry.png";
const SMOLT_IMG = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/salmon-smolt.png";
const ADULT_IMG = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/salmon-adult.png";

const TOOL_PDF = "/SALMON-Tool.pdf";

/* Films — all shot at or about Seabird Island. The first two are Mentee's own. */
const films = [
  {
    id: "EP5b48Weyrc",
    title: "Seabird Island Community School",
    credit: "Film by Jason Bruce",
    note: "The school where SALMON was created — classrooms, land, and language in one place.",
    featured: true,
  },
  {
    id: "H3yrPfDtOWQ",
    title: "FOR OUR CULTURE",
    credit: "N'we Jinan Artists, recorded at Seabird Island Community School",
    note: "Students wrote and performed this anthem about carrying their culture forward.",
    featured: false,
  },
  {
    id: "GezZfWg4Irc",
    title: "A:yelexw Center for Hope and Healing",
    credit: "Film by Jason Bruce",
    note: "Healing and nurturing are community work — the same values SALMON brings to evaluation.",
    featured: false,
  },
];

const stages = [
  {
    number: "01",
    name: "Spawning",
    subtitle: "Initiating Growth",
    description:
      "The very beginning of a teacher's growth journey. Like salmon eggs full of potential, teachers in this stage are laying the foundation for future development — exploring, discovering, and building core skills.",
    image: EGGS_IMG,
  },
  {
    number: "02",
    name: "Fry",
    subtitle: "Emerging Growth",
    description:
      "Teachers are starting to find their flow. Like young salmon navigating a stream, they are gaining independence and actively applying the foundational skills they've developed.",
    image: FRY_IMG,
  },
  {
    number: "03",
    name: "Smolt",
    subtitle: "Sustained Growth",
    description:
      "Consistent and sustained growth. Teachers confidently apply their skills, adapt fluidly to diverse classroom needs, and are culturally responsive in their daily practices.",
    image: SMOLT_IMG,
  },
  {
    number: "04",
    name: "Returning Adult",
    subtitle: "Thriving & Leading",
    description:
      "Teachers who are thriving in their roles and leading within their school and community — mentors, role models, and leaders who nurture the growth of students and colleagues.",
    image: ADULT_IMG,
  },
];

const processSteps = [
  {
    num: "1",
    title: "Forming the Community Committee",
    body: "We formed a community advisory group, including the Stó:lō Education Committee, to guide the process and ground the project in local values and relational accountability.",
  },
  {
    num: "2",
    title: "Environmental Scan",
    body: "With committee guidance, we reviewed local documents — policies, evaluation tools, websites, and strategic plans — to understand current practices and surface key themes.",
  },
  {
    num: "3",
    title: "Community Interviews",
    body: "Using scan findings, we developed culturally grounded interview guides, then held focus groups with over 20 educators and staff to understand what matters in evaluation.",
  },
  {
    num: "4",
    title: "Co-Creation of the SALMON Tool",
    body: "Community insights were synthesized into a strengths-based framework for teacher evaluation, built in close collaboration with those who contributed to its vision.",
  },
];

const acronym = [
  { letter: "S", word: "Seabird" },
  { letter: "A", word: "Assessment for" },
  { letter: "L", word: "Learning," },
  { letter: "M", word: "Mentorship &" },
  { letter: "O", word: "Ongoing" },
  { letter: "N", word: "Nurturing" },
];

/* Booklet spreads shown as physical pages */
const spreads = [
  { src: "/booklet/page-01.png", alt: "SALMON tool cover with Stó:lō formline salmon print", rotate: -2.5 },
  { src: "/booklet/page-12.png", alt: "Worksheet page: Communication & Collaboration with Families, with self-evaluation, administrator feedback and coactive goal-setting columns", rotate: 1.5 },
  { src: "/booklet/page-07.png", alt: "Page showing Seabird Island Community School and its carved welcome figures", rotate: 3 },
];

function thumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
function thumbMax(id: string) {
  return `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
}

/* Click-to-play video facade: poster + play button, swaps to the real iframe on demand. */
function FilmCard({ film, large }: { film: (typeof films)[number]; large?: boolean }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="m-0" style={{ border: "1px solid var(--card-border)", background: "var(--card-bg)" }}>
      <div className="relative aspect-video overflow-hidden">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${film.id}?autoplay=1`}
            title={film.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: "block", border: 0 }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`Play: ${film.title}`}
            className="group block w-full h-full relative cursor-pointer"
            style={{ border: 0, padding: 0, background: "none" }}
          >
            <img
              src={thumbMax(film.id)}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = thumb(film.id); }}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <span
              className="absolute inset-0"
              style={{ background: "linear-gradient(to top, oklch(0.18 0.06 15 / 0.55), transparent 55%)" }}
            />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110"
              style={{
                width: large ? 76 : 56,
                height: large ? 76 : 56,
                background: "oklch(0.42 0.15 15 / 0.92)",
                boxShadow: "0 8px 30px oklch(0 0 0 / 0.35)",
              }}
            >
              <Play size={large ? 28 : 20} fill="white" color="white" style={{ marginLeft: 3 }} />
            </span>
          </button>
        )}
      </div>
      <figcaption className="px-5 py-4">
        <div
          className={large ? "text-xl mb-1" : "text-base mb-1"}
          style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, color: "var(--text-heading)" }}
        >
          {film.title}
        </div>
        <div
          className="text-xs mb-1.5"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.04em" }}
        >
          {film.credit}
        </div>
        <p className="text-sm leading-relaxed m-0" style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}>
          {film.note}
        </p>
      </figcaption>
    </figure>
  );
}

/* Reflection prompts per stage, in the tool's own three-part rhythm:
   notice (self-evaluation) → ask (feedback) → set (coactive goal). */
const reflections: Record<string, { notice: string; ask: string; set: string }> = {
  Spawning: {
    notice: "What part of your practice feels newest right now, and what support would help it take root?",
    ask: "Who at your school could you invite to observe one lesson and tell you one thing that's working?",
    set: "Name one foundational skill to practise deliberately for the next month.",
  },
  Fry: {
    notice: "Where are you starting to act without a script — and where do you still reach for one?",
    ask: "What feedback have you been avoiding asking for, and who could give it kindly?",
    set: "Choose one routine to make fully your own this term, and decide how you'll know it worked.",
  },
  Smolt: {
    notice: "How does your teaching adapt when a learner, a family, or the community asks something new of it?",
    ask: "Which colleague sees a side of your practice you don't — and when will you ask them about it?",
    set: "Pick one way to make your classroom more culturally responsive, and set a date to reflect on it.",
  },
  "Returning Adult": {
    notice: "Who is growing because of you — and who could be?",
    ask: "What do newer teachers ask you for, and what does that tell you about your strengths?",
    set: "Commit to one act of mentorship this term: a door held open, a lesson shared, a teacher nurtured.",
  },
};

function StageReflector() {
  const [active, setActive] = useState<string>("Spawning");
  const r = reflections[active];
  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6" role="tablist" aria-label="Choose your stage">
        {stages.map((s) => (
          <button
            key={s.name}
            type="button"
            role="tab"
            aria-selected={active === s.name}
            onClick={() => setActive(s.name)}
            className="px-4 py-2.5 text-sm transition-all duration-150 cursor-pointer"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              letterSpacing: "0.04em",
              background: active === s.name ? "var(--crimson-mid)" : "transparent",
              color: active === s.name ? "oklch(0.97 0.01 80)" : "var(--crimson-mid)",
              border: "1px solid oklch(from var(--crimson-mid) l c h / 0.5)",
            }}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: "Notice", sub: "Self-evaluation", text: r.notice },
          { label: "Ask", sub: "Feedback", text: r.ask },
          { label: "Set", sub: "Coactive goal-setting", text: r.set },
        ].map((col) => (
          <div key={col.label} className="p-5" style={{ border: "1px solid var(--card-border)" }}>
            <div
              className="text-xs uppercase tracking-widest mb-0.5"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.15em" }}
            >
              {col.label}
            </div>
            <div className="text-xs mb-3" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-muted)" }}>
              {col.sub}
            </div>
            <p className="text-sm leading-relaxed m-0" style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}>
              {col.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const revealRef = useRef<HTMLDivElement>(null);
  const [heroFilm, setHeroFilm] = useState(false);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.08 }
    );
    el.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!heroFilm) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setHeroFilm(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [heroFilm]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--section-main)" }}>
      <Navbar />

      {/* ── HERO — the real school, full bleed ── */}
      <section className="relative overflow-hidden" style={{ background: "oklch(0.20 0.08 15)" }}>
        {/* Film still of Seabird Island Community School (Jason Bruce's film) */}
        <div className="absolute inset-0">
          <img
            src={thumbMax("EP5b48Weyrc")}
            alt=""
            className="w-full h-full object-cover"
            style={{ opacity: 0.45 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(100deg, oklch(0.20 0.09 15 / 0.96) 0%, oklch(0.20 0.09 15 / 0.82) 45%, oklch(0.20 0.09 15 / 0.35) 100%)",
            }}
          />
        </div>

        {/* Formline border strip on right edge — from the printed tool */}
        <div
          className="absolute top-0 right-0 bottom-0 w-8 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(
              to bottom,
              oklch(0.42 0.12 15) 0px, oklch(0.42 0.12 15) 8px,
              oklch(0.28 0.10 15) 8px, oklch(0.28 0.10 15) 16px
            )`,
            opacity: 0.7,
          }}
        />

        <div className="container relative z-10">
          <div className="flex flex-col justify-center min-h-[92vh] max-w-3xl py-28">
            <div
              className="text-xs uppercase tracking-widest mb-5"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.78 0.07 70)", letterSpacing: "0.22em" }}
            >
              An Evaluation Tool for Educational Leaders
            </div>

            <div
              className="mb-3"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(4rem, 10vw, 7.5rem)",
                fontWeight: 700,
                color: "oklch(0.97 0.01 80)",
                lineHeight: 0.9,
                letterSpacing: "0.02em",
              }}
            >
              SALMON:
            </div>
            <h1
              className="mb-7"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                fontWeight: 400,
                color: "oklch(0.92 0.02 80)",
                lineHeight: 1.3,
              }}
            >
              Seabird Assessment for Learning,<br />
              Mentorship, and Ongoing Nurturing
            </h1>

            <p
              className="text-base leading-relaxed mb-10 max-w-lg"
              style={{ fontFamily: "'Lora', serif", color: "oklch(0.82 0.03 80)" }}
            >
              A teacher evaluation model created with the Stó:lō Education Committee at
              Seabird Island Community School — grounded in relational accountability,
              community voice, and the life of the river behind it.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setHeroFilm(true)}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:opacity-90 cursor-pointer"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  background: "oklch(0.55 0.18 15)",
                  color: "oklch(0.97 0.01 80)",
                  letterSpacing: "0.06em",
                  border: 0,
                }}
              >
                <Play size={15} fill="currentColor" /> Watch the school's film
              </button>
              <a
                href="#inside-the-tool"
                className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:opacity-80"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  border: "1px solid oklch(0.97 0.01 80 / 0.45)",
                  color: "oklch(0.97 0.01 80)",
                  letterSpacing: "0.06em",
                }}
              >
                See inside the tool
              </a>
            </div>

            <div
              className="mt-10 text-xs"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.75 0.03 80)", letterSpacing: "0.04em" }}
            >
              Seabird Island Band territory, Fraser Valley, British Columbia
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown size={20} style={{ color: "oklch(0.97 0.01 80 / 0.5)" }} />
        </div>
      </section>

      {/* Hero film lightbox */}
      {heroFilm && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-10"
          style={{ background: "oklch(0.12 0.04 15 / 0.92)" }}
          onClick={() => setHeroFilm(false)}
          role="dialog"
          aria-label="Seabird Island Community School film"
        >
          <button
            type="button"
            onClick={() => setHeroFilm(false)}
            aria-label="Close film"
            className="absolute top-5 right-5 flex items-center justify-center w-11 h-11 rounded-full cursor-pointer"
            style={{ background: "oklch(0.97 0.01 80 / 0.12)", border: "1px solid oklch(0.97 0.01 80 / 0.3)", color: "oklch(0.97 0.01 80)" }}
          >
            <X size={20} />
          </button>
          <div className="w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <iframe
              src="https://www.youtube.com/embed/EP5b48Weyrc?autoplay=1"
              title="Seabird Island Community School — film by Jason Bruce"
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: "block", border: 0, boxShadow: "0 30px 90px oklch(0 0 0 / 0.6)" }}
            />
          </div>
        </div>
      )}

      <div ref={revealRef}>
        {/* ── ACRONYM BREAKDOWN ── */}
        <section className="py-16" style={{ background: "var(--section-alt)" }}>
          <div className="container">
            <div className="reveal mb-10">
              <div
                className="text-xs uppercase tracking-widest mb-3"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}
              >
                The Framework
              </div>
              <h2
                className="leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                  fontWeight: 400,
                  color: "var(--text-heading)",
                }}
              >
                What does <em style={{ color: "var(--crimson-mid)" }}>SALMON</em> stand for?
              </h2>
            </div>

            <div className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px" style={{ background: "oklch(from var(--crimson-mid) l c h / 0.12)" }}>
              {acronym.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center py-6 px-3 gap-2"
                  style={{ background: "var(--card-bg)", transitionDelay: `${i * 60}ms` }}
                >
                  <span
                    className="text-4xl leading-none"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "var(--crimson-mid)" }}
                  >
                    {item.letter}
                  </span>
                  <span
                    className="text-xs leading-snug font-medium"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-body)", letterSpacing: "0.03em" }}
                  >
                    {item.word}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FOUR STAGES — stage cards ── */}
        <section className="py-24" style={{ background: "var(--section-main)" }}>
          <div className="container">
            <div className="reveal mb-12">
              <div
                className="text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}
              >
                The Lifecycle
              </div>
              <h2
                className="leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 400,
                  color: "var(--text-heading)",
                }}
              >
                Four Stages of the SALMON Model
              </h2>
              <p
                className="mt-4 max-w-xl text-base leading-relaxed"
                style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
              >
                Just as the salmon journeys through distinct phases of life, educators move through
                stages of growth — each one building on the last, in a continuous cycle of learning.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {stages.map((stage, i) => (
                <div
                  key={i}
                  className="reveal group relative overflow-hidden"
                  style={{ transitionDelay: `${i * 100}ms`, border: "1px solid var(--card-border)" }}
                >
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={stage.image}
                      alt={stage.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, var(--card-bg) 0%, transparent 60%)" }}
                    />
                    <div
                      className="absolute top-3 right-4 text-5xl leading-none"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 300, color: "oklch(0.97 0.01 80 / 0.25)" }}
                    >
                      {stage.number}
                    </div>
                  </div>
                  <div className="p-6" style={{ background: "var(--card-bg)" }}>
                    <div
                      className="text-xs uppercase tracking-widest mb-1.5"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.15em" }}
                    >
                      {stage.subtitle}
                    </div>
                    <h3
                      className="text-2xl mb-2.5"
                      style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "var(--text-heading)" }}
                    >
                      {stage.name}
                    </h3>
                    <p className="text-sm leading-relaxed" style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}>
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* ── WHERE ARE YOU IN THE CYCLE? — interactive reflector ── */}
            <div className="reveal mt-14 p-7 md:p-10" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
              <div
                className="text-xs uppercase tracking-widest mb-2"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}
              >
                Try it
              </div>
              <h3
                className="mb-2"
                style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, fontSize: "clamp(1.5rem, 3vw, 2.1rem)", color: "var(--text-heading)" }}
              >
                Where are you in the cycle?
              </h3>
              <p className="text-sm leading-relaxed mb-6 max-w-2xl" style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}>
                Pick the stage that feels most like your practice right now. The questions are in the
                same spirit as the tool's own reflection pages — answer them honestly, then bring them
                to a conversation, not a verdict.
              </p>
              <StageReflector />
            </div>

            <div className="reveal mt-10 text-center">
              <Link href="/journey">
                <span
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm transition-all duration-200 hover:opacity-80"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid oklch(from var(--crimson-mid) l c h / 0.5)",
                    color: "var(--crimson-mid)",
                    letterSpacing: "0.06em",
                  }}
                >
                  Explore the Full Journey <ArrowRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── INSIDE THE TOOL — the real printed booklet ── */}
        <section id="inside-the-tool" className="py-24" style={{ background: "oklch(0.22 0.09 15)" }}>
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
              <div className="lg:col-span-2">
                <div className="reveal">
                  <div
                    className="text-xs uppercase tracking-widest mb-4"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.72 0.07 70)", letterSpacing: "0.2em" }}
                  >
                    Inside the Tool
                  </div>
                  <h2
                    className="leading-tight mb-6"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 400,
                      color: "oklch(0.97 0.01 80)",
                    }}
                  >
                    A real, working document — not a concept
                  </h2>
                  <p className="text-base leading-relaxed mb-5" style={{ fontFamily: "'Lora', serif", color: "oklch(0.84 0.03 80)" }}>
                    Twenty-four pages educators actually write in. Every evaluation area pairs
                    guiding reflection questions with three columns: self-evaluation,
                    administrator feedback, and coactive goal-setting — so growth is a
                    conversation, never a verdict.
                  </p>
                  <p className="text-base leading-relaxed mb-8" style={{ fontFamily: "'Lora', serif", color: "oklch(0.84 0.03 80)" }}>
                    The artwork running through it is Stó:lō formline salmon — the same
                    lifecycle the framework follows.
                  </p>
                  <a
                    href={TOOL_PDF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:opacity-90"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: "oklch(0.55 0.18 15)",
                      color: "oklch(0.97 0.01 80)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    <FileText size={15} /> Open the SALMON Tool (PDF)
                  </a>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="reveal flex items-center justify-center gap-0 py-6" style={{ minHeight: 380 }}>
                  {spreads.map((s, i) => (
                    <img
                      key={i}
                      src={s.src}
                      alt={s.alt}
                      loading="lazy"
                      className="block"
                      style={{
                        width: "32%",
                        maxWidth: 260,
                        transform: `rotate(${s.rotate}deg) translateY(${i === 1 ? -14 : 6}px)`,
                        marginLeft: i === 0 ? 0 : "-4%",
                        boxShadow: "0 24px 60px oklch(0 0 0 / 0.45), 0 2px 10px oklch(0 0 0 / 0.3)",
                        border: "1px solid oklch(0.97 0.01 80 / 0.12)",
                        zIndex: i === 1 ? 2 : 1,
                        position: "relative",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── FILMS FROM THE COMMUNITY ── */}
        <section className="py-24" style={{ background: "var(--section-alt)" }}>
          <div className="container">
            <div className="reveal mb-12">
              <div
                className="text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}
              >
                Films from the Community
              </div>
              <h2
                className="leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 400,
                  color: "var(--text-heading)",
                }}
              >
                The people and place behind the framework
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}>
                SALMON wasn't written about a community — it was written with one. These films
                show the school, the students, and the values that shape every page.
              </p>
            </div>

            <div className="reveal mb-6">
              <FilmCard film={films[0]} large />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {films.slice(1).map((f) => (
                <div key={f.id} className="reveal">
                  <FilmCard film={f} />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PROCESS STEPS ── */}
        <section className="py-24" style={{ background: "var(--section-main)" }}>
          <div className="container">
            <div className="reveal mb-14">
              <div
                className="text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}
              >
                How It Was Built
              </div>
              <h2
                className="leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 400,
                  color: "var(--text-heading)",
                }}
              >
                A Community-Led Process
              </h2>
              <p className="mt-4 max-w-xl text-base leading-relaxed" style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}>
                The SALMON Tool was not designed in isolation. Every step of its development
                was guided by the voices, knowledge, and values of the Stó:lō community.
              </p>
            </div>

            <div className="relative">
              <div
                className="absolute left-6 top-0 bottom-0 w-px hidden md:block"
                style={{ background: "linear-gradient(to bottom, oklch(from var(--crimson-mid) l c h / 0.5), transparent)" }}
              />
              <div className="flex flex-col gap-8">
                {processSteps.map((step, i) => (
                  <div key={i} className="reveal md:pl-20 relative" style={{ transitionDelay: `${i * 120}ms` }}>
                    <div
                      className="hidden md:flex absolute left-0 top-0 w-12 h-12 items-center justify-center text-sm font-medium"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        background: "var(--section-main)",
                        border: "1px solid oklch(from var(--crimson-mid) l c h / 0.5)",
                        color: "var(--crimson-mid)",
                        borderRadius: "50%",
                      }}
                    >
                      {step.num}
                    </div>
                    <div className="p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                      <div
                        className="text-xs uppercase tracking-widest mb-2 md:hidden"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.15em" }}
                      >
                        Step {step.num}
                      </div>
                      <h3
                        className="text-xl mb-2"
                        style={{ fontFamily: "'Cormorant Garamond', serif", fontWeight: 500, color: "var(--text-heading)" }}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm leading-relaxed" style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="reveal mt-10">
              <Link href="/process">
                <span
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm transition-all duration-200 hover:opacity-80"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid oklch(from var(--crimson-mid) l c h / 0.5)",
                    color: "var(--crimson-mid)",
                    letterSpacing: "0.06em",
                  }}
                >
                  Read the Full Process <ArrowRight size={15} />
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA SECTION ── */}
        <section className="py-24 relative overflow-hidden" style={{ background: "var(--section-alt)" }}>
          <div className="crimson-rule mb-0" />
          <div className="container py-16 text-center">
            <div className="reveal max-w-2xl mx-auto">
              <h2
                className="mb-6 leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  fontWeight: 300,
                  color: "var(--text-heading)",
                }}
              >
                Ready to explore the{" "}
                <em style={{ color: "var(--primary)", fontStyle: "italic" }}>SALMON</em> framework?
              </h2>
              <p className="text-base leading-relaxed mb-10" style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}>
                Download the evaluation tool and see how the SALMON framework can support
                culturally responsive educator growth in your community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href={TOOL_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 text-sm font-medium transition-all duration-200 hover:opacity-90"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "var(--primary)",
                    color: "oklch(0.97 0.01 80)",
                    letterSpacing: "0.06em",
                  }}
                >
                  Download the SALMON Tool (PDF)
                </a>
                <Link href="/process">
                  <span
                    className="inline-flex items-center gap-2 px-8 py-4 text-sm transition-all duration-200 hover:opacity-80"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      border: "1px solid oklch(from var(--crimson-mid) l c h / 0.4)",
                      color: "var(--text-heading)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Learn About the Process
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
