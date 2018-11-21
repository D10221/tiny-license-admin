import { Reducer, AnyAction } from "redux";
import actionTypes from "./action-types";
import { CrudApiOptions, CrudApiState } from "./types";
import defaultOptions from "./default-options";
/**
 *
 * @param endpoint
 */
export default function<T>(
  endpoint: string,
  defaultState: CrudApiState<T>,
  options: Partial<CrudApiOptions> = defaultOptions
): Reducer {
  const {
    CLEAR_ERROR,
    CLEAR_RESULT,
    CLEAR_SUCCESS,
    FETCH,
    RESET,
    SET_BUSY,
    SET_ERROR,
    SET_RESULT
  } = actionTypes(endpoint);
  const o: CrudApiOptions = Object.assign({}, defaultOptions, options);
  const { resultKey } = o;
  /**
   *
   */
  return (state: CrudApiState<T> = defaultState, action: AnyAction) => {
    switch (action.type) {
      case SET_BUSY: {
        const { payload } = action;
        const busy = !!payload;
        if (busy) {
          return Object.assign({}, state, { busy, success: false });
        }
        return Object.assign({}, state, { busy });
      }
      case FETCH: {
        return state; // catched by Middleware
      }
      case SET_RESULT: {
        const { payload } = action;
        return Object.assign({}, state, {
          [resultKey]: payload,
          success: true
        });
      }
      case CLEAR_ERROR: {
        return Object.assign({}, state, { error: undefined });
      }
      case CLEAR_RESULT: {
        return Object.assign({}, state, {
          [resultKey]: defaultState[resultKey]
        });
      }
      case CLEAR_SUCCESS: {
        return Object.assign({}, state, { success: false });
      }
      case RESET: {
        return {
          ...state,
          ...{
            [resultKey]: defaultState[resultKey],
            success: false,
            error: undefined
          }
        };
      }
      case SET_ERROR: {
        const { payload } = action;
        let error: string;
        if (payload instanceof TypeError || payload.name === "TypeError") {
          error = "Network Error";
        } else {
          error =
            typeof payload === "string"
              ? payload
              : payload && payload.message
                ? payload.message
                : payload;
        }
        const error_code = payload && payload.code ? payload.code : 0;
        return Object.assign({}, state, { error, error_code, success: false });
      }
      default:
        return state;
    }
  };
}
