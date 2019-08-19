
import {auth} from '../../utils/Auth';
import React from 'react';
import {Route,Redirect} from 'react-router-dom';

const SecretRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      auth.loggedIn() === true
        ? <Component {...props} />
        : <Redirect to='/page/login' />
    )} />
  );

  export default SecretRoute;