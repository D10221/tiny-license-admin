import actions from "./actions";
import { Dispatch } from "redux";
import { CrudApiRequest, CrudApiActions } from "./types";
/** */
export default function actionBinder(storeKey: string) {
    const a = actions(storeKey);
    const { fetch, clearError, clearResult,reset, setResult, setBusy, setError, clearSuccess, setState } = a;
    return function bindActions(dispatch: Dispatch): CrudApiActions {
        return {
            fetch: (payload: CrudApiRequest) => dispatch(fetch(payload)),
            clearError: () => dispatch(clearError()),
            clearResult: () => dispatch(clearResult()),
            clearSuccess: () => dispatch(clearSuccess()),
            setBusy: (busy: boolean) => dispatch(setBusy(busy)),
            setError: (error: string | Error) => dispatch(setError(error)),
            setResult: (data: any) => dispatch(setResult(data)),
            setState: (payload:{}) => dispatch(setState(payload)),
            reset: ()=> dispatch(reset())
        }
    }
}