import React from 'react';
import { StyleSheet, Text, View, Button, TextInput, AsyncStorage,TouchableOpacity} from 'react-native';
import {NavigationActions, StackActions} from 'react-navigation';
import NumberFormat from 'react-number-format';

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

      componentWillMount(){
        this.getFromAPI()
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
          
          <View style={styles.container}>
            <Text style={{fontWeight : "bold", color:"blue", fontSize : 20}}>History Page</Text>

            {
            this.state.history.map((el,idx) => {
              return(
              <TouchableOpacity style={styles.productContainer}
                >
                    <View style={{flex: 3, justifyContent:'center'}}>
                    <Text>{el.TransDate}</Text>
                    </View>
                    <View style={{flex: 1, justifyContent:'center'}}>
                        
                        <Text><NumberFormat value={el.Total} displayType={'text'} thousandSeparator={true} prefix={'Rp.'} /></Text> 
                    </View>
                </TouchableOpacity>
              )
            })
          }
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
});
