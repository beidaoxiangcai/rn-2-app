import React, { useState, useRef, useEffect } from "react";
import Card from "../components/card";
import SelectedNumber from "../components/selectedNumber";
import { View, Text, ScrollView, StyleSheet, Alert, FlatList } from "react-native";
import DefaultStyle from "../constants/defaultStyle";
import MainButton from "../components/mainButton";
import { Ionicons } from '@expo/vector-icons'

const generateNumberBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNumber = Math.floor((max - min) * Math.random()) + min;
    if (rndNumber === exclude) {
        return generateNumberBetween(min, max, exclude);
    } else {
        //console.log(rndNumber);
        return rndNumber;
    }
}

const listHandler = (value, index) => {
    return  (
        <View style = {styles.listItem}>
            <Text>#{index}</Text>
            <Text>{value}</Text>
        </View>
    )
}

const renderItemHandler = (listLength, item) => {
    return  (
        <View style = {styles.listItem}>
            <Text>#{listLength - item.index}</Text>
            <Text>{item.item}</Text>
        </View>
    )
}

const GameScreen = (props) => {
    const [currentGuess, setCurrentGuess] = useState(generateNumberBetween(1, 100, props.userChoice));
    const currentMin = useRef(1);
    const currentMax = useRef(100);
    const [rounds, setRounds] = useState(0);
    const [guessNumberList, setGuessNumberList] = useState([currentGuess]);

    const { gameOver, userChoice } = props;
    //为什么要进行对象解构，只为了简化写法？

    useEffect(() => {
        //console.log('useEffect');
        if (currentGuess == userChoice) {
            gameOver(rounds)
        }
    }, [currentGuess, userChoice, gameOver])//为什么userChoice和gameOver也要写


    const generateNextNumber = (direction) => {
        if (direction === "lower" && currentGuess < props.userChoice || direction === "greater" && currentGuess > props.userChoice) {
            Alert.alert("Don't lie", "You know this is wrong", [{ text: "Sorry", style: 'cancel' }]);
            return;
        }
        if (direction === "lower") {
            currentMax.current = currentGuess;
        } else {
            currentMin.current = currentGuess;
        }
        const nextNumber = generateNumberBetween(currentMin.current, currentMax.current, currentGuess);
        setCurrentGuess(nextNumber);
        setRounds(round => round + 1);
        setGuessNumberList((currentList) => [nextNumber, ...currentList]);
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyle.bodyText}>opponent's guess</Text>
            <SelectedNumber>{currentGuess}</SelectedNumber>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={generateNextNumber.bind(this, "lower")}><Ionicons name="remove" size={24} color="black" /></MainButton>
                <MainButton onPress={generateNextNumber.bind(this, "greater")}><Ionicons name="add-outline" size={24} color="black" /></MainButton>
            </Card>

            {/* <ScrollView contentContainerStyle = {styles.listContainer}>
                {guessNumberList.map((value, index) => 
                   listHandler(value, guessNumberList.length-index)
                 )
                }
            </ScrollView> */}

            <FlatList 
                data={guessNumberList}
                renderItem={renderItemHandler.bind(this, guessNumberList.length)}
                keyExtractor={item => item}
                contentContainerStyle = {styles.listContainer}
            />
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
    },
    listContainer:{
        justifyContent: 'flex-end',
        flexGrow: 1
    },
    listItem: {
        flexDirection:'row',
        justifyContent: 'space-between',
        width: 300,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius:10,
        padding: 10,
        marginVertical: 10
    }
})

export default GameScreen;