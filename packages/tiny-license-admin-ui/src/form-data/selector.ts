import { AnyData } from "./types";
/** */
export default function createSelector<T extends AnyData = AnyData>(
  storeKey: string
) {
  return function selector(state: {}) {
    return state[storeKey] as T;
  };
}
