import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { AuthProvider } from './auth/AuthContext';
import { Amplify } from 'aws-amplify';
import awsConfig from "../aws-exports";
import {useFonts} from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout() {
   SplashScreen.preventAutoHideAsync();
  Amplify.configure(awsConfig);
    const [loaded, error] = useFonts({
    'Inter': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf')
  });
    useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
