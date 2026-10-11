/*
 * Resources — downloads, findings, films, and language & culture links.
 */
import { useEffect } from "react";
import { Link } from "wouter";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { ArrowRight, BookOpen, Download, ExternalLink, GraduationCap, NotebookPen } from "lucide-react";

const FINDINGS = [
  { n: "01", t: "Evaluation should nurture, not judge", d: "Across focus groups with more than 20 educators and staff, people asked for growth conversations instead of verdicts. SALMON answers with self-evaluation, feedback, and goals set together." },
  { n: "02", t: "Culture belongs inside the criteria", d: "Stó:lō cultural responsiveness and Halq'eméylem integration are assessed areas in their own right — not an add-on paragraph. The language and culture team helped define what good looks like." },
  { n: "03", t: "Accountability must run both ways", d: "Teachers evaluate how well administrators facilitate the process — transparency, fairness, and growth — making SALMON reciprocal by design." },
  { n: "04", t: "Growth is a cycle, not a ladder", d: "The salmon lifecycle gives educators language for where they are — Spawning, Fry, Smolt, Returning Adult — and honours returning, mentoring, and beginning again." },
];

export default function Resources() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--section-main)" }}>
      <SiteHeader />

      <section className="pt-32 pb-14" style={{ background: "var(--section-alt)" }}>
        <div className="container">
          <div className="text-xs uppercase tracking-widest mb-4" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}>
            Resources
          </div>
          <h1 className="m-0 mb-5 max-w-3xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(2.4rem, 6vw, 4.2rem)", letterSpacing: "-0.02em", lineHeight: 1.02, color: "var(--text-heading)" }}>
            Everything you need<br />to bring SALMON home
          </h1>
          <p className="max-w-2xl text-base leading-relaxed m-0" style={{ fontFamily: "'Source Serif 4', serif", color: "var(--text-body)" }}>
            The tool, the course, the reflection library, and the films — plus what the
            community taught us along the way.
          </p>
        </div>
      </section>

      {/* Primary resources */}
      <section className="py-14">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { href: "/SALMON-Tool.pdf", ext: true, icon: <Download size={20} />, t: "The SALMON Tool (PDF)", d: "The complete 24-page evaluation and nurturing tool, print-ready." },
              { href: "/tool", ext: false, icon: <BookOpen size={20} />, t: "Read it page by page", d: "A flipbook of the printed booklet, right in the browser." },
              { href: "/course", ext: false, icon: <GraduationCap size={20} />, t: "The SALMON Course", d: "Six short lessons through the framework, at your own pace." },
              { href: "/reflect", ext: false, icon: <NotebookPen size={20} />, t: "The Reflection Library", d: "Every guiding question, with private notes and printing." },
            ].map((r) => {
              const inner = (
                <span className="group flex flex-col gap-3 p-6 h-full cursor-pointer transition-all duration-200 hover:-translate-y-0.5" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                  <span style={{ color: "var(--crimson-mid)" }}>{r.icon}</span>
                  <span className="text-base" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--text-heading)", letterSpacing: "-0.01em" }}>{r.t}</span>
                  <span className="text-sm leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif", color: "var(--text-body)" }}>{r.d}</span>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.1em" }}>
                    Open <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </span>
                </span>
              );
              return r.ext ? (
                <a key={r.t} href={r.href} target="_blank" rel="noopener noreferrer" className="h-full">{inner}</a>
              ) : (
                <Link key={r.t} href={r.href}><span className="h-full block">{inner}</span></Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote band with the real staffroom sign */}
      <section className="relative overflow-hidden" style={{ background: "#171412" }}>
        <img src="/img-teachers-sign.jpg" alt="" className="absolute inset-0 w-full h-full object-cover" style={{ opacity: 0.38 }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(90deg, rgba(23,20,18,0.92) 0%, rgba(23,20,18,0.55) 100%)" }} />
        <div className="container relative py-20">
          <p className="m-0 max-w-2xl" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3.6vw, 2.6rem)", letterSpacing: "-0.015em", lineHeight: 1.15, color: "#fdfcf9" }}>
            “Teachers change the world one child at a time.”
          </p>
          <p className="m-0 mt-4 text-sm" style={{ fontFamily: "'Source Serif 4', serif", color: "rgba(253,252,249,0.78)" }}>
            A sign on a staff desk at Seabird Island Community School — the belief SALMON is built to protect.
          </p>
        </div>
      </section>

      {/* Findings */}
      <section className="py-16" style={{ background: "var(--section-alt)" }}>
        <div className="container">
          <div className="text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}>
            What the community taught us
          </div>
          <h2 className="m-0 mb-8" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(1.7rem, 4vw, 2.6rem)", letterSpacing: "-0.015em", color: "var(--text-heading)" }}>
            Four findings that shaped the tool
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FINDINGS.map((f) => (
              <div key={f.n} className="p-7" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                <div className="mb-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.6rem", color: "oklch(from var(--crimson-mid) l c h / 0.35)" }}>{f.n}</div>
                <h3 className="m-0 mb-2.5" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.15rem", letterSpacing: "-0.01em", color: "var(--text-heading)" }}>{f.t}</h3>
                <p className="m-0 text-sm leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif", color: "var(--text-body)" }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Language & community */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="overflow-hidden" style={{ border: "1px solid var(--card-border)" }}>
              <img src="/img-readers.jpg" alt="Sxwōwálólh Halq'eméylem readers in a Seabird Island classroom" className="w-full h-auto block" loading="lazy" />
            </div>
            <div>
              <div className="text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}>
                Language & community
              </div>
              <h2 className="m-0 mb-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3.6vw, 2.4rem)", letterSpacing: "-0.015em", color: "var(--text-heading)" }}>
                Halq'eméylem lives in these classrooms
              </h2>
              <p className="text-[15px] leading-relaxed mb-6" style={{ fontFamily: "'Source Serif 4', serif", color: "var(--text-body)" }}>
                Sxwōwálólh readers, land-based learning, and the language and culture team are
                part of daily life at Seabird Island Community School — which is why cultural
                responsiveness is an assessed area of SALMON, not an afterthought.
              </p>
              <a href="https://www.seabirdisland.ca" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-semibold hover:opacity-80" style={{ fontFamily: "'Source Serif 4', serif", color: "var(--crimson-mid)" }}>
                Seabird Island Band <ExternalLink size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Curated external resources */}
      <section className="py-16" style={{ background: "var(--section-alt)" }}>
        <div className="container">
          <div className="text-xs uppercase tracking-widest mb-3" style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.2em" }}>
            Go deeper
          </div>
          <h2 className="m-0 mb-8" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "clamp(1.7rem, 4vw, 2.6rem)", letterSpacing: "-0.015em", color: "var(--text-heading)" }}>
            Trusted places to keep learning
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { t: "First Peoples Principles of Learning", d: "FNESC's foundational principles — the pedagogical ground SALMON stands on.", href: "https://www.fnesc.ca/first-peoples-principles-of-learning/" },
              { t: "Learning First Peoples resources", d: "Classroom-ready guides and units from the First Nations Education Steering Committee.", href: "https://www.fnesc.ca/learningfirstpeoples/" },
              { t: "Halq'eméylem on FirstVoices", d: "Hear and learn the language woven through the tool and the school.", href: "https://www.firstvoices.com/halqemeylem" },
              { t: "First Peoples' Cultural Council", d: "B.C.'s Crown corporation supporting Indigenous languages, arts, and culture.", href: "https://fpcc.ca/" },
              { t: "NCCIE", d: "The National Centre for Collaboration in Indigenous Education — lessons and stories from across Canada.", href: "https://www.nccie.ca/" },
              { t: "Seabird Island Band", d: "The community where SALMON was born.", href: "https://www.seabirdisland.ca/" },
            ].map((r) => (
              <a key={r.href} href={r.href} target="_blank" rel="noopener noreferrer" className="block no-underline h-full">
                <div className="p-6 h-full transition-shadow duration-200 hover:shadow-md flex flex-col" style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)" }}>
                  <h3 className="m-0 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "var(--text-heading)" }}>{r.t} ↗</h3>
                  <p className="m-0 text-sm leading-relaxed" style={{ fontFamily: "'Source Serif 4', serif", color: "var(--text-body)" }}>{r.d}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
