import { Reducer } from "redux";
import { MessagesState, Message } from "./types";
import actionTypes from "./action-types";
export default function(
  key: string,
  defaultState: MessagesState = {}
): Reducer {
  const {
    CLEAR,
    SET_MESSAGE,
    SET_ERROR,
    SET_INFO,
    SET_SUCCESS,
    SET_WARNING
  } = actionTypes(key);
  /** */
  return (state = defaultState, action) => {
    switch (action.type) {
      case SET_MESSAGE: {
        const { payload } = action;
        return Object.assign({}, state, payload);
      }
      case CLEAR: {
        return Object.assign({}, state, {
          message: undefined,
          status: undefined
        });
      }
      case SET_ERROR: {
        return Object.assign({}, state, {
          message: action.payload,
          status: "error"
        } as Message);
      }
      case SET_INFO: {
        return Object.assign({}, state, {
          message: action.payload,
          status: "info"
        } as Message);
      }
      case SET_SUCCESS: {
        return Object.assign({}, state, {
          message: action.payload,
          status: "success"
        } as Message);
      }
      case SET_WARNING: {
        return Object.assign({}, state, {
          message: action.payload,
          status: "warning"
        } as Message);
      }
      default:
        return state;
    }
  };
}
