import React from "react";
import { View, ScrollView } from "react-native";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useCurrentUser } from "../../src/hooks/useCurrentUser";
import { Card } from "../../src/components/ui/Card";
import { Typography } from "../../src/components/ui/Typography";
import { Button } from "../../src/components/ui/Button";
import { theme } from "../../src/theme";
import { useRouter } from "expo-router";

export default function Cohorts() {
  const user = useCurrentUser();
  const cohorts = useQuery(api.cohorts.getUserCohorts, user ? { userId: user._id } : "skip");
  const router = useRouter();

  if (!cohorts) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Typography>Loading cohorts...</Typography>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ padding: theme.spacing.md }}>
      <Typography variant="h1" style={{ marginBottom: theme.spacing.md }}>My Cohorts</Typography>

      {cohorts.length === 0 ? (
        <Typography>You haven't joined any cohorts yet.</Typography>
      ) : (
        cohorts.map((cohort: any) => (
          <Card key={cohort._id} onPress={() => router.push({ pathname: "/cohort-details", params: { cohortId: cohort._id } })}>
            <Typography variant="h3">{cohort.name}</Typography>
            <Typography variant="caption">Started: {cohort.startDate}</Typography>
            <Typography variant="body" style={{ marginTop: 8 }}>
              XP: {cohort.membership.totalXp}
            </Typography>
          </Card>
        ))
      )}

      <Button
        title="Find Programs"
        onPress={() => router.push("/(tabs)/programs")}
        style={{ marginTop: 24 }}
      />
    </ScrollView>
  );
}
