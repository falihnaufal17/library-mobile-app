import React, { Component } from 'react'
import { Image, StyleSheet, AsyncStorage as storage } from 'react-native'
import { Form, Item, Label, Input, Button, Text, Card, CardItem, Body, Container, Content, Toast, View } from 'native-base'

//import redux
import { connect } from 'react-redux'
import { login } from '../../public/redux/actions/user'
import { TouchableOpacity } from 'react-native-gesture-handler';

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            users: [],
            email: '',
            password: ''
        }
    }

    login = async (data) => {
        if (this.state.email === '' || this.state.password === '') {
            await Toast.show({
                type: 'warning',
                text: 'isi data yang lengkap yaa :)',
                buttonText: 'Okay',
                duration: 3000
            })
        } else {
            await this.props.dispatch(login(data))
                .then(() => {
                    Toast.show({
                        type: 'success',
                        text: 'login berhasil :)',
                        buttonText: 'Okay',
                        duration: 3000
                    })

                    this.setState({
                        users: this.props.users,
                        email: '',
                        password: ''
                    })
                    //redirect to home
                    this.props.navigation.push('Home')
                    console.warn('LOGIN SUCCESS')
                })
                .catch(() => {
                    Toast.show({
                        type: 'danger',
                        text: 'Oops email atau password salah!',
                        buttonText: 'Coba Lagi',
                        duration: 3000
                    })

                    this.setState({
                        email: '',
                        password: ''
                    })
                })
        }
    }

    render() {
        const { email, password } = this.state

        let data = {
            email: email,
            password: password
        }
        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 0,
                    backgroundColor: '#85b555'
                }}>
                <Text style={{ fontWeight: 'bold', fontSize: 24, color: 'white' }}>Login</Text>
                <Form style={{
                    marginHorizontal: 30
                }}>
                    <Item rounded style={{ marginVertical: 20 }}>
                        <Input
                            style={{ marginHorizontal: 20, color: 'white' }}
                            keyboardType='email-address'
                            onChangeText={email => this.setState({ email: email })}
                            placeholder="email..."
                            placeholderTextColor='white'
                        />
                    </Item>
                    <Item rounded>
                        <Input
                            style={{ marginHorizontal: 20, color: 'white' }}
                            secureTextEntry={true}
                            onChangeText={password => this.setState({ password: password })}
                            placeholder="password..."
                            placeholderTextColor='white'
                        />
                    </Item>
                    <Button success rounded style={{
                        marginVertical: 20,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                        onPress={() => this.login(data)}
                    >
                        <Text style={{
                            width: '100%',
                            textAlign: 'center'
                        }}>Login</Text>
                    </Button>
                </Form>
                <View>
                    <Text style={{ fontFamily: 'sans-serif', color: 'white', fontSize: 10, textAlign: 'center' }}>Dont have account? Register</Text><TouchableOpacity
                        onPress={
                            () => this.props.navigation.navigate('Register')
                        }
                    ><Text
                        style={{
                            fontFamily: 'sans-serif', color: 'white',
                            textAlign: 'center',
                            fontWeight: 'bold',
                            textDecorationLine: 'underline'
                        }}
                    >Here!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.userList
    }
}

export default connect(mapStateToProps)(Login)