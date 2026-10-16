/*
 * SALMON — Home. A community research project at Seabird Island Community School:
 * the question, who guided it, how voices were gathered and analysed, what was found,
 * and the tool it became. Playfair Display / Source Serif 4 / DM Sans, warm white, crimson.
 */
import { useState } from "react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SalmonButton from "@/components/SalmonButton";
import FadeIn from "@/components/FadeIn";
import Lifecycle from "@/components/Lifecycle";
import { Play } from "lucide-react";

const RED = "#9B2335";
const DEEP = "#5d131e";
const INK = "#1a1a18";
const BODY = "#3d3d39";
const WARM = "#fdfcf9";
const SAND = "#efeae1";
const RULE = "#d4cfc6";
const serif = "'Source Serif 4', serif";
const display = "'Playfair Display', serif";
const sans = "'DM Sans', sans-serif";

const glance = [
  { n: "4", t: "Stó:lō educators guiding the work" },
  { n: "19", t: "educators and staff interviewed" },
  { n: "14", t: "sub-themes drawn from their words" },
  { n: "4", t: "themes that became the tool" },
];

const steps = [
  { n: "01", t: "Guidance", d: "The Stó:lō Education Committee shaped the questions and kept the work accountable to community values." },
  { n: "02", t: "Gathering", d: "One-to-one interviews with nineteen educators and staff, alongside families and Elders." },
  { n: "03", t: "Analysis", d: "Interviews were coded as they happened, then grouped into fourteen sub-themes and four themes." },
  { n: "04", t: "Checking back", d: "Committee members reviewed the drafts before anything was final." },
  { n: "05", t: "The tool", d: "A 24-page framework the school uses for growth conversations." },
];

const themes = [
  { n: "1", t: "Growth mindset and lifelong learning", d: "Educators asked for evaluation that helps them keep learning: frequent, formative and reflective." },
  { n: "2", t: "Supportive and transparent evaluation", d: "Clear expectations, a culture of support and useful feedback after every observation." },
  { n: "3", t: "Instruction, classroom management and holistic assessment", d: "Purposeful planning and assessment that sees the whole student, including confidence and well-being." },
  { n: "4", t: "Culture, community and families", d: "Stó:lō culture and knowledge inside the criteria, and trust built with families and the community." },
];

const faqItems = [
  { q: "What is SALMON?", a: "SALMON stands for Seabird Assessment for Learning, Mentorship and Ongoing Nurturing. It is a teacher evaluation and growth framework built with the Stó:lō Education Committee and the educators of Seabird Island Community School. It replaces verdict-style reviews with reflection, feedback and goals set together." },
  { q: "Who shaped it?", a: "Four respected Stó:lō educators on the Stó:lō Education Committee guided the work and reviewed the drafts. Nineteen educators and staff were interviewed one to one: ten teachers, seven educational assistants, the Halq'eméylem curriculum developer and the vice-principal. Families and Elders were part of the conversation too." },
  { q: "How were the findings reached?", a: "Interviews were transcribed and coded as they happened, the codes were mapped to see how ideas connected, and they were grouped into fourteen sub-themes and four themes. Each theme can be traced back to what people said." },
  { q: "Can another school use it?", a: "The framework belongs to Seabird Island Community School and reflects Stó:lō values. Other schools can read it, and download the tool, as an example of how a community can build evaluation around its own values." },
];

function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div style={{ borderTop: "1px solid #d4cfc6" }}>
      {items.map((item, i) => (
        <div key={i} style={{ borderBottom: "1px solid #d4cfc6" }}>
          <button
            type="button"
            onClick={() => setOpen(open === i ? null : i)}
            aria-expanded={open === i}
            className="w-full flex items-center justify-between gap-4 text-left cursor-pointer"
            style={{ background: "none", border: 0, padding: "20px 4px" }}
          >
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(16px, 1.8vw, 19px)", color: INK }}>{item.q}</span>
            <span style={{ color: RED, fontSize: 22, lineHeight: 1, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
          </button>
          {open === i && (
            <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(14px, 1.5vw, 16px)", color: "#3d3d39", lineHeight: 1.8, padding: "0 4px 22px", margin: 0 }}>
              {item.a}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function Film({ id, title, credit }: { id: string; title: string; credit: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="m-0 h-full flex flex-col" style={{ background: "#ffffff", border: "1px solid #d4cfc6", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
      <div className="relative aspect-video overflow-hidden">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}?autoplay=1`}
            title={title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ display: "block", border: 0 }}
          />
        ) : (
          <button type="button" onClick={() => setPlaying(true)} aria-label={`Play: ${title}`} className="group block w-full h-full relative cursor-pointer" style={{ border: 0, padding: 0, background: "none" }}>
            <img
              src={`https://i.ytimg.com/vi/${id}/maxresdefault.jpg`}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`; }}
              alt=""
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              loading="lazy"
            />
            <span className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(15,15,13,0.5), transparent 55%)" }} />
            <span
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-110"
              style={{ width: 62, height: 62, background: "rgba(155,35,53,0.95)", boxShadow: "0 8px 30px rgba(0,0,0,0.35)" }}
            >
              <Play size={22} fill="white" color="white" style={{ marginLeft: 3 }} />
            </span>
          </button>
        )}
      </div>
      <figcaption className="px-5 py-4 flex-1">
        <div style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: INK, marginBottom: 4 }}>{title}</div>
        <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: RED, letterSpacing: "0.05em" }}>{credit}</div>
      </figcaption>
    </figure>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: WARM }}>
      <SiteHeader />

      <main className="flex-1">
        {/* ===== HERO (text beside the photo, never on it) ===== */}
        <section className="px-4 sm:px-6 pt-10 sm:pt-14 pb-12 sm:pb-16" style={{ backgroundColor: WARM }}>
          <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-8 lg:gap-12 items-center">
            <div>
              <p className="uppercase font-semibold m-0 mb-4" style={{ fontFamily: sans, fontSize: 12, letterSpacing: "0.22em", color: RED }}>
                Community research &middot; Seabird Island Community School
              </p>
              <h1 className="m-0 mb-5" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(34px, 4.6vw, 56px)", color: INK, lineHeight: 1.06 }}>
                A school community rebuilt teacher evaluation around its own values
              </h1>
              <p className="m-0 mb-7" style={{ fontFamily: serif, fontSize: "clamp(16px, 1.8vw, 19px)", color: BODY, lineHeight: 1.75 }}>
                SALMON (Seabird Assessment for Learning, Mentorship and Ongoing Nurturing) is the result: a framework
                guided by the Stó:lō Education Committee, built from the voices of the school&rsquo;s educators, staff,
                families and Elders, and used by the school today.
              </p>
              <div className="flex flex-wrap gap-4">
                <SalmonButton href="/research">See how it was built</SalmonButton>
                <Link href="/tool"><span className="inline-block" style={{ fontFamily: sans, fontSize: "0.78rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", padding: "14px 30px", color: RED, border: `1px solid ${RED}`, cursor: "pointer" }}>Read the tool</span></Link>
              </div>
            </div>
            <figure className="m-0">
              <img src="/hero.jpg" alt="Students and staff in a drum circle in the Seabird Island Community School gym" width={1920} height={1080} className="w-full h-auto block" style={{ boxShadow: "0 18px 50px rgba(0,0,0,0.16)" }} />
              <figcaption className="mt-2" style={{ fontFamily: sans, fontSize: 12, color: "#5f5f58" }}>Seabird Island Community School. Still from the school film.</figcaption>
            </figure>
          </div>
        </section>

        {/* ===== AT A GLANCE ===== */}
        <section className="px-4 sm:px-6 pb-14" style={{ backgroundColor: WARM }}>
          <dl className="max-w-[1180px] mx-auto grid grid-cols-2 md:grid-cols-4 m-0" style={{ borderTop: `2px solid ${INK}` }}>
            {glance.map((g, i) => (
              <div key={g.t} className={`py-6 pr-4 border-[#d4cfc6] ${i % 2 === 1 ? "border-l pl-5" : i === 2 ? "pl-0 md:border-l md:pl-5" : "pl-0"} ${i >= 2 ? "border-t md:border-t-0" : ""}`}>
                <dt className="sr-only">{g.t}</dt>
                <dd className="m-0">
                  <span className="block" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(40px, 5vw, 60px)", color: RED, lineHeight: 1 }}>{g.n}</span>
                  <span className="block mt-2" style={{ fontFamily: serif, fontSize: 15, color: BODY, lineHeight: 1.45 }}>{g.t}</span>
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* ===== PROCESS ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: SAND }}>
          <div className="max-w-[1180px] mx-auto">
            <p className="uppercase font-semibold m-0 mb-3" style={{ fontFamily: sans, fontSize: 12, letterSpacing: "0.2em", color: RED }}>How it was built</p>
            <h2 className="m-0 mb-9 max-w-[760px]" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 42px)", color: INK, lineHeight: 1.15 }}>
              Five steps, each one led or checked by the community
            </h2>
            <ol className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5" style={{ border: `1px solid ${RULE}`, background: "#ffffff" }}>
              {steps.map((s, i) => (
                <li key={s.n} className="p-6" style={{ borderTop: i ? `1px solid ${RULE}` : undefined, borderLeft: `1px solid ${RULE}`, marginLeft: -1, marginTop: i ? -1 : 0 }}>
                  <span aria-hidden="true" className="block mb-3" style={{ fontFamily: display, fontWeight: 800, fontSize: 32, color: RED, lineHeight: 1 }}>{s.n}</span>
                  <h3 className="m-0 mb-2" style={{ fontFamily: display, fontWeight: 700, fontSize: 19, color: INK }}>{s.t}</h3>
                  <p className="m-0" style={{ fontFamily: serif, fontSize: 15, color: BODY, lineHeight: 1.6 }}>{s.d}</p>
                </li>
              ))}
            </ol>
            <div className="mt-8">
              <SalmonButton href="/research">Walk through the research</SalmonButton>
            </div>
          </div>
        </section>

        {/* ===== FINDINGS ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: WARM }}>
          <div className="max-w-[1180px] mx-auto">
            <p className="uppercase font-semibold m-0 mb-3" style={{ fontFamily: sans, fontSize: 12, letterSpacing: "0.2em", color: RED }}>What people said</p>
            <h2 className="m-0 mb-9 max-w-[760px]" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 42px)", color: INK, lineHeight: 1.15 }}>
              Four themes from the interviews
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {themes.map((t) => (
                <div key={t.n} className="p-6 h-full" style={{ background: "#ffffff", border: `1px solid ${RULE}`, borderLeft: `4px solid ${RED}` }}>
                  <p className="m-0 mb-1 uppercase" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: RED }}>Theme {t.n}</p>
                  <h3 className="m-0 mb-2" style={{ fontFamily: display, fontWeight: 700, fontSize: 20, color: INK, lineHeight: 1.3 }}>{t.t}</h3>
                  <p className="m-0" style={{ fontFamily: serif, fontSize: 15, color: BODY, lineHeight: 1.65 }}>{t.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== LIFECYCLE ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: SAND }}>
          <div className="max-w-[1180px] mx-auto">
            <p className="uppercase font-semibold m-0 mb-3" style={{ fontFamily: sans, fontSize: 12, letterSpacing: "0.2em", color: RED }}>The growth cycle</p>
            <h2 className="m-0 mb-9 max-w-[760px]" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 42px)", color: INK, lineHeight: 1.15 }}>
              Four stages of educator growth, named for the salmon
            </h2>
            <Lifecycle linkTo="/journey" />
            <div className="mt-8">
              <SalmonButton href="/journey">Explore the full journey</SalmonButton>
            </div>
          </div>
        </section>

        {/* ===== THE TOOL ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: DEEP }}>
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[300px_1fr] gap-10 md:gap-14 items-center">
            <img src="/booklet/p01.jpg" alt="Cover of the printed SALMON tool, with Stó:lō formline salmon artwork" width={850} height={1100} className="w-full h-auto block mx-auto" style={{ maxWidth: 300, boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }} />
            <div>
              <p className="uppercase font-semibold m-0 mb-3" style={{ fontFamily: sans, fontSize: 12, letterSpacing: "0.2em", color: "#f0c4ca" }}>What it became</p>
              <h2 className="m-0 mb-5" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(26px, 3.2vw, 40px)", color: "#ffffff", lineHeight: 1.15 }}>
                A 24-page tool educators write in
              </h2>
              <p className="m-0 mb-4" style={{ fontFamily: serif, fontSize: 17, color: "rgba(255,255,255,0.9)", lineHeight: 1.75 }}>
                Ten areas, each with guiding questions and three columns: self-evaluation, administrator feedback and
                goals set together. Accountability runs both ways: the last area is teachers evaluating their administrators.
              </p>
              <p className="m-0 mb-7" style={{ fontFamily: serif, fontSize: 17, color: "rgba(255,255,255,0.9)", lineHeight: 1.75 }}>
                It is grounded in the values the school teaches its students: self-reliance, generosity, honesty and respect.
              </p>
              <div className="flex flex-wrap gap-4">
                <SalmonButton href="/tool" light>Read the tool</SalmonButton>
                <SalmonButton href="/reflect" light>Open the guiding questions</SalmonButton>
              </div>
            </div>
          </div>
        </section>

        {/* ===== FILMS ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: WARM }}>
          <div className="max-w-[1100px] mx-auto">
            <FadeIn>
              <div className="text-center mb-10">
                <p className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", color: RED }}>
                  From the Community
                </p>
                <h2 className="font-bold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 44px)", color: INK }}>
                  The School Behind the Framework
                </h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
              <FadeIn className="h-full">
                <Film id="EP5b48Weyrc" title="Seabird Island Community School" credit="Produced by Jason Bruce" />
              </FadeIn>
              <FadeIn delay={0.12} className="h-full">
                <Film id="H3yrPfDtOWQ" title="FOR OUR CULTURE" credit="N'we Jinan Artists · recorded at Seabird Island Community School" />
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===== FAQ ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: SAND }}>
          <div className="max-w-[760px] mx-auto">
            <h2 className="m-0 mb-8" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 40px)", color: INK }}>
              Questions about the research
            </h2>
            <Accordion items={faqItems} />
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
