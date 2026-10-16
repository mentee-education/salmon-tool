/*
 * One trail, from interview to theme, drawn as a distillation: a single fine track with four markers.
 * The type narrows as the idea is distilled: a large italic quote, then smaller and tighter steps,
 * landing on the theme in bold crimson. A soft tapering band sits behind the track.
 * Wide screens: a horizontal track. Phones: a vertical track with the same narrowing.
 */
import FadeIn from "@/components/FadeIn";

const RED = "#9B2335";
const INK = "#1a1a18";
const BODY = "#3d3d39";
const MUTED = "#5f5f58";
const TRACK = "#c9bfb1";

const STEPS = [
  { k: "What people said", t: "Ongoing self-improvement, openness to feedback, flexibility in teaching methods" },
  { k: "Code group", t: "Modelling growth mindset for students" },
  { k: "Sub-theme", t: "Embracing a growth mindset" },
  { k: "Theme", t: "Fostering a growth mindset and commitment to lifelong learning" },
];

function Text({ i, t }: { i: number; t: string }) {
  // one family, one size; the progression shows only through colour and a single emphasis
  const base: React.CSSProperties = { fontFamily: "'Source Serif 4', serif", fontSize: 17, lineHeight: 1.5, fontWeight: 400 };
  if (i === 0) return <p className="m-0" style={{ ...base, fontStyle: "italic", color: BODY }}>&ldquo;{t}&rdquo;</p>;
  if (i === 3) return (
    <div>
      <p className="m-0" style={{ ...base, color: RED }}>{t}</p>
      <span aria-hidden="true" className="block mt-3" style={{ width: 40, height: 2, background: RED }} />
    </div>
  );
  return <p className="m-0" style={{ ...base, color: INK }}>{t}</p>;
}

function Label({ k }: { k: string }) {
  return <p className="m-0" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: MUTED }}>{k}</p>;
}

function Marker({ i }: { i: number }) {
  const last = i === STEPS.length - 1;
  return <span aria-hidden="true" className="block rounded-full" style={{ width: last ? 18 : 12, height: last ? 18 : 12, background: last ? RED : "#fdfcf9", border: `2px solid ${RED}` }} />;
}

export default function Trail() {
  return (
    <figure className="m-0">
      <figcaption className="mb-6" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 22, color: INK }}>One Trail, From Interview to Theme</figcaption>

      {/* wide */}
      <div className="hidden md:block relative">
        <span aria-hidden="true" className="absolute left-0 right-0" style={{ top: 42, height: 1, background: TRACK }} />
        <ol className="list-none m-0 p-0 grid grid-cols-4 gap-8 relative">
          {STEPS.map((s, i) => (
            <li key={s.k} className="hv relative" style={{ paddingTop: 0 }}>
              <FadeIn delay={i * 0.12}>
                <div style={{ height: 30 }} className="flex items-end"><Label k={s.k} /></div>
                <div className="flex items-center" style={{ height: 24 }}><Marker i={i} /></div>
                <div className="pt-4 pr-2"><Text i={i} t={s.t} /></div>
              </FadeIn>
            </li>
          ))}
        </ol>
      </div>

      {/* phones */}
      <div className="md:hidden relative">
      <span aria-hidden="true" className="absolute" style={{ left: 8, top: 6, bottom: 34, width: 1, background: TRACK }} />
      <ol className="list-none m-0 p-0 relative" style={{ paddingLeft: 30 }}>
        {STEPS.map((s, i) => (
          <li key={s.k} className="relative pb-7">
            <FadeIn delay={i * 0.1}>
              <span className="absolute" style={{ left: i === 3 ? -30 : -28, top: 2 }}><Marker i={i} /></span>
              <Label k={s.k} />
              <div className="mt-2"><Text i={i} t={s.t} /></div>
            </FadeIn>
          </li>
        ))}
      </ol>
      </div>
    </figure>
  );
}
