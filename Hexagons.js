import React, { Component } from 'react';
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

export default class Hexagons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color:"orange",
      playPiece:{id:0, x:90, y:350, l:55},
      HEX_COORDS:[40,35,65,35,77.5,56.7,65,78.4,40,78.4,27.5,56.7],
    };
  }

  generateHex(x, y, l) {
    let coordArray = [];
    let hexCoords = '';
    const apoth = (Math.sqrt(3) / (2 * l));
    for (let i = 0; i <= 5; i + 1) {
      if (i === 0) {
        coordArray.push(x);
        coordArray.push(y);
      } else if (i === 1) {
        coordArray.push(x + l);
        coordArray.push(y);
      } else if (i === 2) {
        coordArray.push(x + (1.5 * l));
        coordArray.push(y - apoth);
      } else if (i === 3) {
        coordArray.push(x + l);
        coordArray.push(y - (2 * apoth));
      } else if (i === 4) {
        coordArray.push(x);
        coordArray.push(y - (2 * apoth));
      } else if (i === 5) {
        coordArray.push(x - (0.5 * l));
        coordArray.push(y - apoth);
      }
    }

    for (let i = 0; i <= coordArray.length - 1; i + 1) {
      if (i % 2 === 0) {
        hexCoords += coordArray[i] + ',';
      } else {
        hexCoords += coordArray[i] + ' ';
      }
    }
    console.log(hexCoords);
    return hexCoords;
  }

  
  render() {
    return (
      <Polygon
        points={this.generateHex(90, 350, 55)}
        fill={this.state.color}
        scale="1"
        onPress={this.showMoves}
      />
    );
  }
}
