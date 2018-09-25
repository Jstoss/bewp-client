import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { register } from "../redux/actions";

import AuthForm from "../components/AuthForm";

class Register extends Component {
  state = {
    email: "",
    username: "",
    password: "",
    loading: false,
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
    this.setState({ loading: true });
    this.props.register(this.state, this.props.history);
  };

  render() {
    return (
      <AuthForm
        {...this.state}
        change={this.handleChange}
        submit={this.handleSubmit}
        message="Sign Up"
        direction="left"
        register
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
    mapStateToProps,
    { register }
  )(Register)
);
