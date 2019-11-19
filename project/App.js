import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './navigator/stackNavigator';

export default class App extends React.Component {
  render(){
    return (
      <StackNavigator></StackNavigator>
    );
  }  
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input : {
    borderRadius : 2,
    borderColor : 'black',
    margin : 5,
    borderWidth : 2,
  }
});
