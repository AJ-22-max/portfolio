import type { KeyboardEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { CaseStudy } from "../lib/content";
import { CASES } from "../lib/content";
import { ArrowRight, Check } from "./Icons";
import { Reveal } from "./Reveal";

function Slide({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <article className="slide" aria-roledescription="slide" aria-label={`${index + 1} of ${CASES.length}: ${study.title}`}>
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
  const count = CASES.length;

  const goTo = useCallback((i: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(count - 1, i));
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (!slide) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: slide.offsetLeft, behavior: reduce ? "auto" : "smooth" });
  }, [count]);

  // Derive the active slide from scroll position, so swipes and arrows agree.
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
          const centre = s.offsetLeft + s.offsetWidth / 2;
          const d = Math.abs(centre - mid);
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

          <div
            className="slider-track"
            ref={trackRef}
            tabIndex={0}
            role="group"
            aria-roledescription="carousel"
            aria-label="Selected work"
            onKeyDown={onKeyDown}
          >
            {CASES.map((study, i) => (
              <Slide study={study} index={i} key={study.id} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
