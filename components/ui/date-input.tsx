import React, { useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";

export default function CustomDateInput() {
  const [selectedDate, setSelectedDate] = useState("");

  // Handle web-specific date input
  const handleWebChange = (event: any) => {
    setSelectedDate(event.target.value);
  };

  if (Platform.OS === "web") {
    return (
      <View style={{ padding: 10 }}>
        <View style={styles.fieldHeader}>
          <Image source={require("../../assets/images/calendar-icon.svg")} />

          <Text>Income Date</Text>
        </View>

        {/* Render native web date input */}
        <input
          type="date"
          value={selectedDate}
          onChange={handleWebChange}
          style={{
            padding: "10px",
            borderRadius: "10px",
            border: "1px solid #858BE9",
            fontSize: "16px",
            marginTop: "10px",
            width: 290,
          }}
        />
      </View>
    );
  }

  // Fallback for mobile (e.g., using @react-native-community/datetimepicker)
  return <Text>Mobile Date Picker goes here</Text>;
}

const styles = StyleSheet.create({
  fieldHeader: {
    display: "flex",
    flexDirection: "row",
    gap: 10,
  },
});
