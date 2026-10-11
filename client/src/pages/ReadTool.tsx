/*
 * Read the Tool — flipbook of the real 24-page SALMON booklet.
 * Keyboard arrows, click zones, thumbnail rail, download CTA.
 */
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";

const PAGES = Array.from({ length: 24 }, (_, i) => `/booklet/p${String(i + 1).padStart(2, "0")}.jpg`);

export default function ReadTool() {
  const [page, setPage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setPage((p) => Math.min(PAGES.length - 1, p + 1));
      if (e.key === "ArrowLeft") setPage((p) => Math.max(0, p - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // preload neighbours
  useEffect(() => {
    [page - 1, page + 1, page + 2].forEach((i) => {
      if (i >= 0 && i < PAGES.length) {
        const img = new Image();
        img.src = PAGES[i];
      }
    });
  }, [page]);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "oklch(0.15 0.012 260)" }}>
      <Navbar />

      <section className="pt-28 pb-8">
        <div className="container">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <div
                className="text-xs uppercase tracking-widest mb-3"
                style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.66 0.18 30)", letterSpacing: "0.2em" }}
              >
                Read the Tool
              </div>
              <h1
                className="m-0"
                style={{ fontFamily: "'Archivo', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.2rem)", letterSpacing: "-0.02em", color: "oklch(0.985 0.002 95)" }}
              >
                The SALMON Tool, page by page
              </h1>
            </div>
            <a
              href="/SALMON-Tool.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold transition-all duration-200 hover:opacity-90"
              style={{ fontFamily: "'Inter', sans-serif", background: "oklch(0.60 0.19 30)", color: "white", letterSpacing: "0.04em" }}
            >
              <Download size={15} /> Download the PDF
            </a>
          </div>

          {/* Viewer */}
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              aria-label="Previous page"
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full mr-5 transition-all duration-150 cursor-pointer disabled:opacity-25"
              style={{ background: "oklch(0.985 0.002 95 / 0.1)", border: "1px solid oklch(0.985 0.002 95 / 0.25)", color: "oklch(0.985 0.002 95)" }}
            >
              <ChevronLeft size={22} />
            </button>

            <div className="relative" style={{ maxWidth: 680, width: "100%" }}>
              <img
                key={page}
                src={PAGES[page]}
                alt={`SALMON Tool, page ${page + 1} of 24`}
                className="w-full h-auto block"
                style={{ boxShadow: "0 30px 80px oklch(0 0 0 / 0.5)", border: "1px solid oklch(0.985 0.002 95 / 0.1)" }}
              />
              {/* click zones */}
              <button
                type="button"
                aria-label="Previous page"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                className="absolute inset-y-0 left-0 w-1/3 cursor-w-resize"
                style={{ background: "none", border: 0 }}
              />
              <button
                type="button"
                aria-label="Next page"
                onClick={() => setPage((p) => Math.min(PAGES.length - 1, p + 1))}
                className="absolute inset-y-0 right-0 w-1/3 cursor-e-resize"
                style={{ background: "none", border: 0 }}
              />
            </div>

            <button
              type="button"
              onClick={() => setPage((p) => Math.min(PAGES.length - 1, p + 1))}
              disabled={page === PAGES.length - 1}
              aria-label="Next page"
              className="hidden md:flex items-center justify-center w-12 h-12 rounded-full ml-5 transition-all duration-150 cursor-pointer disabled:opacity-25"
              style={{ background: "oklch(0.985 0.002 95 / 0.1)", border: "1px solid oklch(0.985 0.002 95 / 0.25)", color: "oklch(0.985 0.002 95)" }}
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="text-center mt-5 text-sm" style={{ fontFamily: "'Inter', sans-serif", color: "oklch(0.80 0.006 95)" }}>
            Page {page + 1} of {PAGES.length} · use arrow keys or tap the page edges
          </div>

          {/* Thumbnail rail */}
          <div className="mt-8 overflow-x-auto pb-3">
            <div className="flex gap-2" style={{ minWidth: "max-content" }}>
              {PAGES.map((src, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setPage(i)}
                  aria-label={`Go to page ${i + 1}`}
                  className="shrink-0 cursor-pointer transition-opacity"
                  style={{ border: i === page ? "2px solid oklch(0.66 0.18 30)" : "1px solid oklch(0.985 0.002 95 / 0.15)", padding: 0, background: "none", opacity: i === page ? 1 : 0.55 }}
                >
                  <img src={src} alt="" loading="lazy" style={{ width: 52, height: "auto", display: "block" }} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
