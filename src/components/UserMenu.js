import React, { Component } from "react";
import { Link } from 'react-router-dom';
import PersonIcon from "@material-ui/icons/Person";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

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

  render() {
    const { anchorEl } = this.state;
    const { user } = this.props;

    return (
      <React.Fragment>
        <Button
          aria-owns={anchorEl ? "user-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <Avatar>
            <PersonIcon />
          </Avatar>
        </Button>
        <Menu id="user-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose}>
          {user ? (<MenuItem onClick={this.handleClose}>Logout</MenuItem>) : (
            <React.Fragment>
              <Link to="/login"><MenuItem onClick={this.handleClose}>Sign In</MenuItem></Link>
              <Link to="/register"><MenuItem onClick={this.handleClose}>Register</MenuItem></Link>
            </React.Fragment>
          )}
        </Menu>
      </React.Fragment>
    );
  }
}

export default UserMenu;
