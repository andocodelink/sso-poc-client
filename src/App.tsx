import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ScreensRoot from './screens/Root';
import * as session from './libs/session'

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuthenticating: true,
      isAuthenticated: false
    };
  }

  async componentDidMount() {
    session.getCurrentSession();
    this.setState({ isAuthenticating: false, isAuthenticated: session.isAuthenticated() });
  }

  authenticationUpdateHandle = () => {
    this.setState({
      isAuthenticated: session.isAuthenticated()
    }) 
  }

  componentWillMount() {
    session.setAuthenticationUpdateListener(this.authenticationUpdateHandle);
  }

  render() {
    return (
      !this.state.isAuthenticating &&
      <div className="App container">
        <ScreensRoot childProps={{ isAuthenticated: this.state.isAuthenticated }} />
      </div>
    );
  }
}

export default withRouter(App);
