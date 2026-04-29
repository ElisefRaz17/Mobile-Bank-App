import { Link,router} from "expo-router";
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121433",
    color: "white",
    gap: 10,
  },
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
  },
  input: {
    display: "flex",
    borderRadius: 16,
    backgroundColor: "white",
    padding: 16,
  }
});
