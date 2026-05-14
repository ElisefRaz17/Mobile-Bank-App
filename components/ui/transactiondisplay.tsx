import { useAuth } from "@/app/features/auth/AuthContext";
import { getUsersTransactions } from "@/app/services/transactionService";
import React, { useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
interface TransactionProps {
  headerDescription?: string;
  transactions: any[];
}
interface LedgerProps {
  transactionName: string;
  transactionType: "INCOME" | "EXPENSE";
  amount: string;
  date: string;
  category: string;
}
const TransactionLedger: React.FC<LedgerProps> = ({
  transactionName,
  transactionType,
  amount,
  date,
  category,
}) => {
  return (
    <div style={styles.ledgerContainer}>
      <div style={styles.left}>
        <Text style={styles.transactionName}>
          <Image source={require("../../assets/images/transaction-icon.svg")} />
          {transactionName}
        </Text>
        <Text style={styles.accountName}>
          <Image
            width={12}
            height={12}
            source={require("../../assets/images/bank-icon.png")}
          />
          {category}
        </Text>
      </div>
      <div style={styles.right}>
        <Text
          style={[
            styles.amount,
            transactionType === "INCOME"
              ? { color: "#228B22" }
              : { color: "#F00" },
          ]}
        >
          {transactionType === "INCOME" ? "+" : "-"}${amount}
        </Text>
        <Text style={styles.date}>{date}</Text>
      </div>
    </div>
  );
};
const TransactionDisplay: React.FC<TransactionProps> = ({
  headerDescription,
  transactions,
}) => {
  console.log("Transactions", transactions);
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const handleRefreshTransactions = async () => {
    try {
      setLoading(true);
      await getUsersTransactions(user?.userId);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div style={styles.container}>
      <Text style={styles.headerTitle}>
        💰 Your finance on your fingertips ☝️📱
      </Text>
      <div style={styles.transactionSection}>
        <View style={styles.header}>
          <Text style={styles.transactionHeader}>My Transactions</Text>
          {loading ? (
            <Image
              source={require("../../assets/images/spinner.svg")}
              style={{ width: 20, height: 20 }}
            />
          ) : (
            <Pressable onPress={handleRefreshTransactions}>
              <Image
                style={{ width: 20, height: 20 }}
                source={require("../../assets/images/RefreshIcon.png")}
              />
            </Pressable>
          )}
        </View>
        {Array.isArray(transactions) && transactions.length === 0 ? (
          <Text style={styles.unavailableData}>No Transactions Available</Text>
        ) : (
          <>
            {transactions.map((item) => (
              <TransactionLedger
                transactionName={item.name}
                transactionType={item.transactionType}
                amount={item.amount}
                date={item.date}
                category={item.category}
              />
            ))}
          </>
        )}
        <div style={styles.incomeCategoryContainer}>
          <Text style={styles.categoryLabel}>
            Add your income sources e.g. job, freelancing etc.
          </Text>
          <Pressable style={styles.incomeCategoryButton}>
            <Text style={styles.categoryButtonLabel}>Add Category</Text>
          </Pressable>
        </div>
        <div style={styles.expenseCategoryContainer}>
          <Text style={styles.categoryLabel}>
            Add your expense sources e.g. shopping, food etc.
          </Text>
          <Pressable style={styles.expenseCategoryButton}>
            <Text style={styles.categoryButtonLabel}>Add Category</Text>
          </Pressable>
        </div>
      </div>
    </div>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
    width: 375,
    borderTopLeftRadius: 60,
    borderTopRightRadius: 60,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: "white",
    minHeight: 455,
  },
  expenseCategoryButton: {
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    width: 128,
    height: 36,
    borderColor: "#8B0000",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  incomeCategoryButton: {
    borderRadius: 10,
    backgroundColor: "#F0F0F0",
    width: 128,
    height: 36,
    borderColor: "#228B22",
    borderWidth: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryButtonLabel: {
    color: "#2D2D2D",
    fontSize: 12,
  },
  expenseCategoryContainer: {
    backgroundColor: "#FFA07A",
    borderWidth: 1,
    borderColor: "#8B0000",
    borderRadius: 10,
    maxWidth: 337,
    height: 66,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    padding: 6,
  },
  incomeCategoryContainer: {
    backgroundColor: "#98FF98",
    borderWidth: 1,
    borderColor: "#006400",
    borderRadius: 10,
    maxWidth: 337,
    height: 66,
    display: "flex",
    flexDirection: "row",
    gap: 12,
    padding: 6,
  },
  categoryLabel: {
    color: "#333",
    fontSize: 14,
  },
  unavailableData: {
    color: "#000",
    fontSize: 20,
  },
  left: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  },
  right: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  },
  date: {
    color: "#333",
    fontSize: 12,
    fontWeight: 400,
  },
  amount: {
    fontSize: 12,
  },
  headerTitle: {
    color: "#333",
    fontSize: 14,
    fontWeight: 400,
  },
  transactionSection: {
    width: 361,
    borderRadius: 10,
    backgroundColor: "#F1F5F9",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  transactionName: {
    color: "#333",
    fontSize: 14,
    fontWeight: 400,
  },
  accountName: {
    color: "#333",
    fontSize: 12,
    fontWeight: 400,
  },
  transactionHeader: {
    color: "#1A1A1A",
    fontSize: 16,
    fontWeight: 500,
    textAlign: "left",
    display: "flex",
    width: "100%",
  },
  ledgerContainer: {
    width: 341,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#E3E8F0",
    backgroundColor: "#E2E8F0",
    display: "flex",
    justifyContent: "space-between",
  },
});
export default TransactionDisplay;
