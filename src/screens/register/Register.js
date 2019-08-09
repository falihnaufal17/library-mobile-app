import React, { Component } from 'react'
import { Image, StyleSheet, ScrollView } from 'react-native'
import { Form, Item, Label, Input, Button, Text, Card, CardItem, Container, Toast, Row, Col, Thumbnail, View } from 'native-base'
import ImagePicker from 'react-native-image-picker'

// import redux
import { connect } from 'react-redux'
import { register, getUser } from '../../public/redux/actions/user'

class Register extends Component {

    constructor(props) {
        super(props)

        this.state = {
            users: [],
            id_card: '',
            name: '',
            email: '',
            password: '',
            image: null,
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

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }

        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ image: response })
            }
        })
    }

    register = async () => {
        if (this.state.idCard === '' || this.state.name === '' || this.state.email === '' || this.state.password === '') {
            Toast.show({
                type: 'warning',
                text: 'Isi data yang lengkap ya :)',
                buttonText: 'Okay',
                duration: 3000
            })
        } else {
            let formdata = new FormData()
            formdata.append('id_card', this.state.id_card)
            formdata.append('name', this.state.name)
            formdata.append('email', this.state.email)
            formdata.append('password', this.state.password)
            formdata.append('image', {
                name: this.state.image.fileName || '',
                type: this.state.image.type || '',
                uri: this.state.image.uri || ''
            })
            formdata.append('idrole', this.state.idrole)
            formdata.append('status', this.state.status)
            formdata.append('isverify', this.state.isverify)
            console.warn('Form data: ', formdata)
            await this.props.dispatch(register(formdata))
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
        const { id_card, name, email, password, image, idrole, status, isverify } = this.state

        return (
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: 0,
                    backgroundColor: '#85b555'
                }}
            >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 24, color: 'white' }}>Register</Text>
                    {
                        image && (
                            <Thumbnail style={{ alignSelf: 'center', marginTop: 10, borderColor: 'white', borderWidth: 3 }} rounded large source={{ uri: image.uri }} resizeMode='cover' />
                        ) || (<Thumbnail style={{ alignSelf: 'center', marginTop: 10, borderColor: 'white', borderWidth: 3 }} rounded large source={require('../../assets/images.png')} resizeMode='cover' />)
                    }
                    <Form style={{ marginHorizontal: 20, marginVertical: 20 }}>
                        <Item rounded>
                            <Input style={{ marginHorizontal: 20, color: 'white' }} onChangeText={id_card => this.setState({ id_card: id_card })} keyboardType="numeric" placeholder="Id Card..." placeholderTextColor="white" />
                        </Item>
                        <Item rounded style={{ marginTop: 20 }}>
                            <Input style={{ marginHorizontal: 20, color: 'white' }} onChangeText={name => this.setState({ name: name })} placeholder="Fullname" placeholderTextColor="white" />
                        </Item>
                        <Item rounded style={{ marginTop: 20 }}>
                            <Input style={{ marginHorizontal: 20, color: 'white' }} keyboardType='email-address' onChangeText={email => this.setState({ email: email })} placeholder="Email Address..." placeholderTextColor="white" />
                        </Item>
                        <Item rounded style={{ marginTop: 20 }}>
                            <Input style={{ marginHorizontal: 20, color: 'white' }} onChangeText={password => this.setState({ password: password })} secureTextEntry={true} placeholder="Password" placeholderTextColor="white" />
                        </Item>
                        <Button rounded style={{ marginTop: 20 }} success onPress={this.handleChoosePhoto}><Text style={{ textAlign: 'center', width: '100%' }}>Choose Image</Text></Button>

                        <Button success style={{ marginTop: 20 }} rounded onPress={() => this.register()}>
                            <Text style={{
                                width: '100%',
                                textAlign: 'center'
                            }}>Register</Text>
                        </Button>
                    </Form>
                </ScrollView>
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.userList
    }
}

export default connect(mapStateToProps)(Register)