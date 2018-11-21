export default function(storeKey: string) {
  /** */
  const SET_STATE = `@${storeKey}/set-state`;
  const SET_VALUE = `@${storeKey}/set-value`;
  const RESET = `@${storeKey}/reset`;
  const VALIDATE =  `@${storeKey}/validate`;
  /** */
  return {
    SET_STATE,
    SET_VALUE,
    RESET,
    VALIDATE
  };
}
