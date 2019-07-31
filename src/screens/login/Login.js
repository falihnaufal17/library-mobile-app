import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Form, Item, Label, Input, Button, Text, Card, CardItem, Body, Container, Content } from 'native-base'

export default class Login extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Container style={styles.container}>
                <Content>
                    <Image source={require('../../assets/logo/logo.png')} style={styles.imgCenter} />
                    <Card style={{ marginTop: 30 }}>
                        <CardItem header style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Login</Text>
                        </CardItem>
                        <Form>
                            <Item floatingLabel style={{
                                marginHorizontal: 20
                            }}>
                                <Label>Email</Label>
                                <Input keyboardType='email-address' />
                            </Item>
                            <Item floatingLabel style={{
                                marginHorizontal: 20
                            }}>
                                <Label>Password</Label>
                                <Input secureTextEntry={true} />
                            </Item>
                            <Button success rounded style={{
                                marginHorizontal: 20,
                                marginVertical: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    width: '100%',
                                    textAlign: 'center'
                                }}>Login</Text>
                            </Button>
                        </Form>
                    </Card>
                </Content>
                <Text style={{ marginVertical: 20, fontFamily: 'sans-serif', color: 'teal', fontSize: 10, textAlign: 'center' }}>Powered by: React Native</Text>
            </Container>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 20
    },
    imgCenter: {
        width: 250,
        height: 100,
        margin: 0
    }
})
