import type { ElementType, ReactNode } from "react";
import { useReveal } from "../lib/hooks";

interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

/**
 * Wraps children in an element that fades up the first time it enters
 * the viewport. Falls back to visible immediately when the user has
 * asked for reduced motion.
 */
export function Reveal({ children, as: Tag = "div", className = "" }: RevealProps) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <Tag ref={ref} className={`rv ${className}`.trim()}>
      {children}
    </Tag>
  );
}
