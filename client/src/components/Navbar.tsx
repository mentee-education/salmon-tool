/*
 * Navbar — Deep Water & Copper design
 * - Always-visible crimson nav link text (no fade when transparent)
 * - Simplified logo: formline salmon icon + "SALMON" wordmark only
 * - Light/dark theme toggle
 * - Sticky with blur on scroll
 */
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/journey", label: "The Journey" },
  { href: "/process", label: "Our Process" },
];

export default function Navbar() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const crimson = "var(--crimson-mid)";
  const navTextColor = "var(--crimson-mid)"; // always crimson — visible on both light and dark
  const navActiveWeight = "600";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "var(--nav-bg-scrolled)"
          : "var(--nav-bg-top)",
        backdropFilter: "blur(12px)",
        borderBottom: scrolled ? "1px solid oklch(from var(--crimson-mid) l c h / 0.2)" : "none",
      }}
    >
      <div className="container flex items-center justify-between py-3">
        {/* Logo — salmon icon + SALMON wordmark only */}
        <Link href="/">
          <div className="flex items-center gap-2.5 group transition-opacity hover:opacity-80">
            <span
              className="font-bold tracking-[0.18em] uppercase"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.25rem",
                color: crimson,
                letterSpacing: "0.18em",
                lineHeight: 1,
              }}
            >
              SALMON
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className="text-sm relative group"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: navTextColor,
                  fontWeight: location === link.href ? navActiveWeight : "400",
                  letterSpacing: "0.04em",
                  textShadow: "0 1px 4px oklch(0 0 0 / 0.5)",
                }}
              >
                {link.label}
                <span
                  className="absolute -bottom-0.5 left-0 h-px transition-all duration-300"
                  style={{
                    width: location === link.href ? "100%" : "0%",
                    background: crimson,
                  }}
                />
              </span>
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:scale-110"
            style={{
              background: "oklch(from var(--crimson-mid) l c h / 0.12)",
              border: "1px solid oklch(from var(--crimson-mid) l c h / 0.35)",
              color: crimson,
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>

          <a
            href="https://salmontool.com/wp-content/uploads/2025/06/SALMON-Sample.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 text-sm transition-all duration-200 hover:opacity-90"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: crimson,
              color: "oklch(0.97 0.01 80)",
              fontWeight: "500",
              letterSpacing: "0.05em",
            }}
          >
            View the Tool
          </a>
        </nav>

        {/* Mobile: theme toggle + hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="flex items-center justify-center w-8 h-8 rounded-full"
            style={{
              background: "oklch(from var(--crimson-mid) l c h / 0.12)",
              border: "1px solid oklch(from var(--crimson-mid) l c h / 0.35)",
              color: crimson,
            }}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            className="p-2"
            onClick={() => setMenuOpen(!menuOpen)}
            style={{ color: crimson }}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden py-4 px-6 flex flex-col gap-4"
          style={{
            background: "var(--nav-bg-scrolled)",
            borderTop: "1px solid oklch(from var(--crimson-mid) l c h / 0.2)",
          }}
        >
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              <span
                className="block py-2 text-base"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: navTextColor,
                  fontWeight: location === link.href ? "600" : "400",
                }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </span>
            </Link>
          ))}
          <a
            href="https://salmontool.com/wp-content/uploads/2025/06/SALMON-Sample.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 text-sm text-center mt-1"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              background: crimson,
              color: "oklch(0.97 0.01 80)",
              fontWeight: "500",
            }}
            onClick={() => setMenuOpen(false)}
          >
            View the Tool
          </a>
        </div>
      )}
    </header>
  );
}
