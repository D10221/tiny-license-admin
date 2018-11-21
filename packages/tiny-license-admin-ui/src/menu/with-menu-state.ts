import { Component, ReactNode } from "react";
/** */
export interface MenuActions {
  openMenu(): any;
  closeMenu(): any;
  handleMenuAction(action: Function): any;
}
/** */
export type RenderMenuStateProps = MenuState & MenuActions;
/** */
export type RenderMenuState = (props: RenderMenuStateProps) => ReactNode;
/** */
export interface WithMenuStateProps {
  isOpen?: boolean;
  render: RenderMenuState;
}
/** */
export interface MenuState {
  isOpen: boolean;
}
/** */
export default class WithMenuState extends Component<
  WithMenuStateProps,
  MenuState
> {
  /** */
  state = {
    isOpen: !!this.props.isOpen
  };
  /** */
  openMenu = () => {
    this.setState({ isOpen: true });
  };
  /** */
  closeMenu = () => {
    this.setState({ isOpen: false });
  };
  /** */
  handleMenuAction = (action: Function) => {
    return () => {
      this.closeMenu();
      action();
    };
  };
  /** */
  render() {
    return this.props.render({
      ...this.state,
      openMenu: this.openMenu,
      closeMenu: this.closeMenu,
      handleMenuAction: this.handleMenuAction
    });
  }
}
