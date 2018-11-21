import { selector } from "@australis/tiny-auth-redux";
import { connect } from "react-redux";
import ChangePassword, { ChangePasswordProps } from "./change-password";
import { ComponentType } from "react";
const Connected: ComponentType<Pick<ChangePasswordProps, "image" | "auth">> = connect(state => ({ authState: selector(state) }))(ChangePassword);
export default Connected;
