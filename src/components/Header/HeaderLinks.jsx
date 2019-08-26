import React, { Component } from "react";
import { connect } from 'react-redux'
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

        <Nav pullRight>
          <NavItem eventKey={4} href="#">
           
            <div
              onClick={() => {
            this.props.onShowModal();
              }}
            >
              <i className={'fa fa-chain'} />
              <p>{'Create New'}</p>
            </div>
          </NavItem>
             
              </Nav>
      </div>
    );
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onShowModal:()=>dispatch({type:"SHOW_MODAL",payload:true})
  }
}
export default connect(null,mapDispatchToProps)(withRouter(HeaderLinks))
