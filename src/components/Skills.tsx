import { SKILLS } from "../lib/content";
import { Reveal } from "./Reveal";

export function Skills() {
  return (
    <section id="skills">
      <div className="wrap">
        <Reveal className="sec-head">
          <p className="sec-label">Toolkit</p>
          <h2>What I work in every day</h2>
          <p>
            Listed only where I have shipped production features, not where I have read the
            documentation.
          </p>
        </Reveal>

        <Reveal className="skillset">
          {SKILLS.map((group) => (
            <div className="skillgroup" key={group.name}>
              <h4>{group.name}</h4>
              <div className="chips">
                {group.items.map((item) => (
                  <span className="chip" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
