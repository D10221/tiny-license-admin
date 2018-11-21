import { Dispatch } from "redux";
import { connect } from "react-redux";
import View, { ViewProps } from "./view"
import { ComponentType } from "react";
import adapter from "./store";
import { ViewState } from "../api-products/store";
const bindActions = (dispatch: Dispatch )=>{    
    return {
        setState:(payload: Partial<ViewState>)=>{
            return dispatch(adapter.actions.setState(payload))
        }
    }
}
const Connected: ComponentType<ViewProps>  = connect(adapter.selector, bindActions)(View);
export default Connected;