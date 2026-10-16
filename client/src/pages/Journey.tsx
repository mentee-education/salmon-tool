/*
 * SALMON — The growth journey. The four lifecycle stages educators and administrators use to name
 * where someone is, each with its qualities, plus the Stó:lō Education Committee who guided the work.
 * Illustrations are watercolour studies of real salmon life stages (R2: salmon-tool/lifecycle).
 */
import { useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SalmonButton from "@/components/SalmonButton";
import Lifecycle, { STAGES } from "@/components/Lifecycle";

const RED = "#9B2335";
const INK = "#1a1a18";
const BODY = "#3d3d39";
const MUTED = "#5f5f58";
const WARM = "#fdfcf9";
const SAND = "#efeae1";
const RULE = "#d4cfc6";
const serif = "'Source Serif 4', serif";
const display = "'Playfair Display', serif";
const sans = "'DM Sans', sans-serif";

const DETAIL: Record<string, { text: string[]; qualities: string[] }> = {
  spawning: {
    text: [
      "Like salmon eggs full of potential, educators at this stage are laying the foundation: building core skills and starting to bring new strategies and cultural knowledge into their practice.",
      "The focus is on nurturing early efforts through support, mentorship and growing confidence.",
    ],
    qualities: ["Exploration and discovery", "Building core skills", "Bringing in cultural knowledge", "Mentorship and support"],
  },
  fry: {
    text: [
      "Like young salmon finding their way in the stream, educators are gaining independence and applying the skills they have built, with emerging confidence.",
      "The focus is on showing progress and adapting to new challenges, with support and feedback close by.",
    ],
    qualities: ["Gaining independence", "Applying foundational skills", "Emerging confidence", "Adapting to challenges"],
  },
  smolt: {
    text: [
      "Educators apply their skills with confidence, adapt to the needs of every classroom and are culturally responsive in daily practice.",
      "Like smolt moving into deeper water, they are ready for wider responsibility, with chances to lead and collaborate.",
    ],
    qualities: ["Confident practice", "Cultural responsiveness", "Leadership opportunities", "Collaborative practice"],
  },
  "returning-adult": {
    text: [
      "Educators are thriving and leading in their school and community. Like salmon returning to home waters, they have completed a full cycle of growth.",
      "They give back as mentors and role models, nurturing the growth of students and colleagues, and the cycle begins again.",
    ],
    qualities: ["Community leadership", "Mentoring others", "Deep cultural connection", "A full cycle of growth"],
  },
};

const COMMITTEE = [
  { name: "Siyámíya (Dianna) Kay", role: "Language Curriculum Developer" },
  { name: "Kweláxtelot (Karla) Kay", role: "Language Vitalist" },
  { name: "Saylesh Wesley", role: "First Nations Resource Enhancement Teacher" },
  { name: "Camielle Laslo", role: "Halq'eméylem Teacher" },
];

export default function Journey() {
  useEffect(() => {
    if (window.location.hash) document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
    else window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: WARM }}>
      <SiteHeader />
      <main className="flex-1">
        {/* ===== HEADER ===== */}
        <section className="px-4 sm:px-6 pt-14 sm:pt-20 pb-10" style={{ backgroundColor: WARM }}>
          <div className="max-w-[1180px] mx-auto">
            <p className="uppercase font-semibold m-0 mb-3" style={{ fontFamily: sans, fontSize: 12, letterSpacing: "0.2em", color: RED }}>The growth journey</p>
            <h1 className="m-0 mb-5 max-w-[860px]" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(34px, 5vw, 56px)", color: INK, lineHeight: 1.06 }}>
              Four stages of educator growth, named for the salmon
            </h1>
            <p className="m-0 max-w-[760px]" style={{ fontFamily: serif, fontSize: "clamp(16px, 1.8vw, 19px)", color: BODY, lineHeight: 1.75 }}>
              Educators asked for evaluation that helps them keep growing rather than a verdict. The salmon lifecycle
              gives educators and administrators shared words for where someone is and where they are heading, and it
              honours returning, mentoring and beginning again.
            </p>
          </div>
        </section>

        {/* ===== CYCLE ===== */}
        <section className="px-4 sm:px-6 py-12 sm:py-16" style={{ backgroundColor: SAND }}>
          <div className="max-w-[1180px] mx-auto">
            <Lifecycle bg={SAND} />
          </div>
        </section>

        {/* ===== STAGES IN DETAIL ===== */}
        {STAGES.map((s, i) => (
          <section key={s.id} id={s.id} className="px-4 sm:px-6 py-14 sm:py-16 scroll-mt-20" style={{ backgroundColor: i % 2 ? SAND : WARM }}>
            <div className="max-w-[1180px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
              <figure className={`m-0 ${i % 2 ? "lg:order-2" : ""}`}>
                <img src={s.img} alt={s.alt} width={1600} height={1020} loading="lazy" className="w-full h-auto block" style={{ border: `1px solid ${RULE}` }} />
              </figure>
              <div>
                <p className="m-0 mb-2 uppercase" style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.16em", color: RED }}>Stage {s.n} &middot; {s.sub}</p>
                <h2 className="m-0 mb-5" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(30px, 4vw, 46px)", color: INK, lineHeight: 1.05 }}>{s.name}</h2>
                {DETAIL[s.id].text.map((p) => (
                  <p key={p} className="m-0 mb-4" style={{ fontFamily: serif, fontSize: 17, color: BODY, lineHeight: 1.75 }}>{p}</p>
                ))}
                <p className="m-0 mt-6 mb-2" style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, color: INK }}>Qualities at this stage</p>
                <ul className="m-0 p-0 list-none">
                  {DETAIL[s.id].qualities.map((q) => (
                    <li key={q} className="py-2" style={{ fontFamily: serif, fontSize: 15.5, color: INK, borderTop: `1px solid ${RULE}` }}>{q}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        ))}

        {/* ===== COMMITTEE ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: WARM }}>
          <div className="max-w-[1180px] mx-auto">
            <p className="uppercase font-semibold m-0 mb-3" style={{ fontFamily: sans, fontSize: 12, letterSpacing: "0.2em", color: RED }}>Guiding the journey</p>
            <h2 className="m-0 mb-4" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 40px)", color: INK, lineHeight: 1.15 }}>The Stó:lō Education Committee</h2>
            <p className="m-0 mb-8 max-w-[760px]" style={{ fontFamily: serif, fontSize: 17, color: BODY, lineHeight: 1.75 }}>
              Four respected Stó:lō educators guided the work from the start. They shaped the interview questions,
              kept the project accountable to community values and reviewed the drafts before anything was final.
            </p>
            <ul className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ border: `1px solid ${RULE}`, background: "#ffffff" }}>
              {COMMITTEE.map((c, i) => (
                <li key={c.name} className={`p-6 border-[#d4cfc6] ${i ? "border-t sm:border-t-0" : ""} ${i % 2 ? "sm:border-l" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}>
                  <p className="m-0 mb-1" style={{ fontFamily: display, fontWeight: 700, fontSize: 19, color: INK, lineHeight: 1.3 }}>{c.name}</p>
                  <p className="m-0" style={{ fontFamily: serif, fontSize: 15, color: MUTED }}>{c.role}</p>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <SalmonButton href="/research">See how the research was done</SalmonButton>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
