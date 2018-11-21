import { Dispatch } from "redux";
import api, { ApiItem } from "./api";
/** */
export default function (dispatch: Dispatch) {
  const actions = api.bindActions(dispatch);
  return {
    api: {
      ...actions,
      send: (body: ApiItem) => {
        return dispatch(
          actions.fetch({ method: "POST", body })
        );
      }
    }
  };
}
