import { Slot, Stack } from "expo-router";
import ConvexClientProvider from "../src/providers/ConvexClientProvider";
import { ClerkLoaded } from "@clerk/clerk-expo";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [loaded, error] = useFonts({
    // Load custom fonts if needed
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <ConvexClientProvider>
      <ClerkLoaded>
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#8B5CF6', // Primary color
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
            contentStyle: { backgroundColor: '#F3F4F6' },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </ClerkLoaded>
    </ConvexClientProvider>
  );
}
