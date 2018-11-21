import viewStore from "../view-store";
const defaultState = {
    tabIndex : 0
}
const adapter = viewStore("home", defaultState);
export default adapter;