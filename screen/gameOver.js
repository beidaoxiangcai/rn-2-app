import React from "react";
import { View, Text, StyleSheet, Button, Image } from "react-native";
import Color from '../constants/colors';
import MainButton from "../components/mainButton";

const GameOver = (props) => {
    return(
        <View style = {styles.screen}> 
            <Text style = {styles.resultContainer}>Game is over !</Text>
            <View style = {styles.imageContainer}>
                <Image 
                //source={require('../assets/lisa.jpg')} 
                source = {{uri:'https://img0.baidu.com/it/u=3513114184,3863055857&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1082'}}
                resizeMode = 'cover' 
                style = {styles.image}
                fadeDuration={1000}
                />
            </View>
            
            <Text style = {styles.resultContainer}>
                your phone needed{' '}<Text style = {styles.highlighted}>{props.rounds}</Text> 
                {' '}rounds to guess the number <Text style = {styles.highlighted}>{props.userChoice}</Text>.
            </Text>
            <MainButton onPress={() => props.newGame()}>NEW GAME</MainButton>
        </View>
        
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderColor: 'black',
        borderWidth: 2,
        overflow: 'hidden'
    },
    image: {
        width: '100%',
        height: '100%',
    },
    resultContainer: {
        fontFamily: 'open-sans',
        fontSize: 22,
        textAlign: 'center',
        margin: 20
    },
    highlighted: {
        color: Color.accent
    }

})

export default GameOver;