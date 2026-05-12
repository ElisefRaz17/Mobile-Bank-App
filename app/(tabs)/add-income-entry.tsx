import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

import Button from "@/components/ui/button";
import CustomDateInput from "@/components/ui/date-input";
import EntryCard from "@/components/ui/entrycard";
import Input from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Dropdown } from "react-native-element-dropdown";
import { addIncomeEntrySchema } from "../utils/schemas";

const IncomeEntry = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(addIncomeEntrySchema),
  });
  const data = [
    { label: "Freelancing", value: "freelancing" },
    { label: "Job", value: "job" },
  ];
  const banks = [
    { label: "Truist", value: "truist" },
    { label: "Bank Of America", value: "bankOfAmerica" },
    { label: "Wells Fargo", value: "wellsFargo" },
    { label: "Citigroup", value: "citiGroup" },
    { label: "PNC", value: "pnc" },
  ];

  return (
    <View style={styles.menuContainer}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContainer}
      >
        <div style={styles.contentContainer}>
          <EntryCard title="Income Entry">
            <CustomDateInput />
            <Controller
              control={control}
              name="sourceOfIncome"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  label="Amount"
                  icon={
                    <Image
                      source={require("../../assets/images/amount-icon.svg")}
                    />
                  }
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                />
              )}
            />
            <Controller
              control={control}
              name="amount"
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
            <Controller
              control={control}
              name="incomeCategory"
              render={({ field: { onChange, value } }) => (
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
            <Controller
              control={control}
              name="bankName"
              render={({ field: { onChange, value } }) => (
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
                      source={require("../../assets/images/bank-select.svg")}
                    />
                    <Text style={styles.label}>Bank Select</Text>
                  </div>
                  <Dropdown
                    data={banks}
                    placeholder="Select Bank"
                    labelField="label"
                    valueField="value"
                    value={value}
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
            <Controller
              control={control}
              name="amountChange"
              render={({ field: { onChange, value } }) => (
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
            <Button
              style={
                !isValid
                  ? { maxWidth: 327, backgroundColor: "grey" }
                  : { maxWidth: 327 }
              }
              title="Save Income"
              onPress={handleSubmit(() => {})}
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
