import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { Icon } from 'native-base';

export default class SideMenu extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ScrollView>
                    <View>
                        <Text style={styles.navHeadingStyle}>Section 1</Text>
                        <View style={styles.navSectionStyle}>
                            <Text style={styles.navItemStyle}>Login</Text>
                            <Text style={styles.navItemStyle}>Register</Text>
                            <Text style={styles.navItemStyle}>Donate</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 20,
        flex: 1
    },
    navItemStyle: {
        padding: 10
    },
    navSectionStyle: {
        backgroundColor: 'lightgrey'
    },
    sectionHeadingStyle: {
        paddingVertical: 10,
        paddingHorizontal: 5
    },
    footerContainer: {
        padding: 20,
        backgroundColor: 'lightgrey'
    }
})