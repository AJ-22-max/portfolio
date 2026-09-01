import { ABOUT_PARAGRAPHS, FACTS } from "../lib/content";
import { Reveal } from "./Reveal";

export function About() {
  const [lead, ...rest] = ABOUT_PARAGRAPHS;

  return (
    <section id="about">
      <div className="wrap">
        <Reveal as="div" className="sec-head">
          <span className="eyebrow">About</span>
          <h2>Engineering habits, applied to interfaces</h2>
        </Reveal>

        <Reveal className="about">
          <div>
            <p className="about-lead">{lead}</p>
            {rest.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
            <p>
              I am currently in Abuja and <strong>open to relocation</strong>.
            </p>
          </div>

          <dl className="timeline">
            {FACTS.map((fact) => (
              <div className="tl-item" key={fact.term}>
                <dt className="tl-term eyebrow">{fact.term}</dt>
                <dd className="tl-val">{fact.value}</dd>
                <dd className="tl-note">{fact.note}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
