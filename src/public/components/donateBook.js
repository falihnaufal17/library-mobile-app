import React, { Component } from 'react'
import { View, ScrollView, Modal } from 'react-native'
import { Item, H1, Row, Col, Button, Text, Input, Picker, Thumbnail, Toast } from 'native-base'
import ImagePicker from 'react-native-image-picker'

// import redux
import { connect } from 'react-redux'
import { addBook, getBooks } from '../../public/redux/actions/book'
import { getCategories } from '../../public/redux/actions/category'
import { getLocations } from '../../public/redux/actions/location'
import { getStatus } from '../../public/redux/actions/status'

class DonateBook extends Component {

    constructor(props) {
        super(props)

        this.state = {
            //penampung data
            books: [],
            categories: [],
            locations: [],
            statuses: [],

            //field yang akan diisi
            title: '',
            writer: '',
            image: null,
            description: '',
            categoryid: 1,
            locationid: 1,
            statusid: 2,
            selected: undefined,
        }
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

    onValueChange(value) {
        this.setState({
            selected: value
        });
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
                    })
                })
        }
    }

    render() {
        const { categories, locations, image, categoryid, locationid } = this.state
        const cat = categories
        const loc = locations
        return (
            <Modal
                {...this.props}
                animationType='fade'
                transparent={false}
            >
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

export default connect(mapStateToProps)(DonateBook)