interface IconProps {
  size?: number;
  className?: string;
}

const base = (size: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  "aria-hidden": true as const,
  focusable: "false" as const,
});

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export const Sun = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} {...stroke} className={className}>
    <circle cx="12" cy="12" r="4.2" />
    <path d="M12 2.4v2.2M12 19.4v2.2M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2.4 12h2.2M19.4 12h2.2M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6" />
  </svg>
);

export const Moon = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} {...stroke} className={className}>
    <path d="M20.5 14.6A8.6 8.6 0 0 1 9.4 3.5a8.6 8.6 0 1 0 11.1 11.1z" />
  </svg>
);

export const ArrowRight = ({ size = 15, className }: IconProps) => (
  <svg {...base(size)} {...stroke} strokeWidth={2.4} className={className}>
    <path d="M5 12h13M13 6l6 6-6 6" />
  </svg>
);

export const Download = ({ size = 15, className }: IconProps) => (
  <svg {...base(size)} {...stroke} className={className}>
    <path d="M12 3v12M7 11l5 5 5-5M4 20h16" />
  </svg>
);

export const Mail = ({ size = 15, className }: IconProps) => (
  <svg {...base(size)} {...stroke} className={className}>
    <path d="M3 7l9 6 9-6M3 5h18v14H3z" />
  </svg>
);

export const Check = ({ size = 17, className }: IconProps) => (
  <svg {...base(size)} {...stroke} strokeWidth={2.4} className={className}>
    <path d="M4 12.5l5.5 5.5L20 7" />
  </svg>
);

export const Bolt = ({ size = 16, className }: IconProps) => (
  <svg {...base(size)} {...stroke} className={className}>
    <path d="M13 2L4.5 13H11l-1 9 8.5-11H12l1-9z" />
  </svg>
);

export const GitHub = ({ size = 15, className }: IconProps) => (
  <svg {...base(size)} fill="currentColor" className={className}>
    <path d="M12 1.8a10.2 10.2 0 0 0-3.2 19.9c.5.1.7-.2.7-.5v-1.9c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8.1-.7.4-1.1.6-1.4-2.3-.3-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.3 4.7-4.6 5 .4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A10.2 10.2 0 0 0 12 1.8" />
  </svg>
);
