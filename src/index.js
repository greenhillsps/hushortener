import React from "react";
import ReactDOM from "react-dom";
import {  BrowserRouter, Route, Switch } from "react-router-dom";

import indexRoutes from "./routes/index.jsx";

import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/light-bootstrap-dashboard.css?v=1.1.1";
import "./assets/css/style.css";
import "./assets/css/pe-icon-7-stroke.css";
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { createStore, applyMiddleware,compose} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import SecretRoute from './components/SecretRoute';

import globalStore from './store/reducer/globalStore';
const store = createStore(globalStore,(
    applyMiddleware(thunk)
  ));

const App=( 
      <Provider store={store} >
<BrowserRouter >
    <Switch>
      {indexRoutes.map((prop, key) => {
        if (prop.isPrivate) {
          return   prop.exact?<SecretRoute exact path={prop.path} component={prop.component} key={key} />:<SecretRoute  path={prop.path} component={prop.component} key={key} />
        }
        return <Route path={prop.path} component={prop.component} key={key} />;
      })}
    </Switch>
  </BrowserRouter>
    </Provider>
)

ReactDOM.render(App,document.getElementById("root"));
