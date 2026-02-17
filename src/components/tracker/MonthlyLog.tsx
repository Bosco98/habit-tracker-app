import React, { useRef } from "react";
import { View, StyleSheet, ScrollView, TouchableOpacity, Text } from "react-native";
import { Typography } from "../ui/Typography";
import { theme } from "../../theme";
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from "date-fns";
import { Check, X } from "lucide-react-native";

interface MonthlyLogProps {
  habits: any[];
  logs: any[];
  currentDate: Date;
  onToggle: (habitId: string, date: Date) => void;
  onClear: () => void;
}

export const MonthlyLog: React.FC<MonthlyLogProps> = ({
  habits,
  logs,
  currentDate,
  onToggle,
  onClear,
}) => {
  const startDate = startOfMonth(currentDate);
  const endDate = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const getLog = (habitId: string, date: Date) => {
    const dateStr = format(date, "yyyy-MM-dd");
    return logs.find((l) => l.habitId === habitId && l.date === dateStr);
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Typography variant="h3">Monthly Log</Typography>
        <TouchableOpacity style={styles.clearButton} onPress={onClear}>
          <Typography variant="caption" style={{ color: "#fff", fontWeight: "bold" }}>Clear All Logs</Typography>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        {/* Fixed Column: Habit Names */}
        <View style={styles.fixedColumn}>
          <View style={[styles.cell, styles.headerCell]}>
            <Typography variant="caption" style={{ fontWeight: 'bold', color: theme.colors.text }}>HABIT</Typography>
          </View>
          {habits.map((habit) => (
            <View key={habit._id} style={styles.cell}>
              <Typography variant="caption" numberOfLines={1} style={{ fontWeight: 'bold' }}>{habit.title}</Typography>
            </View>
          ))}
        </View>

        {/* Scrollable Columns: Days */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.row}>
              {days.map((day) => (
                <View key={day.toString()} style={[styles.cell, styles.headerCell, { width: 40 }]}>
                  <Typography variant="caption" style={{ fontWeight: 'bold', color: theme.colors.text }}>{format(day, "d")}</Typography>
                </View>
              ))}
            </View>
            {habits.map((habit) => (
              <View key={habit._id} style={styles.row}>
                {days.map((day) => {
                  const log = getLog(habit._id, day);
                  const isCompleted = log?.status === "completed";
                  const isMissed = log?.status === "missed";

                  return (
                    <TouchableOpacity
                      key={day.toString()}
                      onPress={() => onToggle(habit._id, day)}
                      style={[
                        styles.cell,
                        { width: 40 },
                        isCompleted && { backgroundColor: '#A3E635' }, // Lime green
                        isMissed && { backgroundColor: '#F472B6' }, // Pink/Red
                      ]}
                    >
                      {isCompleted && <Check size={16} color="#000" />}
                      {isMissed && <X size={16} color="#000" />}
                    </TouchableOpacity>
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 3,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
    overflow: 'hidden',
    shadowColor: theme.shadows.default.shadowColor,
    shadowOffset: theme.shadows.default.shadowOffset,
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing.md,
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.border,
  },
  clearButton: {
    backgroundColor: '#EF4444', // Red
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: theme.borderRadius.sm,
    borderWidth: 2,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 0,
  },
  fixedColumn: {
    width: 100,
    borderRightWidth: 3,
    borderRightColor: theme.colors.border,
    backgroundColor: theme.colors.surface,
    zIndex: 10,
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingHorizontal: 4,
  },
  headerCell: {
    backgroundColor: '#F3F4F6',
  },
});
