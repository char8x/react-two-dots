import { ConnectedRouter } from 'react-router-redux'
import { injectGlobal } from 'styled-components'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import GameMap from './components/GameMap'
import createStore from './store'
import history from './utils/history'
import registerServiceWorker from './registerServiceWorker'

injectGlobal`
  html,body {
    margin: 0;
    padding: 0;
    font-family: "HanHei SC","PingHei","PingFang SC","STHeitiSC-Light","Helvetica Neue","Helvetica","Arial",sans-serif;
    box-sizing: border-box;
    overflow: hidden;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
  }
`

const store = createStore(history)

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <GameMap />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
