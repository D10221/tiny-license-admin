import crudApi, { CrudApiState, CrudApiActions } from "../crud-api";
/** */
export type ApiItem = {
  /** @description license ID */
  id: string;
  /** @description Customer ID */
  customer: string;
  displayName: string;
  description: string;
  enabled: boolean;
  /** @description object as JSON*/
  feature: string;
  notes: string;
  /** @description Product ID */
  product: string;
  /** @description Expiration Date as String Date*/
  exp: string;
  /** @description as String Date*/
  updatedAt: string;
  /** @description as String Date*/
  createdAt: string;
  /** @description user ID */
  userid: string;

}
/** */
export type ApiState = CrudApiState<ApiItem[]> & {
  
}
/** */
export type ApiActions = CrudApiActions & {

}
/** */
export type ActionType = "deliver" | "edit" | "delete" | "view" | "download";
// ...
const defaultState = { busy: false, error: undefined, data: [] };
const { REACT_APP_API_BASE, REACT_APP_API_LICENSES } = process.env;
/** */
const api = crudApi<ApiItem[]>("license-list", defaultState, {
  endpoint: `${REACT_APP_API_BASE}/${REACT_APP_API_LICENSES}`
});
export const downloadUrl =  `${REACT_APP_API_BASE}/${REACT_APP_API_LICENSES}/download`;
export default api;
