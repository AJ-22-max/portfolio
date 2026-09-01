import { PROFILE } from "../lib/content";
import { Download, GitHub, Mail } from "./Icons";
import { Reveal } from "./Reveal";

export function Contact() {
  return (
    <section id="contact">
      <div className="wrap">
        <Reveal className="contact-card">
          <h2>Let's talk</h2>
          <p>
            I am open to frontend and software engineering roles, and happy to walk through any of
            the work above on a call.
          </p>
          <div className="cta">
            <a className="btn btn-primary" href={`mailto:${PROFILE.email}`}>
              <Mail />
              {PROFILE.email}
            </a>
            <a className="btn" href={PROFILE.cv}>
              <Download />
              Download CV
            </a>
            <a className="btn" href={PROFILE.github} rel="noopener noreferrer" target="_blank">
              <GitHub />
              {PROFILE.githubLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap foot">
        <span>
          {PROFILE.name}, {PROFILE.role}
        </span>
        <span>Built with React, TypeScript and Vite. No UI framework.</span>
      </div>
    </footer>
  );
}
