/**
 * original : https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/snackbars/CustomizedSnackbars.js
 */
import * as React from "react";
import Button from "@material-ui/core/Button";
import Snackbar from "@material-ui/core/Snackbar";
import { withStyles } from "@material-ui/core/styles";
import { ClassNameMap, StyleRulesCallback } from "@material-ui/core/styles/withStyles";
import { ComponentType, Component } from "react";
import SnackbarContentWrapper from "./snackbar-content-with-satus";

const styles: StyleRulesCallback = theme => ({
    margin: {
        margin: theme.spacing.unit,
    },
});

class SnackbarWithStatus extends Component<{ classes: ClassNameMap }> {
    state = {
        open: false,
    };

    handleClick = () => {
        this.setState({ open: true });
    };

    handleClose = (_: any, reason: any) => {
        if (reason === "clickaway") {
            return;
        }

        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;

        return (
            <div>
                <Button className={classes.margin} onClick={this.handleClick}>
                    Open success snackbar
        </Button>
                <Snackbar
                    anchorOrigin={{
                        vertical: "bottom",
                        horizontal: "left",
                    }}
                    open={this.state.open}
                    autoHideDuration={6000}
                    onClose={this.handleClose}
                >
                    <SnackbarContentWrapper
                        onClose={this.handleClose}
                        variant="success"
                        message="This is a success message!"
                    />
                </Snackbar>
                <SnackbarContentWrapper
                    variant="error"
                    className={classes.margin}
                    message="This is an error message!"
                />
                <SnackbarContentWrapper
                    variant="warning"
                    className={classes.margin}
                    message="This is a warning message!"
                />
                <SnackbarContentWrapper
                    variant="info"
                    className={classes.margin}
                    message="This is an information message!"
                />
                <SnackbarContentWrapper
                    variant="success"
                    className={classes.margin}
                    message="This is a success message!"
                />
            </div>
        );
    }
}
/**
 * 
 */
export default withStyles(styles)(SnackbarWithStatus) as ComponentType<SnackbarWithStatus>;