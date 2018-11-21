import {
    Avatar,
    Icon,
    IconButton,
    ListItem,
    ListItemAvatar,
    ListItemText
  } from "@material-ui/core";
  import * as React from "react";
  import { Component } from "react";
  import { ApiItem } from "./api";
  
  export interface ListViewItemProps {
    disabled?: boolean;
    index?: number;
    item: ApiItem;
    onView?(item: ApiItem): any;
  }
  
  export default class ListViewItem extends Component<ListViewItemProps> {
    onView = () => {
      const { item } = this.props;
      this.props.onView && this.props.onView(item);
    };
    /** */
    render() {
      const { item, index, disabled } = this.props;
      return (
        <ListItem disabled={disabled}>
          <ListItemAvatar>
            <Avatar style={{ backgroundColor: "transparent" }}>
              <IconButton onClick={this.onView} title={"View"}>
                <Icon style={{ fontSize: "32px" }}>class</Icon>
              </IconButton>
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            style={{ marginRight: "1rem", paddingRight: "1rem" }}
            primary={
              (typeof index === "number" ? `${index}: ` : "") + item.displayName
            }
            secondary={item.description}
          />
          <div style={{ flex: "1 0" }} />
          {this.props.children}
        </ListItem>
      );
    }
  }
  