import React from "react";
import { StyleSheet, Text } from "react-native";

interface EntryCardProps{
    title:string;
    description?:string;
    children: React.ReactNode;
}
const EntryCard:React.FC<EntryCardProps> = ({title,description,children}) =>{
    return(
        <div style={styles.container}>
            <Text style={styles.cardTitle}>{title}</Text>
            <hr style={styles.divider}/>
            <div style={styles.formContainer}>
            {children}
            </div>
        </div>
    )
}
const styles = StyleSheet.create({
    container:{
        borderRadius:10,
        // minWidth:355,
        display:"flex",
        flexDirection:"column",
        alignItems:'center',
        height:582,
        backgroundColor:'white'
    },
    cardTitle:{
        color:"#000",
        fontSize:18,
        fontWeight:500,
        lineHeight:24,
        display:'flex',
        alignSelf:'baseline',
        padding:12
    },
    divider:{
        width:"100%",
        height:1,
        backgroundColor:"#858BE9"
    },
    formContainer:{
        padding:24,
        display:"flex",
        flexDirection:'column',
        alignItems:"center"
    }
})
export default EntryCard