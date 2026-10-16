/* Back to top: appears after about one screen of scrolling, lifts above the footer when the footer is in view,
   smooth scroll (instant with reduced motion), then focus moves to the page top. */
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  const [lift, setLift] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.9);
      const footer = document.querySelector("footer");
      if (footer) {
        const overlap = window.innerHeight - footer.getBoundingClientRect().top;
        setLift(overlap > 0 ? overlap : 0);
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
        right: "max(16px, env(safe-area-inset-right))", bottom: `calc(max(16px, env(safe-area-inset-bottom)) + ${lift}px)`,
        width: 48, height: 48, border: 0, background: "#5d131e", color: "#fdfcf9",
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
