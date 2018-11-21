import { Component, ChangeEventHandler } from "react";
import * as React from "react";
import { TextField, IconButton, Icon } from "@material-ui/core";
import validate from "./validate";

export type EditProps = {
  value: string;
  featureKeys: string[];
  onCancel(): any;
  applyEdit(value: string): any;
};

interface EditState {
  value: string;
  error: string | undefined;
}

export default class Edit extends Component<EditProps, EditState> {
  state = {
    value: this.props.value,
    error: undefined
  };

  onChange: ChangeEventHandler<HTMLInputElement> = e => {
    const { featureKeys } = this.props;
    const value = e.target.value;
    const error = ((value!== this.props.value) &&  validate(featureKeys, value)) || undefined;
    this.setState({ value, error });
  };

  render() {
    const { onCancel, applyEdit } = this.props;
    const { onChange } = this;
    const { value, error } = this.state;
    const changed = (value !== this.props.value);
    return (
      <>
        <TextField
          autoFocus={true}
          style={{ backgroundColor: "lightpink", padding: "0.5rem" }}
          value={value}
          onChange={onChange}
          helperText={error}
          error={!!error}
          onKeyUp={e => {
            if (["Enter"].indexOf(e.key) !== -1) {
              if (!error) {
                return (changed && applyEdit(value)) || onCancel();
              }
            }
            if (["Escape"].indexOf(e.key) !== -1) {
              return onCancel();
            }
          }}
        />
        <IconButton style={{marginLeft: "0.5rem"}}
          aria-label="apply-edit"
          title="Apply Edit"
          disabled={!!error}
        >
          <Icon children="checked" onClick={() => (changed &&  applyEdit(value)) || onCancel()} />
        </IconButton>
        <IconButton aria-label="cancel-edit" title="Cancel Edit">
          <Icon children="cancel" onClick={onCancel} />
        </IconButton>
      </>
    );
  }
}
