import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Snackbar from "@material-ui/core/Snackbar";
import withStyles, { ClassNameMap } from "@material-ui/core/styles/withStyles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { isError } from "flux-standard-action";
import * as jwt from "jsonwebtoken";
import * as React from "react";
import { Component } from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import SnackbarContentWrapper from "../snackbar-content-with-satus/snackbar-content-with-satus";
import styles from "./styles";
/** */
const log =
  process.env.NODE_ENV !== "production" ? console.log.bind(console) : () => { };
/** */
type Indexer = { [key: string]: any };
/** */
function tryDecode(token: string): Indexer {
  try {
    let value = jwt.decode(token);
    value = value && typeof value === "object" ? value : {};
    return value;
  } catch (error) {
    return {};
  }
}
/** */
interface ValidateState {
  token: string;
  isEmpty: boolean;
  error: string | undefined;
  busy: boolean;
  success: boolean;
  decoded: Indexer;
  validator: string | undefined;
  canValidate: boolean;
}
/** */
export type ValidateProps = {
  // ...
} & RouteComponentProps<{ token: string }>;
/** */
class Validate extends Component<ValidateProps & { classes: ClassNameMap }, ValidateState> {
  /** */
  state = {
    token: "",
    isEmpty: true,
    error: undefined,
    busy: false,
    success: false,
    decoded: {},
    validator: undefined,
    canValidate: false
  };
  /** */
  static getDerivedStateFromProps(props: ValidateProps, state: ValidateState) {
    let { token, decoded, isEmpty, validator, canValidate, ...rest } = state;
    token = props.match.params.token || token;
    isEmpty = !token || !token.trim();
    decoded = tryDecode(token);
    const _state = {
      ...rest,
      token,
      isEmpty,
      decoded,
      validator: decoded.validator,
      canValidate: !!decoded.validator && !!decoded.validator.trim()
    }
    return _state;
  }
  /** */
  componentDidMount() {
    if (this.props.match.params.token) {
      const segments = this.props.location.pathname.split("/");
      const back = segments.slice(0, segments.length - 1).join("/");
      this.props.history.replace(back);
    }
  }
  /** */
  setToken = (token: string) => {
    this.setState({
      token,
      success: false
    });
  };
  /** */
  handleTokenChanged: React.ChangeEventHandler<HTMLInputElement> = e => {
    const token = e.target.value;
    this.setToken(token);
  };

  /** */
  setBusy = (busy: boolean) => {
    this.setState({ busy });
  };
  /** */
  setError = (error: string | Error) => {
    const message =
      error &&
      (typeof error === "string"
        ? error
        : error.message
          ? error.message
          : error.toString());
    this.setState({ error: message });
  };
  /** */
  clearError = () => {
    this.setState({ error: undefined });
  };
  /** */
  setSuccess = (success: boolean) => {
    this.setState({ success });
  };
  /** */
  clearSuccess = () => this.setSuccess(false);
  /** */
  reset = () => {
    this.setState({
      error: undefined,
      success: false
    });
  };
  /** */
  validate = async () => {
    const { setBusy, setError, setSuccess } = this;
    const { token, validator } = this.state;
    try {
      setBusy(true);
      this.reset();
      const res = await fetch(validator as any, {
        headers: {
          License: `Lic ${token}`
        }
      });
      let text = undefined;
      try {
        text = await res.text();
        text = text && text.trim() ? text : res.statusText;
      } catch (error) {
        log(error);
        text = `${res.status}: ${res.statusText}`;
      }
      if (!res.ok) {
        return setError(text);
      }
      setSuccess(res.ok);
    } catch (error) {
      setError(error);
    } finally {
      setBusy(false);
    }
  };
  // **
  preview(decoded: Indexer) {
    let text = JSON.stringify(decoded, null, 2).replace(/(\{|\}|"|,)/gi, "");
    const isEmpty = !text || !text.trim();
    text = (!isEmpty && text) || "...";
    const expDate = new Date(decoded.exp);
    return (
      <div style={{ margin: "1rem" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Typography variant="headline" style={{ textTransform: "uppercase" }}>
            Decoded
          </Typography>
          <Typography color={(!isError && "primary") || "error"}>
            {isEmpty ? "(Empty)" : ""}
          </Typography>
        </div>
        <pre
          style={{
            textAlign: "left",
            overflow: "auto",
            borderLeft: "1px solid whitesmoke",
            width: "350px",
            height: "200px",
            paddingLeft: "1rem"
          }}
        >
          {text}
        </pre>
        <div style={{ display: "flex", flexDirection: "column", marginTop: "1rem" }}>
          <Typography variant="subheading" style={{}}>Exp. Date</Typography>
          <Typography>{expDate.toString()}</Typography>
        </div>
      </div>
    );
  }
  /** */
  render() {
    const {
      token,
      isEmpty,
      error,
      busy,
      success,
      decoded,
      canValidate,
    } = this.state;
    const helperText = `Place token here ${isEmpty ? "(Required)" : "..."}`;
    const { classes } = this.props;
    return (
      <Paper className={classes.paper}>
        <Typography
          style={{ textTransform: "uppercase", marginBottom: "1.5rem" }}
          variant="title"
        >
          Validate
        </Typography>
        <TextField
          className={classes.textField}
          label="Token"
          helperText={helperText}
          value={token}
          onChange={this.handleTokenChanged}
          error={isEmpty}
          multiline={true}
          rows={5}
        />
        <div style={{ margin: "1rem" }}>{this.preview(decoded)}</div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            margin: "1rem",
            alignItems: "center",
            width: "100%"
          }}
        >
          <Button
            className={classes.button}
            color="primary"
            variant="raised"
            onClick={this.validate}
            disabled={isEmpty || busy || !canValidate}
          >
            <span>Validate</span>
            {busy && <CircularProgress className={classes.progress} />}
          </Button>
        </div>
        <Snackbar
          open={!!success}
          autoHideDuration={6000}
          onClose={this.clearSuccess}
        >
          <SnackbarContentWrapper
            onClose={this.clearSuccess}
            variant="success"
            message="Success!"
          />
        </Snackbar>
        <Snackbar
          open={!!error}
          autoHideDuration={6000}
          onClose={this.clearError}
        >
          <SnackbarContentWrapper
            onClose={this.clearError}
            variant="error"
            message={error}
          />
        </Snackbar>
      </Paper>
    );
  }
}
export default withStyles(styles)(withRouter(Validate));
