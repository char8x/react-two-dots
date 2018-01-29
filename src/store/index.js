/**
 *  Store Structure
 *
 *  store ---
 *            gameArea（游戏区域） ---
 *                                    matrix（矩阵）
 *                                    panningDot（正在划线的点）
 *                                    panDirection（划线的方向）
 *                                    connectingDots（已经连接的点）
 *            gameInfo（当前关卡信息）---
 *                                    level（关卡等级）
 *                                    chances（剩余机会）
 *                                    clearDots（已经清除的点）
 *                                    score（获得的分数）
 *            settings（设置） ---
 */
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
