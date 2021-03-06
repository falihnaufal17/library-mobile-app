import React, { Component } from 'react'
import { Header, Left, Icon, Title, Right, Text } from 'native-base'
import { TouchableOpacity } from 'react-native'
import { withNavigation } from 'react-navigation'

class Navbar extends Component {

    constructor(props) {
        super(props)
    }

    text = (text) => {
        if (text.length > 11) {
            let textSplit = text.substr(0, 15);
            return `${textSplit} ...`;
        } else {
            let textSplit = text;
            return `${textSplit}`;
        }
    }
    render() {
        return (
            <Header style={{ backgroundColor: '#85b555' }} androidStatusBarColor={'#85b555'}>

                <Left style={{ marginHorizontal: 20 }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}><Title style={{ fontWeight: 'bold', fontSize: 20 }}>Libraryku</Title></TouchableOpacity>
                </Left>
                <Right>
                    {
                        this.props.iduser && this.props.status === '1'
                            ?
                            <TouchableOpacity style={{ marginHorizontal: 5 }} onPress={() => this.props.navigation.push('Profile', {
                                iduser: this.props.iduser
                            })}><Text>
                                    <Icon name="user" style={{ color: 'white', fontSize: 50 }} type='EvilIcons' />
                                </Text>
                            </TouchableOpacity>
                            :
                            <>
                                <TouchableOpacity onPress={() => this.props.navigation.push('Login')} style={{ marginHorizontal: 10 }}><Text style={{ color: '#fff' }}>Login</Text></TouchableOpacity>
                                <TouchableOpacity onPress={() => this.props.navigation.push('Register')}><Text style={{ color: '#fff' }}>Register</Text></TouchableOpacity>
                            </>
                    }
                </Right>
            </Header>
        )
    }
}
export default withNavigation(Navbar)