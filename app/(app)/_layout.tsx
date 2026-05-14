// app/(app)/_layout.tsx
import { Hub } from "@aws-amplify/core";
import { Redirect, router } from "expo-router";
import React, { useEffect } from "react";
import { useAuth } from "../features/auth/AuthContext";
import { getUsersAccounts } from "../services/accountService";
export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  useEffect(() => {
    const unsubscribe = Hub.listen("auth", async ({ payload }) => {
      console.log("Payload", payload);
      if (payload.event === "signedIn") {
        const userId = (payload.data as any).attributes.sub;
        const accounts = await getUsersAccounts(userId);

        if (accounts.length >= 1) {
          // Use router.replace to prevent users from going back to the login screen
          router.replace("/(tabs)/main");
        } else {
          router.replace("/(tabs)/add-bank-account");
        }
      }
    });

    return () => unsubscribe();
  }, []);
  if (isLoading) return null; // Or a loading spinner

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <>{children}</>;
}
