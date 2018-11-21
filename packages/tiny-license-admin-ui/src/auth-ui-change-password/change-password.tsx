import { Card, CardActions, CardContent, CardHeader, CircularProgress } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import * as React from "react";
import { Component, ComponentType } from "react";
import styles from "./styles";
const log = process.env.NODE_ENV !== "production" ? console.log.bind(console) : () => { };
log("?")
/** */
export interface ChangePasswordProps {
    auth: {
        changePassword(old: string, _new: string): any
    },
    authState: {

    };
    image?: any;
}
/**
 * 
 */
class ChangePassword extends Component<ChangePasswordProps & { classes: ClassNameMap; }> {
    state = {
        oldPassword: "",
        newPassword: "",
        busy: false,
        error: undefined,
        authenticated: false,
        passwordChanged: false,
        passwordChanging: false
    };
    /** */
    setMessage = (message: string, timeout: number) => {
        this.setState({ message });
        typeof timeout === "number" && timeout > 1 && setTimeout(() => {
            this.setState({ message: undefined });
        }, timeout)
    }
    /** */
    static getDerivedStateFromProps(props: ChangePasswordProps, state: {}) {
        return Object.assign(state, props.authState);
    }
    /** */
    onKeyUp = (key: string, callback: Function): React.KeyboardEventHandler => {
        return (e) => {
            if (e.key === key) callback();
        }
    }
    /** */
    handleChangedPassword = async () => {
        await this.props.auth.changePassword(this.state.oldPassword, this.state.newPassword);
        this.setState({ success: true });
    }
    /** */
    onOldPasswordChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({ oldPassword: e.target.value });
    }
    /** */
    onNewPasswordChanged: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        this.setState({ newPassword: e.target.value });
    }
    /** */
    showImage(image: any, className: string) {
        return image && (
            <img className={className} src={image} title="Logo" />
        )
    }
    renderPasswordChanging(passwordChanging: boolean) {
        if (!passwordChanging) {
            return null;
        }
        return <div style={{ margin: "1rem" }}><Typography >...changing password</Typography></div>;
    }
    /** */
    render() {
        const { classes, image } = this.props;
        const { busy, error, authenticated, oldPassword, newPassword, passwordChanged, passwordChanging } = this.state;
        if (!authenticated) return <span style={{ color: "red" }}>You shoudln't see this, this route shoudl be protected</span>;
        return <div className={classes.root}>
            <Card className={classes.card}>
                {this.showImage(image, classes.media)}
                {passwordChanged && <CardHeader title={<Typography color="error" variant="headline">Password Changed!</Typography>} />}
                <CardContent>
                    {busy && <CircularProgress className={classes.progress} thickness={7} />}
                    {error && <Typography color="error">{error}</Typography>}
                    <TextField
                        id="old-password"
                        label="Old password"
                        className={classes.textField}
                        margin="normal"
                        onKeyUp={this.onKeyUp("Enter", this.handleChangedPassword)}
                        disabled={busy || !!passwordChanged}
                        value={oldPassword}
                        onChange={this.onOldPasswordChanged}
                        type={"password"}
                    />
                    <TextField
                        value={newPassword}
                        onChange={this.onNewPasswordChanged}
                        id="new-password"
                        label="New Password"
                        type={"password"}
                        className={classes.textField}
                        margin="normal"
                        onKeyUp={this.onKeyUp("Enter", this.handleChangedPassword)}
                        disabled={busy || !!passwordChanged}
                    />
                    {this.renderPasswordChanging(!!passwordChanging)}
                </CardContent>
                <CardActions className={classes.actions}>
                    <Button
                        onClick={this.handleChangedPassword}
                        disabled={busy || !!passwordChanged}
                    >
                        Submit
                        </Button>
                </CardActions>
            </Card>
        </div>
    }
}
/**
 * 
 */
export default withStyles(styles)(ChangePassword) as ComponentType<ChangePasswordProps>;