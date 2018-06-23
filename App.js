import React from 'react';
import { StyleSheet, Button, View, TouchableOpacity } from 'react-native';
import Svg,{
    Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop} from 'react-native-svg';

import Hexagons from './Hexagons.js'
import TestComponent from './TestComponent'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color:"orange",
      playPieces:[{id:0, x:90, y:350, l:55}],
      hexObject:{},
    }
  }

  generateHex(x,y,l){
    let coordArray = [];
    let hexCoords = "";
    let apoth = (Math.sqrt(3)/2*l);

    let testObj = {x:x, y:y, l:l};//building the object to be stored in state

    for (var i = 0; i <= 5; i++) {
      if(i == 0){
        coordArray.push(x);
        coordArray.push(y);
      } else if(i == 1){
        coordArray.push(x+l);
        coordArray.push(y);
      }else if(i == 2){
        coordArray.push(x + (1.5*l));
        coordArray.push(y - apoth);
      }else if(i == 3){
        coordArray.push(x + l);
        coordArray.push(y - (2*apoth));
      }else if(i == 4){
        coordArray.push(x);
        coordArray.push(y - (2*apoth));
      }else if(i == 5){
        coordArray.push(x - (0.5*l));
        coordArray.push(y - apoth);
      }
    }

    //parses the array and creates text
    for (var i = 0; i <= coordArray.length - 1; i++) {
      if(i%2 === 0){
        hexCoords += coordArray[i] + ',';
      } else {
        hexCoords += coordArray[i]+' ';
      }
    }
    testObj.polyCoords = hexCoords;

    testObj.adjCoords = {x:172.5, y:302.3686027918559}

        //this.setState({hexObject:{x:15}});
    console.log(testObj);
    //console.log(this.state.hexObject);
    return hexCoords;
  }

  hexCreator(){
    return (
      <Polygon
        points={this.generateHex(90,350,55)}
        fill={this.state.color}
        scale='1'
        stroke="purple"
        strokeWidth="1"        
        onPress={this.drawAdjacentHexes}
      />);
  }

  hexOn = () => {

  }

  drawAdjacentHexes = () => {
    //this will search all adjacent coords and draw them....but how will it return it?
    //
    //there needs to be single consistent tracker for all game pieces
    //

  }

  render() {
    return (
      <View style={styles.container}>
      
      <Svg
        height="500"
        width="400">
        {this.hexCreator()}

      </Svg>
        <TestComponent />
        <Button
          title="+"
          onPress={this.hexOn}
        />      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
