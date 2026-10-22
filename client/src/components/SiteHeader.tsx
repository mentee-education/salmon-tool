import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";

const navLinks = [
  { label: "The Research", href: "/#process" },
  { label: "The Tool", href: "/tool" },
  { label: "Growth Cycle", href: "/#cycle" },
  { label: "Questions", href: "/#questions" },
  { label: "Learn More", href: "/#learn" },
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
          <Link href="/" aria-label="SALMON research project, home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            <img src="https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/brand/salmon-mark.png" alt="" width={40} height={40} style={{ width: 40, height: 40, borderRadius: "50%", display: "block", boxShadow: "0 0 0 1px #e2ddd5" }} />
            <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "1.2rem", color: "#9B2335", letterSpacing: "0.02em" }}>SALMON</span>
              <span className="hidden sm:inline" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6875rem", color: "#5f5f58", letterSpacing: "0.12em", textTransform: "uppercase", marginTop: 3 }}>Seabird Island Community School</span>
            </span>
          </Link>

          <div className="hidden lg:flex" style={{ flex: 1, justifyContent: "flex-start", alignItems: "center", gap: "1.6rem", marginLeft: "2.75rem" }}>
            {navLinks.map((link) => {
              const isActive = location === link.href || location.startsWith(link.href) || (link.href === "/research" && location.startsWith("/process"));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif", fontSize: "0.7rem", fontWeight: 600,
                    color: isActive ? "#9B2335" : "#3d3d39", textDecoration: "none",
                    letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s",
                    borderBottom: isActive ? "2px solid #9B2335" : "2px solid transparent",
                    paddingTop: 3, marginTop: -3, paddingBottom: 2, whiteSpace: "nowrap",
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
              fontFamily: "'DM Sans', sans-serif", fontSize: "0.6875rem", fontWeight: 700,
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
