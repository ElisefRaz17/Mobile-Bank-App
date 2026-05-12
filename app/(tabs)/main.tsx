<<<<<<< HEAD
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
=======
import AccountCard from "@/components/ui/accountcard";
import TransactionDisplay from "@/components/ui/transactiondisplay";
import { fetchUserAttributes } from "aws-amplify/auth";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text } from "react-native";
import Toast from "react-native-toast-message";
import { useAuth } from "../features/auth/AuthContext";
import { getUsersAccounts } from "../services/accountService";
import { getUsersTransactions } from "../services/transactionService";
import AddBankAccount from "./add-bank-account";
>>>>>>> develop
const incomeIcon = require("../../assets/images/income-icon.svg");
const transferIcon = require("../../assets/images/transfer-icon.svg");
const expenseIcon = require("../../assets/images/expense-icon.svg");

const MainScreen = () => {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
<<<<<<< HEAD
=======
  const [userName, setUsername] = useState<string | undefined>();
>>>>>>> develop
  const buttonData = [
    {
      name: "Income",
      icon: incomeIcon,
      link: "/income-entry",
<<<<<<< HEAD
      className:"incomeButton"
=======
      className: "incomeButton",
>>>>>>> develop
    },
    {
      name: "Transfer",
      icon: transferIcon,
      link: "/add-bank-account",
<<<<<<< HEAD
      className:"transferButton"
=======
      className: "transferButton",
>>>>>>> develop
    },
    {
      name: "Expense",
      icon: expenseIcon,
      link: "/expense-entry",
<<<<<<< HEAD
      className:"expenseButton"
    },
  ];
  useEffect(() => {
=======
      className: "expenseButton",
    },
  ];
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const userDetails = await fetchUserAttributes();
        setUsername(userDetails?.name);
      } catch (err) {
        setUsername("");
        Toast.show({ type: "error", text1: `${err}` });
      }
    };
    fetchUserDetails();
  }, []);
  useEffect(() => {
>>>>>>> develop
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

<<<<<<< HEAD
    useEffect(() => {
    const fetchUserTransactions= async () => {
=======
  useEffect(() => {
    const fetchUserTransactions = async () => {
>>>>>>> develop
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
<<<<<<< HEAD
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
=======

  if (accounts.length > 0) {
    return (
      <ScrollView style={[styles.container]}>
        <div style={styles.mainContainer}>
          <div style={styles.header}>
            <Text style={styles.headerTitle}>
              Hi, {userName?.split(" ")[0]}
            </Text>
            <Image source={require("../../assets/images/bell-icon.png")} />
          </div>
          <AccountCard accounts={accounts} />
          <div style={styles.linkContainer}>
            {buttonData.map((button) => (
              <Pressable
                key={button.name}
                style={[
                  styles[button.className as keyof typeof styles] as any,
                  {
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    justifyContent: "center",
                    alignItems: "center",
                  },
                ]}
                onPress={() => router.push(button.link as any)}
              >
                <Image source={button.icon} />
                <Text style={styles.linkText}>{button.name}</Text>
              </Pressable>
            ))}
          </div>
          <TransactionDisplay transactions={transactions} />
        </div>
      </ScrollView>
    );
  }
  return <AddBankAccount />;
>>>>>>> develop
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
<<<<<<< HEAD
    width:105,
    height:35
  },
   transferButton: {
=======
    width: 105,
    height: 35,
  },
  transferButton: {
>>>>>>> develop
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#87CEEB",
    backgroundColor: "#87CEEB",
<<<<<<< HEAD
    width:105,
    height:35
=======
    width: 105,
    height: 35,
>>>>>>> develop
  },
  expenseButton: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#FFA07A",
    backgroundColor: "#FFA07A",
<<<<<<< HEAD
    width:105,
    height:35
=======
    width: 105,
    height: 35,
>>>>>>> develop
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
<<<<<<< HEAD
    alignItems:'center'
=======
    alignItems: "center",
>>>>>>> develop
  },
  linkContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 25,
<<<<<<< HEAD
    alignItems:'center',
    justifyContent:"center",
    backgroundColor:"#F1F5F9",
    borderRadius:20,
    padding:12,
    width:359
=======
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
    borderRadius: 20,
    padding: 12,
    width: 359,
>>>>>>> develop
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
<<<<<<< HEAD
    width:'100%'
=======
    width: "100%",
>>>>>>> develop
  },
  headerTitle: {
    color: "#FAFAFA",
    fontFamily: "Inter",
    fontSize: 20,
    fontWeight: 600,
  },
});
export default MainScreen;
