import { Dialog, DialogContent, DialogTitle, Icon, IconButton, List, ListItemText, MenuItem, TextField, Toolbar, Typography } from "@material-ui/core";
import * as React from "react";
import { ChangeEventHandler, Component } from "react";
import { ApiActions, ApiItem, ApiState } from "./api";
/**
 * params
 */
export interface LookupFieldParams {
    id: string;
    validation: string | undefined;
    disabled: boolean;
    /**
     * @param item @type {ApiItem} 
     */
    onSelectionChanged(item: ApiItem | undefined): any;
    value: string
    label: string;
    helperText?: string;
    className?: string;
}
/** */
export interface ApiContext {
    apiState: ApiState;
}
/** */
export interface LookupFieldActions {
    api: ApiActions
}
/** */
export type LookupFieldsProps = LookupFieldParams & ApiContext & LookupFieldActions;
/**
 * private
 */
interface LookupFieldState {
    isDialogOpen: boolean;
    displayName: string;
    filterText: string;
    filtering: boolean
}
/**
 * 
 */
export default class LookupField extends Component<LookupFieldsProps, LookupFieldState> {
    state = {
        displayName: "",
        isDialogOpen: false,
        filterText: "",
        filtering: false
    }

    static getDerivedStateFromProps(props: LookupFieldsProps, state: LookupFieldState) {
        const found = props.apiState.data && (props.apiState.data as { id?: any, displayName: any }[]).find(x => x.id === props.value);
        const filtering = state.filterText && state.filterText.trim() !== "";
        return {
            ...state,
            displayName: (found && found.displayName) || "",
            filtering
        }
    }
    componentDidMount() {
        this.props.api.fetch({
            method: "GET"
        })
    }
    onChange = (id: string) => {
        const data: ApiItem[] = this.props.apiState.data || [];
        this.props.onSelectionChanged(data.find(x => x.id === id));
    }
    /** */
    handleInputChanged = (f: (value: string) => any): ChangeEventHandler<HTMLInputElement> => {
        return (e) => {
            f(e.target.value);
        }
    }
    handle = (f: Function) => () => {
        this.closeDialog();
        f();
    }
    openDialog = () => {
        this.setState({
            isDialogOpen: true
        })
    }
    closeDialog = () => {
        this.setState({
            isDialogOpen: false
        })
    }
    filter = (regex: RegExp, exclude?: string[]) => {
        function values(x: {}) {
            return Object.keys(x).filter(key => !exclude || exclude.indexOf(key) === -1).map(key => `${x[key]}`).join(" ");
        }
        return (item: {}) => regex.test(values(item));
    }
    onFilterTextChanged: ChangeEventHandler<HTMLInputElement> = e => {
        this.setState({ filterText: e.target.value })
    }
    onFilterTextClear = () => {
        this.setState({ filterText: "" })
    };

    FilterTextField: React.StatelessComponent<{
        filterText: string,
        filtering: boolean,
        onChange: ChangeEventHandler<HTMLInputElement>,
        onClear?(): any;
    }> = ({ filterText, filtering, onChange, onClear }) => {
        return <TextField
            value={filterText}
            onChange={onChange}
            style={{ marginLeft: "1rem ", backgroundColor: "lightyellow" }}
            InputProps={{
                endAdornment: <>{filtering && <IconButton title="clear" onClick={onClear}>
                    <Icon color="error">clear</Icon>
                </IconButton>}
                    {!filtering && <IconButton>
                        <Icon color="action">search</Icon>
                    </IconButton>}</>
            }} />
    }
    /** */
    render() {
        const { id, label, className, validation, apiState, helperText, value } = this.props;
        const { displayName, isDialogOpen, filterText, filtering } = this.state;
        const { data } = apiState;
        const items = (data || []).filter(this.filter(new RegExp(filterText), ["id"]));
        const error = validation || apiState.error;
        const disabled = this.props.disabled || apiState.busy
        const defaultHelperText = "Use the drop down to select";
        const emptyListText = (filtering && !items.length && "Nothing found matching filter") || undefined;

        return <>
            <TextField
                id={id}
                className={className}
                label={label}
                helperText={(apiState.busy && "...Busy") || validation || error || helperText || defaultHelperText}
                error={!!error}
                disabled={disabled}
                value={displayName}
                InputProps={{
                    endAdornment: <IconButton onClick={this.openDialog}><Icon style={{}}>keyboard_arrow_down</Icon></IconButton>
                }}
            />
            <Dialog open={isDialogOpen} onClose={this.closeDialog}>
                <DialogTitle style={{ marginTop: 0, paddingTop: 0 }}>
                    <Toolbar style={{ margin: 0, padding: 0 }}>
                        <Typography variant="subheading" style={{ textTransform: "uppercase" }}>Select</Typography>
                        <div style={{ flex: "1 0" }} />
                        <IconButton onClick={this.closeDialog}>
                            <Icon>close</Icon>
                        </IconButton>
                    </Toolbar>
                </DialogTitle>
                <DialogContent style={{ display: "flex", flexDirection: "column", }}>
                    <this.FilterTextField
                        onChange={this.onFilterTextChanged}
                        filterText={filterText}
                        filtering={filtering}
                        onClear={this.onFilterTextClear}
                    />
                    <div style={{ flex: "1 0" }} />
                    <List >
                        {items.map((item: ApiItem, index: number) => {
                            const { displayName, id } = item;
                            return (
                                <MenuItem
                                    onClick={this.handle(() => {
                                        if (id !== value) {
                                            this.props.onSelectionChanged(item);
                                        }
                                    })}
                                    key={`lookup_item_${index}`}
                                    value={id}>
                                    <ListItemText primary={displayName} secondary={id} />
                                </MenuItem>)
                        })}
                    </List>
                    {emptyListText && <Typography color="error" style={{ textAlign: "center" }}>{emptyListText}</Typography>}
                </DialogContent>
            </Dialog>
        </>
    }
}
