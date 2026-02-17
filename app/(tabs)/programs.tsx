import React from "react";
import { View, ScrollView } from "react-native";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Card } from "../../src/components/ui/Card";
import { Typography } from "../../src/components/ui/Typography";
import { Button } from "../../src/components/ui/Button";
import { theme } from "../../src/theme";
import { useRouter } from "expo-router";

export default function Programs() {
  const programs = useQuery(api.programs.list);
  const router = useRouter();

  if (!programs) return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Typography>Loading programs...</Typography>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ padding: theme.spacing.md }}>
      <Typography variant="h1" style={{ marginBottom: theme.spacing.md }}>Programs</Typography>
      {programs.length === 0 ? (
        <Typography>No programs available yet.</Typography>
      ) : (
        programs.map((program: any) => (
          <Card key={program._id}>
            <Typography variant="h3">{program.title}</Typography>
            <Typography variant="body" style={{ marginVertical: 8 }}>{program.description}</Typography>
            <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
              <Typography variant="caption">{program.habits.length} habits defined</Typography>
              <Button
                title="Start Cohort"
                size="sm"
                onPress={() => router.push({ pathname: "/create-cohort", params: { programId: program._id } })}
              />
            </View>
          </Card>
        ))
      )}
      <Button
        title="Create New Program"
        variant="secondary"
        onPress={() => router.push("/create-program")}
        style={{ marginTop: 24 }}
      />
    </ScrollView>
  );
}
