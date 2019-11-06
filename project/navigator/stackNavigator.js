import {createAppContainer} from "react-navigation";
import {createStackNavigator} from "react-navigation-stack";
import React from 'react';
import Login from '../container/Login';
import Register from '../container/Register';

import { TouchableOpacity, Text} from "react-native";


//import TabNavigator from './tabNavigator';


const MainNavigator = createStackNavigator({
    Login:{
        screen : Login,
    },
    // TabNavigator:{
    //     screen: TabNavigator,
    // },
    Register: {
        screen : Register,
    },
    },
    //konfigurasi
    {
        initialRouteName: 'Login',
        defaultNavigationOptions: ({navigation}) => ({
            // header: null,
            headerLeft : null,
            headerRight: (
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Text>KANAN</Text>
                </TouchableOpacity>
            )
        
        })
    }
)

const StackNavigator = createAppContainer(MainNavigator);

export default StackNavigator;