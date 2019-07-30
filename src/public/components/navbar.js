import React, { Component } from 'react'
import { Header, Left, Button, Icon, Body, Title, Right, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'

export default class Navbar extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Header style={{ backgroundColor: '#85b555' }} androidStatusBarColor={'#85b555'}>

                <Left>
                    <Button transparent>
                        <Icon name="menu" />
                    </Button>
                </Left>
                <Body>
                    <Title>Libraryku</Title>
                </Body>
                <Right>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={{ marginHorizontal: 10 }}><Text style={{ color: '#fff' }}>Login</Text></TouchableOpacity>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}><Text style={{ color: '#fff' }}>Register</Text></TouchableOpacity>
                </Right>
            </Header>
        )
    }
}