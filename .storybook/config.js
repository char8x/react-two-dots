import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';

setOptions({
  hierarchySeparator: /\//,
  hierarchyRootSeparator: /\|/
});

function importAll(req) {
  req.keys().forEach(filename => req(filename));
}

function loadStories() {
  let req = require.context('../src/stories', true, /\.stories\.js$/);
  importAll(req);
}

configure(loadStories, module);
