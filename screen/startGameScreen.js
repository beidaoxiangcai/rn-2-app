import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert, ScrollView, KeyboardAvoidingView, Dimensions } from "react-native";
import Card from "../components/card";
import Colors from "../constants/colors";
import Input from "../components/input";
import SelectedNumber from "../components/selectedNumber";

const StartGameScreen = (props) => {

    //输入
    const [enteredValue, setEnteredValue] = useState('');
    //是否确认
    const [confirmed, setConfirmed] = useState(false);
    //选择的数字
    const [selectedNumber, setSelectedNumber] = useState();

    //非数字不能输入
    const valueHandler = (text) => {
        setEnteredValue(text.replace(/[^0-9]/g, ''));
    }
    //reset清空输入
    const resetInputHandler = () => {
        setEnteredValue('');
        setConfirmed(false);
    }
    //验证数字
    const confirmedHandler = () => {
        chosenNumber = parseInt(enteredValue);
        //非数字或不是1-99的正数，直接返回
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid Number!", "Number has to be a number between 1 and 99", [{ text: "Okay", onPress: resetInputHandler, style: 'default' }]);
            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredValue('');
        Keyboard.dismiss();
    }

    let comfirmedOutput;
    if (confirmed) {
        comfirmedOutput = (
            <Card style={styles.numberContainer}>
                <Text>You seclected</Text>
                <SelectedNumber>{selectedNumber}</SelectedNumber>
                <Button title="START GAME" onPress={() => props.startGame(selectedNumber)} />
                {/*注意onPress的写法，调用了startGame函数，selectedNumber作为参数*/}
            </Card>
        );
    }


    return (
        <ScrollView>
            <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={10}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.screen}>
                        <Text style={styles.title}> Start A New Game</Text>
                        <Card style={styles.container}>
                            <Text >select a number</Text>
                            <Input style={styles.input} keyboardType='number-pad' maxLength={2} onChangeText={valueHandler} value={enteredValue} />
                            <View style={styles.buttonContainer}>
                                <View style={styles.button}><Button title="reset" onPress={resetInputHandler} color={Colors.accent} /></View>
                                <View style={styles.button}><Button title="comfirm" onPress={confirmedHandler} color={Colors.primary} /></View>

                            </View>
                        </Card>
                        {comfirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        padding: 10
    },
    container: {
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.8,
        maxWidth: '80%', //适应不同的屏幕大小，当屏幕太小时，不超过屏幕的80%
    },
    title: {
        fontSize: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10
    },
    button: {
        width: 100
    },
    input: {
        width: 30,
        textAlign: 'center'
    },
    numberContainer: {
        marginTop: 20,
        alignItems: 'center',
    }
})

export default StartGameScreen;