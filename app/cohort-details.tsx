import { useLocalSearchParams } from "expo-router";
import { View, ScrollView, Alert } from "react-native";
import { useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { Card } from "../src/components/ui/Card";
import { Typography } from "../src/components/ui/Typography";
import { Button } from "../src/components/ui/Button";
import { theme } from "../src/theme";
import { useCurrentUser } from "../src/hooks/useCurrentUser";

export default function CohortDetails() {
  const { cohortId } = useLocalSearchParams();
  const id = Array.isArray(cohortId) ? cohortId[0] : cohortId;
  const user = useCurrentUser();

  const members = useQuery(api.cohorts.getMembers, id ? { cohortId: id as any } : "skip");
  const activity = useQuery(api.activity.list, id ? { cohortId: id as any } : "skip");
  const vote = useMutation(api.activity.vote);

  const leaderboard = members ? [...members].sort((a: any, b: any) => b.totalXp - a.totalXp) : [];

  const handleVote = async (activityId: any, voteType: string) => {
    if (!user) return;
    try {
      await vote({ activityId, userId: user._id, vote: voteType });
      Alert.alert("Success", "Vote recorded");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ padding: theme.spacing.md }}>
      <Typography variant="h1" style={{ marginBottom: theme.spacing.lg }}>Cohort Details</Typography>

      <Typography variant="h2" style={{ marginBottom: theme.spacing.md }}>Leaderboard</Typography>
      {!members ? <Typography>Loading...</Typography> : leaderboard.map((m, index) => (
        <Card key={m.userId} style={{ flexDirection: "row", justifyContent: "space-between", padding: 12 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Typography style={{ fontWeight: "bold", width: 24 }}>#{index + 1}</Typography>
            <Typography style={{ marginLeft: 8 }}>{m.user?.name || "User"}</Typography>
          </View>
          <Typography style={{ fontWeight: "bold", color: theme.colors.primary }}>{m.totalXp} XP</Typography>
        </Card>
      ))}

      <Typography variant="h2" style={{ marginTop: 24, marginBottom: theme.spacing.md }}>Activity Wall</Typography>
      {!activity ? <Typography>Loading...</Typography> : activity.map((item: any) => (
        <Card key={item._id} style={{ marginBottom: 8, padding: 12 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Typography variant="caption" style={{ marginBottom: 4 }}>
              {new Date(item.createdAt).toLocaleDateString()}
            </Typography>
            {item.type === 'penalty_proposal' && (
              <Typography variant="caption" style={{ color: theme.colors.error, fontWeight: "bold" }}>PENALTY VOTE</Typography>
            )}
          </View>

          <Typography style={{ marginTop: 4 }}>{item.content}</Typography>

          {item.type === 'penalty_proposal' && (
            <View style={{ marginTop: 12 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 }}>
                 <Typography variant="caption">Approves: {item.data?.votes?.approve || 0}</Typography>
                 <Typography variant="caption">Rejects: {item.data?.votes?.reject || 0}</Typography>
              </View>
              <View style={{ flexDirection: 'row' }}>
                <Button
                  title="Approve"
                  onPress={() => handleVote(item._id, 'approve')}
                  size="sm"
                  style={{ marginRight: 8, backgroundColor: theme.colors.error, flex: 1 }}
                />
                <Button
                  title="Reject"
                  onPress={() => handleVote(item._id, 'reject')}
                  size="sm"
                  variant="outline"
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          )}
        </Card>
      ))}
    </ScrollView>
  );
}
