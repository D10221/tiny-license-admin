import viewStore from "../view-store";
const PUBLIC_URL = process.env.PUBLIC_URL || "";
const defaultState = {
  title: process.env.REACT_APP_TITLE || "Tiny-Auth/Demo",
  rootUrl: PUBLIC_URL + "/",
  viewIndex: 0
};
const adapter = viewStore("root", defaultState);
export default adapter;
