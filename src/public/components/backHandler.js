import { Alert, BackHandler } from 'react-native'

const handleAndroidBackButton = callback => {
    BackHandler.addEventListener('hardwareBackPress', () => {
        callback()
        return true
    })
}

const removeAndroidBackButtonHandler = () => {
    BackHandler.removeEventListener('hardwareBackPress', () => { })
}

const exitAlert = () => {
    Alert.alert(
        'Confirm Exit',
        'Apakah kamu ingin keluar?'
        [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Ok', onPress: () => BackHandler.exitApp() }
        ]
    )
}

export { handleAndroidBackButton, removeAndroidBackButtonHandler, exitAlert }