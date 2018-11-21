import { Component } from "react";
import { tools as featureTools } from "../api-product-features";
import * as React from "react";
import { Toolbar, Typography, Menu, IconButton, Icon, MenuItem, ListItemText, List, ListItem, TextField, ListItemSecondaryAction } from "@material-ui/core";

export interface ViewParams {
    features: string;
    featureValues: {};
    onFeatureChanged(key: string, value: string): any;
    setFeatureValue(featureValues: {}): any;
}

interface ViewState {
    isMenuOpen: boolean;
}

export interface ViewActions {

}

export type ViewProps = ViewParams & ViewActions;

export default class View extends Component<ViewProps, ViewState> {
    state = {
        isMenuOpen: false,
        featureValues: {},
    }
    openMenu = () => {
        this.setState({ isMenuOpen: true });
    }
    closeMenu = () => {
        this.setState({ isMenuOpen: false });
    }
    clearValues = () => {
        const featureKeys = featureTools.toList(this.props.features);
        const o = featureKeys.reduce((out, next) => {
            out[next] = "";
            return out;
        }, {});
        this.props.setFeatureValue(o);
    }
    handleMenuAction = (f: Function) => {
        return () => {
            this.closeMenu();
            f();
        }
    }
    /** */
    onFeatureValueChange: (key: string) => React.ChangeEventHandler<HTMLInputElement> = (key) => {
        return e => {
            this.props.onFeatureChanged(key, e.target.value);
        }
    }
    /** */
    clearFeature = (key: string): React.ChangeEventHandler<any> => (e) => {
        this.props.onFeatureChanged(key, "");
    }
    /** Menu's Anchor Element */
    menuButton: any;
    /**
     * 
     */
    render() {
        const { isMenuOpen, } = this.state;
        const { featureValues } = this.props;
        const featureKeys = featureTools.toList(this.props.features);
        return (<>
            <Toolbar>
                <Typography variant="title">Features</Typography>
                <div style={{ flex: "1 0" }} />
                <IconButton buttonRef={x => this.menuButton = x} onClick={this.openMenu}><Icon>more_vert</Icon></IconButton>
                <Menu open={isMenuOpen}
                    onClose={this.closeMenu}
                    anchorEl={this.menuButton}>
                    <MenuItem onClick={this.handleMenuAction(this.clearValues)}>
                        <ListItemText primary="Clear Values" secondary="again ..." />
                    </MenuItem>
                </Menu>
            </Toolbar>
            <List style={{ margin: "1rem" }}>
                {featureKeys.map(key => (
                    <ListItem key={`feature_${key}`}>
                        <ListItemText primary={key} />
                        <TextField
                            fullWidth
                            style={{ marginLeft: "1rem", marginRight: "1rem" }}
                            value={featureValues[key]}
                            onChange={this.onFeatureValueChange(key)} />
                        <ListItemSecondaryAction>
                            <IconButton
                                aria-label="clear-feature"
                                title="Clear"
                                onClick={this.clearFeature(key)}
                            >
                                <Icon children="clear" />
                            </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
        </>);
    }
}