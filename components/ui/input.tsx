import React, { useState } from "react";
import { StyleSheet, TextInput, View, Text, useWindowDimensions, TextInputProps } from "react-native";

interface InputProps extends TextInputProps{
    label:string;
    value:string;
    onChangeText:(value:string)=>void;
}
const Input:React.FC<InputProps> = ({label, value, onChangeText,...props}) => {
      const { width } = useWindowDimensions();
  // Define dynamic width based on screen size
  const isTablet = width >= 768;
  const inputWidth = isTablet ? 600 : width * 0.8;
    return(
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[styles.input, { width: inputWidth }]}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#999"
        {...props} // Spreads additional props like keyboardType or secureTextEntry
      />
    </View>
    )
}

const styles = StyleSheet.create({
    label:{
        display:'flex',
        height:16,
        justifyContent:'center',
        flexDirection:'column',
        fontSize:14,
        color:'#000',
        fontWeight:400,
        marginBottom:10
    },
    input:{
        backgroundColor:'white',
        borderWidth:1,
        borderColor:'#858BE9',
        height:40,
        borderRadius:10,
        padding:12,
        filter:"drop-shadow(0 0 1px rgba(0, 0, 0, 0.04)) drop-shadow(0 2px 6px rgba(0, 0, 0, 0.04)) drop-shadow(0 10px 20px rgba(0, 0, 0, 0.04))"
    },
    container: { marginBottom: 15, width: '100%' }
})

export default Input