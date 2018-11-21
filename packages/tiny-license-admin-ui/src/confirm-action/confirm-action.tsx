import {
  Button,
  DialogActions,
  DialogContent,
  Dialog,
  DialogTitle,
  Typography
} from "@material-ui/core";
import React from "react";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
/**
 *
 */
export interface ConfirmActionProps {
  isOpen: boolean;
  actionTitle?: React.ReactNode;
  actionMessage?: React.ReactNode;
  acceptAction(ok: boolean): any;
}
/** */
const renderActionMessage: React.StatelessComponent<{ actionMessage: React.ReactNode }> = ({
  actionMessage
}) => {
  if (typeof actionMessage === "string")
    return <Typography>{actionMessage}</Typography>;
  return (actionMessage || null) as any;
};
/**
 *
 * @param props
 */
const ConfirmAction: React.StatelessComponent<
  ConfirmActionProps & {
    classes: ClassNameMap;
  }
  > = props => {
    const { actionTitle, actionMessage, classes } = props;
    /** */
    function handle(ok: boolean) {
      return () => props.acceptAction(ok);
    }
    return (
      <Dialog open={props.isOpen}>
        <DialogTitle>{actionTitle || `Confirm Action`}</DialogTitle>
        <DialogContent>{renderActionMessage({ actionMessage })}</DialogContent>
        <DialogActions>
          <Button
            onClick={handle(false)}
            className={classes.button}
            variant="raised"
          >
            Cancel
        </Button>
          <Button
            onClick={handle(true)}
            className={classes.button}
            variant="raised"
            color="primary"
          >
            OK
        </Button>
        </DialogActions>
      </Dialog>
    );
  };
export default ConfirmAction;
