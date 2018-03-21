# React Two Dots Game

Work in progress. See TODO.md for features not implemented yet.

The [original app](https://www.dots.co/twodots/) is designed and developed by Playdots, Inc.. This project is simply a personal attempt to test my limit in building intricate interfaces with React.

## Deploy

- Because [GitHub Pages doesn’t support routers that use the HTML5 pushState history API](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#notes-on-client-side-routing), I choose use `hashHistory` instead. If you deploy in other places, you can choose to use
 `browserHistory`. 

- Because this repo serves on Github Pages with relative path, [this config](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#serving-the-same-build-from-different-paths) in `packages.json` helps.
```json
"homepage":"."
```