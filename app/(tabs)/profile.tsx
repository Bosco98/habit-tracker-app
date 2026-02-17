import React from "react";
import { View, Alert } from "react-native";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Button } from "../../src/components/ui/Button";
import { Typography } from "../../src/components/ui/Typography";
import { theme } from "../../src/theme";
import { useRouter } from "expo-router";

export default function Profile() {
  const { signOut } = useAuth();
  const { user } = useUser();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Router replacement handled by auth state change usually, but good to be explicit
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };

  return (
    <View style={{ flex: 1, padding: theme.spacing.lg, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}>
      {user?.imageUrl && (
        <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#ddd', marginBottom: 16, overflow: 'hidden' }}>
           {/* Image component would go here */}
        </View>
      )}
      <Typography variant="h1" style={{ marginBottom: 8 }}>{user?.fullName || "User"}</Typography>
      <Typography variant="body" style={{ marginBottom: 32 }}>{user?.primaryEmailAddress?.emailAddress}</Typography>

      <Button title="Sign Out" onPress={handleSignOut} variant="outline" style={{ width: '100%' }} />
    </View>
  );
}
