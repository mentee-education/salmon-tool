/*
 * Background sequence (adjacent sections never share a background; only two dark bands):
 *   hero (headline + school film)                        PARCH2 #efe4d0
 *   research in brief (question, definition, numbers)    OX    #3a0c14   dark band 1
 *   films (tone: song + educator's words)                 WARM
 *   committee                                             PARCH #f3ece0
 *   who did what                                          WARM
 *   process (interlude band inside: WARM)                 PARCH
 *   photographs                                           SLATE #dde3df
 *   findings                                              WARM
 *   growth cycle                                          PARCH
 *   the tool                                              DEEP  #5d131e   dark band 2
 *   guiding questions                                     PARCH
 *   research materials                                    SLATE
 *   about the research (FAQ)                              WARM
 *   school band (photo beside words)                      PARCH
 *   learn more                                            LTINT #faf2f1
 *   report                                                WARM
 *   footer                                                OX #3a0c14 (band one shade darker)
 */
/*
 * SALMON — the whole story on one page, in the editorial language of the original site
 * (warm white, crimson, Playfair Display / Source Serif 4 / DM Sans, FadeIn reveals, film cards).
 * Order: question, numbers, committee, who did what, the five steps, findings, growth cycle, the tool,
 * guiding questions, films, research materials, FAQ, further learning, report.
 * Rules: no text on photos, images shown whole, all images on R2 (salmon-tool bucket).
 */
import { useEffect, useRef, useState } from "react";
import SectionNav from "@/components/SectionNav";
import SiteFooter from "@/components/SiteFooter";
import BackToTop from "@/components/BackToTop";
import FadeIn from "@/components/FadeIn";
import Lifecycle from "@/components/Lifecycle";
import Trail from "@/components/Trail";
import Materials from "@/components/Materials";
import People from "@/components/People";
import HeroFilm, { type HeroFilmHandle } from "@/components/HeroFilm";
import GuidingQuestions from "@/components/GuidingQuestions";
import { COMMITTEE, R2_BASE } from "@/data/committee";
import { glance, structure, participants, themes, areas, GUIDE, QUESTIONNAIRE, PHASES, CONSENT } from "@/data/research";
import { ChevronLeft, ChevronRight, Download, Play } from "lucide-react";

const RED = "#9B2335";
const DEEP = "#5d131e";
const INK = "#1a1a18";
const BODY = "#3d3d39";
const MUTED = "#5f5f58";
const WARM = "#fdfcf9";
const SAND = "#efeae1";
const RULE = "#d4cfc6";
const PINK = "#f0c4ca";
const INKBG = "#1d1714";
const SLATE = "#dde3df";
const TINT = "#f6dfe2";
const LTINT = "#faf2f1";
const PARCH2 = "#efe4d0";
const PARCH = "#f3ece0";
const OX = "#3a0c14";
const serif = "'Source Serif 4', serif";
const display = "'Playfair Display', serif";
const sans = "'DM Sans', sans-serif";

const RIVER = `${R2_BASE}/hero-river.png`;
const SCHOOL = `${R2_BASE}/site/hero.jpg`;
const PAGES = Array.from({ length: 24 }, (_, i) => `${R2_BASE}/site/booklet/p${String(i + 1).padStart(2, "0")}.jpg`);

const FINDINGS = [
  { n: "01", t: "Evaluation should nurture, not judge", d: "Educators asked for growth conversations instead of verdicts. SALMON answers with self-evaluation, feedback and goals set together." },
  { n: "02", t: "Culture belongs inside the criteria", d: "Stó:lō cultural responsiveness and Halq'eméylem integration are assessed areas in their own right, not an add-on paragraph." },
  { n: "03", t: "Accountability must run both ways", d: "Teachers evaluate how well administrators run the process, making SALMON reciprocal by design." },
  { n: "04", t: "Growth is a cycle, not a ladder", d: "The salmon lifecycle gives educators shared words for where they are, and honours returning, mentoring and beginning again." },
];

const FAQ = [
  { q: "What is SALMON?", a: "SALMON stands for Seabird Assessment for Learning, Mentorship and Ongoing Nurturing. It is a teacher evaluation and growth framework built with the Stó:lō Education Committee and the educators of Seabird Island Community School. It replaces verdict-style reviews with reflection, feedback and goals set together." },
  { q: "Who shaped it?", a: "Four respected Stó:lō educators on the Stó:lō Education Committee guided the work and reviewed the drafts. Nineteen educators and staff were interviewed one to one: ten teachers, seven educational assistants, the Halq'eméylem curriculum developer and the vice-principal. Families and Elders were part of the conversation too." },
  { q: "How were the findings reached?", a: "Interviews were transcribed and coded as they happened, the codes were mapped to see how ideas connected, and they were grouped into fourteen sub-themes and four themes. Each theme can be traced back to what people said." },
  { q: "Can another school use it?", a: "The framework belongs to Seabird Island Community School and reflects Stó:lō values. Other schools can read it, and download the tool, as an example of how a community can build evaluation around its own values." },
];

const LEARN = [
  { t: "First Peoples Principles of Learning", d: "FNESC's foundational principles: the teaching ground SALMON stands on.", href: "https://www.fnesc.ca/first-peoples-principles-of-learning/" },
  { t: "Learning First Peoples resources", d: "Classroom-ready guides and units from the First Nations Education Steering Committee.", href: "https://www.fnesc.ca/learningfirstpeoples/" },
  { t: "Halq'eméylem on FirstVoices", d: "Hear and learn the language woven through the tool and the school.", href: "https://www.firstvoices.com/halqemeylem" },
  { t: "First Peoples' Cultural Council", d: "B.C.'s Crown corporation supporting Indigenous languages, arts and culture.", href: "https://fpcc.ca/" },
  { t: "Knowledge Weavers Hub", d: "A national home for Indigenous education resources, lessons and stories from across Canada, from First Nations University of Canada.", href: "https://kwh.ca" },
  { t: "Seabird Island Band", d: "The community where SALMON was born.", href: "https://www.seabirdisland.ca/" },
];

/* ---------- shared pieces ---------- */

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="flex items-center gap-3 uppercase font-semibold m-0 mb-4" style={{ fontFamily: sans, fontSize: 12, letterSpacing: "0.2em", color: light ? PINK : RED }}>
      <span aria-hidden="true" style={{ display: "inline-block", width: 28, height: 2, background: light ? PINK : RED }} />
      {children}
    </p>
  );
}

function H2({ children, light = false, className = "" }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return <h2 className={`m-0 mb-4 ${className}`} style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 44px)", color: light ? "#ffffff" : INK, lineHeight: 1.12 }}>{children}</h2>;
}

function Lede({ children, light = false, className = "" }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return <p className={`m-0 max-w-[760px] ${className}`} style={{ fontFamily: serif, fontSize: "clamp(16px, 1.7vw, 18px)", color: light ? "rgba(255,255,255,0.9)" : BODY, lineHeight: 1.75 }}>{children}</p>;
}

function Section({ id, bg, children, className = "" }: { id?: string; bg: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`px-4 sm:px-6 py-16 sm:py-20 scroll-mt-24 ${className}`} style={{ backgroundColor: bg }}>
      <div className="max-w-[1180px] mx-auto">{children}</div>
    </section>
  );
}

/* Members who share one photo URL (a photo of them together) become one wide card with both names. */
function CommitteeGrid() {
  const cards: { members: typeof COMMITTEE; photo: string }[] = [];
  for (const m of COMMITTEE) {
    const last = cards[cards.length - 1];
    if (m.photo && last && last.photo === m.photo) last.members.push(m);
    else cards.push({ members: [m], photo: m.photo });
  }
  return (
    <ul className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((c, i) => {
        const pair = c.members.length > 1;
        return (
          <li key={c.members[0].name} className={`flex ${pair ? "sm:col-span-2" : ""}`}>
            <FadeIn delay={i * 0.06} className="flex w-full">
              <figure className="m-0 flex flex-col w-full" style={{ background: "#ffffff", border: `1px solid ${RULE}` }}>
                {c.photo ? (
                  <img src={c.photo} alt={`${c.members.map((m) => m.name).join(" and ")}${pair ? ", pictured together" : ""}`} width={889} height={768} loading="lazy" className="block w-full h-auto" />
                ) : (
                  <div className="flex-1 flex items-center justify-center" style={{ background: DEEP, minHeight: 220 }}>
                    <span aria-hidden="true" className="flex items-center justify-center" style={{ width: 112, height: 112, borderRadius: "50%", border: `1px solid ${PINK}`, fontFamily: display, fontWeight: 700, fontSize: 52, color: PINK }}>{c.members[0].name.charAt(0)}</span>
                  </div>
                )}
                <figcaption className={`p-5 grid gap-4 min-h-[104px] content-start ${pair ? "sm:grid-cols-2" : ""}`}>
                  {c.members.map((m) => (
                    <span key={m.name} className="block">
                      <span className="block mb-1" style={{ fontFamily: display, fontWeight: 700, fontSize: 19, color: INK, lineHeight: 1.3 }}>{m.name}</span>
                      <span className="block" style={{ fontFamily: serif, fontSize: 15, color: MUTED, lineHeight: 1.5 }}>{m.role}</span>
                    </span>
                  ))}
                </figcaption>
              </figure>
            </FadeIn>
          </li>
        );
      })}
    </ul>
  );
}

/* A participant's own words, from the research interviews (educators are not named). */
function Pull({ text, small = false, light = false }: { text: string; small?: boolean; light?: boolean }) {
  return (
    <figure className={small ? "m-0 mt-8" : "m-0 mb-16 mx-auto max-w-[860px] text-center"}>
      <blockquote className="m-0">
        <p className="m-0" style={{ fontFamily: display, fontStyle: "italic", fontWeight: 500, fontSize: small ? "clamp(19px, 1.8vw, 22px)" : "clamp(24px, 2.8vw, 34px)", color: light ? "rgba(255,255,255,0.9)" : small ? BODY : INK, lineHeight: 1.35 }}>
          <span aria-hidden="true" style={{ color: light ? PINK : RED }}>&ldquo;</span>{text}<span aria-hidden="true" style={{ color: light ? PINK : RED }}>&rdquo;</span>
        </p>
      </blockquote>
      <figcaption className={`mt-4 flex items-center gap-3 ${small ? "" : "justify-center"}`} style={{ fontFamily: sans, fontSize: 13, color: light ? "rgba(255,255,255,0.75)" : MUTED }}>
        <span aria-hidden="true" style={{ display: "inline-block", width: 28, height: 1, background: light ? PINK : RED }} />
        An educator at the school, interviewed for the research
      </figcaption>
    </figure>
  );
}

/* A row of steps joined by connectors that sit in their own grid columns (never over a box).
   Below the breakpoint the steps stack and the connectors point down between them. */
function Connector({ dir, light = false }: { dir: "right" | "down"; light?: boolean }) {
  return (
    <span aria-hidden="true" className="flex items-center justify-center" style={{ color: light ? PINK : RED }}>
      <svg width="28" height="28" viewBox="0 0 28 28" style={{ transform: dir === "down" ? "rotate(90deg)" : undefined }}>
        <path d="M4 14 H22 M16 8 L22 14 L16 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

function FlowRow<T>({ items, render, light = false, bp = "lg" }: { items: T[]; render: (item: T, i: number) => React.ReactNode; light?: boolean; bp?: "md" | "lg" }) {
  const cols = items.map(() => "minmax(0,1fr)").join(" 44px ");
  const wide = bp === "md" ? "hidden md:grid" : "hidden lg:grid";
  const narrow = bp === "md" ? "md:hidden" : "lg:hidden";
  return (
    <>
      <ol className={`list-none m-0 p-0 ${wide} items-stretch`} style={{ gridTemplateColumns: cols }}>
        {items.map((it, i) => (
          <li key={i} className="contents">
            <div className="flex">{render(it, i)}</div>
            {i < items.length - 1 && <Connector dir="right" light={light} />}
          </li>
        ))}
      </ol>
      <ol className={`list-none m-0 p-0 ${narrow} flex flex-col`}>
        {items.map((it, i) => (
          <li key={i} className="flex flex-col">
            <div className="flex">{render(it, i)}</div>
            {i < items.length - 1 && <div className="py-2"><Connector dir="down" light={light} /></div>}
          </li>
        ))}
      </ol>
    </>
  );
}

/* a progression whose panels deepen in tone, step by step */
const TONES = [
  { bg: PARCH, k: RED, t: INK },
  { bg: TINT, k: "#7d1b2a", t: INK },
  { bg: RED, k: "#ffe3e7", t: "#ffffff" },
  { bg: "#3a0c14", k: PINK, t: "#ffffff" },
];
function ToneStep({ k, t, tone, big, quote = false }: { k: string; t: string; tone: number; big?: string; quote?: boolean }) {
  const c = TONES[tone];
  return (
    <div className="hv-lift flex-1 p-6 flex flex-col" style={{ background: c.bg }}>
      {big && <span aria-hidden="true" style={{ fontFamily: display, fontWeight: 700, fontSize: 44, lineHeight: 1, color: c.k, marginBottom: 10 }}>{big}</span>}
      <p className="m-0 mb-2 uppercase" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: c.k }}>{k}</p>
      <p className="m-0" style={{ fontFamily: quote ? display : serif, fontStyle: quote ? "italic" : "normal", fontSize: quote ? 19 : 16.5, color: c.t, lineHeight: 1.5, fontWeight: tone >= 2 ? 600 : 400 }}>{t}</p>
    </div>
  );
}

/* A participant's words as an interlude between process steps: a deep oxblood band, a real school photo
   on the left (whole, thin frame, no text on it), the quote on the right with a hanging crimson mark. */
function Interlude({ text }: { text: string }) {
  return (
    <figure className="relative m-0 mb-16 left-1/2 -translate-x-1/2" style={{ width: "100vw", background: WARM, borderTop: `1px solid ${RULE}`, borderBottom: `1px solid ${RULE}` }}>
      <div className="mx-auto px-6 sm:px-10 py-14 sm:py-20 grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-10 md:gap-16 items-center" style={{ maxWidth: 1180 }}>
        <FadeIn>
          <div className="p-1.5" style={{ border: `1px solid ${RULE}`, background: "#ffffff" }}>
            <img src={`${R2_BASE}/site/booklet-photos/img-007-033.jpg`} alt="Carved figures outside the Seabird Island Community School building" width={2048} height={998} loading="lazy" className="block w-full h-auto" />
          </div>
        </FadeIn>
        <FadeIn delay={0.12}>
          <blockquote className="relative m-0 pl-8 sm:pl-10">
            <span aria-hidden="true" className="absolute select-none" style={{ left: 0, top: -26, fontFamily: display, fontSize: "clamp(90px, 9vw, 130px)", lineHeight: 1, color: RED }}>&ldquo;</span>
            <p className="m-0" style={{ fontFamily: display, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(26px, 3vw, 38px)", color: INK, lineHeight: 1.28 }}>{text}</p>
          </blockquote>
          <figcaption className="mt-7 pl-8 sm:pl-10 flex items-center gap-3" style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, letterSpacing: "0.14em", textTransform: "uppercase", color: MUTED }}>
            <span aria-hidden="true" style={{ display: "inline-block", width: 32, height: 2, background: RED }} />
            An educator at the school, interviewed for the research
          </figcaption>
        </FadeIn>
      </div>
    </figure>
  );
}

/* A numeral that counts up once when scrolled into view (shows the final value at once with reduced motion). */
function CountUp({ to, light = false }: { to: number; light?: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [n, setN] = useState(to);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const step = (now: number) => { const k = Math.min(1, (now - t0) / 900); setN(Math.round(to * (1 - Math.pow(1 - k, 3)))); if (k < 1) raf = requestAnimationFrame(step); };
      setN(0); raf = requestAnimationFrame(step);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [to]);
  return <span ref={ref} aria-hidden="true" className="block" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(44px, 4.4vw, 64px)", color: light ? PINK : RED, lineHeight: 1 }}>{n}</span>;
}

function StepHead({ n, title, lede }: { n: string; title: string; lede: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-5 sm:gap-8 items-start mb-8">
      <div aria-hidden="true" className="flex flex-col items-center">
        <span className="flex items-center justify-center" style={{ width: 64, height: 64, borderRadius: "50%", background: DEEP, color: "#fff", fontFamily: display, fontWeight: 800, fontSize: 24 }}>{n}</span>
      </div>
      <div>
        <p className="m-0 mb-1 uppercase" style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", color: RED }}>Step {n} of 05</p>
        <h3 className="m-0 mb-3" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(24px, 3vw, 34px)", color: INK, lineHeight: 1.15 }}>{title}</h3>
        <p className="m-0 max-w-[760px]" style={{ fontFamily: serif, fontSize: "clamp(15px, 1.6vw, 17px)", color: BODY, lineHeight: 1.75 }}>{lede}</p>
      </div>
    </div>
  );
}

function Strip({ items, dark }: { items: { k: string; t: string }[]; dark?: number }) {
  return (
    <ol className={`list-none m-0 p-0 grid grid-cols-1 ${items.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`} style={{ border: `1px solid ${RULE}`, background: "#ffffff" }}>
      {items.map((s, i) => (
        <li key={s.k} className={`p-6 border-[#d4cfc6] ${i ? "border-t md:border-t-0 md:border-l" : ""}`} style={{ background: dark === i ? DEEP : undefined }}>
          <p className="m-0 mb-2 uppercase" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: dark === i ? PINK : RED }}>{s.k}</p>
          <p className="m-0" style={{ fontFamily: serif, fontSize: 16, color: dark === i ? "#ffffff" : INK, lineHeight: 1.55, fontWeight: dark === i ? 600 : 400 }}>{s.t}</p>
        </li>
      ))}
    </ol>
  );
}

function Expand({ title, note, children, open = false }: { title: string; note?: string; children: React.ReactNode; open?: boolean }) {
  return (
    <details className="group" open={open} style={{ borderTop: `1px solid ${RULE}` }}>
      <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block" style={{ fontFamily: display, fontWeight: 700, fontSize: 20, color: INK, lineHeight: 1.3 }}>{title}</span>
          {note && <span className="block mt-1" style={{ fontFamily: serif, fontSize: 15, color: MUTED }}>{note}</span>}
        </span>
        <span aria-hidden="true" className="shrink-0 transition-transform duration-200 group-open:rotate-45" style={{ color: RED, fontSize: 26, lineHeight: 1 }}>+</span>
      </summary>
      <div className="pb-7">{children}</div>
    </details>
  );
}

function NumList({ items, start = 1 }: { items: string[]; start?: number }) {
  return (
    <ol className="m-0 p-0 list-none">
      {items.map((q, i) => (
        <li key={q} className="grid grid-cols-[34px_1fr] gap-2 py-2.5" style={{ borderTop: `1px solid ${RULE}`, fontFamily: serif, fontSize: 16, color: INK, lineHeight: 1.6 }}>
          <span style={{ fontFamily: display, fontWeight: 700, color: RED }}>{start + i}</span><span>{q}</span>
        </li>
      ))}
    </ol>
  );
}

function Reader() {
  const [page, setPage] = useState(0);
  // min-w-0 on the wrapper lets the thumbnail rail scroll instead of widening the page
  const go = (d: number) => setPage((p) => Math.min(PAGES.length - 1, Math.max(0, p + d)));
  const btn = "flex items-center justify-center shrink-0 cursor-pointer disabled:opacity-30 disabled:cursor-default";
  return (
    <div className="min-w-0">
      <div className="flex items-center justify-center gap-3 sm:gap-5">
        <button type="button" className={btn} onClick={() => go(-1)} disabled={page === 0} aria-label="Previous page" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", background: "transparent", color: "#fff" }}><ChevronLeft size={20} /></button>
        <img src={PAGES[page]} alt={`SALMON tool, page ${page + 1} of ${PAGES.length}`} width={850} height={1100} className="block h-auto min-w-0" style={{ flex: "1 1 0%", width: "100%", maxWidth: 460, boxShadow: "0 24px 60px rgba(0,0,0,0.35)", background: "#fff" }} />
        <button type="button" className={btn} onClick={() => go(1)} disabled={page === PAGES.length - 1} aria-label="Next page" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.4)", background: "transparent", color: "#fff" }}><ChevronRight size={20} /></button>
      </div>
      <p className="text-center m-0 mt-4" aria-live="polite" style={{ fontFamily: sans, fontSize: 13, color: "rgba(255,255,255,0.85)" }}>Page {page + 1} of {PAGES.length}</p>
      <div className="mt-4 overflow-x-auto pb-2">
        <div className="flex gap-2 justify-start lg:justify-center" style={{ minWidth: "max-content" }}>
          {PAGES.map((src, i) => (
            <button key={src} type="button" onClick={() => setPage(i)} aria-label={`Show page ${i + 1}`} aria-current={i === page ? "true" : undefined} className="shrink-0 cursor-pointer" style={{ padding: 0, background: "none", border: i === page ? `2px solid ${PINK}` : "1px solid rgba(255,255,255,0.25)", opacity: i === page ? 1 : 0.7 }}>
              <img src={src} alt="" loading="lazy" width={40} height={52} style={{ width: 40, height: "auto", display: "block" }} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

const th: React.CSSProperties = { fontFamily: sans, fontWeight: 700, color: "#ffffff", background: DEEP, textAlign: "left", verticalAlign: "bottom", lineHeight: 1.35 };
const td: React.CSSProperties = { fontFamily: serif, color: BODY, borderBottom: `1px solid ${RULE}`, lineHeight: 1.4 };

/* ---------- page ---------- */

export default function OnePage() {
  const film = useRef<HeroFilmHandle>(null);
  useEffect(() => {
    if (!window.matchMedia("(hover: none)").matches) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("is-filled"); }), { threshold: 0.6 });
    document.querySelectorAll(".num-fill").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50);
  }, []);

  let q = 0;
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: WARM }}>
      <SectionNav />
      <main id="main" className="flex-1" style={{ overflowX: "clip" }}>
        {/* ===== OPENING: calm and editorial. Words on warm white, then the school film full-bleed
             (it plays from its own still), then the research question and the numbers. ===== */}
        <section id="top" style={{ backgroundColor: PARCH2 }}>
          {/* words left, the school film right: both above the fold at 1280x800 */}
          <div className="max-w-[1280px] mx-auto px-4 sm:px-8 pt-6 sm:pt-8 lg:pt-6 pb-8 lg:pb-6 grid grid-cols-1 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] gap-7 lg:gap-14 items-center lg:min-h-[calc(100svh-72px)] lg:max-h-[780px]">
            <FadeIn>
              <p className="m-0 mb-4" style={{ fontFamily: sans, fontSize: 13, fontWeight: 600, letterSpacing: "0.04em", color: RED }}>Community Research &middot; Seabird Island</p>
              <h1 className="m-0 mb-5" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(34px, 4.3vw, 62px)", color: INK, lineHeight: 1.04, letterSpacing: "-0.012em", textWrap: "balance" }}>
                Teacher evaluation that nurtures,{" "}
                <span className="block" style={{ fontStyle: "italic", fontWeight: 500, color: RED }}>the way a river raises salmon</span>
              </h1>
              <p className="m-0 mb-7" style={{ fontFamily: serif, fontSize: "clamp(16px, 1.45vw, 18.5px)", color: BODY, lineHeight: 1.7, maxWidth: 520 }}>
                A framework Seabird Island Community School built around its own values, with its educators, families and Elders.
              </p>
              <div className="flex flex-wrap gap-3">
                <button type="button" onClick={() => film.current?.play()} className="btn-lift inline-flex items-center gap-2 cursor-pointer" style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, padding: "14px 24px", background: RED, color: "#ffffff", border: 0 }}>
                  <Play size={14} fill="#ffffff" /> Watch the Film
                </button>
                <a href="/SALMON-Tool.pdf" target="_blank" rel="noopener noreferrer" className="btn-lift inline-flex items-center gap-2 no-underline" style={{ fontFamily: sans, fontSize: 15, fontWeight: 600, padding: "13px 22px", border: `1px solid ${RED}`, color: RED }}>
                  <Download size={15} /> Download the Tool
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.12}>
              <div className="hero-frame">
                <HeroFilm ref={film} id="EP5b48Weyrc" poster={SCHOOL} title="Seabird Island Community School" credit="the school behind the framework" contained />
              </div>
            </FadeIn>
          </div>

          {/* the definition, the question and the numbers, just below the hero */}
          </section>
          <section aria-label="The research in brief" style={{ backgroundColor: OX }}>
            <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-12 sm:py-14">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] gap-10 lg:gap-14 items-end pb-0">
                <FadeIn>
                  <figure className="m-0">
                    <figcaption className="mb-3" style={{ fontFamily: sans, fontSize: 12, fontWeight: 600, letterSpacing: "0.16em", textTransform: "uppercase", color: PINK }}>The Research Question</figcaption>
                    <blockquote className="m-0">
                      <p className="m-0" style={{ fontFamily: display, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(24px, 2.6vw, 34px)", color: "#fdfcf9", lineHeight: 1.25, textWrap: "balance" }}>
                        &ldquo;What does effective teaching, and fair evaluation of it, look like here?&rdquo;
                      </p>
                    </blockquote>
                    <p className="m-0 mt-5" style={{ fontFamily: sans, fontSize: 13.5, color: "rgba(253,252,249,0.78)", letterSpacing: "0.02em" }}>
                      <span className="sr-only">SALMON stands for Seabird Assessment for Learning, Mentorship and Ongoing Nurturing.</span>
                      <span aria-hidden="true">
                        <span style={{ fontWeight: 700, color: "#fdfcf9", letterSpacing: "0.08em" }}>SALMON</span>{" "}&middot;{" "}
                        {[["S", "eabird"], ["A", "ssessment for"], ["L", "earning,"], ["M", "entorship and"], ["O", "ngoing"], ["N", "urturing"]].map(([x, y], i) => (
                          <span key={x}>{i ? " " : ""}<span className="whitespace-nowrap"><span style={{ color: PINK }}>{x}</span>{y}</span></span>
                        ))}
                      </span>
                    </p>
                  </figure>
                </FadeIn>
                <dl className="m-0 grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-8">
                  {glance.map((g) => (
                    <div key={g.t} className="hv hv-dark stat pt-4" style={{ borderTop: "1px solid rgba(240,196,202,0.45)" }}>
                      <dt className="sr-only">{g.t}</dt>
                      <dd className="m-0">
                        <span className="sr-only">{g.n}</span>
                        <CountUp to={Number(g.n)} light />
                        <span aria-hidden="true" className="block mt-2" style={{ fontFamily: serif, fontSize: 14.5, color: "rgba(253,252,249,0.85)", lineHeight: 1.45 }}>{g.t}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
        </section>

        {/* ===== TONE: the song recorded at the school, beside an educator's own words (dark band) ===== */}
        <section id="films" className="px-4 sm:px-6 py-14 sm:py-20 scroll-mt-24" style={{ backgroundColor: WARM }}>
          <div className="max-w-[1240px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)] gap-10 lg:gap-16 items-center">
            <FadeIn>
              <figure className="m-0">
                <blockquote className="m-0">
                  <p className="m-0 quote-mark" style={{ fontFamily: display, fontStyle: "italic", fontWeight: 500, fontSize: "clamp(24px, 2.6vw, 34px)", color: INK, lineHeight: 1.3 }}>
                    We need to come together and really be on the same page and strive to achieve the vision of the Elders
                    that first created the school.
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3" style={{ fontFamily: sans, fontSize: 13, color: MUTED }}>
                  <span aria-hidden="true" style={{ display: "inline-block", width: 32, height: 1, background: RED }} />
                  An educator at the school, interviewed for the research
                </figcaption>
              </figure>
            </FadeIn>
            <FadeIn delay={0.1}>
              <HeroFilm id="H3yrPfDtOWQ" poster={`https://i.ytimg.com/vi/H3yrPfDtOWQ/maxresdefault.jpg`} title="For Our Culture" credit="N'we Jinan Artists, recorded at Seabird Island Community School" contained />
            </FadeIn>
          </div>
        </section>

{/* ===== COMMITTEE ===== */}
        <Section id="committee" bg={PARCH}>
          <FadeIn>
            <H2>The Stó:lō Education Committee</H2>
            <Lede className="mb-10 dropcap">
              Four respected Stó:lō educators guided the work from the start. They shaped the interview questions, kept the
              project accountable to community values and reviewed the drafts before anything was final.
            </Lede>
          </FadeIn>
          <CommitteeGrid />
        </Section>

        {/* ===== WHO DID WHAT: a calm sequence on a light ground ===== */}
        <Section bg={WARM}>
          <FadeIn>
            <H2>Who did what</H2>
            <Lede className="mb-12">The community set the direction and checked the result. The research team did the work in between.</Lede>
          </FadeIn>
          <FlowRow items={structure} render={(s, i) => (
            <div className="hv flex-1 pt-5 pb-2" style={{ borderTop: `${i === 0 ? 3 : 1}px solid ${i === 0 ? RED : INK}` }}>
              <p className="m-0 mb-3" style={{ fontFamily: sans, fontSize: 12.5, fontWeight: 600, color: i === 0 ? RED : MUTED }}>{String(i + 1).padStart(2, "0")} &middot; {s.k}</p>
              <h3 className="hv-title m-0 mb-3" style={{ fontFamily: display, fontWeight: 700, fontSize: 22, lineHeight: 1.25, color: INK }}>{s.t}</h3>
              <p className="m-0" style={{ fontFamily: serif, fontSize: 15.5, lineHeight: 1.7, color: BODY }}>{s.d}</p>
            </div>
          )} />
          <p className="m-0 mt-12 pt-5 max-w-[760px]" style={{ borderTop: `1px solid ${RULE}`, fontFamily: serif, fontStyle: "italic", fontSize: 14.5, color: MUTED, lineHeight: 1.7 }}>
            The work was framed by relational accountability (Wilson, 2008) and ethical space (Ermine, 2007): the research
            answers to the relationships it depends on, and different ways of knowing meet on equal terms.
          </p>
        </Section>

        {/* ===== PROCESS ===== */}
        <Section id="process" bg={PARCH}>
          <FadeIn>
            <Eyebrow>The process</Eyebrow>
            <H2>Five steps, each one led or checked by the community</H2>
            <Lede className="mb-14">From the first questions to the finished tool, here is how the work moved.</Lede>
          </FadeIn>

          <div>
            <FadeIn><StepHead n="01" title="Guidance from the community" lede="The Stó:lō Education Committee reviewed and shaped the interview prompts so the questions matched Stó:lō ways of knowing and teaching. The team also reviewed local policies, evaluation tools, websites and strategic plans to see what existing evaluation covered and what it missed." /></FadeIn>
            <div className="mb-16">
              <Strip items={[
                { k: "Interview guide, part 1", t: "Assessment, teaching and relationship building" },
                { k: "Interview guide, part 2", t: "Experiences with teacher evaluation at the school" },
                { k: "Interview guide, part 3", t: "What an effective, culturally grounded evaluation tool should include" },
              ]} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] gap-8 lg:gap-12 items-start mb-16">
              <FadeIn><StepHead n="02" title="Gathering voices" lede="Every educator with at least one year at the school was invited by email. Those who took part gave consent, filled in a short background form and sat for a one-to-one, semi-structured interview, most held online during COVID-19 and one in person. The guide was not shared in advance, so answers were people's own rather than rehearsed. Families and Elders were part of the conversation too." /></FadeIn>
              <People />
            </div>

            <Interlude text="The person's not there judging you; they're there trying to help you get better. Don't you want to get better?" />

            <FadeIn><StepHead n="03" title="Making sense of what people said" lede="Transcribing and coding began while the interviews were still under way, so each conversation informed the next. The codes were mapped visually to see how ideas connected, grouped into fourteen sub-themes, and then into four themes. Every theme can be traced back to the words of the people interviewed." /></FadeIn>
            <div className="mb-14"><Trail /></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
              {themes.map((th, i) => {
                const panel = [
                  { bg: "#3a0c14", h: "#ffffff", b: "rgba(255,255,255,0.86)", k: PINK, r: "rgba(255,255,255,0.18)" },
                  { bg: PARCH, h: INK, b: BODY, k: RED, r: "#ddd3c3" },
                  { bg: SLATE, h: INK, b: "#33403b", k: "#7d1b2a", r: "#c4ceca" },
                  { bg: RED, h: "#ffffff", b: "rgba(255,255,255,0.92)", k: "#ffe3e7", r: "rgba(255,255,255,0.25)" },
                ][i];
                return (
                  <div key={th.n} className="hv-lift relative overflow-hidden p-7 sm:p-8 h-full" style={{ background: panel.bg }}>
                    <span aria-hidden="true" className="absolute select-none" style={{ right: 18, top: -18, fontFamily: display, fontWeight: 800, fontSize: 150, lineHeight: 1, color: panel.h, opacity: 0.09 }}>{th.n}</span>
                    <p className="m-0 mb-2 uppercase relative" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: panel.k }}>Theme {th.n}</p>
                    <h4 className="m-0 mb-5 relative" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(21px, 2.1vw, 25px)", lineHeight: 1.25, color: panel.h }}>{th.t}</h4>
                    <ol className="m-0 p-0 list-none relative">
                      {th.subs.map((s, j) => (
                        <li key={s} className="grid grid-cols-[38px_1fr] gap-2 py-2.5" style={{ fontFamily: serif, fontSize: 15.5, color: panel.b, borderTop: `1px solid ${panel.r}`, lineHeight: 1.5 }}>
                          <span style={{ fontFamily: display, fontWeight: 700, color: panel.k }}>{th.n}.{j + 1}</span><span>{s}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                );
              })}
            </div>

            <FadeIn><StepHead n="04" title="Checking it with the community" lede="Findings were not final until the community had seen them. Members of the Stó:lō Education Committee reviewed the drafts, so the themes and the framework were checked against Stó:lō educators' own understanding before they were finished." /></FadeIn>
            <div className="mb-16">
              <FlowRow bp="md" items={[
                { k: "Draft", t: "Themes and framework written up from the interviews" },
                { k: "Review", t: "Committee members read the drafts and responded" },
                { k: "Final", t: "The framework and the 24-page tool the school uses" },
              ]} render={(s, i) => <ToneStep k={s.k} t={s.t} tone={[0, 1, 3][i]} />} />
            </div>

            <FadeIn><StepHead n="05" title="What it became" lede="The four themes became the SALMON tool: ten areas educators reflect on, four lifecycle stages that describe growth, and three columns on every page for self-evaluation, administrator feedback and goals set together. Accountability runs both ways: the last area is teachers evaluating their administrators." /></FadeIn>
          </div>
        </Section>

        {/* ===== PHOTOGRAPHS: a composed pair, apart, staggered, captioned. Shown whole, no text on them. ===== */}
        <section className="px-4 sm:px-6 py-16 sm:py-20" style={{ backgroundColor: SLATE }}>
          <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] gap-8 md:gap-8 items-start">
            <FadeIn>
              <figure className="m-0">
                <div className="overflow-hidden"><img src={`${R2_BASE}/site/booklet-photos/img-014-125.jpg`} alt="Students drumming and singing outdoors at Seabird Island" width={986} height={853} loading="lazy" className="photo-zoom block w-full h-auto" /></div>
                <figcaption className="mt-3 flex gap-3" style={{ fontFamily: sans, fontSize: 13, color: "#33403b", lineHeight: 1.5 }}>
                  <span aria-hidden="true" style={{ display: "inline-block", width: 24, height: 1, background: RED, marginTop: 9, flexShrink: 0 }} />
                  Students drumming and singing outdoors at Seabird Island. From the SALMON tool.
                </figcaption>
              </figure>
            </FadeIn>
            <FadeIn delay={0.12}>
              <figure className="m-0 md:mt-28">
                <div className="overflow-hidden"><img src={`${R2_BASE}/site/booklet-photos/img-018-174.jpg`} alt="Students in regalia with drums in the Seabird Island Community School gym" width={986} height={853} loading="lazy" className="photo-zoom block w-full h-auto" /></div>
                <figcaption className="mt-3 flex gap-3" style={{ fontFamily: sans, fontSize: 13, color: "#33403b", lineHeight: 1.5 }}>
                  <span aria-hidden="true" style={{ display: "inline-block", width: 24, height: 1, background: RED, marginTop: 9, flexShrink: 0 }} />
                  A drum group in the school gym, in regalia. From the SALMON tool.
                </figcaption>
              </figure>
            </FadeIn>
          </div>
        </section>

        {/* ===== FINDINGS: editorial, numbered, no boxes ===== */}
        <Section id="findings" bg={WARM}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] gap-10 lg:gap-16">
            <FadeIn>
              <div className="lg:sticky lg:top-28">
                <H2>Four findings that shaped the tool</H2>
                <Pull small text="I can't make a goal for a teacher, because then the teacher doesn't buy into that if it's not something they feel is important right now." />
              </div>
            </FadeIn>
            <ol className="list-none m-0 p-0">
              {FINDINGS.map((f, i) => (
                <li key={f.n}><FadeIn delay={i * 0.05}>
                  <div className="hv grid grid-cols-[72px_1fr] sm:grid-cols-[100px_1fr] gap-4 py-7" style={{ borderTop: `1px solid ${RULE}` }}>
                    <span aria-hidden="true" className="hv-num num-fill" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(42px, 4.6vw, 62px)", lineHeight: 0.95 }}>{f.n}</span>
                    <div>
                      <h3 className="hv-title m-0 mb-2" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(21px, 2.2vw, 26px)", color: INK, lineHeight: 1.25 }}>{f.t}<span className="hv-arrow" aria-hidden="true"> &#8594;</span></h3>
                      <p className="m-0" style={{ fontFamily: serif, fontSize: 17, color: BODY, lineHeight: 1.75 }}>{f.d}</p>
                    </div>
                  </div>
                </FadeIn></li>
              ))}
            </ol>
          </div>
        </Section>

        {/* ===== GROWTH CYCLE ===== */}
        <Section id="cycle" bg={PARCH}>
          <FadeIn>
            <H2>Four stages of educator growth, named for the salmon</H2>
            <Lede className="mb-12">
              The lifecycle gives educators and administrators shared words for where someone is and where they are heading.
              Each stage has its own qualities, and returning adults mentor the next beginners.
            </Lede>
          </FadeIn>
          <Lifecycle bg={WARM} />
        </Section>

        {/* ===== THE TOOL ===== */}
        <Section id="tool" bg={DEEP}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-12 lg:gap-16 items-start">
            <FadeIn>
              <Eyebrow light>The tool</Eyebrow>
              <H2 light>A 24-page tool educators write in</H2>
              <Lede light className="mb-8">
                Ten areas, each with guiding questions and three columns: self-evaluation, administrator feedback and goals
                set together. It is grounded in the values the school teaches its students: self-reliance, generosity,
                honesty and respect.
              </Lede>
              <ol className="m-0 p-0 list-none mb-8">
                {areas.map((a, i) => (
                  <li key={a} className="flex gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", fontFamily: serif, fontSize: 16, color: "rgba(255,255,255,0.94)", lineHeight: 1.5 }}>
                    <span style={{ fontFamily: display, fontWeight: 700, color: PINK, minWidth: 24 }}>{i + 1}</span><span>{a}</span>
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-4">
                <a href="/SALMON-Tool.pdf" target="_blank" rel="noopener noreferrer" className="btn-lift inline-flex items-center gap-2 no-underline" style={{ fontFamily: sans, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 26px", background: WARM, color: RED }}>
                  <Download size={15} /> Download the PDF
                </a>
                <a href="/tool" className="btn-lift inline-flex items-center no-underline" style={{ fontFamily: sans, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 26px", border: "1px solid rgba(255,255,255,0.6)", color: "#ffffff" }}>
                  Open the full-screen reader
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.12} className="min-w-0">
              <Reader />
            </FadeIn>
          </div>
        </Section>

        {/* ===== GUIDING QUESTIONS ===== */}
        <Section id="questions" bg={PARCH}>
          <FadeIn>
            <Eyebrow>Guiding questions</Eyebrow>
            <H2>The questions educators and administrators work through together</H2>
            <Lede className="mb-10">Word for word from the tool. Pick a section, then an area. Each area grew out of the four themes educators named in the interviews.</Lede>
          </FadeIn>
          <GuidingQuestions />
        </Section>

        {/* ===== MATERIALS: the research file, as documents ===== */}
        <Section id="materials" bg={SLATE}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.6fr)] gap-10 lg:gap-16 items-start">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Research materials</Eyebrow>
              <h2 className="m-0 mb-5" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(32px, 4vw, 52px)", color: INK, lineHeight: 1.05 }}>Open the research file</h2>
              <Lede className="mb-6">The instruments behind the findings, exactly as used. Consent forms, names and transcripts stay private.</Lede>
              <p className="m-0" style={{ fontFamily: sans, fontSize: 13.5, color: MUTED }}>In the order the research happened, from community permission to the coding of what people said.</p>
            </div>
            <Materials />
          </div>
        </Section>

        {/* ===== FAQ ===== */}
        <Section id="faq" bg={WARM}>
          <FadeIn>
            <H2 className="mb-10">About the research</H2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            {FAQ.map((f, i) => (
              <FadeIn key={f.q} delay={i * 0.05}>
                <div className="hv pt-6" style={{ borderTop: `2px solid ${INK}` }}>
                  <h3 className="hv-title m-0 mb-3" style={{ fontFamily: display, fontWeight: 700, fontSize: 22, color: INK, lineHeight: 1.3 }}>{f.q}<span className="hv-arrow" aria-hidden="true"> &#8594;</span></h3>
                  <p className="m-0" style={{ fontFamily: serif, fontSize: 16, color: BODY, lineHeight: 1.75 }}>{f.a}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* ===== SCHOOL BAND (photo beside the words, never under them) ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-2" style={{ backgroundColor: PARCH }}>
          <img src={`${R2_BASE}/site/img-readers.jpg`} alt="Sxwōwálólh Halq'eméylem readers in a Seabird Island classroom" width={1600} height={900} loading="lazy" className="block w-full h-auto" />

          <div className="flex items-center px-6 sm:px-10 lg:px-14 py-12">
            <div className="max-w-[520px]">
              <Eyebrow>Begin the Cycle</Eyebrow>
              <p className="m-0 mb-4" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 40px)", color: INK, lineHeight: 1.15 }}>
                Evaluation that teachers look forward to.
              </p>
              <p className="m-0" style={{ fontFamily: serif, fontSize: 17, color: BODY, lineHeight: 1.7 }}>
                Built from the voices of nineteen educators and staff, guided by four Stó:lō educators, and used at Seabird
                Island Community School.
              </p>
            </div>
          </div>
        </section>

        {/* ===== LEARN MORE: each item is one link ===== */}
        <Section id="learn" bg={LTINT}>
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.5fr)] gap-10 lg:gap-16">
            <FadeIn><H2>Trusted places to keep learning</H2></FadeIn>
            <ul className="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 gap-x-10">
              {LEARN.map((r) => (
                <li key={r.href} className="flex">
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="hv hv-link block w-full py-5 no-underline" style={{ borderTop: `1px solid ${RULE}` }}>
                    <span className="link-draw hv-title" style={{ fontFamily: display, fontWeight: 700, fontSize: 19, color: INK }}>{r.t}</span>
                    <span className="arrow-nudge" aria-hidden="true" style={{ fontFamily: display, fontSize: 19, color: RED }}> &#8599;</span>
                    <span className="block mt-1.5" style={{ fontFamily: serif, fontSize: 15, color: BODY, lineHeight: 1.65 }}>{r.d}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Section>

        {/* ===== REPORT ===== */}
        <section className="px-4 sm:px-6 py-12" style={{ backgroundColor: WARM, borderTop: `1px solid ${RULE}` }}>
          <div className="max-w-[1180px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <Eyebrow>Research report</Eyebrow>
              <p className="m-0" style={{ fontFamily: serif, fontSize: 17, color: BODY, lineHeight: 1.7 }}>
                <em>Totí:lthometel: Weaving Educators&rsquo; Perspectives into a Teacher Evaluation Tool at Seabird Island Community
                School</em> (Trent University, 2025). The full report, including the detailed coding tables behind each theme, is
                available on request.
              </p>
            </div>
            <a href="/SALMON-Tool.pdf" target="_blank" rel="noopener noreferrer" className="btn-lift inline-flex items-center gap-2 no-underline" style={{ fontFamily: sans, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 26px", background: RED, color: "#ffffff" }}>
              <Download size={15} /> Download the tool
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
