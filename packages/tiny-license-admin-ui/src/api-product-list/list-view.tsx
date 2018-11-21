import {
  CircularProgress,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography
} from "@material-ui/core";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, ComponentType } from "react";
import { Connected as Delete } from "../api-product-delete";
import { Connected as Edit } from "../api-product-edit";
import { MenuResponsive, MenuResponsiveItem } from "../menu";
import { Pagerbar, WithPager } from "../pager";
import { TextFilter, WithTextFilter } from "../text-filter";
import { ApiActions, ApiItem, ApiState, ActionType } from "./api";
import ListViewItem from "./list-view-item";
import styles from "./list-view-styles";
/** */
export interface ListViewParams {
  // ...
}
/** */
export type ApiContext = {
  apiState: ApiState;
  api: ApiActions;
};
/** */
export type ListViewProps = ApiContext & ListViewParams;
/** private */
interface ListViewState {
  actionType: ActionType | undefined;
  item: ApiItem | undefined;
}
/** */
class ListView extends Component<ListViewProps & { classes: ClassNameMap }> {
  /** */
  state: ListViewState = {
    actionType: undefined,
    item: undefined
  };
  /** */
  createAction = (actionType: ActionType, item: ApiItem) => {
    return () => this.setState({ actionType, item });
  };
  clearAction = () => {
    this.setState({
      actionType: undefined,
      item: undefined
    });
  };
  /** */
  setActionType = (actionType: ActionType) => {
    return () => {
      this.setState({ actionType });
    };
  };
  fetch = () => {
    this.props.api.fetch({
      method: "GET"
    });
  };
  componentDidMount() {
    this.fetch();
  }
  renderError = (error: string) => {
    return <span style={{ color: "red" }}>{error}</span>;
  };
  /** */
  onFilterChanged = (filtered: ApiItem[]) => {
    this.setState({ filtered });
  };
  renderAction = (
    actionType: ActionType | undefined,
    item: ApiItem | undefined
  ) => {
    if (!actionType || !item) return null;
    switch (actionType) {
      case "edit": {
        return (
          <Edit
            title="Update"
            isOpen={true}
            onClose={this.clearAction}
            item={item}
            onSuccess={this.fetch}
          />
        );
      }
      case "delete": {
        return (
          <Delete
            title="Delete"
            isOpen={true}
            onClose={this.clearAction}
            item={item}
            onSuccess={this.fetch}
          />
        );
      }
      default: {
        return null;
      }
    }
  };
  /** */
  render() {
    const { busy, error, data } = this.props.apiState;
    const { classes } = this.props;
    const { item, actionType } = this.state;
    if (error) return this.renderError(error);
    if (!data) return null;
    if (!Array.isArray(data)) {
      return this.renderError("Wrong Data type");
    }
    return (
      <div className={classes.root}>
        <WithTextFilter
          data={data}
          render={(filterValue, filtered, setFilter) => {
            return (
              <WithPager
                data={filtered}
                pageSize={5}
                render={pager => {
                  return (
                    <>
                      <Toolbar className={classes.toolbar}>
                        <Typography>LIST LONG TITLE ...</Typography>
                        {busy && <CircularProgress className={classes.busy} />}
                        <TextFilter
                          disabled={!!busy}
                          autoFocus={true}
                          value={filterValue}
                          className={classes.searchField}
                          onChange={setFilter}
                          fullWidth
                        />
                        <div style={{ flex: "1 0" }} />
                        <MenuResponsive
                          disabled={busy}
                          renderChildren={state => {
                            return (
                              <MenuResponsiveItem
                                {...state}
                                action={{
                                  title: "Reload",
                                  onClick: state.handleMenuAction(this.fetch),
                                  disabled: !!busy
                                }}
                              >
                                <Icon>refresh</Icon>
                              </MenuResponsiveItem>
                            );
                          }}
                        />
                      </Toolbar>
                      <List>
                        {!pager.paged ||
                          (!pager.paged.length && (
                            <ListItem
                              children={<ListItemText>Not Found</ListItemText>}
                            />
                          ))}
                        {pager.paged.map((item, i) => (
                          <ListViewItem
                            disabled={!!busy}
                            key={`list_item_${i}`}
                            item={item}
                          >
                            <MenuResponsive
                              breakpoint="md"
                              renderChildren={menu => (
                                <>
                                  <IconButton
                                    onClick={menu.handleMenuAction(
                                      this.createAction("edit", item)
                                    )}
                                    title={"Edit"}
                                  >
                                    <Icon>edit</Icon>
                                  </IconButton>
                                  <IconButton
                                    onClick={menu.handleMenuAction(
                                      this.createAction(
                                        "delete",
                                        item
                                      ))}
                                    title={"Delete"}
                                  >
                                    <Icon>delete</Icon>
                                  </IconButton>
                                </>
                              )}
                            />
                          </ListViewItem>
                        ))}
                      </List>
                      <Pagerbar
                        {...pager}
                        pageSizes={[3, 5, 10]}
                        disabled={!!busy}
                      />
                      {this.renderAction(actionType, item)}
                    </>
                  );
                }}
              />
            );
          }}
        />
      </div>
    );
  }
}
/** */
export default withStyles(styles)(ListView) as ComponentType<ListViewParams>;
