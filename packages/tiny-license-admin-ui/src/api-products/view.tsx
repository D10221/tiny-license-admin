import { Component, Fragment, ComponentType } from "react";
import { Tabs, Tab } from "@material-ui/core";
import * as React from "react";
import { Connected as ProductAdd} from "../api-products-add";
import { Connected as ListView} from "../api-product-list";
import { connect } from "react-redux";
import adapter from "./store";
import { createSelector } from "reselect";
import { Dispatch } from "redux";
/**
 * 
 */
interface ViewState {
    tabIndex: number;
}
/**
 * 
 */
export interface ViewProps {
    // ...
}
/**
 * 
 */
class ProductsView extends Component<ViewProps & ViewState & { setState(state: Partial<ViewState>): any }>{

    setTabIndex = (tabIndex: number) => {
        return () => this.props.setState({ tabIndex });
    }
    get name(): string {
        return (this as any).name
    }
    Switch = (tabIndex: number) => {
        switch (tabIndex) {
            case 0: {
                return <ListView />
            }
            case 1: {
                return <ProductAdd />
            }
            default: {
                return null;
            }
        }
    }
    /** */
    render() {
        const { tabIndex } = this.props;
        return <Fragment>
            <Tabs value={tabIndex} fullWidth={true}>
                <Tab value={0} label={"List"} onClick={this.setTabIndex(0)} />
                <Tab value={1} label={"Add"} onClick={this.setTabIndex(1)} />
            </Tabs>
            {this.Switch(tabIndex)}
        </Fragment>
    }
}
/** */
const selector = createSelector(adapter.selector, state => state);
/** */
const bindAction = (dispatch: Dispatch) => {
    return {
        setState: (payload: {}) => (dispatch(adapter.actions.setState(payload)))
    }
}
/** */
const Connected: ComponentType<{}> = connect(selector, bindAction)(ProductsView);
/**
 * 
 */
export default Connected;