import type { CaseStudy } from "../lib/content";
import { CASES } from "../lib/content";
import { Bolt, Check } from "./Icons";
import { Reveal } from "./Reveal";

function Case({ study }: { study: CaseStudy }) {
  return (
    <Reveal as="article" className={`case ${study.featured ? "case-feature" : ""}`.trim()}>
      <div className="case-top">
        <div>
          <h3>{study.title}</h3>
          <p className="tagline">{study.tagline}</p>
        </div>
        <div className="tags">
          {study.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <p className="case-body">{study.body}</p>

      {study.points.length > 0 && (
        <ul className="detail">
          {study.points.map((point, i) => (
            <li key={i}>
              <Check className="tick" />
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
            <Check className="tick" />
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
        <div className="outcome">
          <Bolt />
          <span>
            {study.outcomeLead && <b>{study.outcomeLead}</b>}
            {study.outcome}
          </span>
        </div>
      )}
    </Reveal>
  );
}

export function Work() {
  const [featured, ...rest] = CASES;
  // Pair the middle four into two-up rows, keep the last one full width.
  const paired = rest.slice(0, 4);
  const trailing = rest.slice(4);

  return (
    <section id="work">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="sec-label">Selected work</p>
          <h2>Features I designed, built and shipped</h2>
          <p>
            Most of this code is in private company repositories, so here is what I built and the
            reasoning behind it. I am happy to walk through any of it live.
          </p>
        </Reveal>

        <div className="work">
          <Case study={featured} />

          {[0, 2].map((start) => (
            <div className="pair" key={start}>
              {paired.slice(start, start + 2).map((study) => (
                <Case study={study} key={study.id} />
              ))}
            </div>
          ))}

          {trailing.map((study) => (
            <Case study={study} key={study.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
