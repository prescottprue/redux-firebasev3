# redux-firebasev3

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-downloads-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Code Coverage][coverage-image]][coverage-url]
[![License][license-image]][license-url]
[![Code Style][code-style-image]][code-style-url]
[![Gitter][gitter-image]][gitter-url]

> Higher Order Component (HOC) for using Firebase with React and Redux

## Deprecation Warning

[react-redux-firebase](https://github.com/prescottprue/react-redux-firebase) is the new version of this library

This library will no longer be updated under this name after `v1.0.0`, please use [react-redux-firebase](https://github.com/prescottprue/react-redux-firebase).

## Demo

View deployed version of Material Example [here](https://redux-firebasev3.firebaseapp.com/)


## Features
- Integrated into redux
- Population capability (similar to JOIN)
- Support small data ( using `value` ) or large datasets ( using `child_added`, `child_removed`, `child_changed` )
- queries support ( `orderByChild`, `orderByKey`, `orderByValue`, `orderByPriority`, `limitToLast`, `limitToFirst`, `startAt`, `endAt`, `equalTo` right now )
- Automatic binding/unbinding
- Declarative decorator syntax for React components
- Firebase v3+ support
- Support for updating and nested props
- Out of the box support for authentication (with auto load user profile)
- Lots of helper functions

## Install
**NOTE:** redux-firebasev3 has been moved to [react-redux-firebase](https://github.com/prescottprue/react-redux-firebase)

## [API](https://prescottprue.gitbooks.io/react-redux-firebase/content/)
See [API Docs](https://prescottprue.gitbooks.io/react-redux-firebase/content/)

## Generator

[generator-react-firebase](https://github.com/prescottprue/generator-react-firebase) uses react-redux-firebase when opting to include redux


## Use

Include reduxFirebase in your store compose function:


```javascript
import { createStore, combineReducers, compose } from 'redux'
import { reduxFirebase, firebaseStateReducer } from 'react-redux-firebase'

// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseStateReducer
})

// Firebase config
const config = {
  apiKey: '<your-api-key>',
  authDomain: '<your-auth-domain>',
  databaseURL: '<your-database-url>',
  storageBucket: '<your-storage-bucket>'
}

// Add redux Firebase to compose
const createStoreWithFirebase = compose(
  reduxFirebase(config, { userProfile: 'users' }),
)(createStore)

// Create store with reducers and initial state
const store = createStoreWithFirebase(rootReducer, initialState)
```

In components:
```javascript
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { firebase, helpers } from 'react-redux-firebase'
const { isLoaded, isEmpty, dataToJS } = helpers

// Can be used if firebase is used elsewhere
// import { firebaseConnect } from 'react-redux-firebase'
// @firebaseConnect( [
//   '/todos'
// ])

@firebase( [
  '/todos'
  // { type: 'once', path: '/todos' } // for loading once instead of binding
])
@connect(
  ({firebase}) => ({
    todos: dataToJS(firebase, '/todos'),
  })
)
class Todos extends Component {
  static propTypes = {
    todos: PropTypes.object,
    firebase: PropTypes.object
  }

  render() {
    const { firebase, todos } = this.props;

    // Add a new todo to firebase
    const handleAdd = () => {
      const {newTodo} = this.refs
      firebase.push('/todos', { text:newTodo.value, done:false })
      newTodo.value = ''
    }

    // Build Todos list if todos exist and are loaded
    const todosList = !isLoaded(todos)
                        ? 'Loading'
                        : isEmpty(todos)
                          ? 'Todo list is empty'
                          : Object.keys(todos).map(
                              (key, id) => (
                                <TodoItem key={key} id={id} todo={todos[key]}/>
                              )
                            )

    return (
      <div>
        <h1>Todos</h1>
        <ul>
          {todosList}
        </ul>
        <input type="text" ref="newTodo" />
        <button onClick={handleAdd}>
          Add
        </button>
      </div>
    )
  }
}
export default Todos
```

Alternatively, if you choose not to use decorators:

```javascript

const wrappedTodos = firebase([
  '/todos'
])(Todos)
export default connect(
  ({firebase}) => ({
    todos: dataToJS(firebase, '/todos'),
  })
)(wrappedTodos)

```

[npm-image]: https://img.shields.io/npm/v/redux-firebasev3.svg?style=flat-square
[npm-url]: https://npmjs.org/package/redux-firebasev3
[npm-downloads-image]: https://img.shields.io/npm/dm/redux-firebasev3.svg?style=flat-square
[travis-image]: https://img.shields.io/travis/prescottprue/redux-firebasev3/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/prescottprue/redux-firebasev3
[daviddm-image]: https://img.shields.io/david/prescottprue/redux-firebasev3.svg?style=flat-square
[daviddm-url]: https://david-dm.org/prescottprue/redux-firebasev3
[climate-image]: https://img.shields.io/codeclimate/github/prescottprue/redux-firebasev3.svg?style=flat-square
[climate-url]: https://codeclimate.com/github/prescottprue/redux-firebasev3
[coverage-image]: https://img.shields.io/codecov/c/github/prescottprue/redux-firebasev3.svg?style=flat-square
[coverage-url]: https://codecov.io/gh/prescottprue/redux-firebasev3
[license-image]: https://img.shields.io/npm/l/redux-firebasev3.svg?style=flat-square
[license-url]: https://github.com/prescottprue/redux-firebasev3/blob/master/LICENSE
[code-style-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[code-style-url]: http://standardjs.com/
[gitter-image]: https://img.shields.io/gitter/room/redux-firebase/gitter.svg?style=flat-square
[gitter-url]: https://gitter.im/redux-firebase/Lobby?utm_source=share-link&utm_medium=link&utm_campaign=share-link
[gitter-image]: https://img.shields.io/gitter/room/nwjs/nw.js.svg?style=flat-square
[gitter-url]: https://gitter.im/prescottprue/redux-firebasev3
