import { getCurrentUser } from "@aws-amplify/auth";
import {
  ScrollView,
  StyleSheet,
  Image,
  Text,
  Pressable,
  Button,
} from "react-native";
import { useAuth } from "../auth/AuthContext";
import AccountCard from "@/components/ui/accountcard";
import { useEffect, useState } from "react";
import { getUsersAccounts } from "../services/accountService";
import Toast from "react-native-toast-message";
import { router } from "expo-router";
import TransactionDisplay from "@/components/ui/transactiondisplay";
import { getUsersTransactions } from "../services/transactionService";
import AddBankAccount from "./add-bank-account";
import AppLayout from "../(app)/_layout";
const incomeIcon = require("../../assets/images/income-icon.svg");
const transferIcon = require("../../assets/images/transfer-icon.svg");
const expenseIcon = require("../../assets/images/expense-icon.svg");

const MainScreen = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const buttonData = [
    {
      name: "Income",
      icon: incomeIcon,
      link: "/income-entry",
      className:"incomeButton"
    },
    {
      name: "Transfer",
      icon: transferIcon,
      link: "/add-bank-account",
      className:"transferButton"
    },
    {
      name: "Expense",
      icon: expenseIcon,
      link: "/expense-entry",
      className:"expenseButton"
    },
  ];
  useEffect(() => {
    const fetchUserAccounts = async () => {
      try {
        const accounts = await getUsersAccounts(user?.userId);
        setAccounts(accounts);
      } catch (err) {
        setAccounts([]);
        Toast.show({ type: "error", text1: `${err}` });
      }
    };
    fetchUserAccounts();
  }, [user?.userId]);

    useEffect(() => {
    const fetchUserTransactions= async () => {
      try {
        const accounts = await getUsersTransactions(user?.userId);
        setTransactions(accounts);
      } catch (err) {
        setTransactions([]);
        Toast.show({ type: "error", text1: `${err}` });
      }
    };
    fetchUserTransactions();
  }, [user?.userId]);
  if(accounts.length > 0){
  return (

    <ScrollView style={[styles.container]}>
      <div style={styles.mainContainer}>
        <div style={styles.header}>
          <Text style={styles.headerTitle}>Hi, {user?.username}</Text>
          <Image source={require("../../assets/images/bell-icon.png")} />
        </div>
        <AccountCard accounts={accounts} />
        <div style={styles.linkContainer}>
          {buttonData.map((button) => (
            <Pressable
              key={button.name}
              style={[
                styles[button.className as keyof typeof styles] as any,
                { display:"flex", flexDirection:"row", gap:1, justifyContent:'center', alignItems:"center" },
              ]}
              onPress={() => router.push(`${button.link}`)}
            >
              <Image source={button.icon} />
              <Text style={styles.linkText}>{button.name}</Text>
            </Pressable>
          ))}
        </div>
        <TransactionDisplay transactions={transactions}/>
      </div>
    </ScrollView>
    
  );}
  return(
    <AddBankAccount/>
  )
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121433",
    padding: 20,
  },
  incomeButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#7D7",
    backgroundColor: "#7D7",
    width:105,
    height:35
  },
   transferButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#87CEEB",
    backgroundColor: "#87CEEB",
    width:105,
    height:35
  },
  expenseButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FFA07A",
    backgroundColor: "#FFA07A",
    width:105,
    height:35
  },
  linkText: {
    color: "#1A1A1A",
    fontFamily: "Inter",
    fontSize: 14,
    fontWeight: "400" as any,
  },
  mainContainer: {
    display: "flex",
    gap: 20,
    flexDirection: "column",
    alignItems:'center'
  },
  linkContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 25,
    alignItems:'center',
    justifyContent:"center",
    backgroundColor:"#F1F5F9",
    borderRadius:20,
    padding:12,
    width:359
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width:'100%'
  },
  headerTitle: {
    color: "#FAFAFA",
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: 600,
  },
});
export default MainScreen;
