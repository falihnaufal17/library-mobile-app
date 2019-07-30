import React, { Component } from 'react'
import { Form, Item, Label, Input, Button, Text, Card, CardItem, Body, Container, Content } from 'native-base'

export default class Login extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <Container>
                <Content>
                    <Card>
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
            </Container>
        )
    }
}
