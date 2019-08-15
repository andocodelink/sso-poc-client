import React, { Component } from 'react';

import * as apis from '../../apis'

import "./index.css";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      greeting: ''
    };
  }

  async componentDidMount() {
    const greeting = await apis.greet()
    this.setState({
      greeting
    })
  }

  renderGreeting = () => {
    return (
      <div className="lander">
        <h1>Codelink Single Sign On</h1>
        <p>{this.state.greeting}</p>
      </div>
    );
  }

  render() {
    return (
      <div className="Home">
        {this.renderGreeting()}
      </div>
    );
  }
}

export default Home;
