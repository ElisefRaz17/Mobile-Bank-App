import Button from "@/components/ui/button";
import EntryCard from "@/components/ui/entrycard";
import Input from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import { getCurrentUser } from "@aws-amplify/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Image, ScrollView, StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";
import { addAccount } from "../services/accountService";
import { addBankAccountSchema } from "../utils/schemas";

const AddBankAccount = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(addBankAccountSchema),
  });

  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUserId(user.userId);
    };
    fetchUser();
  }, []);

  const handleCreateBankAccount = async (data: any) => {
    try {
      const newAccount = await addAccount({
        bankName: data.bankName,
        userId,
        balance: data.bankBalance,
        details: data.bankDetails,
      });
      Toast.show({
        type: "success",
        text1: `New Account Added by user ${newAccount?.userId}`,
      });
      router.replace("/(tabs)/main");
    } catch (err) {
      console.error(err);
      Toast.show({ type: "error", text1: "Failed to add new account" });
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Navbar title="Bank Account" />
      <div style={styles.contentContainer}>
        <Text style={styles.title}>
          Welcome <Image source={require("../../assets/images/hand.png")} />
        </Text>
        <Text style={styles.descriptionContainer}>
          Let’s kickstart your financial journey — add your bank account to get
          going!
        </Text>
        <EntryCard title="Transfer Entry">
          <Controller
            control={control}
            name="bankName"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Bank Name"
                value={value as string}
                onChangeText={onChange}
                onBlur={onBlur}
              />
            )}
          />
          {errors.bankName && (
            <Text style={styles.errorText}>{errors.bankName.message}</Text>
          )}
          <Controller
            control={control}
            name="bankBalance"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Balance"
                value={value as string}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.bankBalance && (
            <Text style={styles.errorText}>{errors.bankBalance?.message}</Text>
          )}
          <Controller
            control={control}
            name="bankDetails"
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                label="Bank Details like-Min, Balance, note count etc.."
                value={value as string}
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
          />
          {errors.bankDetails && (
            <Text style={styles.errorText}>{errors.bankDetails?.message}</Text>
          )}

          <Button
            title="Create"
            onPress={handleSubmit(handleCreateBankAccount)}
            disabled={!isValid}
            style={!isValid && { backgroundColor: "grey" }}
          />
        </EntryCard>
      </div>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121433",
  },
  contentContainer: {
    padding: 24,
    gap: 12,
    display: "flex",
    flexDirection: "column",
  },
  descriptionContainer: {
    display: "flex",
    minWidth: 264,
    maxWidth: 400,
    color: "white",
  },
  errorInput: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    lineHeight: 24,
    color: "white",
    display: "flex",
    alignItems: "center",
  },
});

export default AddBankAccount;
