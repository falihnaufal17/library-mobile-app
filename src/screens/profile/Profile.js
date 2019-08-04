import React, { Component } from 'react'
import { Image, ScrollView, AsyncStorage as storage } from 'react-native'
import { Card, CardItem, Text, Row, Col, View, H3, Badge, Icon, Toast, Content, Accordion, Thumbnail } from 'native-base'
import Navbar from '../../public/components/navbar';
import { withNavigation } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler';

//import redux
import { connect } from 'react-redux'
import { logout } from '../../public/redux/actions/user'
import { getLoanByUser } from '../../public/redux/actions/loan'

class Profile extends Component {

    constructor(props) {
        super(props)

        this.state = {
            loans: [],
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

    componentDidMount = async () => {
        await this.props.dispatch(getLoanByUser(this.props.navigation.getParam('iduser')))
        this.setState({
            loans: this.props.loans
        })
    }

    formatDate(date) {
        let data = Date.parse(date);
        let newDate = new Date(data);
        let day = newDate.getDate();
        let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        let month = months[newDate.getMonth()];
        let year = newDate.getFullYear();
        return `${day} ${month} ${year}`
    }
    _renderContent(item) {
        return (
            <View style={{ marginHorizontal: 10 }}>
                <Row>
                    <Col><Thumbnail source={{ uri: item.image }} square large /></Col>
                    <Col>
                        <Row>
                            <Col><Text>Loaning date: </Text></Col>
                            <Col><Text>{item.created_at}</Text></Col>
                        </Row>
                        <Row>
                            <Col><Text>Expired date: </Text></Col>
                            <Col><Text>{item.expired_date}</Text></Col>
                        </Row>
                        <Row>
                            <Col><Text>Forfeit: </Text></Col>
                            <Col><Text>{item.forfeit}</Text></Col>
                        </Row>
                        <Row>
                            <Col><Text>Is Return: </Text></Col>
                            <Col><Text>{item.isverify}</Text></Col>
                        </Row>
                    </Col>
                </Row>

            </View>
        );
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
                                                <Badge danger style={{ marginLeft: 'auto' }}><Text style={{ textAlign: 'right' }}>Not Verified <Icon name='close-circle' style={{ color: 'white', fontSize: 12 }} /></Text></Badge>
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
                    <Content padder style={{ backgroundColor: 'white', marginHorizontal: 20 }}>
                        <H3 style={{ marginVertical: 10 }}>History pinjaman:</H3>
                        {
                            this.state.loans &&
                                this.state.iduser && this.state.status === "1"
                                ?
                                <Accordion
                                    dataArray={this.state.loans}
                                    expanded={true}
                                    renderContent={this._renderContent} />
                                :
                                <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Oops kamu belum pinjam buku</Text>
                        }

                    </Content>
                </ScrollView>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.userList,
        loans: state.loan.loanList
    }
}

export default withNavigation(connect(mapStateToProps)(Profile))