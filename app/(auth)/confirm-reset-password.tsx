import { zodResolver } from "@hookform/resolvers/zod";
import { confirmResetPassword } from "aws-amplify/auth";
import { router, useLocalSearchParams } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { resetPasswordSchema } from "../utils/schemas";

export default function ResetPasswordScreen() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(resetPasswordSchema),
  });
  const { email } = useLocalSearchParams<{ email: string }>();

  const onConfirmPressed = async (data: any) => {
    try {
      // Submits code and new password to Cognito
      console.log("Passowrd Data", data);
      await confirmResetPassword({
        username: email,
        confirmationCode: data.code,
        newPassword: data.password,
      });

      router.push("/login");
    } catch (e: any) {
      console.error(e.message);
    }
  };

  return (
    <View style={styles.container}>
      <Controller
        control={control}
        name="code"
        rules={{ required: "Code is required" }}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            placeholder="Confirmation Code"
            onChangeText={onChange}
            value={value}
            style={[styles.input, errors.code && styles.errorInput]}
            onBlur={onBlur}
          />
        )}
      />
      {errors.code && (
        <Text style={styles.errorText}>{errors.code.message}</Text>
      )}
      <Controller
        control={control}
        name="password"
        rules={{ required: "New password is required", minLength: 8 }}
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            placeholder="New Password"
            secureTextEntry
            onChangeText={onChange}
            value={value}
            onBlur={onBlur}
            style={[styles.input, errors.password && styles.errorInput]}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.errorText}>{errors.password.message}</Text>
      )}
      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, value, onBlur } }) => (
          <TextInput
            placeholder="Confirm New Password"
            secureTextEntry
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            style={[styles.input, errors.confirmPassword && styles.errorInput]}
          />
        )}
      />
      {errors?.confirmPassword && (
        <Text style={styles.errorText}>{errors?.confirmPassword?.message}</Text>
      )}

      <Pressable style={styles.button} onPress={handleSubmit(onConfirmPressed)}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </Pressable>
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
  buttonText: {
    color: "white",
  },
  errorInput: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
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
    width: 135,
    height: 35,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
