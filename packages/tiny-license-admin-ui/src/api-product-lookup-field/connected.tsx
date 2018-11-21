import { connect } from "react-redux";
import { Dispatch } from "redux";
import { createSelector } from "reselect";
import api from "./api";
import LookupField, { LookupFieldParams } from "./lookup-field";
const selector = createSelector(api.selector, (state) => ({ apiState: state }));
const bindActions = (dispatch: Dispatch) => {
    return {
        api: api.bindActions(dispatch)
    }
}
/**
 * 
 */
const Connected: React.ComponentType<LookupFieldParams> = connect(selector, bindActions)(LookupField);
export default Connected;