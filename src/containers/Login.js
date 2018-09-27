import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { login } from '../redux/actions';

import AuthForm from "../components/AuthForm";

class Login extends Component {
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
    this.setState({ loading: true });
    this.props.login(this.state, this.handleComplete, this.props.history);
  };

  handleComplete = response => {
    const loading = false;
    if(response){
      this.setState({ loading, response });
    }else{
      this.setState({ loading, response: 'Something went wrong...' });
    }
  }

  render() {
    return (
      <AuthForm
        {...this.state}
        change={this.handleChange}
        submit={this.handleSubmit}
        message="Sign In"
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
    mapStateToProps,
    { login }
  )(Login)
);
