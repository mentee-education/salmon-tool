/*
 * The SALMON growth cycle: four field-guide watercolours of real salmon life stages, arranged as a
 * clockwise cycle (Spawning, Fry, Smolt, Returning adult) around one idea: growth is a cycle, not a ladder.
 * Illustrations live in R2 (salmon-tool/lifecycle). Images are shown whole, never cropped by CSS.
 */
const RED = "#9B2335";
const INK = "#1a1a18";
const BODY = "#3d3d39";
const RULE = "#d4cfc6";
const R2 = "https://pub-0317bbc29b454318b7d27ef0bb324c99.r2.dev/lifecycle";

export const STAGES = [
  { id: "spawning", n: 1, name: "Spawning", sub: "Initiating growth", img: `${R2}/1-spawning.jpg`, alt: "Watercolour of salmon eggs and newly hatched alevins among river gravel", desc: "The beginning: exploring, discovering and building core skills, with support and mentorship close by." },
  { id: "fry", n: 2, name: "Fry", sub: "Emerging growth", img: `${R2}/2-fry.jpg`, alt: "Watercolour of young salmon fry swimming in shallow water near reeds and a root", desc: "Finding the flow: gaining independence and actively applying the foundational skills already built." },
  { id: "smolt", n: 3, name: "Smolt", sub: "Sustained growth", img: `${R2}/3-smolt.jpg`, alt: "Watercolour of a silvery salmon smolt swimming in a deeper river channel", desc: "Consistent, confident practice: adapting to diverse classroom needs and culturally responsive every day." },
  { id: "returning-adult", n: 4, name: "Returning adult", sub: "Thriving and leading", img: `${R2}/4-returning.jpg`, alt: "Watercolour of a red adult sockeye salmon leaping up a small rocky cascade", desc: "Mentors and role models who nurture students and colleagues, completing the cycle and starting it again." },
];

function Card({ s, href }: { s: (typeof STAGES)[number]; href?: string }) {
  const body = (
    <>
      <div className="overflow-hidden" style={{ border: `1px solid ${RULE}` }}>
        <img src={s.img} alt={s.alt} width={1600} height={1020} loading="lazy" className="photo-zoom w-full h-auto block" style={{ opacity: 0.92 }} />
      </div>
      <p className="m-0 mt-4 mb-1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: RED }}>
        Stage {s.n} &middot; {s.sub}
      </p>
      <h3 className="m-0 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 22, color: INK, lineHeight: 1.2 }}>{s.name}</h3>
      <p className="m-0" style={{ fontFamily: "'Source Serif 4', serif", fontSize: 15.5, color: BODY, lineHeight: 1.65 }}>{s.desc}</p>
    </>
  );
  return href ? <a href={href} className="card-lift block no-underline">{body}</a> : <div className="card-lift">{body}</div>;
}

/** A quiet row of four stages; the last returns to the first. linkTo is kept for compatibility. */
export default function Lifecycle({ linkTo }: { linkTo?: string; bg?: string }) {
  const href = (id: string) => (linkTo ? `${linkTo}#${id}` : undefined);
  return (
    <div>
      {/* wide: four stages with arrow columns in the gaps */}
      <ol className="list-none m-0 p-0 hidden xl:grid items-start" style={{ gridTemplateColumns: "minmax(0,1fr) 40px minmax(0,1fr) 40px minmax(0,1fr) 40px minmax(0,1fr)" }}>
        {STAGES.map((s, i) => (
          <li key={s.id} className="contents">
            <div><Card s={s} href={href(s.id)} /></div>
            {i < 3 && (
              <span aria-hidden="true" className="flex items-center justify-center" style={{ color: RED, height: 120 }}>
                <svg width="24" height="24" viewBox="0 0 28 28"><path d="M4 14 H22 M16 8 L22 14 L16 20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </span>
            )}
          </li>
        ))}
      </ol>
      {/* narrower: a two-column grid with clear gutters */}
      <ol className="list-none m-0 p-0 grid xl:hidden grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
        {STAGES.map((s) => <li key={s.id}><Card s={s} href={href(s.id)} /></li>)}
      </ol>
      <p className="m-0 mt-8 flex items-center gap-3" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 19, color: INK }}>
        <span aria-hidden="true" style={{ color: RED, fontStyle: "normal" }}>&#8634;</span>
        Growth is a cycle, not a ladder: returning adults mentor the next beginners.
      </p>
    </div>
  );
}
