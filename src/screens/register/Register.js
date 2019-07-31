import React, { Component } from 'react'
import { Image, StyleSheet, ScrollView } from 'react-native'
import { Form, Item, Label, Input, Button, Text, Card, CardItem, Container, Content } from 'native-base'

export default class Register extends Component {
    render() {
        return (
            <Container style={styles.container}>
                <ScrollView showsHorizontalScrollIndicator={false}>
                    <Image source={require('../../assets/logo/logo.png')} style={styles.imgCenter} />
                    <Card>
                        <CardItem header style={{
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            <Text style={{ fontWeight: 'bold', fontSize: 24 }}>Register</Text>
                        </CardItem>
                        <Form>
                            <Item floatingLabel style={{
                                marginHorizontal: 20
                            }}>
                                <Label>ID Card</Label>
                                <Input keyboardType="numeric" />
                            </Item>
                            <Item floatingLabel style={{
                                marginHorizontal: 20
                            }}>
                                <Label>Fullname</Label>
                                <Input />
                            </Item>
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
                            <Input type="hidden" style={{ width: 0 }} value="2" />
                            <Button success rounded style={{
                                marginHorizontal: 20,
                                marginVertical: 20,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Text style={{
                                    width: '100%',
                                    textAlign: 'center'
                                }}>Register</Text>
                            </Button>
                        </Form>
                    </Card>
                </ScrollView>
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
        marginHorizontal: 20,
        marginVertical: 20
    },
    imgCenter: {
        width: 250,
        height: 100,
    }
})