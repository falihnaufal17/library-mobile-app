import React, { Component } from 'react'
import MainNavigator from './src/public/navigators/MainNavigator';
import Splash from './src/screens/splash/splash';

import { Provider } from 'react-redux'
import store from './src/public/redux/store'
import { Root } from 'native-base'

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
        view:
          <Root><MainNavigator />
          </Root>
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
