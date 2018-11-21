/**
 *
 */
import createStore from "../form-data";
/** */
export interface ViewFormData {
  /** Customer ID */
  customer: string; // 1024
  /**TODO: currently a string*/
  // createdAT: number,
  description: string;
  displayName: string; // 256
  enabled: boolean;
  // Extra: Not in DB Dto
  features: string;
  /** internal */
  id: string;
  /** 4000 */
  notes: string;
  /** Internal Hidden by api */
  // token: string,
  /** TODO: currently a string */
  // updatedAt:  number,
  /** Product ID */
  product: string;
  featureValues: {};
  /** Date */
  exp: number;
}
/**
 * 24 hours
 */
const exp = Date.now().valueOf() + (24 * 60 * 60 * 1000);
/** */
const defaultState: ViewFormData = {
  customer: "",
  displayName: "",
  description: "",
  enabled: true,
  features: "",
  id: "",
  notes: "",
  product: "",
  featureValues: {},
  exp
};
const formDataStore = createStore<ViewFormData>("licenses-add", defaultState, {
  persist: {
    transform: {
      onLoad: (data: any) => {
        const { exp, ...rest } = data;
        return rest;
      },
      onSave: (data: any) => {
        const { exp, ...rest } = data;
        return rest;
      }
    }
  }
});
export default formDataStore;
