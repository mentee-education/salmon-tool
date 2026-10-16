/*
 * SALMON — the whole story on one page, in the editorial language of the original site
 * (warm white, crimson, Playfair Display / Source Serif 4 / DM Sans, FadeIn reveals, film cards).
 * Order: question, numbers, committee, who did what, the five steps, findings, growth cycle, the tool,
 * guiding questions, films, research materials, FAQ, further learning, report.
 * Rules: no text on photos, images shown whole, all images on R2 (salmon-tool bucket).
 */
import { useEffect, useState } from "react";
import SectionNav from "@/components/SectionNav";
import SiteFooter from "@/components/SiteFooter";
import FadeIn from "@/components/FadeIn";
import Lifecycle from "@/components/Lifecycle";
import { COMMITTEE, R2_BASE } from "@/data/committee";
import { REFLECTION_GROUPS } from "@/data/reflections";
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
const serif = "'Source Serif 4', serif";
const display = "'Playfair Display', serif";
const sans = "'DM Sans', sans-serif";

const RIVER = `${R2_BASE}/hero-river.png`;
const SCHOOL = `${R2_BASE}/site/hero.jpg`;
const READERS = `${R2_BASE}/site/img-readers.jpg`;
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
  { t: "NCCIE", d: "The National Centre for Collaboration in Indigenous Education: lessons and stories from across Canada.", href: "https://www.nccie.ca/" },
  { t: "Seabird Island Band", d: "The community where SALMON was born.", href: "https://www.seabirdisland.ca/" },
];

/* ---------- shared pieces ---------- */

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className="uppercase font-semibold m-0 mb-3" style={{ fontFamily: sans, fontSize: 12, letterSpacing: "0.2em", color: light ? PINK : RED }}>{children}</p>;
}

function H2({ children, light = false, className = "" }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return <h2 className={`m-0 mb-4 ${className}`} style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(28px, 3.6vw, 44px)", color: light ? "#ffffff" : INK, lineHeight: 1.12 }}>{children}</h2>;
}

function Lede({ children, light = false, className = "" }: { children: React.ReactNode; light?: boolean; className?: string }) {
  return <p className={`m-0 max-w-[760px] ${className}`} style={{ fontFamily: serif, fontSize: "clamp(16px, 1.7vw, 18px)", color: light ? "rgba(255,255,255,0.9)" : BODY, lineHeight: 1.75 }}>{children}</p>;
}

function Section({ id, bg, children, className = "" }: { id?: string; bg: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`px-4 sm:px-6 py-16 sm:py-24 scroll-mt-28 xl:scroll-mt-20 ${className}`} style={{ backgroundColor: bg }}>
      <div className="max-w-[1180px] mx-auto">{children}</div>
    </section>
  );
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

function Film({ id, title, credit }: { id: string; title: string; credit: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="m-0 h-full flex flex-col" style={{ background: "#ffffff", border: `1px solid ${RULE}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      <div className="relative aspect-video overflow-hidden">
        {playing ? (
          <iframe src={`https://www.youtube.com/embed/${id}?autoplay=1`} title={title} className="w-full h-full" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen style={{ display: "block", border: 0 }} />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Play: ${title}`} className="group block w-full h-full relative cursor-pointer" style={{ border: 0, padding: 0, background: "none" }}>
            <img src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`} onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; }} alt="" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110" style={{ width: 62, height: 62, background: "rgba(155,35,53,0.95)", boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }}>
              <Play size={22} fill="white" color="white" style={{ marginLeft: 3 }} />
            </span>
          </button>
        )}
      </div>
      <figcaption className="px-5 py-4 flex-1">
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 18, color: INK, marginBottom: 4 }}>{title}</div>
        <div style={{ fontFamily: sans, fontSize: 12, color: RED, letterSpacing: "0.05em" }}>{credit}</div>
      </figcaption>
    </figure>
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
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => document.getElementById(id)?.scrollIntoView(), 50);
  }, []);

  let q = 0;
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: WARM }}>
      <SectionNav />
      <main id="main" className="flex-1">
        {/* ===== HERO ===== */}
        <section id="top" className="px-4 sm:px-6 pt-12 sm:pt-16 pb-12" style={{ backgroundColor: WARM }}>
          <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.05fr] gap-10 lg:gap-14 items-center">
            <FadeIn>
              <Eyebrow>Community research &middot; Seabird Island Community School</Eyebrow>
              <h1 className="m-0 mb-5" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(36px, 4.8vw, 60px)", color: INK, lineHeight: 1.04 }}>
                Teacher evaluation that nurtures, the way a river raises salmon
              </h1>
              <p className="m-0 mb-6" style={{ fontFamily: serif, fontSize: "clamp(16px, 1.8vw, 19px)", color: BODY, lineHeight: 1.75 }}>
                SALMON (Seabird Assessment for Learning, Mentorship and Ongoing Nurturing) is a framework a school community
                built around its own values: guided by the Stó:lō Education Committee, shaped by its educators, staff,
                families and Elders, and used by the school today.
              </p>
              <blockquote className="m-0 pl-5" style={{ borderLeft: `4px solid ${RED}` }}>
                <p className="m-0 mb-1 uppercase" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: RED }}>The research question</p>
                <p className="m-0" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(19px, 2.1vw, 24px)", color: INK, lineHeight: 1.35 }}>
                  What does effective teaching, and fair evaluation of it, look like here?
                </p>
              </blockquote>
            </FadeIn>
            <FadeIn delay={0.15}>
              <figure className="m-0">
                <img src={RIVER} alt="Mist over a forested river valley" width={1344} height={768} className="w-full h-auto block" style={{ boxShadow: "0 18px 50px rgba(0,0,0,0.18)" }} />
              </figure>
            </FadeIn>
          </div>
        </section>

        {/* ===== NUMBERS ===== */}
        <section className="px-4 sm:px-6 pb-16" style={{ backgroundColor: WARM }}>
          <dl className="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-4 m-0" style={{ borderTop: `2px solid ${INK}` }}>
            {glance.map((g, i) => (
              <div key={g.t} className={`py-6 pr-4 border-[#d4cfc6] ${i % 2 === 1 ? "border-l pl-5" : i === 2 ? "pl-0 md:border-l md:pl-5" : "pl-0"} ${i >= 2 ? "border-t md:border-t-0" : ""}`}>
                <dt className="sr-only">{g.t}</dt>
                <dd className="m-0">
                  <span className="block" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(42px, 5vw, 64px)", color: RED, lineHeight: 1 }}>{g.n}</span>
                  <span className="block mt-2" style={{ fontFamily: serif, fontSize: 15, color: BODY, lineHeight: 1.45 }}>{g.t}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ===== COMMITTEE ===== */}
        <Section id="committee" bg={SAND}>
          <FadeIn>
            <Eyebrow>Guided by the community</Eyebrow>
            <H2>The Stó:lō Education Committee</H2>
            <Lede className="mb-10">
              Four respected Stó:lō educators guided the work from the start. They shaped the interview questions, kept the
              project accountable to community values and reviewed the drafts before anything was final.
            </Lede>
          </FadeIn>
          <ul className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {COMMITTEE.map((c, i) => (
              <li key={c.name} className="h-full">
                <FadeIn delay={i * 0.06} className="h-full">
                <div className="h-full" style={{ background: "#ffffff", border: `1px solid ${RULE}` }}>
                  <div className="flex items-center justify-center" style={{ aspectRatio: "1 / 1", background: c.photo ? undefined : DEEP }}>
                    {c.photo ? (
                      <img src={c.photo} alt={`Portrait of ${c.name}`} className="w-full h-full object-cover block" />
                    ) : (
                      <span aria-hidden="true" style={{ fontFamily: display, fontWeight: 700, fontSize: 64, color: PINK, letterSpacing: "0.02em" }}>{c.name.charAt(0)}</span>
                    )}
                  </div>
                  <div className="p-5">
                    <p className="m-0 mb-1" style={{ fontFamily: display, fontWeight: 700, fontSize: 19, color: INK, lineHeight: 1.3 }}>{c.name}</p>
                    <p className="m-0" style={{ fontFamily: serif, fontSize: 15, color: MUTED, lineHeight: 1.5 }}>{c.role}</p>
                  </div>
                </div>
                </FadeIn>
              </li>
            ))}
          </ul>
        </Section>

        {/* ===== WHO DID WHAT ===== */}
        <Section bg={DEEP}>
          <FadeIn>
            <Eyebrow light>Structure</Eyebrow>
            <H2 light>Who did what</H2>
            <Lede light className="mb-10">The community set the direction and checked the result. The research team did the work in between.</Lede>
          </FadeIn>
          <ol className="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-7">
            {structure.map((s, i) => (
              <li key={s.t} className="relative flex">
                <div className="flex-1 p-6" style={{ background: i === 0 ? WARM : "rgba(255,255,255,0.06)", border: `1px solid ${i === 0 ? WARM : "rgba(255,255,255,0.22)"}` }}>
                  <p className="m-0 mb-2 uppercase" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: i === 0 ? RED : PINK }}>{String(i + 1).padStart(2, "0")} &middot; {s.k}</p>
                  <h3 className="m-0 mb-3" style={{ fontFamily: display, fontWeight: 700, fontSize: 20, lineHeight: 1.25, color: i === 0 ? INK : "#ffffff" }}>{s.t}</h3>
                  <p className="m-0" style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.65, color: i === 0 ? BODY : "rgba(255,255,255,0.88)" }}>{s.d}</p>
                </div>
                {i < 3 && (
                  <span aria-hidden="true" className="hidden lg:flex absolute items-center justify-center" style={{ right: -21, top: "50%", transform: "translateY(-50%)", width: 28, height: 28, borderRadius: "50%", background: RED, color: "#fff", fontSize: 15, zIndex: 2 }}>&#8594;</span>
                )}
              </li>
            ))}
          </ol>
          <p className="m-0 mt-8 max-w-[860px]" style={{ fontFamily: serif, fontSize: 15, color: "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>
            The work was framed by relational accountability (Wilson, 2008) and ethical space (Ermine, 2007): the research
            answers to the relationships it depends on, and different ways of knowing meet on equal terms.
          </p>
        </Section>

        {/* ===== PROCESS ===== */}
        <Section id="process" bg={WARM}>
          <FadeIn>
            <Eyebrow>The process</Eyebrow>
            <H2>Five steps, each one led or checked by the community</H2>
            <Lede className="mb-14">From the first questions to the finished tool, here is how the work moved.</Lede>
          </FadeIn>

          <div className="pl-0 sm:pl-2" style={{ borderLeft: "none" }}>
            <FadeIn><StepHead n="01" title="Guidance from the community" lede="The Stó:lō Education Committee reviewed and shaped the interview prompts so the questions matched Stó:lō ways of knowing and teaching. The team also reviewed local policies, evaluation tools, websites and strategic plans to see what existing evaluation covered and what it missed." /></FadeIn>
            <div className="mb-16">
              <Strip items={[
                { k: "Interview guide, part 1", t: "Assessment, teaching and relationship building" },
                { k: "Interview guide, part 2", t: "Experiences with teacher evaluation at the school" },
                { k: "Interview guide, part 3", t: "What an effective, culturally grounded evaluation tool should include" },
              ]} />
            </div>

            <FadeIn><StepHead n="02" title="Gathering voices" lede="Every educator with at least one year at the school was invited by email. Those who took part gave consent, filled in a short background form and sat for a one-to-one, semi-structured interview, most held online during COVID-19 and one in person. The guide was not shared in advance, so answers were people's own rather than rehearsed. Families and Elders were part of the conversation too." /></FadeIn>
            <div className="mb-16" style={{ border: `1px solid ${RULE}`, background: "#ffffff" }}>
              <table className="w-full" style={{ borderCollapse: "collapse" }}>
                <caption className="text-left px-3 py-4 sm:px-4" style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: INK, captionSide: "top" }}>Interviewed: 19 people, by role and identity</caption>
                <thead>
                  <tr>
                    <th scope="col" className="px-1.5 py-3 sm:px-3.5 text-[12px] sm:text-[13px]" style={th}>Role</th>
                    <th scope="col" className="px-1.5 py-3 sm:px-3.5 text-[12px] sm:text-[13px]" style={{ ...th, textAlign: "right" }}>Total</th>
                    <th scope="col" className="px-1.5 py-3 sm:px-3.5 text-[12px] sm:text-[13px]" style={{ ...th, textAlign: "right" }}>Stó:lō</th>
                    <th scope="col" className="px-1.5 py-3 sm:px-3.5 text-[12px] sm:text-[13px]" style={{ ...th, textAlign: "right" }}>Indigenous, not Stó:lō</th>
                    <th scope="col" className="px-1.5 py-3 sm:px-3.5 text-[12px] sm:text-[13px]" style={{ ...th, textAlign: "right" }}>Non-&#8203;Indigenous</th>
                  </tr>
                </thead>
                <tbody>
                  {participants.map((p) => (
                    <tr key={p.role}>
                      <th scope="row" className="px-1.5 py-2.5 sm:px-3.5 text-[14px] sm:text-[15px]" style={{ ...td, fontWeight: 600, color: INK, textAlign: "left" }}>{p.role}</th>
                      <td className="px-1.5 py-2.5 sm:px-3.5 text-[14px] sm:text-[15px]" style={{ ...td, textAlign: "right", fontWeight: 700, color: INK }}>{p.total}</td>
                      <td className="px-1.5 py-2.5 sm:px-3.5 text-[14px] sm:text-[15px]" style={{ ...td, textAlign: "right" }}>{p.stolo}</td>
                      <td className="px-1.5 py-2.5 sm:px-3.5 text-[14px] sm:text-[15px]" style={{ ...td, textAlign: "right" }}>{p.ind}</td>
                      <td className="px-1.5 py-2.5 sm:px-3.5 text-[14px] sm:text-[15px]" style={{ ...td, textAlign: "right" }}>{p.non}</td>
                    </tr>
                  ))}
                  <tr style={{ background: SAND }}>
                    <th scope="row" className="px-1.5 py-2.5 sm:px-3.5 text-[14px] sm:text-[15px]" style={{ ...td, fontWeight: 700, color: INK, textAlign: "left", borderBottom: 0 }}>All participants</th>
                    <td className="px-1.5 py-2.5 sm:px-3.5 text-[14px] sm:text-[15px]" style={{ ...td, textAlign: "right", fontWeight: 800, color: RED, borderBottom: 0 }}>19</td>
                    <td className="px-1.5 py-2.5 sm:px-3.5 text-[14px] sm:text-[15px]" style={{ ...td, textAlign: "right", fontWeight: 700, borderBottom: 0 }}>7</td>
                    <td className="px-1.5 py-2.5 sm:px-3.5 text-[14px] sm:text-[15px]" style={{ ...td, textAlign: "right", fontWeight: 700, borderBottom: 0 }}>6</td>
                    <td className="px-1.5 py-2.5 sm:px-3.5 text-[14px] sm:text-[15px]" style={{ ...td, textAlign: "right", fontWeight: 700, borderBottom: 0 }}>6</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <FadeIn><StepHead n="03" title="Making sense of what people said" lede="Transcribing and coding began while the interviews were still under way, so each conversation informed the next. The codes were mapped visually to see how ideas connected, grouped into fourteen sub-themes, and then into four themes. Every theme can be traced back to the words of the people interviewed." /></FadeIn>
            <div className="mb-6">
              <p className="m-0 mb-3" style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: INK }}>One trail, from interview to theme</p>
              <Strip dark={3} items={[
                { k: "1. What people said", t: "Ongoing self-improvement, openness to feedback, flexibility in teaching methods" },
                { k: "2. Code group", t: "Modelling growth mindset for students" },
                { k: "3. Sub-theme", t: "Embracing a growth mindset" },
                { k: "4. Theme", t: "Fostering a growth mindset and commitment to lifelong learning" },
              ]} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-16">
              {themes.map((t) => (
                <div key={t.n} className="h-full p-6" style={{ background: "#ffffff", border: `1px solid ${RULE}`, borderTop: `4px solid ${RED}` }}>
                  <p className="m-0 mb-1 uppercase" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: RED }}>Theme {t.n}</p>
                  <h4 className="m-0 mb-4" style={{ fontFamily: display, fontWeight: 700, fontSize: 20, lineHeight: 1.3, color: INK }}>{t.t}</h4>
                  <ul className="m-0 p-0 list-none">
                    {t.subs.map((s, j) => (
                      <li key={s} className="py-2" style={{ fontFamily: serif, fontSize: 15, color: BODY, borderTop: `1px solid ${RULE}` }}>{t.n}.{j + 1} {s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <FadeIn><StepHead n="04" title="Checking it with the community" lede="Findings were not final until the community had seen them. Members of the Stó:lō Education Committee reviewed the drafts, so the themes and the framework were checked against Stó:lō educators' own understanding before they were finished." /></FadeIn>
            <div className="mb-16">
              <Strip dark={2} items={[
                { k: "Draft", t: "Themes and framework written up from the interviews" },
                { k: "Review", t: "Committee members read the drafts and responded" },
                { k: "Final", t: "The framework and the 24-page tool the school uses" },
              ]} />
            </div>

            <FadeIn><StepHead n="05" title="What it became" lede="The four themes became the SALMON tool: ten areas educators reflect on, four lifecycle stages that describe growth, and three columns on every page for self-evaluation, administrator feedback and goals set together. Accountability runs both ways: the last area is teachers evaluating their administrators." /></FadeIn>
          </div>
        </Section>

        {/* ===== FINDINGS ===== */}
        <Section id="findings" bg={SAND}>
          <FadeIn>
            <Eyebrow>What the community taught us</Eyebrow>
            <H2 className="mb-10">Four findings that shaped the tool</H2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {FINDINGS.map((f, i) => (
              <FadeIn key={f.n} delay={i * 0.06} className="h-full">
                <div className="p-7 h-full" style={{ background: "#ffffff", border: `1px solid ${RULE}`, borderLeft: `4px solid ${RED}` }}>
                  <div className="mb-3" style={{ fontFamily: display, fontWeight: 800, fontSize: 30, color: RED, lineHeight: 1 }}>{f.n}</div>
                  <h3 className="m-0 mb-2.5" style={{ fontFamily: display, fontWeight: 700, fontSize: 21, color: INK }}>{f.t}</h3>
                  <p className="m-0" style={{ fontFamily: serif, fontSize: 16, color: BODY, lineHeight: 1.7 }}>{f.d}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </Section>

        {/* ===== GROWTH CYCLE ===== */}
        <Section id="cycle" bg={WARM}>
          <FadeIn>
            <Eyebrow>The growth cycle</Eyebrow>
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
                <a href="/SALMON-Tool.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 no-underline" style={{ fontFamily: sans, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 26px", background: WARM, color: RED }}>
                  <Download size={15} /> Download the PDF
                </a>
                <a href="/tool" className="inline-flex items-center no-underline" style={{ fontFamily: sans, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 26px", border: "1px solid rgba(255,255,255,0.6)", color: "#ffffff" }}>
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
        <Section id="questions" bg={SAND}>
          <FadeIn>
            <Eyebrow>Guiding questions</Eyebrow>
            <H2>The questions educators and administrators work through together</H2>
            <Lede className="mb-10">Taken word for word from the tool, area by area. Each area grew out of the four themes educators named in the interviews.</Lede>
          </FadeIn>
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-12">
            <img src={READERS} alt="Sxwōwálólh Halq'eméylem readers in a Seabird Island classroom" width={1600} height={900} loading="lazy" className="w-full h-auto block" style={{ border: `1px solid ${RULE}` }} />
            <div style={{ borderBottom: `1px solid ${RULE}` }}>
              {REFLECTION_GROUPS.map((g) => g.areas.map((a) => (
                <Expand key={a.title} title={a.title} note={`${g.group} · tool page ${a.page}`}>
                  <NumList items={a.questions} />
                </Expand>
              )))}
            </div>
          </div>
        </Section>

        {/* ===== FILMS ===== */}
        <Section id="films" bg={WARM}>
          <FadeIn>
            <Eyebrow>From the community</Eyebrow>
            <H2 className="mb-10">The school behind the framework</H2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
            <FadeIn className="h-full"><Film id="EP5b48Weyrc" title="Seabird Island Community School" credit="Produced by Jason Bruce" /></FadeIn>
            <FadeIn delay={0.12} className="h-full"><Film id="H3yrPfDtOWQ" title="FOR OUR CULTURE" credit="N'we Jinan Artists · recorded at Seabird Island Community School" /></FadeIn>
          </div>
        </Section>

        {/* ===== MATERIALS ===== */}
        <Section id="materials" bg={SAND}>
          <FadeIn>
            <Eyebrow>Research materials</Eyebrow>
            <H2>The questions and the process, in full</H2>
            <Lede className="mb-8">The instruments behind the findings, as used. Consent forms, names and transcripts stay private.</Lede>
          </FadeIn>
          <div style={{ borderBottom: `1px solid ${RULE}` }}>
            <Expand title="Interview guide" note="Eighteen questions: opening and closing questions around the three main parts, reviewed and shaped by the Stó:lō Education Committee">
              {GUIDE.map((g) => { const start = q + 1; q += g.q.length; return (
                <div key={g.h} className="mb-6">
                  <h3 className="m-0 mb-3" style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: RED }}>{g.h}</h3>
                  <NumList items={g.q} start={start} />
                </div>
              ); })}
            </Expand>
            <Expand title="Pre-interview questionnaire" note="A short background form returned before each interview, used to schedule interviews and confirm at least one year at the school">
              <NumList items={QUESTIONNAIRE} />
            </Expand>
            <Expand title="Recruitment and consent" note="How educators were invited, and what they agreed to">
              <p className="m-0 mb-4" style={{ fontFamily: serif, fontSize: 16, color: BODY, lineHeight: 1.7 }}>
                Educators were first contacted by email. The researcher then visited the school in person to hand out consent
                forms and questionnaires together, and two committee members delivered and collected them for anyone not there that day.
              </p>
              <ul className="m-0 p-0 list-none">
                {CONSENT.map((c) => <li key={c} className="py-2.5" style={{ borderTop: `1px solid ${RULE}`, fontFamily: serif, fontSize: 16, color: INK, lineHeight: 1.6 }}>{c}</li>)}
              </ul>
            </Expand>
            <Expand title="Approvals and phases" note="Community permission came first, then university ethics approval">
              <NumList items={PHASES} />
            </Expand>
            <Expand title="Themes and sub-themes" note="The full coding structure: four themes, fourteen sub-themes">
              <div style={{ border: `1px solid ${RULE}`, background: "#ffffff" }}>
                <table className="w-full" style={{ borderCollapse: "collapse" }}>
                  <thead><tr><th scope="col" className="px-3 py-3 text-[13px]" style={th}>Theme</th><th scope="col" className="px-3 py-3 text-[13px]" style={th}>Sub-themes</th></tr></thead>
                  <tbody>
                    {themes.map((tm) => (
                      <tr key={tm.n}>
                        <th scope="row" className="px-3 py-3 text-[15px] align-top" style={{ ...td, fontWeight: 600, color: INK, textAlign: "left", width: "40%" }}>{tm.n}. {tm.t}</th>
                        <td className="px-3 py-3 text-[15px]" style={td}>{tm.subs.map((s, j) => <span key={s} className="block">{tm.n}.{j + 1} {s}</span>)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Expand>
          </div>
        </Section>

        {/* ===== FAQ ===== */}
        <Section bg={WARM}>
          <div className="max-w-[820px]">
            <Eyebrow>Questions</Eyebrow>
            <H2 className="mb-8">About the research</H2>
            <div style={{ borderBottom: `1px solid ${RULE}` }}>
              {FAQ.map((f, i) => (
                <Expand key={f.q} title={f.q} open={i === 0}>
                  <p className="m-0" style={{ fontFamily: serif, fontSize: 16, color: BODY, lineHeight: 1.8 }}>{f.a}</p>
                </Expand>
              ))}
            </div>
          </div>
        </Section>

        {/* ===== SCHOOL BAND (photo beside the words, never under them) ===== */}
        <section className="grid grid-cols-1 lg:grid-cols-2" style={{ backgroundColor: DEEP }}>
          <img src={SCHOOL} alt="Students and staff in a drum circle in the Seabird Island Community School gym" width={1920} height={1080} loading="lazy" className="block w-full h-auto" />
          <div className="flex items-center px-6 sm:px-10 lg:px-14 py-12">
            <div className="max-w-[520px]">
              <Eyebrow light>Begin the cycle</Eyebrow>
              <p className="m-0 mb-4" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 40px)", color: "#ffffff", lineHeight: 1.15 }}>
                Evaluation that teachers look forward to.
              </p>
              <p className="m-0" style={{ fontFamily: serif, fontSize: 17, color: "rgba(255,255,255,0.88)", lineHeight: 1.7 }}>
                Built from the voices of nineteen educators and staff, guided by four Stó:lō educators, and used at Seabird
                Island Community School.
              </p>
            </div>
          </div>
        </section>

        {/* ===== LEARN MORE ===== */}
        <Section id="learn" bg={SAND}>
          <FadeIn>
            <Eyebrow>Go deeper</Eyebrow>
            <H2 className="mb-10">Trusted places to keep learning</H2>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {LEARN.map((r) => (
              <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="block no-underline h-full">
                <div className="p-6 h-full transition-shadow duration-200 hover:shadow-md" style={{ background: "#ffffff", border: `1px solid ${RULE}` }}>
                  <h3 className="m-0 mb-2" style={{ fontFamily: display, fontWeight: 700, fontSize: 18, color: INK }}>{r.t} <span aria-hidden="true">&#8599;</span></h3>
                  <p className="m-0" style={{ fontFamily: serif, fontSize: 15, color: BODY, lineHeight: 1.65 }}>{r.d}</p>
                </div>
              </a>
            ))}
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
            <a href="/SALMON-Tool.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 no-underline" style={{ fontFamily: sans, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 26px", background: RED, color: "#ffffff" }}>
              <Download size={15} /> Download the tool
            </a>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
