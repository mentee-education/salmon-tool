/*
 * SALMON — The Research. How a school community built its own teacher evaluation framework:
 * who guided it, how voices were gathered, how they were analysed, how findings were checked
 * with the community, and what they became. Facts from the research report (Trent University, 2025).
 */
import { useEffect } from "react";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import SalmonButton from "@/components/SalmonButton";
import FadeIn from "@/components/FadeIn";

const RED = "#9B2335";
const DEEP = "#5d131e";
const INK = "#1a1a18";
const BODY = "#3d3d39";
const MUTED = "#5f5f58";
const WARM = "#fdfcf9";
const SAND = "#efeae1";
const RULE = "#d4cfc6";

const serif = "'Source Serif 4', serif";
const display = "'Playfair Display', serif";
const sans = "'DM Sans', sans-serif";

const glance = [
  { n: "4", t: "Stó:lō educators on the guiding committee" },
  { n: "19", t: "educators and staff interviewed" },
  { n: "4", t: "themes, built from 14 sub-themes" },
  { n: "24", t: "page tool the school uses" },
];

const structure = [
  { k: "Guides", t: "Stó:lō Education Committee", d: "Four respected Stó:lō educators. Shaped the interview questions, kept the work accountable to community values, and reviewed the drafts." },
  { k: "Carries out", t: "Research team", d: "Designed the study with the committee, held the interviews, analysed what people said and wrote it up." },
  { k: "Contribute", t: "Educators, staff, families and Elders", d: "Nineteen educators and staff interviewed one to one, alongside conversations with families and Elders." },
  { k: "Owns the result", t: "Seabird Island Community School", d: "Receives the framework and the tool, and uses them in its growth conversations." },
];

const participants = [
  { role: "Teachers", total: 10, stolo: 5, ind: 3, non: 2 },
  { role: "Educational assistants", total: 7, stolo: 1, ind: 3, non: 3 },
  { role: "Halq'eméylem curriculum developer", total: 1, stolo: 1, ind: 0, non: 0 },
  { role: "Vice-principal", total: 1, stolo: 0, ind: 0, non: 1 },
];

const themes = [
  { n: "1", t: "Fostering a growth mindset and commitment to lifelong learning", subs: ["Embracing a growth mindset", "Formative evaluation for continuous improvement", "Collaborative, unified vision of decolonization and growth", "Reflective practice as a path to growth"] },
  { n: "2", t: "Supportive and transparent evaluation processes", subs: ["Building a culture of support", "Creating transparent expectations", "Effective post-observation feedback"] },
  { n: "3", t: "Effective instruction, classroom management and holistic assessment", subs: ["Classroom management as the foundation of effective instruction", "Purpose-driven instruction and detailed planning", "Holistic and student-centred assessments", "Fostering confidence, engagement and emotional well-being"] },
  { n: "4", t: "Cultural responsiveness, community engagement and family communication", subs: ["Integrating Stó:lō culture and knowledge", "Fostering community engagement", "Building trust and collaborative relationships with families"] },
];

const areas = [
  "Stó:lō cultural responsiveness and Halq'eméylem integration",
  "Communication and collaboration with families",
  "Community participation and engagement",
  "Curriculum planning, pacing and learning objectives",
  "Classroom management",
  "Holistic student assessment",
  "Professional development plan",
  "Collaborative leadership",
  "Educator self-care routine",
  "Educator evaluation of administrators",
];


const GUIDE = [
  { h: "Opening questions", q: [
    "Tell me about how you came to the Seabird Island Community School (SICS).",
    "Do you think that the school culture at Seabird Island Community School has changed since you first started teaching there? If so, how?",
    "Who, if anyone, has been your primary mentor at SICS? Tell me about how they influenced you. How have they been helpful?",
  ] },
  { h: "Assessment, pedagogy and relationship building", q: [
    "How do you assess your students in terms of their knowledge and skills?",
    "How do your students demonstrate a meaningful understanding of the material?",
    "How do you work to support students' growth and success in and out of school?",
    "How do you interact with your students, their families, and their communities?",
  ] },
  { h: "Experiences with teacher evaluation at SICS", q: [
    "How has teaching practice been evaluated in your experience at SICS? What was it like? Do you think it helped you improve your teaching skills? If yes, why do you say that? If no, why do you say that?",
    "What do you think are the most important methods to evaluate teacher performance at SICS?",
    "What criteria should be included in a teacher evaluation at SICS?",
    "Have your views about evaluation changed since you have been evaluated? If so, how?",
  ] },
  { h: "Developing an effective, culturally and community-based teacher evaluation tool", q: [
    "Should teaching evaluations incorporate Stó:lō ways of knowing and teaching? If yes, how can they be incorporated?",
    "Can the ability to link Stó:lō community resources to the lived experiences of students (e.g. bringing in community members to share teachings) be part of teacher evaluation? If yes, how can it be done?",
    "Should community engagement (e.g., participation in community events and activities) be part of teacher evaluations? If yes, how can it be done?",
    "Should interactions with students' families be part of teacher evaluations? If yes, how can they be included? Should teachers be required to co-create expectations with students' families? If yes, how can it be done?",
  ] },
  { h: "Closing questions", q: [
    "What is the most important advice you would give to an administrator conducting evaluations?",
    "Is there anything else that occurred to you during this interview that would help me better understand your experience at SICS?",
    "Is there anything you would like to ask me?",
  ] },
];

const QUESTIONNAIRE = [
  "Position",
  "Do you identify as Stó:lō, Indigenous (non-Stó:lō) or non-Indigenous?",
  "What grades/subjects have you taught at the Seabird Island Community School?",
  "How many years have you taught at the Seabird Island Community School?",
  "Please list 3 dates/times that could potentially work for you to participate in an interview lasting roughly one hour.",
];

const PHASES = [
  "Permission to carry out the research with Seabird Island Community School",
  "A Seabird Island Research Review certificate",
  "Research proposal reviewed and approved at Trent University",
  "Ethics approval from the Trent University Research Ethics Board",
  "Participants identified and interviews booked",
  "Questionnaires and interviews completed",
  "Analysis of what people said",
  "Drafts reviewed by members of the Stó:lō Education Committee, then the final report",
];

const CONSENT = [
  "Taking part was voluntary and involved two steps: a questionnaire of about five minutes and a one-to-one interview of about an hour.",
  "Participants could withdraw at any stage, and anything they had shared would then not be reported.",
  "Participants chose whether the interview was recorded and how they could be quoted, including the option to confirm wording first.",
  "Only the researcher and supervisor reviewed transcripts, and quotes use pseudonyms so comments are not attributable to individuals.",
  "Recordings and data were encrypted, stored securely and set for destruction by April 30, 2025.",
  "Results were shared with the Seabird Island Band and Seabird Island Community School.",
];

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p className="uppercase font-semibold m-0 mb-3" style={{ fontFamily: sans, fontSize: 12, letterSpacing: "0.2em", color: light ? "#f0c4ca" : RED }}>
      {children}
    </p>
  );
}


function Material({ title, note, children }: { title: string; note: string; children: React.ReactNode }) {
  return (
    <details className="group" style={{ borderTop: `1px solid ${RULE}` }}>
      <summary className="flex items-start justify-between gap-6 py-5 cursor-pointer list-none [&::-webkit-details-marker]:hidden">
        <span>
          <span className="block" style={{ fontFamily: display, fontWeight: 700, fontSize: 21, color: INK, lineHeight: 1.3 }}>{title}</span>
          <span className="block mt-1" style={{ fontFamily: serif, fontSize: 15, color: MUTED }}>{note}</span>
        </span>
        <span aria-hidden="true" className="shrink-0 transition-transform duration-200 group-open:rotate-45" style={{ color: RED, fontSize: 26, lineHeight: 1 }}>+</span>
      </summary>
      <div className="pb-8">{children}</div>
    </details>
  );
}

function StepHead({ n, title, lede }: { n: string; title: string; lede: string }) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-5 sm:gap-7 items-start mb-8">
      <div aria-hidden="true" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(40px, 5vw, 60px)", lineHeight: 0.9, color: RED }}>{n}</div>
      <div>
        <h2 className="m-0 mb-3" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(24px, 3vw, 36px)", color: INK, lineHeight: 1.15 }}>
          <span className="sr-only">Step {n}: </span>{title}
        </h2>
        <p className="m-0 max-w-[740px]" style={{ fontFamily: serif, fontSize: "clamp(15px, 1.6vw, 17px)", color: BODY, lineHeight: 1.75 }}>{lede}</p>
      </div>
    </div>
  );
}

function Strip({ items, dark }: { items: { k: string; t: string }[]; dark?: number }) {
  return (
    <ol className={`list-none m-0 p-0 grid grid-cols-1 ${items.length === 4 ? "md:grid-cols-4" : "md:grid-cols-3"}`} style={{ border: `1px solid ${RULE}`, background: "#ffffff" }}>
      {items.map((s, i) => (
        <li key={s.k} className={`p-6 border-[#d4cfc6] ${i ? "border-t md:border-t-0 md:border-l" : ""}`} style={{ background: dark === i ? DEEP : undefined }}>
          <p className="m-0 mb-2 uppercase" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", color: dark === i ? "#f0c4ca" : RED }}>{s.k}</p>
          <p className="m-0" style={{ fontFamily: serif, fontSize: 16, color: dark === i ? "#ffffff" : INK, lineHeight: 1.55, fontWeight: dark === i ? 600 : 400 }}>{s.t}</p>
        </li>
      ))}
    </ol>
  );
}

const th: React.CSSProperties = { fontFamily: sans, fontWeight: 700, color: "#ffffff", background: DEEP, textAlign: "left", verticalAlign: "bottom", lineHeight: 1.35 };
const td: React.CSSProperties = { fontFamily: serif, color: BODY, borderBottom: `1px solid ${RULE}`, lineHeight: 1.4 };

export default function Research() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: WARM }}>
      <SiteHeader />
      <main className="flex-1">
        {/* ===== HEADER ===== */}
        <section className="px-4 sm:px-6 pt-14 sm:pt-20 pb-14" style={{ backgroundColor: WARM }}>
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 items-center">
            <div>
              <Eyebrow>The research</Eyebrow>
              <h1 className="m-0 mb-5" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(34px, 5vw, 56px)", color: INK, lineHeight: 1.06 }}>
                How a school community built its own way to evaluate teachers
              </h1>
              <p className="m-0 mb-4" style={{ fontFamily: serif, fontSize: "clamp(16px, 1.8vw, 19px)", color: BODY, lineHeight: 1.75 }}>
                Seabird Island Community School wanted to rethink how its teachers were evaluated and build a
                framework that reflects the community&rsquo;s own values. The research asked one question: what does
                effective teaching, and fair evaluation of it, look like here?
              </p>
              <p className="m-0" style={{ fontFamily: serif, fontSize: "clamp(16px, 1.8vw, 19px)", color: BODY, lineHeight: 1.75 }}>
                The answer came from the people closest to the school. This page walks through who guided the work,
                how voices were gathered, how they were analysed, how findings were checked with the community, and
                what they became.
              </p>
            </div>
            <dl className="grid grid-cols-2 m-0" style={{ border: `1px solid ${RULE}`, background: "#ffffff" }}>
              {glance.map((g, i) => (
                <div key={g.t} className="p-5 sm:p-6" style={{ borderRight: i % 2 === 0 ? `1px solid ${RULE}` : undefined, borderBottom: i < 2 ? `1px solid ${RULE}` : undefined }}>
                  <dt className="sr-only">{g.t}</dt>
                  <dd className="m-0">
                    <span className="block" style={{ fontFamily: display, fontWeight: 800, fontSize: "clamp(38px, 4.4vw, 52px)", color: RED, lineHeight: 1 }}>{g.n}</span>
                    <span className="block mt-2" style={{ fontFamily: serif, fontSize: 15, color: BODY, lineHeight: 1.45 }}>{g.t}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* ===== STRUCTURE ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: SAND }}>
          <div className="max-w-[1100px] mx-auto">
            <Eyebrow>Structure</Eyebrow>
            <h2 className="m-0 mb-3" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 40px)", color: INK, lineHeight: 1.15 }}>Who did what</h2>
            <p className="m-0 mb-9 max-w-[720px]" style={{ fontFamily: serif, fontSize: 17, color: BODY, lineHeight: 1.75 }}>
              The community set the direction and checked the result. The research team did the work in between.
            </p>
            <ol className="list-none m-0 p-0 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-7">
              {structure.map((s, i) => (
                <li key={s.t} className="relative flex">
                  <div className="flex-1 p-6" style={{ background: i === 0 ? DEEP : "#ffffff", border: `1px solid ${i === 0 ? DEEP : RULE}` }}>
                    <p className="m-0 mb-2 uppercase" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", color: i === 0 ? "#f0c4ca" : RED }}>{String(i + 1).padStart(2, "0")} &middot; {s.k}</p>
                    <h3 className="m-0 mb-3" style={{ fontFamily: display, fontWeight: 700, fontSize: 20, lineHeight: 1.25, color: i === 0 ? "#ffffff" : INK }}>{s.t}</h3>
                    <p className="m-0" style={{ fontFamily: serif, fontSize: 15, lineHeight: 1.65, color: i === 0 ? "rgba(255,255,255,0.9)" : BODY }}>{s.d}</p>
                  </div>
                  {i < 3 && (
                    <span aria-hidden="true" className="hidden md:flex absolute items-center justify-center" style={{ right: -21, top: "50%", transform: "translateY(-50%)", width: 28, height: 28, borderRadius: "50%", background: RED, color: "#fff", fontSize: 15, zIndex: 2 }}>&#8594;</span>
                  )}
                </li>
              ))}
            </ol>
            <p className="m-0 mt-7 max-w-[860px]" style={{ fontFamily: serif, fontSize: 15, color: MUTED, lineHeight: 1.7 }}>
              The work was framed by relational accountability (Wilson, 2008) and ethical space (Ermine, 2007): the research
              answers to the relationships it depends on, and different ways of knowing meet on equal terms.
            </p>
          </div>
        </section>

        {/* ===== STEPS ===== */}
        <section className="px-4 sm:px-6 pt-14 sm:pt-20 pb-6 sm:pb-8" style={{ backgroundColor: WARM }}>
          <div className="max-w-[1100px] mx-auto">
            <Eyebrow>Process</Eyebrow>

            <StepHead n="01" title="Guidance from the community" lede="The Stó:lō Education Committee guided the project from the start. Its members reviewed and shaped the interview prompts so the questions matched Stó:lō ways of knowing and teaching. The team also reviewed local policies, evaluation tools, websites and strategic plans to see what existing evaluation covered and what it missed." />
            <div className="mb-16">
              <Strip items={[
                { k: "Interview guide, part 1", t: "Assessment, teaching and relationship building" },
                { k: "Interview guide, part 2", t: "Experiences with teacher evaluation at the school" },
                { k: "Interview guide, part 3", t: "What an effective, culturally grounded evaluation tool should include" },
              ]} />
            </div>

            <StepHead n="02" title="Gathering voices" lede="Every educator with at least one year at the school was invited by email. Those who took part gave consent, filled in a short background form and sat for a one-to-one, semi-structured interview, most held online during COVID-19 and one in person. The guide was not shared in advance, so answers were people's own rather than rehearsed. Families and Elders were part of the conversation too." />
            <div className="mb-16" style={{ border: `1px solid ${RULE}`, background: "#ffffff" }}>
              <table className="w-full" style={{ borderCollapse: "collapse" }}>
                <caption className="text-left px-3 py-4 sm:px-4" style={{ fontFamily: sans, fontSize: 14, fontWeight: 700, color: INK, captionSide: "top" }}>
                  Interviewed: 19 people, by role and identity
                </caption>
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

            <StepHead n="03" title="Making sense of what people said" lede="Transcribing and coding began while the interviews were still under way, so each conversation informed the next. The codes were mapped visually to see how ideas connected, grouped into fourteen sub-themes, and then into four themes. Every theme can be traced back to the words of the people interviewed." />
            <div className="mb-8">
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
                  <h3 className="m-0 mb-4" style={{ fontFamily: display, fontWeight: 700, fontSize: 20, lineHeight: 1.3, color: INK }}>{t.t}</h3>
                  <ul className="m-0 p-0 list-none">
                    {t.subs.map((s) => (
                      <li key={s} className="py-2" style={{ fontFamily: serif, fontSize: 15, color: BODY, borderTop: `1px solid ${RULE}` }}>{s}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <StepHead n="04" title="Checking it with the community" lede="Findings were not final until the community had seen them. Members of the Stó:lō Education Committee reviewed the drafts, so the themes and the framework were checked against Stó:lō educators' own understanding before they were finished." />
            <div className="mb-16">
              <Strip dark={2} items={[
                { k: "Draft", t: "Themes and framework written up from the interviews" },
                { k: "Review", t: "Committee members read the drafts and responded" },
                { k: "Final", t: "The framework and the 24-page tool the school uses" },
              ]} />
            </div>

            <StepHead n="05" title="What it became" lede="The four themes became the SALMON tool: ten areas educators reflect on, four lifecycle stages that describe growth, and three columns on every page for self-evaluation, administrator feedback and goals set together. Accountability runs both ways: the last area is teachers evaluating their administrators." />
          </div>
        </section>

        {/* ===== TOOL BAND ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: DEEP }}>
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10 lg:gap-14 items-center">
            <img src="/booklet/p01.jpg" alt="Cover of the printed SALMON tool, with Stó:lō formline salmon artwork" width={850} height={1100} className="w-full h-auto block mx-auto" style={{ maxWidth: 300, boxShadow: "0 24px 60px rgba(0,0,0,0.35)" }} />
            <div>
              <Eyebrow light>The ten areas of the tool</Eyebrow>
              <ol className="m-0 p-0 list-none grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                {areas.map((a, i) => (
                  <li key={a} className="flex gap-3 py-2.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.2)", fontFamily: serif, fontSize: 16, color: "rgba(255,255,255,0.94)", lineHeight: 1.5 }}>
                    <span style={{ fontFamily: display, fontWeight: 700, color: "#f0c4ca", minWidth: 22 }}>{i + 1}</span>
                    <span>{a}</span>
                  </li>
                ))}
              </ol>
              <div className="flex flex-wrap gap-4 mt-8">
                <SalmonButton href="/tool" light>Read the tool</SalmonButton>
                <SalmonButton href="/journey" light>See the growth journey</SalmonButton>
              </div>
            </div>
          </div>
        </section>

        {/* ===== RESEARCH MATERIALS ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: WARM }}>
          <div className="max-w-[1100px] mx-auto">
            <Eyebrow>Research materials</Eyebrow>
            <h2 className="m-0 mb-3" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(26px, 3.4vw, 40px)", color: INK, lineHeight: 1.15 }}>The questions and the process, in full</h2>
            <p className="m-0 mb-8 max-w-[760px]" style={{ fontFamily: serif, fontSize: 17, color: BODY, lineHeight: 1.75 }}>
              The instruments behind the findings, as used. Consent forms, names and transcripts stay private.
            </p>
            <div style={{ borderBottom: `1px solid ${RULE}` }}>
              <Material title="Interview guide" note="Eighteen questions: opening and closing questions around the three main parts, reviewed and shaped by the Stó:lō Education Committee">
                {(() => { let n = 0; return GUIDE.map((g) => (
                  <div key={g.h} className="mb-6">
                    <h3 className="m-0 mb-3" style={{ fontFamily: sans, fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: RED }}>{g.h}</h3>
                    <ol className="m-0 p-0 list-none">
                      {g.q.map((q) => { n += 1; return (
                        <li key={q} className="grid grid-cols-[34px_1fr] gap-2 py-2.5" style={{ borderTop: `1px solid ${RULE}`, fontFamily: serif, fontSize: 16, color: INK, lineHeight: 1.6 }}>
                          <span style={{ fontFamily: display, fontWeight: 700, color: RED }}>{n}</span><span>{q}</span>
                        </li>
                      ); })}
                    </ol>
                  </div>
                )); })()}
              </Material>
              <Material title="Pre-interview questionnaire" note="A short background form returned before each interview, used to schedule interviews and confirm at least one year at the school">
                <ol className="m-0 p-0 list-none">
                  {QUESTIONNAIRE.map((q, i) => (
                    <li key={q} className="grid grid-cols-[34px_1fr] gap-2 py-2.5" style={{ borderTop: `1px solid ${RULE}`, fontFamily: serif, fontSize: 16, color: INK, lineHeight: 1.6 }}>
                      <span style={{ fontFamily: display, fontWeight: 700, color: RED }}>{i + 1}</span><span>{q}</span>
                    </li>
                  ))}
                </ol>
              </Material>
              <Material title="Recruitment and consent" note="How educators were invited, and what they agreed to">
                <p className="m-0 mb-4" style={{ fontFamily: serif, fontSize: 16, color: BODY, lineHeight: 1.7 }}>
                  Educators were first contacted by email. The researcher then visited the school in person to hand out
                  consent forms and questionnaires together, and two committee members delivered and collected them for
                  anyone not there that day.
                </p>
                <ul className="m-0 p-0 list-none">
                  {CONSENT.map((c) => (
                    <li key={c} className="py-2.5" style={{ borderTop: `1px solid ${RULE}`, fontFamily: serif, fontSize: 16, color: INK, lineHeight: 1.6 }}>{c}</li>
                  ))}
                </ul>
              </Material>
              <Material title="Approvals and phases" note="Community permission came first, then university ethics approval">
                <ol className="m-0 p-0 list-none">
                  {PHASES.map((p, i) => (
                    <li key={p} className="grid grid-cols-[34px_1fr] gap-2 py-2.5" style={{ borderTop: `1px solid ${RULE}`, fontFamily: serif, fontSize: 16, color: INK, lineHeight: 1.6 }}>
                      <span style={{ fontFamily: display, fontWeight: 700, color: RED }}>{i + 1}</span><span>{p}</span>
                    </li>
                  ))}
                </ol>
              </Material>
              <Material title="Themes and sub-themes" note="The full coding structure: four themes, fourteen sub-themes">
                <div className="overflow-hidden" style={{ border: `1px solid ${RULE}` }}>
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
              </Material>
            </div>
          </div>
        </section>

        {/* ===== REPORT ===== */}
        <section className="px-4 sm:px-6 py-12" style={{ backgroundColor: SAND }}>
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-center">
            <div>
              <Eyebrow>Research report</Eyebrow>
              <p className="m-0" style={{ fontFamily: serif, fontSize: 17, color: BODY, lineHeight: 1.7 }}>
                <em>Totí:lthometel: Weaving Educators&rsquo; Perspectives into a Teacher Evaluation Tool at Seabird Island
                Community School</em> (Trent University, 2025). The full report, including the detailed coding tables behind each theme, is available on request.
              </p>
            </div>
            <SalmonButton href="/SALMON-Tool.pdf" external>Download the tool (PDF)</SalmonButton>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
