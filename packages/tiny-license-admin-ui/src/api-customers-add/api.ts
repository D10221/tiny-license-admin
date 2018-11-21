import crudApi from "../crud-api";
const defaultState = {
  busy: false,
  error: undefined,
  data: undefined
};
const { REACT_APP_API_BASE, REACT_APP_API_CUSTOMERS } = process.env;
const api = crudApi("customers-add", defaultState, {
  endpoint: `${REACT_APP_API_BASE}/${REACT_APP_API_CUSTOMERS}`
});
export default api;