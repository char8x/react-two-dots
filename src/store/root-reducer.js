import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import gameAreaReducer from './gamearea/reducer'
import gameInfoReducer from './gameinfo/reducer'

export default combineReducers({
  router: routerReducer,
  gameArea: gameAreaReducer,
  gameInfo: gameInfoReducer
})
