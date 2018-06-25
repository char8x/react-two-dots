import { ConnectedRouter } from 'react-router-redux';
import { injectGlobal } from 'styled-components';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';

import Routes from './routes';
import createStore from './store';
import history from './utils/history';
import { subscribeProgress } from './utils/progress-storage';
import { subscribeBgmMusic } from './utils/bgm';
import './utils/trigger-audio-effect';
import registerServiceWorker from './registerServiceWorker';

injectGlobal`
  html,body {
    margin: 0;
    padding: 0;
    font-family: "HanHei SC","PingHei","PingFang SC","STHeitiSC-Light","Helvetica Neue","Helvetica","Arial",sans-serif;
    box-sizing: border-box;
    overflow: hidden; /* This approach only works for desktop browsers, and mobile Android. */
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    user-select: none;
  }
`;

const store = createStore(history);
subscribeProgress(store);
subscribeBgmMusic(store);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Routes />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
