import { Button, Dialog, DialogActions, DialogContent, Icon, IconButton, ListItemText, Menu, MenuItem, Paper, Toolbar, Typography, withStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, Fragment } from "react";
import { ConfirmAction } from "../confirm-action";
import { CrudApiActions, CrudApiState } from "../crud-api";
import { CheapPreview } from "../form-data";
import { MessageActions } from "../messages";
import { FormViewActions, FormViewData } from "./form-store";
import FormView from "./form-view";
import propsToRequest from "./props-to-request";
import { StoreActions, ViewState } from "./store";
import styles from "./styles";
import { ConfirmActionActions } from "../confirm-action/action-binder";
import { MenuActions } from "../menu/action-binder";
const log =
  process.env.NODE_ENV !== "production" ? console.log.bind(console) : () => { };
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
  FormViewActions &
  ConfirmActionActions &
  MessageActions &
  MenuActions & {
  setBusy(busy: boolean): any;
};
/** */
export interface ViewFormDataState {
  formData: FormViewData;
}
/** */
export interface ApiContext {
  api: CrudApiActions;
  apiState: CrudApiState<any>;
}
/** */
export type ViewProps = ViewState &
  ViewFormDataState &
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
      const r = await api.fetch(request);
      log(r);
    } catch (error) {
      setError(error);
    } finally {
      setBusy(false);
    }
  };
  /** */
  saveActionMessage = () => {
    const { formData } = this.props;
    return <CheapPreview data={formData} />;
  };

  resetFormActionMessage = () => {
    return <Typography>Reset Form Data?</Typography>;
  };
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
      busy,
      classes,
      isMenuOpen,
      handleActionToConfirm,
      handleMenuAction,
      setWarning,
      setConfirmAction,
      formData,
      // ...
      setFormState
    } = this.props;
    const validation = this.props.validation || {};
    return (
      <Fragment>
        <Paper className={classes.paper} elevation={0.5}>
          <Toolbar>
            <Typography variant="title">Add Customer</Typography>
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
                  <ListItemText children="Reset/Clear Form" />
                </MenuItem>
              </Menu>
            </Fragment>
          </Toolbar>
          {/* Form */}
          <FormView
            classes={classes}
            validate={this.props.validate}
            resetForm={this.props.resetForm}
            setFormValue={this.props.setFormValue}
            setFormState={setFormState}
            validation={validation}
            busy={busy}
            formData={formData}
          />
          {/* Actions */}
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
        <ConfirmAction
          classes={classes}
          isOpen={this.props.confirmAction === "save"}
          actionTitle={"Submit Data?"}
          actionMessage={
            this.props.confirmAction === "save" && this.saveActionMessage()
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
