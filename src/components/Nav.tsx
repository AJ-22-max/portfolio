import type { MouseEvent as ReactMouseEvent } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { NAV_SECTIONS, PROFILE } from "../lib/content";
import { useActiveSection, useStuck, useTheme } from "../lib/hooks";
import { Close, Menu, Moon, Sun } from "./Icons";

const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);

export function Nav() {
  const stuck = useStuck();
  const active = useActiveSection(SECTION_IDS);
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes; the body is locked while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Resizing past the breakpoint should not leave a hidden drawer open.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 761px)");
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /**
   * Close first, then scroll on the next frame. The body still carries
   * `overflow: hidden` at click time, so letting the anchor navigate would
   * drop the jump; scrolling after the lock is released is reliable.
   */
  const goToSection = useCallback((e: ReactMouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setOpen(false);
    requestAnimationFrame(() => {
      const target = document.getElementById(id);
      if (!target) return;
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      history.replaceState(null, "", `#${id}`);
    });
  }, []);

  return (
    <>
      <nav className="nav" data-stuck={stuck}>
        <div className="wrap nav-in">
          <a className="brand" href="#top">
            <span className="brand-mark" aria-hidden="true">
              JA
            </span>
            <span className="brand-name">{PROFILE.name}</span>
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
            className="icon-btn"
            onClick={toggle}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
          >
            {theme === "dark" ? <Moon /> : <Sun />}
          </button>

          <button
            ref={toggleRef}
            type="button"
            className="icon-btn nav-toggle"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="mobile-drawer"
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </nav>

      <div className="nav-scrim" data-open={open} onClick={() => setOpen(false)} aria-hidden="true" />

      <aside
        id="mobile-drawer"
        className="drawer"
        data-open={open}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="drawer-top">
          <span className="brand-mark" aria-hidden="true">
            JA
          </span>
          <button
            ref={closeRef}
            type="button"
            className="icon-btn"
            onClick={() => {
              setOpen(false);
              toggleRef.current?.focus();
            }}
            aria-label="Close menu"
          >
            <Close />
          </button>
        </div>

        <nav className="drawer-links" aria-label="Sections">
          {NAV_SECTIONS.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              data-active={active === section.id}
              onClick={(e) => goToSection(e, section.id)}
            >
              {section.label}
            </a>
          ))}
        </nav>

        <div className="drawer-foot">
          <a className="btn btn-primary" href={PROFILE.cv} onClick={() => setOpen(false)}>
            Download CV
          </a>
          <a
            className="btn"
            href={PROFILE.github}
            rel="noopener noreferrer"
            target="_blank"
            onClick={() => setOpen(false)}
          >
            GitHub
          </a>
        </div>
      </aside>
    </>
  );
}
