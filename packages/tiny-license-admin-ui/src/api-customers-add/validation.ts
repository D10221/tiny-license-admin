import {
  middleware as validationMiddleware,
  isValidationEmpty,
  ValidationRuleMap,
  EMAIL_REGEX
} from "../validation";
import formStore, { FormViewData } from "./form-store";
import store from "./store";

export type FormDataValidationResult = Partial<FormViewData>;

const rules: ValidationRuleMap<FormViewData> = {
  address: {
    test: true,
    message: "Required"
  },
  contact: {
    test: true,
    message: "Require"
  },
  description: {
    test: (data, key) => {
      const value = data[key];      
      return !!value && !!value.trim() && value.length > 10 && value.length < 512;
    },
    message: "Required (10-512)"
  },
  displayName: {
    test: true,
    message: "Required"
  },
  email: {
    test: EMAIL_REGEX,
    message: "Invalid email"
  },
  name: {
    test: true,
    message: "Require"
  },
  notes: {
    test: data => {
      return !!data.notes && data.notes.length > 0 && data.notes.length < 1024;
    },
    message: "Require"
  },
  phone: {
    test: true,
    message: "Require"
  }
};
const { RESET, VALIDATE, SET_STATE } = formStore.actionTypes;
const middleware = validationMiddleware<FormViewData>(
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
