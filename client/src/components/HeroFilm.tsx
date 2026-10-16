/*
 * A film that plays from its own still as the cover (no text on the image), in one click.
 * The cover click creates a YouTube IFrame API player and calls playVideo() when it is ready. If playback
 * has not started after about 800 ms (Safari's autoplay rules), it plays muted and offers "Tap for sound"
 * outside the frame. "Back to photo" also sits outside the frame. The film returns to its still when the tab
 * is hidden, when it scrolls out of view, or when another film on the page starts.
 */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Play, Volume2 } from "lucide-react";

export type HeroFilmHandle = { play: () => void };

type Props = { id: string; poster: string; title: string; credit?: string; dark?: boolean; contained?: boolean };

const EVENT = "salmon:film-play";

type YTPlayer = { playVideo(): void; mute(): void; unMute(): void; getPlayerState(): number; destroy(): void };
declare global {
  interface Window { YT?: { Player: new (el: HTMLElement, opts: unknown) => YTPlayer }; onYouTubeIframeAPIReady?: () => void }
}

let apiPromise: Promise<void> | null = null;
function loadApi(): Promise<void> {
  if (window.YT?.Player) return Promise.resolve();
  if (!apiPromise) {
    apiPromise = new Promise((resolve) => {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(); };
      const s = document.createElement("script");
      s.src = "https://www.youtube.com/iframe_api";
      s.async = true;
      document.head.appendChild(s);
    });
  }
  return apiPromise;
}

const HeroFilm = forwardRef<HeroFilmHandle, Props>(function HeroFilm({ id, poster, title, credit, dark = false, contained = false }, ref) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const timerRef = useRef<number | undefined>(undefined);

  const stop = () => {
    window.clearTimeout(timerRef.current);
    try { playerRef.current?.destroy(); } catch { /* already gone */ }
    playerRef.current = null;
    setMuted(false);
    setPlaying(false);
    frameRef.current?.setAttribute("data-state", "cover");
  };

  const start = () => {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
    setPlaying(true);
  };

  // build the player once the mount point exists (right after the cover click)
  useEffect(() => {
    if (!playing || playerRef.current) return;
    let cancelled = false;
    loadApi().then(() => {
      if (cancelled || !mountRef.current || !window.YT) return;
      const host = document.createElement("div");
      mountRef.current.appendChild(host);
      playerRef.current = new window.YT.Player(host, {
        videoId: id,
        host: "https://www.youtube-nocookie.com",
        width: "100%",
        height: "100%",
        playerVars: { autoplay: 1, playsinline: 1, rel: 0, modestbranding: 1 },
        events: {
          onReady: (e: { target: YTPlayer }) => {
            e.target.playVideo();
            timerRef.current = window.setTimeout(() => {
              const p = playerRef.current;
              if (p && p.getPlayerState() !== 1) { p.mute(); p.playVideo(); setMuted(true); }
            }, 800);
          },
          onStateChange: (e: { data: number }) => { frameRef.current?.setAttribute("data-state", String(e.data)); },
        },
      });
      const iframe = mountRef.current.querySelector("iframe");
      if (iframe) { iframe.setAttribute("title", title); iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture; fullscreen"); }
    });
    return () => { cancelled = true; };
  }, [playing, id, title]);

  useImperativeHandle(ref, () => ({
    play: () => { frameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); start(); },
  }));

  useEffect(() => {
    const other = (e: Event) => { if ((e as CustomEvent).detail !== id && playerRef.current) stop(); };
    window.addEventListener(EVENT, other);
    return () => window.removeEventListener(EVENT, other);
  }, [id]);

  useEffect(() => {
    if (!playing) return;
    const hidden = () => { if (document.hidden) stop(); };
    document.addEventListener("visibilitychange", hidden);
    const el = frameRef.current;
    let seen = false;
    const io = new IntersectionObserver(([e]) => {
      if (e.intersectionRatio >= 0.5) seen = true;
      else if (seen && e.intersectionRatio < 0.25) stop();
    }, { threshold: [0, 0.25, 0.5, 1] });
    if (el) io.observe(el);
    return () => { document.removeEventListener("visibilitychange", hidden); io.disconnect(); };
  }, [playing]);

  useEffect(() => () => { window.clearTimeout(timerRef.current); try { playerRef.current?.destroy(); } catch { /* noop */ } }, []);

  const ink = dark ? "#ffffff" : "#1a1a18";
  const muted_ = dark ? "rgba(255,255,255,0.72)" : "#5f5f58";
  const accent = dark ? "#f0c4ca" : "#9B2335";
  const small = { fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, padding: "9px 16px", border: `1px solid ${accent}`, color: accent, background: "transparent" };

  return (
    <div>
      <div ref={frameRef} data-film={id} data-state="cover" className="film-cover relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9", background: "#0f0f0d" }}>
        {playing ? (
          <div ref={mountRef} className="absolute inset-0 [&>div]:w-full [&>div]:h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0" />
        ) : (
          <button type="button" onClick={start} aria-label={`Play the film: ${title}`} className="group absolute inset-0 w-full h-full cursor-pointer" style={{ border: 0, padding: 0, background: "none" }}>
            <img src={poster} alt="" width={1920} height={1080} className="film-poster absolute inset-0 w-full h-full object-cover" />
            <span className="film-sheen absolute inset-0" />
            <span aria-hidden="true" className="film-play absolute left-1/2 top-1/2 flex items-center justify-center rounded-full" style={{ width: contained ? "clamp(60px, 6vw, 84px)" : "clamp(68px, 8vw, 104px)", height: contained ? "clamp(60px, 6vw, 84px)" : "clamp(68px, 8vw, 104px)", background: "rgba(253,252,249,0.94)", boxShadow: "0 12px 40px rgba(0,0,0,0.35)" }}>
              <Play size={contained ? 24 : 30} fill="#9B2335" color="#9B2335" style={{ marginLeft: 4 }} />
            </span>
          </button>
        )}
      </div>
      <div className={`flex items-center justify-between gap-4 py-3 ${contained ? "" : "px-4 sm:px-6 mx-auto"}`} style={{ maxWidth: contained ? undefined : 1240, minHeight: 52 }}>
        <p className="m-0" style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, color: muted_ }}>
          <span style={{ color: ink, fontWeight: 600 }}>{title}</span>{credit ? <> &middot; {credit}</> : null}
        </p>
        {playing && (
          <div className="flex gap-2 shrink-0">
            {muted && (
              <button type="button" onClick={() => { playerRef.current?.unMute(); setMuted(false); }} className="btn-lift inline-flex items-center gap-2 cursor-pointer" style={small}>
                <Volume2 size={14} /> Tap for sound
              </button>
            )}
            <button type="button" onClick={stop} className="btn-lift cursor-pointer" style={small}>Back to photo</button>
          </div>
        )}
      </div>
    </div>
  );
});

export default HeroFilm;
