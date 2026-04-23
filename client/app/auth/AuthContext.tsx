import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { signIn, signOut, getCurrentUser, fetchAuthSession, AuthUser } from 'aws-amplify/auth';
import { useRouter, useSegments } from 'expo-router';

interface AuthContextProps {
  signIn: (u: string, p: string) => Promise<void>;
  session:string | null;
  signOut: () => Promise<void>;
  user: AuthUser | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setSession(currentUser.userId);
    } catch {
      setUser(null);
      setSession(null);
    } finally {
      setIsLoading(false);
    }
  };

//   useEffect(() => {
//     if (isLoading) return;
//     const inAuthGroup = segments[0] === '(auth)';
//     if (!user && inAuthGroup) {
//       router.replace('/(auth)/login');
//     } else if (user && !inAuthGroup) {
//       router.replace('/(tabs)/main');
//     }
//   }, [user, segments, isLoading]);

  const authSignIn = async (u: string, p: string) => {
    await signIn({ username: u, password: p });
    await checkUser();
    router.replace("/(tabs)/add-bank-account")
  };

  const authSignOut = async () => {
    await signOut();
    setUser(null);
    router.replace('/login');
  };

  return (
    <AuthContext.Provider value={{ signIn: authSignIn, signOut: authSignOut, user,session, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
