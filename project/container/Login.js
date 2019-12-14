import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, Image} from 'react-native';
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

      toTab = async() =>{
        let user = this.state.username;
        await AsyncStorage.setItem('yglogin', user);
      }

      Login = async() =>{
        //untuk non database = uncomment dibawah ini
        //this.props.navigation.navigate('TabNavigator');

        if (this.state.username == "admin" && this.state.password == "admin") {
          
        }
        else{
          let user = this.state.username;
          let pass = this.state.password;
          let arr = [];
          let request = require("request");
          let ada = false;
          let benar = false;
          const navigator = this.props.navigation;
          let page = this

          var options = { method: 'GET',
            url: 'http://lapakkamera.local:8080/handler.php',
            qs: { method: 'executeQuery', query: 'select * from user' },
            headers: 
            { 'cache-control': 'no-cache',
              Connection: 'keep-alive',
              // Cookie: 'PHPSESSID=41edqtis301hndf2rvm5hicr5r',
              'Accept-Encoding': 'gzip, deflate',
              Host: 'lapakkamera.local:8080',
              // 'Postman-Token': 'ad5f38f5-182e-4c22-b989-af7d918743f2,2e5ad3d2-f07e-49fb-9e94-278a2df8d0da',
              'Cache-Control': 'no-cache',
              Accept: '*/*',
              'User-Agent': 'PostmanRuntime/7.19.0' } };

          request(options, function (error, response, body) {
            if (error) throw new Error(error);

            console.log(JSON.parse(body));

            arr = JSON.parse(body);
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].username == user) {
                ada = true
                if (arr[i].password == pass) {
                  benar = true
                }
              }
            }
            if (ada == false) {
              alert("Username belum terdaftar")
            }
            else if (benar == false) {
              alert("password salah")
            }
            else{
              alert("berhasil Login")
              page.toTab();
              //response(NavigationActions.navigate({ routeName: 'TabNavigator' }));
              navigator.navigate('TabNavigator');
            }
          }
          );
        }
      }

      componentDidMount(){
        this.getFromAPI();
    }

    getFromAPI(){
        // var data = new FormData();
        // data.append('param', 0);

        // const arg = {
        //     method: 'POST',
        //     header: {
        //         'Content-Type': 'multipart/form-data',
        //     },
        //     body: data,
        // }
        
        // try{
        //     const response = await fetch('http://lapakkamera.local/MobileComputing/ProjectMobComb/project/php/Register.php', arg);
        //     const responseJSON = await response.json();
        //     console.log(responseJSON);
        //     // this.setState({listProduct: responseJSON});
        // }catch(error){
        //     console.log(error);
        // }
        let request = require("request");

        var options = { method: 'GET',
          url: 'http://lapakkamera.local:8080/handler.php',
          qs: { method: 'executeQuery', query: 'select * from user' },
          headers: 
          { 'cache-control': 'no-cache',
            Connection: 'keep-alive',
            // Cookie: 'PHPSESSID=41edqtis301hndf2rvm5hicr5r',
            'Accept-Encoding': 'gzip, deflate',
            Host: 'lapakkamera.local:8080',
            // 'Postman-Token': 'ad5f38f5-182e-4c22-b989-af7d918743f2,2e5ad3d2-f07e-49fb-9e94-278a2df8d0da',
            'Cache-Control': 'no-cache',
            Accept: '*/*',
            'User-Agent': 'PostmanRuntime/7.19.0' } };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(JSON.parse(body));
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
      render() {
        return (
          
          <View style={styles.container}>
            <Image style= {{margin:5, width : 175, height : 50}}
          source={require('../assets/logo-plazakamera-recolor.png')
          }></Image>
          <Text style={{fontWeight : "bold", color:"black", fontSize : 20}}>Login</Text>
            <TextInput style={styles.input}
              placeholder="Username"
              onChangeText={(t) =>  this.change(t)}
              value={this.state.username}
            />
            <TextInput style={styles.input}
              placeholder="Password"
              onChangeText={(t) =>  this.changep(t)}
              value={this.state.password}
            />
            <View style={styles.stylebutton}>
            <Button style={styles.input}
              title="Login"
              onPress={() => this.Login()}
            />

            </View>
            
            <Text>Don't have an Account? <Text style={{color: 'blue'}}onPress={() => this.props.navigation.navigate('Register')}>Register Here</Text> </Text>
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
