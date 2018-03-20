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
  TouchableWithoutFeedback,
  View
} from 'react-native';

import Cross from './Cross'
import Circle from './Circle'

export const Dimensions = require('Dimensions')
export const borderWidth = 3
export const device = Dimensions.get('window')
export const squareSize = device.width > device.height ? device.height-120 : device.width-120

export const centerPoints = [
    { id: 0, x: (borderWidth*3), y: borderWidth*3},
    { id: 1, x: squareSize/3+borderWidth*3, y: borderWidth*3},
    { id: 2, x: squareSize/3*2+borderWidth*3, y: borderWidth*3},
    { id: 3, x: borderWidth*3, y: squareSize/3 + borderWidth*3},
    { id: 4, x: squareSize/3+borderWidth*3, y: squareSize/3 + borderWidth*3 },
    { id: 5, x: squareSize/3*2+borderWidth*3, y: squareSize/3  +borderWidth*3},
    { id: 6, x: borderWidth*3, y: squareSize/3*2+borderWidth*3},
    { id: 7, x: squareSize/3+borderWidth*3, y: squareSize/3*2+borderWidth*3},
    { id: 8, x: squareSize/3*2+borderWidth*3, y: squareSize/3*2+borderWidth*3}
];


export const areas = [
    { id: 0, startX: borderWidth, startY: borderWidth, endX: squareSize/3-borderWidth, endY: squareSize/3-borderWidth },
    { id: 1, startX: squareSize/3, startY: borderWidth, endX: squareSize/3*2-borderWidth, endY: squareSize/3-borderWidth },
    { id: 2, startX: squareSize/3*2, startY: borderWidth, endX: squareSize-borderWidth, endY: squareSize/3-borderWidth },
    { id: 3, startX: borderWidth, startY: squareSize/3, endX: squareSize/3-borderWidth, endY: squareSize/3*2-borderWidth },
    { id: 4, startX: squareSize/3, startY: squareSize/3, endX: squareSize/3*2-borderWidth, endY: squareSize/3*2-borderWidth},
    { id: 5, startX: squareSize/3*2 , startY: squareSize/3, endX: squareSize-borderWidth, endY: squareSize/3*2-borderWidth },
    { id: 6, startX: borderWidth, startY: squareSize/3*2, endX: squareSize/3-borderWidth, endY: squareSize-borderWidth},
    { id: 7, startX: squareSize/3, startY: squareSize/3*2, endX: squareSize/3*2-borderWidth, endY: squareSize-borderWidth},
    { id: 8, startX: squareSize/3*2, startY: squareSize/3*2, endX: squareSize-borderWidth,  endY: squareSize-borderWidth},
]

//if result === -1 game continuing
//if result === 0 user won the game
//if result === 1 AI won the game
//if resutl === 2 no winner

export default class GameBoard extends Component {
    constructor() {
        super()
        this.state = { 
            userInputs: [],
            AIInputs: [], 
            round: 0,
            result: -1
         }
    }
    gameBoardClickHandler (e) {
        const { locationX, locationY } = e.nativeEvent
        const { userInputs, AIInputs } = this.state
        const inputs = userInputs.concat(AIInputs)

        const area = areas.find(d => 
            (locationX >= d.startX && locationX <= d.endX) &&
            (locationY >= d.startY && locationY <= d.endY)
        )

        if(area && inputs.every(d => d != area.id)){
            this.setState( { userInputs: userInputs.concat(area.id) })
            setTimeout( () => this.AIAction(), 3)
        }
    }

    AIAction() {
        while(true) {
            const { userInputs, AIInputs } = this.state
            const inputs = userInputs.concat(AIInputs)
            const randomNumber = Number.parseInt(Math.random() * 9)
            if(inputs.concat(AIInputs).every(d => d != randomNumber)) {
                this.setState({ AIInputs: AIInputs.concat(randomNumber)})
                break
            }
        }   
    }

    componentDidMount() {
        this.AIAction()
    }

    judgeWinner(inputs) {
        
    }

    componentUpdated() {
        const { userInputs, AIInputs, result } = this.state
        const inputs = userInputs.concat(AIInputs)

        if(inputs.length >= 5) {
            let res = this.judgeWinner(userInputs)
            if(res) {
                this.setState( { result: 0 })
                return
            }

            res = this.judgeWinner(AIInputs)
            if(res) {
                this.setState( { result: 1 })
                return
            }
        }

        if(inputs.length == 9 && result !== 2){
            this.setState( {result: 2 })
            return
        }

        

    }
  render() {
    const { userInputs, AIInputs, result } = this.state
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={ e => this.gameBoardClickHandler(e)}>
            <View style={styles.board}>
                <View style={{
                    position: 'absolute',
                    width: borderWidth, 
                    height: squareSize, 
                    backgroundColor: 'black',
                    transform: [
                        {translateX: squareSize/3-borderWidth}
                    ]
                    }}>
                </View> 
                <View style={{
                    position: 'absolute',
                    width: borderWidth, 
                    height: squareSize, 
                    backgroundColor: 'black',
                    transform: [
                        {translateX: squareSize/3*2-borderWidth}
                    ]
                    }}>
                </View>
                <View style={{
                    position: 'absolute',
                    width: squareSize, 
                    height: borderWidth, 
                    backgroundColor: 'black',
                    transform: [
                        {translateY: squareSize/3-borderWidth}
                    ]
                    }}>
                </View>
                <View style={{
                    position: 'absolute',
                    width: squareSize, 
                    height: borderWidth, 
                    backgroundColor: 'black',
                    transform: [
                        {translateY: (squareSize/3)*2-borderWidth}
                    ]
                    }}>
                </View>
                {
                    userInputs.map((d, i ) =>  (
                        <Cross
                            key={i}
                            xTranslate = { centerPoints[d].x}
                            yTranslate = { centerPoints[d].y }
                            color = 'deepskyblue'
                        />      
                    ))
                }

                {
                    AIInputs.map((d, i ) =>  (
                        <Circle
                            key={i}
                            xTranslate = { centerPoints[d].x }
                            yTranslate = { centerPoints[d].y }
                        />      
                    ))
                }
                
            </View>
        </TouchableWithoutFeedback>
        {
            result === 2 && <Text>Sorry, there is no winner</Text>
        }
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    backgroundColor: 'skyblue',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    flex: 1,
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  board: {
      width: squareSize,
      height: squareSize,
      borderWidth: borderWidth,
      borderColor: 'black'
  }
});

console.log(areas);
