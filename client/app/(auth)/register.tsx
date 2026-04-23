import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";
import { Link, router } from "expo-router";
import { confirmSignUp, signUp } from "@aws-amplify/auth";
import { PhoneNumberField } from "@aws-amplify/ui-react-native/dist/primitives";
import Button from "@/components/ui/button";
const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword || !address || !phoneNumber) {
      Alert.alert("Error", "Please fill out all fields.");
    } else if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match.");
    } else {
      try {
        await signUp({ username: name, password: password,options:{
            userAttributes:{
                address: address,
                name:name,
                email:email,
                phone_number:phoneNumber
                
            },
            autoSignIn:true
        } });
        Alert.alert("Success", `We've sent a confirmation code to ${email}`);
        router.push({pathname:"/(auth)/confirm", params:{name}})
        
      } catch (error: any) {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} >Welcome to Mobile Bank</Text>
    
      <Text style={styles.subTitle}>Register an account</Text>
      <div style={styles.fieldContainer}>
      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Address" value={address} onChangeText={setAddress} />
      <PhoneNumberField style={styles.input} value={phoneNumber} onChangeText={setPhoneNumber} placeholder="Phone Number"/>
      <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />
      </div>
      <Pressable style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
      <Text style={styles.buttonText}>Already have an account? <Link href="/login">Sign In Here</Link></Text>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:"#121433",
    color:'white',
    gap:10
  },
  subTitle:{
    fontSize:20,
    color:"white"
  },
  title:{
    fontSize:26,
    color:"white"
  },
  input:{
    display:"flex",
    borderRadius:16,
    backgroundColor:"white",
    padding:16,
    width:"100%"
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
  fieldContainer:{
    display:"flex",
    flexDirection:"column",
    alignItems:"flex-start",
    gap:20
  }
})

export default RegisterScreen;