import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import Loading from '../components/Loading';

const GameMap = Loadable({
  loader: () => import('../components/GameMap'),
  loading: Loading
});

const Game = Loadable({
  loader: () => import('../components/Game'),
  loading: Loading
});

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={GameMap} />
        <Route path="/level/:id" component={Game} />
      </Switch>
    );
  }
}
export default withRouter(connect()(Routes));
