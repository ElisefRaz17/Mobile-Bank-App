<<<<<<< HEAD
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
=======
import { signUp } from "@aws-amplify/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import z from "zod";
import { registerSchema } from "../utils/schemas";
type RegisterFormValues = z.infer<typeof registerSchema>;
const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      address: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    },
  });

  const handleRegister = async (data: RegisterFormValues) => {
    try {
      await signUp({
        username: data.email,
        password: data.password,
        options: {
          userAttributes: {
            address: data.address,
            name: data.name,
            email: data.email,
            phone_number: data.phoneNumber,
          },
          autoSignIn: true,
        },
      });
      Alert.alert("Success", `We've sent a confirmation code to ${data.email}`);
      const email = data.email;
      router.push({ pathname: "/(auth)/confirm", params: { email } });
    } catch (error: any) {
      Alert.alert("Error", error.message);
>>>>>>> develop
    }
  };

  return (
<<<<<<< HEAD
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
=======
    // <View style={{ flex: 1 }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Welcome to Mobile Bank</Text>
      <Image
        source={require("../../assets/images/app-logo.svg")}
        style={{ width: 100, height: 100 }}
      />
      <Text style={styles.subTitle}>Register an account</Text>
      <View style={styles.fieldContainer}>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.name && styles.errorInput]}
              placeholder="Full Name"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.name && (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        )}
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.email && styles.errorInput]}
              placeholder="Email"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        <Controller
          control={control}
          name="address"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.address && styles.errorInput]}
              placeholder="123 Main St. Charlotte, NC 28205"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.address && (
          <Text style={styles.errorText}>{errors.address.message}</Text>
        )}
        <Controller
          control={control}
          name="phoneNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="+12025550123"
              keyboardType="phone-pad"
              onChangeText={onChange}
              value={value}
              style={[styles.input, errors.phoneNumber && styles.errorInput]}
              onBlur={onBlur}
            />
          )}
        />
        {errors.phoneNumber && (
          <Text style={styles.errorText}>{errors.phoneNumber.message}</Text>
        )}
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, errors.password && styles.errorInput]}
              placeholder="Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}
        <Controller
          control={control}
          name="confirmPassword"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                errors.confirmPassword && styles.errorInput,
              ]}
              placeholder="Confirm Password"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry
            />
          )}
        />
        {errors.confirmPassword && (
          <Text style={styles.errorText}>{errors.confirmPassword.message}</Text>
        )}
      </View>
      <Pressable style={styles.button} onPress={handleSubmit(handleRegister)}>
        <Text style={styles.buttonText}>Register</Text>
      </Pressable>
      <Text style={styles.buttonText}>
        Already have an account? <Link href="/login">Sign In Here</Link>
      </Text>
    </ScrollView>
    // </View>
>>>>>>> develop
  );
};

const styles = StyleSheet.create({
<<<<<<< HEAD
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
=======
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121433",
    color: "white",
    gap: 10,
    overflowY: "auto",
    padding: 30,
  },
  errorInput: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
  subTitle: {
    fontSize: 20,
    color: "white",
  },
  title: {
    fontSize: 26,
    color: "white",
  },
  input: {
    display: "flex",
    borderRadius: 16,
    backgroundColor: "white",
    padding: 16,
    width: "100%",
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
  },
  fieldContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 20,
  },
});

export default RegisterScreen;
>>>>>>> develop
