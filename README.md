<div align="center">

# GitQuest

**Zero code. Zero fear. One epic first repository.**

A gamified, browser-only GitHub course for absolute beginners — 8 levels, XP, badges, diagnostics, and a final “Octoverse Passport” project. This is the **Aimirah Skool edition**, built for people who have never opened a code editor.

[![Live demo](https://img.shields.io/website?url=https%3A%2F%2Fstrdst7.github.io%2Fgithub-quest%2F&label=live_demo&style=flat-square)](https://strdst7.github.io/github-quest/)
[![MIT License](https://img.shields.io/badge/license-MIT-657a5b?style=flat-square)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16.4-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.1-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![GitHub Pages](https://img.shields.io/badge/deploy-GitHub_Pages-222555?style=flat-square&logo=github&logoColor=white)](https://pages.github.com)
[![Last commit](https://img.shields.io/github/last-commit/strdst7/github-quest?style=flat-square&color=d1522b)](https://github.com/strdst7/github-quest/commits/main)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-2ea44f?style=flat-square)](https://github.com/strdst7/github-quest/pulls)

[Live demo](https://strdst7.github.io/github-quest/) · [What's inside](#whats-inside) · [Tech stack](#tech-stack) · [Getting started](#getting-started) · [Contributing](#contributing)

</div>

---

## Overview

GitQuest turns learning GitHub into an expedition through **the Octoverse**. You start as a nameless Rookie with an empty satchel, guided by an eight-armed librarian, and finish by launching your own public **Octoverse Passport** repository. There is no code to write, no terminal to open, and nothing to install — every exercise happens in a web browser on real GitHub.

It is designed for **self-paced quest mode**, a **two-session live workshop**, or a **six-week classroom/club edition**. Along the way you create an account, publish a repository, save work with commits, branch and merge, collaborate through issues, explore open source, and get assessed with a simple 20-point rubric.

> “GitHub is a website that keeps every version of your work forever and lets you invite people in. We're going to use it like a game, and you are not going to type a single command.”

| Modules | Concepts | Activities | Mission steps | Quiz questions | Badges | XP available | Est. time |
| :-----: | :------: | :--------: | :-----------: | :------------: | :----: | :----------: | :-------: |
|    8    |    36    |     26     |      41       |       32        |   12   |    1,720     |  ~6–7 h   |

## Live demo

**[strdst7.github.io/github-quest](https://strdst7.github.io/github-quest/)**

Open the link and start at Level 01. No sign-up to the app, no install, no tracking — your progress lives in your own browser.

## Features

### A complete, ordered curriculum

Seven learning levels plus a final boss, each with a story hook, plain-English concepts, an analogies-first glossary, hands-on activities, a mission checklist, and a diagnostic quiz:

- **Spawn Point** — what GitHub is, Git vs. GitHub, account security, dashboard landmarks, profile README.
- **Base Camp** — your first public repository, folders, files, uploads, and a README a stranger can read.
- **The Time Machine** — commits as labelled save points, meaningful messages, diffs, history, recovery.
- **Parallel Universes** — branches as safe copies, switching, editing in isolation, merging back.
- **The Handshake** — pull requests as polite proposals, reviews, merge conflicts, and a clean merge.
- **The Village Square** — issues, labels, mentions, assignees, collaborators, and magic close keywords.
- **Treasure Hunt** — Explore, Trending, starring, forking, licences, and kind first contributions.
- **Boss Level** — assemble everything into a public Octoverse Passport and submit it for review.

### Game mechanics that actually track you

- **1,720 XP across 8 ranks** — 10 XP per concept, 15 per activity, 10 per mission step, +30 mission bonus, 25 per quiz passed, and 100 for the Boss Mission. Level-ups fire automatic celebratory toasts.
- **12 badges** — one per module, four secret side-quest patches (including the 🪶 Phoenix Feather), and a Cartographer patch for a 100% run. Badges are *derived* from what you did, so they cannot be faked or lost.
- **Phoenix Feather 🪶** — break something on purpose, then fix it. Mistakes are a scoring mechanic, not a penalty.
- **Guild Quests** — five optional team challenges for classrooms and cohorts; skippable for solo players.
- **Live scoreboard** — XP bank, level progress bar, course completion percentage, and a local leaderboard row, all in the terminal-style top bar.

### Hands-on missions and diagnostics

- Every concept has an everyday analogy before the technical term is named, with no more than ~8 minutes of reading before your hands are on the keyboard.
- Step checklists are tickable and saved instantly; you can undo a tick, jump between levels, and resume exactly where you stopped.
- Each module ends with a multiple-choice diagnostic. You need **75% to pass**, but retakes are unlimited, reasons are printed for every answer, and your **best score** is kept. Diagnostics are practice, never a grade.

### Boss Mission and assessment

- A 20-point rubric across five criteria (repo setup, README, commits, collaboration, and polish) with a self-score, four grading bands, and a repo URL for peer or instructor review.
- Acceptance checks, a build order, and a “deployed / staging” stamp make the final project feel like a real launch.

### Instructor manual, built in

- A printable, room-ready operator view with a 7-hour run of show, teaching philosophy, **14 known beginner stuck points** and their fixes, guild challenges, a jargon decoder, resource list, and the rubric rows to print.
- Three delivery modes are documented: self-paced, 2 × 3-hour cohort workshops, and a 6-week classroom schedule.

### Make it yours

- **7 CRT palettes** — Phosphor, Amber, Cyber, Arctic, Synth, Gameboy, and Paper — switchable from the rail or the dedicated palettes page, with no flash on first paint.
- A retro terminal world with scanlines, a grid backdrop, VT323 + IBM Plex Mono typefaces, animated panels, stamps, and block progress bars.
- Responsive layout, labelled controls, visible focus states, and `prefers-reduced-motion` support.

### Private by default

There is no backend, no account system, and no analytics. Progress (`gq:state:v1`) and palette choice (`gq-palette`) are stored in `localStorage` with defensive parsing; a hard reset is available in the app. Clearing site data starts a new run.

## What's inside

| #  | Level | Subtitle | What you'll do | Time |
| :- | :---- | :------- | :------------- | :--- |
| 01 | **Spawn Point** | Welcome to the Octoverse | Claim a name, secure an account, decode the dashboard, publish a profile README | 45 min |
| 02 | **Base Camp** | Your first repository | Create a public repo, add files and folders, write a stranger-friendly README | 50 min |
| 03 | **The Time Machine** | Commits & history | Make meaningful commits, read diffs, travel back in time, earn a Phoenix Feather | 45 min |
| 04 | **Parallel Universes** | Branches | Branch off safely, edit in a parallel universe, and bring changes home | 50 min |
| 05 | **The Handshake** | Pull requests & merging | Open a PR, review it, resolve a conflict, and merge into `main` | 55 min |
| 06 | **The Village Square** | Issues, labels & teamwork | File issues, apply labels, mention people, add collaborators, close with a keyword | 45 min |
| 07 | **Treasure Hunt** | Open source & real life | Search, star, watch, fork, choose a licence, and leave a kind comment | 45 min |
| 08 | **Boss Level** | Launch your Octoverse Passport | Ship one public project, self-score it on the 20-point rubric, and deploy | 75 min |

Roughly **410 minutes** end to end — or pick the level you need and come back later.

## Tech stack

| Layer | Technology | Version | Role |
| :---- | :--------- | :------ | :--- |
| Framework | [Next.js](https://nextjs.org) (App Router) | 16.4.2 | Routing, layout, and static site export |
| UI | [React](https://react.dev) | 19.2.6 | Component model and client-side game state |
| Language | [TypeScript](https://www.typescriptlang.org) | 5.9.3 | Strict typing for course content and state |
| Styling | [Tailwind CSS](https://tailwindcss.com) | 4.1.17 | Utility-first layout and the CRT design system |
| Tailwind plugin | [`@tailwindcss/postcss`](https://tailwindcss.com/docs/installation) | 4.1.17 | Tailwind 4 integration via PostCSS |
| CSS processor | [PostCSS](https://postcss.org) | 8.5.23 | Build-time CSS pipeline |
| Linting | [ESLint](https://eslint.org) + [`eslint-config-next`](https://nextjs.org/docs/app/guides/eslint) | 9.39.4 / 16.4.2 | Code and hook lint rules |
| Types | [`@types/node`](https://www.npmjs.com/package/@types/node), [`@types/react`](https://www.npmjs.com/package/@types/react), [`@types/react-dom`](https://www.npmjs.com/package/@types/react-dom) | 22.19.15 / 19.2.14 / 19.2.3 | TypeScript declarations |
| Hosting | [GitHub Pages](https://pages.github.com) | — | Static deployment via GitHub Actions |
| Typefaces | VT323, IBM Plex Mono | — | Loaded from Google Fonts |

**Architecture in one line:** a statically exported Next.js App Router site with course content as typed data, game state derived on the fly, `localStorage` persistence, and zero server dependencies.

## Project structure

```text
.
├── LICENSE
├── README.md
└── gamified-github-course-design/
    ├── package.json                # Dependencies and scripts
    ├── package-lock.json
    ├── next.config.ts              # Static export, basePath, trailing slashes
    ├── postcss.config.mjs          # Tailwind 4 PostCSS plugin
    ├── eslint.config.mjs
    ├── tsconfig.json               # Strict TS + "@/*" path alias
    └── src/
        ├── app/
        │   ├── layout.tsx          # Providers, nav, fonts, global metadata
        │   ├── page.tsx            # Overview / quest briefing
        │   ├── globals.css         # CRT design tokens and animations
        │   ├── learn/
        │   │   ├── page.tsx        # Quest map and status
        │   │   └── [moduleKey]/    # Individual level pages
        │   ├── badges/page.tsx     # Patch gallery and unlock conditions
        │   ├── final-mission/      # Boss Mission and 20-point rubric
        │   ├── instructor/         # Printable operator manual
        │   └── palettes/           # Theme picker and previews
        ├── components/
        │   ├── GameProvider.tsx    # State, persistence, XP/badge toasts
        │   ├── ModuleView.tsx      # Level layout, navigation, checklist
        │   ├── PaletteProvider.tsx # Theme state and pre-paint bootstrap
        │   ├── Nav.tsx             # Top bar, side rail, mobile drawer
        │   ├── quest.tsx           # Concepts, activities, missions, quizzes
        │   ├── ui.tsx              # Panels, stats, bars, stamps, tables
        │   └── Type.tsx            # Terminal typing effects
        └── lib/
            ├── course.ts           # Single source of truth for all course data
            ├── game.ts             # XP, levels, badges, module progress rules
            ├── local-store.ts      # localStorage state, quizzes, project, reset
            ├── palettes.ts         # Seven CRT themes
            ├── site.ts             # BASE_PATH for deployment
            └── types.ts            # Shared TypeScript types
```

## Getting started

### Prerequisites

- **Node.js 20.9+** (Node 22 is recommended and used in CI)
- **npm** 10+ (or a compatible package manager)

### Install and run

```bash
git clone https://github.com/strdst7/github-quest.git
cd github-quest/gamified-github-course-design
npm install
npm run dev
```

Because the site is configured for GitHub Pages, the local app is served under the same base path: open **<http://localhost:3000/github-quest/>**. To develop at the domain root instead, set `BASE_PATH` to `""` in `src/lib/site.ts`.

### Production build

```bash
npm run build
```

The build writes a fully static site to `gamified-github-course-design/out/` — ready to upload to GitHub Pages or any static host. If you host at a different path, change `BASE_PATH` in `src/lib/site.ts` before building.

### Available scripts

| Script | Command | Purpose |
| :----- | :------ | :------ |
| `dev` | `next dev` | Start the development server with hot reload |
| `build` | `next build` | Produce the static export in `out/` |
| `start` | `next start` | Legacy Next.js start script; the production output is a static export instead |
| `lint` | `eslint .` | Lint the app with the Next.js config |
| `typecheck` | `tsc --noEmit` | Standalone TypeScript check |

## How it works

- **Content is data.** `src/lib/course.ts` defines the branding, storyline, eight levels, badge catalogue, modules, quizzes, guild quests, rubric, grading bands, glossary, resources, and schedule. The map, lesson pages, badges page, instructor manual, and counters all derive from those exports, so adding a concept or question updates the whole app.
- **Game state is derived, never stored twice.** `src/lib/game.ts` computes trackable steps, XP, ranks, badges, and per-module progress from the completed-step set. `src/lib/local-store.ts` persists only that set, quiz bests, the final project, and the palette.
- **Local-first and defensive.** Stored JSON is validated on load; unavailable storage falls back to in-memory state. A quiz needs 75% to pass but can be retaken forever, with no penalty.
- **Themes before paint.** An inline bootstrap script in `PaletteProvider.tsx` applies the saved palette to `<html data-palette>` before first render, so there is no flash of the wrong theme.
- **Static by design.** `next.config.ts` sets `output: "export"`, `trailingSlash: true`, `unoptimized: true` for images, and a `basePath` sourced from `src/lib/site.ts`. There is no server runtime and no API to configure.

## Deployment

The live site is deployed at **[strdst7.github.io/github-quest](https://strdst7.github.io/github-quest/)**.

`.github/workflows/deploy.yml` runs on every push to `main` (and can be triggered manually with `workflow_dispatch`):

1. Check out the repo and set up Node 22 with npm caching.
2. Install dependencies and build from `gamified-github-course-design/`.
3. Upload `gamified-github-course-design/out/` as a Pages artifact.
4. Deploy with `actions/deploy-pages@v4`.

To deploy your own copy:

1. Fork or import the repository.
2. In **Settings → Pages**, set **Source** to **GitHub Actions**.
3. Make sure `BASE_PATH` in `src/lib/site.ts` matches your repository subpath (for example `/my-repo`), or set it to `""` for a user site or custom domain.
4. Push to `main` and watch the **Deploy to GitHub Pages** workflow.

The same static `out/` directory can be served by any static host; Vercel/Netlify work too, provided the root directory is `gamified-github-course-design`, the command is `npm run build`, and the base path matches the URL.

## Contributing

Contributions that make the course clearer or more fun are welcome. Good entry points:

- **Add course content** — append concepts, activities, mission steps, or quiz questions to the right module in `src/lib/course.ts`. Counts, XP, maps, and checks update automatically.
- **Add a badge** — extend `badgeCatalog` in `src/lib/course.ts` and its unlock rule in `deriveBadges()` inside `src/lib/game.ts`.
- **Add a theme** — extend `PaletteKey`, `palettes`, and the CSS palette tokens; the picker updates automatically.
- **Improve the manual** — stuck points, timings, and resources live in `src/app/instructor/page.tsx` and `src/lib/course.ts`.
- **Polish the UI** — shared primitives live in `src/components/ui.tsx` and `src/components/quest.tsx`.

Before opening a pull request:

```bash
cd gamified-github-course-design
npm install
npm run lint
npm run typecheck
npm run build
```

Keep course copy in `course.ts` rather than duplicating it in components, and match the existing terminal look (CRT panels, mono text, accent colours).

## License

Released under the [MIT License](LICENSE). © 2026 Nur Amirah Mohd Kamil.

## Credits

- Written and built by **KDherstacks · aimirah. miii** for **Aimirah Skool**.
- The Octoverse story, characters, and course design are original to this project.
- Typefaces: [VT323](https://fonts.google.com/specimen/VT323) and [IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono).
- Built with [Next.js](https://nextjs.org), [React](https://react.dev), [Tailwind CSS](https://tailwindcss.com), and deployed on [GitHub Pages](https://pages.github.com).

<div align="center">

**Learn it, ship it, teach it.**

</div>
