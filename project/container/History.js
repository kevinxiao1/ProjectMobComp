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
        }
      }


      render() {
        return (
          
          <View style={styles.container}>
            
            <View style={styles.upperPart}>
                <View style={styles.upperLeft}>
                <Button
              title="Back"
              //onPress={() => this.Logout()}
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
            <Text style={{fontWeight : "bold", color:"blue", fontSize : 20}}>History Page</Text>
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
