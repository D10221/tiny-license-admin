import { Middleware, AnyAction } from "redux";
import  {
  ValidationRuleMap,
  ValidationResultMap
} from "./types";
import createValidate from "./validate"
/** */
export default function createMiddleware<T, S extends {} = {}>(
  rules: ValidationRuleMap<T>,
  actionTypes: string[],
  selector: (state: S) => T,
  validationChangeAction: (validation: ValidationResultMap<T>) => AnyAction
): Middleware {
  const validate = createValidate(rules);
  /** Middleware */
  const middleware: Middleware = store => next => action => {
    if (actionTypes.indexOf(action.type) !== -1) {
      next(action);
      const formData = selector(store.getState());
      return validate(formData).then(validation => {
        return next(validationChangeAction(validation));
      });
    }
    return next(action);
  };
  return middleware;
}
