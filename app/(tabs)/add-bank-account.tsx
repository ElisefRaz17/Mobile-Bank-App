import EntryCard from "@/components/ui/entrycard";
import Input from "@/components/ui/input";
import Navbar from "@/components/ui/navbar";
import Button from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { getCurrentUser } from "@aws-amplify/auth";
import { addAccount } from "../services/accountService";
import Toast from "react-native-toast-message";
import { useRouter } from "expo-router";


const AddBankAccount = () => {
    const router = useRouter()
    const [bankName, setBankName] = useState("")
    const [balance, setBalance] = useState("")
    const [bankDetails, setBankDetails] = useState("");
    const [userId, setUserId] = useState("")

    useEffect(() => {
        const fetchUser = async () => {
            const user = await getCurrentUser()
            setUserId(user.userId)
        }
        fetchUser()
    }, [])
  
const handleCreateBankAccount = async() => {
    try{
        const newAccount = await addAccount({bankName,userId,balance,details:bankDetails});
        Toast.show({type:'success', text1:`New Account Added by user ${newAccount?.userId}`});
        router.replace("/(tabs)/main");
    }catch(err){
        console.error(err);
        Toast.show({type:'error', text1:"Failed to add new account"});
    }
}
    return(
        <ScrollView style={styles.container}>
            <Navbar title="Bank Account"/>
            <div style={styles.contentContainer}>
                <Text style={styles.title}>Welcome <Image source={require("../../assets/images/hand.png")}/></Text>
                <Text style={styles.descriptionContainer}>Let’s kickstart your financial journey — add your bank account to get going!</Text>
                        <EntryCard title="Transfer Entry">
                <Input label="Bank Name" value={bankName} onChangeText={setBankName}/>
                <Input label="Balance" value={balance} onChangeText={setBalance}/>
                <Input label="Bank Details like-Min, Balance, note count etc..." value={bankDetails} onChangeText={setBankDetails}/>

                <Button title="Create" onPress={handleCreateBankAccount}/>
            </EntryCard>
            </div>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#121433'
    },
    contentContainer:{
        padding:24,
        gap:12,
        display:'flex',
        flexDirection:'column'
    },
    descriptionContainer:{
        display:'flex',
        minWidth:264,
        maxWidth:400,
        color:'white'
    },
    title:{
        fontWeight:'bold',
        fontSize:20,
        lineHeight:24,
        color:'white',
        display:'flex',
        alignItems:'center'
    }
})

export default AddBankAccount;