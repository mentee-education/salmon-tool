/*
 * Research materials as documents: four paper cards (folded corner, name, one line, metadata).
 * A card is a disclosure button; the chosen instrument opens in a reading panel below, typeset like
 * the printed instrument. One open at a time. Content comes from the research report's appendices.
 */
import { useRef, useState } from "react";
import { GUIDE, QUESTIONNAIRE, PHASES, CONSENT, themes } from "@/data/research";

const RED = "#9B2335";
const INK = "#1a1a18";
const BODY = "#3d3d39";
const MUTED = "#5f5f58";
const RULE = "#d4cfc6";
const display = "'Playfair Display', serif";
const serif = "'Source Serif 4', serif";
const sans = "'DM Sans', sans-serif";

// in the order the research happened
const DOCS = [
  { id: "phases", name: "Approvals and phases", line: "Community permission first, then university ethics approval.", meta: "8 phases · Seabird Island and Trent University" },
  { id: "consent", name: "Recruitment and consent", line: "How educators were invited, and what they agreed to.", meta: "6 commitments · voluntary, withdraw any time" },
  { id: "questionnaire", name: "Pre-interview questionnaire", line: "A short background form returned before each interview.", meta: "5 items · used to schedule and confirm eligibility" },
  { id: "guide", name: "Interview guide", line: "The questions every educator was asked, one to one.", meta: "18 questions · 5 parts · shaped by the committee" },
  { id: "coding", name: "Coding structure", line: "How what people said was organized into sub-themes and themes.", meta: "4 themes · 14 sub-themes" },
];

function Numbered({ items, start = 1 }: { items: string[]; start?: number }) {
  return (
    <ol className="list-none m-0 p-0">
      {items.map((q, i) => (
        <li key={q} className="grid grid-cols-[36px_1fr] gap-3 py-3" style={{ borderTop: i ? `1px solid ${RULE}` : undefined }}>
          <span style={{ fontFamily: display, fontWeight: 700, color: RED, fontSize: 17 }}>{start + i}.</span>
          <span style={{ fontFamily: serif, fontSize: 17, color: INK, lineHeight: 1.65 }}>{q}</span>
        </li>
      ))}
    </ol>
  );
}

function Body({ id }: { id: string }) {
  if (id === "guide") {
    let n = 0;
    return (
      <>
        {GUIDE.map((g) => {
          const start = n + 1; n += g.q.length;
          return (
            <section key={g.h} className="mb-8 last:mb-0">
              <h4 className="m-0 mb-2" style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: RED }}>{g.h}</h4>
              <Numbered items={g.q} start={start} />
            </section>
          );
        })}
      </>
    );
  }
  if (id === "questionnaire") return <Numbered items={QUESTIONNAIRE} />;
  if (id === "phases") return <Numbered items={PHASES} />;
  if (id === "coding") return (
    <>
      {themes.map((th) => (
        <section key={th.n} className="mb-7 last:mb-0">
          <h4 className="m-0 mb-2" style={{ fontFamily: display, fontWeight: 700, fontSize: 19, color: INK }}>Theme {th.n}. {th.t}</h4>
          <ol className="list-none m-0 p-0">
            {th.subs.map((s, j) => (
              <li key={s} className="grid grid-cols-[44px_1fr] gap-2 py-2" style={{ borderTop: `1px solid ${RULE}` }}>
                <span style={{ fontFamily: display, fontWeight: 700, color: RED }}>{th.n}.{j + 1}</span>
                <span style={{ fontFamily: serif, fontSize: 16.5, color: INK, lineHeight: 1.6 }}>{s}</span>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </>
  );
  return (
    <>
      <p className="m-0 mb-5" style={{ fontFamily: serif, fontSize: 17, color: BODY, lineHeight: 1.75 }}>
        Educators were first contacted by email. The researcher then visited the school in person to hand out consent forms and
        questionnaires together, and two committee members delivered and collected them for anyone not there that day.
      </p>
      <Numbered items={CONSENT} />
    </>
  );
}

export default function Materials() {
  const [open, setOpen] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const doc = DOCS.find((d) => d.id === open);

  const toggle = (id: string) => {
    const next = open === id ? null : id;
    setOpen(next);
    if (next) window.setTimeout(() => panelRef.current?.focus({ preventScroll: false }), 30);
  };

  return (
    <div>
      <ul className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 gap-5">
        {DOCS.map((d) => {
          const on = open === d.id;
          return (
            <li key={d.id} className={d.id === "coding" ? "sm:col-span-2" : undefined}>
              <button
                type="button"
                aria-expanded={on}
                aria-controls="material-panel"
                onClick={() => toggle(d.id)}
                className="doc-card hv-lift relative w-full h-full text-left cursor-pointer"
                style={{ background: on ? "#fffdf8" : "#fbf8f2", border: `1px solid ${on ? RED : RULE}`, padding: "26px 26px 22px", boxShadow: on ? "0 10px 30px rgba(93,19,30,0.14)" : "0 2px 8px rgba(29,23,20,0.06)" }}
              >
                <span aria-hidden="true" className="doc-fold absolute top-0 right-0" />
                <span className="block mb-3" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: RED }}>Instrument</span>
                <span className="block mb-2 hv-title" style={{ fontFamily: display, fontWeight: 700, fontSize: 22, color: INK, lineHeight: 1.25 }}>{d.name}</span>
                <span className="block mb-5" style={{ fontFamily: serif, fontSize: 15.5, color: BODY, lineHeight: 1.6 }}>{d.line}</span>
                <span className="flex items-center justify-between gap-3 pt-3" style={{ borderTop: `1px solid ${RULE}` }}>
                  <span style={{ fontFamily: sans, fontSize: 12.5, color: MUTED }}>{d.meta}</span>
                  <span style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: RED, whiteSpace: "nowrap" }}>{on ? "Close" : "Read"} <span className="arrow-nudge" aria-hidden="true">{on ? "×" : "→"}</span></span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div id="material-panel" ref={panelRef} tabIndex={-1} role="region" aria-label={doc ? doc.name : "Research material"} hidden={!doc} className="mt-6 outline-none">
        {doc && (
          <article className="relative" style={{ background: "#fffdf8", border: `1px solid ${RULE}`, boxShadow: "0 16px 40px rgba(29,23,20,0.10)" }}>
            <header className="flex items-start justify-between gap-6 px-6 sm:px-12 pt-8 pb-6" style={{ borderBottom: `1px solid ${RULE}` }}>
              <div>
                <p className="m-0 mb-2" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: RED }}>{doc.meta}</p>
                <h3 className="m-0" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(24px, 2.6vw, 32px)", color: INK }}>{doc.name}</h3>
              </div>
              <button type="button" onClick={() => toggle(doc.id)} className="btn-lift shrink-0 cursor-pointer" style={{ fontFamily: sans, fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", padding: "9px 16px", border: `1px solid ${RED}`, color: RED, background: "transparent" }}>Close</button>
            </header>
            <div className="px-6 sm:px-12 py-8 max-w-[880px]"><Body id={doc.id} /></div>
          </article>
        )}
      </div>
    </div>
  );
}
