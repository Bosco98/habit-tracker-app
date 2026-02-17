import { Redirect } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Text, View } from "react-native";
import { theme } from "../src/theme";

export default function Index() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.colors.primary }}>Loading...</Text>
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/(tabs)/tracker" />;
  }

  return <Redirect href="/(auth)/login" />;
}
