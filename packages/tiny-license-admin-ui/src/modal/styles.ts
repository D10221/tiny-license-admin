import { StyleRulesCallback } from "@material-ui/core/styles";

const styles: StyleRulesCallback = (theme) => {
    return {
        appbar: {
            position: "relative", padding: 0
        },
        toolbar: {
            padding: 0,
            margin: 0,
            justifyContent: "space-between"
        },
        toolbarButton: {
            border: "1px solid whitesmoke",
            padding: 4,
            borderRadius: 4,
            margin: 4
        },
        toolbarButtonIcon: {
            fontSize: "24px"
        },
        toolbarExpander:{
            flex: "1 0"
        },
        toolbarSpacer: {
            width: "2rem"
        },
        dialogContent: {
            marginTop: "2rem"
        },
        dialogTitleTypography: {
            padding: "1rem"
        },
    }
}

export default styles;
