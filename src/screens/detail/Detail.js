import React, { Component } from 'react'
import { Image, ScrollView, AsyncStorage as storage, View, StatusBar, BackHandler } from 'react-native'
import { H1, Text, Badge, Col, Row, Toast, Button, Content } from 'native-base'

import { connect } from 'react-redux'
import { detailBook } from '../../public/redux/actions/book'
import { addLoan } from '../../public/redux/actions/loan'

class Detail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            books: [],
            loans: [],
            status: '',
            iduser: '',
            isverify: '',
            token: ''
        }

        storage.getItem('token', (error, result) => {
            if (result) {
                this.setState({
                    token: result
                })
            }
        })

        storage.getItem('status', (error, result) => {
            if (result) {
                this.setState({
                    status: result
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

        storage.getItem('isverify', (error, result) => {
            if (result) {
                this.setState({
                    isverify: result
                })
            }
        })
    }

    componentDidMount = async () => {
        await this.props.dispatch(detailBook(this.props.navigation.getParam('bookid')))
        this.setState({
            books: this.props.books
        })
    }

    addLoan = async (data) => {
        await this.props.dispatch(addLoan(data))
            .then(() => {
                Toast.show({
                    type: 'success',
                    text: 'Buku berhasil dipinjam selamat membaca ;)',
                    buttonText: 'Okay',
                    duration: 3000
                })
                this.setState({
                    loans: this.props.loans
                })
            })
            .catch(() => {
                Toast.show({
                    type: 'danger',
                    text: 'Oops kesalahan dari server :(',
                    duration: 3000
                })
            })
    }

    render() {
        let ApiUrl = `https://api-libraryku.herokuapp.com`
        function validateText(str) {
            var tarea = str;
            if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
                // do something here
                return false
            } else {
                return true
            }
        }

        const { books } = this.state

        let detail = books

        let data = {
            bookid: detail.bookid,
            id_card: this.state.iduser,
            forfeit: 0,
            isverify: 'false',
        }

        return (
            <View>
                <StatusBar backgroundColor='transparent' barStyle='dark-content' />
                <ScrollView
                    showsVerticalScrollIndicator={false}>
                    <View
                        style={{
                            marginBottom: 100
                        }}>
                        <Image
                            source={{ uri: validateText(`${detail.image}`) ? `${ApiUrl}/${detail.image}` : `${detail.image}` }}
                            style={{
                                width: '100%',
                                height: 200,
                            }}
                            blurRadius={0.5}
                            resizeMode='cover'
                        />

                        <View
                            style={{
                                width: 150,
                                height: 200,
                                alignItems: 'center',
                                position: 'absolute',
                                left: 100,
                                top: 90,
                                right: 100,
                                borderRadius: 20
                            }}>
                            <Image
                                source={{ uri: validateText(`${detail.image}`) ? `${ApiUrl}/${detail.image}` : `${detail.image}` }}
                                style={{
                                    width: 150,
                                    height: 200,
                                    borderRadius: 20
                                }} />
                        </View>
                        <View
                            style={{
                                marginTop: 120,
                                marginHorizontal: 25
                            }}>
                            <H1>{detail.title}</H1>
                            <Row
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 20
                                }}>
                                <Col><Text>Category:</Text></Col>
                                <Col><Badge success style={{ marginLeft: 'auto' }}><Text>{detail.category}</Text></Badge></Col>
                            </Row>
                            <Row
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 20
                                }}>
                                <Col><Text>Location:</Text></Col>
                                <Col><Badge primary style={{ marginLeft: 'auto' }}><Text>{detail.location}</Text></Badge></Col>
                            </Row>
                            <Row
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 20
                                }}>
                                <Col><Text>Status:</Text></Col>
                                <Col><Badge danger style={{ marginLeft: 'auto' }}><Text>{detail ? detail.status : ''}</Text></Badge></Col>
                            </Row>
                            <Row
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    marginTop: 20
                                }}>
                                <Col><Text>Writer:</Text></Col>
                                <Col><Badge info style={{ marginLeft: 'auto' }} ><Text>{detail.writer}</Text></Badge></Col>
                            </Row>
                            <Content style={{ marginVertical: 30 }}>
                                {
                                    this.state.status === "1" && this.state.isverify === 'true'
                                        ?
                                        <View>
                                            <Button
                                                rounded
                                                warning
                                                onPress={() => this.addLoan(data)}
                                                disabled={detail ? detail.status === 'Tidak Tersedia' : 'Tersedia'}
                                            >
                                                {
                                                    detail.status === 'Tidak Tersedia'
                                                        ?
                                                        <Text style={{ width: '100%', textAlign: 'center' }}>Loaned</Text>
                                                        :
                                                        <Text style={{ width: '100%', textAlign: 'center' }}>Loan</Text>
                                                }
                                            </Button>
                                        </View>
                                        :
                                        this.state.status === "1" && this.state.isverify === 'false'
                                            ?
                                            <Text style={{ color: 'salmon', alignItems: 'center', justifyContent: 'center', marginTop: 30, textAlign: 'center' }}>Akunmu belum diverifikasi! Silahkan hubungi admin</Text>
                                            :
                                            <Text style={{ color: 'salmon', alignItems: 'center', justifyContent: 'center', marginTop: 30, textAlign: 'center' }}>Ayo login untuk pinjam buku!</Text>
                                }
                            </Content>

                        </View>
                        <View style={{ marginHorizontal: 15 }}>
                            <Text
                                style={{
                                    textAlign: 'justify',
                                    alignContent: 'center',
                                    justifyContent: 'flex-end',
                                    letterSpacing: 1,
                                }}>
                                {detail.description}
                            </Text>
                        </View>
                    </View>
                </ScrollView >
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        books: state.book.bookList,
        loans: state.loan.loanList
    }
}

export default connect(mapStateToProps)(Detail)