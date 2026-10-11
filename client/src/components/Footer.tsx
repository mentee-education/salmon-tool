/*
 * Footer — Mentee house footer (matches mentee.ca Footer.tsx treatment):
 * deep-blue gradient, white logo + tagline, frosted cards, dark bottom bar.
 */
const LOGO_WHITE = "https://pub-4a448707138147b3a6495c5a77cebd57.r2.dev/site/logoWhite.svg";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden text-white" style={{ background: "#013F6C" }}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 12% 18%, rgba(255,255,255,0.16), transparent 30%), linear-gradient(135deg, #013F6C 0%, #0A5F97 55%, #4596D1 135%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 h-px bg-white/20" />

      <div className="relative container py-12 sm:py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.7fr_0.7fr] lg:items-start">
          <div className="max-w-md">
            <img src={LOGO_WHITE} alt="Mentee" className="h-8 sm:h-9 w-auto mb-4" />
            <p className="text-white/80 text-sm leading-7" style={{ fontFamily: "'Inter', sans-serif" }}>
              The SALMON Tool is a Mentee project — created with the Stó:lō Education Committee
              at Seabird Island Community School. Mentee partners with communities, organizations,
              and institutions to co-design resources, digital tools, and storytelling projects.
            </p>
          </div>

          <nav
            className="rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-sm"
            style={{ boxShadow: "0 14px 34px rgba(0,0,0,0.16)" }}
            aria-label="Explore SALMON"
          >
            <h4 className="font-bold text-xs mb-3 uppercase" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.16em" }}>
              The SALMON Tool
            </h4>
            <ul className="space-y-2.5 m-0 p-0" style={{ listStyle: "none", fontFamily: "'Inter', sans-serif" }}>
              <li><a href="/journey" className="text-white/80 hover:text-white text-sm transition-colors duration-200">The Journey</a></li>
              <li><a href="/process" className="text-white/80 hover:text-white text-sm transition-colors duration-200">Our Process</a></li>
              <li><a href="/SALMON-Tool.pdf" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white text-sm transition-colors duration-200">Download the tool (PDF)</a></li>
            </ul>
          </nav>

          <nav
            className="rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-sm"
            style={{ boxShadow: "0 14px 34px rgba(0,0,0,0.16)" }}
            aria-label="Legal links"
          >
            <h4 className="font-bold text-xs mb-3 uppercase" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.16em" }}>
              Legal
            </h4>
            <ul className="space-y-2.5 m-0 p-0" style={{ listStyle: "none", fontFamily: "'Inter', sans-serif" }}>
              <li><a href="https://www.mentee.ca/privacy-policy" className="text-white/80 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="https://www.mentee.ca/terms-and-conditions" className="text-white/80 hover:text-white text-sm transition-colors duration-200">Terms &amp; Conditions</a></li>
            </ul>
          </nav>

          <div
            className="rounded-2xl border border-white/15 bg-white/[0.08] p-5 backdrop-blur-sm"
            style={{ boxShadow: "0 14px 34px rgba(0,0,0,0.16)" }}
          >
            <h4 className="font-bold text-xs mb-3 uppercase" style={{ fontFamily: "'Inter', sans-serif", letterSpacing: "0.16em" }}>
              Connect
            </h4>
            <div className="flex flex-col gap-2.5" style={{ fontFamily: "'Inter', sans-serif" }}>
              <a href="mailto:info@mentee.ca" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors duration-200">
                <span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" />
                info@mentee.ca
              </a>
              <a href="https://www.mentee.ca" className="inline-flex items-center gap-2 text-white/80 hover:text-white text-sm transition-colors duration-200">
                <span className="h-2 w-2 rounded-full bg-white" aria-hidden="true" />
                www.mentee.ca
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/15 py-3 text-center" style={{ background: "rgba(1,47,81,0.7)" }}>
        <p className="text-white/70 text-xs sm:text-sm m-0" style={{ fontFamily: "'Inter', sans-serif" }}>
          &copy; Copyright 2026 Mentee &ndash; All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
