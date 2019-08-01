import React, { Component } from 'react'
import { TouchableOpacity, Image, Modal, AsyncStorage as storage } from 'react-native'
import { Input, Item, Card, CardItem, View, Icon, Fab, H1, Picker, Button, Text, Toast } from 'native-base';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import Navbar from '../../public/components/navbar'

//import redux
import { connect } from 'react-redux'
import { getBooks, addBook } from '../../public/redux/actions/book'
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

            title: '',
            writer: '',
            image: '',
            description: '',
            categoryid: 1,
            locationid: 1,
            statusid: 1,

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
        await this.props.dispatch(getBooks())
        await this.props.dispatch(getCategories())
        await this.props.dispatch(getLocations())
        await this.props.dispatch(getStatus())
        this.setState({
            books: this.props.books,
            categories: this.props.categories,
            locations: this.props.locations,
            statuses: this.props.statuses
        })
    }

    donateBook = async (data) => {
        if (this.state.title === '' || this.state.writer === 1 || this.state.image === '' || this.state.description === '') {
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

            await this.props.dispatch(addBook(data))
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
                        image: '',
                        description: '',
                        categoryid: 1,
                        locationid: 1,
                        statusid: 1,
                        modalVisible: false
                    })
                })
                .catch(() => {
                    Toast.show({
                        type: 'danger',
                        text: 'Yahh judul buku sudah ada ;(',
                        buttonText: 'Coba Lagi',
                        duration: 3000
                    })
                    this.setState({
                        title: '',
                        writer: '',
                        image: '',
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
                    <Image source={{ uri: item.image }} resizeMode='cover' style={{ height: 230, width: 'auto', flex: 1 }} />
                </CardItem>
            </Card>
        </TouchableOpacity>
    )

    render() {
        const { books, categories, locations, statuses, title, writer, image, description, categoryid, locationid, statusid } = this.state

        const result = books
        const cat = categories
        const loc = locations
        const stat = statuses

        let data = {
            title: title,
            writer: writer,
            image: image,
            description: description,
            categoryid: categoryid,
            locationid: locationid,
            statusid: statusid
        }

        console.warn("Daftar buku: " + result)
        console.warn("Categories: " + cat)
        console.warn("Locations: " + loc)
        console.warn("Status buku: " + stat)
        return (
            <>
                <Navbar iduser={this.state.iduser} status={this.state.status} name={this.state.name} />
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
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

                <Modal
                    animationType='fade'
                    transparent={false}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        this.setModalVisible(false)
                    }}>
                    <View style={{ height: '100%', width: '100%', backgroundColor: '#85b555' }}>
                        <ScrollView>
                            <View style={{ marginVertical: 30 }}>
                                <H1 style={{ color: 'white', textAlign: 'center', marginBottom: 20 }}>Hello Donator!</H1>
                                <View style={{ marginHorizontal: 20 }}>
                                    <Item rounded style={{ marginVertical: 10, borderColor: 'white' }}>
                                        <Input placeholder="Title book..." onChangeText={title => this.setState({ title })} placeholderTextColor='white' style={{ color: 'white', paddingLeft: 20 }} />
                                    </Item>
                                    <Item rounded style={{ marginVertical: 10, borderColor: 'white' }}>
                                        <Input placeholder="Url image..." onChangeText={image => this.setState({ image })} placeholderTextColor='white' style={{ color: 'white', paddingLeft: 20 }} />
                                    </Item>
                                    <Item rounded style={{ marginVertical: 10, borderColor: 'white' }}>
                                        <Input keyboardType='default' onChangeText={writer => this.setState({ writer })} placeholder="Writer..." placeholderTextColor='white' style={{ color: 'white', paddingLeft: 20 }} />
                                    </Item>
                                    <Item rounded style={{ marginVertical: 10, borderColor: 'white' }}>
                                        <Input textContentType='streetAddressLine1' onChangeText={description => this.setState({ description })} placeholder="Description..." placeholderTextColor='white' style={{ color: 'white', paddingLeft: 20 }} />
                                    </Item>
                                    <Item rounded style={{ marginVertical: 10, borderColor: 'white' }}>
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
                                    <Item rounded style={{ marginVertical: 10, borderColor: 'white' }}>
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
                                    <Item rounded style={{ marginVertical: 10, borderColor: 'white' }}>
                                        <Picker
                                            mode="dropdown"
                                            placeholder="Select status..."
                                            placeholderStyle="#fff"
                                            placeholderIconColor="#fff"
                                            style={{ paddingLeft: 20, color: 'white' }}
                                            selectedValue={statusid}
                                            onValueChange={(selected) => {
                                                this.setState({
                                                    statusid: selected
                                                })
                                            }}
                                        >
                                            {
                                                stat.map(item => (
                                                    <Picker.Item label={item.status} value={item.statusid} />
                                                ))
                                            }
                                        </Picker>
                                    </Item>
                                    <Button light rounded><Text style={{ width: '100%', textAlign: 'center' }} onPress={() => this.donateBook(data)}>Donate!</Text></Button>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </Modal>

                <Fab
                    direction="up"
                    containerStyle={{}}
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