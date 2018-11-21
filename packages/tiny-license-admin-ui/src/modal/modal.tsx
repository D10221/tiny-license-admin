import { Component, ReactNode } from "react";
import * as React from "react";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Icon from "@material-ui/core/Icon";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import styles from "./styles";
import classNames from "classnames";
/** */
export interface ModalProps {
    isOpen: boolean;
    dialogContent: ReactNode;
    dialogTitle: ReactNode;
    dialogActions?: ReactNode;
    onClose?(): any;
    disabled?: boolean;    
}
/** */
class Modal extends Component<ModalProps & { classes: ClassNameMap }> {
    render() {
        const { classes, disabled } = this.props;
        return <Dialog open={this.props.isOpen} onClose={this.props.onClose}>
            <AppBar className={classes.appbar}>
                <Toolbar className={classes.toolbar}>
                    {
                        typeof this.props.dialogTitle === "string"
                            ? <Typography color="inherit" variant="headline" className={classes.dialogTitleTypography} >{this.props.dialogTitle}</Typography>
                            : this.props.dialogTitle
                    }
                    <div className={classNames(classes.toolbarSpacer, classes.toolbarExpander)} />
                    <Button
                        color="inherit"
                        className={classes.toolbarButton}
                        onClick={this.props.onClose}
                        disabled={disabled} >
                        <Icon children="close" className={classes.toolbarButtonIcon} />
                    </Button>
                </Toolbar>
            </AppBar>
            <DialogContent className={classes.dialogContent}>
                {typeof this.props.dialogContent === "string"
                    ? <DialogContentText >{this.props.dialogContent}</DialogContentText>
                    : this.props.dialogContent
                }
            </DialogContent>
            <DialogActions>
                {this.props.dialogActions}
            </DialogActions>
        </Dialog>
    }
}
/** */
export default withStyles(styles)(Modal) as React.ComponentType<ModalProps>;