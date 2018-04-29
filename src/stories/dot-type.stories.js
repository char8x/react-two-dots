import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean } from '@storybook/addon-knobs';

import {
  COLOR_BLUE,
  COLOR_GREEN,
  COLOR_PURPLE,
  COLOR_RED,
  COLOR_TRANS,
  COLOR_YELLOW
} from '../utils/constants';
import AnimateDot, { Dot } from '../components/Dot/Dot';
import DotList from '../components/GameArea/DotList';
import levels from '../models/levels';

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
        COLOR_YELLOW
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
        COLOR_YELLOW
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
    const level = levels[0].data();
    return (
      <DotList
        data={level.array}
        boardHeight={level.height}
        boardWidth={Math.floor(level.array.length / level.height)}
      />
    );
  })
  .add('Level 2', prop => {
    const level = levels[1].data();
    return (
      <DotList
        data={level.array}
        boardHeight={level.height}
        boardWidth={Math.floor(level.array.length / level.height)}
      />
    );
  })
  .add('Level 3', prop => {
    const level = levels[2].data();
    return (
      <DotList
        data={level.array}
        boardHeight={level.height}
        boardWidth={Math.floor(level.array.length / level.height)}
      />
    );
  });

storiesOf('Dot Type|Board List', module)
  .addDecorator(withKnobs)
  .add('Level 1', prop => {
    const level = levels[0].data();
    return (
      <DotList
        data={level.array}
        boardHeight={level.height}
        boardWidth={Math.floor(level.array.length / level.height)}
      />
    );
  })
  .add('Level 2', prop => {
    const level = levels[1].data();
    return (
      <DotList
        data={level.array}
        boardHeight={level.height}
        boardWidth={Math.floor(level.array.length / level.height)}
      />
    );
  })
  .add('Level 3', prop => {
    const level = levels[2].data();
    return (
      <DotList
        data={level.array}
        boardHeight={level.height}
        boardWidth={Math.floor(level.array.length / level.height)}
      />
    );
  });
