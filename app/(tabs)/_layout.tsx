<<<<<<< HEAD
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
=======
import { Tabs, useSegments } from "expo-router";
import React from "react";
import { Image } from "react-native";
import AppLayout from "../(app)/_layout";

export default function TabLayout() {
  // const segments = useSegments();
  const segments = useSegments() as string[];
>>>>>>> develop
  const isHidden = segments.includes("add-bank-account");

  return (
    <AppLayout>
<<<<<<< HEAD
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
=======
      <Tabs
        screenOptions={{
          tabBarStyle: {
            display: isHidden ? "none" : "flex",
            backgroundColor: "#2B2D50",
          },

          sceneStyle: { backgroundColor: "#121433" },
        }}
      >
        {/* <Tabs.Screen
>>>>>>> develop
        name="index"
        options={{
          headerShown: false,
          href: null,
          tabBarIcon: () => (
            <Image source={require("../../assets/images/home-icon.svg")} />
          ),
        }}
      /> */}
<<<<<<< HEAD
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
=======
        <Tabs.Screen
          name="add-bank-account"
          options={{
            title: "Bank Account",
            headerShown: false,
            href: null,
            tabBarIcon: () => (
              <Image source={require("../../assets/images/grip.png")} />
            ),
          }}
        />
        <Tabs.Screen
          name="add-income-entry"
          options={{
            title: "Bank Account",
            headerShown: false,
            href: null,
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
>>>>>>> develop
    </AppLayout>
  );
}
