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
      playPieces:[{id:0, x:90, y:100}],
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

  //Given an x and y coordinate, will return coords for hex given HEX_EDGE size
  generateHexCoords(x,y){
    let hexCoords = "";
    let R = this.state.HEX_EDGE;
    let apoth = this.state.HEX_APOTHEM;

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
    console.log(hexCoords);
    return hexCoords;
  }

  // hexCreator(){
  //   return ( //https://stackoverflow.com/questions/35471921/programmatically-add-a-component-in-react-native
  //     <Polygon
  //       points={this.generateHexCoords(90,350,55)}
  //       fill={this.state.color}
  //       scale='1'
  //       stroke="purple"
  //       strokeWidth="1"        
  //       onPress={this.drawAdjacentHexes}
  //     />);
  // }

  //This method creates a completely new Hex, intended for new play pieces
  hexToggle = () => {
    let arr = this.state.playPieces;
    //console.log('before removing '+arr[0]);
    if ( arr.length > 0 ) {
      arr.pop()
      this.setState({playPieces:arr});
    } else {
      arr.push({id:0, x:90, y:100});
      this.setState({playPieces:arr});
      //console.log('in the else');
    }
  }

  drawAdjacentHexes = () => {
    //all adjacent hexes are stored as an object in each Hex object, when I click here, this goes through the list of adj hexes and draws them all
    let xcoord = 90;
    let ycoord = 100;
    let l = 55;
    let apoth = ((Math.sqrt(3)/2)*55);

    let tempAdj = [];

    for ( var i = 0; i < 6; i++ ){
      console.log('generating adj hex #'+i);
      if(i == 0){
        tempAdj.push({x:xcoord, y:ycoord - (2 * apoth)});
      }
       else if(i == 1){
        tempAdj.push({x:xcoord + (1.5 * l), y:ycoord - apoth});
      }else if(i == 2){
        tempAdj.push({x:xcoord + (1.5 * l), y:ycoord + apoth});
      }else if(i == 3){
        tempAdj.push({x:xcoord, y:ycoord + (2 * apoth)});
      }else if(i == 4){
        tempAdj.push({x:xcoord - (1.5 * l), y:ycoord + apoth});
      }else if(i == 5){
        tempAdj.push({x:xcoord - (1.5 * l), y:ycoord - apoth});
      }
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
            fill="none"
            scale='1'
            stroke="purple"
            strokeWidth="1"        
            // onPress={this.drawAdjacentHexes}
          />);
      });
    }

    console.log('adjHexes AFTER PROCESSING ' + adjHexes);

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
