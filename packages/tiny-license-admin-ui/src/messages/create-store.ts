import actionTypes from "./action-types";
import actions from "./actions";
import reducer from "./reducer";
import storeKey from "./store-key";
import selector from "./selector";
import actionBinder from "./action-binder";
/**
 * 
 */
export default function (key: string) {
    return {
        bindActions: actionBinder(key),
        actionTypes: actionTypes(key),
        actions: actions(key),
        reducer: reducer(key),
        storeKey: storeKey(key),
        selector: selector(key)
    }
}