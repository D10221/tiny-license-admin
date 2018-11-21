/**
 * Configure Auth
 */
import * as React from "react";
import { connect } from "react-redux";
import createAuthApi from "@australis/tiny-auth-api";
import { AuthHandler } from "@australis/tiny-auth-handler";
import { AuthProvider, AuthRequired } from "@australis/tiny-auth-react";
import { bindActions, selector } from "@australis/tiny-auth-redux";
import { store } from "./store";
import * as endPoints from "./endpoints";
/**
 * 
 */
const authApi = createAuthApi({
    loginUrl: endPoints.LOGIN,
    logoutUrl: endPoints.LOGOUT,
    profileUrl: endPoints.PROFILE,
    refreshUrl: endPoints.REFRESH,
    changePasswordUrl: endPoints.CHANGEPASSWORD
});
/** */
const authHandler = AuthHandler(() => selector(store.getState()), bindActions(store), authApi);
/** */
export const RequireAuth: React.ComponentType<{ redirectTo: string, renderBusy?(state: {}): any }> = connect(selector)(AuthRequired);
/** */
export const Provider = (props: { children: React.ReactNode }) => <AuthProvider auth={authHandler} children={props.children} />
/** */
export default authHandler;
