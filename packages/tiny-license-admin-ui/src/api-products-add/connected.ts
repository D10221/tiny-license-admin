import { Dispatch } from "redux";
import actionBinder from "./action-binder";
import View, { ViewParams } from "./view";
import adapter from "./store";
import formStore from "./form-store";
import { connect } from "react-redux";
import { ComponentType } from "react";
import { createSelector } from "reselect";
import api from "./api";
/** */
const selector = createSelector(
  adapter.selector,
  formStore.selector,
  api.selector,
  (state, formData, apiData) => { 
    return { ...state, formData, apiState: apiData };
  }
);
/** */
const bindActions = (dispatch: Dispatch) => {
  return {
    ...actionBinder(dispatch),
    ...formStore.bindActions(dispatch),
    api: api.bindActions(dispatch),
  };
};
/** */
const Connected: ComponentType<ViewParams> = connect(
  selector,
  bindActions
)(View);
export default Connected;
