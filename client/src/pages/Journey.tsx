/*
 * Journey Page — Deep Water & Copper design (theme-aware)
 * Shows all four SALMON lifecycle stages with detailed descriptions
 * Alternating image-text layout, sticky stage nav
 */
import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EGGS_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/BfzmonpCNfX6LhoqyeJUGD/salmon-eggs-Y5M8FTGjXfSYVoyXr6NKox.webp";
const FRY_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/BfzmonpCNfX6LhoqyeJUGD/salmon-fry-josjaC4G3a7qr4fD4ohHXY.webp";
const SMOLT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/BfzmonpCNfX6LhoqyeJUGD/salmon-smolt-8M9yDX5qxFNg6LxcXjs8T3.webp";
const ADULT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663407421710/BfzmonpCNfX6LhoqyeJUGD/salmon-adult-cm8pCGfrM3BKqAAoM5U54v.webp";

const stages = [
  {
    id: "spawning",
    number: "01",
    name: "Spawning",
    subtitle: "Initiating Growth",
    image: EGGS_IMG,
    description: [
      "The Spawning stage represents the very beginning of a teacher's growth journey. Just like salmon eggs full of potential, teachers in this stage are laying the foundation for future development.",
      "It is a time of exploration and discovery, where teachers are building their core skills and starting to integrate new strategies and cultural knowledge into their practice. This stage is about nurturing early efforts, with a focus on support, mentorship, and building confidence for the path ahead.",
      "It's the stage of promise, where teachers begin to realize their capacity for growth.",
    ],
    qualities: ["Exploration & discovery", "Building core skills", "Cultural knowledge integration", "Mentorship & support"],
  },
  {
    id: "fry",
    number: "02",
    name: "Fry",
    subtitle: "Emerging Growth",
    image: FRY_IMG,
    description: [
      "In the Fry stage, teachers are starting to find their flow. Like young salmon navigating a stream, they are gaining independence and actively applying the foundational skills they've developed.",
      "This stage is marked by emerging confidence, with teachers building on their strengths and refining their practices. The focus here is on demonstrating progress and adapting to new challenges with support and feedback.",
      "Teachers in this stage are moving from learning to leading in their classrooms, developing a clearer sense of direction.",
    ],
    qualities: ["Gaining independence", "Applying foundational skills", "Emerging confidence", "Adapting to challenges"],
  },
  {
    id: "smolt",
    number: "03",
    name: "Smolt",
    subtitle: "Sustained Growth",
    image: SMOLT_IMG,
    description: [
      "The Smolt stage reflects consistent and sustained growth. Teachers in this phase are confidently applying their skills, adapting fluidly to diverse classroom needs, and are culturally responsive in their daily practices.",
      "Like smolt transitioning into deeper waters, teachers in this stage are preparing for broader challenges and greater responsibilities. The focus is on maintaining strong practices and continuing to evolve as educators, with opportunities for leadership and collaboration.",
      "Teachers are no longer just applying strategies — they are mastering them.",
    ],
    qualities: ["Confident skill application", "Cultural responsiveness", "Leadership opportunities", "Collaborative practice"],
  },
  {
    id: "returning-adult",
    number: "04",
    name: "Returning Adult",
    subtitle: "Thriving & Leading",
    image: ADULT_IMG,
    description: [
      "The Returning Adult stage represents teachers who are thriving in their roles and leading within their school and community. Just as salmon return to their home waters after a long journey, these teachers have completed a full cycle of growth.",
      "They are now contributing their knowledge and experience to others — mentors, role models, and leaders, helping to nurture the growth of students and colleagues.",
      "At this stage, teachers are fully immersed in their practice, leading with confidence, cultural responsiveness, and a deep connection to the community.",
    ],
    qualities: ["Community leadership", "Mentoring others", "Deep cultural connection", "Full cycle of growth"],
  },
];

export default function Journey() {
  const [activeStage, setActiveStage] = useState("spawning");
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
            const id = entry.target.getAttribute("data-stage");
            if (id) setActiveStage(id);
          }
        });
      },
      { threshold: 0.3 }
    );
    el.querySelectorAll(".reveal").forEach((e) => observer.observe(e));
    el.querySelectorAll("[data-stage]").forEach((e) => observer.observe(e));
    return () => observer.disconnect();
  }, []);

  const scrollToStage = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--section-main)" }}>
      <Navbar />

      {/* Page header */}
      <section className="pt-32 pb-16 relative overflow-hidden" style={{ background: "var(--section-alt)" }}>
        <div className="container">
          <div
            className="text-xs uppercase tracking-widest mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}
          >
            The SALMON Journey
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
            Nurturing<br />
            <em style={{ color: "var(--crimson-mid)", fontStyle: "italic" }}>Educator Growth</em>
          </h1>
          <p
            className="max-w-xl text-base leading-relaxed"
            style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
          >
            The SALMON model mirrors the lifecycle of the Pacific salmon — a journey of
            growth, challenge, and return. Each stage honours where an educator is, while
            pointing toward where they can go.
          </p>
        </div>
      </section>

      {/* Sticky stage navigator */}
      <div
        className="sticky top-[72px] z-40 overflow-x-auto"
        style={{
          background: "var(--nav-bg-scrolled)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid oklch(from var(--crimson-mid) l c h / 0.2)",
        }}
      >
        <div className="container">
          <div className="flex gap-0 min-w-max">
            {stages.map((stage) => (
              <button
                key={stage.id}
                onClick={() => scrollToStage(stage.id)}
                className="px-6 py-4 text-sm transition-all duration-200 relative whitespace-nowrap"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: activeStage === stage.id ? "var(--crimson-mid)" : "var(--text-muted)",
                  fontWeight: activeStage === stage.id ? "500" : "400",
                  borderBottom: activeStage === stage.id ? "2px solid var(--crimson-mid)" : "2px solid transparent",
                }}
              >
                <span
                  className="text-xs mr-2"
                  style={{ color: "var(--crimson-mid)", opacity: 0.6, fontFamily: "'Cormorant Garamond', serif" }}
                >
                  {stage.number}
                </span>
                {stage.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div ref={revealRef}>
        {stages.map((stage, i) => (
          <section
            key={stage.id}
            id={stage.id}
            data-stage={stage.id}
            className="py-24 reveal"
            style={{ background: i % 2 === 0 ? "var(--section-main)" : "var(--section-alt)" }}
          >
            <div className="container">
              <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center`}>
                {/* Image side */}
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div
                    className="relative overflow-hidden"
                    style={{ border: "1px solid var(--card-border)" }}
                  >
                    <img
                      src={stage.image}
                      alt={stage.name}
                      className="w-full aspect-[4/3] object-cover"
                    />
                    <div
                      className="absolute bottom-4 right-5 text-8xl leading-none"
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontWeight: 300,
                        color: "oklch(0.97 0.01 80 / 0.15)",
                      }}
                    >
                      {stage.number}
                    </div>
                  </div>
                </div>

                {/* Text side */}
                <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                  <div
                    className="text-xs uppercase tracking-widest mb-3"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}
                  >
                    Stage {stage.number} — {stage.subtitle}
                  </div>
                  <h2
                    className="mb-6 leading-none"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "clamp(2.5rem, 5vw, 4rem)",
                      fontWeight: 400,
                      color: "var(--text-heading)",
                    }}
                  >
                    {stage.name}
                  </h2>

                  <div className="flex flex-col gap-4 mb-8">
                    {stage.description.map((para, j) => (
                      <p
                        key={j}
                        className="text-base leading-relaxed"
                        style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
                      >
                        {para}
                      </p>
                    ))}
                  </div>

                  {/* Qualities */}
                  <div>
                    <div
                      className="text-xs uppercase tracking-widest mb-3"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-muted)", letterSpacing: "0.15em" }}
                    >
                      Key Qualities
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {stage.qualities.map((q, j) => (
                        <span
                          key={j}
                          className="px-3 py-1.5 text-xs"
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            background: "oklch(from var(--crimson-mid) l c h / 0.1)",
                            border: "1px solid oklch(from var(--crimson-mid) l c h / 0.3)",
                            color: "var(--text-heading)",
                          }}
                        >
                          {q}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* Committee section */}
        <section className="py-24" style={{ background: "var(--section-alt)" }}>
          <div className="container">
            <div className="reveal max-w-3xl mx-auto text-center">
              <div
                className="text-xs uppercase tracking-widest mb-4"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}
              >
                Guiding the Journey
              </div>
              <h2
                className="mb-6 leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(2rem, 5vw, 3.5rem)",
                  fontWeight: 400,
                  color: "var(--text-heading)",
                }}
              >
                The Stó:lō Education Committee
              </h2>
              <p
                className="text-base leading-relaxed mb-8"
                style={{ fontFamily: "'Lora', serif", color: "var(--text-body)" }}
              >
                The foundation of this study was rooted in deep relationships — with people,
                with place, and with the teachings carried by those who have long served their
                communities. At the heart of this work was the Stó:lō Education Committee (SEC):
                four respected Stó:lō educators who brought their lived experience, cultural
                knowledge, and commitment to community into every phase of this journey.
              </p>
              <div className="crimson-rule" />
            </div>

            <div className="reveal grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { name: "Siyámíya (Dianna) Kay", role: "Language Curriculum Developer" },
                { name: "Kweláxtelot (Karla) Kay", role: "Language Vitalist" },
                { name: "Saylesh Wesley", role: "First Nations Resource Enhancement Teacher" },
                { name: "Camielle Laslo", role: "Halq'emeylem Teacher" },
              ].map((person, i) => (
                <div
                  key={i}
                  className="p-5 text-center"
                  style={{
                    background: "var(--card-bg)",
                    border: "1px solid var(--card-border)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center text-lg"
                    style={{
                      background: "oklch(from var(--crimson-mid) l c h / 0.15)",
                      border: "1px solid oklch(from var(--crimson-mid) l c h / 0.4)",
                      fontFamily: "'Cormorant Garamond', serif",
                      color: "var(--crimson-mid)",
                      fontWeight: 500,
                    }}
                  >
                    {person.name.charAt(0)}
                  </div>
                  <div
                    className="text-sm font-medium mb-1"
                    style={{ fontFamily: "'Lora', serif", color: "var(--text-heading)" }}
                  >
                    {person.name}
                  </div>
                  <div
                    className="text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-muted)" }}
                  >
                    {person.role}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
