// import { createBottomTabNavigator } from 'react-navigation-tabs';
// import {createAppContainer} from "react-navigation";

// import Profile from '../src/container/Profile';
// import History from '../src/container/History';
// import Home from '../src/container/tes';

// import React from 'react';
// import {FontAwesome} from '@expo/vector-icons';

// const MainNavigator = createBottomTabNavigator(
//     {
//         Profile: {
//             screen: Profile,
//             navigationOptions: {
//                 tabBarLabel : "Profile",
//                 tabBarIcon: ({focused}) =>{
//                     return(
//                         <FontAwesome
//                         name = ''
//                         size = {32}
//                         color = {focused ? 'green': null}
//                         ></FontAwesome>
//                     )
//                 }
//             }
//         },
//         History: {
//             screen: History,
//             navigationOptions: {
//                 tabBarLabel : "Log",
//                 tabBarIcon: ({focused}) =>{
//                     return(
//                         <FontAwesome
//                         name = 'user'
//                         size = {32}
//                         color = {focused ? 'green': null}
//                         ></FontAwesome>
//                     )
//                 }
//             }
//         },
//         Home: {
//             screen: Home,
//             navigationOptions: {
//                 tabBarLabel : "home",
//                 tabBarIcon: ({focused}) =>{
//                     return(
//                         <FontAwesome
//                         name = 'user'
//                         size = {32}
//                         color = {focused ? 'green': null}
//                         ></FontAwesome>
//                     )
//                 }
//             }
//         },
//     },
//     //config
//     {
//         initialRouteName: 'Home',
//         tabBarOptions: {
//             labelStyle:{fontSize: 20},
//             style: {
//                 height : 75,

//             },
//             activeTintColor: 'green',
//             inactiveTintColor : 'black',
//         }
//     }
// )

// const TabNavigator = createAppContainer(MainNavigator);

// export default TabNavigator;