import React, { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { Button } from "../ui/Button";
import * as Linking from "expo-linking";

WebBrowser.maybeCompleteAuthSession();

export const GoogleSignIn = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/(tabs)/tracker", { scheme: "habit-tracker" }),
      });

      if (createdSessionId && setActive) {
        setActive({ session: createdSessionId });
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <Button
      title="Sign in with Google"
      onPress={onPress}
      variant="secondary"
      style={{ marginBottom: 16 }}
    />
  );
};
