import { Breakpoint } from "@material-ui/core/styles/createBreakpoints";
import withStyles, {
  ClassNameMap,
  StyleRulesCallback
} from "@material-ui/core/styles/withStyles";
import withWidth, {
  isWidthUp,  
} from "@material-ui/core/withWidth/withWidth";
import * as React from "react";
import { Component, ReactNode, ComponentType, ReactHTML } from "react";
import QuickMenu from "./quick-menu";
import WithMenuState, { RenderMenuStateProps } from "./with-menu-state";
/** */
const styles: StyleRulesCallback = theme => {
  return {
    el: {
      margin: theme.spacing.unit,
      display: "flex",
      flexDirection: "row",
      justifyContent: "spacce-between"
    }
  };
};
/** */
export interface MenuResponsiveParams {
  disabled?: boolean;
  /**
   * Alt Menu or elemntTag
   * keyof ReactHTML
   * OR ...
   * */
  altMenuContainer?: keyof ReactHTML | ComponentType | ReactNode;
  breakpoint?: Breakpoint;
  /** render children */
  renderChildren?: (
    props: RenderMenuStateProps & { isBreakpoint: boolean }
  ) => ReactNode;
}
/**
 * @description Menu responsive props
 */
export type MenuResponsiveProps = MenuResponsiveParams &
  {
    width?: any;
    classes: ClassNameMap;
  };
/**
 * ?
 */
class MenuResponsive extends Component<MenuResponsiveProps> {
  render() {
    const { disabled, width, classes, children, renderChildren } = this.props;
    const breakpoint = this.props.breakpoint || "md";
    const isBreakpoint = isWidthUp(breakpoint, width);
    const element = this.props.altMenuContainer || "div";
    return (
      <WithMenuState
        render={menu => {
          if (isBreakpoint) {
            return React.createElement(
              element as any,
              { className: classes.el },
              renderChildren
                ? renderChildren({ ...menu, isBreakpoint })
                : children
            );
          }
          return (
            <QuickMenu
              disabled={disabled}
              isOpen={menu.isOpen}
              onClose={menu.closeMenu}
              onRequestOpen={menu.openMenu}
            >
              {renderChildren
                ? renderChildren({ ...menu, isBreakpoint })
                : children}
            </QuickMenu>
          );
        }}
      />
    );
  }
}
/** */
export default withWidth()(
  withStyles(styles)(MenuResponsive)
) as React.ComponentType<MenuResponsiveParams>;
