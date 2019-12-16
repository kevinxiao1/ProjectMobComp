import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage,FlatList, TouchableOpacity, Image, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {NavigationActions, StackActions} from 'react-navigation';

export default class History extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: '',
          status : '',
        }
      }

      Back(){
        this.props.navigation.navigate('TabNavigator')
      }
      render() {
        return (
          
          <View style={styles.container}>
          
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
            <Text style={{fontWeight : "bold", color:"blue", fontSize : 20}}>Cart Page</Text>

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
      upperLeft:{
        flex : 1,
        backgroundColor: 'white',
        alignItems : 'flex-start',
        justifyContent : 'flex-start'
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
});
