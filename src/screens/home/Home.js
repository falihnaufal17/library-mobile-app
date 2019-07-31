import React, { Component } from 'react'
import { Image, StyleSheet } from 'react-native'
import { Input, Item, Card, CardItem, Body, Text, View, Row, Col, Icon, Container } from 'native-base';
import { TouchableOpacity, FlatList, ScrollView } from 'react-native-gesture-handler';

//import redux
import { connect } from 'react-redux'
import { getBooks } from '../../public/redux/actions/book'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            books: []
        }
    }

    componentDidMount = async () => {
        await this.props.dispatch(getBooks())
        this.setState({
            books: this.props.books
        })
    }

    text = (text) => {
        if (text.length > 25) {
            let textSplit = text.substr(0, 15);
            return `${textSplit} ...`;
        } else {
            let textSplit = text;
            return `${textSplit}`;
        }
    }

    _renderItem = ({ item }) => (
        <TouchableOpacity
            style={{
                marginHorizontal: 13,
                alignItems: 'center',
                justifyContent: 'center'
            }}
            onPress={() => this.props.navigation.navigate('Detail', {
                bookid: item.bookid
            })}>
            <Card
                style={{
                    height: 'auto',
                    width: 150
                }}>
                <CardItem cardBody>
                    <Image source={{ uri: item.image }} style={{ height: 180, width: 'auto', flex: 1 }} />
                </CardItem>
                <CardItem>
                    <Body>
                        <Text>{this.text(item.title)}</Text>
                    </Body>
                </CardItem>
            </Card>
        </TouchableOpacity>
    )

    render() {
        const { books } = this.state
        const result = books
        console.warn("Daftar buku: " + result)
        console.warn('type')
        return (
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                {/* <Navbar /> */}
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
                <FlatList
                    data={this.state.books}
                    renderItem={this._renderItem}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    keyExtractor={item => item.bookid}
                />
            </ScrollView>
        )
    }
}

const mapStateToProps = state => {
    return {
        books: state.book.bookList
    }
}

export default connect(mapStateToProps)(Home)