import * as auth from "@australis/tiny-auth-redux";
import messages from "../messages";

export default {
  [auth.STORE_KEY]: auth.reducer,
  [messages.storeKey]: messages.reducer,  
};
