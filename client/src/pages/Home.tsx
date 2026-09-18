/*
 * Home Page — Deep Water & Copper design (theme-aware)
 * Sections: Hero, SALMON acronym (compact), Cycle diagram + Stage cards, Process Steps, Video/School, CTA
 */
import { useEffect, useRef } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight, ChevronDown } from "lucide-react";

const HERO_IMG = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/hero-river.png";
const ARTWORK_IMG = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/salmon-circle.png";
const EGGS_IMG = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/salmon-eggs.png";
const FRY_IMG = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/salmon-fry.png";
const SMOLT_IMG = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/salmon-smolt.png";
const ADULT_IMG = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/salmon-adult.png";

const stages = [
  {
    number: "01",
    name: "Spawning",
    subtitle: "Initiating Growth",
    description:
      "The very beginning of a teacher's growth journey. Like salmon eggs full of potential, teachers in this stage are laying the foundation for future development — exploring, discovering, and building core skills.",
    image: EGGS_IMG,
    angle: -45,
  },
  {
    number: "02",
    name: "Fry",
    subtitle: "Emerging Growth",
    description:
      "Teachers are starting to find their flow. Like young salmon navigating a stream, they are gaining independence and actively applying the foundational skills they've developed.",
    image: FRY_IMG,
    angle: 45,
  },
  {
    number: "03",
    name: "Smolt",
    subtitle: "Sustained Growth",
    description:
      "Consistent and sustained growth. Teachers confidently apply their skills, adapt fluidly to diverse classroom needs, and are culturally responsive in their daily practices.",
    image: SMOLT_IMG,
    angle: 135,
  },
  {
    number: "04",
    name: "Returning Adult",
    subtitle: "Thriving & Leading",
    description:
      "Teachers who are thriving in their roles and leading within their school and community — mentors, role models, and leaders who nurture the growth of students and colleagues.",
    image: ADULT_IMG,
    angle: -135,
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

// Positions for the 4 cycle nodes (top, right, bottom, left)
const cyclePositions = [
  { top: "0%", left: "50%", transform: "translate(-50%, 0)", label: "top" },
  { top: "50%", left: "100%", transform: "translate(-100%, -50%)", label: "right" },
  { top: "100%", left: "50%", transform: "translate(-50%, -100%)", label: "bottom" },
  { top: "50%", left: "0%", transform: "translate(0, -50%)", label: "left" },
];

export default function Home() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = revealRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.08 }
    );
    el.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--section-main)" }}>
      <Navbar />

      {/* ── HERO — PDF-matched: deep crimson left + artwork right ── */}
      <section className="relative overflow-hidden" style={{ background: "oklch(0.22 0.10 15)" }}>
        {/* Subtle concentric circle motif behind artwork, like PDF cover */}
        <div className="absolute inset-0 flex items-center justify-end pointer-events-none" style={{ overflow: "hidden" }}>
          <div className="relative" style={{ width: "55vw", height: "55vw", maxWidth: 700, maxHeight: 700, marginRight: "-8vw" }}>
            <div className="absolute inset-0 rounded-full" style={{ background: "oklch(0.28 0.10 15)", opacity: 0.7 }} />
            <div className="absolute rounded-full" style={{ inset: "8%", background: "oklch(0.32 0.09 15)", opacity: 0.5 }} />
          </div>
        </div>

        {/* Formline border strip on right edge — matches PDF */}
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
          <div className="flex flex-col lg:flex-row items-center min-h-screen gap-0">

            {/* LEFT: text panel */}
            <div className="flex-1 py-28 lg:py-0 pr-0 lg:pr-12 flex flex-col justify-center">
              <div
                className="text-xs uppercase tracking-widest mb-5"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.72 0.07 70)", letterSpacing: "0.22em" }}
              >
                An Evaluation Tool for Educational Leaders
              </div>

              {/* Big bold SALMON: title matching PDF */}
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
                className="mb-8"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
                  fontWeight: 400,
                  color: "oklch(0.92 0.02 80)",
                  lineHeight: 1.3,
                  letterSpacing: "0.01em",
                }}
              >
                Seabird Assessment for Learning,<br />
                Mentorship, and Ongoing Nurturing
              </h1>

              <p
                className="text-base leading-relaxed mb-10 max-w-lg"
                style={{ fontFamily: "'Lora', serif", color: "oklch(0.80 0.03 80)" }}
              >
                A community-informed teacher evaluation model created in collaboration
                with the Stó:lō Education Committee. Grounded in relational accountability,
                this process reflects Indigenous values, stakeholder voices, and local knowledge.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/process">
                  <span
                    className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:opacity-90"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: "oklch(0.55 0.18 15)",
                      color: "oklch(0.97 0.01 80)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    Explore the Process <ArrowRight size={15} />
                  </span>
                </Link>
                <a
                  href="https://salmontool.com/wp-content/uploads/2025/06/SALMON-Sample.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium transition-all duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    border: "1px solid oklch(0.97 0.01 80 / 0.45)",
                    color: "oklch(0.97 0.01 80)",
                    letterSpacing: "0.06em",
                  }}
                >
                  View the SALMON Tool
                </a>
              </div>
            </div>

            {/* RIGHT: artwork in circular frame */}
            <div className="flex-1 flex items-center justify-center py-16 lg:py-24">
              <div
                className="relative rounded-full overflow-hidden shadow-2xl"
                style={{
                  width: "clamp(280px, 38vw, 520px)",
                  height: "clamp(280px, 38vw, 520px)",
                  border: "4px solid oklch(0.55 0.18 15)",
                  boxShadow: "0 0 0 12px oklch(0.32 0.10 15), 0 20px 60px oklch(0 0 0 / 0.5)",
                }}
              >
                <img
                  src={ARTWORK_IMG}
                  alt="Sockeye salmon swimming together during the spawning run"
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>

          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <ChevronDown size={20} style={{ color: "oklch(0.97 0.01 80 / 0.5)" }} />
        </div>
      </section>

      <div ref={revealRef}>
        {/* ── ACRONYM BREAKDOWN — compact ── */}
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

            {/* Compact 6-column row */}
            <div className="reveal grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-px" style={{ background: "oklch(from var(--crimson-mid) l c h / 0.12)" }}>
              {acronym.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center text-center py-6 px-3 gap-2"
                  style={{
                    background: "var(--card-bg)",
                    transitionDelay: `${i * 60}ms`,
                  }}
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

        {/* ── FOUR STAGES — Cycle diagram + cards ── */}
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

            {/* ── Circular lifecycle diagram ──

              ViewBox: 1200 × 900
              Oval centre: cx=600, cy=450
              Oval radii: rx=340 (wide), ry=200 (short)

              Node centres (exactly on the ellipse perimeter):
                Spawning (top):         600, 250   (cy - ry)
                Fry (right):            940, 450   (cx + rx)
                Smolt (bottom):         600, 650   (cy + ry)
                Returning Adult (left): 260, 450   (cx - rx)

              Image circle r=82. Border = 3px. Effective outer edge = 85.

              Label clearance (all text starts/ends 20px beyond the outer edge):
                Spawning above:   top edge = 250-85=165. Labels at y ≤ 130.
                Fry right:        right edge = 940+85=1025. Labels at x ≥ 1045.
                Smolt below:      bottom edge = 650+85=735. Labels at y ≥ 755.
                Returning Adult left: left edge = 260-85=175. Labels at x ≤ 155.

              Arc arrows — SVG elliptical arc (A command) following the oval ring.
              Each arc starts and ends 100px (arc-length) away from node centres.
              We use parametric angle offsets on the ellipse:
                ellipse point at angle θ: x = 600 + 340*cos(θ), y = 450 + 200*sin(θ)

              Node angles: top=270°, right=0°, bottom=90°, left=180°

              Arrow gap ≈ 17° from each node (gives ~100px clearance on the oval).

              T→R arc: start at 287°, end at 343° (clockwise, short arc)
                start: 600+340*cos(287°), 450+200*sin(287°) = 699, 260
                end:   600+340*cos(343°), 450+200*sin(343°) = 925, 390

              R→B arc: start at 17°, end at 73°
                start: 600+340*cos(17°), 450+200*sin(17°) = 925, 508
                end:   600+340*cos(73°), 450+200*sin(73°) = 699, 641

              B→L arc: start at 107°, end at 163°
                start: 600+340*cos(107°), 450+200*sin(107°) = 501, 641
                end:   600+340*cos(163°), 450+200*sin(163°) = 275, 508

              L→T arc: start at 197°, end at 253°
                start: 600+340*cos(197°), 450+200*sin(197°) = 275, 392
                end:   600+340*cos(253°), 450+200*sin(253°) = 501, 259
            */}
            <div className="reveal mb-16">
              <div className="flex justify-center">
                <div className="w-full" style={{ maxWidth: "1100px" }}>
                  <svg
                    viewBox="0 0 1200 900"
                    className="w-full h-auto"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <marker id="arr" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto">
                        <path d="M0 0 L10 5 L0 10 Z" fill="var(--crimson-mid)" />
                      </marker>
                      <clipPath id="clip0"><circle cx="600" cy="250" r="82" /></clipPath>
                      <clipPath id="clip1"><circle cx="940" cy="450" r="82" /></clipPath>
                      <clipPath id="clip2"><circle cx="600" cy="650" r="82" /></clipPath>
                      <clipPath id="clip3"><circle cx="260" cy="450" r="82" /></clipPath>
                    </defs>

                    {/* Oval ring */}
                    <ellipse cx="600" cy="450" rx="340" ry="200"
                      stroke="var(--crimson-mid)" strokeWidth="1.5" opacity="0.25" fill="none" />

                    {/* Arc arrows — proper SVG elliptical arcs hugging the oval */}
                    {/* T→R: 287° → 343° clockwise */}
                    <path d="M 699,260 A 340,200 0 0,1 925,390"
                      stroke="var(--crimson-mid)" strokeWidth="2" strokeLinecap="round"
                      opacity="0.85" markerEnd="url(#arr)" />
                    {/* R→B: 17° → 73° clockwise */}
                    <path d="M 925,508 A 340,200 0 0,1 699,641"
                      stroke="var(--crimson-mid)" strokeWidth="2" strokeLinecap="round"
                      opacity="0.85" markerEnd="url(#arr)" />
                    {/* B→L: 107° → 163° clockwise */}
                    <path d="M 501,641 A 340,200 0 0,1 275,508"
                      stroke="var(--crimson-mid)" strokeWidth="2" strokeLinecap="round"
                      opacity="0.85" markerEnd="url(#arr)" />
                    {/* L→T: 197° → 253° clockwise */}
                    <path d="M 275,392 A 340,200 0 0,1 501,259"
                      stroke="var(--crimson-mid)" strokeWidth="2" strokeLinecap="round"
                      opacity="0.85" markerEnd="url(#arr)" />

                    {/* Stage images — drawn ON TOP of arrows */}
                    <image href={EGGS_IMG}  x="518" y="168" width="164" height="164" clipPath="url(#clip0)" preserveAspectRatio="xMidYMid slice" />
                    <circle cx="600" cy="250" r="82" stroke="var(--crimson-mid)" strokeWidth="3" fill="none" />

                    <image href={FRY_IMG}   x="858" y="368" width="164" height="164" clipPath="url(#clip1)" preserveAspectRatio="xMidYMid slice" />
                    <circle cx="940" cy="450" r="82" stroke="var(--crimson-mid)" strokeWidth="3" fill="none" />

                    <image href={SMOLT_IMG} x="518" y="568" width="164" height="164" clipPath="url(#clip2)" preserveAspectRatio="xMidYMid slice" />
                    <circle cx="600" cy="650" r="82" stroke="var(--crimson-mid)" strokeWidth="3" fill="none" />

                    <image href={ADULT_IMG} x="178" y="368" width="164" height="164" clipPath="url(#clip3)" preserveAspectRatio="xMidYMid slice" />
                    <circle cx="260" cy="450" r="82" stroke="var(--crimson-mid)" strokeWidth="3" fill="none" />

                    {/* Centre label */}
                    <text x="600" y="432" textAnchor="middle"
                      fontFamily="'Cormorant Garamond', serif" fontSize="24" fontStyle="italic"
                      fill="var(--crimson-mid)" opacity="0.7">Educator</text>
                    <text x="600" y="462" textAnchor="middle"
                      fontFamily="'Cormorant Garamond', serif" fontSize="24" fontStyle="italic"
                      fill="var(--crimson-mid)" opacity="0.7">Growth</text>
                    <text x="600" y="486" textAnchor="middle"
                      fontFamily="'Cormorant Garamond', serif" fontSize="15"
                      fill="var(--crimson-mid)" opacity="0.35">Cycle</text>

                    {/* SPAWNING — above node. Top edge = 250-85=165. All text ≤ y=130. */}
                    <text x="600" y="40" textAnchor="middle"
                      fontFamily="'DM Sans', sans-serif" fontSize="13" letterSpacing="4"
                      fill="var(--crimson-mid)" opacity="0.8">01</text>
                    <text x="600" y="78" textAnchor="middle"
                      fontFamily="'Cormorant Garamond', serif" fontSize="34" fontWeight="500"
                      fill="var(--text-heading)">Spawning</text>
                    <text x="600" y="106" textAnchor="middle"
                      fontFamily="'DM Sans', sans-serif" fontSize="13"
                      fill="var(--text-muted)">Initiating Growth</text>

                    {/* FRY — right of node. Right edge = 940+85=1025. Text at x ≥ 1048. */}
                    <text x="1050" y="436" textAnchor="start"
                      fontFamily="'DM Sans', sans-serif" fontSize="13" letterSpacing="4"
                      fill="var(--crimson-mid)" opacity="0.8">02</text>
                    <text x="1050" y="474" textAnchor="start"
                      fontFamily="'Cormorant Garamond', serif" fontSize="34" fontWeight="500"
                      fill="var(--text-heading)">Fry</text>
                    <text x="1050" y="502" textAnchor="start"
                      fontFamily="'DM Sans', sans-serif" fontSize="13"
                      fill="var(--text-muted)">Emerging Growth</text>

                    {/* SMOLT — below node. Bottom edge = 650+85=735. Text at y ≥ 758. */}
                    <text x="600" y="758" textAnchor="middle"
                      fontFamily="'DM Sans', sans-serif" fontSize="13" letterSpacing="4"
                      fill="var(--crimson-mid)" opacity="0.8">03</text>
                    <text x="600" y="796" textAnchor="middle"
                      fontFamily="'Cormorant Garamond', serif" fontSize="34" fontWeight="500"
                      fill="var(--text-heading)">Smolt</text>
                    <text x="600" y="824" textAnchor="middle"
                      fontFamily="'DM Sans', sans-serif" fontSize="13"
                      fill="var(--text-muted)">Sustained Growth</text>

                    {/* RETURNING ADULT — left of node. Left edge = 260-85=175. Text at x ≤ 152. */}
                    <text x="150" y="428" textAnchor="end"
                      fontFamily="'DM Sans', sans-serif" fontSize="13" letterSpacing="4"
                      fill="var(--crimson-mid)" opacity="0.8">04</text>
                    <text x="150" y="464" textAnchor="end"
                      fontFamily="'Cormorant Garamond', serif" fontSize="34" fontWeight="500"
                      fill="var(--text-heading)">Returning</text>
                    <text x="150" y="502" textAnchor="end"
                      fontFamily="'Cormorant Garamond', serif" fontSize="34" fontWeight="500"
                      fill="var(--text-heading)">Adult</text>
                    <text x="150" y="534" textAnchor="end"
                      fontFamily="'DM Sans', sans-serif" fontSize="13"
                      fill="var(--text-muted)">Thriving &amp; Leading</text>
                  </svg>
                </div>
              </div>
            </div>

            {/* Stage detail cards below the diagram */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {stages.map((stage, i) => (
                <div
                  key={i}
                  className="reveal group relative overflow-hidden"
                  style={{
                    transitionDelay: `${i * 100}ms`,
                    border: "1px solid var(--card-border)",
                  }}
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
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 300,
                        color: "oklch(0.97 0.01 80 / 0.25)",
                      }}
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
                    <p
                      className="text-sm leading-relaxed"
                      style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
                    >
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
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

        {/* ── PROCESS STEPS ── */}
        <section className="py-24" style={{ background: "var(--section-alt)" }}>
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
              <p
                className="mt-4 max-w-xl text-base leading-relaxed"
                style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
              >
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
                  <div
                    key={i}
                    className="reveal md:pl-20 relative"
                    style={{ transitionDelay: `${i * 120}ms` }}
                  >
                    <div
                      className="hidden md:flex absolute left-0 top-0 w-12 h-12 items-center justify-center text-sm font-medium"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        background: "var(--section-alt)",
                        border: "1px solid oklch(from var(--crimson-mid) l c h / 0.5)",
                        color: "var(--crimson-mid)",
                        borderRadius: "50%",
                      }}
                    >
                      {step.num}
                    </div>
                    <div
                      className="p-6"
                      style={{
                        background: "var(--card-bg)",
                        border: "1px solid var(--card-border)",
                      }}
                    >
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
                      <p
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
                      >
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

        {/* ── SCHOOL / VIDEO SECTION ── */}
        <section className="py-24 relative overflow-hidden" style={{ background: "var(--section-main)" }}>
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="reveal">
                  <div
                    className="text-xs uppercase tracking-widest mb-4"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}
                  >
                    Where SALMON Spawned
                  </div>
                  <h2
                    className="leading-tight mb-6"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      fontWeight: 400,
                      color: "var(--text-heading)",
                    }}
                  >
                    Rooted at Seabird Island Community School
                  </h2>
                  <p
                    className="text-base leading-relaxed mb-5"
                    style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
                  >
                    The SALMON Tool was born from a deep commitment to the Stó:lō community.
                    Seabird Island Community School provided the living context — a place where
                    relationships between educators, students, families, and the land are
                    inseparable from the act of teaching.
                  </p>
                  <p
                    className="text-base leading-relaxed"
                    style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
                  >
                    This work is about more than tools or policies — it's about connection,
                    community, and care.
                  </p>
                </div>
              </div>

              <div className="reveal">
                <div
                  className="relative overflow-hidden"
                  style={{ border: "1px solid var(--card-border)" }}
                >
                  <div className="aspect-video">
                    <iframe
                      src="https://www.youtube.com/embed/H3yrPfDtOWQ"
                      title="Seabird Island Community School"
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ display: "block" }}
                    />
                  </div>
                  <div
                    className="px-5 py-3 text-xs"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      background: "var(--card-bg)",
                      color: "var(--text-muted)",
                      borderTop: "1px solid var(--card-border)",
                    }}
                  >
                    Seabird Island Community School — Seabird Island Band
                  </div>
                </div>
              </div>
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
                <em style={{ color: "var(--primary)", fontStyle: "italic" }}>SALMON</em>{" "}
                framework?
              </h2>
              <p
                className="text-base leading-relaxed mb-10"
                style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
              >
                Download the sample evaluation tool and see how the SALMON framework
                can support culturally responsive educator growth in your community.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://salmontool.com/wp-content/uploads/2025/06/SALMON-Sample.pdf"
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
