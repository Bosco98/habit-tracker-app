import React, { useState } from "react";
import { View, ScrollView, Alert } from "react-native";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useCurrentUser } from "../src/hooks/useCurrentUser";
import { Input } from "../src/components/ui/Input";
import { Button } from "../src/components/ui/Button";
import { Typography } from "../src/components/ui/Typography";
import { Card } from "../src/components/ui/Card";
import { theme } from "../src/theme";
import { useRouter } from "expo-router";

export default function CreateProgram() {
  const router = useRouter();
  const user = useCurrentUser();
  const createProgram = useMutation(api.programs.create);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [habits, setHabits] = useState([{ title: "", xpReward: "10", penalty: "5", frequency: "Daily" }]);
  const [loading, setLoading] = useState(false);

  const addHabit = () => {
    setHabits([...habits, { title: "", xpReward: "10", penalty: "5", frequency: "Daily" }]);
  };

  const updateHabit = (index: number, field: string, value: string) => {
    const newHabits = [...habits];
    // @ts-ignore
    newHabits[index] = { ...newHabits[index], [field]: value };
    setHabits(newHabits);
  };

  const handleCreate = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in");
      return;
    }
    if (!title) {
      Alert.alert("Error", "Please fill in title");
      return;
    }

    setLoading(true);
    try {
      await createProgram({
        creatorId: user._id,
        title,
        description,
        category: "General",
        habits: habits.map(h => ({
          title: h.title,
          xpReward: parseInt(h.xpReward) || 0,
          penalty: parseInt(h.penalty) || 0,
          frequency: [h.frequency],
        })),
      });
      router.back();
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ padding: theme.spacing.md }}>
      <Typography variant="h1" style={{ marginBottom: theme.spacing.lg }}>New Program</Typography>
      <Input label="Program Title" value={title} onChangeText={setTitle} />
      <Input label="Description" value={description} onChangeText={setDescription} />

      <Typography variant="h2" style={{ marginTop: 16, marginBottom: 8 }}>Habits</Typography>
      {habits.map((habit, index) => (
        <Card key={index} style={{ marginBottom: 16 }}>
          <Input
            label={`Habit ${index + 1} Title`}
            value={habit.title}
            onChangeText={(v) => updateHabit(index, "title", v)}
          />
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Input
              label="XP Reward"
              value={habit.xpReward}
              onChangeText={(v) => updateHabit(index, "xpReward", v)}
              keyboardType="numeric"
              containerStyle={{ flex: 1, marginRight: 8 }}
            />
            <Input
              label="Penalty"
              value={habit.penalty}
              onChangeText={(v) => updateHabit(index, "penalty", v)}
              keyboardType="numeric"
              containerStyle={{ flex: 1, marginLeft: 8 }}
            />
          </View>
        </Card>
      ))}

      <Button title="Add Another Habit" variant="secondary" onPress={addHabit} style={{ marginBottom: 16 }} />
      <Button title={loading ? "Creating..." : "Create Program"} onPress={handleCreate} disabled={loading} />
      <Button title="Cancel" variant="ghost" onPress={() => router.back()} style={{ marginTop: 8, marginBottom: 32 }} />
    </ScrollView>
  );
}
