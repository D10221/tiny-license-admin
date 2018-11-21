import { Dispatch } from "redux";
import messages from "../messages";
import { ViewState } from "./store";
import { actionBinder as confirmActionBinder } from "../confirm-action";
import { actionBinder as menuActionBinder } from "../menu";
import store from "./store";

type KeyofViewSTate = keyof ViewState & string;

export default function(dispatch: Dispatch) {
  const setBusy = (busy: boolean) => {
    dispatch(store.actions.setState({ busy }));
  };
  const confirmActions = confirmActionBinder<ViewState, KeyofViewSTate>(
    store.actions.setState,
    "confirmAction"
  )(dispatch);
  const menuActions = menuActionBinder<ViewState, KeyofViewSTate>(
    store.actions.setState,
    "isMenuOpen"
  )(dispatch);
  const messageAction = messages.bindActions(dispatch);
  return {
    setState: (payload: Partial<ViewState>) => {
      dispatch(store.actions.setState(payload));
    },
    ...messageAction,
    ...confirmActions,
    ...menuActions,    
    setBusy,
  };
}
