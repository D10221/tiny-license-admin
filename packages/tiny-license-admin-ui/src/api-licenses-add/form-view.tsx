import { TextField, FormControlLabel, Checkbox } from "@material-ui/core";
import { Component } from "react";
import * as React from "react";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { FormDataValidationResult } from "./validation";
import { ViewFormData } from "./form-store";
import { Connected as CustomerLookupField } from "../api-customer-lookup-field";
import { Connected as ProductLookupField } from "../api-product-lookup-field";
import { LicenseFeatures } from "../api-license-features";
import { DateField } from "../date-field";

export interface FormParams {
  validation: FormDataValidationResult;
  busy: boolean;
}

export interface FormState {
  formData: ViewFormData;
}

export interface FormActions {
  setFormState(payload: Partial<ViewFormData>): any;
}

export type FormViewProps = FormParams & FormState & FormActions;
/**
 *
 */
export default class FormView extends Component<
  FormViewProps & { classes: ClassNameMap }
  > {
  /**
   *
   */
  render() {
    const { classes, validation, busy, formData, setFormState } = this.props;
    return (
      <form className={classes.form} autoComplete="off">
        {/* Select  Customer */}
        <CustomerLookupField
          id="customer"
          className={classes.textField}
          label="Customer"
          helperText={validation.customer}
          validation={validation.customer}
          disabled={!!busy}
          value={formData.customer}
          onSelectionChanged={e => {
            setFormState({ customer: e && e.id });
          }}
        />
        {/* Select  Product */}
        <ProductLookupField
          id="product"
          className={classes.textFieldLarge}
          label="Product"
          helperText={validation.product || "important helper text"}
          validation={validation.product}
          disabled={!!this.props.busy}
          value={formData.product}
          onSelectionChanged={e => {
            setFormState({
              product: e && e.id,
              features: e && e.features,
              featureValues: {}
            });
          }}
        />
        <TextField
          id="displayName"
          className={classes.textField}
          label="Display Name"
          helperText={validation.displayName || "important helper text"}
          error={!!validation.displayName}
          disabled={!!this.props.busy}
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
          disabled={!!this.props.busy}
          value={formData.description}
          onChange={e => {
            setFormState({ description: e.target.value });
          }}
        />
        <DateField
          className={classes.textFieldDate}
          label="Expiration"
          dateValue={formData.exp}
          onDateChange={date =>{
            let exp = date.getTime();                      
            setFormState({ exp })
          }}
          InputLabelProps={{
            shrink: true
          }}
        />

        <FormControlLabel
          className={classes.textFieldCheckbox}
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
          disabled={!!this.props.busy}
          value={formData.notes}
          onChange={e => setFormState({ notes: e.target.value })}
        />

        {/* Features */}
        <div style={{ width: "100%" }}>
          <LicenseFeatures
            features={formData.features}
            featureValues={formData.featureValues}
            setFeatureValue={featureValues => setFormState({ featureValues })}
            onFeatureChanged={(key, value) => {
              const _update = Object.assign({}, formData.featureValues, {
                [key]: value
              });
              setFormState({
                featureValues: _update
              });
            }}
          />
        </div>
      </form>
    );
  }
}
