import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { label: "The Course", href: "/course" },
  { label: "Read the Tool", href: "/tool" },
  { label: "Reflect", href: "/reflect" },
  { label: "Resources", href: "/resources" },
  { label: "Our Process", href: "/process" },
];

export default function SiteHeader() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 900,
          background: "rgba(253,252,249,0.96)",
          backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid #e2ddd5", height: 64,
          transition: "box-shadow 0.3s ease",
          boxShadow: scrolled ? "0 1px 8px rgba(0,0,0,0.06)" : "none",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1.25rem", height: "100%", display: "flex", alignItems: "center" }}>
          <Link href="/" style={{ display: "flex", alignItems: "baseline", gap: 8, textDecoration: "none", flexShrink: 0 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.35rem", color: "#9B2335", letterSpacing: "0.01em" }}>SALMON</span>
            <span className="hidden sm:inline" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.62rem", color: "#8a8a82", letterSpacing: "0.14em", textTransform: "uppercase" }}>Seabird Island</span>
          </Link>

          <div className="hidden lg:flex" style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center", gap: "1.5rem" }}>
            {navLinks.map((link) => {
              const isActive = link.href === "/course"
                ? location.startsWith("/course") || location.startsWith("/lessons")
                : location === link.href || location.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600,
                    color: isActive ? "#9B2335" : "#3d3d39", textDecoration: "none",
                    letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s",
                    borderBottom: isActive ? "2px solid #9B2335" : "2px solid transparent",
                    paddingBottom: 2, whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => { if (!isActive) (e.target as HTMLElement).style.color = "#9B2335"; }}
                  onMouseLeave={(e) => { if (!isActive) (e.target as HTMLElement).style.color = "#3d3d39"; }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <a
            href="/SALMON-Tool.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-block"
            style={{
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.68rem", fontWeight: 700,
              letterSpacing: "0.1em", textTransform: "uppercase",
              background: "#9B2335", color: "#fff", padding: "9px 16px",
              textDecoration: "none", flexShrink: 0, transition: "background 0.2s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#7d1b2a"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#9B2335"; }}
          >
            Download PDF
          </a>

          <div className="lg:hidden" style={{ marginLeft: "auto" }}>
            <button
              className="flex flex-col"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
              style={{ background: "none", border: "none", gap: 5, padding: 8, cursor: "pointer" }}
            >
              <span style={{ display: "block", width: 22, height: 2, background: "#1a1a18", transition: "all 0.3s", transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
              <span style={{ display: "block", width: 22, height: 2, background: "#1a1a18", transition: "all 0.3s", opacity: mobileOpen ? 0 : 1 }} />
              <span style={{ display: "block", width: 22, height: 2, background: "#1a1a18", transition: "all 0.3s", transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div
          style={{ position: "fixed", inset: 0, top: 64, zIndex: 899, background: "rgba(253,252,249,0.98)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)" }}
          onClick={() => setMobileOpen(false)}
        >
          <div style={{ display: "flex", flexDirection: "column", padding: "2rem 1.5rem", gap: "0.25rem" }} onClick={(e) => e.stopPropagation()}>
            {[{ label: "Home", href: "/" }, ...navLinks, { label: "Download the PDF", href: "/SALMON-Tool.pdf" }].map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "1rem",
                    fontWeight: isActive ? 600 : 400, color: isActive ? "#9B2335" : "#1a1a18",
                    textDecoration: "none", letterSpacing: "0.03em", padding: "14px 0",
                    borderBottom: "1px solid #e2ddd5", transition: "color 0.2s",
                  }}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ height: 64 }} />
    </>
  );
}
