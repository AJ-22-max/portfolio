import { ABOUT_PARAGRAPHS, FACTS } from "../lib/content";
import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="sec-label">About</p>
          <h2>Engineering habits, applied to interfaces</h2>
        </Reveal>

        <Reveal className="about">
          <div>
            {ABOUT_PARAGRAPHS.map((text, i) => (
              <p key={i}>{text}</p>
            ))}
            <p>
              I am currently in Abuja and <strong>open to relocation</strong>.
            </p>
          </div>

          <dl className="facts">
            {FACTS.map((fact) => (
              <div className="fact" key={fact.term}>
                <dt>{fact.term}</dt>
                <dd>
                  {fact.value}
                  <span>{fact.note}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
