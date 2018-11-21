import { PersistOptions } from "./persist";
// import { ValidationOptions } from "./middleware";
/**
 *
 */
export interface DefaultOptions {
  prefix?: string;
  persist?: PersistOptions;
  // validation?: ValidationOptions;
}

const defaultOptions: DefaultOptions = {
  prefix: "form-data",
  persist: {
    off: false,
    transform: undefined
  }
};
/**
 *
 */
export default defaultOptions;
