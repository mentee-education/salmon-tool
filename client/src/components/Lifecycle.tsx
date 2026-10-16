/*
 * The SALMON growth cycle: four field-guide watercolours of real salmon life stages, arranged as a
 * clockwise cycle (Spawning, Fry, Smolt, Returning adult) around one idea: growth is a cycle, not a ladder.
 * Illustrations live in R2 (salmon-tool/lifecycle). Images are shown whole, never cropped by CSS.
 */
const RED = "#9B2335";
const DEEP = "#5d131e";
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
      <img src={s.img} alt={s.alt} width={1600} height={1020} loading="lazy" className="w-full h-auto block" style={{ borderBottom: `1px solid ${RULE}` }} />
      <div className="p-5 sm:p-6">
        <p className="m-0 mb-1" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: RED }}>
          Stage {s.n} &middot; {s.sub}
        </p>
        <h3 className="m-0 mb-2" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 24, color: INK, lineHeight: 1.2 }}>{s.name}</h3>
        <p className="m-0" style={{ fontFamily: "'Source Serif 4', serif", fontSize: 15.5, color: BODY, lineHeight: 1.65 }}>{s.desc}</p>
      </div>
    </>
  );
  const style = { background: "#ffffff", border: `1px solid ${RULE}`, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" };
  return href ? (
    <a href={href} className="block h-full no-underline transition-shadow duration-200 hover:shadow-md" style={style}>{body}</a>
  ) : (
    <div className="h-full" style={style}>{body}</div>
  );
}

function Arrow({ dir }: { dir: "right" | "down" | "left" | "up" }) {
  const rot = { right: 0, down: 90, left: 180, up: 270 }[dir];
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true" style={{ transform: `rotate(${rot}deg)`, display: "block" }}>
      <circle cx="22" cy="22" r="21" fill={RED} />
      <path d="M13 22 H29 M23 15 L30 22 L23 29" stroke="#fff" strokeWidth="2.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** linkTo: when set (e.g. "/journey"), each card links to that page's stage section. */
export default function Lifecycle({ linkTo, bg = "#efeae1" }: { linkTo?: string; bg?: string }) {
  const [s1, s2, s3, s4] = STAGES;
  const href = (id: string) => (linkTo ? `${linkTo}#${id}` : undefined);
  return (
    <div>
      {/* Desktop: a true clockwise cycle, Spawning top left, Fry top right, Smolt bottom right, Returning adult bottom left */}
      <div className="hidden lg:block relative">
        <ol className="list-none m-0 p-0 grid grid-cols-2" style={{ columnGap: 112, rowGap: 96 }}>
          <li><Card s={s1} href={href(s1.id)} /></li>
          <li><Card s={s2} href={href(s2.id)} /></li>
          <li style={{ gridColumn: 2, gridRow: 2 }}><Card s={s3} href={href(s3.id)} /></li>
          <li style={{ gridColumn: 1, gridRow: 2 }}><Card s={s4} href={href(s4.id)} /></li>
        </ol>
        <div className="absolute" style={{ left: "50%", top: "22%", transform: "translate(-50%, -50%)" }}><Arrow dir="right" /></div>
        <div className="absolute" style={{ left: "75%", top: "50%", transform: "translate(-50%, -50%)" }}><Arrow dir="down" /></div>
        <div className="absolute" style={{ left: "50%", top: "78%", transform: "translate(-50%, -50%)" }}><Arrow dir="left" /></div>
        <div className="absolute" style={{ left: "25%", top: "50%", transform: "translate(-50%, -50%)" }}><Arrow dir="up" /></div>
        <div className="absolute flex items-center justify-center text-center" style={{ left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: 168, height: 168, borderRadius: "50%", background: DEEP, boxShadow: `0 0 0 10px ${bg}` }}>
          <p className="m-0 px-4" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 19, lineHeight: 1.25, color: "#ffffff" }}>Growth is a cycle, not a ladder</p>
        </div>
      </div>

      {/* Phones and tablets: the same cycle as a sequence that returns to the start */}
      <ol className="lg:hidden list-none m-0 p-0 grid grid-cols-1 md:grid-cols-2 gap-5">
        {STAGES.map((s) => (
          <li key={s.id}><Card s={s} href={href(s.id)} /></li>
        ))}
      </ol>
      <p className="lg:hidden m-0 mt-5 flex items-center gap-3" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 18, color: INK }}>
        <span aria-hidden="true" style={{ display: "inline-flex" }}><Arrow dir="up" /></span>
        Growth is a cycle, not a ladder: returning adults mentor the next beginners.
      </p>
    </div>
  );
}
