import actionTypes from "./action-types";
import actions from "./actions";
import createPersist from "./persist";
import reducer from "./reducer";
import defaultOptions, { DefaultOptions } from "./default-options";
import actionBinder from "./action-binder";
import { AnyData } from "./types";
import selector from "./selector";
//import middleware from "./middleware";
/**
 *
 * @param name
 */
export default function createStore<T extends AnyData>(name: string, defaultState: T, options?: DefaultOptions) {
  options = Object.assign({}, defaultOptions, options);
  const storeKey = `${options.prefix}-${name}`
  let persist;
  if (!(options && options.persist && options.persist.off)) {
    persist = createPersist(storeKey);
  }

  return {
    actions: actions(storeKey),
    actionTypes: actionTypes(storeKey),
    bindActions: actionBinder(storeKey),
    // middleware: options.validation && middleware(storeKey, options.validation),
    reducer: reducer(storeKey, defaultState, persist),
    selector: selector<T>(storeKey),
    storeKey,
  };
}
