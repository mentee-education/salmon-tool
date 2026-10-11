/*
 * SALMON — Home. Editorial design in the Mentee house course-site language:
 * Playfair Display / Source Serif 4 / DM Sans, warm white, crimson accents,
 * full-bleed imagery with fades, FadeIn reveals.
 */
import { useState } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SalmonButton from "@/components/SalmonButton";
import FadeIn from "@/components/FadeIn";
import { Play } from "lucide-react";

const RED = "#9B2335";
const INK = "#1a1a18";
const WARM = "#fdfcf9";
const SAND = "#E8E3DA";

const HERO_IMG = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/hero-river.png";
const CTA_IMG = "/hero.jpg";

const quickNav = [
  { title: "The Course", desc: "Six short lessons through the framework, at your own pace.", href: "/course" },
  { title: "Read the Tool", desc: "All 24 pages of the printed booklet, page by page.", href: "/tool" },
  { title: "Reflect", desc: "Every guiding question, with space for your own notes.", href: "/reflect" },
  { title: "Resources", desc: "Downloads, findings, films, and links to go deeper.", href: "/resources" },
  { title: "Our Process", desc: "How the community shaped SALMON, step by step.", href: "/process" },
];

const stages = [
  { title: "Spawning — Initiating Growth", desc: "The beginning of the journey: exploring, discovering, and building core skills with support and mentorship close by." },
  { title: "Fry — Emerging Growth", desc: "Finding the flow: gaining independence and actively applying the foundational skills teachers have developed." },
  { title: "Smolt — Sustained Growth", desc: "Consistent, confident practice: adapting fluidly to diverse classroom needs, culturally responsive every day." },
  { title: "Returning Adult — Thriving & Leading", desc: "Mentors and role models who nurture the growth of students and colleagues, completing a full cycle of growth." },
];

const areas = [
  "Stó:lō cultural responsiveness & Halq'eméylem integration",
  "Communication & collaboration with families",
  "Community participation & engagement",
  "Curriculum planning, pacing & learning objectives",
  "Classroom management",
  "Holistic student assessment",
  "Professional development plan",
  "Collaborative leadership",
  "Educator self-care routine",
  "Educator evaluation of administrators",
];

const faqItems = [
  { q: "What is the SALMON Tool?", a: "SALMON — Seabird Assessment for Learning, Mentorship, and Ongoing Nurturing — is a teacher evaluation and growth tool created with the Stó:lō Education Committee at Seabird Island Community School. It replaces verdict-style performance reviews with reflection, feedback, and goals set together." },
  { q: "Who is it for?", a: "Teachers, administrators, and education leaders — especially in First Nations and community schools — who want evaluation to nurture growth, honour culture, and build trust between educators and leadership." },
  { q: "How was it developed?", a: "Through a community-led process: an advisory committee of four respected Stó:lō educators, an environmental scan of local documents, and focus groups with more than 20 educators and staff. Community insights were synthesized into the framework, in close collaboration with those who shaped its vision." },
  { q: "How do I start using it?", a: "Take the short course to learn the framework, read the tool page by page, or open the Reflection Library and sit with the guiding questions. When you're ready, download the PDF and bring it to your next growth conversation." },
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
        {/* ===== HERO ===== */}
        <section className="relative w-full overflow-hidden" style={{ minHeight: "min(88vh, 720px)" }}>
          <div className="absolute inset-0" style={{ backgroundImage: `url(${HERO_IMG})`, backgroundSize: "cover", backgroundPosition: "center 55%" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(15,15,13,0.5) 0%, rgba(15,15,13,0.62) 55%, rgba(15,15,13,0.8) 100%)" }} />
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-5 sm:px-8" style={{ minHeight: "min(88vh, 720px)" }}>
            <FadeIn delay={0.1}>
              <p className="uppercase font-semibold mb-4" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "clamp(10px, 1.2vw, 12px)", letterSpacing: "0.24em", color: "rgba(255,255,255,0.75)" }}>
                An Evaluation Tool for Educational Leaders
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h1 className="font-bold leading-[1.06] mb-5 max-w-[920px] mx-auto" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px, 5.8vw, 68px)", color: "#ffffff" }}>
                Teacher evaluation that nurtures, the way a river raises salmon
              </h1>
            </FadeIn>
            <FadeIn delay={0.32}>
              <p className="mx-auto max-w-[660px] mb-9" style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(15px, 2vw, 19px)", color: "rgba(255,255,255,0.82)", lineHeight: 1.7 }}>
                SALMON — Seabird Assessment for Learning, Mentorship, and Ongoing Nurturing —
                was created with the Stó:lō Education Committee at Seabird Island Community
                School, where growth is a cycle, not a scoreboard.
              </p>
            </FadeIn>
            <FadeIn delay={0.44}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <SalmonButton href="/course">Start the Course</SalmonButton>
                <SalmonButton href="/tool" light>Read the Tool</SalmonButton>
              </div>
            </FadeIn>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-20" style={{ background: `linear-gradient(to bottom, transparent, ${WARM})` }} />
        </section>

        {/* ===== QUICK NAV ===== */}
        <section className="px-4 sm:px-6 py-10 sm:py-14" style={{ backgroundColor: WARM }}>
          <div className="max-w-[1100px] mx-auto">
            <FadeIn>
              <p className="text-center uppercase tracking-[0.2em] mb-8 text-[11px] sm:text-[12px] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", color: RED }}>
                Explore SALMON
              </p>
            </FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5">
              {quickNav.map((r, i) => (
                <FadeIn key={r.title} delay={i * 0.08}>
                  <a href={r.href} className="block h-full no-underline">
                    <div
                      className="text-center p-4 sm:p-5 h-full transition-shadow duration-200 hover:shadow-md flex flex-col"
                      style={{ borderRadius: 2, border: "1px solid #d4cfc6", background: "#ffffff", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                    >
                      <h3 className="mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(14px, 1.4vw, 17px)", fontWeight: 700, color: INK, lineHeight: 1.3 }}>{r.title}</h3>
                      <p className="flex-1" style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(12px, 1.2vw, 14px)", color: "#6b6b65", lineHeight: 1.5 }}>{r.desc}</p>
                    </div>
                  </a>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ABOUT ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: SAND }}>
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
            <FadeIn>
              <div className="flex justify-center">
                <img
                  src="/booklet/p01.jpg"
                  alt="The printed SALMON tool — cover with Stó:lō formline salmon artwork"
                  className="w-full h-auto block"
                  style={{ maxWidth: 400, boxShadow: "0 24px 60px rgba(0,0,0,0.25)", transform: "rotate(-1.5deg)" }}
                />
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div>
                <p className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", color: RED }}>
                  A Real, Working Document
                </p>
                <h2 className="font-bold mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 38px)", color: INK, lineHeight: 1.15 }}>
                  Born at Seabird Island, built to be written in
                </h2>
                <p className="mb-4" style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(15px, 1.6vw, 17px)", color: "#3d3d39", lineHeight: 1.8 }}>
                  SALMON is a 24-page evaluation and nurturing tool educators actually write in.
                  Every area pairs guiding reflection questions with three columns — self-evaluation,
                  administrator feedback, and coactive goal-setting — so growth is a conversation,
                  never a verdict.
                </p>
                <p className="mb-7" style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(15px, 1.6vw, 17px)", color: "#3d3d39", lineHeight: 1.8 }}>
                  It was developed collaboratively with the language and culture team, teachers,
                  educational assistants, and school leadership — grounded in the values the school
                  teaches its students: self-reliance, generosity, honesty, and respect.
                </p>
                <SalmonButton href="/tool">See Inside the Tool</SalmonButton>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== LIFECYCLE ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: WARM }}>
          <div className="max-w-[1100px] mx-auto">
            <FadeIn>
              <div className="text-center mb-10">
                <p className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", color: RED }}>
                  The Lifecycle
                </p>
                <h2 className="font-bold" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 44px)", color: INK }}>
                  Four Stages of Educator Growth
                </h2>
              </div>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {stages.map((p, i) => (
                <FadeIn key={p.title} delay={i * 0.08}>
                  <div className="p-6 h-full" style={{ background: "#ffffff", borderLeft: `4px solid ${RED}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
                    <h3 className="mb-2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px, 1.6vw, 19px)", fontWeight: 700, color: INK, lineHeight: 1.3 }}>{p.title}</h3>
                    <p style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(13px, 1.3vw, 15px)", color: "#5a5a55", lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.2}>
              <div className="text-center mt-9">
                <SalmonButton href="/journey">Explore the Full Journey</SalmonButton>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== WHAT IT ASSESSES ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#5d131e" }}>
          <div className="max-w-[900px] mx-auto text-center">
            <FadeIn>
              <p className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", color: "#e4a1aa" }}>
                Ten Areas, One Framework
              </p>
              <h2 className="font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 44px)", color: "#ffffff" }}>
                What the Tool Assesses
              </h2>
              <p className="mx-auto max-w-[620px] mb-8" style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(15px, 1.6vw, 17px)", color: "rgba(255,255,255,0.6)", lineHeight: 1.7 }}>
                Drawn from what the community said matters — and accountability runs both ways:
                the last area is teachers evaluating their administrators.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-[760px] mx-auto text-left">
              {areas.map((item, i) => (
                <FadeIn key={i} delay={i * 0.04}>
                  <div className="flex items-start gap-3 py-2" style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(14px, 1.5vw, 16px)", color: "rgba(255,255,255,0.86)", lineHeight: 1.6 }}>
                    <span className="shrink-0 mt-0.5" style={{ color: "#e4a1aa", fontSize: "1.1em" }}>&#8594;</span>
                    <span>{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
            <FadeIn delay={0.3}>
              <div className="mt-10">
                <SalmonButton href="/reflect" light>Open the Reflection Library</SalmonButton>
              </div>
            </FadeIn>
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
          <div className="max-w-[700px] mx-auto">
            <FadeIn>
              <p className="text-center uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", color: RED }}>
                Learn More
              </p>
              <h2 className="font-bold text-center mb-8 sm:mb-10" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px, 3.5vw, 44px)", color: INK }}>
                Frequently Asked Questions
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <Accordion items={faqItems} />
            </FadeIn>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="relative w-full overflow-hidden" style={{ minHeight: 560 }}>
          <div className="absolute inset-0" style={{ backgroundImage: `url(${CTA_IMG})`, backgroundSize: "cover", backgroundPosition: "center 35%" }} />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(15,15,13,0.84) 0%, rgba(15,15,13,0.6) 50%, rgba(15,15,13,0.28) 100%)" }} />
          <div className="relative z-10 flex items-center px-5 sm:px-8 py-20" style={{ minHeight: 560 }}>
            <div className="max-w-[1100px] mx-auto w-full">
              <FadeIn>
                <div className="max-w-[560px]">
                  <p className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold" style={{ fontFamily: "'DM Sans', sans-serif", color: "#e4a1aa" }}>
                    Begin the Cycle
                  </p>
                  <h2 className="font-bold mb-5 leading-[1.1]" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 52px)", color: "#ffffff" }}>
                    Let's make evaluation something teachers look forward to.
                  </h2>
                  <p className="mb-7" style={{ fontFamily: "'Source Serif 4', serif", fontSize: "clamp(14px, 1.5vw, 17px)", color: "rgba(255,255,255,0.72)", lineHeight: 1.7 }}>
                    SALMON grew from the voices of more than twenty educators and staff, guided by
                    four respected Stó:lō educators — and it's ready for your school's next growth
                    conversation.
                  </p>
                  <SalmonButton href="/course">Start the Course</SalmonButton>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
