import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Typography } from "../ui/Typography";
import { theme } from "../../theme";
import { BarChart, LineChart } from "react-native-gifted-charts";

interface ChartsProps {
  xpTrendData: { value: number; label: string }[];
  consistencyData: { value: number; label: string; frontColor?: string }[];
}

export const Charts: React.FC<ChartsProps> = ({ xpTrendData, consistencyData }) => {
  const screenWidth = Dimensions.get("window").width;

  const lineData = xpTrendData.length > 0 ? xpTrendData : [{ value: 0, label: 'No Data' }];
  const barData = consistencyData.length > 0 ? consistencyData : [{ value: 0, label: 'No Data' }];

  return (
    <View>
      <View style={styles.card}>
        <View style={styles.header}>
          <Typography variant="h3">Daily XP Trend</Typography>
        </View>
        <View style={styles.chartWrapper}>
          <LineChart
            data={lineData}
            width={screenWidth - 80}
            height={200}
            spacing={40}
            color={theme.colors.primary}
            thickness={3}
            dataPointsColor={theme.colors.primary}
            yAxisThickness={0}
            xAxisThickness={1}
            xAxisColor={theme.colors.border}
            yAxisTextStyle={{ color: theme.colors.text }}
            initialSpacing={20}
          />
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.header}>
          <Typography variant="h3">Consistency Bars</Typography>
        </View>
        <View style={styles.chartWrapper}>
          <BarChart
            data={barData}
            width={screenWidth - 80}
            height={200}
            barWidth={30}
            spacing={20}
            roundedTop
            roundedBottom
            xAxisThickness={1}
            yAxisThickness={0}
            xAxisColor={theme.colors.border}
            yAxisTextStyle={{ color: theme.colors.text }}
            frontColor={theme.colors.success}
            noOfSections={4}
            maxValue={100}
          />
        </View>
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
    padding: theme.spacing.md,
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.border,
  },
  chartWrapper: {
    padding: 20,
    alignItems: 'center',
  },
});
