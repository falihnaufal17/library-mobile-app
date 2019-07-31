import React, { Component } from 'react'
import MainNavigator from './src/public/navigators/MainNavigator';
import Splash from './src/screens/splash/splash';

import { Provider } from 'react-redux'
import store from './src/public/redux/store'
import axios from 'axios';

export default class App extends Component {
  constructor(props) {
    super(props)
  }
  componentWillMount() {
    this.state = {
      view: <Splash />
    }

    setTimeout(() => {
      this.setState({
        view: <MainNavigator />
      })
    }, 2500)
  }
  render() {
    return (
      <>
        <Provider store={store}>
          {this.state.view}
        </Provider>
      </>
    )
  }
}
