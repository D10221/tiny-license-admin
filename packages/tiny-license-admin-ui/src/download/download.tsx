import * as React from "react";
import { Component, ReactNode } from "react";
import { Modal } from "../modal";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
/** public */
export interface DownloadParams {
    url: string;
    fileName: string;
    title: ReactNode;
    linkText: string;
    onClose(): any;
}
/** connected */
export interface DownloadProps extends DownloadParams {
    token: string;
}
/** inrernal */
interface DownloadState {
    busy: boolean;
    error: string | undefined;
    url: string | undefined;

}
/** */
export default class Download extends Component<DownloadProps, DownloadState> {
    state = {
        busy: false,
        error: undefined,
        url: undefined
    }
    /** */
    setError = (error: Error | string) => {
        const message = !!error ? typeof error === "string" ? error : error.message ? error.message : error.toString() : error;
        this.setState({
            error: message
        })
    }
    /** */
    clearError() {
        this.setState({ error: undefined });
    }
    /** */
    setBusy = (busy: boolean) => {
        this.setState({ busy });
    }
    /** */
    async fetch() {
        const { token } = this.props;
        try {
            this.clearError();
            this.setBusy(true);
            // await new Promise(resolve => setTimeout(resolve, 1000));
            const r = await fetch(this.props.url, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!r.ok) {
                return this.setError("Can't download: " + r.statusText);
            }
            const blob = await r.blob(); // application/octet-stream                        
            const url = URL.createObjectURL(blob);
            this.setState({ url });
        } catch (error) {
            this.setError(error);
        } finally {
            this.setBusy(false);
        }
    }
    /** */
    componentDidMount() {
        this.fetch();
    }
    /** */
    renderBody() {
        const { fileName, linkText } = this.props;
        const { busy, url, error } = this.state;
        return <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            {busy && <Typography>
                Please wait...
            </Typography>}
            {error && <Typography variant="headline" color="error">{error}</Typography>}
            {url && <Button
                variant="outlined"
                color="primary"
                download={fileName}
                href={url} >{linkText}</Button>}
        </div>
    }
    /** */
    renderTitle = () => {
        const { title } = this.props;
        const { busy, error, url } = this.state;
        if (busy) {
            return `${title} (downloading)`;
        }
        if (error) {
            return `${title} (error)`;
        }
        if (url) {
            return `${title} (ready)`
        }
        return title;
    }
    /** */
    onAgain = () => {
        this.fetch();
    }
    /** */
    render() {
        const { onClose } = this.props;
        const { error } = this.state;
        const { onAgain } = this;
        const button = {
            marginLeft: "0.5rem",
            marginRight: "0.5rem",
            marginBottom: "0.5rem"
        };
        return <Modal
            onClose={onClose}
            dialogTitle={this.renderTitle()}
            dialogContent={this.renderBody()}
            isOpen={true}
            dialogActions={<>
                {!!error && <Button style={{ ...button, color: "orange" }} variant="raised" onClick={onAgain}>Retry</Button>}
                <Button style={button} variant="raised" onClick={onClose}>OK</Button>
            </>} />
    }
}
