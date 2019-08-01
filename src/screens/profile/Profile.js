import React, { Component } from 'react'
import { Image, ScrollView, AsyncStorage as storage } from 'react-native'
import { Card, CardItem, Text, Row, Col, View, H3, Badge, Button, Icon, Toast } from 'native-base'
import Navbar from '../../public/components/navbar';
import { withNavigation } from 'react-navigation'

//import redux
import { connect } from 'react-redux'
import { logout } from '../../public/redux/actions/user'
import { TouchableOpacity } from 'react-native-gesture-handler';

class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loan: [],
            users: [],
            isverify: '',
            id_card: '',
            name: '',
            email: '',
            iduser: '',
            status: '',
        }

        storage.getItem('status', (error, result) => {
            if (result) {
                this.setState({
                    status: result
                })
            }
        })

        storage.getItem('isverify', (error, result) => {
            if (result) {
                this.setState({
                    isverify: result
                })
            }
        })

        storage.getItem('id_card', (error, result) => {
            if (result) {
                this.setState({
                    id_card: result
                })
            }
        })

        storage.getItem('name', (error, result) => {
            if (result) {
                this.setState({
                    name: result
                })
            }
        })

        storage.getItem('email', (error, result) => {
            if (result) {
                this.setState({
                    email: result
                })
            }
        })

        storage.getItem('iduser', (error, result) => {
            if (result) {
                this.setState({
                    iduser: result
                })
            }
        })
    }

    logout = async () => {
        await this.props.dispatch(logout(this.state.iduser))
            .then(() => {
                Toast.show({
                    type: 'success',
                    text: 'Anda sudah logout',
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
                    text: 'Oops something wrong :v',
                    buttonText: 'Try again',
                    duration: 3000
                })
            })

    }

    render() {
        console.warn(this.state.id_card)
        return (
            <>
                <Navbar iduser={this.state.iduser} name={this.state.name} status={this.state.status} />
                <ScrollView>
                    <View style={{ marginHorizontal: 20 }}>
                        <Card style={{ width: '100%' }}>
                            <CardItem header>
                                <Row>
                                    <Col>
                                        <H3>Member Card</H3>
                                    </Col>
                                    <Col>
                                        {
                                            this.state.isverify === 'true'
                                                ?
                                                <Badge success style={{ marginLeft: 'auto' }}><Text style={{ textAlign: 'right' }}>Vierified <Icon name='check' style={{ color: 'white', fontSize: 12 }} type='FontAwesome5' /></Text></Badge>
                                                :
                                                <Badge danger style={{ marginLeft: 'auto' }}><Text style={{ textAlign: 'right' }}>Not Verified <Icon name='close' style={{ color: 'white', fontSize: 12 }} type='FontAwesome5' /></Text></Badge>
                                        }
                                    </Col>
                                </Row>
                            </CardItem>
                            <CardItem>
                                <Row>
                                    <Col>
                                        <Image source={require('../../assets/images.png')} style={{ width: 80, height: 80 }} />
                                    </Col>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <Text style={{ textAlign: 'right' }}>
                                                    {this.state.id_card}
                                                </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Text style={{ textAlign: 'right', textTransform: 'capitalize' }}>
                                                    {this.state.name}
                                                </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Text style={{ textAlign: 'right', justifyContent: 'flex-end' }}>
                                                    {this.state.email}
                                                </Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardItem>
                            <CardItem footer>
                                <Row>
                                    <Col>
                                        <TouchableOpacity onPress={() => this.logout()} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: 'red' }}><Icon name='power' style={{ fontSize: 20, color: 'red' }} /> Logout</Text>
                                        </TouchableOpacity>
                                    </Col>
                                    <Col>
                                        <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: 'lightgreen' }}><Icon name='edit' type="FontAwesome5" style={{ fontSize: 20, color: 'lightgreen' }} /> Edit</Text>
                                        </TouchableOpacity>
                                    </Col>
                                </Row>
                            </CardItem>
                        </Card>
                    </View>
                </ScrollView>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.userList
    }
}

export default withNavigation(connect(mapStateToProps)(Profile))