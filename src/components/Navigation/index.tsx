import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import { logout, ssoCallback } from '../../libs/session'

const isSSOCallback = () => {
  let url = window.location.href
  return !!url.includes('/ssoCallback')
}

const getSSOToken = () => {
  let url = window.location.href
  const name = 'ssoToken'

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

class Navigation extends React.Component {
  handleLogout = async () => {
    logout()
  }

  async componentDidMount() {
    if (isSSOCallback()) {
      const ssoToken =  getSSOToken();
      const ssoUserToken = await ssoCallback(ssoToken);
    }
  }

  render() {
    return (
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">CodeSSO</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {this.props.isAuthenticated
              ? <NavItem onClick={this.handleLogout}>Logout</NavItem>
              : <Fragment>
                  <LinkContainer to="/login">
                    <NavItem>Login</NavItem>
                  </LinkContainer>
                </Fragment>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation;
