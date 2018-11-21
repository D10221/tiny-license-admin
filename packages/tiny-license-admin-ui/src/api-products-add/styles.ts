import { StyleRulesCallback } from "@material-ui/core";

/**
 *
 */
const styles: StyleRulesCallback = theme => ({
  actions: {
    margin: theme.spacing.unit
  },
  button: {
    margin: theme.spacing.unit,
    width: "120px"
  },
  checkbox: { width: 200, height: 40 },
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
  textField: {
    margin: theme.spacing.unit
  },
  textFieldLarge: {
    margin: theme.spacing.unit,
    minWidth: "24rem"
  },
  textFieldMultiline: {
    margin: theme.spacing.unit,
    width: 420
  }
});
export default styles;
