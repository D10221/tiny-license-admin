import { Dispatch } from "redux";
import createActions from "./actions";
import { FormDataActions } from "./types";
/**
 *
 */
export default function(viewName: string) {
  const actions = createActions(viewName);
  /**
   *
   */
  return (dispatch: Dispatch) => {
    return {
      setFormState: (data: {}) => {
        dispatch(actions.setState(data));
      },
      setFormValue: (key: string, value: any) => {
        dispatch(actions.setValue(key, value));
      },
      resetForm: () => {
        dispatch(actions.reset());
      },
      validate:()=>{
        dispatch(actions.validate());
      }
    } as FormDataActions;
  };
}
