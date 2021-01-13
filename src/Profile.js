import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default class Profile extends Component {

  constructor(props) {
     super(props);
     this.state = {
       data:"",
     };
  }

  render() {
    return (
      <View style={styles.container}>
         <Text>Profile</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create ({

    container: {
        flex:1,
        alignItems: 'center', 
        justifyContent: 'center'
}
});