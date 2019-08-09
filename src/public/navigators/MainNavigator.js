import { createStackNavigator, createAppContainer } from 'react-navigation'
import React from 'react'
import Profile from '../../screens/profile/Profile'
import Home from '../../screens/home/Home'
import Login from '../../screens/login/Login'
import Register from '../../screens/register/Register'
import Detail from '../../screens/detail/Detail'
import { Text } from 'react-native';

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
                header: null
            }
        },
        Profile: {
            screen: Profile,
            navigationOptions: {
                // headerTintColor: '#ffffff',
                // headerRight: <Text style={{ marginHorizontal: 30, color: '#ffffff', fontSize: 20 }}>Profile</Text>,
                // headerStyle: { backgroundColor: '#85b555' },
                header: null
            }
        }
    },
    {
        initialRouteName: 'Register'
    }
)
export default createAppContainer(AppNavigator)