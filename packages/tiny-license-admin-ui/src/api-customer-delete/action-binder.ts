import { Dispatch } from "redux";
import api from "./api";
/** */
export default function(dispatch: Dispatch) {
  const actions = api.bindActions(dispatch);
  return {
    api: {
      ...actions,
      dlete: (id: string) => {
        return dispatch(
          actions.fetch({ method: "DELETE", body: { id }})
        );
      }
    }
  };
}
