/**
 * https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#notes-on-client-side-routing
 * Because GitHub Pages doesn’t support routers that use the HTML5 pushState history API, so here use legacy hashHistory
 * If you won't deploy on Github ,you can use "history/createBrowserHistory"
 */
import { createHashHistory } from 'history';

const history = createHashHistory();

export default history;
