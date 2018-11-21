import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Icon,
  IconButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Toolbar,
  Typography,
  withStyles,
  DialogTitle
} from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, Fragment } from "react";

import { ConfirmAction } from "../confirm-action";
import { CrudApiActions, CrudApiState } from "../crud-api";
import { CheapPreview, FormDataActions } from "../form-data";
import { MessageActions } from "../messages";
import { ViewFormData } from "./form-store";
import FormView from "./form-view";
import propsToRequest from "./props-to-request";
import { StoreActions, ViewState } from "./store";
import styles from "./styles";
import { ConfirmActionActions } from "../confirm-action/action-binder";
import { MenuActions } from "../menu/action-binder";
/**
 * export for external parameters
 */
export interface ViewParams {
  // ... None
}
/**
 * this.View Wish
 * provided by this.action-binder
 */
export type ViewActions = StoreActions &
  FormDataActions &
  ConfirmActionActions &
  MessageActions &
  MenuActions & {
  setBusy(busy: boolean): any;
};
interface ApiContext {
  api: CrudApiActions;
  apiState: CrudApiState<any>;
}
interface FormState {
  formData: ViewFormData;
}
export type ViewProps = ViewState &
  FormState &
  ViewActions &
  ApiContext & {
  classes: ClassNameMap;
};
/** */
class View extends Component<ViewProps> {
  componentDidMount() {
    this.props.validate();
  }
  /** */
  save = async () => {
    const { setBusy, setError, api, validationEmpty } = this.props;
    try {
      if (!validationEmpty) {
        setError("Can't Save");
        return;
      }
      setBusy(true);
      const request = propsToRequest(this.props);
      await api.fetch(request);
    } catch (error) {
      setError(error);
    } finally {
      setBusy(false);
    }
  };
  requestPreviewShow = () => {
    this.props.setState({ previewRequest: true });
  };
  requestPreviewClose = () => {
    this.props.setState({ previewRequest: false });
  };
  requestPreview = () => {
    const { body } = propsToRequest(this.props);
    return <CheapPreview data={body || {}} />;
  };

  resetFormActionMessage = () => {
    return <Typography>Reset Form Data?</Typography>;
  };
  /** */
  renderApiState() {
    const renderError = !!this.props.apiState.error;
    const renderSuccess = !!this.props.apiState.success;
    const renderBusy = !!this.props.apiState.busy;
    /** */
    return (
      <Fragment>
        {renderBusy && (
          <Dialog open={renderBusy}>
            <DialogContent>
              <Typography>Sending ... please wait!</Typography>
            </DialogContent>
          </Dialog>
        )}
        {renderError && (
          <Dialog open={renderError}>
            <DialogContent>
              <Typography color="error" variant="headline">
                {this.props.apiState.error}
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                variant="raised"
                children={"OK"}
                onClick={this.props.api.clearError}
              />
            </DialogActions>
          </Dialog>
        )}
        {renderSuccess && (
          <Dialog open={renderSuccess}>
            <DialogContent>
              <Typography variant="headline">Saved</Typography>
            </DialogContent>
            <DialogActions>
              <Button
                variant="raised"
                children={"OK"}
                onClick={this.props.api.clearSuccess}
              />
            </DialogActions>
          </Dialog>
        )}
      </Fragment>
    );
  }

  menuButton: any;
  /** */
  render() {
    const {
      classes,
      isMenuOpen,
      formData,
      viewTitle,
      // ...
      setFormState,
      handleActionToConfirm,
      handleMenuAction,
      setWarning,
      setConfirmAction
    } = this.props;
    let { validation } = this.props;
    validation = validation || {};
    return (
      <Fragment>
        <Paper className={classes.paper} elevation={0.5}>
          <Toolbar>
            <Typography variant="title">{viewTitle}</Typography>
            <div style={{ flex: "1 0" }} />
            <Fragment>
              <IconButton
                onClick={this.props.openMenu}
                buttonRef={x => (this.menuButton = x)}
                disabled={!!this.props.busy}
              >
                <Icon children="more_vert" />
              </IconButton>
              <Menu
                open={!!isMenuOpen}
                onClose={this.props.closeMenu}
                anchorEl={this.menuButton}
              >
                <MenuItem
                  onClick={handleMenuAction(setConfirmAction("reset-form"))}
                >
                  <ListItemText primary="Reset/Clear Form" />
                </MenuItem>
                <MenuItem onClick={handleMenuAction(this.requestPreviewShow)}>
                  <ListItemText primary="Preview Request" />
                </MenuItem>
              </Menu>
            </Fragment>
          </Toolbar>
          {/* Form */}
          <FormView
            formData={formData}
            setFormState={setFormState}
            classes={classes}
            validation={validation}
            busy={this.props.busy}
          />

          {/* Actions  */}
          <div className={classes.actions}>
            <Button
              className={classes.button}
              variant="raised"
              disabled={!!this.props.busy}
            >
              Cancel
            </Button>
            <Button
              className={classes.button}
              variant="raised"
              color="primary"
              disabled={!!this.props.busy || !this.props.validationEmpty}
              onClick={setConfirmAction("save")}
            >
              Save
            </Button>
          </div>
        </Paper>
        <Dialog
          open={!!this.props.previewRequest}
          onClose={this.requestPreviewClose}
        >
          <DialogTitle title="Preview" />
          <DialogContent>{this.requestPreview()}</DialogContent>
          <DialogActions>
            <Button onClick={this.requestPreviewClose} variant="raised">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <ConfirmAction
          classes={classes}
          isOpen={this.props.confirmAction === "save"}
          actionTitle={"Submit Data?"}
          actionMessage={
            this.props.confirmAction === "save" && this.requestPreview()
          }
          acceptAction={handleActionToConfirm(this.save, () =>
            setWarning("Save Action Cancelled")
          )}
        />
        <ConfirmAction
          classes={classes}
          isOpen={this.props.confirmAction === "reset-form"}
          actionTitle="Confirm Action"
          actionMessage={
            this.props.confirmAction === "reset-form" &&
            this.resetFormActionMessage()
          }
          acceptAction={handleActionToConfirm(this.props.resetForm)}
        />
        {this.renderApiState()}
      </Fragment>
    );
  } // render
}

export default withStyles(styles)(View);
