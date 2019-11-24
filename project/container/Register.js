import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import { throws } from 'assert';
export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: '',
          nama : '',
          alamat : '',
          cpass : '',
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

      changec(text){
        this.setState({
          cpass : text
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
        if (this.state.username != "" && this.state.password != "" & this.state.alamat != "" && this.state.nama != "" && this.state.cpass != "") {
          if (this.state.password == this.state.cpass) {
            let request = require("request");
            let arr = []
            let user = this.state.username
            let password = this.state.password;
            let name = this.state.nama;
            let address = this.state.alamat;
            let ada = false;
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

              arr = JSON.parse(body);
              console.log(arr);
              
              for (let i = 0; i < arr.length; i++) {
                if (arr[i].username == user) {
                  ada = true;
                }
              }

              if (ada == true) {
                alert("username sudah terdaftar")
              }
              else{
                var request = require("request");

                var options = { method: 'POST',
                  url: 'http://lapakkamera.local:8080/handler.php',
                  qs: 
                  { method: 'executeNonQuery',
                    query: "INSERT INTO USER(username,password,name,address) VALUES('" + user +"','"+ password + "','" + name + "','" + address + "')" },
                  headers: 
                  { 'cache-control': 'no-cache',
                    Connection: 'keep-alive',
                    'Content-Length': '0',
                    Cookie: 'PHPSESSID=36rttgenk4rms491ge6vsttehs',
                    'Accept-Encoding': 'gzip, deflate',
                    Host: 'lapakkamera.local:8080',
                    'Postman-Token': '75bfa28c-0b09-491b-a09b-79de978540ff,a7a6166e-db84-4081-a2a8-7bb243ada1ae',
                    'Cache-Control': 'no-cache',
                    Accept: '*/*',
                    'User-Agent': 'PostmanRuntime/7.19.0',
                    address: address,
                    name: name,
                    password: password,
                    username: user } };

                request(options, function (error, response, body) {
                  if (error) throw new Error(error);

                  alert("Berhasil Register!")
                  
                });
              }
              
            })
            }
            else{
              alert("Konfirmasi Password salah")
            }
          }
          
        else{
          alert("semua field harus terisi")
        }
        
      }

      render() {
        return (
          
          <View style={styles.container}>
          <Image style= {{margin:5, width : 175, height : 50}}
          source={require('../assets/logo-plazakamera-recolor.png')
          }></Image>
            <Text style={{fontWeight : "bold", color:"black", fontSize : 20}}>Register</Text>

            <TextInput style={styles.input}
              placeholder="Username"
              onChangeText={(t) =>  this.change(t)}
              value={this.state.username}
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
            <TextInput style={styles.input}
              placeholder="Password"
              onChangeText={(t) =>  this.changep(t)}
              value={this.state.password}
            />
            <TextInput style={styles.input}
              placeholder="Confirm Password"
              onChangeText={(t) =>  this.changec(t)}
              value={this.state.cpass}
            />
            <View style={styles.stylebutton}>
            <Button
              title="Register"
              onPress={() => this.Register()}
            />

            </View>
            
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
    height:40,
    width:200,
    borderWidth : 2,
  },
  stylebutton:
  {
    width:200

    

  },
});