import React from "react";
import "./index.css";
import * as session from '../../libs/session';

class NotFound extends React.Component {
  render() {
    return (
      <div className="NotFound">
        <h3>Hello, {session.getLocal(session.LOCAL_KEYS.ACCESS_TOKEN_KEY)}</h3>
      </div>
    )
  }
}

export default NotFound;
