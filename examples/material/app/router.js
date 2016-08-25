import React from 'react' // eslint-disable-line
import { Route, IndexRoute, Router } from 'react-router'
import {
    Account,
    App,
    Home,
    Login,
    NotFound,
    Signup
  } from './containers'

export default function (history) {
  return (
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Home} />
        <Route path='account' component={Account} />
        <Route path='login' component={Login} />
        <Route path='signup' component={Signup} />
        <Route path='*' component={NotFound} />
      </Route>
    </Router>
  )
}
