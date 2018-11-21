import { StyleRulesCallback } from "@material-ui/core";

/**
 *
 */
const styles: StyleRulesCallback = theme => {
  const textField = {
    margin: theme.spacing.unit
  };
  return {
    actions: {
      margin: theme.spacing.unit
    },
    button: {
      margin: theme.spacing.unit,
      width: "120px"
    },
    form: {
      display: "flex",
      flexWrap: "wrap",
      padding: theme.spacing.unit,
      minHeight: "300px"
    },
    paper: {
      flex: "1 0",
      width: "100%",
      alignItems: "center",
      margin: theme.spacing.unit,
      marginTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit,
      backgroundColor: theme.palette.background.default
    },
    textField,
    textFieldCheckbox: {
      ...textField,
      width: 200,
      height: 40
    },
    textFieldDate: {
      ...textField
    },
    textFieldLarge: {
      ...textField,
      minWidth: "24rem"
    },
    textFieldMultiline: {
      ...textField,
      width: 420
    }
  };
};
export default styles;
