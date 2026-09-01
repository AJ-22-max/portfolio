import type { CaseStudy } from "../lib/content";
import { CASES } from "../lib/content";
import { Check } from "./Icons";
import { Reveal } from "./Reveal";

function Case({ study, index }: { study: CaseStudy; index: number }) {
  return (
    <Reveal as="article" className="case">
      <div className="case-num">{String(index + 1).padStart(2, "0")}</div>

      <div>
        <span className="case-scope eyebrow">{study.scope}</span>
        <h3>{study.title}</h3>
        <p className="case-tagline">{study.tagline}</p>
        <p className="case-body">{study.body}</p>
        <div className="tags">
          {study.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div>
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
      </div>
    </Reveal>
  );
}

export function Work() {
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

        <div className="cases">
          {CASES.map((study, i) => (
            <Case study={study} index={i} key={study.id} />
          ))}
        </div>
      </div>
    </section>
  );
}
