import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage,FlatList, TouchableOpacity, Image, Dimensions} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {NavigationActions, StackActions} from 'react-navigation';
import NumericInput from 'react-numeric-input';
import NumberFormat from 'react-number-format';


export default class History extends React.Component {
    constructor(props){
        super(props);
        this.state = {
          username: '',
          password: '',
          status : '',
          products :[],
          cartuser : [],
          total : 0,
        }
      }

      Back(){
        this.props.navigation.navigate('TabNavigator')
      }

      renderProduct = ({item}) =>(
        <TouchableOpacity style={styles.productContainer}>
            <View style={{flex: 3, justifyContent:'center'}}>        
                <Image
                    style={{width: 150,height:150}}
                    source={require('../assets/' + item.img)}
                ></Image>
            </View>
            <View style={{flex: 1, justifyContent:'center'}}>
                <Text>{item.ProductName}</Text>
                <Text><NumberFormat value={item.price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></Text> 
            </View>
            </TouchableOpacity>
      )

      Pay = async() =>{
        var request = require("request");
        var page = this.props;

        var username = await AsyncStorage.getItem('yglogin')
        var Total = this.state.total
        let date = new Date().getDate().toString()
        console.log(date)
        let month = new Date().getMonth().toString()
        console.log(month)
        let year = new Date().getFullYear().toString()
        console.log(year)
        let TransDate = date + "-" + month + "-" + year
        console.log(TransDate)

        var options = { method: 'POST',
          url: 'http://lapakkamera.local:8080/handler.php',
          qs: 
          { method: 'executeNonQuery',
            query: "INSERT INTO htrans(username, Total, TransDate) values('" + username + "','" + Total + "','" + TransDate +"')" },
          headers: 
          { 'cache-control': 'no-cache',
            Connection: 'keep-alive',
            'Content-Length': '0',
            'Accept-Encoding': 'gzip, deflate',
            Host: 'lapakkamera.local:8080',
            'Postman-Token': 'cc813cf0-2db0-40df-a7cf-d943169f514b,fd196138-e735-4420-a0e4-7a21a0b781b7',
            'Cache-Control': 'no-cache',
            Accept: '*/*',
            'User-Agent': 'PostmanRuntime/7.20.1',
            TransDate: TransDate,
            Total: Total,
            username: username } };

        request(options, function (error, response, body) {
          if (error) throw new Error(error);

          console.log(body);

          alert('berhasil bayar')
          AsyncStorage.removeItem('Cart')
          page.navigation.navigate('TabNavigator')
        });

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

            {
            this.state.cartuser.map((el,idx) => {
              return(
              <TouchableOpacity style={styles.productContainer}
                >
                    <View style={{flex: 3, justifyContent:'center'}}>
                        <Image
                            style={{width: 150,height:150}}
                            source={require('../assets/' + el.img)}
                        ></Image>
                    </View>
                    <View style={{flex: 1, justifyContent:'center'}}>
                        <Text>{el.name}</Text>
                        <Text><NumberFormat value={el.harga} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></Text> 
                    </View>
                </TouchableOpacity>
              )
            })
          }
          <Text>Total : <NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></Text> 
          
          <View style={styles.stylebutton}><Button
            title="Bayar"
            onPress={() => this.Pay()}
          />
          </View>
            {/* <Button
            title="Go Back"
            onPress={() => this.Back()}
          /> */}


        {/* <FlatList
           data={this.state.cartuser}
             renderItem={(obj) => this.renderProduct(obj)}
             keyExtractor={(item)=> item.ProductName + item.ygbeli}
              numColumns={1}
         ></FlatList> */}
          
          </View>
           
          
          
        );
    }



    renderProduct = ({item}) =>(
      <TouchableOpacity style={styles.productContainer}
      onPress={() =>this.toDetail(item.ProductID)}>
          <View style={{flex: 3, justifyContent:'center'}}>
            
              <Image
                  style={{width: 150,height:150}}
                  source={require('../assets/' + item.imgSource)}
              ></Image>
          </View>
          <View style={{flex: 1, justifyContent:'center'}}>
              <Text>{item.ProductName}</Text>
              <Text><NumberFormat value={item.Price} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></Text> 
          </View>
      </TouchableOpacity>
    )

    componentWillMount(){
      this.getProduct();
    }


    getProduct = async() =>{
      let tes = [];
       tes = await AsyncStorage.getItem('Cart');

      //  this.setState({
      //   products:tes,
      //  })
       
      //  console.log(this.state.products)

      

      tes = JSON.parse(tes)
      console.log(tes)
       let arruser = []
       let yglogin = await AsyncStorage.getItem('yglogin')
       let total = 0

       for (let index = 0; index < tes.length; index++) {
         if (tes[index].ygbeli == yglogin) {
           console.log("masuk")
           console.log(tes[index])
           arruser.push(tes[index])
           total += tes[index].harga
         }
       }

       this.setState({
            cartuser : arruser,
            total : total,
       })

       console.log(this.state.cartuser)
    }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    //justifyContent: 'center',
    //width: '100%',
    //  height: '100%',
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
