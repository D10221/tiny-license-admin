import { Typography } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import { withStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import { History } from "history";
import * as React from "react";
import { Component, ComponentType, Fragment } from "react";
import { connect } from "react-redux";
import { Connected as Messages } from "../messages";
import adapter from "./adapter";
import styles from "./styles";
/**
 *
 */
interface AppState {
  rootUrl: string;
  title: string;
}
/** */
export type AppProps = {
  toolbarMenu: React.ReactNode;
  history: History;
};
/** */
class App extends Component<AppProps & AppState & { classes: ClassNameMap }> {
  /** */
  render() {
    const { classes, toolbarMenu, title } = this.props;
    return (<Fragment>
      <Messages />
      <div className={classes.app}>
        <AppBar>
          <Toolbar>
            <Button href={(process.env.PUBLIC_URL || "") + "/"}>
              <Typography
                variant="title"
                className={classes.appTitle}
                color="inherit"
              >
                {title}
              </Typography>
            </Button>
            <div style={{ flex: "1 0" }} />
            {toolbarMenu}
          </Toolbar>
        </AppBar>
        <div className={classes.content}>{this.props.children}</div>
      </div>
    </Fragment>

    );
  }
}
/**
 *
 * @param state
 */
const selector = (state: {}) => {
  const s = adapter.selector(state);
  return {
    ...s
  };
};
/** */
export default connect(selector)(withStyles(styles)(App)) as ComponentType<
  AppProps
  >;
