/* Developed by Mentee: the same band as every Mentee-built site (concept-site-kit/developed-by-mentee):
   Barlow Condensed 600, 0.8rem, capitals, 0.12em tracking, logo 32px tall, py-5, gap-4, thin top rule,
   one shade darker than the footer. Only the colour is SALMON's: a deep oxblood footer. */
export default function SiteFooter() {
  return (
    <footer id="site-footer" style={{ backgroundColor: "#3a0c14" }}>
      <div className="mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 py-8" style={{ maxWidth: 1180 }}>
        <p className="m-0" style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#fdfcf9" }}>
          SALMON <span style={{ fontFamily: "'Source Serif 4', serif", fontStyle: "italic", fontSize: 15, color: "rgba(253,252,249,0.78)" }}>&middot; Seabird Island Community School</span>
        </p>
        <a href="/SALMON-Tool.pdf" target="_blank" rel="noopener noreferrer" className="link-draw inline-flex items-center gap-2" style={{ paddingTop: 1, marginTop: -1, fontFamily: "'DM Sans', sans-serif", fontSize: 15, fontWeight: 600, color: "#f0c4ca" }}>
          Download the Tool (PDF)
        </a>
      </div>
      <div className="border-t border-white/10 bg-black/25">
        <div className="flex items-center justify-center gap-4 px-6 py-5">
          <span className="text-[0.8rem] font-semibold uppercase tracking-[0.12em] text-white/75" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
            Developed by
          </span>
          <a href="https://mentee.ca" target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
            <img src="/mentee-logo.svg" alt="Mentee" width={156} height={52} className="h-8 w-auto opacity-85" />
          </a>
        </div>
      </div>
    </footer>
  );
}
