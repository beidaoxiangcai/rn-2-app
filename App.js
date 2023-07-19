import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import Header from './components/header'
import StartGameScreen from './screen/startGameScreen';
import GameScreen from './screen/gameScreen';
import GameOver from './screen/gameOver';

export default function App() {
  const [selectedNumber, setSelectedNumber] = useState();
  const [gameRounds, setGameRounds] = useState(0);
  const gameOver = (rounds) => {
    setGameRounds(rounds);
  }

  const startGameHandler = (number) => setSelectedNumber(number);
  const newGameHandler = () => {
    setGameRounds(0);
    setSelectedNumber();
  }

  let content = <StartGameScreen startGame = {startGameHandler}/>;
  if(selectedNumber && gameRounds <= 0){
    content = <GameScreen userChoice = {selectedNumber} gameOver = {gameOver}/>;
  }else if(gameRounds > 0){
    content = <GameOver rounds = {gameRounds} userChoice = {selectedNumber} newGame = {newGameHandler}/>
  }


  return (
    <View style={styles.container}>
      <Header title = "Guess A Number"/>
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
