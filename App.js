import React, { Component } from 'react'
import { AsyncStorage as storage } from 'react-native'
import MainNavigator from './src/public/navigators/MainNavigator';
import Splash from './src/screens/splash/splash';

import { Provider } from 'react-redux'
import store from './src/public/redux/store'
import { Root } from 'native-base'
import axios from 'axios'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      token: '',
      iduser: ''
    }

    storage.getItem('token', (error, result) => {
      if (result) {
        this.setState({
          token: result
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
  }
  componentWillMount() {
    this.state = {
      view: <Splash />
    }

    setTimeout(() => {
      this.setState({
        view:
          <Root><MainNavigator />
          </Root>
      })
    }, 2500)
  }
  render() {

    const { token, iduser } = this.state
    axios.defaults.headers.common['authorization'] = 'x-control-app'
    axios.defaults.headers.common['x-access-token'] = token
    axios.defaults.headers.common['x-control-user'] = iduser

    return (
      <>
        <Provider store={store}>
          {this.state.view}
        </Provider>
      </>
    )
  }
}
