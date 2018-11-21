export type AnyData = { [key: string]: any };

export interface FormDataActions {
  setFormState(x: {}): any;
  setFormValue(key: string, value: any): any;
  resetForm(): any;
  validate(): any;
}
