import React, { Component } from 'react'
import { Image, ScrollView } from 'react-native'
import { Container, H1, Text, Badge, Col, Row, Button } from 'native-base'

import { connect } from 'react-redux'
import { detailBook } from '../../public/redux/actions/book'

class Detail extends Component {

    constructor(props) {
        super(props)

        this.state = {
            books: []
        }
    }

    componentDidMount = async () => {
        await this.props.dispatch(detailBook(this.props.navigation.getParam('bookid')))
        this.setState({
            books: this.props.books
        })
    }

    render() {
        const { books } = this.state
        console.warn(books)

        let detail = books
        return (
            <ScrollView>
                <Container
                    style={{
                        marginBottom: 900
                    }}>
                    <Image
                        source={{ uri: `${detail.image}` }}
                        style={{
                            width: '100%',
                            height: 200
                        }}
                        blurRadius={0.5}
                        resizeMode='cover'
                    />

                    <Container
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
                            source={{ uri: `${detail.image}` }}
                            style={{
                                width: 150,
                                height: 200,
                                borderRadius: 20
                            }} />
                    </Container>
                    <Container
                        style={{
                            marginVertical: 120,
                            marginHorizontal: 10
                        }}>
                        <H1>{detail.title}</H1>
                        <Row
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 50
                            }}>
                            <Col><Text>Category:</Text></Col>
                            <Col><Badge success style={{ marginLeft: 'auto' }}><Text>{detail.category}</Text></Badge></Col>
                        </Row>
                        <Row
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 50
                            }}>
                            <Col><Text>Location:</Text></Col>
                            <Col><Badge primary style={{ marginLeft: 'auto' }}><Text>{detail.location}</Text></Badge></Col>
                        </Row>
                        <Row
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 50
                            }}>
                            <Col><Text>Status:</Text></Col>
                            <Col><Badge danger style={{ marginLeft: 'auto' }}><Text>{detail.status}</Text></Badge></Col>
                        </Row>
                        <Row
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: 50
                            }}>
                            <Col><Text>Writer:</Text></Col>
                            <Col><Badge info style={{ marginLeft: 'auto' }} ><Text>{detail.writer}</Text></Badge></Col>
                        </Row>
                        <Row>
                            <Col>
                                <Button
                                    rounded
                                    warning
                                    style={{ alignItems: 'center', justifyContent: 'center', marginTop: 30 }}>
                                    <Text
                                        style={{
                                            width: '100%',
                                            height: 'auto',
                                            textAlign: 'center'
                                        }}>
                                        Loan
                                    </Text>
                                </Button>
                            </Col>
                        </Row>
                        <Text
                            style={{
                                textAlign: 'justify',
                                justifyContent: 'center',
                                marginTop: 100
                            }}>
                            {detail.description}
                        </Text>
                    </Container>
                </Container>
            </ScrollView >
        )
    }
}

const mapStateToProps = state => {
    return {
        books: state.book.bookList
    }
}

export default connect(mapStateToProps)(Detail)