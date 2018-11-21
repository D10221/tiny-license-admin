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
  title?: string;
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
class ActionView extends Component<
  ActionViewProps<ApiItem> & { classes: ClassNameMap },
  ActionViewState<ApiItem>
  > {
  /** */
  state: ActionViewState<ApiItem> = {
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
    const {
      id,
      address,
      contact,
      description,
      displayName,
      email,
      enabled,
      name,
      notes,
      phone,
    } = item;
    const action = await this.props.api.send({
      address,
      contact,
      description,
      displayName,
      email,
      enabled,
      id,
      name,
      notes,
      phone
    });
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
  render() {
    const { isOpen } = this.props;
    const { onCancel } = this;
    const { isBusy } = this.state;
    return (
      <Modal
        isOpen={isOpen}
        onClose={onCancel}
        dialogTitle={this.props.title}
        disabled={isBusy}
        dialogContent={
          <ActionBody
            {...this.state}
            render={
              /** */
              formState => {
                const { classes } = this.props;
                const { isError, isBusy, item, isOpen } = this.state;
                const { formData, isValidationEmpty } = formState;
                if (!item || !isOpen) return null;
                return (
                  <>
                    {isError && (
                      <Button
                        style={{ color: "orange" }}
                        className={classes.button}
                        disabled={isBusy || !isValidationEmpty}
                        variant="outlined"
                        onClick={() => {
                          this.onAgain(formData);
                        }}
                      >
                        Retry
                      </Button>
                    )}
                    <Button
                      className={classes.button}
                      disabled={isBusy || !formState.isValidationEmpty}
                      variant="outlined"
                      onClick={() => {
                        this.onOk(formData);
                      }}
                    >
                      OK
                    </Button>
                  </>
                );
              }
            }
          />
        }
      />
    );
  }
}
export default withStyles(styles)(ActionView);
