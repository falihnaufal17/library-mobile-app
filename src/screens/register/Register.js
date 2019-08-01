import React, { Component } from 'react'
import { Image, StyleSheet, ScrollView } from 'react-native'
import { Form, Item, Label, Input, Button, Text, Card, CardItem, Container, Toast } from 'native-base'

// import redux
import { connect } from 'react-redux'
import { register, getUser } from '../../public/redux/actions/user'

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            id_Card: '',
            name: '',
            email: '',
            password: '',
            idrole: 2,
            status: 0,
            isverify: 'false'
        }
    }

    componentDidMount = async () => {
        await this.props.dispatch(getUser())
        this.setState({
            users: this.props.users
        })
    }

    register = async (data) => {
        if (this.state.idCard === '' || this.state.name === '' || this.state.email === '' || this.state.password === '') {
            Toast.show({
                type: 'warning',
                text: 'Isi data yang lengkap ya :)',
                buttonText: 'Okay',
                duration: 3000
            })
        } else {
            await this.props.dispatch(register(data))
                .then(() => {
                    Toast.show({
                        type: 'success',
                        text: 'Registrasi berhasil! :)',
                        buttonText: 'Okay',
                        duration: 3000
                    })
                    this.setState({
                        users: this.props.users
                    })

                    this.props.navigation.navigate('Home')
                })
                .catch(() => {
                    Toast.show({
                        type: 'danger',
                        text: 'Email sudah digunakan!',
                        buttonText: 'Coba Lagi!',
                        duration: 3000
                    })

                    this.setState({
                        email: ''
                    })
                })
        }
    }

    render() {
        const { id_Card, name, email, password, idrole, status, isverify } = this.state

        let data = {
            id_card: id_Card,
            name: name,
            email: email,
            password: password,
            idrole: idrole,
            status: status,
            isverify: isverify
        }

        return (
            <Container style={styles.container}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <Image source={require('../../assets/logo/logo.png')} style={styles.imgCenter} />
                    <Card>
                        <CardItem header style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Register</Text>
                        </CardItem>
                        <Form>
                            <Item floatingLabel style={{
                                marginHorizontal: 20
                            }}>
                                <Label>ID Card</Label>
                                <Input onChangeText={id_card => this.setState({ id_card })} keyboardType="numeric" />
                            </Item>
                            <Item floatingLabel style={{
                                marginHorizontal: 20
                            }}>
                                <Label>Fullname</Label>
                                <Input onChangeText={name => this.setState({ name })} />
                            </Item>
                            <Item floatingLabel style={{
                                marginHorizontal: 20
                            }}>
                                <Label>Email</Label>
                                <Input keyboardType='email-address' onChangeText={email => this.setState({ email })} />
                            </Item>
                            <Item floatingLabel style={{
                                marginHorizontal: 20
                            }}>
                                <Label>Password</Label>
                                <Input onChangeText={password => this.setState({ password })} secureTextEntry={true} />
                            </Item>
                            <Input type="hidden" style={{ width: 0 }} value="2" />
                            <Button success rounded style={{
                                marginHorizontal: 20,
                                marginVertical: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                                onPress={() => this.register(data)}>
                                <Text style={{
                                    width: '100%',
                                    textAlign: 'center'
                                }}>Register</Text>
                            </Button>
                        </Form>
                    </Card>
                </ScrollView>
            </Container>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.userList
    }
}

export default connect(mapStateToProps)(Register)
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 20,
        marginVertical: 20
    },
    imgCenter: {
        width: 250,
        height: 100,
    }
})