import { Dispatch, AnyAction } from "redux";
export type AnyFunc = () => any;
export interface MenuActions {
  openMenu(): any;
  closeMenu(): any;
  handleMenuAction(action: AnyFunc): () => any;
}
/**
 *
 * @param setState
 * @param key
 */
export default function actionBinder<S extends {}, K extends keyof S & string>(
  setState: (state: Partial<S>) => AnyAction,
  key: K
) {
  /**
   *
   */
  return function bindActions(dispatch: Dispatch): MenuActions {
    const openMenu = () => dispatch(setState({ [key]: true } as any));
    const closeMenu = () => dispatch(setState({ [key]: false } as any));
    const handleMenuAction = (action: () => any) => {
      return () => {
        closeMenu();
        action();
      };
    };
    return {
      openMenu,
      closeMenu,
      handleMenuAction
    };
  };
}
