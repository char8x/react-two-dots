import React from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import Loadable from 'react-loadable';

import Responsive from '../components/Responsive';
import Loading from '../components/Loading';

const GameMap = Loadable({
  loader: () => import('../components/GameMap'),
  loading: Loading
});

const Game = Loadable({
  loader: () => import('../components/Game'),
  loading: Loading
});

const ResponsiveGameMap = () => (
  <Responsive>
    <GameMap />
  </Responsive>
);

const ResponsiveGame = () => (
  <Responsive>
    <Game />
  </Responsive>
);

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ResponsiveGameMap} />
        <Route path="/level/:id" component={ResponsiveGame} />
        <Redirect to="/" /> {/* If no match, redirect to home */}
      </Switch>
    );
  }
}
export default withRouter(connect()(Routes));
