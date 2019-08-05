import React, { Component } from 'react'
import { TouchableOpacity, Image, View, AsyncStorage as storage, ActivityIndicator, StyleSheet } from 'react-native'
import { FlatGrid } from 'react-native-super-grid';
import { Input, Item, Card, CardItem, Icon, Fab, Text } from 'native-base';
import Navbar from '../../public/components/navbar'
import DonateBook from '../../public/components/donateBook'

//import redux
import { connect } from 'react-redux'
import { getMoreBooks, getBooks } from '../../public/redux/actions/book'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            books: [],
            modalVisible: false,
            page: 1,
            isLoading: true,
            search: '',

            name: '',
            iduser: '',
            status: '',
        }

        storage.getItem('name', (error, result) => {
            if (result) {
                this.setState({
                    name: result
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

        storage.getItem('status', (error, result) => {
            if (result) {
                this.setState({
                    status: result
                })
            }
        })
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        })
    }

    componentDidMount = () => {
        this.makeRequest()
    }

    makeRequest = () => {
        const { page } = this.state
        this.props.dispatch(getMoreBooks(page))
            .then(res => {
                this.setState({
                    isLoading: false,
                    books: this.state.books.concat(res.action.payload.data.result)
                })
            }).catch(() => {
                this.setState({ isLoading: false })
            })
    }

    handleLoadMore = () => {
        this.setState({
            page: this.state.page + 1,
        }, () => {
            this.makeRequest()
        })
    }

    renderFooter = () => {
        return (
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#fff',
                marginVertical: 5
            }}>
                <>
                    <ActivityIndicator animating size="large" />
                    <Text style={{ marginTop: 10, fontSize: 12 }}>Getting data..</Text>
                </>
            </View>
        )
    }

    _renderItem = ({ item }) => {
        function _validateText(str) {
            var tarea = str;
            if (tarea.indexOf("http://") == 0 || tarea.indexOf("https://") == 0) {
                // do something here
                return false
            } else {
                return true
            }
        }
        let ApiUrl = `https://api-libraryku.herokuapp.com`
        return (
            <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Detail', {
                    bookid: item.bookid
                })}>
                <Card>
                    <CardItem cardBody>
                        <Image source={{ uri: _validateText(item.image) ? `${ApiUrl}/${item.image}` : item.image }} resizeMode='cover' style={{ height: 230, width: 'auto', flex: 1 }} />
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
    }

    _renderHeader = () => {
        return (
            <View style={{
                marginHorizontal: 20,
            }}>
                <Item rounded style={{
                    marginVertical: 30
                }}>
                    <Icon name='search' style={{ paddingLeft: 20 }} />
                    <Input
                        placeholder='Search Book...'
                        style={{
                            paddingLeft: 10
                        }} />
                </Item>
            </View>
        )
    }

    handlePullRefresh = async () => {
        await this.setState({ isLoading: true })
        await this.props.dispatch(getBooks())
            .then(() => {
                this.setState({ page: 1, books: this.props.books, isLoading: false })
            })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff'
                }}>
                    <ActivityIndicator />
                    <Text>fetching data...</Text>
                    <Text>check your internet connection</Text>
                </View>
            )
        }

        return (
            <>
                <Navbar iduser={this.state.iduser} status={this.state.status} name={this.state.name} />

                <FlatGrid
                    itemDimension={130}
                    showsVerticalScrollIndicator={false}
                    ListHeaderComponent={this._renderHeader}
                    items={this.state.books}
                    style={styles.gridView}
                    keyExtractor={item => item.bookid}
                    renderItem={this._renderItem}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                    ListFooterComponent={this.renderFooter}
                    refreshing={this.state.isLoading}
                    onRefresh={this.handlePullRefresh}
                />

                <DonateBook
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setModalVisible(false)}
                />

                <Fab
                    direction="up"
                    style={{ backgroundColor: '#5067FF' }}
                    position="bottomRight"
                    onPress={() => this.setModalVisible(true)}>
                    <Icon name="add" />
                </Fab>
            </>
        )
    }
}
const styles = StyleSheet.create({
    gridView: {
        marginTop: 20,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-end',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
    },
});
const mapStateToProps = state => {
    return {
        books: state.book.bookList,
    }
}

export default connect(mapStateToProps)(Home)