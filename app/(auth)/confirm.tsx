<<<<<<< HEAD
import { confirmSignUp, type ConfirmSignUpInput } from "@aws-amplify/auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Button, TextInput, View, Pressable, Text } from "react-native";
import { StyleSheet } from "react-native";

const ConfirmEmail = () =>{
   const {name} = useLocalSearchParams<{name:string}>();
   const [confirmationCode,setConfirmationCode] = useState('');
   const router = useRouter();

   const handleConfirm = async() => {

      try{ 
        await confirmSignUp({username: name, confirmationCode:confirmationCode});
        Alert.alert('Success','Account confirmed! Please sign in.');
        router.push('/(auth)/login')
        // router.replace('/(tabs)/add-bank-account')
      }catch(err:any){
        Alert.alert('Error',err.message)
      }
   }
     return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Account</Text>
      <TextInput style={styles.input} placeholder="Confirmation Code" value={confirmationCode} onChangeText={setConfirmationCode} />
      <Pressable style={styles.button} onPress={handleConfirm}>
        <Button title="Verify & Create" onPress={handleConfirm} />
      </Pressable>
=======
import Button from "@/components/ui/button";
import { confirmSignUp } from "@aws-amplify/auth";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TextInput, View } from "react-native";

const ConfirmEmail = () => {
  const { email } = useLocalSearchParams<{ email: string }>();
  const [confirmationCode, setConfirmationCode] = useState("");
  const router = useRouter();

  const handleConfirm = async () => {
    try {
      await confirmSignUp({
        username: email,
        confirmationCode: confirmationCode,
      });
      Alert.alert("Success", "Account confirmed! Please sign in.");
      router.push("/(auth)/login");
    } catch (err: any) {
      Alert.alert("Error", err.message);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm Account</Text>
      <TextInput
        style={styles.input}
        placeholder="Confirmation Code"
        value={confirmationCode}
        onChangeText={setConfirmationCode}
      />
      <Button
        style={{ width: 200 }}
        title="Verify & Create"
        onPress={handleConfirm}
      />
>>>>>>> develop
    </View>
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
    title:{
    fontSize:20,
    color:'white'
  },
    input:{
    display:"flex",
    borderRadius:16,
    backgroundColor:"white",
    padding:16
  },
    button:{
    borderRadius:16,
    backgroundColor:"#2B2D50",
    borderColor:"white"
  },

});

export default ConfirmEmail
=======
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#121433",
    color: "white",
    gap: 10,
  },
  title: {
    fontSize: 20,
    color: "white",
  },
  input: {
    display: "flex",
    borderRadius: 16,
    backgroundColor: "white",
    padding: 16,
  },
  button: {
    borderRadius: 16,
    backgroundColor: "#2B2D50",
    borderColor: "white",
  },
});

export default ConfirmEmail;
>>>>>>> develop
