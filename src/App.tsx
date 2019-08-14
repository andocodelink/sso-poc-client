import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import logo from './logo.svg';
import ScreensRoot from './screens/Root';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true
    };
  }

  async componentDidMount() {
    try {
      this.userHasAuthenticated(true);
    }
    catch (e) {
      if (e !== 'No current user') {
        alert(e);
      }
    }

    this.setState({ isAuthenticating: false });
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated });
  }

  handleLogout = async () => {
    this.userHasAuthenticated(false);
    this.props.history.push('/login');
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated
    }

    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <ScreensRoot childProps={childProps} />
      </div>
    );
  }
}

export default withRouter(App);
