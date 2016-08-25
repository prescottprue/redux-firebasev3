import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { syncHistory } from 'react-router-redux'
import { firebase as fbConfig } from '../config'
import { reduxReactFirebase } from 'redux-firebasev3' // >= v0.1.0
// import { reduxFirebase } from 'redux-firebase' // >= v0.1.1

export default function configureStore (initialState, history) {
  const reduxRouterMiddleware = syncHistory(history)
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, reduxRouterMiddleware),
    reduxReactFirebase(fbConfig, { userProfile: 'users' }) // >= v0.1.0
    // reduxFirebase(fbConfig, { userProfile: 'users' })  // >= v0.1.1
  )(createStore)
  const store = createStoreWithMiddleware(rootReducer, initialState)

  return store
}
