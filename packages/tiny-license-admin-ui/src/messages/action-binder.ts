import actions from "./actions";
import { Dispatch } from "redux";
import { Message } from "./types";
/**
 *
 */
export default function actionBinder(key: string) {
  /**
   *
   */
  return function bindActions(dispatch: Dispatch) {
    const {
      clearMessage,
      setError,
      setInfo,
      setMessage,
      setSuccess,
      setWarning
    } = actions(key);

    return {
      clearMessage: () => {
        return dispatch(clearMessage());
      },
      setError: (error: Error | string | undefined) => {
        return dispatch(setError(error));
      },
      setInfo: (message: string) => {
        return dispatch(setInfo(message));
      },
      setMessage: (message: Message) => {
        return dispatch(setMessage(message));
      },
      setSuccess: (message: string) => {
        return dispatch(setSuccess(message));
      },
      setWarning: (message: string) => {
        return dispatch(setWarning(message));
      }
    };
  };
}
