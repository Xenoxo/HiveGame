import React, { Component } from 'react';
import { StyleSheet, Button, Text, View, TouchableOpacity } from 'react-native';

export default class TestComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: 'orange',
    };
  }

  render() {
    return (
      <Text>
        This better work
      </Text>
    );
  }
}
