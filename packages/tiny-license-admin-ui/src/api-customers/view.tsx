import { Component, Fragment } from "react";
import { Tabs, Tab } from "@material-ui/core";
import * as React from "react";
import { View as Add } from "../api-customers-add";
import { Connected as ListView } from "../api-customers-list";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import withStyles, {
  ClassNameMap,
  StyleRulesCallback
} from "@material-ui/core/styles/withStyles";
import adapter, { ViewState } from "./store";
/**
 * 
 */
interface ViewActions {
  setState(payload: Partial<ViewState>): any;
}
/**
 *
 */
const styles: StyleRulesCallback = theme => ({
  tabs: {
    flex: "1 0",
    width: "100%"
  }
});
/**
 * parameters
 */
export interface ViewParams {
  // ...
}
export type ViewProps = ViewParams & ViewState & ViewActions & { classes: ClassNameMap };
/**
 *
 */
class View extends Component<ViewProps> {
  /** */
  setTabIndex = (tabIndex: number) => {
    return () => this.props.setState({ tabIndex });
  };
  /**
   *
   */
  content = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: {
        return <ListView />;
      }
      case 1: {
        return <Add />;
      }
      default: {
        return null;
      }
    }
  };
  /** */
  render() {
    const { tabIndex, classes } = this.props;
    return (
      <Fragment>
        <Tabs
          value={tabIndex}
          fullWidth={true}
          centered={true}
          className={classes.tabs}
        >
          <Tab value={0} label={"List"} onClick={this.setTabIndex(0)} />
          <Tab value={1} label={"Add"} onClick={this.setTabIndex(1)} />
        </Tabs>
        {this.content(tabIndex)}
      </Fragment>
    );
  }
}
/**
 *
 * @param state
 */
const selector = (state: {}) => {
  const s: ViewState = adapter.selector(state);
  s.tabIndex = s.tabIndex || 0;
  return {
    ...s
  };
};
/**
 *
 * @param dispatch
 * @param props
 */
const bindActions = (dispatch: Dispatch, _props: ViewState) => {
  return {
    setState: (payload: Partial<ViewActions>) => {
      dispatch(adapter.actions.setState(payload));
    }
  } ;
};
/**
 *
 */
export default connect(selector,bindActions)(withStyles(styles)(View) as any) as any;
