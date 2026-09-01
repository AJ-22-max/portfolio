import { NAV_SECTIONS, PROFILE } from "../lib/content";
import { useActiveSection, useStuck, useTheme } from "../lib/hooks";
import { Moon, Sun } from "./Icons";

const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

export function Nav() {
  const stuck = useStuck();
  const active = useActiveSection(SECTION_IDS);
  const { theme, toggle } = useTheme();

  return (
    <nav className="nav" data-stuck={stuck}>
      <div className="wrap nav-in">
        <a className="brand" href="#top">
          <span className="mono" aria-hidden="true">
            JA
          </span>
          {PROFILE.name}
        </a>

        <div className="nav-links">
          {NAV_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              data-active={active === section.id}
              aria-current={active === section.id ? "true" : undefined}
            >
              {section.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="theme-btn"
          onClick={toggle}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
        >
          {theme === "dark" ? <Moon /> : <Sun />}
        </button>
      </div>
    </nav>
  );
}
