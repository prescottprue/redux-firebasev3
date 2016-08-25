import React, { Component } from 'react'
import './App.css'
import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'

const { isLoaded, dataToJS, pathToJS } = helpers

@firebase(['/cars'])
@connect(
  ({firebase}) => ({
    cars: dataToJS(firebase, '/cars'),
    profile: pathToJS(firebase, 'profile'),
  })
)
export default class App extends Component {
  render() {
    console.log('props:', this.props)
    const { cars } = this.props
    return (
      <div className="App">
        <div className="App-header">
          <h2>redux-firebasev3 demo</h2>
        </div>
        <div className="App-intro">
          {
            isLoaded(cars)
            ? Object.keys(cars).map((key, i) => {
                const car = cars[key]
                return (
                  <div key={`Car-${i}`}>
                    <span>
                      Name: { car.name || 'no name'}<br/>
                      Hp: { car.hp }
                    </span>
                  </div>
                )
              })
            : <span>Loading...</span>
          }
        </div>
      </div>
    );
  }
}

export default App;
