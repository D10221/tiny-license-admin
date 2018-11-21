import crudApi, { CrudApiState, CrudApiActions } from "../crud-api";
/** */
export type ApiState = CrudApiState<any> & {

}
/** */
export type ApiActions = CrudApiActions & {
    send(item: ApiItem): any;
}
export interface ApiItem {
    id: string;
    displayName: string;
    description: string;
    notes: string;
    enabled: boolean;
}
// ...
const defaultState = { busy: false, error: undefined, data: [] };
const { REACT_APP_API_BASE, REACT_APP_API_LICENSES } = process.env;
/** */
const api = crudApi<any>("license-update", defaultState, {
    endpoint: `${REACT_APP_API_BASE}/${REACT_APP_API_LICENSES}`
});
export default api;
