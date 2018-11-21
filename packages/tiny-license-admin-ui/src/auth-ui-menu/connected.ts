import { default as AuthMenu } from "./auth-menu";
import { selector } from "@australis/tiny-auth-redux";
import { connect } from "react-redux";
export default connect(state => ({ authState: selector(state) }))(AuthMenu);
