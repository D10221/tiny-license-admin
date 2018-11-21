import { Component } from "react";
import { ActionViewState } from "./action-view";
import * as React from "react";
import Typography from "@material-ui/core/Typography";
import withStyles, { ClassNameMap, StyleRulesCallback } from "@material-ui/core/styles/withStyles";
import CircularProgress from "@material-ui/core/CircularProgress";
/** */
const styles: StyleRulesCallback = (theme) => {
    return {
        busy: { display: "flex", flexDirection: "row", justifyContent: "space-between" },
    }
}
/** */
export type ActionBodyProps<T> = ActionViewState<T>;
/** */
class ActionBody<T extends { displayName: string, }> extends Component<ActionBodyProps<T> & { classes: ClassNameMap }> {
    render() {
        const { isBusy, isSuccess, isError, error, item, classes } = this.props;
        const displayName = item && item.displayName || undefined;
        return (<div>
            <Typography variant="headline">{displayName}</Typography>
            {isBusy && <div className={classes.busy}><Typography variant="headline">Please wait...</Typography><CircularProgress /></div>}
            {!!isError && (<Typography variant="title" color="error">{error}</Typography>)}
            {isSuccess && <Typography variant="headline" color="primary">Success</Typography>}
        </div>)
    }
}
/**
 * 
 */
export default withStyles(styles)(ActionBody);