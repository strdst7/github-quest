/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  GITHUB 101 · "GITQUEST: THE OCTOVERSE CHRONICLES"
 *  The entire course design lives here as data so the app can render it,
 *  track it, and gamify it.
 * ─────────────────────────────────────────────────────────────────────────────
 */

export type Concept = {
  id: string;
  term: string;
  emoji: string;
  plain: string; // plain-English definition
  analogy: string; // everyday analogy
  say: string; // the one sentence a learner should be able to say out loud
};

export type Activity = {
  id: string;
  title: string;
  minutes: number;
  mode: "Solo" | "Pair" | "Guild";
  steps: string[];
  deliverable: string;
  safety?: string;
};

export type MissionItem = { id: string; label: string };

export type QuizQuestion = {
  id: string;
  q: string;
  options: string[];
  answer: number;
  why: string;
};

export type Module = {
  key: string;
  index: number;
  title: string;
  subtitle: string;
  emoji: string;
  accent: "coral" | "aqua" | "gold" | "violet" | "lime";
  minutes: number;
  level: string;
  hook: string;
  objectives: string[];
  concepts: Concept[];
  activities: Activity[];
  mission: {
    title: string;
    brief: string;
    items: MissionItem[];
    reward: string;
  };
  achievement: { badgeKey: string; title: string; blurb: string };
  mustKnow: string[];
  niceToKnow: string[];
  instructorNotes: string[];
  quiz: QuizQuestion[];
};

/* ── 1. COURSE IDENTITY ──────────────────────────────────────────────────── */

/** Branding for this edition of the handbook. */
export const branding = {
  learner: "kdmirah",
  handle: "kdmirah",
  school: "Aimirah Skool",
  edition: "Aimirah Skool edition · student build",
  houseRule: "learn it, ship it, teach it",
} as const;

export const course = {
  title: "GitQuest",
  fullTitle: "GitQuest: The Octoverse Chronicles",
  tagline: "Zero code. Zero fear. One epic first repository.",
  promise:
    "In about 6 playful hours you will go from “what even is a repo?” to publishing your own project on GitHub — using nothing but a web browser and a bunch of friendly buttons.",
  objective:
    "Learners create a real GitHub account, build and publish their own repository, save work with commits, experiment safely on branches, propose changes with pull requests, collaborate through issues, and explore open source — finishing with a public 'Octoverse Passport' project and a signed rubric.",
  outcomes: [
    "Explain what GitHub is and why non-coders use it — in one sentence, out loud, without notes.",
    "Create a GitHub account, lock it down, and build a profile that greets visitors.",
    "Publish a public repository with folders, files, and a README that makes sense to a stranger.",
    "Save and narrate work with meaningful commits, and travel back in history to recover an old version.",
    "Experiment fearlessly on a branch, then open and merge a pull request.",
    "Use issues, labels, mentions, and collaborators to work with other humans.",
    "Find, star, fork, and contribute to real open-source projects — without writing a line of code.",
    "Ship a final project that is graded with a simple 20-point rubric.",
  ],
  audience: {
    headline: "Built for people who have never opened a code editor in their life.",
    groups: [
      { who: "Students & career switchers", why: "You keep seeing 'GitHub' in job posts and portfolios and want a profile that looks legit." },
      { who: "Teachers & trainers", why: "You want a place to hand out assignments, collect work, and keep every version forever." },
      { who: "Writers, designers & researchers", why: "Your drafts, notes, scripts, and datasets deserve real version history — not final_v7_REAL.docx." },
      { who: "Project managers & club leads", why: "You want a shared to-do board (issues) that lives right next to the work itself." },
      { who: "The merely curious", why: "You like free tools, tidy folders, and finishing something on the internet." },
    ],
    prerequisites: [
      "A web browser and an email address you can open right now (for the verification code).",
      "The ability to click buttons, type text, and upload a photo.",
      "Roughly 6 hours of curiosity, splittable into 45-minute sprints.",
    ],
    notRequired: [
      "No programming. Not one line.",
      "No command line / terminal. We banish it to the 'later' pile.",
      "No installing Git, VS Code, SSH keys, or anything with 'config' in its name.",
      "No credit card, no paid plan — the free account does everything in this course.",
    ],
  },
  format: {
    duration: "6 hours of guided play (≈ 45–75 minutes per module).",
    modules: "7 learning modules + 1 final Boss Mission.",
    delivery: [
      { name: "Self-paced quest mode", detail: "Follow the interactive map, tick off steps, earn XP as you go. Best for solo learners.", length: "5–7 days, one module per sitting." },
      { name: "Live cohort workshop", detail: "Two 3-hour sessions with an instructor: Modules 1–4, then Modules 5–8. Everyone quests in the same room.", length: "2 × 3 hours, one week apart." },
      { name: "Classroom / club edition", detail: "Six 50-minute periods, one module per class, plus a guild (team) challenge week.", length: "6 weeks." },
    ],
    rules: [
      "One or two new words per module. Never more.",
      "Every concept is taught with an everyday analogy before the technical term is named.",
      "Doing beats reading: no module has more than ~8 minutes of reading before your hands are on the keyboard.",
      "Mistakes are a scoring mechanic, not a penalty (see the Phoenix Feather).",
    ],
  },
} as const;

/* ── 2. GAME SYSTEM ──────────────────────────────────────────────────────── */

export const storyline = {
  world: "The Octoverse",
  premise:
    "Somewhere in the internet there is a library that never closes, where every book remembers every draft it has ever had. It is guarded by a friendly eight-armed librarian called the Octocat. You arrive as a nameless Rookie with an empty satchel. Your job: claim a name, build a Base Camp, learn to bend time, open a doorway to a parallel universe, seal the Handshake, earn a voice in the Village, bring home treasure — and finally launch your own Passport into the sky so the whole Octoverse can find you.",
  characters: [
    { name: "The Octocat", role: "Your guide. Leaves hints, never scolds. Lives in the top-left of every screen.", emoji: "🐙" },
    { name: "Rookie (you)", role: "The player. Starts with 0 XP, one empty satchel, and zero fear of the red buttons — eventually.", emoji: "🧑‍🚀" },
    { name: "The Timekeeper", role: "Keeper of commits. Teaches that nothing is ever truly lost.", emoji: "⏳" },
    { name: "The Twin", role: "Your branch self. Does the messy experimenting so the official copy stays clean.", emoji: "🪞" },
    { name: "The Village Elders", role: "Maintainers of open source. They answer kind questions and merge polite requests.", emoji: "🏘️" },
  ],
  mechanics: [
    { name: "XP", how: "10 XP per concept understood · 15 XP per hands-on activity · 10 XP per mission step · 30 XP mission bonus · 25 XP per quiz passed · 100 XP for the final Boss Mission." },
    { name: "Levels", how: "Seven ranks, from Hatchling to Octoverse Legend. Levelling up is automatic — the bar at the top of the screen is your scoreboard." },
    { name: "Badges", how: "One badge per module, plus secret bonus badges for brave behaviour. Badges never expire and cannot be lost." },
    { name: "Phoenix Feather 🪶", how: "Awarded when you break something on purpose and then fix it. Mistakes are the most profitable thing you can do here." },
    { name: "Guild Quests", how: "Optional team challenges worth shared glory. Great in classrooms; skippable for solo players." },
    { name: "Boss Mission", how: "The final project. 20-point rubric, self-scored, then checked by a peer or instructor." },
  ],
};

export const levels = [
  { level: 1, name: "Hatchling", minXp: 0, emoji: "🥚", note: "You just spawned. Breathe." },
  { level: 2, name: "Named Explorer", minXp: 120, emoji: "🧭", note: "You have an account and a face." },
  { level: 3, name: "Base Camp Builder", minXp: 300, emoji: "⛺", note: "You can create and fill a repo." },
  { level: 4, name: "Time Traveller", minXp: 500, emoji: "⏳", note: "You can save and rewind your work." },
  { level: 5, name: "Branch Ranger", minXp: 720, emoji: "🌿", note: "You experiment in parallel universes." },
  { level: 6, name: "Merge Wizard", minXp: 960, emoji: "🪄", note: "You bring ideas home safely." },
  { level: 7, name: "Village Voice", minXp: 1180, emoji: "📣", note: "You collaborate with real humans." },
  { level: 8, name: "Octoverse Legend", minXp: 1400, emoji: "👑", note: "Boss Mission complete. You did the thing." },
];

export const badgeCatalog = [
  { key: "named-one", title: "The Named One", emoji: "🪪", rarity: "Common", blurb: "Created a GitHub account and gave yourself a face.", from: "Module 1" },
  { key: "base-camp-builder", title: "Base Camp Builder", emoji: "⛺", rarity: "Common", blurb: "Published your first repository and stocked it with files.", from: "Module 2" },
  { key: "time-traveller", title: "Time Traveller", emoji: "⏳", rarity: "Uncommon", blurb: "Made three meaningful commits and rewound history on purpose.", from: "Module 3" },
  { key: "branch-ranger", title: "Branch Ranger", emoji: "🌿", rarity: "Uncommon", blurb: "Created a branch and edited safely away from the official copy.", from: "Module 4" },
  { key: "merge-master", title: "Merge Master", emoji: "🪄", rarity: "Rare", blurb: "Opened a pull request and merged it into main.", from: "Module 5" },
  { key: "village-voice", title: "Village Voice", emoji: "📣", rarity: "Rare", blurb: "Filed issues, used labels, and closed one with a magic keyword.", from: "Module 6" },
  { key: "treasure-hunter", title: "Treasure Hunter", emoji: "💎", rarity: "Rare", blurb: "Starred, forked, and left a kind comment in the wild open-source world.", from: "Module 7" },
  { key: "octoverse-legend", title: "Octoverse Legend", emoji: "👑", rarity: "Epic", blurb: "Submitted the final Boss Mission project.", from: "Module 8" },
  { key: "phoenix", title: "Phoenix Feather", emoji: "🪶", rarity: "Secret", blurb: "Broke something on purpose, then fixed it. Mistakes mastered.", from: "Module 3 side quest" },
  { key: "storyteller", title: "The Storyteller", emoji: "📖", rarity: "Secret", blurb: "Wrote a profile README that a total stranger could understand.", from: "Module 1 side quest" },
  { key: "kindness-sprint", title: "Kindness Sprint", emoji: "💌", rarity: "Secret", blurb: "Left three genuinely helpful comments for other people.", from: "Module 7 side quest" },
  { key: "cartographer", title: "Cartographer", emoji: "🗺️", rarity: "Epic", blurb: "Completed every single step of every module. 100% run.", from: "Full course" },
];

export const xp = {
  lesson: 10,
  activity: 15,
  missionItem: 10,
  missionBonus: 30,
  quizPass: 25,
  boss: 100,
  phoenix: 20,
} as const;

/* ── 3. COURSE JOURNEY ───────────────────────────────────────────────────── */

export const modules: Module[] = [
  {
    key: "m1",
    index: 1,
    title: "Spawn Point",
    subtitle: "Welcome to the Octoverse",
    emoji: "🪪",
    accent: "coral",
    minutes: 45,
    level: "Level 1 · Hatchling",
    hook: "You materialise in an infinite library with an empty satchel. The librarian waves eight arms at you: “First things first, Rookie — you need a name.”",
    objectives: [
      "Say what GitHub is, in your own words, using one analogy.",
      "Tell the difference between Git and GitHub without panicking.",
      "Create a free GitHub account and turn on two-factor security.",
      "Find the five landmarks of the dashboard so you never feel lost again.",
      "Publish a profile that greets visitors with a README.",
    ],
    concepts: [
      {
        id: "what-is-github",
        term: "GitHub",
        emoji: "🐙",
        plain: "A website that stores your files in the cloud, remembers every change anyone ever made, and lets you invite other people in.",
        analogy: "Google Docs for absolutely any project — plus a library that never throws away an old draft.",
        say: "“GitHub is a website that stores my project, remembers every version of it, and lets me share it with people.”",
      },
      {
        id: "git-vs-github",
        term: "Git vs GitHub",
        emoji: "📸",
        plain: "Git is the tracking software. GitHub is the website where you keep and share the results. We only ever touch the website in this course.",
        analogy: "Git is the camera. GitHub is the photo album you share with friends. You can take photos without an album — but the album is the fun part.",
        say: "“Git is the engine, GitHub is the friendly website on top of it.”",
      },
      {
        id: "version-control",
        term: "Version control",
        emoji: "⏮️",
        plain: "A system that keeps every old copy of your work forever, so you can always go back.",
        analogy: "An Undo button that never runs out — like a video game's list of save files.",
        say: "“Version control means I can always go back to an earlier version.”",
      },
      {
        id: "open-source",
        term: "Open source",
        emoji: "🍲",
        plain: "Work that is shared publicly so anyone can read it, use it, and suggest improvements.",
        analogy: "A neighbourhood potluck recipe book: everyone copies a recipe, tweaks it, and writes the improvement back in.",
        say: "“Open source means the work is public and strangers are allowed to help.”",
      },
      {
        id: "handle",
        term: "Username / handle",
        emoji: "🏷️",
        plain: "Your one-and-only player name on GitHub. It shows up in your profile web address: github.com/YOURHANDLE.",
        analogy: "Your gamer tag. Pick something you'd be happy saying in a job interview in three years.",
        say: "“My handle is my identity — it's in my profile URL.”",
      },
    ],
    activities: [
      {
        id: "claim-name",
        title: "Claim your player name",
        minutes: 12,
        mode: "Solo",
        steps: [
          "Go to github.com and click Sign up.",
          "Enter your email, create a password, then choose your handle (letters, numbers, hyphens — no spaces).",
          "Solve the little puzzle to prove you're human, then check your email for the launch code and type it in.",
          "Turn on two-factor authentication when offered: your phone becomes the second key. Do not skip this.",
          "Answer the onboarding questions honestly — or skip them all. Either is fine.",
        ],
        deliverable: "A live profile page at github.com/YOURHANDLE and a working login.",
        safety: "Lost the code email? Check spam, then hit 'resend'. Nobody has ever been locked out forever by accident.",
      },
      {
        id: "dashboard-safari",
        title: "Dashboard safari: find the 5 landmarks",
        minutes: 10,
        mode: "Solo",
        steps: [
          "🐙 Top-left logo — always brings you home. Your safety button.",
          "➕ The plus button, top-right — this is where you create almost everything in this course.",
          "🔔 The bell — your notifications (who replied to you).",
          "🔍 The search bar — press '/' anywhere to jump to it.",
          "🟢 The green square grid on your profile — your activity calendar. One square per day you did something.",
        ],
        deliverable: "You can point at all five landmarks without hunting.",
      },
      {
        id: "profile-readme",
        title: "Magic trick: the profile README",
        minutes: 15,
        mode: "Solo",
        steps: [
          "Click ➕ → New repository.",
          "In Repository name, type your handle EXACTLY (e.g. aimirah/aimirah). GitHub will whisper: '…is a special repository — its README will appear on your profile!'",
          "Tick 'Add a README file' and click Create repository.",
          "Click the pencil icon on README.md and write three lines: who you are, what you're learning, one human thing (favourite snack counts).",
          "Click Commit changes… and press the green button.",
        ],
        deliverable: "Your profile now greets visitors in your own words.",
        safety: "Typed something embarrassing? Click the clock icon (history) and copy an older version back. That's Module 3, coming right up.",
      },
    ],
    mission: {
      title: "Mission 1 · The Naming Ceremony",
      brief: "The Octoverse only sees named travellers. Complete the rite and your satchel unlocks.",
      items: [
        { id: "m1-mi-1", label: "Account created and email verified" },
        { id: "m1-mi-2", label: "Two-factor authentication switched on" },
        { id: "m1-mi-3", label: "Avatar + one-line bio added to your profile" },
        { id: "m1-mi-4", label: "Special profile README published with 3 lines about you" },
      ],
      reward: "Badge: The Named One · +70 XP",
    },
    achievement: { badgeKey: "named-one", title: "The Named One", blurb: "You exist in the Octoverse now. Officially." },
    mustKnow: [
      "GitHub = cloud storage + change history + sharing.",
      "Git is the engine; GitHub is the website.",
      "Your handle and profile URL.",
      "The ➕ button, the bell, and the search bar.",
      "Two-factor authentication (turn it on, please).",
    ],
    niceToKnow: [
      "GitHub Student Developer Pack (free pro stuff if you're a student).",
      "GitHub Mobile app — handy for reading, not for creating.",
      "GitHub Copilot — an AI assistant. Cute, but not needed in this course.",
      "Organisations — team accounts you'll meet later at work.",
    ],
    instructorNotes: [
      "Biggest blocker in Module 1 is email verification codes. Ask learners to have their inbox open in a second tab before you start.",
      "Handles are permanent-ish and public. Warn against joke handles with numbers you'll regret; suggest firstname-lastname or a nickname.",
      "Demo the profile README trick live — it produces the single loudest 'whoa' in the whole course.",
      "If a learner already has an account, give them the side quest: audit a stranger's profile and write down two things that made it trustworthy.",
    ],
    quiz: [
      { id: "m1q1", q: "Which sentence best describes GitHub?", options: ["A programming language you install", "A website that stores your files, remembers every change, and lets you share them", "A paid cloud storage service for photos", "A chat app for developers"], answer: 1, why: "GitHub is a website: storage + history + sharing. It is not a language and it is not a chat app." },
      { id: "m1q2", q: "Git and GitHub are…", options: ["The exact same thing", "Two unrelated companies", "Git is the tracking engine, GitHub is the website built on top of it", "Both things you must install on your computer"], answer: 2, why: "Camera vs photo album. GitHub uses Git's ideas but you never have to install Git for this course." },
      { id: "m1q3", q: "What makes a README appear on your personal profile page?", options: ["Naming a repository exactly the same as your handle", "Paying for GitHub Pro", "Uploading a file called profile.txt", "Nothing — it's impossible"], answer: 0, why: "A repo named after your own handle is special: its README is displayed on your profile." },
      { id: "m1q4", q: "Two-factor authentication means…", options: ["You log in twice a day", "You need two things to log in: your password plus a code from your phone", "Two people share one account", "You get two accounts"], answer: 1, why: "Password + a second key. It is the single highest-value security habit on the internet." },
    ],
  },

  {
    key: "m2",
    index: 2,
    title: "Base Camp",
    subtitle: "Your first repository",
    emoji: "⛺",
    accent: "aqua",
    minutes: 50,
    level: "Level 2 · Named Explorer",
    hook: "A name is not enough. Every traveller needs a camp: somewhere to put the map, the snacks, and the half-finished ideas. Tonight you build one.",
    objectives: [
      "Create a repository from scratch in under two minutes.",
      "Explain what a repository, file, and folder are on GitHub.",
      "Choose between public and private on purpose, not by accident.",
      "Write a README a stranger can understand in ten seconds.",
      "Create, upload, rename, move, and delete files entirely from the browser.",
    ],
    concepts: [
      {
        id: "repository",
        term: "Repository (repo)",
        emoji: "📦",
        plain: "One project, in one box. Everything belonging to that project lives inside: files, folders, history, and conversations.",
        analogy: "A bento box for a project — each compartment is a part of one meal, and the box never gets mixed up with someone else's lunch.",
        say: "“A repo is a project's home: its files plus its entire history.”",
      },
      {
        id: "readme",
        term: "README.md",
        emoji: "📖",
        plain: "The front page of your repo. It's written in Markdown, a tiny formatting language where # means heading and * means bullet.",
        analogy: "The welcome sign and front door of a shop. If the sign is blank, nobody knows what's for sale.",
        say: "“The README tells a stranger what this is, why it exists, and what to do next.”",
      },
      {
        id: "markdown",
        term: "Markdown",
        emoji: "✍️",
        plain: "Typing plain text with a few symbols to add formatting: # Heading, **bold**, - bullet, [link](https://example.com), ![](image.jpg).",
        analogy: "Texting shortcuts for documents. '*laughs*' became an emoji; '# Wow' became a heading.",
        say: "“Markdown is just plain text with five or six magic symbols.”",
      },
      {
        id: "public-private",
        term: "Public vs private",
        emoji: "🔓",
        plain: "Public = anyone on earth can see it. Private = only people you invite can see it. You can switch at any time.",
        analogy: "Public is a park; private is a diary with a padlock. Both are fine — just know which one you're writing in.",
        say: "“Public means the whole internet can read it, so I check before I publish.”",
      },
      {
        id: "github-dev",
        term: "github.dev (the '.' shortcut)",
        emoji: "⌨️",
        plain: "Press the '.' key while looking at any repository and GitHub opens a full editing workspace in your browser tab. No downloads.",
        analogy: "A fold-out workbench that appears wherever you are. Press a dot, get a desk.",
        say: "“Pressing dot turns any repo into an editor in my browser.”",
      },
    ],
    activities: [
      {
        id: "build-camp",
        title: "Build the Base Camp repo",
        minutes: 12,
        mode: "Solo",
        steps: [
          "➕ → New repository.",
          "Name: my-launchpad. (Short, lowercase, hyphens instead of spaces — that's the house style.)",
          "Description: one sentence, e.g. 'My first GitHub project: a tiny home on the internet.'",
          "Visibility: Public — we're going to show this off at the end.",
          "Tick 'Add a README file'. Leave everything else alone. Click Create repository.",
        ],
        deliverable: "A live public repo at github.com/YOURHANDLE/my-launchpad.",
        safety: "Named it wrong? Settings (top tab) → rename, or just delete and rebuild. Repos are cheap; courage is not.",
      },
      {
        id: "stock-camp",
        title: "Stock the camp: upload & create files",
        minutes: 15,
        mode: "Solo",
        steps: [
          "Click 'Add file' → 'Upload files'. Drag in 3 things from your computer: a photo, a note, anything. Click Commit changes.",
          "Click 'Add file' → 'Create new file'. Name it about-me.md — the .md part is what makes it Markdown.",
          "Type: '# Hi, I'm ___', then '- Learning: GitHub', then '- Favourite snack: ___'. Commit it.",
          "Create a folder by typing a name followed by a slash: notes/my-first-note.md — GitHub builds the folder for you.",
          "Click the Preview tab while editing to see your formatting come alive.",
        ],
        deliverable: "5 files across 2 folders, all committed.",
      },
      {
        id: "tidy-camp",
        title: "Tidy up: rename, move, delete",
        minutes: 10,
        mode: "Solo",
        steps: [
          "Open a file → pencil icon → change the filename at the top → Commit changes.",
          "Move it into a folder by typing folder/name.md into the filename box. Yes, really.",
          "Open a file → three-dot menu (…) → Delete file → Commit.",
          "Notice the counter at the top of the repo: files and commits both have numbers. Watch them change.",
        ],
        deliverable: "A camp you can find things in.",
      },
    ],
    mission: {
      title: "Mission 2 · Stock the Base Camp",
      brief: "A camp with one blanket is not a camp. Prove you can build, fill, and tidy a project home.",
      items: [
        { id: "m2-mi-1", label: "Public repo 'my-launchpad' created with a description" },
        { id: "m2-mi-2", label: "At least 5 files committed, in at least 2 folders" },
        { id: "m2-mi-3", label: "README has a heading, a sentence, and one bullet list" },
        { id: "m2-mi-4", label: "Renamed or moved one file, and deleted one file on purpose" },
        { id: "m2-mi-5", label: "Opened the repo in an incognito window to see it as a stranger would" },
      ],
      reward: "Badge: Base Camp Builder · +80 XP",
    },
    achievement: { badgeKey: "base-camp-builder", title: "Base Camp Builder", blurb: "You have a home on the internet and it has furniture in it." },
    mustKnow: [
      "Repo = one project's files + folders + history.",
      "README.md is the front door; Markdown is 5 magic symbols.",
      "Public vs private, and how to switch.",
      "Add file → Upload / Create; pencil icon to edit; (…) menu to delete.",
      "Filename trick: typing folder/name.md creates a folder.",
    ],
    niceToKnow: [
      ".gitignore — a list of files GitHub should ignore. Irrelevant until you use tools.",
      "Choosing a license — we cover the friendly version in Module 7.",
      "Repository templates — start from someone else's tidy layout.",
      "Large file storage (Git LFS) and releases/attachments.",
    ],
    instructorNotes: [
      "Have learners bring 3 files to upload BEFORE the session. Hunting for files is where momentum dies.",
      "The incognito-window step is the empathy lesson of the module — insist on it.",
      "Common error: typing a folder name without the slash and wondering where the folder went. Demo the slash slowly.",
      "Show a terrible README and a great README side by side for 60 seconds before they write theirs.",
    ],
    quiz: [
      { id: "m2q1", q: "A repository is best described as…", options: ["A single file", "One project's files, folders, and full change history", "A folder on your own computer", "A database of passwords"], answer: 1, why: "One project, one box: files + folders + history + conversations." },
      { id: "m2q2", q: "What does README.md do?", options: ["It hides your files", "It is the front page that explains the project to visitors", "It is a backup of your password", "It only works on private repos"], answer: 1, why: "The welcome sign. It renders automatically at the top of your repo page." },
      { id: "m2q3", q: "How do you create a folder using the GitHub website?", options: ["Click 'New folder'", "Type the folder name followed by a slash in the filename box, e.g. notes/idea.md", "You can't — you need software", "Right-click the background"], answer: 1, why: "The slash trick. There is no 'New folder' button, which surprises everyone once." },
      { id: "m2q4", q: "You set a repo to Public by mistake. What's true?", options: ["It's permanent", "You can change it to Private in the repo's Settings tab at any time", "You must delete the repo", "GitHub will email you a fine"], answer: 1, why: "Settings → Danger Zone → Change visibility. It's reversible, which is why we practise it early." },
    ],
  },

  {
    key: "m3",
    index: 3,
    title: "The Time Machine",
    subtitle: "Commits & history",
    emoji: "⏳",
    accent: "gold",
    minutes: 45,
    level: "Level 3 · Base Camp Builder",
    hook: "The Timekeeper appears beside your camp and hands you a clock with no hands. “Every time you save,” she says, “you get to keep this moment forever. Let's learn to rewind.”",
    objectives: [
      "Explain a commit as a labelled save point.",
      "Write commit messages that a future stranger (you) can understand.",
      "Read a repo's history timeline.",
      "Open an older version of a file and copy its content back.",
      "Earn your first Phoenix Feather by breaking something and fixing it.",
    ],
    concepts: [
      {
        id: "commit",
        term: "Commit",
        emoji: "💾",
        plain: "A saved snapshot of your project with a note attached. Every change you make on GitHub's website ends with a 'Commit changes' button — that's you creating a save point.",
        analogy: "A save point in a video game, with a sticky note that says what you did. You can reload any save, any time.",
        say: "“A commit is a saved snapshot of my project with a message describing it.”",
      },
      {
        id: "commit-message",
        term: "Commit message",
        emoji: "🏷️",
        plain: "The label on the save point. Keep the first line short: what changed and why.",
        analogy: "The label on a moving box. 'Kitchen stuff' is useless; 'Kitchen — the good plates, wrapped' is gold.",
        say: "“Add a photo of my dog to the README” beats “update”.",
      },
      {
        id: "history",
        term: "History / timeline",
        emoji: "🕰️",
        plain: "The list of every commit, newest first, shown near the top of your repo (e.g. '12 Commits').",
        analogy: "A diary of your project. Every entry says who did what, when.",
        say: "“The history shows every save, who made it, and when.”",
      },
      {
        id: "diff",
        term: "Diff (the green and red view)",
        emoji: "🎨",
        plain: "A side-by-side or colour view showing exactly which lines were added (green) and removed (red) in a change.",
        analogy: "A teacher's red pen, but kinder: green means new, red means gone.",
        say: "“The diff shows exactly what changed — green added, red removed.”",
      },
      {
        id: "rewind",
        term: "Rewinding",
        emoji: "⏮️",
        plain: "Opening an older commit to see how a file used to look, then copying that version back and committing it as a new save.",
        analogy: "Rewatching an older episode and re-typing the good lines. We never destroy history — we add a new save that restores the old words.",
        say: "“Nothing is lost. I can always open an old version and save it again.”",
      },
    ],
    activities: [
      {
        id: "three-saves",
        title: "Three saves and a story",
        minutes: 12,
        mode: "Solo",
        steps: [
          "Open my-launchpad → click README.md → pencil icon.",
          "Add a section '## Why I'm here' with two sentences. Commit with the message: 'Add why I'm here section'.",
          "Edit again: add a bullet list of three things you want to learn. Commit: 'List three learning goals'.",
          "Edit once more: fix one typo you left on purpose. Commit: 'Fix typo in learning goals'.",
          "Now click the commits counter near the top and read your three entries like a story.",
        ],
        deliverable: "A history timeline with three well-labelled saves.",
      },
      {
        id: "read-diff",
        title: "Read the diff like a detective",
        minutes: 8,
        mode: "Solo",
        steps: [
          "In the history list, click any commit's title (not the < > icon yet).",
          "Look at the green lines and the red lines. Say out loud what changed.",
          "Click 'View file' to see the file as it was at that exact moment in time.",
        ],
        deliverable: "You can describe a change just by looking at its colours.",
      },
      {
        id: "phoenix",
        title: "🪶 Side quest: the Phoenix Feather",
        minutes: 12,
        mode: "Solo",
        steps: [
          "Deliberately wreck something: delete your whole README and commit it with the message 'Oops — deleted everything'.",
          "Sit with the tiny panic. Notice that the file still exists in history.",
          "Open the commits list → click the commit BEFORE the disaster → 'View file' → copy the old text.",
          "Paste it back into README.md and commit: 'Restore README from history'.",
          "Claim your Phoenix Feather. You now know the truest thing about GitHub: nothing is ever really gone.",
        ],
        deliverable: "A restored README and permanent fearlessness.",
        safety: "This is the single most valuable 12 minutes in the course. Do not let learners skip it because they're 'being careful'.",
      },
    ],
    mission: {
      title: "Mission 3 · Rewind and Rescue",
      brief: "Prove you can save with intent, read your own past, and rescue a file from it.",
      items: [
        { id: "m3-mi-1", label: "Three commits made, each with a descriptive message" },
        { id: "m3-mi-2", label: "Opened the history timeline and read a diff" },
        { id: "m3-mi-3", label: "Viewed a file as it looked in an older commit" },
        { id: "m3-mi-4", label: "Broke something on purpose AND restored it (Phoenix Feather 🪶)" },
      ],
      reward: "Badge: Time Traveller · +70 XP (+20 Phoenix bonus)",
    },
    achievement: { badgeKey: "time-traveller", title: "Time Traveller", blurb: "You have looked backwards in time and brought something home." },
    mustKnow: [
      "Commit = labelled save point.",
      "Write messages that describe the change, not your mood.",
      "Where the history button is and how to read a diff.",
      "How to recover an older version of a file.",
    ],
    niceToKnow: [
      "Commit SHA — the long ID like a3f9c21. Unique fingerprint of a save.",
      "Revert button on a commit — GitHub can create the 'undo' commit for you.",
      "Blame view — shows who last touched each line (great for teams, easy to misuse).",
      "Amending and squashing — terminal-only topics. Genuinely skip these.",
    ],
    instructorNotes: [
      "The 'nothing is ever lost' realisation is the emotional centre of the course. Make the Phoenix quest mandatory and celebrate it out loud.",
      "Model bad commit messages first ('update', 'fix', 'asdf') then rewrite them together. Laughter helps.",
      "Watch for learners clicking the < > icon (view code at that commit) and getting confused — explain it as 'the whole repo, frozen at that moment'.",
    ],
    quiz: [
      { id: "m3q1", q: "A commit is…", options: ["A promise to finish later", "A saved snapshot of your project with a message attached", "A way to delete a repo", "A type of folder"], answer: 1, why: "Save point + sticky note. That's the whole idea." },
      { id: "m3q2", q: "Which is the strongest commit message?", options: ["update", "stuff", "Add photo of team to README", "final final version"], answer: 2, why: "It says what changed and where. Future-you will be grateful." },
      { id: "m3q3", q: "In a diff, green lines mean…", options: ["Lines that were deleted", "Lines that were added", "Lines nobody can edit", "Lines with spelling errors"], answer: 1, why: "Green = added, red = removed. Learn the colours and reading history becomes effortless." },
      { id: "m3q4", q: "You accidentally deleted a file and committed it. What's true?", options: ["It's gone forever", "You can find it in history, copy the old version, and commit it back", "You must contact GitHub support", "You need to reinstall Git"], answer: 1, why: "History keeps everything. Recovery is three clicks and one copy-paste." },
    ],
  },

  {
    key: "m4",
    index: 4,
    title: "Parallel Universes",
    subtitle: "Branches",
    emoji: "🌿",
    accent: "lime",
    minutes: 50,
    level: "Level 4 · Time Traveller",
    hook: "Your Twin steps out of a doorway that wasn't there yesterday. “Whatever you're scared of ruining,” she says, “let me do it over here instead.”",
    objectives: [
      "Explain a branch as a safe copy where experiments happen.",
      "Name main as the official version of the project.",
      "Create a branch, switch between branches, and edit inside one.",
      "See how far a branch has drifted from main.",
      "Understand why teams never edit main directly.",
    ],
    concepts: [
      {
        id: "branch",
        term: "Branch",
        emoji: "🌿",
        plain: "A copy of your project that you can change freely without touching the official version. Changes stay separate until you decide to bring them home.",
        analogy: "A parallel universe — or tracing paper laid over a drawing. Scribble all you like; the original underneath is untouched.",
        say: "“A branch is a safe scratch copy where I experiment.”",
      },
      {
        id: "main",
        term: "main (the default branch)",
        emoji: "🏠",
        plain: "The official, published version of your project. When someone visits your repo, this is what they see.",
        analogy: "The final copy of the essay you hand in. Branches are the rough drafts on your desk.",
        say: "“main is the official copy everyone sees.”",
      },
      {
        id: "switch",
        term: "Switching branches",
        emoji: "🔀",
        plain: "The dropdown button near the top-left of the file list that says 'main'. Click it to type a new branch name or hop to an existing one. The whole page changes to show that universe.",
        analogy: "A channel button on a TV. Same room, different universe on screen.",
        say: "“I always check which branch I'm on before I edit.”",
      },
      {
        id: "ahead-behind",
        term: "Ahead / behind",
        emoji: "📏",
        plain: "GitHub counts how many commits your branch has that main doesn't: 'This branch is 2 commits ahead of main'.",
        analogy: "How many pages of your draft aren't in the official copy yet.",
        say: "“Ahead means my branch has new saves that main is missing.”",
      },
    ],
    activities: [
      {
        id: "make-branch",
        title: "Open a doorway",
        minutes: 12,
        mode: "Solo",
        steps: [
          "In my-launchpad, click the branch dropdown that says 'main'.",
          "Type add-about-me in the box and press Enter. GitHub says 'Create branch: add-about-me from main'. Click it.",
          "Look at the top of the page: you're now standing on a branch. There's often a yellow banner telling you so.",
          "Branch names follow the house style too: lowercase, hyphens, verb-first. add-about-me, fix-typo-in-readme, try-new-banner.",
        ],
        deliverable: "A second universe exists, and you're standing in it.",
      },
      {
        id: "edit-branch",
        title: "Experiment wildly (safely)",
        minutes: 15,
        mode: "Solo",
        steps: [
          "On your branch, create about-me.md and write five bold, ridiculous, joyful sentences about yourself.",
          "Commit with the message 'Add a wild about-me draft'.",
          "Switch back to 'main' using the dropdown. Your new file has vanished. Panic is optional; it's safe in the branch.",
          "Switch back to add-about-me. It's there again. Do that twice more until it feels like magic rather than luck.",
        ],
        deliverable: "Proof that branches isolate changes.",
      },
      {
        id: "compare",
        title: "Measure the drift",
        minutes: 10,
        mode: "Solo",
        steps: [
          "Stay on your branch. Near the top you'll see a banner like 'add-about-me had recent changes' with a 'Compare & pull request' button. Do not click it yet — that's Module 5.",
          "Instead click the commits counter and confirm your new commit lives here and not on main.",
          "Add one more commit to the branch, then check main again: still untouched.",
        ],
        deliverable: "You can explain exactly what is different between the two universes.",
        safety: "If the branch dropdown shows nothing, you may be on a cached page. Refresh — the branch is there.",
      },
    ],
    mission: {
      title: "Mission 4 · Fork the Timeline",
      brief: "Create a parallel universe, live in it, and prove the official copy never flinched.",
      items: [
        { id: "m4-mi-1", label: "Created a branch with a descriptive, lowercase-hyphen name" },
        { id: "m4-mi-2", label: "Added or edited a file ON the branch and committed it" },
        { id: "m4-mi-3", label: "Switched to main and confirmed the change is not there" },
        { id: "m4-mi-4", label: "Switched back and confirmed the change returns" },
        { id: "m4-mi-5", label: "Can say out loud why teams avoid editing main directly" },
      ],
      reward: "Badge: Branch Ranger · +80 XP",
    },
    achievement: { badgeKey: "branch-ranger", title: "Branch Ranger", blurb: "You can now try anything without risking anything." },
    mustKnow: [
      "Branch = safe scratch copy.",
      "main = the official version visitors see.",
      "Where the branch dropdown is and how to switch.",
      "Check which branch you're on before editing (this prevents 90% of beginner confusion).",
    ],
    niceToKnow: [
      "Branch protection rules — locks main so changes must come via pull request.",
      "Default branch renaming and setting.",
      "Deleting branches (we do this at the end of Module 5).",
      "Git terminology like HEAD, checkout, and detached states — firmly a 'later' topic.",
    ],
    instructorNotes: [
      "The 'my file disappeared when I switched to main' moment is the lesson. Let it happen, then let them switch back.",
      "Draw a Y-shaped fork on a whiteboard once. Never more than once.",
      "Pair mode works beautifully here: one learner drives, one calls out which branch you're on before every click.",
    ],
    quiz: [
      { id: "m4q1", q: "A branch is…", options: ["A backup on a USB stick", "A separate copy of the project where you can experiment safely", "A folder inside your repo", "A permission level"], answer: 1, why: "Tracing paper over the drawing. The original stays clean." },
      { id: "m4q2", q: "What is 'main'?", options: ["The main menu of GitHub", "Your account settings page", "The default branch — the official version visitors see", "The oldest commit"], answer: 2, why: "main is the published, official copy of the project." },
      { id: "m4q3", q: "You created a file on a branch, then switched to main and it's gone. What happened?", options: ["GitHub lost your file", "You deleted it by switching", "Nothing is wrong — the file only exists on the branch", "You need to pay to see it"], answer: 2, why: "Branches hold separate versions. Switch back and it reappears." },
      { id: "m4q4", q: "Why do teams avoid editing main directly?", options: ["It's slower", "So the official version only changes after work is reviewed", "GitHub blocks it by default", "main is read-only forever"], answer: 1, why: "main stays trustworthy. Experiments happen on branches and arrive through pull requests." },
    ],
  },

  {
    key: "m5",
    index: 5,
    title: "The Handshake",
    subtitle: "Pull requests & merging",
    emoji: "🪄",
    accent: "violet",
    minutes: 55,
    level: "Level 5 · Branch Ranger",
    hook: "A bridge of light appears between your universe and the official one. Crossing it means knocking first: “Hey — I made something. Would you like it?”",
    objectives: [
      "Explain a pull request as a polite proposal, not a demand.",
      "Open a pull request from a branch and write a clear description.",
      "Read the 'Files changed' tab and review your own work.",
      "Merge a pull request and clean up the branch afterwards.",
      "Recognise a merge conflict and stay calm about it.",
    ],
    concepts: [
      {
        id: "pull-request",
        term: "Pull request (PR)",
        emoji: "🤝",
        plain: "A proposal: 'I made these changes on a branch — please review them and, if they're good, pull them into main.' It opens a conversation with a chat thread attached.",
        analogy: "Handing a friend your essay draft and saying 'any notes before I submit it?' The essay isn't submitted yet — you're asking.",
        say: "“A pull request is a polite proposal to merge my branch, with a conversation attached.”",
      },
      {
        id: "review",
        term: "Review & comments",
        emoji: "🔎",
        plain: "People read the changes, leave comments on specific lines, and either approve, request changes, or just chat.",
        analogy: "Margin notes from a kind editor. They're about the work, never about you.",
        say: "“Reviews are notes on the work, not judgements of the person.”",
      },
      {
        id: "merge",
        term: "Merge",
        emoji: "🪄",
        plain: "Accepting the proposal: your branch's changes become part of main. The green button says 'Merge pull request'.",
        analogy: "Two rivers joining. After the merge, there's one river again — and it's wider.",
        say: "“Merging brings my branch's work into the official copy.”",
      },
      {
        id: "conflict",
        term: "Merge conflict",
        emoji: "🚧",
        plain: "Two people changed the same line in different ways, so GitHub can't guess which one wins. It asks a human to choose. It is a question, not an error.",
        analogy: "Two people writing different words on the same line of a shared notebook. Someone has to say which one stays — usually both, in a sensible order.",
        say: "“A conflict just means GitHub needs me to choose. Nothing is broken.”",
      },
      {
        id: "draft-pr",
        term: "Draft pull request",
        emoji: "🚧",
        plain: "A PR marked 'work in progress' so people can watch, but nobody merges it yet.",
        analogy: "A restaurant dish still on the pass: visible, but not ready to serve.",
        say: "“Draft means 'look, but don't merge yet'.”",
      },
    ],
    activities: [
      {
        id: "open-pr",
        title: "Knock on the door",
        minutes: 15,
        mode: "Solo",
        steps: [
          "On your branch (from Module 4), click the yellow banner's 'Compare & pull request' button. No banner? Use the 'Pull requests' tab → 'New pull request' and pick your branch.",
          "Check the two labels at the top: base: main ← compare: add-about-me. Base is the destination; compare is your universe.",
          "Write a title in plain English: 'Add an about-me page'.",
          "In the description box write three lines: What changed / Why it matters / Anything reviewers should check.",
          "Click 'Create pull request'. Confetti is your birthright — enjoy it.",
        ],
        deliverable: "A real pull request with number #1 (or higher) in your repo.",
      },
      {
        id: "review-pr",
        title: "Review your own work",
        minutes: 12,
        mode: "Pair",
        steps: [
          "Open the 'Files changed' tab. Read the green and red like a detective.",
          "Leave one comment on a line: hover it, click the +, type something kind and specific, then 'Start a review' → 'Submit review'.",
          "In a class, swap screens with a partner and have them read your description out loud. If they can't say what changed, rewrite the title.",
        ],
        deliverable: "One review comment and a description a stranger understood.",
      },
      {
        id: "merge-pr",
        title: "Seal the Handshake",
        minutes: 10,
        mode: "Solo",
        steps: [
          "Back on the Conversation tab, scroll to the bottom and click the green 'Merge pull request'.",
          "Confirm. Watch it turn purple: 'Merged'.",
          "Click 'Delete branch' — the experiment has served its purpose.",
          "Switch to main. Your about-me.md is now part of the official copy. Check the commit count went up.",
        ],
        deliverable: "A merged pull request and a tidy branch list.",
      },
      {
        id: "conflict-lab",
        title: "🚧 Conflict lab (brave mode)",
        minutes: 15,
        mode: "Pair",
        steps: [
          "On main, edit line 1 of README.md to say 'Hello from main' and commit.",
          "Create a new branch try-a-greeting, edit the SAME line to say 'Hello from the branch', commit.",
          "Open a pull request. GitHub will say 'Can't automatically merge'. That's the conflict — and it's not a disaster.",
          "Click 'Resolve conflicts' (or edit the file on the branch to match main), keep the wording you like, mark as resolved, then merge.",
          "If 'Resolve conflicts' looks scary, the shortcut is: copy the line you want, paste it into the branch's file, commit, and the PR unblocks itself.",
        ],
        deliverable: "You have seen a conflict and lived. Fear reduced permanently.",
        safety: "Conflicts cannot damage main. The worst outcome is a messy file you can fix with another commit.",
      },
    ],
    mission: {
      title: "Mission 5 · Seal the Handshake",
      brief: "Propose, review, merge, tidy. Then do it again under pressure with a conflict.",
      items: [
        { id: "m5-mi-1", label: "Pull request opened with a clear title and 3-line description" },
        { id: "m5-mi-2", label: "'Files changed' reviewed and one comment left" },
        { id: "m5-mi-3", label: "Pull request merged into main" },
        { id: "m5-mi-4", label: "Branch deleted after merging" },
        { id: "m5-mi-5", label: "Survived (or at least looked at) a merge conflict" },
      ],
      reward: "Badge: Merge Master · +80 XP",
    },
    achievement: { badgeKey: "merge-master", title: "Merge Master", blurb: "You have completed the full loop: branch → propose → review → merge." },
    mustKnow: [
      "PR = proposal + conversation, not a demand.",
      "base: main ← compare: your-branch.",
      "The 'Files changed' tab is where reviewing happens.",
      "Merge button, then Delete branch.",
      "Conflicts are a question for a human, never a disaster.",
    ],
    niceToKnow: [
      "Squash vs rebase vs merge-commit buttons — three flavours of the same merge. Use the default.",
      "Automated checks (CI) — the little red ✗ / green ✓ that run tests.",
      "Branch protection requiring approvals before merging.",
      "PR templates that pre-fill the description box.",
    ],
    instructorNotes: [
      "This is the module that makes people feel like real developers. Slow down. Let them read the confetti screen.",
      "Demo a conflict live before they try one — seeing an instructor stay calm is 80% of the lesson.",
      "Solo learners can review their own PR; it feels silly and works fine. Pairs are better if you have them.",
      "If time is short, make the conflict lab optional and assign it as the guild challenge instead.",
    ],
    quiz: [
      { id: "m5q1", q: "A pull request is…", options: ["A request to download someone's code", "A proposal to merge your branch's changes into the target branch, with a conversation attached", "A way to delete a repository", "An email to GitHub support"], answer: 1, why: "You're asking, not demanding. 'Pull' = please pull my changes in." },
      { id: "m5q2", q: "In 'base: main ← compare: add-about-me', what is 'base'?", options: ["Your branch", "The destination your changes would merge into", "The oldest commit", "The repo's nickname"], answer: 1, why: "Base = destination (usually main). Compare = where your changes come from." },
      { id: "m5q3", q: "Where do you actually read the lines that changed?", options: ["The Conversation tab", "The Files changed tab", "Your profile page", "The Settings tab"], answer: 1, why: "Files changed shows the diff, line by line, with room for comments." },
      { id: "m5q4", q: "GitHub says 'Can't automatically merge'. This means…", options: ["Your repo is broken", "Two changes touched the same lines and a human must choose", "You must delete the branch", "You need a paid plan"], answer: 1, why: "A conflict is a question, not a catastrophe. Resolve, then merge." },
    ],
  },

  {
    key: "m6",
    index: 6,
    title: "The Village Square",
    subtitle: "Issues, labels & teamwork",
    emoji: "📣",
    accent: "coral",
    minutes: 45,
    level: "Level 6 · Merge Wizard",
    hook: "Down in the square there's a board covered in notes: requests, complaints, ideas, and one that just says 'does anyone else find this confusing?'. A voice says: “Your turn to pin one.”",
    objectives: [
      "Explain an issue as a to-do note, not a mistake.",
      "Create issues with clear titles, descriptions, labels, and assignees.",
      "Close an issue from a pull request using a magic keyword.",
      "Invite a collaborator and work in the same repo.",
      "Manage notifications so GitHub helps you instead of nagging you.",
    ],
    concepts: [
      {
        id: "issue",
        term: "Issue",
        emoji: "🗒️",
        plain: "A tracked note about your project: a bug, an idea, a question, or a to-do. Each one gets a number (#1, #2…) and its own conversation thread.",
        analogy: "Sticky notes on the team fridge — except nobody can quietly throw them away, and every note has a comment section.",
        say: "“An issue is a to-do note with a conversation attached. It doesn't mean something is broken.”",
      },
      {
        id: "labels",
        term: "Labels",
        emoji: "🏷️",
        plain: "Coloured tags that sort issues: bug, enhancement, question, documentation, good first issue. You can invent your own.",
        analogy: "Coloured filing folders. Same paper, instantly findable.",
        say: "“Labels sort the notes so people can find the kind they want to help with.”",
      },
      {
        id: "assignee",
        term: "Assignee & mentions",
        emoji: "👉",
        plain: "Assignee = whose job it is. Typing @someone in a comment pings them directly.",
        analogy: "Writing a name in the top-right corner of the sticky note, then tapping them on the shoulder.",
        say: "“@name gets someone's attention; assignee says whose job it is.”",
      },
      {
        id: "closing-keywords",
        term: "Magic closing keywords",
        emoji: "✨",
        plain: "Write 'Closes #3' or 'Fixes #3' in a pull request description and the issue closes itself the moment the PR merges.",
        analogy: "Telling the butler 'when the package arrives, take the note off the fridge'. Automation by politeness.",
        say: "“Closes #3 in my PR links the work to the note and closes it automatically.”",
      },
      {
        id: "collaborators",
        term: "Collaborators",
        emoji: "🧑‍🤝‍🧑",
        plain: "People you invite to work inside your repo. Settings → Collaborators → Add people → type their handle. They accept by email.",
        analogy: "Handing someone a key to your camp. They can now move the furniture.",
        say: "“I invite collaborators from Settings, and they accept by email.”",
      },
    ],
    activities: [
      {
        id: "pin-notes",
        title: "Pin three notes on the fridge",
        minutes: 12,
        mode: "Solo",
        steps: [
          "Open the 'Issues' tab in my-launchpad → 'New issue'.",
          "Issue 1 — an idea: 'Add a gallery of my favourite places'. Label it enhancement.",
          "Issue 2 — a bug: 'Photo doesn't show up in README'. Label it bug. Describe what you expected vs what happened.",
          "Issue 3 — a question: 'Which license should I pick?'. Label it question and help wanted.",
        ],
        deliverable: "Three numbered issues with labels.",
      },
      {
        id: "converse",
        title: "Hold a conversation",
        minutes: 10,
        mode: "Pair",
        steps: [
          "Comment on your own issue #2 with a plan: 'I'll re-upload the photo as a smaller file.'",
          "Assign the issue to yourself using the Assignees cog on the right.",
          "In a class, @mention your partner in a comment and watch their bell light up. Then swap.",
        ],
        deliverable: "An issue with an owner, a plan, and a mention.",
      },
      {
        id: "auto-close",
        title: "✨ Use the magic keyword",
        minutes: 12,
        mode: "Solo",
        steps: [
          "Create a branch fix-readme-photo. Actually fix the thing in issue #2 (or pretend convincingly).",
          "Open a pull request and in the description write exactly: 'Closes #2'.",
          "Merge the pull request.",
          "Go back to the Issues list and switch the filter to 'Closed'. There it is — closed automatically, with a link to the work that closed it.",
        ],
        deliverable: "One issue closed by a merge, with a paper trail.",
      },
      {
        id: "invite",
        title: "Give someone a key",
        minutes: 8,
        mode: "Pair",
        steps: [
          "Settings → Collaborators (left sidebar) → 'Add people'.",
          "Type a partner's GitHub handle or email and send the invite.",
          "They accept from their email or from github.com/notifications.",
          "Now they can commit to your repo. In the wild, this is how every team starts.",
        ],
        deliverable: "A collaborator who can edit your repo.",
        safety: "Only invite people you'd happily hand a key to. You can remove collaborators any time from the same screen.",
      },
    ],
    mission: {
      title: "Mission 6 · Answer the Village Call",
      brief: "Make the board useful, then make it work for you automatically.",
      items: [
        { id: "m6-mi-1", label: "Three issues created with clear titles" },
        { id: "m6-mi-2", label: "Labels applied (bug / enhancement / question)" },
        { id: "m6-mi-3", label: "One issue assigned and commented on" },
        { id: "m6-mi-4", label: "A PR containing 'Closes #N' merged, closing the issue" },
        { id: "m6-mi-5", label: "A collaborator invited (or a classmate's issue answered)" },
      ],
      reward: "Badge: Village Voice · +80 XP",
    },
    achievement: { badgeKey: "village-voice", title: "Village Voice", blurb: "Your project now has a working conversation with other humans." },
    mustKnow: [
      "Issues are to-dos, not accidents.",
      "Clear title + what you expected vs what happened.",
      "Labels, assignees, and @mentions.",
      "'Closes #N' links work to notes.",
      "Where the notification bell is and how to unsubscribe from one thread.",
    ],
    niceToKnow: [
      "Issue templates and issue forms.",
      "Projects (kanban boards) and Milestones — beautiful, and easy to over-engineer as a beginner.",
      "Discussions — a forum-style space separate from issues.",
      "Organisations, teams, and permission levels.",
    ],
    instructorNotes: [
      "Reframe 'issue' early: beginners think filing an issue means reporting a failure. Show a repo with 400 open issues and call it healthy.",
      "The 'Closes #N' trick is a crowd-pleaser — do it live and let the auto-close land as a magic trick.",
      "If your group is remote and can't pair, have learners file an issue on the INSTRUCTOR's demo repo and answer each other's.",
    ],
    quiz: [
      { id: "m6q1", q: "An issue on GitHub is…", options: ["Always a bug that needs fixing", "A tracked note — bug, idea, question, or to-do — with its own conversation", "A warning that your repo will be deleted", "A private message"], answer: 1, why: "'Issue' is an unfortunate word. It just means 'a note on the board'." },
      { id: "m6q2", q: "What do labels do?", options: ["Rename your repo", "Sort issues into categories like bug, enhancement, or good first issue", "Lock an issue", "Delete duplicates"], answer: 1, why: "Coloured filing folders for your sticky notes." },
      { id: "m6q3", q: "You write 'Closes #4' in a pull request description. What happens when it merges?", options: ["The repo closes", "Issue #4 is closed automatically", "Nothing", "Your branch is deleted"], answer: 1, why: "Closes / Fixes / Resolves + #number = automatic tidy-up with a link to the work." },
      { id: "m6q4", q: "How do you let a friend edit your repository?", options: ["Email them your password", "Settings → Collaborators → Add people", "Create a new account for them", "You can't — repos are single-player"], answer: 1, why: "Never share passwords. Invite by handle; they accept by email." },
    ],
  },

  {
    key: "m7",
    index: 7,
    title: "Treasure Hunt",
    subtitle: "Open source & real life",
    emoji: "💎",
    accent: "aqua",
    minutes: 45,
    level: "Level 7 · Village Voice",
    hook: "The village gate opens onto a continent: three hundred million projects, most of them made by ordinary people who were once exactly where you are. Go and take something home.",
    objectives: [
      "Find projects using search, topics, Explore, and Trending.",
      "Star, watch, and follow — and know the difference.",
      "Fork a repo and explain what you just did.",
      "Read a licence in plain English.",
      "Contribute something valuable without writing code.",
      "List five non-coding things you could run on GitHub next month.",
    ],
    concepts: [
      {
        id: "star",
        term: "Star ⭐",
        emoji: "⭐",
        plain: "A bookmark plus a round of applause. Stars are how projects become visible.",
        analogy: "A heart on a post that also files it in your 'starred' list for later.",
        say: "“Starring bookmarks a project and cheers it on.”",
      },
      {
        id: "fork",
        term: "Fork",
        emoji: "🍴",
        plain: "Make your own copy of someone else's repo in your account, so you can change it freely and (optionally) offer your changes back.",
        analogy: "Photocopying a recipe from the library book so you can scribble your own notes on it. The library's original stays pristine.",
        say: "“A fork is my own copy of someone else's project.”",
      },
      {
        id: "watch-follow",
        term: "Watch & Follow",
        emoji: "👀",
        plain: "Watch a repo to get notifications about it. Follow a person to see what they star and build.",
        analogy: "Subscribing to a magazine vs following a chef.",
        say: "“Watch is for projects, Follow is for people.”",
      },
      {
        id: "license",
        term: "Licence",
        emoji: "📜",
        plain: "A short legal note saying what other people are allowed to do with your work. MIT = 'do almost anything, keep my name on it'. No licence = technically 'all rights reserved'.",
        analogy: "A permission slip. Without one, nobody is sure they're allowed to borrow your pen.",
        say: "“A licence is the permission slip that tells people how they may use my work.”",
      },
      {
        id: "good-first-issue",
        term: "'good first issue'",
        emoji: "🌱",
        plain: "A label real projects put on beginner-friendly tasks: fix a typo, improve a doc, translate a sentence.",
        analogy: "The shallow end of the pool, marked with a sign by people who want you to swim.",
        say: "“'Good first issue' means the maintainers are actively inviting beginners.”",
      },
    ],
    activities: [
      {
        id: "hunt",
        title: "Hunt for treasure",
        minutes: 12,
        mode: "Solo",
        steps: [
          "Use the search bar: type a topic you love (baking, birds, Urdu poetry, budgets) and filter results to Repositories.",
          "Visit github.com/explore and github.com/trending. Sort by language 'None' or by 'This week'.",
          "Find a project with a README you'd happily read. Note what made it good: images? steps? a demo?",
        ],
        deliverable: "A shortlist of 3 projects you'd actually use.",
      },
      {
        id: "collect",
        title: "Star, follow, fork",
        minutes: 10,
        mode: "Solo",
        steps: [
          "Star 3 repos you like. Find them again under Your stars (top-right avatar menu).",
          "Follow 2 people whose work you admire.",
          "Fork ONE repo. Notice the new copy lives at github.com/YOURHANDLE/project with 'forked from …' underneath.",
          "Open your fork, edit its README on a branch, and open a pull request — in your own fork. That's a rehearsal for the real thing.",
        ],
        deliverable: "3 stars, 2 follows, 1 fork with a branch in it.",
      },
      {
        id: "kindness",
        title: "💌 Side quest: the Kindness Sprint",
        minutes: 15,
        mode: "Solo",
        steps: [
          "Search for issues labelled 'good first issue' or 'documentation' in a project you care about.",
          "Leave three genuinely helpful comments anywhere on GitHub: thank a maintainer, answer a question you know, or describe a typo politely with the exact fix.",
          "Rule of the sprint: no 'nice project!!!' spam. Say something a human can act on.",
        ],
        deliverable: "Three comments a stranger was glad to receive.",
        safety: "Never paste AI-generated praise into real projects. Maintainers can smell it, and it burns bridges you might need later.",
      },
      {
        id: "real-life",
        title: "GitHub for your actual life",
        minutes: 10,
        mode: "Solo",
        steps: [
          "Pick ONE of these and make a private repo for it right now: a recipe box, class notes, a reading list, a wedding plan, a club's handbook, your CV in Markdown, a research dataset.",
          "Add a README explaining the system and one folder per category.",
          "Invite one real person as a collaborator and ask them to add one entry.",
        ],
        deliverable: "A repo you'll still be using next month.",
      },
    ],
    mission: {
      title: "Mission 7 · Bring Home Treasure",
      brief: "Leave the village and come back with proof you can navigate the continent.",
      items: [
        { id: "m7-mi-1", label: "Starred 3 repositories and can find them again" },
        { id: "m7-mi-2", label: "Followed 2 people" },
        { id: "m7-mi-3", label: "Forked 1 repository and made a change inside the fork" },
        { id: "m7-mi-4", label: "Read one licence and said what it allows in plain English" },
        { id: "m7-mi-5", label: "Left one kind, specific comment on someone else's project" },
        { id: "m7-mi-6", label: "Created one private repo for a real-life use" },
      ],
      reward: "Badge: Treasure Hunter · +90 XP",
    },
    achievement: { badgeKey: "treasure-hunter", title: "Treasure Hunter", blurb: "The continent doesn't scare you any more." },
    mustKnow: [
      "Search + topics + Explore/Trending.",
      "Star (bookmark), Watch (project updates), Follow (people), Fork (your own copy).",
      "Licence = permission slip; MIT is the friendly default.",
      "'good first issue' is the marked shallow end.",
      "GitHub works for notes, plans, docs, data, and portfolios — not only code.",
    ],
    niceToKnow: [
      "GitHub Actions (automation), Codespaces (a cloud computer), Gist (single-file snippets).",
      "GitHub Pages — publishing a repo as a free website. Lovely optional bonus for the final project.",
      "Releases, wikis, and package registries.",
      "Contributor licence agreements and formal open-source governance.",
    ],
    instructorNotes: [
      "Show your own starred list — learners copy curation habits more than technical ones.",
      "Set a hard 5-minute timer on browsing or Module 7 becomes a rabbit hole with no bottom.",
      "The Kindness Sprint is the ethics lesson of the course. Make the 'must be actionable' rule explicit.",
      "If a learner's comment gets no reply, normalise it: most open-source maintainers are volunteers with a backlog.",
    ],
    quiz: [
      { id: "m7q1", q: "Forking a repository means…", options: ["Deleting it", "Creating your own copy of someone else's repo in your account", "Reporting it", "Merging two repos"], answer: 1, why: "A photocopy you can scribble on. The original stays untouched." },
      { id: "m7q2", q: "What's the difference between Star and Watch?", options: ["They're identical", "Star bookmarks and applauds; Watch subscribes you to that repo's notifications", "Star is for private repos only", "Watch deletes the repo"], answer: 1, why: "Star = bookmark + cheer. Watch = notification subscription." },
      { id: "m7q3", q: "A repository with no licence file legally means…", options: ["Anyone can do anything with it", "By default all rights are reserved — nobody is clearly permitted to reuse it", "It's automatically MIT", "GitHub will add one"], answer: 1, why: "Public ≠ free to reuse. Add a licence so people know the rules." },
      { id: "m7q4", q: "Which is a genuinely useful first contribution to an open-source project?", options: ["Commenting 'great project!!!'", "Fixing a documented typo and opening a pull request with a clear description", "Rewriting the whole README unasked", "Emailing the maintainer at midnight"], answer: 1, why: "Small, specific, and described. That's what maintainers can actually merge." },
    ],
  },

  {
    key: "m8",
    index: 8,
    title: "Boss Level",
    subtitle: "Launch your Octoverse Passport",
    emoji: "👑",
    accent: "gold",
    minutes: 75,
    level: "Final Mission · Level 8",
    hook: "The Octocat meets you at the launch pad with your satchel, now full. “One last thing, Legend. Put something in the sky that strangers can find — and tell them who made it.”",
    objectives: [
      "Combine every skill from Modules 1–7 into one public project.",
      "Write a README that sells the project to a total stranger in 10 seconds.",
      "Demonstrate history, branching, a merged pull request, and issues in one repo.",
      "Self-assess against a simple 20-point rubric and get it checked by a peer or instructor.",
    ],
    concepts: [
      {
        id: "portfolio",
        term: "A public project as a portfolio piece",
        emoji: "🖼️",
        plain: "Employers, teachers, and collaborators click one link and immediately see whether you can organise work, explain it, and finish it.",
        analogy: "A shop window. The goods matter, but the window is what makes people stop.",
        say: "“My repo shows I can plan, document, and finish — even if it contains no code.”",
      },
      {
        id: "definition-of-done",
        term: "Definition of done",
        emoji: "✅",
        plain: "A short list agreed in advance that says when something is finished. For this mission, the rubric IS the definition of done.",
        analogy: "A packing checklist before a flight. No guessing at the gate.",
        say: "“I know I'm done when every rubric row is ticked.”",
      },
    ],
    activities: [
      {
        id: "boss-build",
        title: "Build the Passport",
        minutes: 45,
        mode: "Solo",
        steps: [
          "Create a public repo named octoverse-passport (or upgrade my-launchpad).",
          "Write a README with: a title, one-sentence description, a photo or banner, a 'What's inside' bullet list, a 'How I built this' paragraph naming commits/branches/PRs, and a 'Say hello' line with your links.",
          "Add at least 4 files across 2 folders (notes/, gallery/, plans/ — whatever suits you).",
          "Create a branch, add something meaningful on it, open a pull request with a real description, and merge it.",
          "File 2 issues; close at least one with 'Closes #N' via a merged PR.",
          "Add a licence: Add file → Create new file → name it LICENSE → use the 'Choose a license template' button that appears → pick MIT.",
          "Bonus boss move: Settings → Pages → deploy from main to publish it as a real website.",
        ],
        deliverable: "A public repo that a stranger could open and understand in under a minute.",
      },
      {
        id: "boss-review",
        title: "Peer review & launch",
        minutes: 20,
        mode: "Pair",
        steps: [
          "Swap links with a partner (or paste yours into the class channel).",
          "Score each other with the 20-point rubric. Give one compliment and one specific suggestion.",
          "Apply the suggestion in a new branch, open a PR, merge it. Yes, again — it's the muscle you're building.",
          "Share the link somewhere real: your LinkedIn, your class group, your bio.",
        ],
        deliverable: "A reviewed, improved, published project.",
      },
    ],
    mission: {
      title: "Final Mission · Launch Day",
      brief: "Everything you have learned, in one repo, in public, on purpose.",
      items: [
        { id: "m8-mi-1", label: "Public repo created with a clear name and description" },
        { id: "m8-mi-2", label: "README with heading, image, bullets, and a 'how I built this' note" },
        { id: "m8-mi-3", label: "At least 4 files in at least 2 folders" },
        { id: "m8-mi-4", label: "One branch merged via a pull request with a real description" },
        { id: "m8-mi-5", label: "Two issues filed, at least one auto-closed with 'Closes #N'" },
        { id: "m8-mi-6", label: "A licence added (MIT recommended)" },
        { id: "m8-mi-7", label: "Rubric self-scored and peer/instructor checked" },
      ],
      reward: "Badge: Octoverse Legend · +100 XP · Course certificate",
    },
    achievement: { badgeKey: "octoverse-legend", title: "Octoverse Legend", blurb: "You shipped. In public. On purpose." },
    mustKnow: [
      "Everything from Modules 1–7, used together.",
      "A README written for a stranger, not for you.",
      "The rubric is your checklist — use it while building, not after.",
    ],
    niceToKnow: [
      "GitHub Pages for a live website.",
      "Shields/badges in the README, tables of contents, and collapsible <details> sections.",
      "Pinning the repo to your profile so it's the first thing visitors see.",
    ],
    instructorNotes: [
      "Give 45 minutes of silent build time with music on, then 20 minutes of structured peer review. Do not skip the review.",
      "Have three finished example Passports ready at different quality levels so learners can calibrate.",
      "Grade with the rubric only. No hidden criteria, no surprise points — beginners need a floor they can see.",
      "Celebrate publicly: a launch wall of links, a screenshot grid, or a 2-minute demo from three volunteers.",
    ],
    quiz: [
      { id: "m8q1", q: "What is the single most important thing a stranger should get from your repo in 10 seconds?", options: ["Your commit count", "What the project is and what's inside it", "Your favourite programming language", "How many branches you made"], answer: 1, why: "The README is the shop window. Clarity beats decoration." },
      { id: "m8q2", q: "The 'definition of done' for this mission is…", options: ["Whenever you feel tired", "The 20-point rubric, ticked row by row", "When GitHub sends you an email", "When you have 100 commits"], answer: 1, why: "A visible checklist removes the guesswork and the anxiety." },
      { id: "m8q3", q: "Which sequence shows the full GitHub loop you learned?", options: ["Edit main → delete repo → start again", "Branch → edit → commit → pull request → review → merge", "Fork → star → watch → follow", "Upload → rename → hide"], answer: 1, why: "That loop is the entire professional workflow, minus the terminal." },
      { id: "m8q4", q: "A reviewer suggests a change after you merged your PR. What do you do?", options: ["Ignore it — it's already merged", "Make a new branch, apply the change, open a new PR, merge it", "Delete the repo and rebuild", "Reply 'works on my machine'"], answer: 1, why: "Software (and documents) are never finished. The loop just runs again, smaller." },
    ],
  },
];

/* ── 4. GUILD (TEAM) CHALLENGES ──────────────────────────────────────────── */

export const guildQuests = [
  {
    key: "merge-relay",
    title: "The Merge Relay",
    emoji: "🏃",
    time: "25 minutes",
    people: "4–6 per guild",
    brief: "One shared repo. Player 1 creates a branch and adds one line to a story. They open a PR. Player 2 reviews and merges it, then starts the next branch. The story must survive six hands without touching main directly.",
    win: "Longest coherent story with zero direct edits to main and zero unresolved conflicts.",
    skills: "Branches · Pull requests · Reviews · Merging",
  },
  {
    key: "recipe-wars",
    title: "The Great Recipe Repo Race",
    emoji: "🍲",
    time: "30 minutes",
    people: "Pairs",
    brief: "Each pair builds a private repo containing 5 recipes in Markdown, one folder per course (starters/, mains/, desserts/), an issues board for 'recipes we still need', and a README a hungry stranger could navigate.",
    win: "Judged on README clarity, folder tidiness, and the funniest well-labelled issue.",
    skills: "Repos · Folders · Markdown · Issues · Labels",
  },
  {
    key: "kindness-sprint-team",
    title: "Kindness Sprint (Guild Edition)",
    emoji: "💌",
    time: "20 minutes",
    people: "Whole class",
    brief: "Everyone finds a real open-source project and leaves one genuinely actionable comment or files one politely-worded typo issue. Collect the links on a shared board.",
    win: "Most replies from real maintainers within a week. Screenshots on the launch wall.",
    skills: "Exploring · Etiquette · Issues · Real-world communication",
  },
  {
    key: "time-capsule",
    title: "The Time Capsule",
    emoji: "⏳",
    time: "15 minutes",
    people: "Solo or pairs",
    brief: "Write a note to yourself six months from now, commit it, then deliberately rewrite it badly and restore the original from history. Screenshot the two diffs.",
    win: "Best 'before and after' screenshot pair.",
    skills: "Commits · Messages · History · Rewinding",
  },
  {
    key: "wiki-race",
    title: "Octoverse Wiki Race",
    emoji: "🗺️",
    time: "10 minutes",
    people: "Whole class",
    brief: "Start at github.com/explore. You may only travel by clicking links inside pages. First person to reach a repo with exactly 1 star wins. Everyone must shout out each jump.",
    win: "Fastest route — and a class that no longer fears the Explore page.",
    skills: "Navigation · Search · Explore",
  },
];

/* ── 5. RUBRIC ───────────────────────────────────────────────────────────── */

export const rubric = [
  {
    key: "base-camp",
    criterion: "Base Camp",
    weight: 4,
    question: "Does the repo exist, is it public, and is it named and described clearly?",
    levels: {
      1: "Private or missing a description.",
      2: "Public with a name but no description.",
      3: "Public, named, described.",
      4: "Public, named, described, and pinned to the profile.",
    },
  },
  {
    key: "storyteller",
    criterion: "Storyteller README",
    weight: 4,
    question: "Could a stranger understand the project in under a minute?",
    levels: {
      1: "Blank or one line.",
      2: "A heading and a sentence.",
      3: "Heading, description, bullet list of contents, and an image.",
      4: "All of level 3 plus 'how I built this' and a way to contact you.",
    },
  },
  {
    key: "time-travel",
    criterion: "Time Travel",
    weight: 4,
    question: "Is there a readable history of meaningful commits?",
    levels: {
      1: "One commit ('Initial commit').",
      2: "2–3 commits with vague messages.",
      3: "4+ commits with descriptive messages.",
      4: "Descriptive messages that read like a story of the project.",
    },
  },
  {
    key: "collaboration",
    criterion: "Collaboration",
    weight: 4,
    question: "Did branches, pull requests, and issues get used properly?",
    levels: {
      1: "Everything committed straight to main, no issues.",
      2: "One branch or one issue, used loosely.",
      3: "One merged PR with a description + two issues, one closed.",
      4: "Level 3 plus a peer review comment that led to a second merged PR.",
    },
  },
  {
    key: "explorer",
    criterion: "Explorer Bonus",
    weight: 4,
    question: "Did you go one step further into the wild?",
    levels: {
      1: "No extras.",
      2: "A licence added.",
      3: "Licence + one fork or three stars, and a real-life private repo.",
      4: "Licence + GitHub Pages live site, or a merged PR on someone else's project.",
    },
  },
];

export const gradingBands = [
  { band: "18–20", label: "Octoverse Legend", note: "Ship it publicly. Put it in your bio. You're ready for a real team repo." },
  { band: "14–17", label: "Merge Wizard", note: "Excellent. Pick the one weak rubric row and raise it by a level." },
  { band: "10–13", label: "Pass — Branch Ranger", note: "You've got the loop. Re-run Module 5 and add a peer review." },
  { band: "0–9", label: "Not yet — keep playing", note: "Nothing is broken. Re-do Missions 2, 3, and 5 with the checklist open beside you." },
];

/* ── 6. GLOSSARY / JARGON DECODER ────────────────────────────────────────── */

export const glossary = [
  { term: "Repo (repository)", say: "A project's home box: files, folders, and every past version." },
  { term: "Commit", say: "A save point with a note attached." },
  { term: "Branch", say: "A safe scratch copy where experiments happen." },
  { term: "main", say: "The official copy everyone sees." },
  { term: "Pull request (PR)", say: "A polite proposal to merge a branch, with a conversation." },
  { term: "Merge", say: "Accepting the proposal — the branch joins main." },
  { term: "Merge conflict", say: "Two people changed the same line; a human must choose." },
  { term: "Issue", say: "A to-do note on the project board, with its own thread." },
  { term: "Label", say: "A coloured tag that sorts issues (bug, enhancement, question)." },
  { term: "Assignee", say: "Whose job it is." },
  { term: "README.md", say: "The front door of a repo." },
  { term: "Markdown", say: "Plain text with a few magic symbols for formatting." },
  { term: "Fork", say: "Your own copy of someone else's repo." },
  { term: "Star", say: "A bookmark plus a round of applause." },
  { term: "Clone", say: "Downloading a repo to your computer. Not needed in this course." },
  { term: "Push / Pull", say: "Sending changes up / fetching changes down. GitHub's buttons do this for you." },
  { term: "Diff", say: "The green-and-red view of what changed." },
  { term: "Collaborator", say: "Someone you gave a key to your repo." },
  { term: "Licence", say: "The permission slip for reusing your work." },
  { term: "HEAD / origin / upstream / stash / rebase", say: "Terminal-era vocabulary. Deliberately NOT in this course. Come back in a month." },
];

/* ── 7. TOOLS & RESOURCES ────────────────────────────────────────────────── */

export const resources = {
  essential: [
    { name: "The ➕ New menu", what: "Creates repos, gists, and organisations. Top-right, always there." },
    { name: "Add file → Upload / Create", what: "The two buttons you'll use a hundred times." },
    { name: "The pencil icon", what: "Edit any file in your browser." },
    { name: "The '.' keyboard shortcut", what: "Opens github.dev — a full editor in your browser tab." },
    { name: "The branch dropdown", what: "Create and switch parallel universes." },
    { name: "Pull requests tab", what: "Propose, review, and merge changes." },
    { name: "Issues tab", what: "Your project's to-do board." },
    { name: "The commits counter / clock icon", what: "Your time machine." },
    { name: "Settings → Collaborators", what: "Give people keys to your repo." },
    { name: "Your stars list", what: "Your saved treasures, under your avatar menu." },
  ],
  optional: [
    { name: "GitHub Desktop", when: "Later, if you want to work offline with a friendly app instead of the terminal." },
    { name: "github.dev + VS Code for the Web", when: "When your projects grow past a handful of files." },
    { name: "GitHub Pages", when: "You want a free website built straight from a repo." },
    { name: "GitHub Mobile", when: "You want to read notifications and review PRs on the bus." },
    { name: "Gists", when: "You want to share one file instead of a whole project." },
    { name: "GitHub Actions", when: "You want things to happen automatically. A whole course of its own." },
    { name: "Codespaces", when: "You want a full cloud computer inside your repo." },
    { name: "Copilot", when: "You're writing actual code and want an AI pair programmer." },
  ],
  links: [
    { name: "github.com — create your account", url: "https://github.com/join", note: "Module 1, minute one." },
    { name: "GitHub Explore", url: "https://github.com/explore", note: "Module 7 treasure map." },
    { name: "GitHub Trending", url: "https://github.com/trending", note: "What the world is building this week." },
    { name: "Markdown cheat sheet (GitHub's own)", url: "https://docs.github.com/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax", note: "Keep open in a tab during Modules 2 and 8." },
    { name: "GitHub Skills", url: "https://skills.github.com", note: "Official guided, bot-driven practice repos. Perfect after this course." },
    { name: "GitHub Docs", url: "https://docs.github.com", note: "The manual. Search it, don't read it end to end." },
    { name: "Choose a License", url: "https://choosealicense.com", note: "Plain-English licence picker for Module 7 and the Boss Mission." },
    { name: "first-contributions", url: "https://github.com/firstcontributions/first-contributions", note: "The classic gentle first pull request on a real project." },
  ],
  nextSteps: [
    "Take GitHub Skills' 'Introduction to GitHub' bot-guided repo — it practises everything you just learned.",
    "Move your CV, class notes, or a club handbook onto GitHub and keep them there for a month.",
    "Learn three terminal commands (git status, git add, git commit) only when you actually need to work offline.",
    "Join one open-source project's Discussions and lurk for two weeks before posting.",
    "Try GitHub Pages to publish your Passport as a live website.",
    "Come back and teach Module 1 to someone else. It is the fastest way to make it permanent.",
  ],
};

/* ── 8. SCHEDULE / TIMINGS ───────────────────────────────────────────────── */

export const schedule = [
  { slot: "0:00 – 0:10", what: "Welcome, the Octoverse story, how XP works", who: "Instructor" },
  { slot: "0:10 – 0:55", what: "Module 1 · Spawn Point (account + profile README)", who: "Learner, hands-on" },
  { slot: "0:55 – 1:45", what: "Module 2 · Base Camp (first repo, files, README)", who: "Learner, hands-on" },
  { slot: "1:45 – 1:55", what: "Break · Guild Quest: Octoverse Wiki Race", who: "Everyone" },
  { slot: "1:55 – 2:40", what: "Module 3 · Time Machine (commits, history, Phoenix Feather)", who: "Learner, hands-on" },
  { slot: "2:40 – 3:30", what: "Module 4 · Parallel Universes (branches)", who: "Learner, pairs" },
  { slot: "— session break —", what: "Halfway point: everyone should hold Level 4 and 4 badges", who: "" },
  { slot: "3:30 – 4:25", what: "Module 5 · The Handshake (PRs, merge, conflict lab)", who: "Learner, pairs" },
  { slot: "4:25 – 5:10", what: "Module 6 · Village Square (issues, labels, collaborators)", who: "Learner, pairs" },
  { slot: "5:10 – 5:55", what: "Module 7 · Treasure Hunt (explore, star, fork, licence)", who: "Learner, timed browsing" },
  { slot: "5:55 – 7:10", what: "Module 8 · Boss Mission + peer review + launch wall", who: "Learner, then pairs" },
];

export const totalMinutes = modules.reduce((sum, m) => sum + m.minutes, 0);
export const totalXpAvailable =
  modules.reduce(
    (sum, m) =>
      sum +
      m.concepts.length * xp.lesson +
      m.activities.length * xp.activity +
      m.mission.items.length * xp.missionItem +
      xp.missionBonus +
      xp.quizPass,
    0,
  ) + xp.boss + xp.phoenix;
