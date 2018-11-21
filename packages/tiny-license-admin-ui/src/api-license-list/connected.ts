import { connect } from "react-redux";
import { createSelector } from "reselect";
import api from "./api";
import ListView, { ListViewParams } from "./list-view";
import { ComponentType } from "react";
import { Dispatch } from "redux";
/** */
const selector = createSelector(api.selector, (apiState) => {
  return { apiState };
});
/** */
const bindActions = (dispatch: Dispatch) => {
  const a = api.bindActions(dispatch);
  return {
    api: {
      ...a
    }
  }
}
const Connected: ComponentType<ListViewParams> = connect(
  selector,
  bindActions
)(ListView);
/**
 *
 */
export default Connected;