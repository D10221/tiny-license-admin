import { Component, Fragment } from "react";
import { Tabs, Tab } from "@material-ui/core";
import * as React from "react";
import { Connected as  ListView } from "../api-license-list";
import { View as LicenseAdd } from "../api-licenses-add";
import { ViewState } from "./store";
/**
 * parameters
 */
export interface ViewProps {
  // ... empty
}

export interface ViewActions {
  setState(payload: Partial<ViewState>): any;
}

export type AllProps = ViewProps & ViewState & ViewActions;

export default class View extends Component<AllProps> {
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
        return <LicenseAdd />;
      }
      default: {
        return null;
      }
    }
  };
  /** */
  render() {
    const { tabIndex } = this.props;
    return (
      <Fragment>
        <Tabs value={tabIndex} fullWidth={true}>
          <Tab value={0} label={"List"} onClick={this.setTabIndex(0)} />
          <Tab value={1} label={"Add"} onClick={this.setTabIndex(1)} />
        </Tabs>
        {this.content(tabIndex)}
      </Fragment>
    );
  }
}
