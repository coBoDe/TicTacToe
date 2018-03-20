/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Header from './components/Header'
import GameBoard from './components/GameBoard'




export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {gameStarted: false}
  }

  startGame(){
    this.setState({ gameStarted: true})
  }


  render() {
    const {gameStarted } = this.state
    return (
      <View style={styles.container}>
        <Header />
        {
          !gameStarted ? 
          ( 
            <GameBoard />
          ) 
          : 
      (
        <View> 
          <Text style={styles.welcome}>
            Welcome to the game!
          </Text>
          <TouchableOpacity onPress={() => this.startGame()}>
            <Text style={styles.instructions}>
              Click here to start
            </Text>
          </TouchableOpacity>
        </View>
        
        )
      }
      </View>
    
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
