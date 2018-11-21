import crudApi, { CrudApiState, CrudApiActions } from "../crud-api";
/** */
export type ApiState = CrudApiState<any> & {

}
/** */
export type ApiActions = CrudApiActions & {
    send(item: Partial<ApiItem> & { id: string }): any;
}
/** */
export interface ApiItem {
    id: string;
    address: string;
    description: string;
    contact: string;
    displayName: string;
    name: string,
    email: string;
    enabled: boolean,
    notes: string;
    phone: string;
    updatedAt: number;
    createdAt: number;
    userid: string;
}
// ...
const defaultState = { busy: false, error: undefined, data: [] };
const { REACT_APP_API_BASE, REACT_APP_API_CUSTOMERS } = process.env;
/** */
const api = crudApi<any>("customer-update", defaultState, {
    endpoint: `${REACT_APP_API_BASE}/${REACT_APP_API_CUSTOMERS}`
});
export default api;
