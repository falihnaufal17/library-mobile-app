import React, { Component } from 'react'
import { Image, StyleSheet, AsyncStorage as storage } from 'react-native'
import { Form, Item, Label, Input, Button, Text, Card, CardItem, Body, Container, Content, Toast } from 'native-base'

//import redux
import { connect } from 'react-redux'
import { login } from '../../public/redux/actions/user'

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
            <Container style={styles.container}>
                <Content>
                    <Image source={require('../../assets/logo/logo.png')} style={styles.imgCenter} />
                    <Card style={{ marginTop: 30 }}>
                        <CardItem header style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Login</Text>
                        </CardItem>
                        <Form>
                            <Item floatingLabel style={{
                                marginHorizontal: 20
                            }}>
                                <Label>Email</Label>
                                <Input
                                    keyboardType='email-address'
                                    onChangeText={email => this.setState({ email })} />
                            </Item>
                            <Item floatingLabel style={{
                                marginHorizontal: 20
                            }}>
                                <Label>Password</Label>
                                <Input
                                    secureTextEntry={true}
                                    onChangeText={password => this.setState({ password })}
                                />
                            </Item>
                            <Button success rounded style={{
                                marginHorizontal: 20,
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
                    </Card>
                </Content>
                <Text style={{ marginVertical: 20, fontFamily: 'sans-serif', color: 'teal', fontSize: 10, textAlign: 'center' }}>Powered by: React Native</Text>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 20
    },
    imgCenter: {
        width: 250,
        height: 100,
        margin: 0
    }
})

const mapStateToProps = state => {
    return {
        users: state.user.userList
    }
}

export default connect(mapStateToProps)(Login)