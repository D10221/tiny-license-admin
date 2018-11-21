import { Button, Dialog, DialogActions, DialogContent, Icon, IconButton, ListItemText, Menu, MenuItem, Paper, Toolbar, Typography, withStyles } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { Component, Fragment } from "react";
import { ProductFeatures } from "../api-product-features";
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
export interface ApiContext {
  api: CrudApiActions;
  apiState: CrudApiState<any>;
}
export type ViewProps = ViewState & { formData: ViewFormData } & ViewActions &
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
  saveActionMessage = () => {
    const { formData } = this.props;
    return <CheapPreview data={formData} />;
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
          <Dialog open={!!this.props.apiState.error}>
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
          <Dialog open={!!this.props.apiState.success}>
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
            <Typography variant="title">Add Product</Typography>
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
            setFormState={setFormState}
            formData={formData}
            busy={this.props.busy}
            validation={validation}
          />
          {/* Features */}
          <div style={{ width: "100%" }}>
            <ProductFeatures
              features={formData.features}
              onFeaturesChanged={features => {
                setFormState({ features });
              }}
            />
          </div>
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
