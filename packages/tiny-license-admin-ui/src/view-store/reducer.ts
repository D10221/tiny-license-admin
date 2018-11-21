import { Reducer } from "redux";
import actionTypes from "./action-types";
import persist from "./persist";
import defaultOptions from "./default-options";
/**
 *
 * @param viewName
 * @param defaultState
 */
export default function(
  viewName: string,
  defaultState = {},
  options?: Partial<typeof defaultOptions>
): Reducer {
  const { SET_STATE } = actionTypes(viewName);
  /** */
  options = Object.assign({}, defaultOptions, options||{});
  /** */
  const { trySet, tryParse } = persist(
    viewName, options.persist && options.persist.transform
  );
  const persistOff = options.persist && options.persist.off;
  const preloaded = persistOff ? defaultState : tryParse(defaultState);
  /**
   *
   */
  return (state = preloaded, action) => {
    switch (action.type) {
      case SET_STATE: {
        const _newSTate = Object.assign({}, state, action.payload);
        !persistOff && trySet(_newSTate);
        return _newSTate;
      }
      default:
        return state;
    }
  };
}
