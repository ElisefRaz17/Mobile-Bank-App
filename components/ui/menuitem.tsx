import { router } from "expo-router";
import React from "react";
import { Image, Pressable, StyleSheet , Text} from "react-native";

interface MenuItemProps{
    iconStart:any;
    label:string;
    subLabel:string;
    link?:string;
}
const MenuItem:React.FC<MenuItemProps> = ({iconStart, label, subLabel, link}) => {

    return(
        <Pressable style={styles.container} onPress={()=>router.push(`${link}`)}>
            <Image source={iconStart}/>
            <div style={styles.content}>
                <Text style={styles.labelText}>{label}</Text>
                <Text style={styles.subLabelText}>{subLabel}</Text>
            </div>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container:{
        minWidth:329,
        height:47,
        borderRadius:5,
        borderWidth:1,
        borderColor:"#858BE9",
        backgroundColor:"#E2E8F0",
        display:"flex",
        flexDirection:"row",
        gap:20,
        padding:6
    },
    content:{
        display:"flex",
        flexDirection:"column",
        alignItems:"flex-start",
        gap:1
    },
    subLabelText:{
        color:"#333",
        fontSize:12,
        fontWeight:500
    },
    labelText:{
        color:"#1A1A1A",
        fontSize:14,
        fontWeight:600
    }
})

export default MenuItem;