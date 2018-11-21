import { Card, CardActions, CardContent, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Component, KeyboardEvent, SyntheticEvent } from "react";
import { Redirect, RouteComponentProps, withRouter } from "react-router";
// import { AuthHandler } from "@australis/tiny-auth-handler";

import styles from "./styles";
/** */
export type LoginViewProps = {
    image?: any;
    authState: {
        profile?: { id?: string };
        busy?: boolean;
        error?: string;
        authenticated?: boolean;
    };
    auth: {
        login(username: string, password: string): any,
        logout(): any,
        changePassword(old: string, _new: string): any;
    };
};
/** private */
type ViewProps = LoginViewProps & RouteComponentProps<{}> & { classes: ClassNameMap };
/** private */
type LoginViewState = {
    username: string;
    password: string;
    fromProfile: boolean;
}
/** */
class LoginView extends Component<ViewProps> {
    state: LoginViewState = {
        username: "",
        password: "",
        fromProfile: false
    }
    /** */
    inputs: {
        password?: HTMLInputElement;
    } = {};
    /** */
    static getDerivedStateFromProps(props: ViewProps, state: LoginViewState) {
        let { username, password } = state;
        if (props.authState && props.authState.profile && props.authState.profile.id && props.authState.profile.id.trim() !== "") {
            return { username: props.authState.profile.id, password, fromProfile: true };
        }
        return { username, password, fromProfile: false };
    }
    /** */
    handleLogin = async (e?: SyntheticEvent<any>) => {
        e && e.preventDefault();
        if (!this.inputs.password) throw new Error("Wtf?");
        if (!this.props.auth) {
            throw new Error("Auth not found");
        }
        await this.props.auth.login(
    /*userName:*/ this.state.username,
    /*password:*/ this.inputs.password.value,
        );
    };
    /** */
    handleLogout = (e?: SyntheticEvent<any>) => {
        e && e.preventDefault();
        if (!this.props.auth) {
            throw new Error("Auth not found");
        }
        this.props.auth.logout();
    };
    /** */
    onKeyUp = (key: string, callback: () => void) => (
        e: KeyboardEvent<any>,
    ) => {
        if (e.key === key) callback();
    };
    /** */
    onUsernameChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({ username: e.target.value })
    };
    /** */
    render() {
        const { classes, image, authState } = this.props;
        const { busy, error, authenticated } = authState || { busy: false, error: undefined, authenticated: false };
        if (authenticated) {
            if (this.props.location.state && this.props.location.state.referrer) {
                return <Redirect to={{
                    pathname: this.props.location.state.referrer,
                    state: {
                        referrer: this.props.location.pathname
                    }
                }} from={this.props.location.pathname} />
            }
        }
        const { username, fromProfile } = this.state;
        return (
            <div className={classes.root}>
                <Card className={classes.card}>
                    {image && (
                        <img className={classes.media} src={image} title="Logo" />
                    )}
                    <CardContent>
                        {busy && <CircularProgress className={classes.progress} thickness={7} />}
                        {error && <Typography color="error">{error}</Typography>}
                        <TextField
                            id="username"
                            label="User Name"
                            className={classes.textField}
                            margin="normal"
                            onKeyUp={this.onKeyUp("Enter", this.handleLogin)}
                            disabled={busy || !!authenticated || !!fromProfile}
                            value={username}
                            onChange={this.onUsernameChanged}
                        />
                        <TextField style={{ visibility: (authenticated && "hidden") || undefined }}
                            inputRef={(ref: any) => (this.inputs.password = ref)}
                            id="password"
                            label="Password"
                            type="password"
                            className={classes.textField}
                            margin="normal"
                            onKeyUp={this.onKeyUp("Enter", this.handleLogin)}
                            disabled={busy || authenticated}
                        />
                    </CardContent>
                    <CardActions className={classes.actions}>
                        <Button
                            onClick={authenticated ? this.handleLogout : this.handleLogin}
                            disabled={busy}
                        >
                            {authenticated ? "Logout" : "Login"}
                        </Button>
                    </CardActions>
                </Card>
            </div>
        );
    }
}
export default withRouter(withStyles(styles)(LoginView));

