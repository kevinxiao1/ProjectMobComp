import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, FlatList, TouchableOpacity, Dimensions, Image, Picker} from 'react-native';
import NumberFormat from 'react-number-format';
import {NavigationActions, StackActions} from 'react-navigation';
import { SearchBar } from 'react-native-elements';

export default class History extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: '',
          status : '',
          history : []
        }
      }

      Back(){
        this.props.navigation.navigate('TabNavigator')
      }
      componentWillMount(){
        this.getFromAPI()
      }

      toCart(){
        this.props.navigation.navigate('Cart')
      }

      getFromAPI = async() =>{
        let request = require("request");
        let yglogin = await AsyncStorage.getItem('yglogin')
        let history = []
        let page =this
        let arr = []

        var options = { method: 'GET',
          url: 'http://lapakkamera.local:8080/handler.php',
          qs: { method: 'executeQuery', query: 'select * from htrans' }};

        request(options, function (error, response, body) {
          if (error) throw new Error(error);


          arr = JSON.parse(body)
          console.log(arr)
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].username == yglogin) {
              console.log(arr[i].Total)
              history.push(arr[i])
            } 
          }

          page.setState({
            history : history
          })

          console.log(page.state.history)
        });
      }


      render() {
        return (
          
          <View>
            
            <View style={styles.upperPart}>
                <View style={styles.upperLeft}>
                <Button
              title="Back"
              onPress={() => this.Back()}
            />
            </View>
                <View style={styles.logo}>
                    <Image style= {{width : 175, height: 50}}
                    source={require('../assets/logo-plazakamera-recolor.png')
                    }></Image>
                </View>
                <View style={styles.cart}>
                  <TouchableOpacity onPress={() =>this.toCart()}>
                    <Ionicons name ="md-cart" size={30} color ="grey"/>
                    </TouchableOpacity>
                </View>
            </View>
            <br></br>
            <View style={styles.container}>

            
            <Text style={{fontWeight : "bold", color:"blue", fontSize : 20}}>History Page</Text>
            <br></br>

            {
            this.state.history.map((el,idx) => {
              return(
              <TouchableOpacity style={styles.productContainer}
                >
                    <View style={{flex: 3, justifyContent:'center'}}>
                      <Text style={{fontSize: 30, fontWeight: "bold"}} >{el.TransDate}</Text>
                    </View>
                    <View style={{flex: 1, justifyContent:'center'}}>
                        
                        <Text style={{fontSize: 20}}><NumberFormat value={el.Total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></Text> 
                    </View>
                </TouchableOpacity>
              )
            })
          }
          </View>
          </View>
        );
    }
}

const layar = Dimensions.get('window')
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    width: '100%',
      height: '100%',
  },
  productContainer:{
    marginTop : 20,
    borderWidth: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center"
  },
  upperPart:
      {
        flex : 0.5,
        padding : 15,
        width : '100%',
        alignItems : 'center',
        justifyContent : 'center',
        backgroundColor : 'white',
        flexDirection : 'row'
      },
  logo:{
    flex : 1,
    backgroundColor: 'white',
    alignItems : 'center',
    justifyContent : 'center'
  },
  cart:
      {
        flex : 1,
        //backgroundColor: 'white',
        alignItems : 'flex-end',
        justifyContent : 'flex-end'
        
      },
      upperLeft:{
        flex : 1,
        backgroundColor: 'white',
        alignItems : 'flex-start',
        justifyContent : 'flex-start'
       },
});
