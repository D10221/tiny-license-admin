/**
 *
 */
import createStore, { AnyData } from "../form-data";
/** */
export interface ViewFormData extends AnyData {
  name: string;
  displayName: string;
  description: string;
  enabled: boolean;
  // Dest: JSON or comma separated list of string
  features: string;
  notes: string;
}
export type FormDataValidationResult = Partial<ViewFormData>;
/** */
const defaultState: ViewFormData = {
  name: "",
  displayName: "",
  description: "",
  enabled: true,
  features: "",
  notes: ""
};
const formDataStore = createStore<ViewFormData>("products-add", defaultState);
export default formDataStore;
