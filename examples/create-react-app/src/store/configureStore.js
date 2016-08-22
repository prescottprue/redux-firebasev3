import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
import { syncHistoryWithStore } from 'react-router-redux'
import { reduxFirebase } from 'redux-firebasev3'

// Firebase config
const config = {
  apiKey: 'AIzaSyBWtt-UVc9I7ZMADqn3-WyoJB-L2HQrRhk',
  authDomain: 'pruvit-968.firebaseapp.com',
  databaseURL: 'https://pruvit-968.firebaseio.com',
  storageBucket: 'pruvit-968.appspot.com'
}

// Firebase config
// const config = {
//   apiKey: 'AIzaSyBWtt-UVc9I7ZMADqn3-WyoJB-L2HQrRhk',
//   authDomain: 'pruvit-968.firebaseapp.com',
//   databaseURL: 'https://pruvit-968.firebaseio.com',
//   storageBucket: 'pruvit-968.appspot.com'
// }

export default function configureStore (initialState, history) {
  const createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    reduxFirebase(config, { userProfile: 'users' }),
    typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f
  )(createStore)
  const store = createStoreWithMiddleware(rootReducer, initialState)
  
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
