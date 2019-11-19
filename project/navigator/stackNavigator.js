import React from 'react';
import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";


import Login from '../container/Login';
import Register from '../container/Register';
import Admin from '../container/Register';

import { TouchableOpacity, Text, Image} from "react-native";
import TabNavigator from '../navigator/tabNavigator';


const MainNavigator = createStackNavigator({
    Login:{
        screen : Login,
    },
    TabNavigator:{
        screen: TabNavigator,
    },
    Register: {
        screen : Register,
    },
    Admin : {
        screen : Admin
    },
    },
    //konfigurasi
    {
        initialRouteName: 'Login',
        defaultNavigationOptions: ({navigation}) => ({
            header : null,
            headerLeft : null,
            headerRight: (
                <TouchableOpacity>
                    <Text> <Image style={{width:50, height: 50, flex: 1}} resizeMode="contain" source={require('../assets/D90.jpg')}></Image></Text>
                </TouchableOpacity>
            )
        })
    }
)

const StackNavigator = createAppContainer(MainNavigator);

export default StackNavigator;