import { resetPassword } from "@aws-amplify/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { forgotPasswordSchema } from "../utils/schemas";

const ResetPassword = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    defaultValues: { email: "" },
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSendCode = async (data: any) => {
    try {
      // Sends a confirmation code to the user's email
      const output = await resetPassword({ username: data.email });
      if (
        output.nextStep.resetPasswordStep === "CONFIRM_RESET_PASSWORD_WITH_CODE"
      ) {
        router.push({
          pathname: `/confirm-reset-password`,
          params: { email: data.email },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reset Password</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            value={value}
            onChangeText={onChange}
            style={[styles.input, errors.email && styles.errorInput]}
          />
        )}
      />
      {errors.email && (
        <Text style={styles.errorText}>{errors.email.message}</Text>
      )}

      <Pressable style={styles.button} onPress={handleSubmit(onSendCode)}>
        <Text style={styles.buttonText}>Send Code</Text>
      </Pressable>
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

export default ResetPassword;
