import { connect } from "react-redux";
import { createSelector } from "reselect";
import bindActions from "./action-binder";
import ActionView from "./action-view";
import api from "./api";
const selector = createSelector(api.selector, apiState => ({
    apiState
}))
export default connect(selector, bindActions)(ActionView);