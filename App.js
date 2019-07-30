import React, { Component } from 'react'

import Navbar from './src/public/components/navbar'
import MainNavigator from './src/public/navigators/MainNavigator';
import Splash from './src/screens/splash/splash';

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
        view: [<MainNavigator />]
      })
    }, 3000)
  }
  render() {
    return (
      <>
        {this.state.view}
      </>
    )
  }
}
