import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const create = mutation({
  args: {
    programId: v.id("programs"),
    creatorId: v.id("users"),
    name: v.string(),
    startDate: v.string(),
    endDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const inviteCode = Math.random().toString(36).substring(7).toUpperCase();
    const cohortId = await ctx.db.insert("cohorts", {
      ...args,
      inviteCode,
      createdAt: Date.now(),
    });
    return cohortId;
  },
});

export const getUserCohorts = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const memberships = await ctx.db
      .query("cohort_members")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const cohorts = await Promise.all(
      memberships.map(async (m) => {
        const cohort = await ctx.db.get(m.cohortId);
        return {
          ...cohort,
          membership: m,
        };
      })
    );

    return cohorts.filter((c) => c !== null);
  },
});

export const join = mutation({
  args: {
    cohortId: v.id("cohorts"),
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Check if already joined
    const existingMember = await ctx.db
      .query("cohort_members")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .filter((q) => q.eq(q.field("cohortId"), args.cohortId))
      .unique();

    if (existingMember) {
      throw new Error("Already a member of this cohort");
    }

    // Fetch cohort details
    const cohort = await ctx.db.get(args.cohortId);
    if (!cohort) throw new Error("Cohort not found");

    const program = await ctx.db.get(cohort.programId);
    if (!program) throw new Error("Program not found");

    // Add to cohort members
    await ctx.db.insert("cohort_members", {
      cohortId: args.cohortId,
      userId: args.userId,
      role: "member",
      totalXp: 0,
      joinedAt: Date.now(),
    });

    // Add cohort habits to user's habit list
    for (const habitDef of program.habits) {
      await ctx.db.insert("habits", {
        userId: args.userId,
        title: habitDef.title,
        description: habitDef.description,
        type: "cohort",
        programId: program._id,
        cohortId: cohort._id,
        frequency: habitDef.frequency,
        xpReward: habitDef.xpReward,
        penalty: habitDef.penalty,
        archived: false,
        createdAt: Date.now(),
      });
    }

    return args.cohortId;
  },
});

export const getByProgram = query({
  args: { programId: v.id("programs") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cohorts")
      .withIndex("by_program", (q) => q.eq("programId", args.programId))
      .collect();
  },
});
