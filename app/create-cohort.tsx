import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { View, Alert } from "react-native";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useCurrentUser } from "../src/hooks/useCurrentUser";
import { Input } from "../src/components/ui/Input";
import { Button } from "../src/components/ui/Button";
import { Typography } from "../src/components/ui/Typography";
import { theme } from "../src/theme";
import { format } from "date-fns";

export default function CreateCohort() {
  const params = useLocalSearchParams();
  const programId = params.programId as string;

  const user = useCurrentUser();
  const createCohort = useMutation(api.cohorts.create);
  const router = useRouter();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!user) {
      Alert.alert("Error", "You must be logged in");
      return;
    }
    if (!name) {
      Alert.alert("Error", "Please enter a name");
      return;
    }

    setLoading(true);
    try {
      await createCohort({
        programId: programId as any, // Cast because ID type
        creatorId: user._id,
        name,
        startDate: format(new Date(), "yyyy-MM-dd"),
      });
      Alert.alert("Success", "Cohort created!");
      router.back();
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err.message || "Failed to create cohort");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: theme.spacing.lg, backgroundColor: theme.colors.background }}>
      <Typography variant="h1" style={{ marginBottom: theme.spacing.xl }}>Start a Cohort</Typography>
      <Input
        label="Cohort Name"
        placeholder="e.g. June Challengers"
        value={name}
        onChangeText={setName}
      />
      <Button
        title={loading ? "Creating..." : "Create Cohort"}
        onPress={handleCreate}
        disabled={loading}
        style={{ marginTop: theme.spacing.md }}
      />
      <Button
        title="Cancel"
        variant="ghost"
        onPress={() => router.back()}
        style={{ marginTop: theme.spacing.sm }}
      />
    </View>
  );
}
