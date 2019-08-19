import React, { Component } from "react";
import {
  Navbar,
  Nav,
  NavItem,
  NavDropdown,
  MenuItem,
  FormGroup,
  FormControl,
  InputGroup
} from "react-bootstrap";
import {
  withRouter //what is withRouter? go to https://tylermcginnis.com/react-router-programmatically-navigate/
} from 'react-router-dom'
import { auth } from '../../utils/Auth';

class HeaderLinks extends Component {
  render() {
    return (
      <div>

        <Nav pullRight>

          <NavItem eventKey={3} onClick={() => { auth.logout(this.props.history) }}>

            <div className="text-danger">
              <i className="fa fa-sign-out" /> Log out
              </div>
          </NavItem>

        </Nav>
      </div>
    );
  }
}
export default withRouter(HeaderLinks);
