import Toolbar from "@material-ui/core/Toolbar";
import PageSizeMenu from "./page-size-menu";
import * as React from "react";
import Button from "@material-ui/core/Button";
import { Component } from "react";
import { RenderProps } from "./with-pager";
import Icon from "@material-ui/core/Icon";
import { Typography } from "@material-ui/core";
/** */
export type PagerbarProps = RenderProps<any> & {
  pageSizes: number[];
  disabled?:boolean;
};
/** */
export default class Pagerbar extends Component<PagerbarProps> {
  render() {
    const {
      setPageSize,
      prev,
      next,
      pageSizes,
      pageSize,
      dataSize,
      page,
      disabled
    } = this.props;
    return (
      <Toolbar>
        <PageSizeMenu
          disabled={disabled}
          page={page}
          setPageSize={setPageSize}
          pageSizes={pageSizes}
          pageSize={pageSize}
          dataSize={dataSize}
        />
        <div style={{ borderLeft: "1px solid lightgray", paddingLeft: "1rem", paddingRight: "1rem" }}>
          <Typography>
            Page: {page + 1} of {this.props.pageCount}
          </Typography>
        </div>
        <div style={{ borderLeft: "1px solid lightgray", paddingLeft: "1rem" }}>
          <Typography>
            Showing: {this.props.sliceLength} of {this.props.dataSize}
          </Typography>
        </div>
        <div style={{ flex: "1 0" }} />
        <Button onClick={prev} disabled={disabled}>
          <Icon children={"keyboard_arrow_left"} />Prev
        </Button>
        <Button onClick={next} disabled={disabled}>
          Next<Icon children={"keyboard_arrow_right"} />
        </Button>
      </Toolbar>
    );
  }
}
