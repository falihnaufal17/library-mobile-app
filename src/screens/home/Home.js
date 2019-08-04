import React, { Component } from 'react'
import { TouchableOpacity, Image, View, Modal, AsyncStorage as storage, ActivityIndicator, FlatList } from 'react-native'
import { Input, Item, Card, CardItem, Icon, Fab, H1, Picker, Button, Text, Toast, Row, Col, Thumbnail } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import Navbar from '../../public/components/navbar'
import ImagePicker from 'react-native-image-picker'

//import redux
import { connect } from 'react-redux'
import { addBook, getMoreBooks } from '../../public/redux/actions/book'
import { getCategories } from '../../public/redux/actions/category'
import { getLocations } from '../../public/redux/actions/location'
import { getStatus } from '../../public/redux/actions/status'

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {
            books: [],
            categories: [],
            locations: [],
            statuses: [],
            modalVisible: false,
            page: 1,
            isLoading: true,
            search: '',

            title: '',
            writer: '',
            image: null,
            description: '',
            categoryid: 1,
            locationid: 1,
            statusid: 2,

            name: '',
            iduser: '',
            status: '',

            selected: undefined,
            showToast: false
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

    onValueChange(value) {
        this.setState({
            selected: value
        });
    }

    setModalVisible(visible) {
        this.setState({
            modalVisible: visible
        })
    }

    componentDidMount = async () => {
        this.makeRequest()
        await this.props.dispatch(getCategories())
        await this.props.dispatch(getLocations())
        await this.props.dispatch(getStatus())
        this.setState({
            categories: this.props.categories,
            locations: this.props.locations,
            statuses: this.props.statuses
        })
    }

    makeRequest = () => {
        const { page } = this.state
        this.props.dispatch(getMoreBooks(page))
            .then(res => {
                this.setState({
                    isLoading: false,
                    books: this.state.books.concat(res.action.payload.data.result)
                })
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
                marginVertical: 20
            }}>
                <ActivityIndicator animating size="large" />
                <Text style={{ marginTop: 10, fontSize: 12 }}>Getting data..</Text>
            </View>
        )
    }

    donateBook = async () => {
        if (this.state.title === '' || this.state.writer === '' || this.state.image === '' || this.state.description === '') {
            Toast.show({
                type: 'warning',
                text: 'ups ada data yang kosong! :v',
                buttonText: 'Coba Lagi',
                duration: 3000,
                textStyle: { color: '#fff' },
                style: { backgroundColor: '#000', opacity: 0.8 },
            })
            this.setState({
                modalVisible: false
            })
        } else {
            let formdata = new FormData()

            formdata.append('title', this.state.title)
            formdata.append('writer', this.state.writer)
            formdata.append('image', {
                name: this.state.image.fileName,
                type: this.state.image.type || null,
                uri: this.state.image.uri
            })

            console.warn("IMAGENYA: ", "/images/" + this.state.image)

            formdata.append('description', this.state.description)
            formdata.append('locationid', this.state.locationid)
            formdata.append('categoryid', this.state.categoryid)
            formdata.append('statusid', 2)
            formdata.append('created_at', Date.now())
            formdata.append('updated_at', Date.now())

            await this.props.dispatch(addBook(formdata))
                .then(() => {
                    Toast.show({
                        type: 'success',
                        text: 'Terima kasih atas sumbagannya',
                        buttonText: 'Close',
                        duration: 3000
                    })
                    this.setState({
                        books: this.props.books,

                        title: '',
                        writer: '',
                        image: null,
                        description: '',
                        categoryid: 1,
                        locationid: 1,
                        statusid: 2,
                        modalVisible: false
                    })
                })
                .catch((error) => {
                    console.warn(error)
                    Toast.show({
                        type: 'danger',
                        text: 'Yahh judul buku sudah ada ;(',
                        buttonText: 'Coba Lagi',
                        duration: 3000
                    })
                    this.setState({
                        title: '',
                        writer: '',
                        image: null,
                        description: '',
                        categoryid: 1,
                        locationid: 1,
                        statusid: 1,
                        modalVisible: false
                    })
                })
        }
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

    handleChoosePhoto = () => {
        const options = {
            noData: true,
        }

        ImagePicker.launchImageLibrary(options, response => {
            if (response.uri) {
                this.setState({ image: response })
            }
        })
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
                        <Image source={{ uri: _validateText(item.image) ? `${ApiUrl}/${item.image}` : item.image }} resizeMode='cover' style={{ height: 230, width: 'auto', flex: 1 }} />
                    </CardItem>
                </Card>
            </TouchableOpacity>
        )
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
                </View>
            )
        }

        const { categories, locations, image, categoryid, locationid } = this.state
        const cat = categories
        const loc = locations

        return (
            <>
                <Navbar iduser={this.state.iduser} status={this.state.status} name={this.state.name} />

                <FlatList
                    data={this.state.books}
                    renderItem={this._renderItem}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    keyExtractor={item => item.bookid}
                    ListHeaderComponent={() => {
                        return (
                            <View style={{
                                marginHorizontal: 20,
                                marginTop: 10
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
                    }}
                    ListFooterComponent={this.renderFooter}
                    onEndReached={this.handleLoadMore}
                    onEndReachedThreshold={0.1}
                />
                <Modal
                    animationType='fade'
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false)
                    }}>
                    <ScrollView style={{ backgroundColor: '#85b555' }}>
                        <View style={{ marginVertical: 30 }}>
                            <H1 style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>Hello Donator!</H1>
                            <View style={{ marginHorizontal: 20 }}>
                                <Item rounded style={{ marginVertical: 10, borderColor: 'white' }}>
                                    <Input placeholder="Title book..." onChangeText={title => this.setState({ title })} placeholderTextColor='white' style={{ color: 'white', paddingLeft: 20 }} />
                                </Item>
                                <Row style={{ marginVertical: 10, borderColor: 'white', marginHorizontal: 20 }}>
                                    <Col>
                                        <Button style={{ marginRight: 'auto' }} rounded success onPress={this.handleChoosePhoto}><Text style={{ textAlign: 'center' }}>Choose Image</Text></Button>
                                    </Col>
                                    <Col>
                                        {
                                            image && (
                                                <Thumbnail square large source={{ uri: image.uri }} style={{ marginLeft: 'auto' }} resizeMode='cover' />
                                            )
                                        }
                                    </Col>
                                </Row>
                                <Item rounded style={{ marginVertical: 10, borderColor: 'white' }}>
                                    <Input keyboardType='default' onChangeText={writer => this.setState({ writer })} placeholder="Writer..." placeholderTextColor='white' style={{ color: 'white', paddingLeft: 20 }} />
                                </Item>
                                <Item rounded style={{ marginVertical: 10, borderColor: 'white' }}>
                                    <Input textContentType='streetAddressLine1' onChangeText={description => this.setState({ description })} placeholder="Description..." placeholderTextColor='white' style={{ color: 'white', paddingLeft: 20 }} />
                                </Item>
                                <Item rounded style={{ marginVertical: 10, borderColor: 'white', backgroundColor: '#fdfbf2' }}>
                                    <Picker
                                        mode="dropdown"
                                        placeholder="Select category..."
                                        placeholderStyle="white"
                                        placeholderIconColor="white"
                                        style={{ paddingLeft: 20, color: 'white' }}
                                        selectedValue={categoryid}
                                        onValueChange={(selected) => {
                                            this.setState({
                                                categoryid: selected
                                            })
                                        }}
                                    >
                                        {
                                            cat.map(item => (
                                                <Picker.Item label={item.category} value={item.categoryid} />
                                            ))
                                        }
                                    </Picker>
                                </Item>
                                <Item rounded style={{ backgroundColor: '#fdfbf2', marginVertical: 10, borderColor: 'white', backgroundColor: '#fdfbf2' }}>
                                    <Picker
                                        mode="dropdown"
                                        placeholder="Select location..."
                                        placeholderStyle="#fff"
                                        placeholderIconColor="#fff"
                                        style={{ paddingLeft: 20, color: 'white' }}
                                        selectedValue={locationid}
                                        onValueChange={(selected) => {
                                            this.setState({
                                                locationid: selected
                                            })
                                        }}
                                    >
                                        {
                                            loc.map(item => (
                                                <Picker.Item label={item.location} value={item.locationid} />
                                            ))
                                        }
                                    </Picker>
                                </Item>
                                <Item>
                                    <Button rounded success onPress={() => this.donateBook()}><Text style={{ width: '100%', textAlign: 'center' }}>Donate!</Text></Button>
                                </Item>
                            </View>
                        </View>
                    </ScrollView>
                </Modal>
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

const mapStateToProps = state => {
    return {
        books: state.book.bookList,
        categories: state.category.categoryList,
        locations: state.location.locationList,
        statuses: state.status.statusList
    }
}

export default connect(mapStateToProps)(Home)