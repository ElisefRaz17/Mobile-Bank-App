import { Href, Link } from "expo-router";
import React from "react";
import { PressableProps, StyleProp, ViewStyle, Text, Pressable, StyleSheet } from "react-native";

interface ButtonProps extends PressableProps{
    title:string;
    href?:Href<string>;
    style?:StyleProp<ViewStyle>;
}
const Button : React.FC<ButtonProps> = ({title, href, style, ...props}) => {
  const content = (
    <Pressable 
      style={({ pressed }) => [
        styles.button, 
        style, 
        pressed && styles.pressed // Apply feedback style when touched
      ]} 
      {...props}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );

  // If href is provided, wrap content in Expo Router's Link component
  if (href) {
    return (
      <Link href={href} asChild>
        {content}
      </Link>
    );
  }

  return content;
}

const styles = StyleSheet.create({
    button:{
        backgroundColor:"#2B2D50",
        borderRadius:20,
        height:48,
        width:"100%",
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        textTransform:'capitalize',
        color:'white',
        fontSize:16,
        fontWeight:500
    },
    pressed:{
        backgroundColor:"#434684"
    }
})

export default Button