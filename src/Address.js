import React, { Component } from 'react';
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';

export default class Address extends Component {

  constructor(props) {
     super(props);
     this.state = {
       data:"",
     };
  }
  
  render() {
    return (
        <View style={styles.container}>
        <Text>Address</Text>
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