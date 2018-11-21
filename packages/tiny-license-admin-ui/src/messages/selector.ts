import storeKey from "./store-key";
import { MessagesState } from "./types";
/** */
export default (key: string) => {
    const STORE_KEY = storeKey(key);
    return (state: {}): MessagesState => state[STORE_KEY];
}