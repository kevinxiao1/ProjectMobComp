import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, FlatList, TouchableOpacity, Dimensions, Image} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import { SearchBar } from 'react-native-elements';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: '',
          status : '',
          search: '',
          //products : [],
        }
      }

      updateSearch = search => {
        this.setState({ search });
      };

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
        onPress={()=> alert(item.ProductID)}>
            <View style={{flex: 3, justifyContent:'center'}}>
                <Image
                    style={{width: 100, height: 100}}
                    source={require('../assets/D90.jpg')}
                ></Image>
            </View>
            <View style={{flex: 1}}>
                <Text>{item.ProductName}</Text>
            </View>
        </TouchableOpacity>
      )

    //   mapProduct(){
    //     const data = this.state.products;
  
    //     let list = data.map((item) => {
    //         return(
    //           <TouchableOpacity style={styles.productContainer}
    //           onPress={()=> alert(item.ProductID)}>
    //               <View style={{flex: 3, justifyContent:'center'}}>
    //                   <Image
    //                       style={{width: 100, height: 100}}
    //                       source={require('../assets/D90.jpg')}
    //                   ></Image>
    //               </View>
    //               <View style={{flex: 1}}>
    //                   <Text>{item.ProductName}</Text>
    //               </View>
    //           </TouchableOpacity>
    //         )
  
    //     })
    // }


    //   getProduct(){
    //     var request = require("request");
    //     var page = this
    //     let arr = []

    //     var options = { method: 'GET',
    //       url: 'http://lapakkamera.local:8080/handler.php',
    //       qs: 
    //       { method: 'executeQuery',
    //         query: 'SELECT ProductID, ProductName, CategoryID, Price, imgSource FROM PRODUCT' },
    //       headers: 
    //       { 'cache-control': 'no-cache',
    //         Connection: 'keep-alive',
    //         Cookie: 'PHPSESSID=sgpjd344vsei3hrvgf9oh7vbgc',
    //         'Accept-Encoding': 'gzip, deflate',
    //         Host: 'lapakkamera.local:8080',
    //         'Postman-Token': '1ba496c8-d9e1-4be3-b471-e597238d7bca,3a15360f-20e2-4bd2-a4ed-8fda416a3e6f',
    //         'Cache-Control': 'no-cache',
    //         Accept: '*/*',
    //         'User-Agent': 'PostmanRuntime/7.19.0' } };

    //     request(options, function (error, response, body) {
    //       if (error) throw new Error(error);

    //       arr = JSON.parse(body);
    //       page.setState({
    //         products : arr
    //       })
    //       console.log(page.state.products)
    //     });

    //   }

    //   componentWillMount(){
    //     this.getProduct();
    //   }

      Logout(){
          this.props.navigation.navigate('Login')
      }

      render() {
        const { search } = this.state;
        return (
          
            
          <View style={styles.container}>

            <View style={styles.upperPart}>
                <View style={styles.upperLeft}>
                    <Text>tes1</Text>
                </View>
                <View style={styles.logo}>
                    <Image style= {{margin:5, width : 175, height : 50}}
                    source={require('../assets/logo-plazakamera-recolor.png')
                    }></Image>
                </View>
                <View style={styles.cart}>
                    <Ionicons name ="md-cart" size={50} color ="grey"/>
                </View>
            </View>

            <View style={styles.search}>
                <View style={styles.searchstyle}>
                    <SearchBar
                    // leftIconContainerStyle={{backgroundColor:'white'}}
                    
                    //   inputStyle={{backgroundColor: 'white'}}
                    //   containerStyle={{backgroundColor: 'white', borderWidth: 1, borderRadius: 5}}
                    //   placeholderTextColor={'#g5g5g5'}
                      placeholder={'Search'} onChangeText={this.updateSearch}
                      value={search}
                    />
                </View>
                <View style={styles.stylebutton}>
                    <Button title="Search" onPress={() => {alert("Search")}}></Button>
                
                </View>
                
            </View>
          
            <Text style={{fontWeight : "bold", color:"black", fontSize : 20}}>Product</Text>
            <FlatList
              data={this.state.products}
                renderItem={(obj) => this.renderProduct(obj)}
                keyExtractor={(item)=> item.ProductID + item.ProductName}
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
      //flexDirection : 'column'
      width: '100%',
      height: '100%',
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
      borderstyle:{
          width: 1
      },
      cart:
      {
        flex : 1,
        //backgroundColor: 'white',
        alignItems : 'flex-end',
        justifyContent : 'flex-end'
        
      },
      stylebutton:{
        flex: 1,
        alignItems : 'flex-end',
        justifyContent : 'flex-end'
      },

      logo:{
        flex : 1,
        backgroundColor: 'white',
        alignItems : 'center',
        justifyContent : 'center'
      },

      upperPart:
      {
        //flex : 0.5,
        padding : 15,
        width : '100%',
        alignItems : 'center',
        //justifyContent : 'center',
        backgroundColor : 'white',
        flexDirection : 'row'
      },
      upperLeft:{
        flex : 1,
        backgroundColor: 'white',
        alignItems : 'flex-start',
        justifyContent : 'flex-start'
       },

       searchstyle:{
        flex: 1,
        // alignItems : 'center',
        // justifyContent : 'center'
         alignItems : 'flex-start',
         justifyContent : 'flex-start'
       },


       search:{
       // flex:1,
        padding : 15,
        width : '100%',
        alignItems : 'center',
        //justifyContent : 'center',
        backgroundColor : 'white',
        flexDirection : 'row'
       },

  });
