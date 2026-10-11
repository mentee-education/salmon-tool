import { Link } from "wouter";

export default function SalmonButton({ href, children, light = false, external = false }: { href: string; children: React.ReactNode; light?: boolean; external?: boolean }) {
  const style: React.CSSProperties = {
    display: "inline-block",
    fontFamily: "'DM Sans', system-ui, sans-serif",
    fontSize: "0.78rem",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    padding: "14px 30px",
    textDecoration: "none",
    transition: "all 0.2s ease",
    background: light ? "transparent" : "#9B2335",
    color: light ? "#ffffff" : "#ffffff",
    border: light ? "1px solid rgba(255,255,255,0.55)" : "1px solid #9B2335",
    cursor: "pointer",
  };
  const hover = (e: React.MouseEvent, on: boolean) => {
    const el = e.currentTarget as HTMLElement;
    if (light) el.style.background = on ? "rgba(255,255,255,0.12)" : "transparent";
    else { el.style.background = on ? "#7d1b2a" : "#9B2335"; el.style.borderColor = on ? "#7d1b2a" : "#9B2335"; }
  };
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" style={style} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href}>
      <span style={style} onMouseEnter={(e) => hover(e, true)} onMouseLeave={(e) => hover(e, false)}>{children}</span>
    </Link>
  );
}
