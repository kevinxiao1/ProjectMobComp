import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage, FlatList, TouchableOpacity, Image, Dimensions} from 'react-native';
import NumberFormat from 'react-number-format';
import {NavigationActions, StackActions} from 'react-navigation';
import NumericInput from 'react-numeric-input';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          nama : '',
          category : '',
          products : [],
          jumlah : '',

        }
      }
      changej(text){
        this.setState({
          jumlah : text
        })
      }
      Add = async() =>{
          let arr = await AsyncStorage.getItem('Cart')

          if (arr != null) {
            arr =JSON.parse(arr)
            arr.push({
              ygbeli : AsyncStorage.getItem('yglogin'),
              id : this.state.products[0].ProductID,
              jumlah : this.state.jumlah,
              harga : this.state.products[0].Price * this.state.jumlah
            })

            await AsyncStorage.setItem('Cart', JSON.stringify(arr))
          }
          else{
            arr = []
            arr.push({
              ygbeli : AsyncStorage.getItem('yglogin'),
              id : this.state.products[0].ProductID,
              jumlah : this.state.jumlah,
              harga : this.state.products[0].Price * this.state.jumlah
            })
            await AsyncStorage.setItem('Cart', JSON.stringify(arr))
          }

          alert('berhasil add to cart')
          this.Back();
      }

      Back(){
        this.props.navigation.navigate('Home')
      }

      renderProduct = ({item}) =>(
        // <TouchableOpacity style={styles.productContainer}>
        //     <View style={{flex: 3, justifyContent:'center'}}>
        //         <Image
        //             style={{width: 140, height: 140}}
        //             source={require('../assets/' + item.imgSource)}
        //         ></Image>
        //     </View>
        //     <View style={{flex: 1}}>
        //         <Text>{item.ProductName}</Text>
        //         <NumberFormat value={item.Price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} />
        //     </View>
        // </TouchableOpacity>
        <View>
          <View style={{flex: 4, justifyContent:'center', alignItems:"center", marginTop: 60}}>
                <Image
                    style={{width: 250, height: 250, resizeMode:'fit', borderWidth: 3, shadowColor: 'grey', shadowRadius: 1}}
                    source={require('../assets/' + item.imgSource)}
                ></Image>
            </View>
            <View style={{flex: 1, marginTop: 10}}>
                <Text>Name : {item.ProductName}</Text>
                <Text>Category : {item.CategoryID}</Text>
                <Text>Price <NumberFormat value={item.Price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></Text>
            </View>
            <View style={{flexDirection:"row", alignItems:"center"}}>
              <View>
              <NumericInput className="form-control" min={0} onChangeText={(t) =>  this.changej(t)} value={this.state.password}/>
              </View>
              <View>
              <Button
                title="Add To Cart"
                onPress={() => this.Add()}
              />
              </View>
            </View>
            
            {/* <TextInput style={styles.input}
              placeholder="Jumlah"
              onChangeText={(t) =>  this.changej(t)}
              value={this.state.password}
            /> */}
            
            <Button
              title="Go Back"
              onPress={() => this.Back()}
            />
        </View>
      )

      mapProduct(){
        const data = this.state.products;
        let listsrc = [];
        for (let i = 0; i < data.length; i++) {
          listsrc.push(data[i].imgSource)
        }
        let list = data.map((item,idx) => {
            return(
              <TouchableOpacity style={styles.productContainer}
              onPress={()=> alert(item.ProductID)}>
                  <View style={{flex: 3, justifyContent:'center'}}>
                      <Image
                          style={{width: 100, height: 100}}
                          source={require('../assets/' + item.imgSource)}
                      ></Image>
                  </View>
                  <View style={{flex: 1}}>
                      <Text>{item.ProductName}</Text>
                      <Text>{this.state.category}</Text>
                      <Text><NumberFormat value={item.Price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></Text> 
                  </View>
              </TouchableOpacity>
            )
  
        })
    }

      componentWillMount(){
          this.tampilDetail()
      }

      isiDetail(arr){
          let array = []
          array = arr;
          let temp = ''

          if (array[0].CategoryID == '1') {
            temp = 'Camera'
          }
          else{
            temp = 'Lens'
          }
          console.log('category : ' + temp)
          this.state.category = temp
          this.setState({
              nama : array[0].ProductName,
              category : temp
          }, alert(this.state.category))
      }

      tampilDetail = async() =>{
        var request = require("request");
        var page = this
        let arr = []
        let id = await AsyncStorage.getItem("tampilDetail")
        //CASE WHEN CategoryID=1 THEN 'Camera' ELSE 'LENS'
        var options = { method: 'GET',
          url: 'http://lapakkamera.local:8080/handler.php',
          qs: 
          { method: 'executeQuery',
            query: "SELECT ProductID, ProductName, CASE WHEN CategoryID='1' THEN 'Camera' Else 'Lens' END as CategoryID , Price, imgSource FROM PRODUCT where ProductID='" + id + "'" },
          headers: 
          { 'cache-control': 'no-cache',
            Connection: 'keep-alive',
            Cookie: 'PHPSESSID=sgpjd344vsei3hrvgf9oh7vbgc',
            'Accept-Encoding': 'gzip, deflate',
            Host: 'lapakkamera.local:8080',
            'Postman-Token': '1ba496c8-d9e1-4be3-b471-e597238d7bca,3a15360f-20e2-4bd2-a4ed-8fda416a3e6f',
            'Cache-Control': 'no-cache',
            Accept: '*/*',
            'User-Agent': 'PostmanRuntime/7.19.0' } };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          arr = JSON.parse(body);
          page.setState({
            products : arr
          })
          console.log(page.state.products)
          page.isiDetail(arr)
        });
      }
      render() {
        return (
          
          <View style={styles.container}>
            <Text style={{fontWeight : "bold", color:"blue", fontSize : 20}}>Detail Page</Text>
            <FlatList
              data={this.state.products}
                renderItem={(obj) => this.renderProduct(obj)}
                keyExtractor={(item)=> item.ProductID + item.ProductName}
                 numColumns={2}
            ></FlatList>
            {/* <TextInput style={styles.input}
              placeholder="Jumlah"
              onChangeText={(t) =>  this.changej(t)}
              value={this.state.password}
            />
            <Button
              title="Add To Cart"
              onPress={() => this.Add()}
            />
            <Button
              title="Go Back"
              onPress={() => this.Back()}
            /> */}
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
  },
  input : {
    borderRadius : '5%',
    borderColor : 'black',
    margin : 3,
    borderWidth : 2,
  },
  productContainer:{
    width: layar.width* 0.4,
    height: layar.height*0.3,
    borderWidth: 1,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
},
});
