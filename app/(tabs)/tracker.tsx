import React, { useState, useMemo } from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCurrentUser } from "../../src/hooks/useCurrentUser";
import { theme } from "../../src/theme";
import { Typography } from "../../src/components/ui/Typography";
import { MonthlyLog } from "../../src/components/tracker/MonthlyLog";
import { Charts } from "../../src/components/tracker/Charts";
import { StatsCards } from "../../src/components/tracker/StatsCards";
import { Settings, Share2, Plus } from "lucide-react-native";
import { format, startOfMonth, endOfMonth } from "date-fns";
import { useRouter } from "expo-router";

export default function Tracker() {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState(new Date());
  const user = useCurrentUser();
  const userId = user?._id;

  const startDate = format(startOfMonth(currentDate), "yyyy-MM-dd");
  const endDate = format(endOfMonth(currentDate), "yyyy-MM-dd");

  const habits = useQuery(api.habits.getByUser, userId ? { userId } : "skip");
  const logs = useQuery(api.habits.getLogsRange, userId ? { userId, startDate, endDate } : "skip");
  const logMutation = useMutation(api.habits.log);

  const onToggle = async (habitId: string, date: Date) => {
    if (!userId) return;
    const dateStr = format(date, "yyyy-MM-dd");
    const existingLog = logs?.find((l: any) => l.habitId === habitId && l.date === dateStr);
    const currentStatus = existingLog?.status;
    const habit = habits?.find((h: any) => h._id === habitId);

    // Toggle logic: undefined -> completed -> missed -> undefined (or similar cycle)
    // Simple toggle: completed <-> undefined/missed
    const newStatus = currentStatus === "completed" ? "missed" : "completed";
    const xpReward = habit?.xpReward || 0;
    const xpEarned = newStatus === "completed" ? xpReward : 0;

    await logMutation({
      habitId: habitId as any,
      userId,
      date: dateStr,
      status: newStatus,
      xpEarned,
    });
  };

  const onClearMonth = () => {
    // Implement bulk delete or just warn user
    console.log("Clear month triggered");
  };

  // --- Derived Statistics ---
  const stats = useMemo(() => {
    if (!habits || !logs) return {
        topPerformer: { title: "Drink Water" },
        monthGoal: { current: 45, target: 420 },
        xpTrend: [],
        consistency: []
    };

    // 1. Top Performer (Habit with most completions this month)
    const habitCounts: Record<string, number> = {};
    logs.forEach((l: any) => {
      if (l.status === 'completed') {
        habitCounts[l.habitId] = (habitCounts[l.habitId] || 0) + 1;
      }
    });

    let topHabitId = null;
    let maxCount = -1;
    for (const [id, count] of Object.entries(habitCounts)) {
        if (count > maxCount) {
            maxCount = count;
            topHabitId = id;
        }
    }
    const topHabit = habits.find((h: any) => h._id === topHabitId);

    // 2. Month's Goal (Total XP vs Target)
    // Simplified target: sum of all possible daily XP for all habits
    const totalXpEarned = logs.reduce((acc: number, l: any) => acc + (l.xpEarned || 0), 0);
    // Rough estimate target: just hardcode or calculate roughly
    const targetXp = 1000;

    // 3. XP Trend (Daily XP sums)
    // Group logs by date
    const xpByDate: Record<string, number> = {};
    logs.forEach((l: any) => {
        xpByDate[l.date] = (xpByDate[l.date] || 0) + (l.xpEarned || 0);
    });
    // Create trend data point
    const daysInMonth = parseInt(format(endOfMonth(currentDate), 'd'));
    const xpTrend = Array.from({length: daysInMonth}, (_, i) => {
        const d = i + 1;
        const dateStr = format(new Date(currentDate.getFullYear(), currentDate.getMonth(), d), 'yyyy-MM-dd');
        return {
            value: xpByDate[dateStr] || 0,
            label: (d % 7 === 1) ? `${d}` : '' // Label every week roughly
        };
    });

    // 4. Consistency Bars (Completion rate per habit)
    const consistency = habits.map((h: any) => {
        const count = habitCounts[h._id] || 0;
        // Assuming daily habit for simplicity of calculation
        const rate = Math.round((count / daysInMonth) * 100);
        return {
            value: rate,
            label: h.title.substring(0, 3), // Short label
            frontColor: '#A3E635' // Default color
        };
    });

    return {
        topPerformer: { title: topHabit?.title || "None" },
        monthGoal: { current: totalXpEarned, target: targetXp },
        xpTrend,
        consistency
    };
  }, [habits, logs, currentDate]);


  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Typography variant="h1">Habit Tracker</Typography>
        <View style={styles.headerIcons}>
          <Pressable style={styles.iconButton} onPress={() => {}}>
            <Settings size={24} color="#000" />
          </Pressable>
          <Pressable style={[styles.iconButton, { backgroundColor: '#C084FC' }]} onPress={() => {}}>
            <Share2 size={24} color="#000" />
          </Pressable>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <StatsCards
            topPerformer={stats.topPerformer}
            monthGoal={stats.monthGoal}
        />

        {/* Monthly Log */}
        {habits && logs && (
            <MonthlyLog
                habits={habits}
                logs={logs}
                currentDate={currentDate}
                onToggle={onToggle}
                onClear={onClearMonth}
            />
        )}

        {/* Charts */}
        <Charts
            xpTrendData={stats.xpTrend}
            consistencyData={stats.consistency}
        />

        <View style={{ height: 80 }} />
      </ScrollView>

      {/* FAB */}
      <Pressable
        style={styles.fab}
        onPress={() => router.push("/create-program")} // Reusing create program or habit flow
      >
        <Plus size={32} color="#FFF" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFCE8', // Cream/Beige background from design
    paddingTop: 50, // Safe area
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  headerIcons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: theme.colors.border,
    backgroundColor: '#FDE047', // Yellow-300
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: theme.shadows.default.shadowColor,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  scrollContent: {
    padding: theme.spacing.md,
  },
  fab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  }
});
