import actionTypes from "./action-types";
import { FluxStandardAction } from "flux-standard-action";
/**
 *
 * @param storeKey
 */
export default function(storeKey: string) {
  const { SET_STATE, SET_VALUE, RESET,VALIDATE } = actionTypes(storeKey);
  /** */
  const setState: (
    payload: {}
  ) => FluxStandardAction<Partial<{}>, undefined> = payload => ({
    type: SET_STATE,
    payload,
    meta: undefined
  });
  const setValue = (
    key: string,
    value: any
  ): FluxStandardAction<Partial<{}>> => ({
    type: SET_VALUE,
    payload: { key, value },
    meta: undefined
  });
  const reset = (): FluxStandardAction<undefined> => ({
    type: RESET,
    payload: undefined,
    meta: undefined
  });
  const validate = (): FluxStandardAction<undefined> => ({
    type: VALIDATE,
    payload: undefined,
    meta: undefined
  })
  return {
    setState,
    setValue,
    reset,
    validate
  };
}
