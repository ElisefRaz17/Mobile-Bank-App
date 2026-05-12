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
    </View>
  );
};

const styles = StyleSheet.create({
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
