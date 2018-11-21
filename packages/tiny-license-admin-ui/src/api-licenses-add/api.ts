import crudApi from "../crud-api";
const defaultState = {
  busy: false,
  error: undefined,
  data: undefined
};
const { REACT_APP_API_BASE, REACT_APP_API_LICENSES} = process.env; 
/** */
const api = crudApi("licenses-add", defaultState, {
  endpoint: `${REACT_APP_API_BASE}/${REACT_APP_API_LICENSES}`
});
/** */
export default api;