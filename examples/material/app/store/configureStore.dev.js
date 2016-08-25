import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { syncHistory } from 'react-router-redux'
import { firebase as fbConfig } from '../config'
import { reduxReactFirebase } from 'redux-firebasev3'
// import { reduxFirebase } from 'redux-firebase' // >= v0.1.1

export default function configureStore (initialState, history) {
  const reduxRouterMiddleware = syncHistory(history)
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk, reduxRouterMiddleware),
    reduxReactFirebase(fbConfig, { userProfile: 'users' }),
    // reduxFirebase(fbConfig, { userProfile: 'users' })  // >= v0.1.1
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore)
  const store = createStoreWithMiddleware(rootReducer)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
