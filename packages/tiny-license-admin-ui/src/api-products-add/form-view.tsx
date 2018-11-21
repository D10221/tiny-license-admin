import { Component } from "react";
import * as React from "react";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { FormDataValidationResult, ViewFormData } from "./form-store";

export interface FormViewParams {
  classes: ClassNameMap;
  validation: FormDataValidationResult;
  formData: ViewFormData;
  busy: boolean;
  setFormState(payload: Partial<ViewFormData>): any;
}

export type FormViewProps = FormViewParams & {};

export default class FormView extends Component<FormViewProps> {
  render() {
    const { classes, validation, formData, busy, setFormState } = this.props;
    return (
      <form className={classes.form} autoComplete="off">
        <TextField
          id="name"
          className={classes.textField}
          label="Name"
          helperText={validation.name || "important helper text"}
          error={!!validation.name}
          disabled={!!busy}
          value={formData.name}
          onChange={e => {
            setFormState({ name: e.target.value });
          }}
        />
        <TextField
          id="displayName"
          className={classes.textField}
          label="Display Name"
          helperText={validation.displayName || "important helper text"}
          error={!!validation.displayName}
          disabled={!!busy}
          value={formData.displayName}
          onChange={e => {
            setFormState({ displayName: e.target.value });
          }}
        />
        <TextField
          id="description"
          className={classes.textFieldLarge}
          label="Description"
          helperText={validation.description || "important helper text"}
          error={!!validation.description}
          disabled={!!busy}
          value={formData.description}
          onChange={e => {
            setFormState({ description: e.target.value });
          }}
        />

        <TextField
          id="notes"
          type="text"
          multiline={true}
          rows={3}
          className={classes.textFieldMultiline}
          label="Notes"
          helperText={
            validation.notes || "NOTE: address lines should be honored"
          }
          error={!!validation.notes}
          disabled={!!busy}
          value={formData.notes}
          onChange={e => setFormState({ notes: e.target.value })}
        />
        <div style={{ flex: "1 0" }} />
        <FormControlLabel
          className={classes.checkbox}
          label="Enabled"
          control={
            <Checkbox
              checked={formData.enabled}
              onChange={e => {
                setFormState({ enabled: e.target.checked });
              }}
            />
          }
        />
      </form>
    );
  }
}
