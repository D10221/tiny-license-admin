import {
  Avatar,
  Icon,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from "@material-ui/core";
import * as React from "react";
import { Fragment, PureComponent } from "react";
import Edit from "./edit";
import Show from "./show";
import featureTools from "./tools";
import tools from "./tools";
export interface CreateFeaturesViewProps {
  features: string;
  onFeaturesChanged(features: string): any;
}

interface CreateFeaturesViewState {
  // features: {};
  isMenuOpen: boolean;
  editFeatureKey: string;
  editError: string | undefined;
}
export default class CreateFeaturesView extends PureComponent<
  CreateFeaturesViewProps,
  CreateFeaturesViewState
> {
  state: CreateFeaturesViewState = {
    // features: {},
    isMenuOpen: false,
    editFeatureKey: "",
    editError: ""
  };

  closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  openMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  handleMenuAction = (callback: Function) => {
    return () => {
      this.closeMenu();
      callback();
    };
  };

  addFeature = () => {
    const features = tools.toString(
      tools.newFeature(tools.toList(this.props.features))
    );
    this.props.onFeaturesChanged(features);
  };

  removeFeature(key: string) {
    return () => {
      const features = tools.toList(this.props.features).filter(x => x !== key);
      this.props.onFeaturesChanged(featureTools.toString(features));
    };
  }

  clearFeatures = () => {
    const features = {};
    // this.setState({ features });
    this.props.onFeaturesChanged(featureTools.toString(features));
  };

  startEdit = (key: string) => {
    this.setState({
      editFeatureKey: key
    });
  };

  cancelEdit = () => {
    return this.setState({
      editFeatureKey: ""
    });
  };

  rename = (key: string, value: string) => {
    this.cancelEdit();
    const list = tools.toList(this.props.features);
    const index = list.indexOf(key);
    list[index] = value;
    return this.props.onFeaturesChanged(list.join(","));
  };

  renderFeature = (key: string, index: number, array: string[]) => {
    const isEditing = this.state.editFeatureKey === key;
    return (
      <ListItem key={`feature_${index}`}>
        <ListItemAvatar
          children={
            <IconButton
              disabled={isEditing}
              aria-label="Delete"
              title="Delete"
              onClick={this.removeFeature(key)}
              children={<Icon children="delete" />}
            />
          }
        />
        <ListItemText
          primary={
            isEditing ? (
              <Edit
                value={key}
                featureKeys={array}
                onCancel={this.cancelEdit}
                applyEdit={value => this.rename(key, value)}
              />
            ) : (
              <Show value={key} />
            )
          }
          secondary={
            (!isEditing && `${index + 1} of ${array.length}`) || (
              <span
                style={{ color: "red" }}
                children={this.state.editError && this.state.editError}
              />
            )
          }
        />
        <ListItemSecondaryAction>
          <IconButton aria-label="Edit" title="Edit" disabled={isEditing}>
            <Icon children="edit" onClick={() => this.startEdit(key)} />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  };

  renderNoFeatures() {
    return (
      <ListItem key="no-features">
        <ListItemAvatar>
          <Avatar>
            <Icon children="warning" />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary={"No Features"} />
      </ListItem>
    );
  }
  menuButton: any;

  renderMenu = () => {
    const { isMenuOpen } = this.state;
    return (
      <Fragment>
        <IconButton
          buttonRef={x => (this.menuButton = x)}
          onClick={this.openMenu}
        >
          <Icon>more_vert</Icon>
        </IconButton>
        <Menu
          open={!!isMenuOpen}
          anchorEl={this.menuButton}
          onClose={this.closeMenu}
        >
          <MenuItem onClick={this.handleMenuAction(this.addFeature)}>
            <ListItemText>Add</ListItemText>
          </MenuItem>
          <MenuItem onClick={this.handleMenuAction(this.clearFeatures)}>
            <ListItemText>Clear</ListItemText>
          </MenuItem>
        </Menu>
      </Fragment>
    );
  };
  render() {
    const keys = tools.keys(this.props.features);
    return (
      <Fragment>
        <Toolbar>
          <Typography variant="title">Features</Typography>
          <div style={{ flex: "1 0" }} />
          {this.renderMenu()}
        </Toolbar>
        <List>
          {!keys || (!keys.length && this.renderNoFeatures())}
          {keys.map(this.renderFeature)}
        </List>
      </Fragment>
    );
  }
}
