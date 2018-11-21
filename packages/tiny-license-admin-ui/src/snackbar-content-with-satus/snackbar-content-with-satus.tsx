/**
 * original : https://github.com/mui-org/material-ui/blob/master/docs/src/pages/demos/snackbars/CustomizedSnackbars.js
 */
import * as React from "react";
import classNames from "classnames";
import green from "@material-ui/core/colors/green";
import amber from "@material-ui/core/colors/amber";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import { withStyles } from "@material-ui/core/styles";
import { Icon, IconButton, StyleRulesCallback } from "@material-ui/core";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import { ComponentType, ReactNode } from "react";

const variantIcon = {
    success: (props: { className: string }) => <Icon children="check_circle" className={props.className} />,
    warning: (props: { className: string }) => <Icon children="warning" className={props.className} />,
    error: (props: { className: string }) => <Icon children="error" className={props.className} />,
    info: (props: { className: string }) => <Icon children="info" className={props.className} />,
};

const CloseIcon = (props: { className: string }) => <Icon children={"close"} className={props.className} />

const snackbarContentWithStatusStyle: StyleRulesCallback = theme => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: "flex",
        alignItems: "center",
    },
});
export type MessageStatus = 'success' | 'warning' | 'error' | 'info';
/** */
interface SnackbarContentWithStatusProps {
    className?: string,
    message: ReactNode,
    onClose?(...args: any[]): any,
    variant: MessageStatus
}
/** */
function SnackbarContentWithStatus(props: { classes: ClassNameMap, } & SnackbarContentWithStatusProps
) {
    const { classes, className, message, onClose, variant } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ] as any}            
        />
    );
}

const SnackbarContentWrapper: ComponentType<SnackbarContentWithStatusProps> = withStyles(snackbarContentWithStatusStyle)(SnackbarContentWithStatus);

export default SnackbarContentWrapper;