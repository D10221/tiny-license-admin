import crudApi, { CrudApiState, CrudApiActions } from "../crud-api";
/** */
export type ApiItem = {
    /** @description license ID */
    id: string;
    /** Short Name/Code*/
    name: string;
    /** Title */
    displayName: string;
    description: string;
    enabled: boolean;
    /** @description comma separated list*/
    feature: string;
    notes: string;    
    /** @description string as date */        
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
export type ActionType = "edit" | "delete" | "view";
// ...
const defaultState = { busy: false, error: undefined, data: [] };
const { REACT_APP_API_BASE, REACT_APP_API_PRODUCTS } = process.env;
/** */
const api = crudApi<ApiItem[]>("product-list", defaultState, {
    endpoint: `${REACT_APP_API_BASE}/${REACT_APP_API_PRODUCTS}`
});
export default api;
