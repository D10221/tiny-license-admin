import { PersistTransform } from "./persist-transform";

/**
 *
 * @param viewName
 */
export default function(viewName: string, transform?: PersistTransform) {
  const STORE_KEY = `view-store-${viewName}`;
  /**
   *
   * @param defaultState
   */
  function tryParse(defaultState: {}): {} {
    try {
      const json = localStorage.getItem(STORE_KEY);
      let value = Object.assign({}, defaultState, JSON.parse(json || "{}"));
      if (transform && transform.onLoad) {
        value = transform.onLoad(value);
      }
      return value;
    } catch (e) {
      log(e);
      return defaultState;
    }
  }
  /** */
  const log =
    process.env.NODE_ENV !== "production"
      ? console.log.bind(console)
      : () => {};
  /**
   *
   */
  function trySet(state: {}) {
    try {
      setTimeout(() => {
        if (transform && transform.onSave) {
          localStorage.setItem(
            STORE_KEY,
            JSON.stringify(transform.onSave(state))
          );
          return;
        }
        const json = JSON.stringify(state);
        localStorage.setItem(STORE_KEY, json);
      }, 1);
    } catch (e) {
      log(e);
    }    
  }
  /**
   * 
   */
  function clear(){
    localStorage.removeItem(STORE_KEY);
  }
  return {
    tryParse,
    trySet,
    clear
  };
}
