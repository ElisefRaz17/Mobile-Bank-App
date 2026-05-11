import { StyleSheet } from "react-native";

import CustomDateInput from "@/components/ui/date-input";
import EntryCard from "@/components/ui/entrycard";
import { useState } from "react";
const IncomeEntry = () => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    <EntryCard title="Income Entry">
      {/* <Input label="Income Date"  />  */}
      <CustomDateInput />
    </EntryCard>
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
  scrollContainer: {
    padding: 20,
    // Adds a 16px gap between all child items
    rowGap: 16,
    flexGrow: 1,
    backgroundColor: "white",
    borderRadius: 10,
  },
});
export default IncomeEntry;
