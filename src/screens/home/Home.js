import React, { Component } from 'react'
import Navbar from '../../public/components/navbar'
import { ScrollView, Image } from 'react-native'
import { Input, Item, Card, CardItem, Body, Text, View, Row, Col, Icon } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class Home extends Component {
    constructor(props) {
        super(props)
    }
    setProps = (screen) => {
        this.props.navigation.navigate(screen)
    }
    componentDidMount = () => {
        this.props.navigation.navigate("Home", { setProps: this.setProps })
    }
    render() {
        return (
            <>
                {/* <Navbar /> */}
                <ScrollView>
                    <View style={{
                        marginHorizontal: 20,
                        marginTop: 10
                    }}>
                        <Item rounded style={{
                            marginVertical: 30
                        }}>
                            <Icon name='search' style={{ paddingLeft: 20 }} />
                            <Input placeholder='Search Book...' style={{
                                paddingLeft: 10
                            }} />
                        </Item>
                    </View>
                    <Row style={{ marginHorizontal: 10 }}>
                        <Col>
                            <TouchableOpacity onPress={() => this.props.navigation.navigate('Detail')}>
                                <Card>
                                    <CardItem cardBody>
                                        <Image source={{ uri: 'https://images.unsplash.com/photo-1507546530-14a03f8d180a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=295&q=80' }} style={{ height: 180, width: 'auto', flex: 1 }} />
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                            <Text>Title</Text>
                                        </Body>
                                    </CardItem>
                                </Card>
                            </TouchableOpacity>
                        </Col>
                        <Col>
                            <Card>
                                <CardItem cardBody>
                                    <Image source={{ uri: 'https://images.unsplash.com/photo-1505744768106-34d8c47a1327?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80' }} style={{ width: 'auto', height: 180, flex: 1 }} />
                                </CardItem>
                                <CardItem>
                                    <Body>
                                        <Text>Title</Text>
                                    </Body>
                                </CardItem>
                            </Card>
                        </Col>
                    </Row>
                </ScrollView>
            </>
        )
    }
}
