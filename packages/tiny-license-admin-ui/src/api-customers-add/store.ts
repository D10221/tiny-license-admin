import viewStore from "../view-store";
/**
 *
 */
export interface ViewState {
  busy: boolean;
  isMenuOpen: boolean;
  tabIndex: number;
  confirmAction?: string;
  error?: string;
  /**
   * Validation result
   * Todo: own Store 
   */
  validation: {
    address?: string,
    displayName?: string;
    description?: string;
    contact?: string;
    phone?: string;
    notes?: string;
    email?: string;
    name?: string;
  };
  validationEmpty: boolean;
}

export interface StoreActions {
  setState(payload: Partial<ViewState>): any;
}
/**
 *
 */
const defaultState: ViewState = {
  busy: false,
  isMenuOpen: false,
  tabIndex: 0,
  confirmAction: undefined,
  validation: {},
  validationEmpty: true
};
/**
 *
 */
const storeAdapter = viewStore("customers-add", defaultState, {
  persist: {
    transform: {
      onLoad: (state: Partial<ViewState>) => {
        const {
          busy,
          isMenuOpen,
          confirmAction,
          validation, // ...
          validationEmpty,
          ...value
        } = state;
        return value;
      },
      onSave: (state: Partial<ViewState>) => {
        const {
          busy,
          isMenuOpen,
          confirmAction,
          validation, // ...
          validationEmpty,
          ...value
        } = state;
        return value;
      }
    }
  }
});
export default storeAdapter;
