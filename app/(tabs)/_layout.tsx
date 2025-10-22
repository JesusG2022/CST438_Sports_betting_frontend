import { Tabs } from "expo-router";

import Ionicons from "@expo/vector-icons/Ionicons";
import { IconSymbol } from '@/components/ui/IconSymbol';


export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#ffd33d",
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home-sharp" : "home-outline"}
              color={color}
              size={24}
            />
          ),
          tabBarStyle: { display: 'none' },  // hides the bottom tab bar
          href: null,
        }}
      />
       <Tabs.Screen
        name="teams"
        options={{
          title: "Teams",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="0.circle.ar" color={color} />,
        }}
      />
       <Tabs.Screen
        name="UpcomingGames"
        options={{
          title: "Upcoming Games",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chevron.left.forwardslash.chevron.right" color={color} />,
        }}
      />
       <Tabs.Screen
        name="FavoriteTeams"
        options={{
          title: "Favorite Teams",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />

      <Tabs.Screen
        name="login"
        options={{
          title: "Login",
          tabBarIcon: ({ color, focused }) => (
            <Ionicons
              name={
                focused ? "key" : "key"
              }
              color={color}
              size={24}
            />
          ),
          tabBarStyle: { display: 'none' },  // hides the bottom tab bar
          href: null,
        }}
      />
      <Tabs.Screen
        name="logout"
        options={{
          title: "Logout",
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="0.circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
