import * as React from "react";
import { Fragment, Component, ReactNode, ReactElement } from "react";
import { Icon, IconButton, Menu } from "@material-ui/core";
/** */
function isReactFragment(x: any): x is React.ReactFragment & ReactElement<any> {
  return x && x.type === React.Fragment;
}
/**
 *
 * @param props
 */
export default class QuickMenu extends Component<{
  onRequestOpen(): any;
  onClose?(): any;
  disabled?: boolean;
  isOpen: boolean;
  menuIcon?: ReactNode;
}> {  
  menuButton: any;
  render() {
    const menuIcon = this.props.menuIcon || "more_vert";
    const children = this.props.children;
    return (
      <Fragment>
        <IconButton
          onClick={this.props.onRequestOpen}
          buttonRef={x => (this.menuButton = x)}
          disabled={!!this.props.disabled}
        >
          {typeof menuIcon === "string" ? (
            <Icon children={menuIcon} />
          ) : (
            menuIcon
          )}
        </IconButton>
        <Menu
          open={!!this.props.isOpen}
          onClose={this.props.onClose}
          anchorEl={this.menuButton}
        >
          {/* material-ui: Menu doesn't support Fragments */
          isReactFragment(children)
            ? React.Children.map(children.props.children || [], child => child)
            : children}
        </Menu>
      </Fragment>
    );
  }
}
