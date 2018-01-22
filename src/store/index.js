import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import rootReducer from './root-reducer'

function getComposeEnhancers() {
  if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
    return window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  }
  return compose
}

export default history => {
  const composeEnhancers = getComposeEnhancers()
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk, routerMiddleware(history)))
  )

  return store
}
