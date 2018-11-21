import crudApi, { CrudApiActions, CrudApiState } from "../crud-api";
/** */
export type ApiItem = {
    id: string;
    description: string;
    displayName: string;
    enabled: boolean,
    features: string,
    name: string;
    notes: string;
    createdAt: number;
    updatedAt: number;
    userid: string;
    address?: string;
    contact?: any;
}
/** */
export type ApiState = CrudApiState<ApiItem[]> & {

}
/** */
export type ApiActions = CrudApiActions & {

}
/** */
export type ActionType = "edit" | "delete" | "view";
// ...
const defaultState = { busy: false, error: undefined, data: [] };
const { REACT_APP_API_BASE, REACT_APP_API_CUSTOMERS } = process.env;
/** */
const api = crudApi<ApiItem[]>("customer-list", defaultState, {
    endpoint: `${REACT_APP_API_BASE}/${REACT_APP_API_CUSTOMERS}`
});
export default api;
