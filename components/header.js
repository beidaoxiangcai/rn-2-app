import React from "react";
import { StyleSheet, View, Text } from "react-native";
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
        backgroundColor: Colors.primary
    },
    headerText: {
        fontSize: 18,
        color: 'black'
    }   
})

export default Header;