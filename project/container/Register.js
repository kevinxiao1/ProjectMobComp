import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage,} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
export default class Login extends React.Component {
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
          
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{fontWeight : "bold", color:"blue", fontSize : 20}}>Register Page</Text>
            <TextInput
              placeholder="username"
              onChangeText={(t) =>  this.change(t)}
              value={this.state.username}
            />
            <TextInput
              placeholder="password"
              onChangeText={(t) =>  this.changep(t)}
              value={this.state.password}
            />
            <Button
              title="Login"
              onPress={() => this.Login()}
            />
            <Text>Already have an Account? Log in <Text style={{color: 'blue'}}onPress={() => this.props.navigation.navigate('Login')}>Here</Text> </Text>
          </View>
        );
    }
}