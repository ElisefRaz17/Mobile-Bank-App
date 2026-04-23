import React from "react";
import { Image, Pressable, StyleSheet, Text } from "react-native";
interface AccountProps {
  accounts: any[];
}
const AccountCard: React.FC<AccountProps> = ({ accounts }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Text style={styles.cardTitle}>My Accounts</Text>
        <Pressable style={styles.editButton}>
          <Text style={styles.buttonTitle}>Edit Bank</Text>
        </Pressable>
      </div>
      <div style={styles.accountContainer}>
        {accounts.map((account) => (
          <div style={styles.accountBox} key={account.id}>
            <Text style={[styles.cardText,styles.cardHeader]}><Image source={require("../../assets/images/bank-icon.png")}/> {account.bankName}</Text>
            <Text style={styles.cardText}>Balance</Text>
            <Text style={styles.cardText}>${account.balance}</Text>
          </div>
        ))}
      </div>
    </div>
  );
};
const styles = StyleSheet.create({
  container: {
    width:361,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#F1F5F9",
    backgroundColor: "#F1F5F9",
    padding: 12,
    display: "flex",
    flexDirection: "column",
  },
  cardText:{
    color:"#333",
    fontFamily:"Inter",
    fontSize:14,
    fontWeight:400
  },
  cardHeader:{
    display:'flex',
    flexDirection:"row",
    gap:1
  },
  accountBox: {
    borderRadius: 5,
    width: 104,
    height: 84,
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#CBD5E1",
    display: "flex",
    flexDirection:"column",
    gap:4
  },
  accountContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap:'wrap',
    gap: 8,
  },
  cardTitle: {
    color: "#1A1A1A",
    fontFamily: "Inter",
    fontSize: 16,
    fontWeight: 500,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    borderWidth: 1,
    borderColor: "#858BE9",
    backgroundColor: "rgba(255, 255, 255, 0.00)",
    borderRadius: 5,
    width: 72,
    height: 24,
    display: "flex",
    alignItems: "center",
  },
  buttonTitle: {
    color: "#2D2D2D",
    fontFamily: "Inter",
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 24,
  },
});
export default AccountCard;
