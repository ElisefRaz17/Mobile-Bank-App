import { ScrollView, StyleSheet, Text, View } from "react-native";
import Navbar from "@/components/ui/navbar";
import { Ionicons } from "@expo/vector-icons";
import EntryCard from "@/components/ui/entrycard";
import Input from "@/components/ui/input";
import { useState } from "react";
import {DateTimePicker, Host} from '@expo/ui/jetpack-compose'
import FormattedDateInput from "@/components/ui/date-input";
import CustomDateInput from "@/components/ui/date-input";
const IncomeEntry = () => {
  const [date, setDate] = useState<Date>(new Date());
  return (
    // <View style={styles.menuContainer}>
    //   <Navbar title={"Income"} backButton={<Ionicons name="arrow-back" size={32} color="white"/>} />
    //   <ScrollView
    //     style={{ flex: 1 }}
    //     contentContainerStyle={styles.scrollContainer}
    //   >
    //     <Text>Income Entry</Text>
    //   </ScrollView>
    // </View>
    <EntryCard title="Income Entry">
      {/* <Input label="Income Date"  />  */}
     <CustomDateInput/>
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
