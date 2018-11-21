
export default function (storeKey: string) {
    const FETCH = `@${storeKey}/fetch`;
    const CLEAR_ERROR = `@${storeKey}/clear-error`;
    const CLEAR_RESULT = `${storeKey}/clear-result`;
    const CLEAR_SUCCESS = `@${storeKey}/clear-success`;
    const RESET = `@${storeKey}/reset`;
    const SET_ERROR = `@${storeKey}/set-error`;
    const SET_BUSY = `@${storeKey}/set-busy`;
    const SET_RESULT = `${storeKey}/set-result`;
    const SET_STATE = `@${storeKey}/set-state`;
    return {
        CLEAR_ERROR,
        CLEAR_RESULT,
        CLEAR_SUCCESS,
        SET_BUSY,
        SET_ERROR,
        FETCH,
        RESET,
        SET_RESULT,
        SET_STATE,
    }
}