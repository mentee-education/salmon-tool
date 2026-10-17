/* Back to top: appears after about one screen of scrolling and stays pinned bottom-right. Over the dark site footer
   it inverts (light fill, dark arrow) so it stays visible. Smooth scroll (instant with reduced motion), then focus moves to the page top. */
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [onDark, setOnDark] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.9);
      // Invert when the button's centre (about 40px above the viewport bottom) is over the dark site footer.
      const footer = document.getElementById("site-footer");
      if (footer) {
        const r = footer.getBoundingClientRect();
        const y = window.innerHeight - 40;
        setOnDark(r.top <= y && r.bottom >= y);
      } else {
        setOnDark(false);
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "instant" : "smooth" });
    const top = document.getElementById("top");
    if (top) { top.setAttribute("tabindex", "-1"); window.setTimeout(() => top.focus({ preventScroll: true }), reduce ? 0 : 500); }
  };

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={toTop}
      tabIndex={show ? 0 : -1}
      aria-hidden={show ? undefined : true}
      className="to-top fixed z-[800] flex items-center justify-center rounded-full cursor-pointer"
      style={{
        right: "max(16px, env(safe-area-inset-right))", bottom: "max(16px, env(safe-area-inset-bottom))",
        width: 48, height: 48, border: 0, background: onDark ? "#fdfcf9" : "#5d131e", color: onDark ? "#5d131e" : "#fdfcf9",
        transition: "background-color .2s, color .2s, opacity .3s ease-out, transform .3s ease-out",
        boxShadow: "0 8px 22px rgba(29,23,20,0.28)", opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none",
        transform: show ? undefined : "translateY(12px)",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
        <path d="M10 16 V4 M4.5 9.5 L10 4 L15.5 9.5" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
