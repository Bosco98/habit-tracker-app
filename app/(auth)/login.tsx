import React, { useState } from "react";
import { View, Text, Alert } from "react-native";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Input } from "../../src/components/ui/Input";
import { Button } from "../../src/components/ui/Button";
import { theme } from "../../src/theme";
import { Typography } from "../../src/components/ui/Typography";
import { GoogleSignIn } from "../../src/components/auth/GoogleSignIn";

export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;
    if (!email || !password) {
      Alert.alert("Error", "Please enter email and password");
      return;
    }

    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: email,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
      // Redirect handled by Auth context or router
      router.replace("/(tabs)/tracker");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Login Failed", err.errors?.[0]?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: theme.spacing.lg, justifyContent: "center", backgroundColor: theme.colors.background }}>
      <Typography variant="h1" style={{ marginBottom: theme.spacing.xl, color: theme.colors.primary, textAlign: 'center' }}>
        HABIT TRACKER
      </Typography>

      <GoogleSignIn />

      <Typography variant="body" style={{ textAlign: 'center', marginVertical: 16 }}>OR</Typography>

      <Input
        label="Email"
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <Button
        title={loading ? "Logging in..." : "Login"}
        onPress={onSignInPress}
        disabled={loading}
        style={{ marginTop: theme.spacing.md }}
      />

      <Button
        title="Don't have an account? Sign Up"
        variant="ghost"
        onPress={() => router.push("/(auth)/signup")}
        style={{ marginTop: theme.spacing.md }}
      />
    </View>
  );
}
