import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import React, { useState } from 'react';
import Header from './components/header'
import StartGameScreen from './screen/startGameScreen';
import GameScreen from './screen/gameScreen';
import GameOver from './screen/gameOver';

import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';


const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};


export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [gameRounds, setGameRounds] = useState(0);

  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    console.log("---------------------------------------------------------");
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
    )
  }

  const gameOver = (rounds) => {
    setGameRounds(rounds);
  }

  const startGameHandler = (number) => setSelectedNumber(number);
  const newGameHandler = () => {
    setGameRounds(0);
    setSelectedNumber();
  }

  let content = <StartGameScreen startGame={startGameHandler} />;
  if (selectedNumber && gameRounds <= 0) {
    content = <GameScreen userChoice={selectedNumber} gameOver={gameOver} />;
  } else if (gameRounds > 0) {
    content = <GameOver rounds={gameRounds} userChoice={selectedNumber} newGame={newGameHandler} />
  }


  return (
    <View style={styles.container}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
