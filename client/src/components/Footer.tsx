/*
 * Footer — Deep Water & Copper design (theme-aware)
 * Minimal footer with crimson rule, site links, and attribution
 */
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer
      className="mt-auto pt-16"
      style={{
        background: "var(--section-alt)",
        borderTop: "1px solid oklch(from var(--crimson-mid) l c h / 0.2)",
      }}
    >
      <div className="container">
        <div className="crimson-rule mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div
              className="text-2xl mb-3 italic"
              style={{ fontFamily: "'Archivo', sans-serif", color: "var(--crimson-mid)", fontWeight: 800 }}
            >
              SALMON
            </div>
            <p
              className="text-sm leading-relaxed mb-1"
              style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-body)" }}
            >
              Seabird Assessment for Learning,<br />Mentorship &amp; Ongoing Nurturing
            </p>
            <p
              className="text-xs mt-3"
              style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-muted)" }}
            >
              Developed in collaboration with the<br />Stó:lō Education Committee
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div
              className="text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Inter', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.15em" }}
            >
              Navigate
            </div>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/course", label: "The Course" },
                { href: "/tool", label: "Read the Tool" },
                { href: "/reflect", label: "Reflect" },
                { href: "/resources", label: "Resources" },
                { href: "/journey", label: "The Journey" },
                { href: "/process", label: "Our Process" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="text-sm hover:opacity-80 transition-opacity"
                    style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-body)" }}
                  >
                    {link.label}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Resources */}
          <div>
            <div
              className="text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "'Inter', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.15em" }}
            >
              Resources
            </div>
            <nav className="flex flex-col gap-2">
              <a
                href="/SALMON-Tool.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-body)" }}
              >
                Download the Tool (PDF)
              </a>
              <a
                href="https://www.seabirdisland.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-body)" }}
              >
                Seabird Island Community School
              </a>
            </nav>
          </div>
        </div>

        <div className="crimson-rule mb-6" />

        <p
          className="text-xs pb-8"
          style={{ fontFamily: "'Inter', sans-serif", color: "var(--text-muted)" }}
        >
          Developed on the unceded territory of the Stó:lō peoples, with the Stó:lō Education Committee.
        </p>
      </div>

      {/* Standard Mentee bottom bar */}
      <div className="py-3 text-center" style={{ background: "oklch(0.14 0.012 260)" }}>
        <p className="text-xs sm:text-sm m-0" style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.985 0.002 95 / 0.7)" }}>
          &copy; Copyright 2026{" "}
          <a href="https://www.mentee.ca" target="_blank" rel="noopener noreferrer" className="hover:opacity-80" style={{ color: "oklch(0.985 0.002 95 / 0.85)" }}>Mentee</a>
          {" "}&ndash; All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
