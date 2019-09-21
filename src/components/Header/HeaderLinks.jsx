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

          <NavItem eventKey={3} onClick={() => { 
            auth.logout(this.props.history)
            this.props.onClearReduxData()
            }}>

            <div className="header_links_style">
              <i className="fa fa-sign-out" /> Log out
              </div>
          </NavItem>

        </Nav>

        <Nav pullRight>
          <NavItem eventKey={4} href="#">
           
            <div className="header_links_style"
              onClick={() => {
            this.props.onShowModal();
              }}
            >
              <i className={'fa fa-chain'} />
              Create New
            </div>
          </NavItem>
             
              </Nav>

              <Nav pullRight>
          <NavItem eventKey={4} href="#">
           
            <div className="header_links_style"
              onClick={() => {
            this.setState({showLinkModal:true})
              }}
            >
              <i className={'pe-7s-keypad'} />
              Your Links
            </div>
          </NavItem>
             
              </Nav>
              {
                this.state.showLinkModal||!this.props.urlDetails.URL?
                <AllLinks
                show={this.state.showLinkModal||!this.props.urlDetails.URL}
                hide={()=>this.setState({showLinkModal:false})}
                history={this.props.history}
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
    onShowModal:()=>dispatch({type:"SHOW_MODAL",payload:true}),
    onClearReduxData:()=>dispatch({type:"CLEAR_REDUX_DATA",})
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HeaderLinks))
