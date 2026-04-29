// app/(app)/_layout.tsx
import { Redirect, Slot, Stack } from 'expo-router';
import { useAuth } from '../auth/AuthContext';



export default function AppLayout({children}: {children: React.ReactNode}){


  const { user, isLoading} = useAuth();

  if (isLoading) return null; // Or a loading spinner

  if (!user) {
    return <Redirect href="/login" />;
  }

  return <>{children}</>;
}
