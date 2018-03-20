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


var Dimensions = require('Dimensions');
var device = Dimensions.get('window');
var squareSize = device.width > device.height ? device.height-120 : device.width-120;
var borderWidth = 3;


type Props = {};
export default class Cross extends Component<Props> {
  render() {
      const { xTranslate, yTranslate, color } = this.props
    return (
      <View style={[styles.container, {
          transform: [   
              {translateX: xTranslate ? xTranslate : 10},
              {translateY: yTranslate ? yTranslate : 10}
          ],
          
      }]}>
        <View style={[styles.line,{
            transform: [
                {rotate: '45deg'},
                {translateX: 17},
                {translateY: -25}      
            ],
            backgroundColor: color ? color : 'black'
        }]}>
        </View>
        <View style={[styles.line,{
            transform: [
                {rotate: '135deg'},
                {translateX: -25} ,
                {translateY: -17}      
            ],
            backgroundColor: color ? color : 'black'
        }]}>
        </View>
        
        
      </View>
    );
  }
}




const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: (squareSize/3)*0.8,
    height: (squareSize/3)*0.8,
  },
  line: {
    position: 'absolute',
    width: 10,
    height: Math.sqrt((Math.pow((squareSize/3)*0.8,2)+(Math.pow((squareSize/3)*0.8,2))))-20,
  },
});
