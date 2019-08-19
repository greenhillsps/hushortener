
import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isAllowedRoute } from './auth';

const Auth = (prop) => {
  if (isAllowedRoute(prop.routeName,prop.parent)) {
    return (<Route
      path={prop.path}
      key={prop.key}
      render={routeProps => (
        <prop.component
          {...routeProps}
          handleClick={prop.handleClick}
          deliveryPersons={prop.deliveryPersons} />
      )}
    />
    )
  }
  else {
    return (
      <Redirect to='/notAuthorize' />
    )
  }
}
export default Auth;