import React, { Component } from 'react'
import { Image, ScrollView, AsyncStorage as storage, BackHandler } from 'react-native'
import { Card, CardItem, Text, Row, Col, View, H3, Badge, Icon, Toast, Content, Accordion, Thumbnail } from 'native-base'
import { withNavigation } from 'react-navigation'
import { TouchableOpacity } from 'react-native-gesture-handler';
import moment from 'moment'


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
            image: '',
            email: '',
            iduser: this.props.navigation.getParam('iduser'),
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

        storage.getItem('image', (error, result) => {
            if (result) {
                this.setState({
                    image: result
                })
            }
        })
    }

    componentDidMount = () => {
        console.warn('ID USER: ', this.state.iduser)
        this.props.dispatch(getLoanByUser(this.state.iduser))
            .then(() => {
                this.setState({
                    loans: this.props.loans
                })
            })
            .catch(() => {
                return (
                    <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Oops kamu belum pinjam buku</Text>
                )
            })
    }

    _renderHeader(item) {
        return (
            <View
                style={{
                    flexDirection: "row",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    backgroundColor: "#A9DAD6"
                }}>
                <Text>{item.title}</Text>
            </View>
        )
    }

    _renderContent(item) {
        return (
            <View style={{ marginHorizontal: 10 }}>
                <Row>
                    <Col><Thumbnail source={{ uri: item.image }} square large /></Col>
                    <Col>
                        <Row>
                            <Col><Text>Loaning date: </Text></Col>
                            <Col><Text>{moment(item.created_at).format('DD-MM-YYYY')}</Text></Col>
                        </Row>
                        <Row>
                            <Col><Text>Expired date: </Text></Col>
                            <Col><Text>{moment(item.expired_date).format('DD-MM-YYYY')}</Text></Col>
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
                    users: this.props.users,
                    iduser: ''
                })
                this.props.navigation.push('Home')
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
        console.warn('Avatar user: ' + this.state.image)
        return (
            <>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Image source={require('../../assets/old-library-book.jpg')} style={{ width: '100%', height: 150 }} />
                    <Content padder style={{ marginHorizontal: 10, bottom: 10 }}>
                        <Card style={{ width: '100%' }}>
                            <CardItem header>
                                <Text></Text>
                            </CardItem>
                            <CardItem>
                                <Row>
                                    <Col>
                                        <Row>
                                            <Col>
                                                <Text style={{ textAlign: 'center' }}>
                                                    {this.state.id_card}
                                                </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>
                                                    {this.state.name}
                                                </Text>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Text style={{ textAlign: 'center', justifyContent: 'flex-end' }}>
                                                    {this.state.email}
                                                </Text>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </CardItem>
                            <CardItem style={{ justifyContent: 'center', margin: 0, alignItems: 'center' }}>
                                {
                                    this.state.isverify === 'true'
                                        ?
                                        <Badge success><Text style={{ textAlign: 'center' }}>Vierified <Icon name='check' style={{ color: 'white', fontSize: 12 }} type='FontAwesome5' /></Text></Badge>
                                        :
                                        <Badge danger><Text style={{ textAlign: 'center' }}>Not Verified <Icon name='close-circle' style={{ color: 'white', fontSize: 12 }} /></Text></Badge>
                                }
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
                    </Content>

                    <Content padder style={{ backgroundColor: 'white', marginHorizontal: 10, bottom: 25 }}>
                        <H3 style={{ marginVertical: 10 }}>History pinjaman:</H3>
                        {
                            this.state.loans && this.state.loans.length > 0 &&
                                this.state.iduser && this.state.status === "1"
                                ?
                                <Accordion
                                    dataArray={this.state.loans}
                                    expanded={true}
                                    renderContent={this._renderContent}
                                    renderHeader={this._renderHeader} />
                                :
                                <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Oops kamu belum pinjam buku</Text>
                        }

                    </Content>

                    <View style={{ position: 'absolute', alignSelf: 'center', margin: 0, alignItems: 'center', justifyContent: 'center', top: 90 }}>
                        {
                            this.state.image === ''
                                ?
                                <Thumbnail style={{ width: 120, height: 120, borderColor: 'white', borderWidth: 3, borderRadius: 60 }} source={require('../../assets/images.png')} resizeMode='cover' />
                                :
                                <Thumbnail style={{ width: 120, height: 120, borderColor: 'white', borderWidth: 3, borderRadius: 60 }} source={{ uri: this.state.image }} resizeMode='cover' />
                        }
                    </View>
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