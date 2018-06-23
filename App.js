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
      playPiece:{id:0, x:90, y:350, l:55},
    }
  }

  generateHex(x,y,l){
    let coordArray = [];
    let hexCoords = "";
    let apoth = (Math.sqrt(3)/2*l)
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

    for (var i = 0; i <= coordArray.length - 1; i++) {
      if(i%2 === 0)
        hexCoords += coordArray[i] + ',';
      else
        hexCoords += coordArray[i]+" ";
    }
    console.log(hexCoords);
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
        onPress={this.showMoves}
      />);
  }

  showMoves = () => {
    //var test = this.state.playPiece;
    //each hex is stored in a database

    console.log(this.state.playPiece);
  }  

  render() {
    return (
      <View style={styles.container}>
      
      <Svg
        height="500"
        width="400">
        {this.hexCreator()}

      <Polygon
        points={this.generateHex(172.5, 302.3686027918559, 55)}
        fill={this.state.color}
        scale='1'
        stroke="purple"
        strokeWidth="1"
        onPress={this.showMoves}
      />)

      </Svg>
        <TestComponent />
        <Button
          title="create"
          onPress={this.showMoves}
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
