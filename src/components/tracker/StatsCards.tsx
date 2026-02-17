import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Typography } from "../ui/Typography";
import { theme } from "../../theme";
import { GlassWater } from "lucide-react-native";

interface StatsCardsProps {
  topPerformer: { title: string; icon?: string };
  monthGoal: { current: number; target: number };
}

export const StatsCards: React.FC<StatsCardsProps> = ({ topPerformer, monthGoal }) => {
  const screenWidth = Dimensions.get("window").width;
  const cardWidth = (screenWidth - theme.spacing.md * 3) / 2; // Half width minus padding

  const progressPercent = Math.min((monthGoal.current / monthGoal.target) * 100, 100);

  return (
    <View style={styles.container}>
      {/* Top Performer Card */}
      <View style={[styles.card, { width: cardWidth }]}>
        <Typography variant="caption" style={{ color: theme.colors.text + '80', marginBottom: 4, fontWeight: 'bold' }}>TOP PERFORMER</Typography>
        <Typography variant="h3" style={{ marginBottom: 16 }}>{topPerformer.title}</Typography>

        <View style={styles.iconContainer}>
           <GlassWater size={24} color="#000" />
        </View>
      </View>

      {/* Month's Goal Card */}
      <View style={[styles.card, { width: cardWidth }]}>
        <Typography variant="caption" style={{ color: theme.colors.text + '80', marginBottom: 4, fontWeight: 'bold' }}>MONTH'S GOAL</Typography>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginBottom: 16 }}>
            <Typography variant="h1" style={{ lineHeight: 32 }}>{monthGoal.current}</Typography>
            <Typography variant="caption" style={{ marginBottom: 6, marginLeft: 2, color: theme.colors.text + '80' }}>/{monthGoal.target}</Typography>
        </View>

        <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: theme.spacing.md,
  },
  card: {
    borderWidth: 3,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    backgroundColor: theme.colors.surface,
    padding: theme.spacing.md,
    shadowColor: theme.shadows.default.shadowColor,
    shadowOffset: theme.shadows.default.shadowOffset,
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 4,
    height: 140, // Fixed height for alignment
    justifyContent: 'space-between'
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20, // Circular
    backgroundColor: '#60A5FA', // Blue-400
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: theme.colors.border,
  },
  progressBarBackground: {
    height: 12,
    backgroundColor: '#E5E7EB',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#A3E635', // Lime-400
    borderRightWidth: 1,
    borderRightColor: theme.colors.border,
  },
});
