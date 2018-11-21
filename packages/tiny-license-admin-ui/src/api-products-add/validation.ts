import {
  middleware as validationMiddleware,
  ValidationRuleMap,
  isValidationEmpty
} from "../validation";

import formStore from "./form-store";
import store from "./store";
import { ViewFormData } from "./form-store";

const rules: ValidationRuleMap<ViewFormData> = {
  description: {
    test: true,
    message: "description Required!"
  },
  displayName: {
    test: true,
    message: "Required"
  },
  name: {
    test: true,
    message: "Require"
  },
  notes: {
    test: true,
    message: "Require"
  },
  features: {
    test: true,
    message: "Require"
  }
};
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
