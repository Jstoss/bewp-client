import React, { Component } from "react";
import { Link } from "react-router-dom";
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

class UserMenu extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogout = () => {
    this.props.logout();
    this.setState({ anchorEl: null });
  }

  render() {
    const { anchorEl } = this.state;
    const { loggedIn } = this.props;
    const color = loggedIn ? 'default' : 'disabled';

    return (
      <React.Fragment>
        <Button
          aria-owns={anchorEl ? "user-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Avatar>
            <PersonIcon color={color} />
          </Avatar>
        </Button>
        {loggedIn && (
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
          </Menu>
        )}
        {loggedIn || (
          <Menu
            id="user-menu"
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={this.handleClose}
          >
            <Link to="/login">
              <MenuItem onClick={this.handleClose}>Sign In</MenuItem>
            </Link>
            <Link to="/register">
              <MenuItem onClick={this.handleClose}>Register</MenuItem>
            </Link>
          </Menu>
        )}
      </React.Fragment>
    );
  }
}

export default UserMenu;
