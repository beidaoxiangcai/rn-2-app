import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const GameOver = (props) => {
    return(
        <View style = {styles.screen}> 
            <Text>Game is over !</Text>
            <Text>Number of rounds : {props.rounds}</Text>
            <Text>Number was {props.userChoice}</Text>
            <Button title = "NEW GAME" onPress={() => props.newGame()}/>
        </View>
        
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default GameOver;