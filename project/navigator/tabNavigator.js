import { createBottomTabNavigator } from 'react-navigation-tabs';
import {createAppContainer} from "react-navigation";

import Profile from '../container/Profile';
import History from '../container/History';
import Home from '../container/Home';

import React from 'react';
import {FontAwesome} from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';

const MainNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: {
                tabBarLabel : "Home",
                tabBarIcon: ({focused}) =>{
                    return(
                        <FontAwesome
                        name = 'home'
                        size = {32}
                        color = {focused ? 'green': null}
                        ></FontAwesome>
                    )
                }
            }
        },
        
        History: {
            screen: History,
            navigationOptions: {
                tabBarLabel : "History",
                tabBarIcon: ({focused}) =>{
                    return(
                        <FontAwesome
                        name = 'clock-o'
                        size = {32}
                        color = {focused ? 'green': null}
                        ></FontAwesome>
                    )
                }
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                tabBarLabel : "Profile",
                tabBarIcon: ({focused}) =>{
                    return(
                        <FontAwesome
                        name = 'user-circle'
                        size = {32}
                        color = {focused ? 'green': null}
                        ></FontAwesome>
                    )
                }
            }
        },
        
    },
    //config
    {
        initialRouteName: 'Home',
        tabBarOptions: {
            labelStyle:{fontSize: 20},
            style: {
                height : 75,

            },
            activeTintColor: 'green',
            inactiveTintColor : 'black',
        },
        navigationOptions : {
            header: <Text>asdasd</Text>,

        }
    }
)

const TabNavigator = createAppContainer(MainNavigator);

export default TabNavigator;