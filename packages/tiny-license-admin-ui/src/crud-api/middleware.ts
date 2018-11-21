import { Middleware, Action } from "redux";
import crudApi from "./crud-api";
import actions from "./actions";
import actionTypes from "./action-types";
import { delay, isDev } from "./util";
/**
 * 
 */
const FETCH_DELAY = 1000;
/**
 * 
 */
export default function (storeKey: string, endpoint: string): Middleware {

    const { clearError, setError, setBusy, setResult } = actions(storeKey);
    const { FETCH } = actionTypes(storeKey);
    /**
     * Middleware
     */
    return function (store) {

        const callAPi = crudApi(endpoint);

        return function (next) {

            return async function <A extends Action & { payload: any, meta?: any, error?: Error | string }>(action: A) {

                if (action.type === FETCH) {
                    const { payload, error } = action;
                    if (error) {
                        return next(setError(error))
                    }
                    try {
                        next(clearError());
                        next(setBusy(true));
                        if (isDev) await delay(FETCH_DELAY);
                        const x = await callAPi(payload);
                        return next(setResult(x));
                    } catch (err) {                        
                        return next(setError(err));
                    } finally {
                        next(setBusy(false));
                    }
                }
                return next(action)
            }
        }
    }
}