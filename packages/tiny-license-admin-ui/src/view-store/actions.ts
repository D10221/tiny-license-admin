import actionTypes from "./action-types";
import { FluxStandardAction } from "flux-standard-action";
/**
 *
 * @param viewName
 */
export default function(viewName: string) {
  const { SET_STATE } = actionTypes(viewName);
  /** */
  const setState: (
    payload: {}
  ) => FluxStandardAction<Partial<{}>, undefined> = payload => ({
    type: SET_STATE,
    payload,
    meta: undefined
  });
  return {
    setState
  };
}
