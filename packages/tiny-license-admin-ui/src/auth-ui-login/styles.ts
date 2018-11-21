import { StyleRulesCallback } from "@material-ui/core/styles";
/**
 *
 */
const styles: StyleRulesCallback = (theme) => {
    return {
        root: {
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: theme.spacing.unit * 10,
            height: "calc(100VH - 56px)"
        },
        actions: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
        },
        card: {
            width: 350,
        },
        media: {
            paddingLeft: "1rem",
            paddingTop: "1rem",
            // width: 300,
            height: 50,
        },
        progress: {
            zIndex: 1,
            position: "absolute",
            marginTop: "3rem",
            marginLeft: "8rem"
        }
    }
};
export default styles;