import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { getCurrentUser, signOut } from 'aws-amplify/auth';
import { useRouter } from "expo-router";

// Define types for the user and context
interface User {
  username: string;
  userId:string;
//   attributes: {
//     email: string;
//     [key: string]: any;
//   };
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      setIsLoading(true);
      try {
        const {username, userId} = await getCurrentUser();
        setUser({ username: username, userId: userId});
      } catch (err) {
        console.log("No user is logged in:", err);
        router.replace("/onboard/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();
  }, [router]);

  const logout = async () => {
    try {
      await signOut();
      setUser(null);
      router.replace("/onboard/auth/login");
    } catch (err) {
      console.log("Error signing out:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout }}>
      {!isLoading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);