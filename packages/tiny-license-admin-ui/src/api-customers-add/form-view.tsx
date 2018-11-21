import { Component } from "react";
import { FormDataValidationResult } from "./validation";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import * as React from "react";
import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { FormViewData, FormViewActions } from "./form-store";

export interface FormParams {
    validation: FormDataValidationResult;
    busy: boolean;
}

export interface FormState {
    formData: FormViewData;
}

export type FormViewProps = FormParams & FormState & FormViewActions;

export default class FormView extends Component<FormViewProps & { classes: ClassNameMap}> {
    render (){        
        const { classes, setFormState , validation, formData, busy } = this.props;
        return <form className={classes.form} autoComplete="off">
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
          className={classes.textField}
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
          id="contact"
          className={classes.textField}
          label="Contact"
          helperText={validation.contact || "important helper text"}
          error={!!validation.contact}
          disabled={!!busy}
          value={formData.contact}
          onChange={e => {
            setFormState({ contact: e.target.value });
          }}
        />
        <TextField
          id="phone"
          className={classes.textField}
          label="Phone"
          helperText={validation.phone || "important helper text"}
          error={!!validation.phone}
          disabled={!!busy}
          value={formData.phone}
          onChange={e => {
            setFormState({ phone: e.target.value });
          }}
        />
        <TextField
          id="email"
          type="email"
          className={classes.textFieldLarge}
          label="Email"
          helperText={validation.email || "important helper text"}
          error={!!validation.email}
          disabled={!!busy}
          value={formData.email}
          onChange={e => setFormState({ email: e.target.value })}
        />
        <TextField
          id="address"
          type="text"
          multiline={true}
          rows={3}
          className={classes.textFieldMultiline}
          label="Address"
          helperText={
            validation.address || "NOTE: address lines should be honored"
          }
          error={!!validation.address}
          disabled={!!busy}
          value={formData.address}
          onChange={e => setFormState({ address: e.target.value })}
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
    }
}