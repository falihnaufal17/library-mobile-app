import { createStackNavigator, createAppContainer } from 'react-navigation'
import React from 'react'
import { TouchableOpacity, Text, StatusBar } from 'react-native'
import { H1 } from 'native-base';
import Profile from '../../screens/profile/Profile'
import Home from '../../screens/home/Home'
import Login from '../../screens/login/Login'
import Register from '../../screens/register/Register'
import Detail from '../../screens/detail/Detail'

const AppNavigator = createStackNavigator(
    {
        Home: {
            screen: Home,
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: (<H1 style={{ color: 'white', paddingHorizontal: 20, fontWeight: 'bold' }}>Libraryku</H1>),
                    headerRight: (
                        <>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                style={{ marginHorizontal: 10 }}>
                                <Text style={{ color: '#fff' }}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Register')}
                                style={{ marginHorizontal: 10 }}>
                                <Text
                                    style={{ color: '#fff' }}>
                                    Register
                                </Text>
                            </TouchableOpacity>
                            <StatusBar backgroundColor='#85b555' barStyle='light-content' />
                        </>),
                    headerStyle: {
                        backgroundColor: '#85b555'
                    },
                }
            }
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
            navigationOptions: ({ navigation }) => {
                return {
                    headerTitle: (<H1 style={{ color: 'white', paddingHorizontal: 20, fontWeight: 'bold' }}>Libraryku</H1>),
                    headerRight: (
                        <>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Login')}
                                style={{ marginHorizontal: 10 }}>
                                <Text
                                    style={{ color: '#fff' }}>
                                    Login
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Register')}
                                style={{ marginHorizontal: 10 }}>
                                <Text style={{ color: '#fff' }}>
                                    Register
                                </Text>
                            </TouchableOpacity>
                            <StatusBar
                                backgroundColor='#85b555'
                                barStyle='light-content'
                            />
                        </>),
                    headerStyle: {
                        backgroundColor: '#85b555'
                    },
                }
            }
        }
    },
    {
        initialRouteName: 'Home'
    })
export default createAppContainer(AppNavigator)