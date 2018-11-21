import storeKey from "./store-key";

export default function(key: string) {
  const STORE_KEY = storeKey(key);
  return {
    SET_MESSAGE: `@${STORE_KEY}-set-message`,
    CLEAR: `@${STORE_KEY}-clear`,
    SET_ERROR: `@${STORE_KEY}-set-error`,
    SET_WARNING: `@${STORE_KEY}-set-warning`,
    SET_INFO: `@${STORE_KEY}-set-info`,
    SET_SUCCESS: `@${STORE_KEY}-set-success`
  };
}
