// app/(app)/_layout.tsx
import { Redirect } from "expo-router";
import { useAuth } from "../features/auth/AuthContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  if (isLoading) return null; // Or a loading spinner

  if (!user) {
    return <Redirect href="/(auth)/login" />;
  }

  return <>{children}</>;
}
