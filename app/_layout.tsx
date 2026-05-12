<<<<<<< HEAD
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
=======
import "react-native-get-random-values";

import { Amplify } from "aws-amplify";
import { Slot } from "expo-router";

import "react-native-reanimated";
import AwsConfig from "../aws-exports";

import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider } from "./features/auth/AuthContext";

Amplify.configure(AwsConfig as any);
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter: require("../assets/fonts/Inter-VariableFont_opsz,wght.ttf"),
  });
  useEffect(() => {
>>>>>>> develop
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);
<<<<<<< HEAD
=======

>>>>>>> develop
  return (
    <AuthProvider>
      <Slot />
    </AuthProvider>
  );
}
