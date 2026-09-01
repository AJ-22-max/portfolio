import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CaseStudy } from "../lib/content";
import { CASES } from "../lib/content";
import { ArrowRight, Check, Pause, Play } from "./Icons";
import { Reveal } from "./Reveal";

/** How long each slide holds before advancing. */
const DWELL_MS = 6500;

function Slide({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <article
      className="slide"
      aria-roledescription="slide"
      aria-label={`${index + 1} of ${CASES.length}: ${study.title}`}
    >
      <div className="slide-head">
        <span className="slide-num">{String(index + 1).padStart(2, "0")}</span>
        <span className="case-scope eyebrow">{study.scope}</span>
      </div>

      <h3>{study.title}</h3>
      <p className="case-tagline">{study.tagline}</p>
      <p className="case-body">{study.body}</p>

      {study.points.length > 0 && (
        <ul className="detail">
          {study.points.map((point, i) => (
            <li key={i}>
              <Check size={16} className="tick" />
              <span>
                {point.lead && <b>{point.lead} </b>}
                {point.text}
              </span>
            </li>
          ))}
        </ul>
      )}

      {study.link && (
        <ul className="detail">
          <li>
            <Check size={16} className="tick" />
            <span>
              <a href={study.link.href} rel="noopener noreferrer" target="_blank">
                {study.link.label}
              </a>
              , if you would rather read the code than take my word for it.
            </span>
          </li>
        </ul>
      )}

      {study.outcome && (
        <p className="outcome">
          {study.outcomeLead && <b>{study.outcomeLead}</b>}
          {study.outcome}
        </p>
      )}

      <div className="tags">
        {study.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}

export function Work() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  /** User pressed pause, or took manual control of the slider. */
  const [playing, setPlaying] = useState(true);
  /** Transient pause: pointer over the slider, focus inside it, or tab hidden. */
  const [held, setHeld] = useState(false);
  /** Track height follows the active slide so short cards leave no dead space. */
  const [trackH, setTrackH] = useState<number | undefined>(undefined);
  const count = CASES.length;

  const scrollToIndex = useCallback(
    (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = ((i % count) + count) % count;
      const slide = track.children[clamped] as HTMLElement | undefined;
      if (!slide) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.scrollTo({ left: slide.offsetLeft, behavior: reduce ? "auto" : "smooth" });
    },
    [count],
  );

  /** Navigation the user asked for: stops autoplay for good. */
  const goTo = useCallback(
    (i: number) => {
      setPlaying(false);
      scrollToIndex(Math.max(0, Math.min(count - 1, i)));
    },
    [count, scrollToIndex],
  );

  // Derive the active slide from scroll position, so swipes, arrows, dots and
  // autoplay never disagree about where we are.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const slides = Array.from(track.children) as HTMLElement[];
        const mid = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let best = Infinity;
        slides.forEach((s, i) => {
          const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - mid);
          if (d < best) {
            best = d;
            nearest = i;
          }
        });
        setActive(nearest);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Autoplay: schedule the next advance whenever the active slide settles.
  useEffect(() => {
    if (!playing || held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => scrollToIndex(active + 1), DWELL_MS);
    return () => window.clearTimeout(t);
  }, [active, playing, held, scrollToIndex]);

  // Size the track to whichever slide is showing. ResizeObserver keeps it
  // honest when fonts load, text reflows, or the viewport changes.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const slide = track.children[active] as HTMLElement | undefined;
      if (slide) setTrackH(slide.offsetHeight);
    };
    measure();
    const ro = new ResizeObserver(measure);
    Array.from(track.children).forEach((c) => ro.observe(c));
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [active]);

  // Do not animate against a tab nobody is looking at.
  useEffect(() => {
    const onVis = () => setHeld(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goTo(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      goTo(active - 1);
    }
  };

  return (
    <section id="work">
      <div className="wrap">
        <Reveal as="div" className="sec-head">
          <span className="eyebrow">Selected work</span>
          <h2>Features I designed, built and shipped</h2>
          <p className="sec-note">
            This work belongs to my employer and their clients, so there are no screenshots here.
            What follows is what I built, the problem it solved, and the reasoning behind it. I am
            happy to walk through any of it on a call.
          </p>
        </Reveal>

        <Reveal className="slider">
          <div
            className="slider-track"
            ref={trackRef}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label="Selected work"
            onKeyDown={onKeyDown}
            onMouseEnter={() => setHeld(true)}
            onMouseLeave={() => setHeld(false)}
            onFocus={() => setHeld(true)}
            onBlur={() => setHeld(false)}
            onPointerDown={() => setPlaying(false)}
            style={trackH ? { height: trackH } : undefined}
          >
            {CASES.map((study, i) => (
              <Slide study={study} index={i} key={study.id} />
            ))}
          </div>

          <div className="slider-bar">
            <span className="slider-count">
              <b>{String(active + 1).padStart(2, "0")}</b>
              <span className="slider-sep">/</span>
              {String(count).padStart(2, "0")}
            </span>

            <div className="slider-dots" role="tablist" aria-label="Choose a project">
              {CASES.map((study, i) => (
                <button
                  key={study.id}
                  type="button"
                  role="tab"
                  className="dot"
                  data-on={i === active}
                  aria-selected={i === active}
                  aria-label={study.title}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>

            <div className="slider-arrows">
              <button
                type="button"
                className="icon-btn slider-play"
                onClick={() => setPlaying((v) => !v)}
                aria-label={playing ? "Pause automatic sliding" : "Play automatic sliding"}
              >
                {playing ? <Pause /> : <Play />}
              </button>
              <button
                type="button"
                className="icon-btn arrow-prev"
                onClick={() => goTo(active - 1)}
                disabled={active === 0}
                aria-label="Previous project"
              >
                <ArrowRight size={16} />
              </button>
              <button
                type="button"
                className="icon-btn"
                onClick={() => goTo(active + 1)}
                disabled={active === count - 1}
                aria-label="Next project"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
