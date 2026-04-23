import { Tabs, useRouter, useSegments } from "expo-router";
import React from "react";

import { HapticTab } from "@/components/haptic-tab";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import Navbar from "@/components/ui/navbar";
import { Image, Pressable } from "react-native";
import AppLayout from "../(app)/_layout";

export default function TabLayout() {
  const segments = useSegments();
  const isHidden = segments.includes("add-bank-account");

  return (
    <AppLayout>
    <Tabs
  
      screenOptions={{
        tabBarStyle: {
          display: isHidden ? "none" : "flex",
          backgroundColor: "#2B2D50",
        },
  
        sceneStyle: { backgroundColor: "#121433"},
      }}
    >
      {/* <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          href: null,
          tabBarIcon: () => (
            <Image source={require("../../assets/images/home-icon.svg")} />
          ),
        }}
      /> */}
      <Tabs.Screen
        name="add-bank-account"
        options={{
          title:"Bank Account",
          headerShown: false,
          href:null,
          tabBarIcon: () => (
            <Image source={require("../../assets/images/grip.png")} />
          ),
        }}
      />
            <Tabs.Screen
        name="add-income-entry"
        options={{
          title:"Bank Account",
          headerShown: false,
          href:null,
          tabBarIcon: () => (
            <Image source={require("../../assets/images/grip.png")} />
          ),
        }}
      />
      <Tabs.Screen
        name="main"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: () => (
            <Image source={require("../../assets/images/home-icon.svg")} />
          ),
        }}
      />
      <Tabs.Screen
        name="menu"
        options={{
          headerShown: false,
          title: "Menu",
          tabBarIcon: () => (
            <Image source={require("../../assets/images/menu-icon.svg")} />
          ),
        }}
      />
    </Tabs>
    </AppLayout>
  );
}
