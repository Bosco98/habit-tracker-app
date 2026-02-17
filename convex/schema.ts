import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    avatarUrl: v.optional(v.string()),
    createdAt: v.number(),
  }).index("by_clerk_id", ["clerkId"]),

  habits: defineTable({
    userId: v.string(), // Links to users table ID (not Clerk ID)
    title: v.string(),
    description: v.optional(v.string()),
    type: v.string(), // 'personal' | 'cohort'
    programId: v.optional(v.id("programs")),
    cohortId: v.optional(v.id("cohorts")),
    frequency: v.array(v.string()), // ['Mon', 'Tue', ...] or ['daily']
    xpReward: v.number(),
    penalty: v.number(),
    archived: v.boolean(),
    createdAt: v.number(),
  })
  .index("by_user", ["userId"])
  .index("by_cohort", ["cohortId"]),

  habit_logs: defineTable({
    habitId: v.id("habits"),
    userId: v.id("users"),
    date: v.string(), // YYYY-MM-DD
    status: v.string(), // 'completed' | 'missed' | 'skipped'
    xpEarned: v.number(),
    createdAt: v.number(),
  })
  .index("by_user_date", ["userId", "date"])
  .index("by_habit", ["habitId"]),

  programs: defineTable({
    creatorId: v.id("users"),
    title: v.string(),
    description: v.string(),
    category: v.string(),
    habits: v.array(
      v.object({
        title: v.string(),
        description: v.optional(v.string()),
        frequency: v.array(v.string()),
        xpReward: v.number(),
        penalty: v.number(),
      })
    ),
    isPublic: v.boolean(),
    createdAt: v.number(),
  }),

  cohorts: defineTable({
    programId: v.id("programs"),
    creatorId: v.id("users"),
    name: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
    inviteCode: v.string(),
    createdAt: v.number(),
  })
  .index("by_program", ["programId"]),

  cohort_members: defineTable({
    cohortId: v.id("cohorts"),
    userId: v.id("users"),
    role: v.string(), // 'member' | 'admin'
    totalXp: v.number(),
    joinedAt: v.number(),
  })
  .index("by_user", ["userId"])
  .index("by_cohort", ["cohortId"]),

  activity_logs: defineTable({
    cohortId: v.id("cohorts"),
    userId: v.id("users"),
    type: v.string(), // 'habit_completion' | 'badge' | 'message' | 'penalty_proposal'
    content: v.string(),
    data: v.optional(v.any()), // Extra data like badge info
    createdAt: v.number(),
  })
  .index("by_cohort", ["cohortId"]),

  votes: defineTable({
    activityId: v.id("activity_logs"),
    userId: v.id("users"),
    vote: v.string(), // 'approve' | 'reject'
  }).index("by_activity", ["activityId"]),
});
