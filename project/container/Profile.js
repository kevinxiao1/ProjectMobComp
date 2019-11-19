import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage,} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

export default class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: '',
          status : '',
        }
      }


      render() {
        return (
          
          <View style={styles.container}>
            <Text style={{fontWeight : "bold", color:"blue", fontSize : 20}}>Edit Profile Page</Text>
          </View>
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
});
