import { Button } from "@material-ui/core";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component } from "react";
import { Modal } from "../modal";
import { ApiActions, ApiState, ApiItem } from "./api";
import styles from "./styles";
import ActionBody from "./action-body";
/** */
export interface ActionViewParams<T extends {} = {}> {
  title: string;
  onClose(): any;
  isOpen: boolean;
  item: T | undefined;
  onSuccess?(): any;
}
/** */
export interface ApiContext {
  api: ApiActions;
  apiState: ApiState;
}
/** */
export type ActionViewProps<T> = ActionViewParams<T> & ApiContext;
/** */
export interface ActionViewState<T> {
  error: string | undefined;
  isBusy: boolean;
  isError: boolean;
  isSuccess: boolean;
  isOpen: boolean;
  item: T | undefined;
}
/** */
class ActionView<T extends ApiItem = ApiItem> extends Component<
  ActionViewProps<T> & { classes: ClassNameMap },
  ActionViewState<T>
> {
  /** */
  state: ActionViewState<T> = {
    error: this.props.apiState.error,
    isBusy: false,
    isError: false,
    isSuccess: false,
    isOpen: false,
    item: undefined
  };
  /** */
  static getDerivedStateFromProps(
    props: ActionViewProps<any>,
    _state: ActionViewState<any>
  ) {
    const { apiState, isOpen, item } = props;
    const isBusy = !!apiState.busy;
    const isSuccess = !!apiState.success;
    const isError = !!apiState.error;
    return {
      error: apiState.error,
      isBusy,
      isError,
      isSuccess,
      isOpen,
      item
    };
  }
  componentDidMount() {
    this.props.api.reset();
  }
  /** */
  send = async (item: ApiItem) => {
    const action = await this.props.api.dlete(item.id);
    if (action && action.payload instanceof Error) {
      return;
    }
    if (action && action.error instanceof Error) {
      return;
    }
    this.props.onSuccess && this.props.onSuccess();
  };
  /** */
  onCancel = () => {
    if(this.state.isBusy) return;
    this.props.onClose();
  };
  /** */
  onOk = (item: ApiItem) => {
    const { isSuccess, isError } = this.state;
    if (isSuccess) {
      return this.props.onClose();
    }
    if (isError) {
      return this.props.onClose();
    }
    this.send(item);
  };
  /** */
  onAgain = (item: ApiItem) => {
    this.send(item);
  };
  /** */
  renderActions = () => {
    const { classes } = this.props;
    const { onOk, onAgain } = this;
    const { isSuccess, isError, isBusy, item, isOpen } = this.state;
    if (!item || !isOpen) return null;
    return (
      <>
        {(isSuccess || isError) && (
          <Button
            style={{ color: "orange" }}
            className={classes.button}
            disabled={isBusy}
            variant="outlined"
            onClick={() => onAgain(item)}
          >
            Again
          </Button>
        )}
        <Button
          className={classes.button}
          disabled={isBusy}
          variant="outlined"
          onClick={() => onOk(item)}
        >
          OK
        </Button>
      </>
    );
  };
  /** */
  render() {
    const { isOpen } = this.props;
    const { onCancel } = this;
    return (
      <Modal
        isOpen={isOpen}
        onClose={onCancel}
        dialogTitle={this.props.title}
        dialogContent={<ActionBody {...this.state} />}
        dialogActions={this.renderActions()}
      />
    );
  }
}
export default withStyles(styles)(ActionView);
