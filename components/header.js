import React from "react";
import { StyleSheet, View, Text, Platform } from "react-native";
import Colors from "../constants/colors";

const Header = (props) => {
    return(
     <View style = {styles.header}>
        <Text style = {styles.headerText} >{props.title}</Text>
     </View>
     );
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 90,
        justifyContent: 'center', //垂直居中
        alignItems: 'center', //水平居中
        //backgroundColor: Platform.OS === 'ios'? Colors.primary : Colors.accent,
        backgroundColor: Platform.select({ios:Colors.primary, android: Colors.accent})
    },
    headerText: {
        fontSize: 18,
        color: 'black',
        fontFamily: 'open-sans-bold',
    }   
})

export default Header;