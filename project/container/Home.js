import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, FlatList, TouchableOpacity, Dimensions, Image} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: '',
          status : '',
        }
      }

      state={
        listProduct: [
            {
                id: 1,
                nama: 'barang1'
            },
            {
                id: 2,
                nama: 'barang2'
            },
            {
                id: 3,
                nama: 'barang3'
            },
            {
                id: 4,
                nama: 'barang4'
            },
            {
                id: 5,
                nama: 'barang5'
            },
            {
                id: 6,
                nama: 'barang6'
            },
            // {
            //     id: 7,
            //     nama: 'barang7'
            // },
            // {
            //     id: 8,
            //     nama: 'barang8'
            // },
        ]
      }

      renderProduct = ({item}) =>(
        <TouchableOpacity style={styles.productContainer}
        onPress={()=> alert(item.id)}>
            <View style={{flex: 3, justifyContent:'center'}}>
                <Image
                    style={{width: 100, height: 100}}
                    source={require('../assets/D90.jpg')}
                ></Image>
            </View>
            <View style={{flex: 1}}>
                <Text>{item.nama}</Text>
            </View>
        </TouchableOpacity>
      )

      mapProduct(){
        const data = this.state.listProduct;
  
        let list = data.map((item) => {
            return(
              <TouchableOpacity style={styles.productContainer}
              onPress={()=> alert(item.id)}>
                  <View style={{flex: 3, justifyContent:'center'}}>
                      <Image
                          style={{width: 100, height: 100}}
                          source={require('../assets/D90.jpg')}
                      ></Image>
                  </View>
                  <View style={{flex: 1}}>
                      <Text>{item.nama}</Text>
                  </View>
              </TouchableOpacity>
            )
  
        })
    }

      Logout(){
          this.props.navigation.navigate('Login')
      }

      render() {
        return (
          
          <View style={styles.container}>
            <Text style={{fontWeight : "bold", color:"blue", fontSize : 20}}>Product Page</Text>
            <FlatList
              data={this.state.listProduct}
                renderItem={(obj) => this.renderProduct(obj)}
                keyExtractor={(item)=> item.id + item.nama}
                 numColumns={3}
            ></FlatList>
            <Button
              title="Logout"
              onPress={() => this.Logout()}
            />
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
      justifyContent: 'center',
      flexDirection : 'column'
    },
    productContainer:{
        width: layar.width* 0.4,
        height: layar.height*0.3,
        borderWidth: 1,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnLogin:{
        margin: 10,
        backgroundColor: 'blue',
        width: Dimensions.get('window').width *0.7,
        height: Dimensions.get('window').height *0.05,
        alignItems: 'center',
        justifyContent: 'center',
      },
  });
