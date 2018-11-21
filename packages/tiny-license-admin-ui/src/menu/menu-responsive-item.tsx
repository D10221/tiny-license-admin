import * as React from "react";
import { RenderMenuStateProps } from "./with-menu-state";
import IconButton, { IconButtonProps } from "@material-ui/core/IconButton";
import MenuItem, { MenuItemProps } from "@material-ui/core/MenuItem";
import { StatelessComponent } from "react";
/** */
type MenuResponsiveItemProps = {
  action: IconButtonProps & MenuItemProps;  
} & RenderMenuStateProps & { isBreakpoint: boolean};
/** */
const MenuResponsiveItem: StatelessComponent<MenuResponsiveItemProps> = props => {
  const action = <IconButton {...props.action}>{props.children}</IconButton>;
  return props.isBreakpoint ? action : <MenuItem {...action.props} />;
};
/** */
export default MenuResponsiveItem;
