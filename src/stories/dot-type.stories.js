import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';

import {
  COLOR_BLUE,
  COLOR_GREEN,
  COLOR_PURPLE,
  COLOR_RED,
  COLOR_TRANS,
  COLOR_YELLOW,
} from '../utils/constants';
import AnimateDot, { Dot } from '../components/Dot';
import DotList from '../components/GameArea/DotList';
import Game from '../components/Game';
import levels from '../models/levels';
import createStore from '../store';
import history from '../utils/history';
import gameAreaActions from '../store/gamearea/actions';
import Switch from '../components/Switch';

const store = createStore(history);

storiesOf('Dot Type|Dot', module)
  .addDecorator(withKnobs)
  .add('Simple Dot', () => (
    <React.Fragment>
      {[
        COLOR_BLUE,
        COLOR_GREEN,
        COLOR_PURPLE,
        COLOR_RED,
        COLOR_TRANS,
        COLOR_YELLOW,
      ].map(v => <Dot key={v} diam={20} color={v} />)}
    </React.Fragment>
  ))
  .add('AnimateDot', () => (
    <React.Fragment>
      {[
        COLOR_BLUE,
        COLOR_GREEN,
        COLOR_PURPLE,
        COLOR_RED,
        COLOR_TRANS,
        COLOR_YELLOW,
      ].map(v => (
        <AnimateDot
          key={v}
          diam={20}
          color={v}
          onTap={action('onTap')}
          clear={boolean('clear', false)}
          bounce={boolean('bounce', false)}
        />
      ))}
    </React.Fragment>
  ));

storiesOf('Dot Type|Dot List', module)
  .addDecorator(withKnobs)
  .add('Level 1', prop => {
    // TODO: using storybook knobs select different levels
    const level = levels[0].data();
    return <DotList data={level.array} boardHeight={level.height} />;
  })
  .add('Level 2', prop => {
    const level = levels[1].data();
    return <DotList data={level.array} boardHeight={level.height} />;
  })
  .add('Level 3', prop => {
    const level = levels[2].data();
    return <DotList data={level.array} boardHeight={level.height} />;
  });

storiesOf('Dot Type|Board List', module)
  .addDecorator(withKnobs)
  .add('Level 1', prop => {
    // TODO: using storybook knobs select different levels
    store.dispatch(gameAreaActions.initGame(1));
    store.dispatch(gameAreaActions.showBoard());
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  })
  .add('Level 2', prop => {
    store.dispatch(gameAreaActions.initGame(2));
    store.dispatch(gameAreaActions.showBoard());
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  })
  .add('Level 3', prop => {
    store.dispatch(gameAreaActions.initGame(3));
    store.dispatch(gameAreaActions.showBoard());
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    );
  });

storiesOf('Switch', module).add('Switch', () => {
  return <Switch />;
});
