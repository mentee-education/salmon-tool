/*
 * The nineteen people interviewed, as a dot grid: one dot per person, grouped by role, filled by identity.
 * A visually hidden table carries the same numbers for screen readers. Families and Elders, who were part
 * of the conversation without being counted here, are noted around the grid (no invented numbers).
 */
import FadeIn from "@/components/FadeIn";
import { participants } from "@/data/research";

const RED = "#9B2335";
const OXB = "#5d131e";
const MID = "#b5576a";
const INK = "#1a1a18";
const BODY = "#3d3d39";
const MUTED = "#5f5f58";
const sans = "'DM Sans', sans-serif";
const display = "'Playfair Display', serif";
const serif = "'Source Serif 4', serif";

const KINDS = [
  { key: "stolo", label: "Stó:lō", fill: OXB, ring: OXB },
  { key: "ind", label: "Indigenous, other Nations", fill: MID, ring: MID },
  { key: "non", label: "Non-Indigenous", fill: "#fdfcf9", ring: OXB },
] as const;

function Dot({ kind, i }: { kind: (typeof KINDS)[number]; i: number }) {
  return <span className="person-dot inline-block rounded-full" style={{ width: 22, height: 22, background: kind.fill, border: `2px solid ${kind.ring}`, transitionDelay: `${i * 40}ms` }} />;
}

export default function People() {
  return (
    <div>
      <div className="relative p-5 sm:p-7" style={{ border: `1px dashed ${MID}`, borderRadius: 4 }}>
        <p className="absolute m-0 px-2" style={{ top: -10, left: 16, background: "#fdfcf9", fontFamily: sans, fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase", color: RED }}>
          Also in the conversation: families and Elders
        </p>
        <ul className="list-none m-0 p-0" aria-hidden="true">
          {participants.map((p, gi) => {
            const dots = [
              ...Array(p.stolo).fill(KINDS[0]),
              ...Array(p.ind).fill(KINDS[1]),
              ...Array(p.non).fill(KINDS[2]),
            ];
            return (
              <li key={p.role} className="people-group grid grid-cols-[56px_1fr] gap-4 items-center py-3" style={{ borderTop: gi ? "1px solid #e6dfd3" : undefined }}>
                <span style={{ fontFamily: display, fontWeight: 700, fontSize: 36, color: INK, lineHeight: 1 }}>{p.total}</span>
                <div>
                  <p className="m-0 mb-2 flex flex-wrap items-baseline gap-x-3" style={{ fontFamily: serif, fontSize: 15.5, color: INK }}>
                    {p.role}
                    <span className="people-count" style={{ fontFamily: sans, fontSize: 12, color: MUTED }}>
                      {p.stolo} Stó:lō &middot; {p.ind} other Nations &middot; {p.non} non-Indigenous
                    </span>
                  </p>
                  <FadeIn delay={gi * 0.08}>
                    <span className="flex flex-wrap gap-1.5">{dots.map((k, i) => <Dot key={i} kind={k} i={i} />)}</span>
                  </FadeIn>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-5 pt-4" aria-hidden="true" style={{ borderTop: "1px solid #e6dfd3" }}>
          {KINDS.map((k) => (
            <span key={k.key} className="inline-flex items-center gap-2" style={{ fontFamily: sans, fontSize: 12.5, color: BODY }}>
              <span className="inline-block rounded-full" style={{ width: 14, height: 14, background: k.fill, border: `2px solid ${k.ring}` }} />
              {k.label}
            </span>
          ))}
        </div>
      </div>
      <p className="m-0 mt-4" style={{ fontFamily: serif, fontStyle: "italic", fontSize: 16, color: BODY, lineHeight: 1.65 }}>
        Ten teachers, seven educational assistants, the Halq&rsquo;eméylem curriculum developer and the vice-principal:
        seven Stó:lō, six Indigenous from other Nations, six non-Indigenous.
      </p>
      <div className="sr-only"><table>
        <caption>Interviewed: 19 people, by role and identity</caption>
        <thead><tr><th scope="col">Role</th><th scope="col">Total</th><th scope="col">Stó:lō</th><th scope="col">Indigenous, other Nations</th><th scope="col">Non-Indigenous</th></tr></thead>
        <tbody>
          {participants.map((p) => <tr key={p.role}><th scope="row">{p.role}</th><td>{p.total}</td><td>{p.stolo}</td><td>{p.ind}</td><td>{p.non}</td></tr>)}
          <tr><th scope="row">All participants</th><td>19</td><td>7</td><td>6</td><td>6</td></tr>
        </tbody>
      </table></div>
    </div>
  );
}
