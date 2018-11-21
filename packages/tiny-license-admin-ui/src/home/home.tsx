import * as React from "react";
import { Component } from "react";
import { Tabs, Tab, StyleRulesCallback, withStyles } from "@material-ui/core";
import { CustomersView } from "../api-customers";
import { View } from "../api-products";
import { View as LicensesView } from "../api-licenses";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import adapter from "./adapter";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
/**
 *
 */
interface HomeState {
  tabIndex: number;
}
/**
 *
 */
export interface HomeProps {}
/**
 *
 */
interface HomeActions {
  setState(payload: Partial<HomeState>): any;
}
/** */
const styles: StyleRulesCallback = theme => ({
  tabs: {
    flex: "1 0",
    width: "100%"
  }
});
/**
 *
 */
/** */
class Home extends Component<
  HomeProps & HomeState & HomeActions & { classes: ClassNameMap }
> {
  /**
   *
   */
  set = (state: Partial<HomeProps>) => {
    this.props.setState(state);
  };
  /**
   *
   */
  setTabIndex = (tabIndex: number) => {
    return () => {
      this.set({ tabIndex });
    };
  };
  /**
   *
   */
  renderTab = (tabIndex: number) => {
    switch (tabIndex) {
      case 0: {
        return <CustomersView />;
      }
      case 1: {
        return <View />;
      }
      case 2: {
        return <LicensesView />;
      }
      default: {
        return null;
      }
    }
  };
  /**
   *
   */
  render() {
    const { tabIndex, classes } = this.props;
    return (
      <React.Fragment>
        <Tabs title="Tabs" 
          value={tabIndex} 
          fullWidth 
          centered={true}
          className={classes.tabs}>
          <Tab
            tabIndex={0}
            title="Customers"
            label="Customers"
            onClick={this.setTabIndex(0)}
          />
          <Tab
            tabIndex={1}
            title="Products"
            label="Products"
            onClick={this.setTabIndex(1)}
          />
          <Tab
            tabIndex={2}
            title="Licenses"
            label="Licenses"
            onClick={this.setTabIndex(2)}
          />
        </Tabs>
        {this.renderTab(tabIndex)}
      </React.Fragment>
    );
  }
}
/**
 *
 */
const selector = (state: {}) => {
  return adapter.selector(state);
};
/**
 *
 */
const bindActions = (dispatch: Dispatch) => {
  return {
    setState: (payload: Partial<HomeState>) => {
      dispatch(adapter.actions.setState(payload));
    }
  };
};
/**
 *
 */
export default connect(
  selector,
  bindActions
)(withStyles(styles)(Home)) as React.ComponentType;
