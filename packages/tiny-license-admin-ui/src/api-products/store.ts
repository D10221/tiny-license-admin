import viewStore from "../view-store";
/**
 * 
 */
const defaultState = {
    busy: false,
    tabIndex: 0
};
/**
 * 
 */
export type ViewState = typeof defaultState;
/**
 * 
 */
const storeAdapter = viewStore("products-view", defaultState, {
    persist: {
        transform: {
            onLoad: (state: Partial<ViewState>) => {
                const { tabIndex, } = state;
                return {
                    tabIndex
                }
            },
            onSave: (state: Partial<ViewState>) => {
                const { tabIndex, } = state;
                return {
                    tabIndex
                }
            }
        }
    }
});
export default storeAdapter;