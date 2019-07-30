import React, { Component } from 'react'
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar
} from 'react-native'

export default class Splash extends Component {
    render() {
        return (
            <View style={[styles.container]}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <Image
                    style={styles.imgCenter}
                    source={require('../../assets/logo/logo.png')}
                />
                <ActivityIndicator size="large" color="#FF7F00" />
                <Text style={{ marginTop: 20 }}>Please wait...</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    imgCenter: {
        width: '100%',
        height: 150,
        marginBottom: 50
    }
})
