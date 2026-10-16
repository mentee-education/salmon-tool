/*
 * The SALMON growth cycle: four stages of educator growth drawn as a clockwise cycle,
 * with the stage descriptions as a real ordered list beside it (the diagram is the summary,
 * the list carries the content for every reader).
 */
const RED = "#9B2335";
const DEEP = "#5d131e";
const INK = "#1a1a18";
const BODY = "#3d3d39";
const RULE = "#d4cfc6";

export const STAGES = [
  { name: "Spawning", sub: "Initiating growth", desc: "The beginning of the journey: exploring, discovering and building core skills, with support and mentorship close by." },
  { name: "Fry", sub: "Emerging growth", desc: "Finding the flow: gaining independence and actively applying the foundational skills teachers have developed." },
  { name: "Smolt", sub: "Sustained growth", desc: "Consistent, confident practice: adapting to diverse classroom needs and culturally responsive every day." },
  { name: "Returning adult", sub: "Thriving and leading", desc: "Mentors and role models who nurture the growth of students and colleagues, completing a full cycle of growth." },
];

const CX = 405, CY = 235, R = 150, NODE = 30;
const ANGLES = [-90, 0, 90, 180];
const pt = (deg: number, r = R) => [CX + r * Math.cos((deg * Math.PI) / 180), CY + r * Math.sin((deg * Math.PI) / 180)];

function arc(from: number, to: number) {
  const gap = 17;
  const [x1, y1] = pt(from + gap);
  const [x2, y2] = pt(to - gap);
  return `M ${x1.toFixed(1)} ${y1.toFixed(1)} A ${R} ${R} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

const LABELS = [
  { x: CX, y: 28, anchor: "middle" },
  { x: CX + R + NODE + 14, y: CY - 3, anchor: "start" },
  { x: CX, y: CY + R + 50, anchor: "middle" },
  { x: CX - R - NODE - 14, y: CY - 3, anchor: "end" },
] as const;

export default function LifecycleDiagram({ showList = true }: { showList?: boolean }) {
  return (
    <div className={`grid grid-cols-1 ${showList ? "xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]" : ""} gap-8 xl:gap-12 items-center`}>
      <svg viewBox="0 0 790 470" role="img" aria-labelledby="cycle-title cycle-desc" className="w-full h-auto block mx-auto" style={{ maxWidth: 640 }}>
        <title id="cycle-title">The SALMON growth cycle</title>
        <desc id="cycle-desc">Four stages in a clockwise cycle: 1 Spawning, initiating growth; 2 Fry, emerging growth; 3 Smolt, sustained growth; 4 Returning adult, thriving and leading, which leads back to the start.</desc>
        <defs>
          <marker id="cycle-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={RED} />
          </marker>
        </defs>
        <circle cx={CX} cy={CY} r={R} fill="none" stroke={RULE} strokeWidth="1" />
        {ANGLES.map((a, i) => (
          <path key={a} d={arc(a, ANGLES[(i + 1) % 4] + (i === 3 ? 360 : 0))} fill="none" stroke={RED} strokeWidth="3" markerEnd="url(#cycle-arrow)" />
        ))}
        <text x={CX} y={CY - 8} textAnchor="middle" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 24, fill: INK }}>Growth is a cycle,</text>
        <text x={CX} y={CY + 24} textAnchor="middle" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 24, fill: INK }}>not a ladder</text>
        {ANGLES.map((a, i) => {
          const [x, y] = pt(a);
          return (
            <g key={STAGES[i].name}>
              <circle cx={x} cy={y} r={NODE} fill={DEEP} />
              <text x={x} y={y + 9} textAnchor="middle" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 26, fill: "#ffffff" }}>{i + 1}</text>
              <text x={LABELS[i].x} y={LABELS[i].y} textAnchor={LABELS[i].anchor} style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 24, fill: INK }}>{STAGES[i].name}</text>
              <text className="hidden sm:inline" x={LABELS[i].x} y={LABELS[i].y + 22} textAnchor={LABELS[i].anchor} style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 14, letterSpacing: "0.08em", fill: RED }}>{STAGES[i].sub.toUpperCase()}</text>
            </g>
          );
        })}
      </svg>
      {showList && (
        <ol className="list-none m-0 p-0">
          {STAGES.map((s, i) => (
            <li key={s.name} className="grid grid-cols-[auto_1fr] gap-4 py-4" style={{ borderTop: `1px solid ${RULE}` }}>
              <span aria-hidden="true" className="flex items-center justify-center" style={{ width: 34, height: 34, borderRadius: "50%", background: DEEP, color: "#fff", fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 16 }}>{i + 1}</span>
              <div>
                <h3 className="m-0 mb-1" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 19, color: INK, lineHeight: 1.3 }}>
                  {s.name} <span style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 600, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase", color: RED, marginLeft: 6 }}>{s.sub}</span>
                </h3>
                <p className="m-0" style={{ fontFamily: "'Source Serif 4', serif", fontSize: 15, color: BODY, lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
