import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    userId: v.id("users"),
    title: v.string(),
    description: v.optional(v.string()),
    frequency: v.array(v.string()),
    xpReward: v.number(),
    penalty: v.number(),
  },
  handler: async (ctx, args) => {
    const habitId = await ctx.db.insert("habits", {
      ...args,
      type: "personal",
      archived: false,
      createdAt: Date.now(),
    });
    return habitId;
  },
});

export const getByUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("habits")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("archived"), false))
      .collect();
  },
});

export const log = mutation({
  args: {
    habitId: v.id("habits"),
    userId: v.id("users"),
    date: v.string(),
    status: v.string(),
    xpEarned: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if log already exists
    const existingLog = await ctx.db
      .query("habit_logs")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).eq("date", args.date)
      )
      .filter((q) => q.eq(q.field("habitId"), args.habitId))
      .unique();

    let xpDelta = args.xpEarned;
    if (existingLog) {
      xpDelta = args.xpEarned - existingLog.xpEarned;
      await ctx.db.patch(existingLog._id, {
        status: args.status,
        xpEarned: args.xpEarned,
      });
    } else {
      await ctx.db.insert("habit_logs", {
        habitId: args.habitId,
        userId: args.userId,
        date: args.date,
        status: args.status,
        xpEarned: args.xpEarned,
        createdAt: Date.now(),
      });
    }

    // Update cohort member XP if applicable
    if (xpDelta !== 0) {
      const habit = await ctx.db.get(args.habitId);
      if (habit && habit.type === "cohort" && habit.cohortId) {
        const member = await ctx.db
          .query("cohort_members")
          .withIndex("by_user", (q) => q.eq("userId", args.userId))
          .filter((q) => q.eq(q.field("cohortId"), habit.cohortId))
          .unique();

        if (member) {
          await ctx.db.patch(member._id, {
            totalXp: (member.totalXp || 0) + xpDelta,
          });
        }
      }
    }
  },
});

export const getLogs = query({
  args: { userId: v.id("users"), date: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("habit_logs")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId).eq("date", args.date)
      )
      .collect();
  },
});

export const getLogsRange = query({
  args: {
    userId: v.id("users"),
    startDate: v.string(),
    endDate: v.string()
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("habit_logs")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", args.userId)
      )
      .filter((q) =>
        q.gte(q.field("date"), args.startDate) &&
        q.lte(q.field("date"), args.endDate)
      )
      .collect();
  },
});
