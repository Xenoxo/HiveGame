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
      playPieces:[],
      adjacentHexes:[],
      HEX_EDGE:55,
      HEX_APOTHEM:0,
      showAdjacentOfHexID: -1,
      createHex: true,
      hexObject:{},
    }
  }

  getInitialState(){
    //this.setState({HEX_APOTHEM:(Math.sqrt(3)/2 * this.state.HEX_EDGE)});
  }

  componentWillMount(){ //called once before render and doesn't cause re-render
    this.setState({HEX_APOTHEM:(Math.sqrt(3)/2 * this.state.HEX_EDGE)});
  }

  createHex(x, y){ // temporary method to generate a hex
    if (this.state.createHex){
      this.spawnHex(x, y)
    } else {
      let arr = this.state.playPieces;
      arr.pop()
      this.setState({ playPieces:arr });
    }
    this.setState({ createHex: !this.state.createHex });
  }

  //This method creates a completely new Hex, intended for new play pieces
  spawnHex = (x, y, move) => {
    let arr = this.state.playPieces,
        hexCoords = this.generateHexCoords(x, y),
        adjHexCoords = this.populateAdjacentHexCoords(x, y),
        tmpObj = { x:x, y:y, hexCoords:hexCoords, adjHexCoords:adjHexCoords };
    if (move){ // Used only if hex coords need to be updated
      arr[this.state.showAdjacentOfHexID] = tmpObj;
    } else { // Used only to generate new playPieces
      arr.push(tmpObj);
    }
    this.setState({
      playPieces:arr,
      showAdjacentOfHexID:-1
    });
  }

  //  INPUT an X and Y coordinate
  //  RETURNS coord string
  //
  generateHexCoords(x, y){
    let hexCoords = "";
    let R = this.state.HEX_EDGE;
    let apoth = this.state.HEX_APOTHEM;
    let temp_playPieces = {...this.state.playPieces};
    for (var i = 0; i <= 5; i++) {
      switch (i){
        case 0:
          hexCoords += (x + ',' + y + ' ');
          break;
        case 1:
          hexCoords += ((x + R) + ',' + y + ' ');
          break;
        case 2:
          hexCoords += ((x + (1.5 * R)) + ',' + (y + apoth) + ' ');
          break;
        case 3:
          hexCoords += ((x + R) + ',' + (y + (2 * apoth)) + ' ');
          break;
        case 4:
          hexCoords += (x + ',' + (y + (2 * apoth)) + ' ');
          break;
        case 5:
          hexCoords += ((x - (0.5 * R)) + ',' + (y + apoth) + ' ');
          break;
      }
    }
    return hexCoords;
  }  

  //  Given an x and y coords, will return an array with each index having a {X, Y} coord representing all 6 adjacent hexes
  populateAdjacentHexCoords = (x, y) => {
    let R = this.state.HEX_EDGE;
    let apoth = this.state.HEX_APOTHEM;
    let adjHexCoords = [];
    for ( var i = 0; i < 6; i++ ){
      switch (i){
        case 0:
          adjHexCoords.push({x:x, y:y - (2 * apoth)});
          break;
        case 1:
          adjHexCoords.push({x:x + (1.5 * R), y:y - apoth});
          break;
        case 2:
          adjHexCoords.push({x:x + (1.5 * R), y:y + apoth});
          break;
        case 3:
          adjHexCoords.push({x:x, y:y + (2 * apoth)});
          break;
        case 4:
          adjHexCoords.push({x:x - (1.5 * R), y:y + apoth});
          break;
        case 5:
          adjHexCoords.push({x:x - (1.5 * R), y:y - apoth});
          break;
      }
    }
    console.log("from poplateAdjacentHexCoords = " + adjHexCoords);
    return adjHexCoords;
  }

  // This method will loop through the adjHex array of the given hex and draw them
  toggleAdjacentHexes(id){
    if (this.state.showAdjacentOfHexID > -1 ) {
      this.setState({ showAdjacentOfHexID:-1 });
    } else {
      this.setState({ showAdjacentOfHexID : id });  
    }
    // console.log("you pressed a hex with id = "+id)
  }

  render() {
    let adjHexes, Arr;
    if (this.state.playPieces.length > 0 ) {
      Arr = this.state.playPieces.map((a, i) => {
        let { hexCoords } = a;
        return (
          <Polygon
            key={i}
            points={hexCoords}
            fill={this.state.color}
            scale='1'
            stroke="purple"
            strokeWidth="1"        
            onPress={ () => this.toggleAdjacentHexes(i) }
          />);
      });
    }

    if ( this.state.showAdjacentOfHexID > -1 ){
      adjHexes = this.state.playPieces[this.state.showAdjacentOfHexID].adjHexCoords.map((a, i) => {
        let { x, y } = a;
        //console.log("show adjacent x,y is= "+x + ", "+y);
        return (
          <Polygon
            key={i}
            points={this.generateHexCoords(x, y)}
            fill={"none"}
            scale='1'
            stroke="purple"
            strokeWidth="1"        
            onPress={ () => this.spawnHex(x, y, true) }
          />);
      });
    }

    return (
      <View style={styles.container}>
      <Svg
        height="400"
        width="400"
        fill="green"
      >
        { Arr }
        { adjHexes }
      </Svg>
        <Button
          title="add/subtract"
          onPress={ (x, y) => this.createHex(90, 100) }
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


// THINGS TO DO //
// 