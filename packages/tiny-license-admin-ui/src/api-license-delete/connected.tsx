import ActionView , { ActionViewParams }from "./action-view";
import { connect } from "react-redux";
import bindActions from "./action-binder";
import api from "./api";
import { ComponentType } from "react";
import { createSelector } from "reselect";
const selector = createSelector(api.selector, apiState => ({
    apiState
}))
const Connected: ComponentType<ActionViewParams> = connect(selector, bindActions)(ActionView);
export default Connected;