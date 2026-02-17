import React, { useState } from "react";
import { View, Text, Alert, StyleSheet } from "react-native";
import { useSignUp, useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { NeoLayout } from "../../src/components/neo/NeoLayout";
import { NeoCard } from "../../src/components/neo/NeoCard";
import { NeoInput } from "../../src/components/neo/NeoInput";
import { NeoButton } from "../../src/components/neo/NeoButton";
import { neoTheme } from "../../src/theme/neo";
import { Svg, Path } from "react-native-svg";

export default function Signup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
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
      router.replace("/(tabs)/tracker");
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Verification Failed", err.errors?.[0]?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const onGoogleSignIn = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(tabs)/tracker", { scheme: "habit-tracker" }),
      });

      if (createdSessionId && setActive) {
        await setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <NeoLayout>
      <View style={styles.header}>
        <Text style={styles.title}>HABIT{"\n"}TRACK</Text>
      </View>

      <NeoCard style={styles.card}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeTitle}>{pendingVerification ? "VERIFY EMAIL" : "JOIN US"}</Text>
          <Text style={styles.welcomeSubtitle}>
            {pendingVerification ? "Check your email for the code." : "Start your journey today."}
          </Text>
        </View>

        {!pendingVerification ? (
          <>
            <NeoButton
              title="Continue with Google"
              variant="google"
              onPress={onGoogleSignIn}
              icon={
                <Svg width="24" height="24" viewBox="0 0 48 48">
                  <Path d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" fill="#FFC107"/>
                  <Path d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" fill="#FF3D00"/>
                  <Path d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" fill="#4CAF50"/>
                  <Path d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" fill="#1976D2"/>
                </Svg>
              }
              style={{ marginBottom: neoTheme.spacing.lg }}
            />

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR SIGN UP WITH EMAIL</Text>
              <View style={styles.divider} />
            </View>

            <NeoInput
              label="Email"
              placeholder="hello@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <NeoInput
              label="Password"
              placeholder="••••••••"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <NeoButton
              title={loading ? "Creating..." : "SIGN UP"}
              onPress={onSignUpPress}
              disabled={loading}
              style={{ marginTop: neoTheme.spacing.md }}
            />
            <View style={styles.footer}>
              <Text style={styles.footerText}>Already have an account? </Text>
              <Text style={styles.linkText} onPress={() => router.push("/(auth)/login")}>
                Login
              </Text>
            </View>
          </>
        ) : (
          <>
            <NeoInput
              label="Verification Code"
              placeholder="123456"
              value={code}
              onChangeText={setCode}
              keyboardType="numeric"
            />
            <NeoButton
              title={loading ? "Verifying..." : "VERIFY EMAIL"}
              onPress={onPressVerify}
              disabled={loading}
              style={{ marginTop: neoTheme.spacing.md }}
            />
          </>
        )}
      </NeoCard>

      <Text style={styles.versionText}>V1.0.4 • NEO-HABITS</Text>
    </NeoLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: neoTheme.spacing.xl,
    transform: [{ rotate: '-2deg' }],
  },
  title: {
    ...neoTheme.text.h1,
    color: neoTheme.colors.surfaceLight,
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 4, height: 4 },
    textShadowRadius: 0,
  },
  card: {
    width: '100%',
    maxWidth: 400,
  },
  welcomeContainer: {
    marginBottom: neoTheme.spacing.lg,
    alignItems: 'center',
  },
  welcomeTitle: {
    ...neoTheme.text.h2,
    color: neoTheme.colors.text,
    textTransform: 'uppercase',
  },
  welcomeSubtitle: {
    ...neoTheme.text.caption,
    color: '#6B7280', // Gray-500
    fontWeight: '700',
    marginTop: 4,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: neoTheme.spacing.lg,
  },
  divider: {
    flex: 1,
    height: 2,
    backgroundColor: neoTheme.colors.border,
  },
  dividerText: {
    marginHorizontal: neoTheme.spacing.md,
    fontSize: 12,
    fontWeight: '900',
    color: neoTheme.colors.text,
    textTransform: 'uppercase',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: neoTheme.spacing.lg,
  },
  footerText: {
    ...neoTheme.text.caption,
    fontWeight: '700',
    color: '#4B5563',
  },
  linkText: {
    ...neoTheme.text.caption,
    fontWeight: '900',
    color: neoTheme.colors.text,
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
    textDecorationColor: neoTheme.colors.secondary,
  },
  versionText: {
    marginTop: neoTheme.spacing.xl,
    ...neoTheme.text.caption,
    fontSize: 12,
    color: '#9CA3AF',
    fontFamily: 'monospace', // Use monospace for version
    fontWeight: '700',
  },
});
