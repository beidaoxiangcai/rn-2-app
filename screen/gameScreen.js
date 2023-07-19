import React, { useState, useRef, useEffect } from "react";
import Card from "../components/card";
import SelectedNumber from "../components/selectedNumber";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

const generateNumberBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNumber = Math.floor((max - min) * Math.random()) + min;
    if(rndNumber === exclude){
        return generateNumberBetween(min, max, exclude);
    }else{
        console.log(rndNumber);
        return rndNumber;
    }
}

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(generateNumberBetween(1, 100, props.userChoice));
    const currentMin = useRef(1);
    const currentMax = useRef(100);
    const [rounds,setRounds] = useState(0);

    const {gameOver, userChoice} = props;
    //为什么要进行对象解构，只为了简化写法？
     
    useEffect(() => {
        //console.log('useEffect');
        if(currentGuess == userChoice){
            gameOver(rounds)
        }
    }, [currentGuess, userChoice, gameOver])//为什么userChoice和gameOver也要写


    const generateNextNumber = (direction) => {
        if(direction === "lower" && currentGuess < props.userChoice || direction === "greater" && currentGuess > props.userChoice){
            Alert.alert("Don't lie", "You know this is wrong", [{text:"Sorry", style:'cancel'}]);
            return;
        }
        if(direction === "lower"){
            currentMax.current = currentGuess;
        }else{
            currentMin.current = currentGuess;
        }
        const nextNumber = generateNumberBetween(currentMin.current, currentMax.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(round => round + 1);
    }

    return (
        <View style = {styles.screen}>
            <Text>opponent's guess</Text>
            <SelectedNumber>{currentGuess}</SelectedNumber>
            <Card style = {styles.buttonContainer}>
                <Button title = "LOWER" onPress={generateNextNumber.bind(this, "lower")}/>
                <Button title = "GREATER" onPress={generateNextNumber.bind(this, "greater")}/>
            </Card>
        </View>
    )

} 

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    buttonContainer: {
        width: 300,
        maxWidth: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    }
})

export default GameScreen;