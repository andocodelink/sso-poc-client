import React, { Component } from "react";
import LoaderButton from '../../components/LoaderButton';

import { login } from '../../libs/session'

import "./index.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false
    };
  }

  loginHandle = async event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    login()
    this.setState({ isLoading: false });
  }

  render() {
    return (
      <div className="Login">
        <LoaderButton
          block
          bsSize="large"
          type="submit"
          isLoading={this.state.isLoading}
          text="Login with Codelink"
          loadingText="Logging in…"
          onClick={this.loginHandle}
        />
      </div>
    );
  }
}

export default Login;
