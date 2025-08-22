import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const assessments = pgTable("assessments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  skills: jsonb("skills").$type<Record<string, number>>().notNull(),
  interests: jsonb("interests").$type<string[]>().notNull(),
  careerGoals: text("career_goals").notNull(),
  educationLevel: text("education_level").notNull(),
  fieldOfStudy: text("field_of_study"),
  learningStyle: text("learning_style").notNull(),
  workEnvironment: text("work_environment"),
  salaryExpectations: text("salary_expectations"),
  workLifeBalance: text("work_life_balance"),
  geographicPreference: text("geographic_preference"),
  previousExperience: text("previous_experience"),
  careerChangeReason: text("career_change_reason"),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const recommendations = pgTable("recommendations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  assessmentId: varchar("assessment_id").notNull(),
  careerPaths: jsonb("career_paths").$type<any[]>().notNull(),
  courses: jsonb("courses").$type<any[]>().notNull(),
  internships: jsonb("internships").$type<any[]>().notNull(),
  skillsGap: jsonb("skills_gap").$type<any>().notNull(),
  generatedAt: timestamp("generated_at").defaultNow(),
});

export const userProgress = pgTable("user_progress", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id"),
  completedCourses: jsonb("completed_courses").$type<string[]>().default([]),
  achievements: jsonb("achievements").$type<string[]>().default([]),
  milestones: jsonb("milestones").$type<Record<string, boolean>>().default({}),
  progressPercentage: integer("progress_percentage").default(0),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertAssessmentSchema = createInsertSchema(assessments).omit({
  id: true,
  completedAt: true,
});

export const insertRecommendationSchema = createInsertSchema(recommendations).omit({
  id: true,
  generatedAt: true,
});

export const insertUserProgressSchema = createInsertSchema(userProgress).omit({
  id: true,
  updatedAt: true,
});

export type InsertAssessment = z.infer<typeof insertAssessmentSchema>;
export type Assessment = typeof assessments.$inferSelect;
export type InsertRecommendation = z.infer<typeof insertRecommendationSchema>;
export type Recommendation = typeof recommendations.$inferSelect;
export type InsertUserProgress = z.infer<typeof insertUserProgressSchema>;
export type UserProgress = typeof userProgress.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});
