import createApi, { CrudApiState, CrudApiActions } from "../crud-api";
/** 
 * @description Warning partially typed api result item
 */
export interface ApiItem {
    displayName: string,
    id: string;
    features: string;
};

export type ApiState = CrudApiState<ApiItem[]> & {
    data: ApiItem[]
}

export type ApiActions = CrudApiActions & {
    // local ...
}

const apiDefaultState: ApiState = {
    busy: false,
    error: undefined,
    data: [],
};

const { REACT_APP_API_BASE, REACT_APP_API_PRODUCTS } = process.env;

const api = createApi("product-lookup", apiDefaultState, {
    endpoint: `${REACT_APP_API_BASE}/${REACT_APP_API_PRODUCTS}`
});

export default api;