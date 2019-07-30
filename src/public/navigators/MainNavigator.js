import { createStackNavigator, createAppContainer } from 'react-navigation'
import React from 'react'
import { TouchableOpacity, Text, StatusBar } from 'react-native'
import Home from '../../screens/home/Home'
import Login from '../../screens/login/Login'
import Register from '../../screens/register/Register'
import Detail from '../../screens/detail/Detail'
import Navbar from '../../public/components/navbar'
import { View, H1 } from 'native-base';

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: (<H1 style={{ color: 'white', paddingHorizontal: 20, fontWeight: 'bold' }}>Libraryku</H1>),
                    headerRight: (
                        <>
                            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginHorizontal: 10 }}><Text style={{ color: '#fff' }}>Login</Text></TouchableOpacity>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')} style={{ marginHorizontal: 10 }}><Text style={{ color: '#fff' }}>Register</Text></TouchableOpacity>
                            <StatusBar backgroundColor='#85b555' barStyle='light-content' />
                        </>),
                    headerStyle: {
                        backgroundColor: '#85b555'
                    },
                }
            }
        },
        Login: { screen: Login },
        Register: { screen: Register },
        Detail: {
            screen: Detail, navigationOptions: {
                header: (<StatusBar backgroundColor='transparent' barStyle='dark-content' />),

            }
        },
    },
    {
        initialRouteName: 'Detail'
    })
export default createAppContainer(AppNavigator)