import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import primary from "@material-ui/core/colors/blueGrey";
import secondary from "@material-ui/core/colors/blueGrey";
import { MyTheme } from "./types";
// 
const defaultTheme = createMuiTheme();
/**
 * 
 */
export const theme: MyTheme = {
  drawerWidth: 240,
  ...createMuiTheme({
    palette: {
      primary: {
        light: primary[300],
        main: primary[500],
        dark: primary[700],
        contrastText: defaultTheme.palette.getContrastText(primary[500]),
      } as any,
      secondary: {
        light: secondary.A200,
        main: secondary.A400,
        dark: secondary.A700,
        contrastText: defaultTheme.palette.getContrastText(secondary.A400),
      } as any,
    },
    typography: {
      fontWeightLight: 400,
      fontWeightMedium: 500,
      fontWeightRegular: 400,
    },
  }),
};
/**
 * 
 */
export default theme;
