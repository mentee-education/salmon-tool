/*
 * Footer — Deep Water & Copper design (theme-aware)
 * Minimal footer with crimson rule, site links, and attribution
 */
import { Link } from "wouter";

export default function Footer() {
  return (
    <footer
      className="mt-auto pt-16 pb-10"
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
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--crimson-mid)", fontWeight: 300 }}
            >
              SALMON
            </div>
            <p
              className="text-sm leading-relaxed mb-1"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-body)" }}
            >
              Seabird Assessment for Learning,<br />Mentorship &amp; Ongoing Nurturing
            </p>
            <p
              className="text-xs mt-3"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-muted)" }}
            >
              Developed in collaboration with the<br />Stó:lō Education Committee
            </p>
          </div>

          {/* Navigation */}
          <div>
            <div
              className="text-xs uppercase tracking-widest mb-4"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.15em" }}
            >
              Navigate
            </div>
            <nav className="flex flex-col gap-2">
              {[
                { href: "/", label: "Home" },
                { href: "/journey", label: "The Journey" },
                { href: "/process", label: "Our Process" },
              ].map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className="text-sm hover:opacity-80 transition-opacity"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-body)" }}
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
              style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--crimson-mid)", letterSpacing: "0.15em" }}
            >
              Resources
            </div>
            <nav className="flex flex-col gap-2">
              <a
                href="https://salmontool.com/wp-content/uploads/2025/06/SALMON-Sample.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-body)" }}
              >
                Download Sample Tool (PDF)
              </a>
              <a
                href="https://www.seabirdisland.ca"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm hover:opacity-80 transition-opacity"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-body)" }}
              >
                Seabird Island Community School
              </a>
            </nav>
          </div>
        </div>

        <div className="crimson-rule mb-6" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
          <p
            className="text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-muted)" }}
          >
            © 2025 SALMON Tool. Developed on the unceded territory of the Stó:lō peoples.
          </p>
          <p
            className="text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "var(--text-muted)" }}
          >
            Powered by{" "}
            <a
              href="https://mentee.ca"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity"
              style={{ color: "var(--crimson-mid)" }}
            >
              Mentee
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
