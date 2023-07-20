import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Color from '../constants/colors'

//自定义button
const MainButton = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.6} onPress={props.onPress}>
            <View style = {styles.buttonContainer}>
                <Text style = {styles.buttonText}>{props.children}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonContainer: { 
        backgroundColor: Color.primary,
        paddingVertical:12,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems:'center'
    },
    buttonText: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize: 18
    }
})

export default MainButton;