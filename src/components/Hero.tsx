import { PROFILE, STATS } from "../lib/content";
import { ArrowRight, Download, GitHub } from "./Icons";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <header className="hero" id="top">
      <div className="hero-grid" aria-hidden="true" />
      <div className="wrap">
        <div className="hero-inner">
          <div>
            <span className="eyebrow">
              <span className="dot" aria-hidden="true" />
              {PROFILE.availability}
            </span>

            <h1>{PROFILE.name}</h1>

            <p className="role">
              <b>{PROFILE.role}</b>
              {PROFILE.roleSuffix}
            </p>

            <p className="lede">{PROFILE.lede}</p>

            <div className="cta">
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
              width={224}
              height={224}
              fetchPriority="high"
            />
          </div>
        </div>

        <Reveal className="stats">
          {STATS.map((stat) => (
            <div className="stat" key={stat.label}>
              <span className="stat-n">{stat.accent ? <em>{stat.value}</em> : stat.value}</span>
              <span className="stat-l">{stat.label}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </header>
  );
}
