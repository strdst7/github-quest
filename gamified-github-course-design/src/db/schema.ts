import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * A learner is a "player" in the Octoverse. No auth: the first visit creates a
 * player row and its id is remembered in a cookie.
 */
export const learners = pgTable("learners", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull().default("Rookie Explorer"),
  githubHandle: text("github_handle"),
  guild: text("guild"),
  xp: integer("xp").notNull().default(0),
  phoenixFeathers: integer("phoenix_feathers").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

/** One row per completed lesson / activity / mission step. */
export const stepProgress = pgTable(
  "step_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    learnerId: uuid("learner_id")
      .notNull()
      .references(() => learners.id, { onDelete: "cascade" }),
    stepKey: text("step_key").notNull(),
    kind: text("kind").notNull().default("lesson"),
    xp: integer("xp").notNull().default(0),
    completedAt: timestamp("completed_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique("uq_learner_step").on(t.learnerId, t.stepKey)],
);

/** Badges / achievements unlocked by a learner. */
export const badges = pgTable(
  "badges",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    learnerId: uuid("learner_id")
      .notNull()
      .references(() => learners.id, { onDelete: "cascade" }),
    badgeKey: text("badge_key").notNull(),
    earnedAt: timestamp("earned_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (t) => [unique("uq_learner_badge").on(t.learnerId, t.badgeKey)],
);

/** Quiz attempts (best score per module is kept here as history). */
export const quizAttempts = pgTable("quiz_attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  learnerId: uuid("learner_id")
    .notNull()
    .references(() => learners.id, { onDelete: "cascade" }),
  moduleKey: text("module_key").notNull(),
  score: integer("score").notNull().default(0),
  total: integer("total").notNull().default(0),
  answers: jsonb("answers").$type<Record<string, number>>().notNull().default({}),
  passed: boolean("passed").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

/** The final boss deliverable + rubric self-assessment. */
export const finalProjects = pgTable("final_projects", {
  id: uuid("id").primaryKey().defaultRandom(),
  learnerId: uuid("learner_id")
    .notNull()
    .unique()
    .references(() => learners.id, { onDelete: "cascade" }),
  projectTitle: text("project_title").notNull().default("My Octoverse Passport"),
  repoUrl: text("repo_url"),
  highlights: text("highlights"),
  rubric: jsonb("rubric").$type<Record<string, number>>().notNull().default({}),
  selfScore: integer("self_score").notNull().default(0),
  submitted: boolean("submitted").notNull().default(false),
  submittedAt: timestamp("submitted_at", { withTimezone: true }),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Learner = typeof learners.$inferSelect;
export type StepProgressRow = typeof stepProgress.$inferSelect;
export type BadgeRow = typeof badges.$inferSelect;
export type QuizAttemptRow = typeof quizAttempts.$inferSelect;
export type FinalProjectRow = typeof finalProjects.$inferSelect;
