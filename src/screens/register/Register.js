import React, { Component } from 'react'
import { Image, StyleSheet, ScrollView } from 'react-native'
import { Form, Item, Label, Input, Button, Text, Card, CardItem, Container, Toast, Row, Col, Thumbnail } from 'native-base'
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
                            <Button style={{
                                marginHorizontal: 20,
                                marginVertical: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }} rounded success onPress={this.handleChoosePhoto}><Text style={{ textAlign: 'center', width: '100%' }}>Choose Image</Text></Button>
                            <Item style={{
                                marginHorizontal: 20,
                                margin: 0, alignItems: 'center', justifyContent: 'center', borderColor: 'transparent'
                            }}>
                                {
                                    image && (
                                        <Thumbnail rounded large source={{ uri: image.uri }} resizeMode='cover' />
                                    )
                                }
                            </Item>
                            <Input type="hidden" style={{ width: 0 }} value="2" />
                            <Button success rounded style={{
                                marginHorizontal: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                                onPress={() => this.register()}>
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