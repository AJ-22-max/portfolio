/**
 * All page copy lives here so the components stay presentational
 * and the content is editable without touching JSX.
 */

export interface Stat {
  value: string;
  accent?: boolean;
  label: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  /** Short context label shown next to the index number. */
  scope: string;
  tagline: string;
  tags: string[];
  /** Lead paragraph. `strong` markup is applied via the `emphasis` list below. */
  body: string;
  points: Array<{ lead?: string; text: string }>;
  outcome?: string;
  outcomeLead?: string;
  link?: { href: string; label: string };
}

export interface SkillGroup {
  name: string;
  items: string[];
}

export interface Fact {
  term: string;
  value: string;
  note: string;
}

export const NAV_SECTIONS = [
  { id: "top", label: "Home" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;

export const PROFILE = {
  name: "Juliet Ada Adue",
  role: "Frontend Engineer",
  roleSuffix: " building production SaaS in React and TypeScript",
  location: "Abuja, Nigeria (UTC+1)",
  email: "okpejuliet08@gmail.com",
  github: "https://github.com/AJ-22-max",
  githubLabel: "github.com/AJ-22-max",
  cv: "/Juliet-Ada-Adue-CV.pdf",
  photo: "/photo.jpg",
  availability: "Open to roles · relocating to Canada",
  lede:
    "I build the parts of software people actually touch: dashboards, editors, onboarding flows, and the small interactions that decide whether a product feels finished. I own features end to end, from interaction design through to QA and client feedback.",
};

export const STATS: Stat[] = [
  { value: "~90%", accent: true, label: "Reduction in image payload on the dashboard" },
  { value: "7", label: "Production applications shipped" },
  { value: "21", label: "Industries served by the CRM I build on" },
  { value: "First Class", label: "B.Eng Aerospace Engineering" },
];

export const CASES: CaseStudy[] = [
  {
    id: "invoice-editor",
    title: "Invoice editor",
    scope: "BMG CRM",
    tagline: "The highest-traffic screen in a multi-tenant CRM",
    tags: ["React 18", "MUI", "TanStack Query"],
    body:
      "Businesses issue invoices with different tax structures, and they want the document to look like it came from them rather than from our software. The editor had to be usable by people who do not think in terms of tax models.",
    points: [
      {
        lead: "Stackable tax rules.",
        text:
          "Taxes that apply on top of one another rather than in parallel, which changes both the arithmetic and the order of operations.",
      },
      {
        lead: "Brand theming.",
        text:
          "Colour picker and logo upload, with a live preview so you see the finished invoice as you edit rather than after saving.",
      },
      {
        lead: "Mobile affordances.",
        text:
          "Making it obvious what is editable on a small screen, where hover cannot do that work for you.",
      },
      {
        lead: "Multi-currency.",
        text:
          "Currency derives from the business and the document rather than the viewer's location, enforced through a formatting helper that requires an explicit currency — removing a class of financial display bugs.",
      },
    ],
  },
  {
    id: "session-setup",
    title: "Session setup",
    scope: "ADVANZTEK NIG. LTD",
    tagline: "School management dashboard",
    tags: ["TypeScript", "React"],
    body:
      "Creating an academic session carried every subject forward to the new term. For a large school this ran long enough that the interface looked frozen, so users assumed a crash and retried, which made it worse.",
    points: [
      { text: "Batched the carry-forward instead of processing one record at a time." },
      { text: "Added an explicit progress state, so slow work reads as working rather than broken." },
    ],
    outcome:
      "Perceived performance matters as much as measured performance. The retry loop disappeared.",
  },
  {
    id: "attachments",
    title: "Attachments and previews",
    scope: "BMG CRM",
    tagline: "BMG CRM",
    tags: ["React 18", "MUI"],
    body:
      "In-browser previews for images, video, PDF and Office documents, including previewing a file before it uploads so you can confirm it is the right one.",
    points: [
      {
        lead: "Object-URL lifecycle.",
        text: "URLs created in a memo and revoked on cleanup, so cycling through files does not leak memory.",
      },
      { text: "Pasted links render as rich preview cards instead of raw text." },
    ],
  },
  {
    id: "boards",
    title: "Project and task boards",
    scope: "BMG CRM",
    tagline: "BMG CRM",
    tags: ["React 18", "dnd-kit"],
    body:
      "Drag-and-drop boards for projects and tasks, where the drag has to feel right and the data has to stay correct when a card lands somewhere new.",
    points: [
      {
        text:
          "Multi-select assignees, date-range filtering and archiving, so a busy board narrows to what matters now.",
      },
      {
        text: "Built the admin acquisition-channel reporting view and its data-fetching layer alongside it.",
      },
    ],
  },
  {
    id: "id-cards",
    title: "ID card designer",
    scope: "ADVANZTEK NIG. LTD",
    tagline: "School management dashboard",
    tags: ["TypeScript", "React"],
    body:
      "A layout tool letting schools design and issue their own student ID cards, built for people who are not designers.",
    points: [
      {
        text:
          "Real logo rendering, per-element opacity, and grey avatar placeholders so a card looks right before any photos exist.",
      },
      { text: "Server-side search in the picker, so choosing one student out of thousands stays fast." },
    ],
  },
  {
    id: "performance",
    title: "Dashboard performance",
    scope: "BMG CRM",
    tagline: "BMG CRM",
    tags: ["Vite", "Asset pipeline"],
    body:
      "The dashboard loaded slowly, and badly so on Nigerian mobile connections. I profiled what was actually heavy rather than guessing: PNGs exported far larger than the size they were displayed at.",
    points: [
      { text: "Recompressed them while preserving transparency where the design needed it." },
      { text: "Added preconnect hints so the browser opens the media-host connection early." },
      { text: "Rebuilt both BMG marketing sites from scratch and cut the About imagery from roughly 8.9 MB to 340 KB." },
    ],
    outcomeLead: "~90% smaller",
    outcome: " image payloads, with no visible quality loss.",
  },
  {
    id: "rem-church",
    title: "REM Church",
    scope: "FULL-STACK — FREELANCE",
    tagline: "A church platform with online giving, built end to end",
    tags: ["React 19", "TypeScript", "Neon Postgres", "Paystack"],
    body:
      "A multi-section church and community platform — sermons, devotionals, events, branches, livestream, gallery, news and prayer requests — built as a full-stack project: a React and TypeScript frontend with a serverless backend on Neon Postgres.",
    points: [
      {
        lead: "Online giving.",
        text:
          "Paystack payments with server-side webhooks, so a gift is recorded only once the money actually clears.",
      },
      {
        lead: "Content-managed.",
        text:
          "An admin dashboard edits the homepage, uploads media, reads the message inbox and controls the livestream, so the church runs the site without touching code.",
      },
      {
        lead: "Shipped.",
        text:
          "Authentication and file uploads handled in the serverless API, deployed on Vercel with push-to-deploy.",
      },
    ],
  },
  {
    id: "virtuous-woman-couture",
    title: "Virtuous Woman Couture",
    scope: "E-COMMERCE — FREELANCE",
    tagline: "A premium fashion storefront in React and TypeScript",
    tags: ["React 19", "TypeScript", "Context API", "Vite"],
    body:
      "An e-commerce storefront for made-to-measure fashion: a catalog you can filter, search and sort, product pages with colour, size and made-to-measure selection, and a cart and checkout built on React Context.",
    points: [
      {
        lead: "Accounts.",
        text:
          "Sign in with email or Google, with a protected customer dashboard for orders, body measurements, shipping addresses and a wishlist.",
      },
      {
        lead: "Shop anywhere.",
        text:
          "Multi-currency pricing in £, $, C$ and ₦, dark mode, and a custom luxury design system, fully responsive.",
      },
      {
        lead: "Admin side.",
        text: "A separate admin area for managing the catalog.",
      },
    ],
  },
  {
    id: "client-sites",
    title: "Client web applications",
    scope: "CLIENT WORK",
    tagline: "Marvel Jeb Co. Ltd, Fidei Polytechnic, Pamsette Primary School, School Portal",
    tags: ["TypeScript", "Vite", "Tailwind", "Framer Motion"],
    body:
      "Designed and shipped production sites for businesses and educational institutions: data-driven pricing pages, interactive product demos and compliance pages, with load performance and accessibility treated as primary concerns rather than afterthoughts.",
    points: [],
    link: {
      href: "https://github.com/advanztek/sch_portal/commits?author=AJ-22-max",
      label: "Browse 25 of my public commits on the School Portal site",
    },
  },
  {
    id: "freelance-qa",
    title: "Freelance QA and website testing",
    scope: "BEFORE BMG",
    tagline: "2023 to 2024, before I moved into building",
    tags: ["Manual testing", "Cross-browser", "Defect reporting"],
    body:
      "Tested websites and web platforms for clients and reported defects against them. This is where the habits came from: assume the edge cases are broken until you have checked them, and describe a problem precisely enough that someone else can act on it.",
    points: [
      {
        lead: "Functional and exploratory testing",
        text: "across browsers, screen sizes and devices.",
      },
      {
        lead: "Reproducible bug reports",
        text:
          "with steps, expected versus actual behaviour, environment and severity, so an issue could be fixed without a second conversation.",
      },
      {
        text:
          "Responsive, broken-state and form-validation checks, then re-testing after fixes to confirm the fix held and nothing else moved.",
      },
    ],
  },
];

export const SKILLS: SkillGroup[] = [
  {
    name: "Core",
    items: ["React 18", "TypeScript", "JavaScript", "HTML5", "CSS3", "Vite", "React Router"],
  },
  {
    name: "Interface",
    items: ["MUI", "Tailwind CSS", "Emotion", "styled-components", "Framer Motion", "dnd-kit"],
  },
  { name: "State and data", items: ["TanStack Query", "Context API", "Axios", "REST APIs"] },
  {
    name: "Backend",
    items: ["Node.js (serverless)", "PostgreSQL (Neon)", "REST APIs", "Auth", "Paystack", "CMS / Admin"],
  },
  {
    name: "Practice",
    items: ["Responsive design", "Web performance", "Accessibility", "Code review", "Git", "ESLint"],
  },
];

export const ABOUT_PARAGRAPHS = [
  "I studied Aerospace Engineering and graduated with First Class Honours, then came into software through QA, testing websites and platforms and writing bug reports before I started building them. The habits carried over: work from evidence rather than intuition, respect the failure cases, and treat a thing as unfinished until the edges are handled.",
  "In practice that means I care about the parts that rarely get demoed. Empty states. Loading skeletons. Error copy that tells you what to do next. What the screen does on a slow connection, which where I work is not a hypothetical.",
  "I build for a multi-tenant CRM used by businesses across many industries, and for school management systems where a mistake in a results screen matters to somebody's child. That keeps me honest about correctness.",
];

export const FACTS: Fact[] = [
  { term: "Now", value: "Frontend Engineer, BMG", note: "Multi-tenant CRM and commerce SaaS · since Jan 2026" },
  {
    term: "Before",
    value: "Frontend Developer, Advanztek Nig. Ltd",
    note: "School management dashboard · 2024 to 2025",
  },
  {
    term: "Earlier",
    value: "Freelance QA and website testing",
    note: "Manual testing and defect reporting for client websites and platforms, 2023 to 2024",
  },
  {
    term: "Education",
    value: "B.Eng Aerospace Engineering",
    note: "Air Force Institute of Technology, Kaduna. First Class Honours, 2024",
  },
  { term: "Based in", value: "Abuja, Nigeria (UTC+1)", note: "Open to relocation to Canada (VanHack)" },
];
