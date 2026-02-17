import React from "react";
import { Tabs } from "expo-router";
import { TabBar } from "../../src/components/navigation/TabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="tracker" options={{ title: "Tracker" }} />
      <Tabs.Screen name="programs" options={{ title: "Programs" }} />
      <Tabs.Screen name="cohorts" options={{ title: "Cohorts" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
