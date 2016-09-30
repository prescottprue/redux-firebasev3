import React, { Component, PropTypes } from 'react'
import logo from './logo.svg'
import './App.css'
import TodoItem from './TodoItem'

//redux/firebase
import { connect } from 'react-redux'
import { firebase, helpers } from 'redux-firebasev3'
const { isLoaded, isEmpty, pathToJS, dataToJS } = helpers

class App extends Component {
  static propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.shape({
      push: PropTypes.func.isRequired
    })
  }
  render () {
    const { firebase, todos } = this.props
    const handleAdd = () => {
      const { newTodo } = this.refs
      firebase.push('/todos', { text: newTodo.value, done: false })
      newTodo.value = ''
    }

    const todosList = (!isLoaded(todos))
                        ? 'Loading'
                        : (isEmpty(todos))
                          ? 'Todo list is empty'
                          : Object.keys(todos).map((key) => (
                              <TodoItem key={key} id={key} todo={todos[key]} />
                            ))
    return (
      <div className="App">
        <div className="App-header">
          <h2>redux-firebasev3 demo</h2>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div className="App-todos">
          <h4>
            Loaded From
            <span className="App-Url">
              <a href="https://redux-firebasev3.firebaseio.com/">
                redux-firebasev3.firebaseio.com
              </a>
            </span>
          </h4>
          <h4>Todos List</h4>
          {todosList}
          <h4>New Todo</h4>
          <input type="text" ref="newTodo" />
          <button onClick={handleAdd}>Add</button>
        </div>
      </div>
    )
  }
}
const fbWrappedComponent = firebase([
  '/todos',
  // { type: 'once', path: '/todos' } // for loading once instead of binding
])(App)

export default connect(
  ({firebase}) => ({
    todos: dataToJS(firebase, 'todos'),
    profile: pathToJS(firebase, 'profile'),
    auth: pathToJS(firebase, 'auth')
  })
)(fbWrappedComponent)
