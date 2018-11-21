import { Reducer } from "redux";
import actionTypes from "./action-types";
import { Persist } from "./persist";
/**
 *
 * @param storeKey
 * @param defaultState
 */
export default function(
  storeKey: string,
  defaultState = {},
  persist?: Persist
): Reducer {
    
  const { SET_STATE, SET_VALUE, RESET } = actionTypes(storeKey);      
  const preloaded = !persist ? defaultState : persist.tryParse(defaultState);
  /**
   *
   */
  return (state = preloaded, action) => {
    switch (action.type) {
      case SET_STATE: {
        const _newSTate = Object.assign({}, state, action.payload);
        persist && persist.trySet(_newSTate);
        return _newSTate;
      }
      case SET_VALUE: {
        const { key, value} = action.payload;
        const _newSTate = Object.assign({}, state, { [key]:value});
        persist && persist.trySet(_newSTate);
        return _newSTate;
      }
      case RESET: {
        persist && persist.trySet(defaultState);
        return Object.assign({}, state, defaultState);
      }
      default:
        return state;
    }
  };
}
