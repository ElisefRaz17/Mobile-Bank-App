import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/button";
import EntryCard from "@/components/ui/entrycard";
import Input from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import Toast from "react-native-toast-message";
import { useAuth } from "../features/auth/AuthContext";
import { saveIncomeEntry } from "../services/transactionService";
import { addIncomeEntrySchema } from "../utils/schemas";

const IncomeEntry = () => {
  const { user } = useAuth();
  const {
    control,
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm({
    mode: "onBlur",
    resolver: zodResolver(addIncomeEntrySchema),
    defaultValues: {
      name: "",
      sourceOfIncome: "",
      incomeDate: "",
    },
  });
  const data = [
    { label: "Freelancing", value: "freelancing" },
    { label: "Job", value: "job" },
  ];

  const handleIncomeEntry = async (data: any) => {
    try {
      const response = await saveIncomeEntry({
        userId: user?.userId,
        name: data.name,
        reasonOfIncome: data.sourceOfIncome,
        amountCanChange: data.amountChange,
        type: "INCOME",
        amount: data.amount,
        category: data.incomeCategory,
      });
      Toast.show({
        type: "success",
        text1: "New Income Entry was saved.",
      });
      router.replace("/(tabs)/main");
    } catch (err) {
      console.error(err);
      Toast.show({ type: "error", text1: "Failed to save Income Entry" });
    }
  };

  return (
    <View style={styles.menuContainer}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
      >
        <div style={styles.contentContainer}>
          <EntryCard title="Income Entry">
            <Controller
              control={control}
              name="name"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Name"
                  value={value as string}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.name && (
              <Text style={styles.errorText}>{errors.name.message}</Text>
            )}
            <View style={{ padding: 10 }}>
              <View style={styles.fieldHeader}>
                <Image
                  source={require("../../assets/images/calendar-icon.svg")}
                />

                <Text>Income Date</Text>
              </View>

              {/* Render native web date input */}
              <input
                type="date"
                {...register("incomeDate")}
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  border: "1px solid #858BE9",
                  fontSize: "16px",
                  marginTop: "10px",
                  width: 312,
                }}
              />
            </View>
            {/* )}
            /> */}
            {errors.incomeDate && (
              <Text style={styles.errorText}>{errors.incomeDate.message}</Text>
            )}
            <Controller
              control={control}
              name="amount"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Amount"
                  icon={
                    <Image
                      source={require("../../assets/images/amount-icon.svg")}
                    />
                  }
                  value={value as string}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.amount && (
              <Text style={styles.errorText}>{errors.amount.message}</Text>
            )}
            <Controller
              control={control}
              name="sourceOfIncome"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Reason/Source of Income"
                  icon={
                    <Image
                      source={require("../../assets/images/source-income-icon.svg")}
                    />
                  }
                  value={value as string}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            {errors.sourceOfIncome && (
              <Text style={styles.errorText}>
                {errors.sourceOfIncome.message}
              </Text>
            )}
            <Controller
              control={control}
              name="incomeCategory"
              render={({ field: { onChange, value, onBlur } }) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "row", gap: 10 }}
                  >
                    <Image
                      source={require("../../assets/images/income-category.svg")}
                    />
                    <Text style={styles.label}>Income Category</Text>
                  </div>
                  <Dropdown
                    data={data}
                    labelField="label"
                    valueField="value"
                    placeholder="Select Category"
                    value={value}
                    onChange={(item) => onChange(item.value)}
                    onBlur={onBlur}
                    style={{
                      height: 40,
                      borderColor: "#858BE9",
                      borderWidth: 1,
                      paddingHorizontal: 8,
                      backgroundColor: "white",
                      borderRadius: 10,
                      minWidth: 327,
                      marginBottom: 15,
                    }}
                  />
                </div>
              )}
            />
            {errors.incomeCategory && (
              <Text style={styles.errorText}>
                {errors.incomeCategory.message}
              </Text>
            )}

            <Controller
              control={control}
              name="amountChange"
              render={({ field: { onChange, value, onBlur } }) => (
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    flexDirection: "column",
                  }}
                >
                  <div
                    style={{ display: "flex", flexDirection: "row", gap: 10 }}
                  >
                    <Image
                      source={require("../../assets/images/amount-change.svg")}
                    />
                    <Text style={styles.label}>Amount can change?</Text>
                  </div>
                  <Dropdown
                    data={[
                      { label: "Yes", value: "yes" },
                      { label: "No", value: "no" },
                    ]}
                    labelField="label"
                    valueField="value"
                    value={value}
                    onBlur={onBlur}
                    onChange={(item) => onChange(item.value)}
                    style={{
                      height: 40,
                      borderColor: "#858BE9",
                      borderWidth: 1,
                      paddingHorizontal: 8,
                      backgroundColor: "white",
                      borderRadius: 10,
                      minWidth: 327,
                      marginBottom: 15,
                    }}
                  />
                </div>
              )}
            />
            {errors.amountChange && (
              <Text style={styles.errorText}>
                {errors.amountChange.message}
              </Text>
            )}
            <Button
              style={
                !isValid
                  ? { maxWidth: 327, backgroundColor: "grey" }
                  : { maxWidth: 327 }
              }
              title="Save Income"
              onPress={handleSubmit(handleIncomeEntry)}
              disabled={!isValid}
            />
          </EntryCard>
        </div>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  menuContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  errorInput: { borderColor: "red" },
  errorText: { color: "red", fontSize: 12, marginBottom: 10 },
  label: {
    display: "flex",
    height: 16,
    justifyContent: "center",
    flexDirection: "column",
    fontSize: 14,
    color: "#000",
    fontWeight: 400,
    marginBottom: 10,
  },
  fieldHeader: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
  contentContainer: {
    padding: 12,
    gap: 12,
    display: "flex",
    flexDirection: "column",
  },
  scrollContainer: {
    padding: 20,
    // Adds a 16px gap between all child items
    rowGap: 16,
    flexGrow: 1,
    backgroundColor: "white",
    borderRadius: 10,
    maxWidth: 365,
    alignItems: "center",
  },
});
export default IncomeEntry;
