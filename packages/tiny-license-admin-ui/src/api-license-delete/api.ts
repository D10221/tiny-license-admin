import crudApi, { CrudApiState, CrudApiActions } from "../crud-api";
/** */
export type ApiState = CrudApiState<any> & {

}
/** */
export type ApiActions = CrudApiActions & {
    dlete(id: string): any;
}
export interface ApiItem {
    id: string;
    displayName: string;
}
// ...
const defaultState = { busy: false, error: undefined, data: [] };
const { REACT_APP_API_BASE, REACT_APP_API_LICENSES } = process.env;
/** */
const api = crudApi<ApiItem[]>("license-delete", defaultState, {
    endpoint: `${REACT_APP_API_BASE}/${REACT_APP_API_LICENSES}`
});
export default api;
