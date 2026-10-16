/*
 * Guiding questions, word for word from the tool: four tool sections as tabs, then the areas in that
 * section. Desktop: area tabs on the left, the chosen area's questions as a card on the right.
 * Below lg: the section's areas as stacked cards. Keyboard: arrow keys move between tabs (WAI-ARIA tabs).
 */
import { useRef, useState } from "react";
import { REFLECTION_GROUPS } from "@/data/reflections";

const RED = "#9B2335";
const DEEP = "#5d131e";
const INK = "#1a1a18";
const BODY = "#3d3d39";
const MUTED = "#5f5f58";
const RULE = "#d4cfc6";
const serif = "'Source Serif 4', serif";
const display = "'Playfair Display', serif";
const sans = "'DM Sans', sans-serif";

const SHORT = ["Culture, families and community", "Teaching and assessment", "Growth and leadership", "Evaluating administrators"];

// number every area 1 to 10 in tool order
let counter = 0;
const GROUPS = REFLECTION_GROUPS.map((g, gi) => ({
  title: g.group.replace(/&/g, "and"),
  short: SHORT[gi] ?? g.group,
  areas: g.areas.map((a) => ({ ...a, title: a.title.replace(/&/g, "and"), n: ++counter })),
}));

function useRoving(count: number, onPick: (i: number) => void, vertical = false) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    const next = vertical ? "ArrowDown" : "ArrowRight";
    const prev = vertical ? "ArrowUp" : "ArrowLeft";
    let j = -1;
    if (e.key === next) j = (i + 1) % count;
    else if (e.key === prev) j = (i - 1 + count) % count;
    else if (e.key === "Home") j = 0;
    else if (e.key === "End") j = count - 1;
    if (j >= 0) { e.preventDefault(); onPick(j); refs.current[j]?.focus(); }
  };
  return { refs, onKeyDown };
}

function QuestionCard({ area, headingLevel = 4 }: { area: (typeof GROUPS)[number]["areas"][number]; headingLevel?: 3 | 4 }) {
  const H = headingLevel === 3 ? "h3" : "h4";
  return (
    <article className="h-full" style={{ background: "#ffffff", border: `1px solid ${RULE}`, borderTop: `4px solid ${RED}` }}>
      <header className="px-6 sm:px-8 pt-6 pb-5" style={{ borderBottom: `1px solid ${RULE}` }}>
        <p className="m-0 mb-2" style={{ fontFamily: sans, fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: RED }}>
          Area {area.n} of 10 <span style={{ color: MUTED, fontWeight: 600 }}>&middot; tool page {area.page}</span>
        </p>
        <H className="m-0" style={{ fontFamily: display, fontWeight: 700, fontSize: "clamp(21px, 2.2vw, 26px)", color: INK, lineHeight: 1.25 }}>{area.title}</H>
      </header>
      <ol className="list-none m-0 px-6 sm:px-8 py-3">
        {area.questions.map((q, i) => (
          <li key={q} className="grid grid-cols-[30px_1fr] gap-3 py-3.5" style={{ borderTop: i ? `1px solid ${RULE}` : undefined }}>
            <span aria-hidden="true" style={{ fontFamily: display, fontWeight: 800, fontSize: 18, color: RED, lineHeight: 1.4 }}>{i + 1}</span>
            <span style={{ fontFamily: serif, fontSize: 17, color: INK, lineHeight: 1.6 }}>{q}</span>
          </li>
        ))}
      </ol>
      <footer className="px-6 sm:px-8 py-4" style={{ background: "#f7f4ee", borderTop: `1px solid ${RULE}` }}>
        <p className="m-0" style={{ fontFamily: sans, fontSize: 13, color: MUTED }}>
          In the tool, each question has three columns: self-evaluation, administrator feedback, goals set together.
        </p>
      </footer>
    </article>
  );
}

export default function GuidingQuestions() {
  const [g, setG] = useState(0);
  const [a, setA] = useState(0);
  const group = GROUPS[g];
  const pickGroup = (i: number) => { setG(i); setA(0); };
  const top = useRoving(GROUPS.length, pickGroup);
  const side = useRoving(group.areas.length, setA, true);
  const area = group.areas[Math.min(a, group.areas.length - 1)];

  return (
    <div>
      {/* Tool sections */}
      <div role="tablist" aria-label="Sections of the tool" className="grid grid-cols-2 lg:grid-cols-4 mb-8" style={{ border: `1px solid ${RULE}`, background: "#ffffff" }}>
        {GROUPS.map((gr, i) => {
          const on = i === g;
          return (
            <button
              key={gr.title}
              ref={(el) => { top.refs.current[i] = el; }}
              role="tab"
              id={`gq-tab-${i}`}
              aria-selected={on}
              aria-controls={`gq-panel-${i}`}
              tabIndex={on ? 0 : -1}
              onClick={() => pickGroup(i)}
              onKeyDown={(e) => top.onKeyDown(e, i)}
              className={`text-left px-4 sm:px-5 py-4 cursor-pointer transition-colors border-[#d4cfc6] ${i % 2 ? "border-l" : ""} ${i >= 2 ? "border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""} ${on ? "" : "hover:bg-[#f7f4ee]"}`}
              style={{ background: on ? DEEP : undefined, borderBottom: on ? `3px solid ${RED}` : "3px solid transparent" }}
            >
              <span className="block mb-1" style={{ fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: on ? "#f0c4ca" : RED }}>
                Section {i + 1} &middot; {gr.areas.length} {gr.areas.length === 1 ? "area" : "areas"}
              </span>
              <span className="block" style={{ fontFamily: display, fontWeight: 700, fontSize: 17, lineHeight: 1.3, color: on ? "#ffffff" : INK }}>{gr.short}</span>
            </button>
          );
        })}
      </div>

      {GROUPS.map((gr, i) => (
        <div key={gr.title} role="tabpanel" id={`gq-panel-${i}`} aria-labelledby={`gq-tab-${i}`} hidden={i !== g} tabIndex={0}>
          <p className="m-0 mb-5" style={{ fontFamily: serif, fontSize: 15, fontStyle: "italic", color: MUTED }}>In the tool: {gr.title}</p>

          {/* Desktop: area tabs left, questions right */}
          <div className="hidden lg:grid grid-cols-[300px_minmax(0,1fr)] gap-8 items-start">
            <div role="tablist" aria-label={`Areas in ${gr.short}`} aria-orientation="vertical" className="flex flex-col" style={{ borderTop: `1px solid ${RULE}` }}>
              {gr.areas.map((ar, j) => {
                const on = j === a;
                return (
                  <button
                    key={ar.title}
                    ref={(el) => { if (i === g) side.refs.current[j] = el; }}
                    role="tab"
                    id={`gq-area-${i}-${j}`}
                    aria-selected={on}
                    aria-controls={`gq-area-panel-${i}`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setA(j)}
                    onKeyDown={(e) => side.onKeyDown(e, j)}
                    className={`grid grid-cols-[34px_1fr] gap-2 text-left py-4 pr-3 cursor-pointer transition-colors ${on ? "" : "hover:bg-[#f7f4ee]"}`}
                    style={{ borderBottom: `1px solid ${RULE}`, borderLeft: `3px solid ${on ? RED : "transparent"}`, paddingLeft: 14, background: on ? "#ffffff" : undefined }}
                  >
                    <span style={{ fontFamily: display, fontWeight: 800, fontSize: 18, color: on ? RED : MUTED }}>{String(ar.n).padStart(2, "0")}</span>
                    <span style={{ fontFamily: serif, fontSize: 16, lineHeight: 1.4, color: INK, fontWeight: on ? 600 : 400 }}>{ar.title}</span>
                  </button>
                );
              })}
            </div>
            <div role="tabpanel" id={`gq-area-panel-${i}`} aria-labelledby={`gq-area-${i}-${Math.min(a, gr.areas.length - 1)}`}>
              {i === g && <QuestionCard area={area} />}
            </div>
          </div>

          {/* Phones and tablets: the section's areas as stacked cards */}
          <div className="lg:hidden grid grid-cols-1 gap-5">
            {gr.areas.map((ar) => <QuestionCard key={ar.title} area={ar} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
