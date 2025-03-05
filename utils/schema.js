import { pgTable, serial, varchar, text, timestamp } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mock_interview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("json_mock_resp").notNull(),
  jobPosition: varchar("job_position", 255).notNull(),
  jobDesc: text("job_desc").notNull(),
  jobExperience: varchar("job_experience", 255).notNull(),
  createdBy: varchar("created_by", 255).notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).notNull(),
  mockId: varchar("mock_id", 255).notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: text("correctAns"),
  userAns: text("userAns"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});
