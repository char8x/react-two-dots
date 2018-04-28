import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, text, number } from '@storybook/addon-knobs';

import {
  COLOR_BLUE,
  COLOR_GREEN,
  COLOR_PURPLE,
  COLOR_RED,
  COLOR_TRANS,
  COLOR_YELLOW
} from '../utils/constants';
import AnimateDot, { Dot } from '../components/Dot/SimpleDot';

storiesOf('Dot Type|Dot', module)
  .addDecorator(withKnobs)
  .add('Dot', () => (
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
  ))
  .add('as dynamic variables', () => {
    const name = text('Name', 'Arunoda Susiripala');
    const age = number('Age', 89);

    const content = `I am ${name} and I'm ${age} years old.`;
    return <div>{content}</div>;
  });
