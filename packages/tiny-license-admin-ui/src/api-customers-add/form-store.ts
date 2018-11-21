/** */
import createStore, { AnyData, FormDataActions } from "../form-data";
/** */
export interface FormViewActions extends FormDataActions {
  setFormState(payload: Partial<FormViewData>):any;
};
/** */
export interface FormViewData extends AnyData {
  address: string;
  contact: string;
  description: string;
  email: string;
  enabled: boolean;
  displayName: string;
  name: string;
  notes: string;
  phone: string;
}
/** */
const defaultState: FormViewData = {
  address: "",
  contact: "",
  description: "",
  displayName: "",
  email: "",
  enabled: true,
  name: "",
  notes: "",
  phone: ""
};
const formDataStore = createStore("customer-add", defaultState, {});
export default formDataStore;
