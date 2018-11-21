import { Snackbar } from "@material-ui/core";
import * as React from "react";
import { Component } from "react";
import { SnackbarContentWithSatus } from "../snackbar-content-with-satus";
import { MessagesState } from "./types";

interface MessageAction {
    close(): any;
}

export default class Messages extends Component<MessagesState & MessageAction> {
    render() {
        return (<Snackbar
            open={!!this.props.message}
            onClose={this.props.close}
        >
            <SnackbarContentWithSatus
                variant={this.props.status || "info"}
                message={this.props.message}
                onClose={this.props.close} />
        </Snackbar>)
    }
}