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
      showAdjacent: false,
      tmp:[{id:0, x:90, y:350}, {id:1, x:172.5, y:302.3686027918559}, {id:2, x:25, y:15}],
      hexObject:{},
    }
  }

  getInitialState(){
    //this.setState({HEX_APOTHEM:(Math.sqrt(3)/2 * this.state.HEX_EDGE)});
  }

  componentWillMount(){ //called once before render and doesn't cause re-render
    this.setState({HEX_APOTHEM:(Math.sqrt(3)/2 * this.state.HEX_EDGE)});
  }

  //  Creates a hex in the playPieces store
  //  Complete with id and adjacent hexes coords
  // 
  spawnHex = (x, y) => {
    let arr = this.state.playPieces;
    
    //  CASE for removing the hex
    //  arbitrary rule for now
    if ( arr.length > 0 ) {
      arr.pop()
      this.setState({ playPieces:arr });
      // console.log (this.state.playPieces);
    } else {
      let hexCoords = this.generateHexCoords(x, y),
          adjHexCoords = this.populateAdjacentHexCoords(x, y),
          tmpObj = { id:1, x:x, y:y, hexCoords:hexCoords, adjHexCoords:adjHexCoords }; //hardcoded the ID for now......
      arr.push(tmpObj);
      this.setState({ playPieces:arr });
    }
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
    console.log(adjHexCoords);
    return adjHexCoords;
  }

  // This method will loop through the adjHex array of the given hex and draw them
  drawAdjacentHexes = () => {
    // console.log(this.state.showAdjacent);
    let showAdjacent = !this.state.showAdjacent;
    this.setState({ showAdjacent: showAdjacent });
    // return this.state.showAdjacent;
  }

  render() {
    let Arr, adjHexes;
    //  The engine to spawn hexes
    //  only spawns what is in the playPieces store
    //
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
            onPress={this.drawAdjacentHexes}
          />);
      });
    }

    if (this.state.showAdjacent){
      let test = this.state.playPieces[0];
          adjHexes = test.adjHexCoords.map((a, i) => {
        // console.log("a is "+a.x +" and y is "+a.y);
        let { x, y } = a;
        return (
          <Polygon
            key={i}
            points={this.generateHexCoords(x, y)}
            fill={this.state.color}
            scale='1'
            stroke="purple"
            strokeWidth="1"        
            onPress={this.drawAdjacentHexes}
          />);
      });      
    } else {
      adjHexes = '';
    }

    return (
      <View style={styles.container}>
      <Svg
        height="400"
        width="400"
        fill="green">
        { Arr }
        { adjHexes }
      </Svg>
        <Button
          title="add/subtract"
          onPress={ (x, y) => this.spawnHex(90, 100) }
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
