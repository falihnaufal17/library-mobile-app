import React, { Component } from 'react'
import { Image, ScrollView } from 'react-native'
import { Card, CardItem, Text, Row, Col, View, H3, Badge, Button, Icon } from 'native-base'

export default class Profile extends Component {
    render() {
        return (
            <ScrollView>
                <View style={{ marginHorizontal: 20 }}>
                    <Card style={{ width: '100%' }}>
                        <CardItem header>
                            <Row>
                                <Col>
                                    <H3>Member Card</H3>
                                </Col>
                                <Col>
                                    <Badge success style={{ marginLeft: 'auto' }}><Text style={{ textAlign: 'right' }}>Verified <Icon name='check' style={{ color: 'white', fontSize: 12 }} type='FontAwesome5' /></Text></Badge>
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
                                                320501711000012
                                            </Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Text style={{ textAlign: 'right' }}>
                                                Falih Naufal
                                            </Text>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Text style={{ textAlign: 'right' }}>
                                                dudu.kotkot@gmail.com
                                            </Text>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </CardItem>
                        <CardItem footer>
                            <Row>
                                <Col>
                                    <Button transparent style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'red' }}><Icon name='power' style={{ fontSize: 20, color: 'red' }} /> Logout</Text>
                                    </Button>
                                </Col>
                                <Col>
                                    <Button transparent style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: 'lightgreen' }}><Icon name='edit' type="FontAwesome5" style={{ fontSize: 20, color: 'lightgreen' }} /> Edit</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </CardItem>
                    </Card>
                </View>
            </ScrollView>
        )
    }
}
