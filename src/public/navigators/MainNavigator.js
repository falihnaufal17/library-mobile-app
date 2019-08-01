import { createStackNavigator, createAppContainer } from 'react-navigation'
import React from 'react'
import { StatusBar } from 'react-native'
import Profile from '../../screens/profile/Profile'
import Home from '../../screens/home/Home'
import Login from '../../screens/login/Login'
import Register from '../../screens/register/Register'
import Detail from '../../screens/detail/Detail'

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: { header: null }
        },
        Login: { screen: Login, navigationOptions: { header: null } },
        Register: { screen: Register, navigationOptions: { header: null } },
        Detail: {
            screen: Detail, navigationOptions: {
                header: (<StatusBar backgroundColor='transparent' barStyle='dark-content' />),

            }
        },
        Profile: {
            screen: Profile,
        }
    },
    {
        headerMode: 'none',
        initialRouteName: 'Home'
    })
export default createAppContainer(AppNavigator)