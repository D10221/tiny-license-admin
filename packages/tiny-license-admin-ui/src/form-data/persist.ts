export interface PersistOptions {
  off?: boolean;
  transform?: PersistTransform;
};
export interface PersistTransform {
  onSave?(value: {}):{};
  onLoad?(value: {}):{};
}
export interface Persist {
  tryParse(defaultValue: {}): {};
  trySet(value: {}): any;
  clear(): any;
}
/**
 *
 * @param storeKey
 */
export default function(
  storeKey: string,
  transform?: PersistTransform
): Persist {
  /**
   *
   * @param defaultState
   */
  function tryParse(defaultState: {}): {} {
    try {
      const json = localStorage.getItem(storeKey);
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
            storeKey,
            JSON.stringify(transform.onSave(state))
          );
          return;
        }
        const json = JSON.stringify(state);
        localStorage.setItem(storeKey, json);
      }, 1);
    } catch (e) {
      log(e);
    }
  }
  /**
   *
   */
  function clear() {
    localStorage.removeItem(storeKey);
  }
  return {
    tryParse,
    trySet,
    clear
  };
}
