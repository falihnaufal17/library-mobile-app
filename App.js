import React, { Component } from 'react'
import MainNavigator from './src/public/navigators/MainNavigator';
import Splash from './src/screens/splash/splash';

import { Provider } from 'react-redux'
import store from './src/public/redux/store'

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
        view: <Provider store={store}>
          <MainNavigator />
        </Provider>
      })
    }, 2500)
  }
  render() {
    return (
      <>
        {this.state.view}
      </>
    )
  }
}
