import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";


// this is used to create scrollbars on windows devices like the ones from apple devices
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// react component that creates notifications (like some alerts with messages)
import NotificationSystem from "react-notification-system";
import ShortnerModal from '../../components/Modals/ShortUrlModal'
import Sidebar from "components/Sidebar/Sidebar.jsx";
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import { connect } from 'react-redux';
// dinamically create dashboard routes
import dashboardRoutes from "routes/dashboard.jsx";
import Testcom from './test';
// style for notifications
import { style } from "variables/Variables.jsx";
import axios from 'axios';
import Authorization from '../../routes/routesAuth';

var ps;

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.state = {
      _notificationSystem: null,
       test:false,

    };
  
  }



  componentDidMount() {
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  componentDidUpdate(e) {
    if (navigator.platform.indexOf("Win") > -1) {
      setTimeout(() => {
        ps.update();
      }, 350);
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
    if (
      window.innerWidth < 993 &&
      e.history.action === "PUSH" &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
  }
  componentWillMount() {
    if (document.documentElement.className.indexOf("nav-open") !== -1) {
      document.documentElement.classList.toggle("nav-open");
    }
  }
  // function that shows/hides notifications - it was put here, because the wrapper div has to be outside the main-panel class div
handleNotificationClick(type, message) {
    let position = "tc";
    //var level;

    let level;
    let icon;
    switch (type) {
      case 'success':
        level = 'success';
        icon = 'fa fa-check';
        break;
      case 'warning':
        level = 'warning';
        icon = 'fa fa-exclamation-triangle';
        break;
      case 'error':
        level = 'error';
        icon = 'fa fa-times';
        break;
      case 'info':
        level = 'info';
        icon = 'fa fa-info';
        break;
      default:
        level = 'success';
        icon = 'fa fa-check';
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className={icon}/>,
      message: (
        <div>
          {message}
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 3
    });
  }
 
  render() {
  this.props.catchError?
  this.props.onClearCatchError()
  :null
  
    return (
      <div className="wrapper">
        {this.props.getDetailsLoading&&
        <div className="loader_rapper" ><div className="loader"></div></div>
        }
        <NotificationSystem ref="notificationSystem" style={style} />
        {
          this.props.catchError?
          this.handleNotificationClick(this.props.catchErrorType,this.props.catchError)
          :null
        }
        <Sidebar {...this.props} restaurantDetails={this.state.restaurantDetails} />
        <div
          className={
            "main-panel" +
            (this.props.location.pathname === "/maps/full-screen-maps"
              ? " main-panel-maps"
              : "")
          }
          ref="mainPanel"
        >
          <Header {...this.props} />
          <Switch>
            {dashboardRoutes.map((prop, key) => {
              
              if (prop.collapse) {
                return prop.views.map((propC, key) => {
                  if (propC.name === "Notifications") {
                    return (
                      <Route
                        path={propC.path}
                        key={key}
                        render={routeProps => (
                          <prop.component
                            {...routeProps}
                            handleClick={this.handleNotificationClick}
                
                          />
                        )}
                      />
                    );
                  } else {
                    return (
                     <Authorization
                        parent={prop.name}
                        path={propC.path}
                        key={key}
                        component={propC.component}
                        routeName={propC.name}
                        handleClick={this.handleNotificationClick}
                        deliveryPersons={this.state.deliveryPersons}
                      />
                    );
                  }
                });
              } else {
                if (prop.redirect)
                  return (
                    <Redirect from={prop.path} to={prop.pathTo} key={key} />
                  );
                else {

                  return (
                    <Authorization
                        path={prop.path}
                        key={key}
                        component={prop.component}
                        routeName={prop.name}
                        handleClick={this.handleNotificationClick}
                        deliveryPersons={this.state.deliveryPersons}
                      />
                    );
                  
                }
              }
            })}
          </Switch>
          <Footer fluid />
{
  this.state.test?
  <Testcom URLdetails={this.state.test} />
  :null
}
        </div>
        {
          this.props.showModal&&
          <ShortnerModal
          show={this.props.showModal}
          hide={()=>this.props.onHideModal()}
          />
        }
      </div>
    );
  }
}

const mapSateToProp=state=>{
  return{
catchError:state.notificationMessage,
catchErrorType:state.notificationType,
showModal:state.showModal,
getDetailsLoading:state.getDetailsLoading
  }
}

const mapDispatchToProp=dispatch=>{
  return{
 onClearCatchError:()=>dispatch({type:'CLEAR_NOTIFICATION'}),
 onHideModal:()=>dispatch({type:'HIDE_MODAL',payload:false})
  }
}
export default connect(mapSateToProp,mapDispatchToProp)(Dashboard);
