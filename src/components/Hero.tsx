import { PROFILE, STATS } from "../lib/content";
import { ArrowRight, Download, GitHub } from "./Icons";
import { Reveal } from "./Reveal";

export function Hero() {
  const [first, ...rest] = PROFILE.name.split(" ");

  return (
    <header className="hero" id="top">
      <div className="hero-bg" aria-hidden="true" />
            <div className="wrap">
        <div className="hero-top">
          <div>
            <span className="status eyebrow">
              <span className="pulse" aria-hidden="true">
                <span />
                <span />
              </span>
              {PROFILE.availability}
            </span>

            <h1>
              {first} <span className="surname">{rest.join(" ")}</span>
            </h1>

            <p className="hero-role">
              <b>{PROFILE.role}</b>
              <span className="sep">/</span>
              React + TypeScript
              <span className="sep">/</span>
              {PROFILE.location}
            </p>

            <p className="hero-lede">{PROFILE.lede}</p>

            <div className="hero-cta">
              <a className="btn btn-primary" href="#work">
                See my work
                <ArrowRight />
              </a>
              <a className="btn" href={PROFILE.cv}>
                <Download />
                Download CV
              </a>
              <a className="btn" href={PROFILE.github} rel="noopener noreferrer" target="_blank">
                <GitHub />
                GitHub
              </a>
            </div>
          </div>

          <div className="portrait">
            <img
              src={PROFILE.photo}
              alt={`Portrait of ${PROFILE.name}`}
              width={232}
              height={264}
              fetchPriority="high"
            />
          </div>
        </div>

        <Reveal className="facts-row">
          {STATS.map((stat) => (
            <div className="fact-cell" key={stat.label}>
              <span className="fact-n">{stat.accent ? <em>{stat.value}</em> : stat.value}</span>
              <span className="fact-l">{stat.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </header>
  );
}
