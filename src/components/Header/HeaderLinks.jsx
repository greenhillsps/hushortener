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
import AllLinks from '../../components/Modals/AllUrls'
class HeaderLinks extends Component {
  state={
    showLinkModal:true
  }
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

              <Nav pullRight>
          <NavItem eventKey={4} href="#">
           
            <div
              onClick={() => {
            this.setState({showLinkModal:true})
              }}
            >
              <i className={'pe-7s-keypad'} />
              <p>{'Your Links'}</p>
            </div>
          </NavItem>
             
              </Nav>
              {
                this.state.showLinkModal||!this.props.urlDetails.URL?
                <AllLinks
                show={this.state.showLinkModal||!this.props.urlDetails.URL}
                hide={()=>this.setState({showLinkModal:false})}
                />
              :null}
      </div>
    );
  }
}
const mapStateToProps=state=>{
  return{
    urlDetails:state.urlDetails
  }
}
const mapDispatchToProps=dispatch=>{
  return{
    onShowModal:()=>dispatch({type:"SHOW_MODAL",payload:true})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HeaderLinks))
