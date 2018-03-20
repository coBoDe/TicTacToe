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
  View
} from 'react-native';





type Props = {};
export default class Circle extends Component<Props> {
  render() {
      const { xTranslate, yTranslate, color } = this.props
    return (
      <View style={[styles.container, {
          transform: [
              {translateX: xTranslate ? xTranslate : 10},
              {translateY: yTranslate ? yTranslate : 10}
          ],
          backgroundColor: color ? color : 'black'
      }]}>
            <View style={styles.innerCircle}
             

            /> 
      </View>
    );
  }
}

var Dimensions = require('Dimensions');
var device = Dimensions.get('window');
var squareSize = device.width > device.height ? device.height-120 : device.width-120;
var borderWidth = 3;


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    borderRadius: 50,
    width: (squareSize/3)*0.8,
    height: (squareSize/3)*0.8,
  },
  innerCircle: {
    position: 'absolute',
    width: (squareSize/3)*0.7,
    height: (squareSize/3)*0.7,
    borderRadius: 35, 
    backgroundColor: 'white'
  }
});
