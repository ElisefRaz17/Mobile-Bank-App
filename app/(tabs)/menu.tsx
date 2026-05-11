import MenuItem from "@/components/ui/menuitem";
import Navbar from "@/components/ui/navbar";
import { ScrollView, StyleSheet, View } from "react-native";
const bankManageIcon = require("../../assets/images/bank-manage-icon.png");
const categoryIcon = require("../../assets/images/category-icon.png");
const incomeIcon = require("../../assets/images/income-menu-icon.png");
const expenseIcon = require("../../assets/images/expense-menu-icon.png");
const reportIcon = require("../../assets/images/report-icon.png");
const cashFlowIcon = require("../../assets/images/cash-flow.png");
const profileIcon = require("../../assets/images/profile-icon.png");
const notifIcon = require("../../assets/images/notification-icon.png");
const sqlIcon = require("../../assets/images/sql-icon.png");

const Menu = () => {
  const menuItems = [
    {
      icon: bankManageIcon,
      label: "Bank Management",
      subLabel: "Add, remove, edit bank accounts",
      link:"/add-bank-account"
    },
    {
      icon: categoryIcon,
      label: "Category Management",
      subLabel: "Edit income and expense categoy",
      link:"/add-category"
    },
    {
      icon: incomeIcon,
      label: "Add Income",
      subLabel: "Create new INCOME Entry",
      link:"/add-income-entry"
    },
    {
      icon: expenseIcon,
      label: "Add Expense",
      subLabel: "Create new EXPENSE Entry",
      link:"/add-expense-entry"
    },
    {
      icon: reportIcon,
      label: "View Reports",
      subLabel: "Analyze all your financial data",
      link:"/view-report"
    },
    {
      icon: cashFlowIcon,
      label: "Cashflow Report",
      subLabel: "Money coming-in and going-out",
      link:"/view-cash-report"
    },
    {
      icon: profileIcon,
      label: "My Profile",
      subLabel: "View/Edit profile info",
      link:"/view-profile"
    },
    {
      icon: notifIcon,
      label: "Reminder Notification",
      subLabel: "Receive timely app reminder",
      link:"/reminder"
    },
    {
      icon: sqlIcon,
      label: "Run Query",
      subLabel: "Run SQL query for getting insights",
      link:"/query"
    },
  ];
  return (
    <View style={styles.menuContainer}>
      <Navbar title={"Finance"} />
        <ScrollView
        style={{flex:1}}
          contentContainerStyle={styles.scrollContainer}
        >
          {menuItems.map((menu) => (
            <MenuItem
              key={menu.label}
              label={menu.label}
              subLabel={menu.subLabel}
              iconStart={menu.icon}
              link={menu.link}
            />
          ))}
        </ScrollView>
      {/* </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    flex:1
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 10,
    height:'auto'
  },
  scrollContainer: {
    padding: 20,
    // Adds a 16px gap between all child items
    rowGap: 16,
    flexGrow: 1,
        backgroundColor:"white",
    borderRadius:10
  },
  cardContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    maxWidth: 355,
    display: "flex",
    flexDirection: "column",
    gap: 16,
  },
});

export default Menu;
