/*
 * A film that plays from its own still as the cover (no text on the image), in one click.
 * The cover click creates a YouTube IFrame API player and calls playVideo() when it is ready. If playback
 * has not started after about 800 ms (Safari's autoplay rules), it plays muted and offers "Tap for sound"
 * outside the frame. "Back to photo" also sits outside the frame. The film returns to its still when the tab
 * is hidden, when it scrolls out of view, or when another film on the page starts.
 */
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";

export type HeroFilmHandle = { play: () => void };

type Props = { id: string; poster: string; title: string; credit?: string; dark?: boolean; contained?: boolean };

const EVENT = "salmon:film-play";

type YTPlayer = { playVideo(): void; pauseVideo(): void; mute(): void; unMute(): void; isMuted(): boolean; setVolume(v: number): void; getPlayerState(): number; destroy(): void };
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
  const readyRef = useRef(false);
  const playingRef = useRef(false);
  useEffect(() => { playingRef.current = playing; }, [playing]);

  const stop = () => {
    window.clearTimeout(timerRef.current);
    try { playerRef.current?.pauseVideo(); } catch { /* not ready */ }
    setMuted(false);
    setPlaying(false);
    frameRef.current?.setAttribute("data-state", "cover");
  };

  const report = () => {
    const p = playerRef.current;
    if (!p || !frameRef.current) return;
    try { frameRef.current.setAttribute("data-muted", String(p.isMuted())); } catch { /* not ready */ }
  };

  // audible playback was refused: play muted, and restore sound on the very next interaction
  const fallBack = () => {
    const p = playerRef.current; if (!p) return;
    p.mute(); p.playVideo(); setMuted(true); report();
    const restore = () => { const q = playerRef.current; if (q) { q.unMute(); q.setVolume(100); setMuted(false); window.setTimeout(report, 50); } };
    window.addEventListener("pointerdown", restore, { once: true });
    window.addEventListener("keydown", restore, { once: true });
  };

  // build the player synchronously inside the click, so audible playback counts as a user gesture
  const build = (autoplay = true) => {
    if (playerRef.current || !mountRef.current || !window.YT?.Player) return false;
    const host = document.createElement("div");
    mountRef.current.innerHTML = "";
    mountRef.current.appendChild(host);
    playerRef.current = new window.YT.Player(host, {
      videoId: id,
      host: "https://www.youtube-nocookie.com",
      width: "100%",
      height: "100%",
      playerVars: { autoplay: autoplay ? 1 : 0, playsinline: 1, rel: 0, modestbranding: 1, mute: 0 },
      events: {
        onReady: (e: { target: YTPlayer }) => {
          readyRef.current = true;
          if (!autoplay) return;
          e.target.unMute(); e.target.setVolume(100); e.target.playVideo();
          // safety net: if nothing has started after a few seconds, try muted playback
          timerRef.current = window.setTimeout(() => { const p = playerRef.current; if (p && p.getPlayerState() === -1) fallBack(); }, 5000);
        },
        // YouTube reports this when the browser refuses audible autoplay (Safari, strict settings)
        onAutoplayBlocked: () => { frameRef.current?.setAttribute("data-blocked", "true"); fallBack(); },
        onStateChange: (e: { data: number }) => { if (playingRef.current) { frameRef.current?.setAttribute("data-state", String(e.data)); report(); } },
      },
    });
    const iframe = mountRef.current.querySelector("iframe");
    if (iframe) { iframe.setAttribute("title", title); iframe.setAttribute("allow", "autoplay; encrypted-media; picture-in-picture; fullscreen"); }
    return true;
  };

  const start = () => {
    window.dispatchEvent(new CustomEvent(EVENT, { detail: id }));
    playingRef.current = true;
    setPlaying(true);
    const p = playerRef.current;
    if (p && readyRef.current) {
      // the player is already loaded: unmute and play inside the click itself (a user gesture)
      p.unMute(); p.setVolume(100); p.playVideo();
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => { const q = playerRef.current; if (q && q.getPlayerState() === -1) fallBack(); }, 5000);
      return;
    }
    if (!build(true)) loadApi().then(() => build(true));
  };

  const toggleSound = () => {
    const p = playerRef.current; if (!p) return;
    if (muted) { p.unMute(); p.setVolume(100); setMuted(false); } else { p.mute(); setMuted(true); }
    window.setTimeout(report, 50);
  };

  useImperativeHandle(ref, () => ({
    play: () => { frameRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }); start(); },
  }));

  useEffect(() => {
    loadApi();
    const el = frameRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      loadApi().then(() => { if (!playerRef.current) build(false); });
    }, { rootMargin: "600px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

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
        <div ref={mountRef} className="absolute inset-0 [&>div]:w-full [&>div]:h-full [&_iframe]:w-full [&_iframe]:h-full [&_iframe]:border-0" />
        {!playing && (
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
            <button type="button" aria-pressed={muted} onClick={toggleSound} className="btn-lift inline-flex items-center gap-2 cursor-pointer" style={small}>
              {muted ? <><Volume2 size={14} /> Sound on</> : <><VolumeX size={14} /> Sound off</>}
            </button>
            <button type="button" onClick={stop} className="btn-lift cursor-pointer" style={small}>Back to photo</button>
          </div>
        )}
      </div>
    </div>
  );
});

export default HeroFilm;
