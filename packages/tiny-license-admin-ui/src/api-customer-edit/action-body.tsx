import { Component, ReactNode } from "react";
import { ActionViewState } from "./action-view";
import * as React from "react";
import Typography from "@material-ui/core/Typography";
import withStyles, {
  ClassNameMap,
  StyleRulesCallback
} from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { ApiItem } from "./api";
import TextField from "@material-ui/core/TextField";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import WithValidationState from "../validation/with-validation-state";
import { ValidationResultMap, EMAIL_REGEX } from "../validation";

/** */
const styles: StyleRulesCallback = theme => {
  return {
    busy: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between"
    },
    form: {
      display: "flex",
      flexWrap: "wrap"
    },
    textField: {
      margin: "1rem",
      width: "200px"
    },
    textFieldCheckbox: {
      margin: "1rem"
    }
  };
};
export interface ActionBodyState {
  formData: ApiItem;
}
/** */
export type ApiItemValidation = {
  validation: ValidationResultMap<ApiItem>;
  isValidationEmpty: boolean;
};
/** */
export type ActionBodyProps = {
  onValidationChanged?(validationState: ApiItemValidation): any;
  /** */
  render?(state: ApiItemValidation & ActionBodyState): ReactNode;
} & ActionViewState<ApiItem>;
/** */
class ActionBody extends Component<
  ActionBodyProps & { classes: ClassNameMap },
  ActionBodyState
  > {
  state = {
    formData: {} as any
  };

  static getDerivedStateFromProps(
    props: ActionBodyProps,
    state: ActionBodyState
  ) {
    const { item } = props;
    const { formData } = state;
    return {
      formData: Object.assign({}, item, formData)
    };
  }

  /** */
  render() {
    const { isBusy, isSuccess, isError, error, classes } = this.props;
    const { formData } = this.state;
    const disabled = isBusy || isSuccess;
    return (
      <div>
        {isBusy && (
          <div className={classes.busy}>
            <Typography variant="headline">Please wait...</Typography>
            <CircularProgress />
          </div>
        )}
        {!!isError && (
          <Typography variant="title" color="error">
            {error}
          </Typography>
        )}
        {isSuccess && (
          <Typography variant="headline" color="primary">
            Success
          </Typography>
        )}
        <WithValidationState
          item={formData}
          rules={{
            address: { test: true, message: "Required" },
            description: { test: true, message: "Required" },
            displayName: { test: true, message: "Required" },
            name: { test: true, message: "Required" },
            email: { test: EMAIL_REGEX, message: "Required" },
            notes: { test: true, message: "Required" },
            phone: { test: true, message: "Required" },
          }}
          render={validationState => {
            const { validation, isValidationEmpty } = validationState;
            /** */
            const setFormState = (key: keyof ApiItem, value: any) => {
              const { formData } = this.state;
              const data = Object.assign(formData, { [key]: value });
              this.setState({
                formData: data
              });
              validationState.validate(data).then(validation => {
                this.props.onValidationChanged &&
                  this.props.onValidationChanged(validation);
              });
            };

            return (
              <>
                <form className={classes.form}>
                  <TextField
                    className={classes.textField}
                    label={"Name"}
                    value={formData.name}
                    onChange={e => {
                      const value = e.target.value;
                      setFormState("name", value);
                    }}
                    error={!!validation.name}
                    helperText={validation.name}
                    disabled={disabled}
                  />
                  <TextField
                    className={classes.textField}
                    label={"displayName"}
                    value={formData.displayName}
                    onChange={e => {
                      const value = e.target.value;
                      setFormState("displayName", value);
                    }}
                    error={!!validation.displayName}
                    helperText={validation.displayName}
                    disabled={disabled}
                  />
                  <TextField
                    className={classes.textField}
                    label={"description"}
                    value={formData.description}
                    onChange={e => {
                      const value = e.target.value;
                      setFormState("description", value);
                    }}
                    error={!!validation.description}
                    helperText={validation.description}
                    disabled={disabled}
                  />
                  <TextField
                    className={classes.textField}
                    label={"address"}
                    value={formData.address}
                    onChange={e => {
                      const value = e.target.value;
                      setFormState("address", value);
                    }}
                    error={!!validation.address}
                    helperText={validation.address}
                    disabled={disabled}
                    multiline={true}
                    rows={3}
                  />
                  <TextField
                    className={classes.textField}
                    label={"contact"}
                    value={formData.contact}
                    onChange={e => {
                      const value = e.target.value;
                      setFormState("contact", value);
                    }}
                    error={!!validation.contact}
                    helperText={validation.contact}
                    disabled={disabled}
                  />
                  <TextField
                    className={classes.textField}
                    label={"email"}
                    value={formData.email}
                    onChange={e => {
                      const value = e.target.value;
                      setFormState("email", value);
                    }}
                    error={!!validation.email}
                    helperText={validation.email}
                    disabled={disabled}
                  />
                  <TextField
                    className={classes.textField}
                    label={"phone"}
                    value={formData.phone}
                    onChange={e => {
                      const value = e.target.value;
                      setFormState("phone", value);
                    }}
                    error={!!validation.phone}
                    helperText={validation.phone}
                    disabled={disabled}
                  />
                  <TextField
                    className={classes.textField}
                    label={"notes"}
                    value={formData.notes}
                    onChange={e => {
                      const value = e.target.value;
                      setFormState("notes", value);
                    }}
                    error={!!validation.notes}
                    helperText={validation.notes}
                    disabled={disabled}
                    multiline={true}
                    rows={3}
                  />
                  <FormControlLabel
                    className={classes.textFieldCheckbox}
                    label="Enabled"
                    control={
                      <Checkbox
                        disabled={disabled}
                        checked={formData.enabled}
                        onChange={e => {
                          setFormState("enabled", e.target.checked);
                        }}
                      />
                    }
                  />
                </form>
                {/* Actions */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "1rem"
                  }}
                >
                  {this.props.render &&
                    this.props.render({
                      validation,
                      isValidationEmpty,
                      formData
                    })}
                </div>
              </>
            );
          }}
        />
      </div>
    );
  }
}
/**
 *
 */
export default withStyles(styles)(ActionBody);
