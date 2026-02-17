import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Input } from "../../src/components/ui/Input";
import { Button } from "../../src/components/ui/Button";
import { theme } from "../../src/theme";
import { Typography } from "../../src/components/ui/Typography";

export default function Signup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Signup Failed", err.errors?.[0]?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      await setActive({ session: completeSignUp.createdSessionId });
      // Redirect handled by Auth context or router
      router.replace("/(tabs)/tracker");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Verification Failed", err.errors?.[0]?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, padding: theme.spacing.lg, justifyContent: "center", backgroundColor: theme.colors.background }}>
      <Typography variant="h1" style={{ marginBottom: theme.spacing.xl, color: theme.colors.primary, textAlign: 'center' }}>
        JOIN US
      </Typography>

      {!pendingVerification ? (
        <>
          <Input
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Input
            label="Password"
            placeholder="Create a password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <Button
            title={loading ? "Creating..." : "Sign Up"}
            onPress={onSignUpPress}
            disabled={loading}
            style={{ marginTop: theme.spacing.md }}
          />
          <Button
            title="Already have an account? Login"
            variant="ghost"
            onPress={() => router.push("/(auth)/login")}
            style={{ marginTop: theme.spacing.md }}
          />
        </>
      ) : (
        <>
          <Input
            label="Verification Code"
            placeholder="Check your email"
            value={code}
            onChangeText={setCode}
            keyboardType="numeric"
          />
          <Button
            title={loading ? "Verifying..." : "Verify Email"}
            onPress={onPressVerify}
            disabled={loading}
            style={{ marginTop: theme.spacing.md }}
          />
        </>
      )}
    </View>
  );
}
