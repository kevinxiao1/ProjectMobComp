import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage,} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import { throws } from 'assert';

export default class Profile extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: '',
          nama : '',
          alamat : '',
          cpass : '',
          status : '',
          profile : [],

        }
      }

      componentWillMount(){
        this.getLogin();
      }

      componentWillMount(){
        this.getLogin();
      }

      setLogin(arr){
        let array = []
        array = arr
        
        console.log(array)
        this.setState({
          nama : array[0].name,
          alamat : array[0].address,
          password : array[0].password,
          cpass : array[0].password
        })
      }

      Edit = async() =>{
        var request = require("request");
        var page = this;

        let username = await AsyncStorage.getItem('yglogin')
        let password = this.state.password;
        let alamat = this.state.alamat;
        let name = this.state.nama;

        var options = { method: 'POST',
          url: 'http://lapakkamera.local:8080/handler.php',
          qs: 
          { method: 'executeNonQuery',
            query: "update User set name='"+ name + "',address='"+ alamat + "',password='"+ password + "' where username='" + username + "'" },
          headers: 
          { 'Postman-Token': '3787b32b-1f35-445c-8765-7ea5c377fa94',
            'cache-control': 'no-cache',
            password: '',
            address: '',
            name: '' } };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);
          alert('berhasil update')
          page.getLogin()
        });

      }
      
      getLogin = async() =>{
        var request = require("request");
        let username = await AsyncStorage.getItem('yglogin')
        var page = this;

        var options = { method: 'GET',
          url: 'http://lapakkamera.local:8080/handler.php',
          qs: 
          { method: 'executeQuery',
            query: "SELECT * FROM USER WHERE username='" + username + "'" },
          headers: 
          { 'cache-control': 'no-cache',
            Connection: 'keep-alive',
            Cookie: 'PHPSESSID=sgpjd344vsei3hrvgf9oh7vbgc',
            'Accept-Encoding': 'gzip, deflate',
            Host: 'lapakkamera.local:8080',
            'Postman-Token': '5b255f5a-608b-462e-92b4-907ce09d58ca,59e8ae18-3d58-42a2-8064-a3270f849db8',
            'Cache-Control': 'no-cache',
            Accept: '*/*',
            'User-Agent': 'PostmanRuntime/7.19.0',
            username: username } };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          let arr = JSON.parse(body)
          console.log(arr);
          page.setLogin(arr)
          // page.setState({
          //   profile : arr
          // }, console.log(page.profile))

        });
        
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


      render() {
        return (
          
          <View style={styles.container}>
            <Text style={{fontWeight : "bold", color:"blue", fontSize : 20}}>Edit Profile Page</Text>
            <Text>Name : </Text>
            <TextInput style={styles.input}
              placeholder="Full Name"
              onChangeText={(t) =>  this.changef(t)}
              value={this.state.nama}
            />
            <Text>Address : </Text>
            <TextInput style={styles.input}
              placeholder="Address"
              onChangeText={(t) =>  this.changea(t)}
              value={this.state.alamat}
            />
            <Text>Password : </Text>
            <TextInput style={styles.input}
              placeholder="Password"
              onChangeText={(t) =>  this.changep(t)}
              value={this.state.password}
            />
            <Text>Confirm Password : </Text>
            <TextInput style={styles.input}
              placeholder="Confirm Password"
              onChangeText={(t) =>  this.changec(t)}
              value={this.state.cpass}
            />
            <View style={styles.stylebutton}>
            <Button style={styles.input}
              title="Edit"
              onPress={() => this.Edit()}
            />
            </View>
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
});
