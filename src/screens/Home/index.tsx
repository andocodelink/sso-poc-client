import React, { Component } from 'react';

import * as APIs from '../../apis';

import "./index.css";


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    if (!this.props.isAuthenticated) {
      return;
    }

    this.setState({ isLoading: false });
  }

  renderLander() {
    return (
      <div className="lander">
        <h1>Codelink Single Sign On</h1>
        <p>Webapp: 3001, Server: 3002</p>
      </div>
    );
  }

  renderGreeting = async () => {
    const greeting = await APIs.greet();
    return (
      <div className="lander">
        <h1>Codelink Single Sign On</h1>
        <p>{{greeting}}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.props.isAuthenticated ? this.renderLander() : this.renderGreeting()}
      </div>
    );
  }
}

export default Home;
