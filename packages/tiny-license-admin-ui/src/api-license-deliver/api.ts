import crudApi, { CrudApiState, CrudApiActions } from "../crud-api";
/** */
export type ApiState = CrudApiState<any> & {

}
/** */
export type ApiActions = CrudApiActions & {
    send(id: string): any;
}
export interface ApiItem {
    id: string;
    displayName: string;
}
// ...
const defaultState = { busy: false, error: undefined, data: [] };
const { REACT_APP_API_BASE, REACT_APP_API_LICENSES } = process.env;
/** */
const api = crudApi<any>("license-deliver", defaultState, {
    endpoint: `${REACT_APP_API_BASE}/${REACT_APP_API_LICENSES}/deliver`
});
export default api;
