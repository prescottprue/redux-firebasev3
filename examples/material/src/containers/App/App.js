import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import getMuiTheme from 'material-ui/styles/getMuiTheme'

// Components
import Navbar from '../../components/Navbar/Navbar'

// Styling
import Theme from '../../theme'
import './App.css'

// Tap Plugin
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

import { firebase, helpers } from 'redux-firebasev3'
const { pathToJS } = helpers

@firebase()
@connect(
  // Map state to props
  ({firebase}) => ({
    account: pathToJS(firebase, 'profile')
  })
)
export default class Main extends Component {

  static childContextTypes = {
    muiTheme: React.PropTypes.object
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  static propTypes = {
    account: PropTypes.object,
    children: PropTypes.object,
    hydrateUser: PropTypes.func,
    logout: PropTypes.func
  }

  getChildContext = () => {
    return {
      muiTheme: getMuiTheme(Theme)
    }
  }

  handleClick = loc => {
    this.context.router.push(`/${loc}`)
  }

  handleLogout = () => {
    this.props.logout()
    this.context.router.push('/')
  }

  render () {
    return (
      <div className='App'>
        <Navbar
          account={this.props.account}
          onMenuClick={this.handleClick}
          onLogoutClick={this.handleLogout}
        />
        {this.props.children}
      </div>
    )
  }
}
