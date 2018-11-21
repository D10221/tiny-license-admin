import createApi, { CrudApiState, CrudApiActions } from "../crud-api";
/** 
 * @description Warning partially typed api result item
 */
export interface ApiItem {
    displayName: string,
    id: string
};

export type ApiState = CrudApiState<ApiItem[]> & {
    
}

export type ApiActions = CrudApiActions & {
    // local ...
}

const apiDefaultState: ApiState = {
    busy: false,
    error: undefined,
    data: [],
};
const { REACT_APP_API_BASE, REACT_APP_API_CUSTOMERS } = process.env;

const api = createApi("customer-lookup", apiDefaultState, {
    endpoint: `${REACT_APP_API_BASE}/${REACT_APP_API_CUSTOMERS}`
});

export default api;