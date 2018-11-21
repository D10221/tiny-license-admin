import { Component } from "react";
import { WithMenuState } from "../menu";
import * as React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Icon from "@material-ui/core/Icon";
import { Typography, Menu, Button } from "@material-ui/core";
export default class PageSizeMenu extends Component<{
  label?: React.ReactNode;
  page: number;
  pageSize: number;
  pageSizes: number[];
  dataSize: number;
  disabled?: boolean;
  setPageSize(n: number): any;
}> {
  /** */
  setPageSize = (n: number) => {
    return () => this.props.setPageSize(n);
  };
  el: any;
  /** */
  render() {
    return (
      <WithMenuState
        render={menuState => {
          let { label, pageSize, dataSize, disabled } = this.props;
          if (!dataSize) return null;
          label = label || <span>Page Size: {pageSize}</span>;
          return (
            <>
              <Button
                disabled={disabled}
                buttonRef={x => (this.el = x)}
                onClick={menuState.openMenu}
              >
                {typeof label !== "string" ? (
                  label
                ) : (
                  <Typography style={{ marginLeft: "0.5rem" }}>
                    {label}
                  </Typography>
                )}
                <Icon
                  children="expand_more"
                  style={{ marginRight: "0.5rem" }}
                />
              </Button>
              <Menu
                open={menuState.isOpen}
                anchorEl={this.el}
                onClose={menuState.closeMenu}
              >
                {this.props.pageSizes.map((n, i) => (
                  <MenuItem
                    selected={this.props.pageSize === n}
                    key={`page_size_menu_item_${i}`}
                    onClick={menuState.handleMenuAction(this.setPageSize(n))}
                  >
                    Show {n}
                  </MenuItem>
                ))}
              </Menu>
            </>
          );
        }}
      />
    );
  }
}
