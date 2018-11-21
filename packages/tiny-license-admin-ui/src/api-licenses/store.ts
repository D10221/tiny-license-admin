import createStoreAdapter  from "../view-store";
export interface ViewState {
    tabIndex: number;
}
/** */
const defaultState = {
    tabIndex: 0
}
/** */
const adapter = createStoreAdapter<ViewState>("licenses", defaultState);
export default adapter;