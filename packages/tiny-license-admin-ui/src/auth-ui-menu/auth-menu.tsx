import { Component } from "react";
import { IconButton, Icon, Menu, MenuItem, ListItemText } from "@material-ui/core";
import * as React from "react";

export interface AuthMenuProps {
    auth: {
        logout(): any
    };
    authState: {

    };
    onRequestChangePassword(): any;    
}
/**
 * 
 */
export default class AuthMenu extends Component<AuthMenuProps> {
    /** */
    state = {
        isOpen: false,
        authenticated: false,
        busy: false,
    }
    /** */
    static getDerivedStateFromProps(props: AuthMenuProps, state: {}) {
        return Object.assign(state, props.authState);
    }
    /** */
    close = () => {
        this.setState({ isOpen: false });
    };
    /** */
    onLogoutClick = () => {
        this.close();
        this.props.auth.logout();
    }
    /** */
    onChangePasswordClick = () => {
        this.close();
        this.props.onRequestChangePassword();
    }
    /** */
    onMenuIconClick = () => {
        this.setState({ isOpen: true });
    }
    /** */
    onMenuClose = () => {
        this.close();
    }
    /**
     * 
     */
    anchorEl: HTMLElement;
    render() {
        const { isOpen, authenticated, busy } = this.state;
        if (busy) { return null; }
        if (!authenticated) return null;
        return (<React.Fragment>
            <IconButton color="inherit" onClick={this.onMenuIconClick} buttonRef={x => this.anchorEl = x}>
                <Icon children="person" />
            </IconButton>
            <Menu open={isOpen} onClose={this.onMenuClose} anchorEl={this.anchorEl}>
                <MenuItem onClick={this.onChangePasswordClick} >
                    <ListItemText >Change Password</ListItemText>
                </MenuItem>
                <MenuItem onClick={this.onLogoutClick} >
                    <ListItemText >Logout</ListItemText>
                </MenuItem>
            </Menu>
        </React.Fragment>)
    }
}