<<<<<<< HEAD
import { Link,router} from "expo-router";
import {
  Alert,
  Button,
=======
import { zodResolver } from "@hookform/resolvers/zod";
import { getCurrentUser, signIn } from "aws-amplify/auth";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Image,
>>>>>>> develop
  Pressable,
  StyleSheet,
  Text,
  TextInput,
<<<<<<< HEAD
  TouchableOpacity,
  View,
} from "react-native";
// import Button from "@/components/ui/button";


import { useState } from "react";
import { fetchAuthSession, signIn } from "@aws-amplify/auth";
import { useAuth } from "../auth/AuthContext";

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {signIn} = useAuth()

//   async function handleSignIn() {
//     try {
//       const {isSignedIn, nextStep} = await signIn({ username, password });

//        if (isSignedIn) {
//         // Redirect to the home page or dashboard
//         router.replace("/(tabs)/add-bank-account");
//       } else if (nextStep.signInStep === 'CONFIRM_SIGN_UP') {
//         // Redirect to verification if needed
//         router.replace('/confirm');
//       }
      
      
//     } catch (err: any) {
//       Alert.alert("Sign In Error", err.message);
//     }
//   }
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        onChangeText={setUsername}
        value={username}
        autoCapitalize="none"
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={()=>signIn(username,password)}>
        <Text style={styles.buttonText}>Sign In</Text>
      </Pressable> 
        {/* <Button title="Sign In" onPress={handleSignIn} style={{width:120}}/>
         */}
         {/* <Button title="Sign In" onPress={handleSignIn}/> */}
      
      <Text style={styles.buttonText}>
        Need an account? <Link href="/register">Register Here</Link>
      </Text>
=======
  View,
} from "react-native";
import z from "zod";
import { getUsersAccounts } from "../services/accountService";
import { loginSchema } from "../utils/schemas";
type LoginFormValues = z.infer<typeof loginSchema>;
export default function SignIn() {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
    defaultValues: {
      username: "",
      password: "",
    },
  });
  // const { signIn } = useAuth();
  const onLogin = async (data: LoginFormValues) => {
    try {
      setLoading(true);
      const { isSignedIn } = await signIn({
        username: data.username,
        password: data.password,
      });

      if (isSignedIn) {
        const user = await getCurrentUser();
        const userId = user.userId;
        const accounts = await getUsersAccounts(userId);
        if (accounts && accounts.length >= 1) {
          router.replace("/(tabs)/main");
        } else {
          router.replace("/(tabs)/add-bank-account");
        }
      }
    } catch (error) {
      console.error("Error signing in", error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    <Image source={require("../../assets/images/spinner.svg")} />;
  }
  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/app-logo.svg")}
        style={{ width: 50, height: 50 }}
      />
      <Text style={styles.formTitle}>Log In</Text>
      <View style={styles.formContainer}>
        <Controller
          control={control}
          name="username"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Username"
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              autoCapitalize="none"
              style={[styles.input, errors.username && styles.errorInput]}
            />
          )}
        />
        {errors.username && (
          <Text style={styles.errorText}>{errors.username?.message}</Text>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              style={[styles.input, errors.password && styles.errorInput]}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        <Pressable style={styles.button} onPress={handleSubmit(onLogin)}>
          <Text style={styles.buttonText}>Sign In</Text>
        </Pressable>
      </View>
      <Text style={styles.buttonText}>
        Need an account? <Link href="/register">Register Here</Link>
      </Text>
      <Text style={styles.buttonText}>
        Forgot Password?{" "}
        <Link href="/(auth)/reset-password">Reset Password</Link>
      </Text>
>>>>>>> develop
    </View>
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
=======
  formTitle: {
    color: "white",
    fontSize: 20,
  },
  errorInput: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
>>>>>>> develop
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121433",
    color: "white",
    gap: 10,
  },
<<<<<<< HEAD
    button:{
    borderRadius:16,
    backgroundColor:"#2B2D50",
    borderColor:"white",
    width:135,
    height:35,
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  },
  buttonText:{
    color:"white"
=======
  formContainer: {
    gap: 5,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  button: {
    borderRadius: 16,
    backgroundColor: "#2B2D50",
    borderColor: "white",
    width: 135,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
>>>>>>> develop
  },
  input: {
    display: "flex",
    borderRadius: 16,
    backgroundColor: "white",
    padding: 16,
<<<<<<< HEAD
  }
=======
  },
>>>>>>> develop
});
