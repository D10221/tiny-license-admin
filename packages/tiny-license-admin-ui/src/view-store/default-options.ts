import { PersistTransform } from "./persist-transform";
/**
 *
 */
export interface DefaultOptions {
  persist?: {
    off?: boolean;
    transform?: PersistTransform;
  };
}
const defaultOptions: DefaultOptions = {
  persist: {
    off: false,
    transform: undefined
  }
};
/**
 *
 */
export default defaultOptions;
