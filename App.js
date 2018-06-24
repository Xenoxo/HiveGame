import React from 'react';
import { StyleSheet, Button, View, TouchableOpacity, Text } from 'react-native';
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
      adjacentHexes:[],
      showAdjacent: false,
      tmp:[{id:0, x:90, y:350, l:55}, {id:1, x:172.5, y:302.3686027918559, l:55}, {id:2, x:25, y:15, l:55}],
      hexObject:{},
    }
  }

  //generateHexCoordsCoords
  generateHexCoords(x,y,l){
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
    return hexCoords;
  }

  hexCreator(){
    return ( //https://stackoverflow.com/questions/35471921/programmatically-add-a-component-in-react-native
      <Polygon
        points={this.generateHexCoords(90,350,55)}
        fill={this.state.color}
        scale='1'
        stroke="purple"
        strokeWidth="1"        
        onPress={this.drawAdjacentHexes}
      />);
  }

  hexToggle = () => {
    let arr = this.state.playPieces;
    //console.log('before removing '+arr[0]);
    if ( arr.length > 0 ) {
      arr.pop()
      this.setState({playPieces:arr});
    } else {
      arr.push({id:0, x:90, y:350, l:55});
      this.setState({playPieces:arr});
      console.log('in the else');
    }
  }

  drawAdjacentHexes = () => {
    //all adjacent hexes are stored as an object in each Hex object, when I click here, this goes through the list of adj hexes and draws them all
    let xcoord = 90;
    let ycoord = 350;
    let apoth = ((Math.sqrt(3)/2)*55);

    let tempAdj = [];

    for ( var i = 0; i < 6; i++ ){
      console.log('generating adj hex #'+i);
      if(i == 0){
        tempAdj.push({x:xcoord, y:ycoord - (2 * apoth), l:55});
      }
      //  else if(i == 1){
      //   coordArray.push(x+l);
      //   coordArray.push(y);
      // }else if(i == 2){
      //   coordArray.push(x + (1.5*l));
      //   coordArray.push(y - apoth);
      // }else if(i == 3){
      //   coordArray.push(x + l);
      //   coordArray.push(y - (2*apoth));
      // }else if(i == 4){
      //   coordArray.push(x);
      //   coordArray.push(y - (2*apoth));
      // }else if(i == 5){
      //   coordArray.push(x - (0.5*l));
      //   coordArray.push(y - apoth);
      // }
    }
    this.setState({
      adjacentHexes:tempAdj,
      showAdjacent:!this.state.showAdjacent,
    });
    // this.state.adjacentHexes.length >= 1 && this.state.showAdjacent;
    

    // }
    // console.log('here is the temp adj hexes: '+ JSON.Stringify(tempAdj) );
    //console.log('here is the temp adj hexes: '+JSON.Stringify(tempAdj[0], null, 4));
  }

  render() {
    let adjHexes;
    
    let Arr = this.state.playPieces.map((a, i) => {
      let {x, y, l} = a;
      console.log('What we see in the render() ' + a.x);
      return (
        <Polygon
          key={i}
          points={this.generateHexCoords(x, y, l)}
          fill={this.state.color}
          scale='1'
          stroke="purple"
          strokeWidth="1"        
          onPress={this.drawAdjacentHexes}
        />);
    });

    if (this.state.adjacentHexes.length >= 1 && this.state.showAdjacent){
      console.log('SHOULD ONLY SEE THIS IF YOU CLICK');
      adjHexes = this.state.adjacentHexes.map((a, i) => {
        let {x, y, l} = a;
        // console.log('What we see in the render() ' + a.x);
        return (
          <Polygon
            key={i}
            points={this.generateHexCoords(x, y, l)}
            fill={this.state.color}
            scale='1'
            stroke="purple"
            strokeWidth="1"        
            // onPress={this.drawAdjacentHexes}
          />);
      });
    }

    // console.log('ARR AFTER PROCESSING ' + Arr);

    return (
      <View style={styles.container}>
      <Svg
        height="400"
        width="400"
      >
        { Arr }
        { adjHexes }
      </Svg>
        <Button
          title="add/subtract"
          onPress={this.hexToggle}
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
