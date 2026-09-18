/*
 * Process Page — Deep Water & Copper design (theme-aware)
 * Shows the four community-led steps of SALMON Tool development
 */
import { useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";

const HERO_IMG = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/hero-river.png";

const steps = [
  {
    num: "01",
    title: "Forming the Community Committee",
    subtitle: "Building the Circle of Guidance",
    body: [
      "The foundation of this study was rooted in deep relationships — with people, with place, and with the teachings carried by those who have long served their communities.",
      "We formed a community advisory group, including the Stó:lō Education Committee, to guide the process and ground the project in local values and relational accountability. The committee included four respected Stó:lō educators: Siyámíya (Dianna) Kay, Kweláxtelot (Karla) Kay, Saylesh Wesley, and Camielle Laslo.",
      "Their guidance was particularly crucial during the early development of the study. The interview prompts and guiding questions were carefully reviewed and shaped by the SEC to ensure alignment with Stó:lō ways of knowing and teaching.",
    ],
    highlight: "This ensured the process would honour the voices of local educators and remain accountable to the values of the community.",
  },
  {
    num: "02",
    title: "Environmental Scan",
    subtitle: "Understanding the Landscape",
    body: [
      "With committee guidance, we reviewed local documents — policies, evaluation tools, websites, and strategic plans — to understand current practices and surface key themes.",
      "The environmental scan was not merely a literature review. It was a deliberate effort to understand the existing ecosystem of educator support and evaluation within the Stó:lō territory, identifying both what was present and what was missing.",
      "This phase helped us understand the gap between existing evaluation frameworks and the culturally grounded, relational approach the community envisioned.",
    ],
    highlight: "The scan revealed that most existing tools lacked the cultural responsiveness and relational accountability central to Stó:lō educational values.",
  },
  {
    num: "03",
    title: "Community Interviews",
    subtitle: "Listening to the Voices That Matter",
    body: [
      "Using scan findings, we developed culturally grounded interview guides, then held focus groups with over 20 educators and staff to understand what matters in evaluation.",
      "The interview process was designed to be relational, not extractive. Conversations were held in spaces of trust, guided by questions that honoured the expertise and lived experience of participants.",
      "Educators shared what meaningful growth looks like in their context, what support they needed, and how evaluation could become a tool for empowerment rather than judgment.",
    ],
    highlight: "Over 20 educators and staff contributed their voices, ensuring the resulting framework reflected the full breadth of the community's wisdom.",
  },
  {
    num: "04",
    title: "Co-Creation of the SALMON Tool",
    subtitle: "Synthesizing Wisdom into Framework",
    body: [
      "Community insights were synthesized into a strengths-based framework for teacher evaluation, built in close collaboration with those who contributed to its vision.",
      "The SALMON acronym — Seabird Assessment for Learning, Mentorship & Ongoing Nurturing — emerged from this process. The salmon lifecycle became the organizing metaphor: a journey of growth, challenge, and return that resonates deeply within Stó:lō culture.",
      "The resulting tool is not a checklist or a compliance document. It is a living framework for conversation, growth, and relational accountability between educators, leaders, and community.",
    ],
    highlight: "The SALMON Tool is a living framework — designed to grow and evolve alongside the educators and communities it serves.",
  },
];

export default function Process() {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--section-main)" }}>
      <Navbar />

      {/* Page header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${HERO_IMG})` }}
        />
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(to bottom, var(--section-alt), var(--section-main))" }}
        />
        <div className="container relative z-10">
          <div
            className="text-xs uppercase tracking-widest mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}
          >
            How It Was Built
          </div>
          <h1
            className="leading-none mb-6"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              fontWeight: 300,
              color: "var(--text-heading)",
            }}
          >
            Our<br />
            <em style={{ color: "var(--crimson-mid)", fontStyle: "italic" }}>Community-Led</em><br />
            Process
          </h1>
          <p
            className="max-w-xl text-base leading-relaxed"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
          >
            The SALMON Tool was not designed in isolation. Every step of its development
            was guided by the voices, knowledge, and values of the Stó:lō community.
            This is the story of how it came to be.
          </p>
        </div>
      </section>

      <div ref={revealRef}>
        {steps.map((step, i) => (
          <section
            key={i}
            className="py-20"
            style={{ background: i % 2 === 0 ? "var(--section-main)" : "var(--section-alt)" }}
          >
            <div className="container">
              <div className="reveal grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Step number */}
                <div className="lg:col-span-2 flex lg:flex-col items-start gap-4">
                  <div
                    className="text-7xl leading-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontWeight: 300,
                      color: "oklch(from var(--crimson-mid) l c h / 0.3)",
                    }}
                  >
                    {step.num}
                  </div>
                  <div
                    className="hidden lg:block w-px flex-1 mt-4"
                    style={{ background: "linear-gradient(to bottom, oklch(from var(--crimson-mid) l c h / 0.4), transparent)", minHeight: "80px" }}
                  />
                </div>

                {/* Content */}
                <div className="lg:col-span-10">
                  <div
                    className="text-xs uppercase tracking-widest mb-2"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}
                  >
                    {step.subtitle}
                  </div>
                  <h2
                    className="mb-8 leading-tight"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(1.8rem, 4vw, 3rem)",
                      fontWeight: 400,
                      color: "var(--text-heading)",
                    }}
                  >
                    {step.title}
                  </h2>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 flex flex-col gap-4">
                      {step.body.map((para, j) => (
                        <p
                          key={j}
                          className="text-base leading-relaxed"
                          style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
                        >
                          {para}
                        </p>
                      ))}
                    </div>

                    <div className="lg:col-span-1">
                      <blockquote
                        className="p-6 relative"
                        style={{
                          background: "oklch(from var(--crimson-mid) l c h / 0.08)",
                          borderLeft: "3px solid var(--crimson-mid)",
                        }}
                      >
                        <p
                          className="text-sm leading-relaxed italic"
                          style={{ fontFamily: "'Lora', serif", color: "var(--text-heading)" }}
                        >
                          {step.highlight}
                        </p>
                      </blockquote>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Download CTA */}
        <section className="py-24" style={{ background: "var(--section-alt)" }}>
          <div className="container">
            <div className="reveal crimson-rule mb-16" />
            <div className="reveal grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div
                  className="text-xs uppercase tracking-widest mb-4"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}
                >
                  The Result
                </div>
                <h2
                  className="mb-6 leading-tight"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "clamp(2rem, 4vw, 3rem)",
                    fontWeight: 400,
                    color: "var(--text-heading)",
                  }}
                >
                  The SALMON Evaluation Tool
                </h2>
                <p
                  className="text-base leading-relaxed mb-8"
                  style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
                >
                  The result of this community-led process is a strengths-based, culturally
                  grounded evaluation framework that honours the full journey of an educator.
                  Download the sample tool to see how the SALMON framework can support
                  educator growth in your community.
                </p>
                <a
                  href="https://salmontool.com/wp-content/uploads/2025/06/SALMON-Sample.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-medium transition-all duration-200 hover:opacity-90"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    background: "var(--crimson-mid)",
                    color: "oklch(0.97 0.01 80)",
                    letterSpacing: "0.06em",
                  }}
                >
                  Download Sample Tool (PDF) <ArrowRight size={15} />
                </a>
              </div>

              <div>
                <div
                  className="p-8"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                  }}
                >
                  <div
                    className="text-xs uppercase tracking-widest mb-6"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.15em" }}
                  >
                    What the tool includes
                  </div>
                  {[
                    "Four growth stages aligned to the salmon lifecycle",
                    "Culturally grounded evaluation criteria",
                    "Strengths-based language and framing",
                    "Reflective prompts for educators and leaders",
                    "Community and relational accountability indicators",
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 py-3"
                      style={{ borderBottom: i < 4 ? "1px solid oklch(from var(--crimson-mid) l c h / 0.1)" : "none" }}
                    >
                      <span
                        className="mt-0.5 flex-shrink-0 w-4 h-4 flex items-center justify-center text-xs"
                        style={{ color: "var(--crimson-mid)" }}
                      >
                        ✦
                      </span>
                      <span
                        className="text-sm leading-relaxed"
                        style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
                      >
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
