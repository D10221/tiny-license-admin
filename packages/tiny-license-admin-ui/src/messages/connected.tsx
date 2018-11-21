import { default as Messages } from "./messages";
import { connect } from "react-redux";
import store from "./store";
const Connected: React.ComponentType = connect(store.selector, (dispatch) => {
    return {
        close: () => {
            dispatch(store.actions.clearMessage());
        }
    }
})(Messages);
export default Connected;