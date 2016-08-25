import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'

const {dataToJS, pathToJS} = helpers

@firebase(['/cars'])
@connect(
  ({firebase}) => ({
    cars: dataToJS(firebase, '/cars'),
    profile: pathToJS(firebase, 'profile')
  })
)
export default class App extends Component {
  render () {
    console.log('props:', this.props)
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>redux-firebasev3 demo</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    )
  }
}
