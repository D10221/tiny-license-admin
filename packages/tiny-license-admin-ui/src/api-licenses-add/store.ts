import viewStore from "../view-store";
import { FormDataValidationResult } from "./validation";
/**
 *
 */
export interface ViewState {
  busy: boolean;
  isMenuOpen: boolean;
  confirmAction?: string;
  error?: string;
  /**
   * Validation result
   * Todo: own Store 
   */
  validation: FormDataValidationResult;
  validationEmpty: boolean;
  //  
  viewTitle: string;
  //featureValues: {};
  previewRequest: boolean;
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
  confirmAction: undefined,
  validation: {},
  validationEmpty: true,
  viewTitle: "Add License",
  // featureValues: {},
  previewRequest: false
};
/**
 *
 */
const storeAdapter = viewStore<ViewState>("products-add", defaultState, {
  persist: {
    transform: {
      onLoad: (state: Partial<ViewState>) => {
        const {
          busy,
          isMenuOpen,
          confirmAction,
          validation, // ...
          validationEmpty,
          previewRequest,
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
          previewRequest,
          ...value
        } = state;
        return value;
      }
    }
  }
});
export default storeAdapter;
