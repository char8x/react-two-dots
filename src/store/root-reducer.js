import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import gameAreaReducer from './gamearea/reducer'

export default combineReducers({
  router: routerReducer,
  gameArea: gameAreaReducer
})
