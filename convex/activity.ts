import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: { cohortId: v.id("cohorts") },
  handler: async (ctx, args) => {
    const logs = await ctx.db
      .query("activity_logs")
      .withIndex("by_cohort", (q) => q.eq("cohortId", args.cohortId))
      .order("desc")
      .take(50);

    // Enrich with votes if needed, but for MVP just return logs
    return logs;
  },
});

export const post = mutation({
  args: {
    cohortId: v.id("cohorts"),
    userId: v.id("users"),
    content: v.string(),
    type: v.string(), // 'message'
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("activity_logs", {
      ...args,
      createdAt: Date.now(),
    });
  },
});

export const proposePenalty = mutation({
  args: {
    cohortId: v.id("cohorts"),
    proposerId: v.id("users"),
    targetUserId: v.id("users"),
    reason: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("activity_logs", {
      cohortId: args.cohortId,
      userId: args.proposerId,
      type: "penalty_proposal",
      content: args.reason,
      data: { targetUserId: args.targetUserId, status: "pending", votes: { approve: 0, reject: 0 } },
      createdAt: Date.now(),
    });
  },
});

export const vote = mutation({
  args: {
    activityId: v.id("activity_logs"),
    userId: v.id("users"),
    vote: v.string(), // 'approve' | 'reject'
  },
  handler: async (ctx, args) => {
    const existingVote = await ctx.db
      .query("votes")
      .withIndex("by_activity", (q) => q.eq("activityId", args.activityId))
      .filter((q) => q.eq(q.field("userId"), args.userId))
      .unique();

    if (existingVote) throw new Error("Already voted");

    await ctx.db.insert("votes", {
      activityId: args.activityId,
      userId: args.userId,
      vote: args.vote,
    });

    // Update activity log data (simplified, normally use internal mutation or helper)
    const activity = await ctx.db.get(args.activityId);
    if (!activity) return;

    const currentVotes = activity.data.votes || { approve: 0, reject: 0 };
    if (args.vote === "approve") currentVotes.approve++;
    else currentVotes.reject++;

    await ctx.db.patch(args.activityId, {
      data: { ...activity.data, votes: currentVotes },
    });
  },
});
