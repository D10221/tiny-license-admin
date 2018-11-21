import { StyleRulesCallback } from "@material-ui/core";
/** */
const styles: StyleRulesCallback = () => {
    return {
        button: {
            height: "4rem",
            display: "flex",
            flexDirection: "row",
            // justifyContent: "flex-start",
            width: "10rem"
        },
        paper: {
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            width: "100%",
            // textAlign: "center",
            alignItems: "center",
            padding: "1rem"
        },
        progress: {
            margin: "1rem",
            width: "1rem",
            height: "1rem"
        },
        textField: {
            width: "350px"
        },
    }
}
export default styles;