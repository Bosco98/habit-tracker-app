import React, { useState } from "react";
import { View, Pressable, ScrollView } from "react-native";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCurrentUser } from "../../src/hooks/useCurrentUser";
import { theme } from "../../src/theme";
import { Card } from "../../src/components/ui/Card";
import { Typography } from "../../src/components/ui/Typography";
import { Button } from "../../src/components/ui/Button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react-native";
import { format, addDays, subDays } from "date-fns";

export default function Tracker() {
  const [date, setDate] = useState(new Date());
  const user = useCurrentUser();
  const userId = user?._id;

  // Use 'skip' if userId is not yet available
  const habits = useQuery(api.habits.getByUser, userId ? { userId } : "skip");
  const logs = useQuery(api.habits.getLogs, userId ? { userId, date: format(date, "yyyy-MM-dd") } : "skip");
  const logMutation = useMutation(api.habits.log);

  // Group logs by habitId
  const logsMap = logs?.reduce((acc: any, log: any) => {
    acc[log.habitId] = log;
    return acc;
  }, {} as Record<string, any>) || {};

  const onToggle = async (habitId: string, currentStatus: string | undefined, xpReward: number) => {
    if (!userId) return;
    const newStatus = currentStatus === "completed" ? "missed" : "completed";
    const xpEarned = newStatus === "completed" ? xpReward : 0; // Simplified
    await logMutation({
      habitId,
      userId,
      date: format(date, "yyyy-MM-dd"),
      status: newStatus,
      xpEarned,
    });
  };

  const dayOfWeek = format(date, "EEE");

  // Filter habits by frequency
  const todaysHabits = habits?.filter((h: any) =>
    h.frequency.includes(dayOfWeek) || h.frequency.includes("Daily") || h.frequency.includes("daily")
  );

  return (
    <View style={{ flex: 1, padding: theme.spacing.md, backgroundColor: theme.colors.background }}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: theme.spacing.md }}>
        <Button
          variant="ghost"
          onPress={() => setDate(subDays(date, 1))}
          title="<"
          style={{ paddingHorizontal: 16 }}
        />
        <Typography variant="h2">{format(date, "MMM dd, yyyy")}</Typography>
        <Button
          variant="ghost"
          onPress={() => setDate(addDays(date, 1))}
          title=">"
          style={{ paddingHorizontal: 16 }}
        />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {!habits ? (
           <Typography style={{ textAlign: "center", marginTop: 20 }}>Loading habits...</Typography>
        ) : todaysHabits?.length === 0 ? (
          <Typography style={{ textAlign: "center", marginTop: 20, color: theme.colors.text }}>No habits for {dayOfWeek}.</Typography>
        ) : (
          todaysHabits?.map((habit: any) => {
            const log = logsMap[habit._id];
            const isCompleted = log?.status === "completed";

            return (
              <Card key={habit._id} style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <View style={{ flex: 1 }}>
                  <Typography variant="h3">{habit.title}</Typography>
                  <Typography variant="caption" style={{ color: theme.colors.text, opacity: 0.7 }}>
                    {habit.type === "cohort" ? "Cohort Habit" : "Personal Habit"} • {habit.xpReward} XP
                  </Typography>
                </View>
                <Pressable
                  onPress={() => onToggle(habit._id, log?.status, habit.xpReward)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: theme.borderRadius.full,
                    borderWidth: 2,
                    borderColor: theme.colors.border,
                    backgroundColor: isCompleted ? theme.colors.success : theme.colors.surface,
                    justifyContent: "center",
                    alignItems: "center",
                    shadowColor: theme.shadows.default.shadowColor,
                    shadowOffset: { width: 2, height: 2 },
                    shadowOpacity: 1,
                    shadowRadius: 0,
                  }}
                >
                  {isCompleted && <Check color="#fff" size={24} />}
                </Pressable>
              </Card>
            );
          })
        )}
      </ScrollView>

      {/* Quick Add Button or FAB could go here */}
    </View>
  );
}
