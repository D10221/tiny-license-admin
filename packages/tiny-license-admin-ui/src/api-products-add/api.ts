import crudApi from "../crud-api";
const defaultState = {
  busy: false,
  error: undefined,
  data: undefined
};
const { REACT_APP_API_BASE , REACT_APP_API_PRODUCTS} = process.env;
const endpoint = `${REACT_APP_API_BASE}/${REACT_APP_API_PRODUCTS}`;
const api = crudApi("products-add", defaultState, {
  endpoint
});
export default api;