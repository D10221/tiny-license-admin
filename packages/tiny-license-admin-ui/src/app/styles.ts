import { StyleRulesCallback } from "@material-ui/core/styles";
/** */
const styles: StyleRulesCallback = theme => {
  const bigScreenMargin = "5%";
  return {
    app: {
      width: "100VW",
      display: "flex"
    },
    appTitle: {
      color: theme.palette.primary.contrastText,
      cursor: "pointer"
    },
    content: {
      marginTop: "75px",
      width: "100%",
      display: "flex",
      flex: "1 0",
      flexDirection: "column",
      alignItems: "center",
      [theme.breakpoints.up("sm")]: {
        marginLeft: bigScreenMargin,
        marginRight: bigScreenMargin
      }
    }
  };
};
/** */
export default styles;
