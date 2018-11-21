import {
  middleware as validationMiddleware,
  ValidationRuleMap,
  isValidationEmpty
} from "../validation";
import formStore from "./form-store";
import store from "./store";
import { ViewFormData } from "./form-store";
import { ValidationResultMap } from "../validation";

const rules: ValidationRuleMap<ViewFormData> = {
  customer: {
    test: true,
    message: (key)=> `${key} Required`
  },
  displayName: {
    test: true,
    message: (key)=> `${key} Required`
  },
  description: {
    test: true,
    message: (key)=> `${key} Required`
  },
  features: {
    test: true,
    message: (key)=> `${key} Required`
  },
  notes: {
    test: true,
    message: (key)=> `${key} Required`
  },
  product: {
    test: true,
    message: (key)=> `${key} Required`
  }
};
/**
 * 
 */
export type FormDataValidationResult = ValidationResultMap<ViewFormData>;

const { RESET, VALIDATE, SET_STATE } = formStore.actionTypes;
const middleware = validationMiddleware(
  rules,
  [RESET, SET_STATE, VALIDATE],
  formStore.selector,
  validation => {
    const validationEmpty = isValidationEmpty(validation);
    return store.actions.setState({ validation, validationEmpty });
  }
);

export default {
  middleware
};
