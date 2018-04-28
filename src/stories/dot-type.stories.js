import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';

import Dot from '../components/Dot';

storiesOf('Dot Type|Dot', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));
