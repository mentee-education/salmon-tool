export default function SiteFooter() {
  return (
    <footer style={{ background: "#0f0f0d", borderTop: "3px solid #9B2335" }}>
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "1.5rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.6rem",
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.45)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          Developed by
        </span>
        <a
          href="https://mentee.ca"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-flex", alignItems: "center", transition: "opacity 0.2s", opacity: 0.7 }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.opacity = "0.7"; }}
        >
          <img src="/mentee-logo.svg" alt="Mentee" style={{ height: 22 }} />
        </a>
      </div>
    </footer>
  );
}
