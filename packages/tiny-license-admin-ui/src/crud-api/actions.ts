import { CrudApiRequest } from "./types";
import actionTypes from "./action-types";
import { FluxStandardAction } from "flux-standard-action";
const log =
  process.env.NODE_ENV !== "production" ? console.log.bind(console) : () => {};
log("crud-api-actions");
/**
 * Create Actions
 */
export default function(storeKey: string) {
  const {
    CLEAR_ERROR,
    CLEAR_RESULT,
    CLEAR_SUCCESS,
    FETCH,
    RESET,
    SET_BUSY,
    SET_ERROR,
    SET_RESULT,
    SET_STATE
  } = actionTypes(storeKey);
  /**
   * Actions
   */
  return {
    fetch: (payload: CrudApiRequest): FluxStandardAction<CrudApiRequest> => ({
      type: FETCH,
      payload,
      meta: undefined
    }),
    clearError: (): FluxStandardAction<undefined> => ({
      type: CLEAR_ERROR,
      payload: undefined,
      meta: undefined
    }),
    clearResult: (): FluxStandardAction<undefined> => ({
      type: CLEAR_RESULT,
      payload: undefined,
      meta: undefined
    }),
    clearSuccess: (): FluxStandardAction<undefined> => ({
      type: CLEAR_SUCCESS,
      payload: undefined,
      meta: undefined
    }),
    reset: (): FluxStandardAction<undefined> =>({
        type: RESET,
        payload: undefined,
        meta: undefined
    }),
    setBusy: (payload: boolean): FluxStandardAction<boolean> => ({
      type: SET_BUSY,
      payload,
      meta: undefined
    }),
    setError: (
      payload: string | Error
    ): FluxStandardAction<string | Error> => ({
      type: SET_ERROR,
      payload,
      meta: undefined
    }),
    setResult: (payload: any): FluxStandardAction<any> => ({
      type: SET_RESULT,
      payload,
      meta: undefined
    }),
    setState: (payload: {}): FluxStandardAction<{}> => ({
      type: SET_STATE,
      payload,
      meta: undefined
    })
  };
}
