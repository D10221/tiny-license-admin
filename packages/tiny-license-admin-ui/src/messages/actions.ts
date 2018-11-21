import { FluxStandardAction } from "flux-standard-action";
import actionTypes from "./action-types";
import { Message } from "./types";
/**
 *
 */
export default function(key: string) {
  const {
    CLEAR,
    SET_MESSAGE,
    SET_ERROR,
    SET_WARNING,
    SET_INFO,
    SET_SUCCESS
  } = actionTypes(key);
 
  const setMessage = (payload: Message): FluxStandardAction<Message> => ({
    type: SET_MESSAGE,
    payload,
    meta: undefined
  });
  const clearMessage = (): FluxStandardAction<undefined> => ({
    type: CLEAR,
    payload: undefined,
    meta: undefined
  });
  const setError = (
    message: string | Error | undefined
  ): FluxStandardAction<string | undefined> => ({
    type: SET_ERROR,
    payload: !message
      ? message
      : typeof message === "string"
        ? message
        : message.message
          ? message.message
          : message.toString(),
    meta: undefined
  });
  const setInfo = (message: string): FluxStandardAction<string> => ({
    type: SET_INFO,
    payload: message,
    meta: undefined
  });
  const setSuccess = (message: string): FluxStandardAction<string> => ({
    type: SET_SUCCESS,
    payload: message,
    meta: undefined
  });
  const setWarning = (message: string): FluxStandardAction<string> => ({
    type: SET_WARNING,
    payload: message,
    meta: undefined
  });

  return {
    clearMessage,    
    setMessage,
    setError,
    setInfo,
    setSuccess,
    setWarning
  };
}
