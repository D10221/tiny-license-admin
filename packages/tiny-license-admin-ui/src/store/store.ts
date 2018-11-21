import thunk from "redux-thunk";
import {
  applyMiddleware,
  combineReducers,
  createStore,
  Middleware,
  compose
} from "redux";
import { createBrowserHistory } from "history";
import { routerReducer, routerMiddleware } from "react-router-redux";
import reducers from "./reducers";
import views from "./views";
import middleware from "./middleware";
import apis from "./apis";
/** */
const promiseMiddleware = require("redux-promise").default as Middleware;

const actionContext = {};
const browserHistory = createBrowserHistory();
/**
 * dev-tools
 */
const composeEnhancers =
  process.env.NODE_ENV === "production"
    ? compose
    : typeof window === "object" &&
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
          // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
        })
      : compose;

/** */
export const store = createStore(
  combineReducers({
    router: routerReducer,
    ...reducers,
    ...views,
    ...apis
  }),
  composeEnhancers(applyMiddleware(
    thunk.withExtraArgument(actionContext),
    promiseMiddleware,
    routerMiddleware(browserHistory as any),
    ...middleware
  ) as any)
);
/**
 *
 */
export const history = browserHistory;
