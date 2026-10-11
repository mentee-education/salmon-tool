// CourseOverview - COO Branding - DISTINCT from homepage
// Full-width hero with learning circle image, left-aligned layout, different structure
// Colors: Red #9B2335, warm white #fdfcf9, sand #E0DFD9, ink #1a1a18
// Fonts: Playfair Display (headings), Source Serif 4 (body), DM Sans (UI)

import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import FntButton from "@/components/FntButton";
import FntAccordion from "@/components/FntAccordion";
import { useState, useEffect, useRef } from "react";
import { X, Download } from "lucide-react";

const COURSE_HERO = "/hero.jpg";
const COURSE_ABOUT = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/hero-river.png";

const whyTakeItems = [
  {
    title: "Evaluation That Nurtures",
    content:
      "SALMON replaces verdict-style performance reviews with a growth conversation. Each lesson teaches a piece of the framework — the lifecycle stages, the guiding reflection questions, the three columns of self-evaluation, administrator feedback, and coactive goal-setting — so you leave knowing how to run an evaluation that educators look forward to.",
  },
  {
    title: "Culture Inside the Criteria",
    content:
      "Stó:lō cultural responsiveness and Halq'eméylem integration are assessed areas of the tool, not add-ons. The program shows how culture, family collaboration, and community engagement became evaluation criteria — and how your school can honour its own community's knowledge the same way.",
  },
  {
    title: "Accountability Both Ways",
    content:
      "SALMON's quiet signature: teachers also evaluate how well administrators facilitate the process. The program walks through reciprocal evaluation — transparency, fairness, and growth in both directions — and the trust it builds between classrooms and leadership.",
  },
];

const faqItems = [
  {
    title: "How is the program structured and how do I work through it?",
    content:
      "Three modules, ten short lessons, fully self-paced. Each module opens with an overview, goes deep on part of the framework with the tool's real content and films from the school, and closes with activities you can use alone or with a colleague. Five foundation topics sit alongside whenever you want to go deeper, and your progress is saved on your device.",
  },
  {
    title: "Who is this program designed for and who will benefit most?",
    content:
      "Teachers, principals, education directors, and school boards — especially in First Nations and community schools — who want teacher evaluation to nurture growth, honour culture, and build trust. It also serves anyone studying culturally responsive evaluation design.",
  },
  {
    title: "Who developed this program and what informed its design?",
    content:
      (<span>SALMON was created with the Stó:lō Education Committee at Seabird Island Community School, and this program was developed by <a href="https://mentee.ca" target="_blank" rel="noopener noreferrer" style={{ color: "#9B2335", textDecoration: "underline" }}>Mentee</a>. Its design reflects the tool itself: culturally grounded practice, relationship-based learning, and growth as a cycle rather than a scoreboard.</span>),
  },
  {
    title: "What shaped the program content?",
    content:
      "A community-led process at Seabird Island Community School: an advisory committee of four respected Stó:lō educators, an environmental scan of local documents, and focus groups with more than twenty educators and staff. Every lesson in this program traces back to the tool those voices shaped.",
  },
];

const modules = [
  { num: "01", title: "The River's Teaching", desc: "The lifecycle: four stages of educator growth", lessons: 3 },
  { num: "02", title: "The Conversation", desc: "The five moves that turn a page into dialogue", lessons: 3 },
  { num: "03", title: "Growing Together", desc: "Craft, leadership, and goals set together", lessons: 3 },
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, visible } = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

const PDF_URL = "/SALMON-Tool.pdf";

export default function CourseOverview() {
  const [showPdfPreview, setShowPdfPreview] = useState(false);

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#fdfcf9" }}>
      <SiteHeader />

      {/* PDF Preview Modal */}
      {showPdfPreview && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.85)" }}
          onClick={() => setShowPdfPreview(false)}
        >
          <div
            className="relative w-[95vw] h-[92vh] max-w-[1100px] flex flex-col rounded-sm overflow-hidden"
            style={{ backgroundColor: "#1a1a18" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-5 py-3" style={{ backgroundColor: "#252520", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
              <h3 className="text-white text-sm font-bold uppercase tracking-wider" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                The SALMON Tool
              </h3>
              <div className="flex items-center gap-3">
                <a
                  href={PDF_URL}
                  download="SALMON Tool.pdf"
                  className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-white border border-white/30 transition-all hover:bg-white hover:text-[#1a1a18] rounded-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif" }}
                >
                  <Download className="w-3.5 h-3.5" />
                  Download
                </a>
                <button
                  onClick={() => setShowPdfPreview(false)}
                  className="text-white/60 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            {/* PDF preview via Google Docs Viewer */}
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
                <div className="text-white/40 text-sm" style={{ fontFamily: "'DM Sans', sans-serif" }}>Loading preview...</div>
              </div>
              <iframe
                src={`https://docs.google.com/gview?url=${encodeURIComponent(PDF_URL)}&embedded=true`}
                className="w-full h-full relative"
                title="The SALMON Tool"
                style={{ border: "none", zIndex: 2 }}
              />
            </div>
          </div>
        </div>
      )}

      <main className="flex-1">
        {/* ===== HERO — Full-width image, LEFT-aligned text ===== */}
        <section
          className="relative w-full overflow-hidden"
          style={{ minHeight: "min(70vh, 560px)" }}
        >
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url(${COURSE_HERO})`,
              backgroundSize: "cover",
              backgroundPosition: "center 38%",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to right, rgba(15,15,13,0.88) 0%, rgba(15,15,13,0.72) 45%, rgba(15,15,13,0.4) 100%)",
            }}
          />
          <div className="relative z-10 flex items-center px-5 sm:px-8" style={{ minHeight: "min(70vh, 560px)" }}>
            <div className="max-w-[1100px] mx-auto w-full">
              <FadeIn>
                <div className="max-w-[560px]">
                  <p
                    className="uppercase tracking-[0.2em] mb-3 text-[11px] sm:text-[13px] font-semibold"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "#e8a0a3" }}
                  >
                    Seabird Island &middot; Online Program
                  </p>
                  <h1
                    className="font-bold leading-[1.08] mb-5"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "clamp(28px, 5vw, 52px)",
                      color: "#ffffff",
                    }}
                  >
                    Learn SALMON, the way it was meant to be learned
                  </h1>
                  <p
                    className="mb-7"
                    style={{
                      fontFamily: "'Source Serif 4', serif",
                      fontSize: "clamp(15px, 1.8vw, 18px)",
                      color: "rgba(255,255,255,0.75)",
                      lineHeight: 1.7,
                    }}
                  >
                    A self-paced program for educators and school leaders: the salmon lifecycle, the growth conversation at the heart of the tool, and every assessed area — with activities you can bring to your school tomorrow.
                  </p>
                  <div className="flex flex-wrap items-center gap-4">
                    <FntButton href="/course/lessons">
                      BEGIN THE JOURNEY
                    </FntButton>
                    <button
                      onClick={() => setShowPdfPreview(true)}
                      className="inline-flex items-center gap-2 px-8 py-3.5 font-bold text-sm uppercase tracking-wider border-2 border-white text-white transition-all duration-200 hover:bg-white hover:text-[#1a1a18] cursor-pointer"
                      style={{ fontFamily: "'DM Sans', sans-serif", borderRadius: 2 }}
                    >
                      READ THE SALMON TOOL
                    </button>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "13px",
                        color: "rgba(255,255,255,0.5)",
                      }}
                    >
                      3 Modules &middot; 10 Lessons &middot; Self-Paced
                    </span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* ===== MODULE OVERVIEW — Horizontal cards ===== */}
        <section className="px-4 sm:px-6 py-12 sm:py-16" style={{ backgroundColor: "#fdfcf9" }}>
          <div className="max-w-[1200px] mx-auto">
            <FadeIn>
              <p
                className="text-center uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#9B2335" }}
              >
                Program Structure
              </p>
              <h2
                className="font-bold text-center mb-3"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 3vw, 38px)",
                  color: "#1a1a18",
                }}
              >
                Three Modules, One Cycle
              </h2>
              <p
                className="text-center mx-auto max-w-[600px] mb-10"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: "clamp(14px, 1.5vw, 16px)",
                  color: "#6b6b65",
                  lineHeight: 1.7,
                }}
              >
                A self-paced program with ten lessons, five foundation topics, and activities for your own practice.
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
              {modules.map((m, i) => (
                <FadeIn key={m.num} delay={i * 0.08}>
                  <div
                    className="relative p-5 sm:p-6 h-full flex flex-col"
                    style={{
                      backgroundColor: "#ffffff",
                      borderTop: "4px solid #9B2335",
                      boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
                      borderRadius: 2,
                      minHeight: 180,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 32,
                        fontWeight: 800,
                        color: "rgba(187,10,18,0.1)",
                        lineHeight: 1,
                        marginBottom: 8,
                      }}
                    >
                      {m.num}
                    </span>
                    <h3
                      className="mb-2"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(16px, 1.6vw, 19px)",
                        fontWeight: 700,
                        color: "#1a1a18",
                        lineHeight: 1.3,
                      }}
                    >
                      {m.title}
                    </h3>
                    <p
                      className="flex-1"
                      style={{
                        fontFamily: "'Source Serif 4', serif",
                        fontSize: "clamp(13px, 1.3vw, 15px)",
                        color: "#6b6b65",
                        lineHeight: 1.6,
                      }}
                    >
                      {m.desc}
                    </p>
                    <span
                      className="inline-block mt-3"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: "12px",
                        color: "#9a9a90",
                        fontWeight: 500,
                      }}
                    >
                      {m.lessons} lessons
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== ABOUT — Image RIGHT, text LEFT (opposite of homepage) ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#E0DFD9" }}>
          <div className="max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center">
            <FadeIn>
              <div>
                <p
                  className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "#9B2335" }}
                >
                  About This Program
                </p>
                <h2
                  className="font-bold mb-5"
                  style={{
                    fontFamily: "'Playfair Display', serif",
                    fontSize: "clamp(24px, 3vw, 38px)",
                    color: "#1a1a18",
                    lineHeight: 1.15,
                  }}
                >
                  Grounded in Story, Built for Practice
                </h2>
                <p
                  className="mb-5"
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: "clamp(15px, 1.6vw, 17px)",
                    color: "#3d3d39",
                    lineHeight: 1.8,
                  }}
                >
                  This stand-alone program teaches the SALMON evaluation framework from the inside: where it came from, how the lifecycle stages work, and how the growth conversation unfolds on every page of the tool.
                </p>
                <p
                  style={{
                    fontFamily: "'Source Serif 4', serif",
                    fontSize: "clamp(15px, 1.6vw, 17px)",
                    color: "#3d3d39",
                    lineHeight: 1.8,
                  }}
                >
                  Each module opens with an overview, goes deep with the tool's real content — including films made at Seabird Island Community School — and closes with ready-to-use activities that bring the framework into your own practice.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="overflow-hidden" style={{ borderRadius: 4 }}>
                <img
                  src={COURSE_ABOUT}
                  alt="The Fraser River valley at dusk — the waters that raised the framework"
                  className="w-full h-auto block"
                  style={{ aspectRatio: "4/3", objectFit: "cover", objectPosition: "center 55%" }}
                />
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ===== WHY TAKE THIS COURSE — Full-width with accordion ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#fdfcf9" }}>
          <div className="max-w-[800px] mx-auto">
            <FadeIn>
              <p
                className="text-center uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#9B2335" }}
              >
                Why This Matters
              </p>
              <h2
                className="font-bold text-center mb-8"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 3vw, 38px)",
                  color: "#1a1a18",
                }}
              >
                Practical Tools, Deeper Understanding
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <FntAccordion items={whyTakeItems} />
            </FadeIn>
          </div>
        </section>

        {/* ===== WHAT YOU'LL LEARN — Deep red section ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#5d131e" }}>
          <div className="max-w-[900px] mx-auto text-center">
            <FadeIn>
              <p
                className="uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#e8a0a3" }}
              >
                What You'll Explore
              </p>
              <h2
                className="font-bold mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(26px, 3.5vw, 44px)",
                  color: "#ffffff",
                }}
              >
                What You'll Learn
              </h2>
              <p
                className="mx-auto max-w-[600px] mb-8"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: "clamp(15px, 1.6vw, 17px)",
                  color: "rgba(255,255,255,0.6)",
                  lineHeight: 1.7,
                }}
              >
                Across three modules, you will explore:
              </p>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-[700px] mx-auto text-left">
              {[
                "The salmon lifecycle as a map of educator growth",
                "Guiding reflection questions that open real conversations",
                "Self-evaluation, feedback, and coactive goal-setting",
                "Culture and language inside the evaluation criteria",
                "Family collaboration and community engagement",
                "Holistic assessment and classroom craft",
                "Leadership, professional growth, and self-care",
                "Reciprocal evaluation: feedback that flows both ways",
              ].map((item, i) => (
                <FadeIn key={i} delay={i * 0.05}>
                  <div
                    className="flex items-start gap-3 py-2"
                    style={{
                      fontFamily: "'Source Serif 4', serif",
                      fontSize: "clamp(14px, 1.5vw, 16px)",
                      color: "rgba(255,255,255,0.85)",
                      lineHeight: 1.6,
                    }}
                  >
                    <span className="shrink-0 mt-0.5" style={{ color: "#e8a0a3", fontSize: "1.1em" }}>&#8594;</span>
                    <span>{item}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FAQs ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#fdfcf9" }}>
          <div className="max-w-[700px] mx-auto">
            <FadeIn>
              <p
                className="text-center uppercase tracking-[0.2em] mb-2 text-[11px] sm:text-[12px] font-semibold"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "#9B2335" }}
              >
                Questions
              </p>
              <h2
                className="font-bold text-center mb-8 sm:mb-10"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(26px, 3.5vw, 44px)",
                  color: "#1a1a18",
                }}
              >
                Frequently Asked
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <FntAccordion items={faqItems} />
            </FadeIn>
          </div>
        </section>

        {/* ===== CTA — Clean, sand background (no image — different from homepage) ===== */}
        <section className="px-4 sm:px-6 py-14 sm:py-20" style={{ backgroundColor: "#E0DFD9" }}>
          <div className="max-w-[700px] mx-auto text-center">
            <FadeIn>
              <h2
                className="font-bold mb-4"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "clamp(24px, 3.5vw, 40px)",
                  color: "#1a1a18",
                }}
              >
                Ready to Begin?
              </h2>
              <p
                className="mx-auto max-w-[550px] mb-8"
                style={{
                  fontFamily: "'Source Serif 4', serif",
                  fontSize: "clamp(15px, 1.6vw, 17px)",
                  color: "#5a5a55",
                  lineHeight: 1.7,
                }}
              >
                Start the program and explore five modules of story-based learning, practical activities, and tools for supporting First Nations learners.
              </p>
              <FntButton href="/course/lessons">
                BEGIN THE JOURNEY
              </FntButton>
            </FadeIn>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
