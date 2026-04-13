import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About — Spirit Song Book",
  description:
    "Learn about Spirit Song Book and the developer behind the project.",
};

export default function AboutPage() {
  return (
    <main className="flex flex-1 flex-col items-center px-4 py-12 sm:py-20">
      {/* Page heading */}
      <section className="mx-auto max-w-2xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-rccg-gold/15 px-4 py-1.5 text-xs font-semibold tracking-wide text-rccg-gold">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M13 9h-2V7h2m0 10h-2v-6h2M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2Z" />
          </svg>
          ABOUT
        </div>

        <h2 className="text-3xl font-extrabold tracking-tight text-rccg-dark-navy sm:text-5xl dark:text-white">
          Spirit Song Book
        </h2>
        <p className="mt-4 text-base text-gray-500 sm:text-lg dark:text-white/60">
          A digital hymnal built to help you search, read, and share your
          favourite hymns and songs — anytime, anywhere.
        </p>
      </section>

      {/* About the app */}
      <section className="mx-auto mt-12 w-full max-w-2xl sm:mt-16">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/40">
          The Project
        </h3>

        <div className="rounded-2xl border border-rccg-navy/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          <p className="text-sm leading-relaxed text-gray-600 dark:text-white/70">
            Spirit Song Book gives you instant access to the{" "}
            <span className="font-semibold text-rccg-dark-navy dark:text-white">
              RCCG Hymn Book
            </span>{" "}
            and a growing{" "}
            <span className="font-semibold text-rccg-dark-navy dark:text-white">
              Praise &amp; Worship collection
            </span>
            . Search by title, hymn number, or lyrics, browse by category, copy
            verses to your clipboard, or export hymns as PDFs. The app works
            great on mobile and desktop, with dark-mode support and offline
            capability as a Progressive Web App.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Full-text Search",
              "Category Filters",
              "Copy to Clipboard",
              "PDF Export",
              "Dark Mode",
              "PWA",
            ].map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-rccg-navy/5 px-3 py-1 text-xs font-medium text-rccg-navy dark:bg-white/10 dark:text-white/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* About the developer */}
      <section className="mx-auto mt-12 w-full max-w-2xl sm:mt-16">
        <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-white/40">
          The Developer
        </h3>

        <div className="rounded-2xl border border-rccg-navy/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-white/5">
          {/* Name & title */}
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-rccg-navy text-xl font-bold text-white">
              SO
            </div>
            <div>
              <h4 className="text-lg font-bold text-rccg-dark-navy dark:text-white">
                Seun Daniel Omatsola
              </h4>
              <p className="text-sm text-gray-400 dark:text-white/50">
                Software Engineer
              </p>
            </div>
          </div>

          {/* Bio */}
          <p className="mt-5 text-sm leading-relaxed text-gray-600 dark:text-white/70">
            I am a passionate software engineer with over 7 years of experience
            building modern web applications. My journey started with front-end
            development, but I quickly transitioned into full-stack engineering
            to architect robust systems from end to end. I am currently focused
            on creating highly performant SaaS platforms, contributing to
            open-source tools, and continuously exploring emerging technologies
            like AI integrations and edge computing.
          </p>

          {/* Social links */}
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-rccg-navy/10 px-3.5 py-1.5 text-xs font-medium text-rccg-navy transition-colors hover:bg-rccg-navy hover:text-white dark:border-white/10 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
              >
                {link.icon}
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Back to home */}
      <div className="mt-12 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-rccg-navy transition-colors hover:text-rccg-dark-navy dark:text-rccg-gold dark:hover:text-rccg-gold/80"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
          Back to Song Books
        </Link>
      </div>
    </main>
  );
}

/* ── Social link data ───────────────────────────────────────────────── */

const socialLinks = [
  {
    label: "Website",
    href: "https://www.seunomatsola.com",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2Zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93Zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39Z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/seundanielomatsola/",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/Vastro-lorde",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    label: "Twitter",
    href: "https://twitter.com/vastroLord",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23Z" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@seun.daniel.omatsola",
    icon: (
      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73Z" />
      </svg>
    ),
  },
];
