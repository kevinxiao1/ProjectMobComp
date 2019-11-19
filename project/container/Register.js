import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage,} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: '',
          nama : '',
          alamat : '',
        }
      }

      change(text){
        this.setState({
          username : text
        })
      }
      changep(text){
        this.setState({
          password : text
        })
      }

      changef(text){
        this.setState({
          nama : text
        })
      }

      changea(text){
        this.setState({
          alamat : text
        })
      }

      Register (){
        // fetch('http://192.168.43.149:19006/MobileComputing/ProjectMobComb/project/php/', {
        //   method: 'POST',
        //   headers: {
        //     'Accept': 'application/json',
        //     'Content-Type': 'application/json',
        //   },
        //   body: JSON.stringify({
        
        //     name: this.state.name,
        
        //     username: this.state.username,
        
        //     password: this.state.password,

        //     address : this.state.address,
        
        //   })
        
        // }).then((response) => response.json())
        //       .then((responseJson) => {
        
        // // Showing response message coming from server after inserting records.
        //         Alert.alert(responseJson);
  
        // }).catch((error) => {
        //   console.error(error);
        // });

        let request = require("request");
        let arr = []
        let user = this.state.username
        console.log(user)

        var options = { method: 'GET',
          url: 'http://lapakkamera.local:8080/handler.php',
          qs: { method: 'executeQuery', query: 'select * from user' },
          headers: 
          { 'cache-control': 'no-cache',
            Connection: 'keep-alive',
            Cookie: 'PHPSESSID=41edqtis301hndf2rvm5hicr5r',
            'Accept-Encoding': 'gzip, deflate',
            Host: 'lapakkamera.local:8080',
            'Postman-Token': 'ad5f38f5-182e-4c22-b989-af7d918743f2,2e5ad3d2-f07e-49fb-9e94-278a2df8d0da',
            'Cache-Control': 'no-cache',
            Accept: '*/*',
            'User-Agent': 'PostmanRuntime/7.19.0' } };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(JSON.parse(body));
          arr = JSON.parse(body);
          console.log(arr);
          
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].username == user) {
              alert("username sudah terdaftar")
            }
          }
          
})
      }

      render() {
        return (
          
          <View style={styles.container}>
            <Text style={{fontWeight : "bold", color:"blue", fontSize : 20}}>Register Page</Text>
            <TextInput style={styles.input}
              placeholder="username"
              onChangeText={(t) =>  this.change(t)}
              value={this.state.username}
            />
            <TextInput style={styles.input}
              placeholder="password"
              onChangeText={(t) =>  this.changep(t)}
              value={this.state.password}
            />
            <TextInput style={styles.input}
              placeholder="Full Name"
              onChangeText={(t) =>  this.changef(t)}
              value={this.state.nama}
            />
            <TextInput style={styles.input}
              placeholder="Address"
              onChangeText={(t) =>  this.changea(t)}
              value={this.state.alamat}
            />
            <Button
              title="Login"
              onPress={() => this.Register()}
            />
            <Text>Already have an Account? <Text style={{color: 'blue'}}onPress={() => this.props.navigation.navigate('Login')}>Log in Here</Text> </Text>
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
  input : {
    borderRadius : '5%',
    borderColor : 'black',
    margin : 3,
    borderWidth : 2,
  },
});