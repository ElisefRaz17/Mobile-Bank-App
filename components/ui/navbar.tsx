import React from "react";
import { StyleSheet, Text } from "react-native";

interface NavbarProps {
  backButton?: React.ReactNode;
  title: string;
}
const Navbar: React.FC<NavbarProps> = ({ backButton, title }) => {
  return (
    <div style={styles.container}>
      <div style={styles.innerContent}>
      {backButton}
      <Text style={styles.text}>{title}</Text>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  innerContent: {
    display: "flex",
    width: 230,
    justifyContent: "space-between",
    alignItems: "center",
  },
  container: {
    backgroundColor: "#2B2D50",
    display: "flex",
    flexDirection: "row",
    height: 24,
    padding: 24,
    gap: 100,
    color: "white",
    fontFamily: "Inter",
    alignItems: "center",
    width: "100%",
  },
  text: { color: "white" },
});

export default Navbar;
