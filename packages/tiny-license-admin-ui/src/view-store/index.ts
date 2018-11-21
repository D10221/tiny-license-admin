import { default as actionTypes } from "./action-types";
import { default as actions } from "./actions";
import { default as persist } from "./persist";
import { default as reducer } from "./reducer";
import { DefaultOptions } from "./default-options";
/**
 *
 * @param viewName
 */
export default function<T extends {}>(
  viewName: string,
  defaultState: T,
  options?: DefaultOptions
) {
  const storeKey = `view-store-${viewName}`;
  return {
    storeKey,
    actionTypes: actionTypes(viewName),
    actions: actions(viewName),
    persist: persist(viewName),
    reducer: reducer(viewName, defaultState, options),
    selector: (state: {}) => state[storeKey] as T
  };
}
