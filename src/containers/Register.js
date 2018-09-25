import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import AuthForm from "../components/AuthForm";

class Register extends Component {
  state = {
    username: "",
    password: ""
  };

  componentDidMount() {
    if (this.props.isLoggedIn) {
      this.props.history.push("/");
    }
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <AuthForm
        {...this.state}
        change={this.handleChange}
        submit={this.handleSubmit}
        message="Sign Up"
        direction="left"
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.user.isLoggedIn
  };
};

export default withRouter(
  connect(
    mapStateToProps
  )(Register)
);
