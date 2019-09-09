

import Dashboard from '../views/Dashboard/Dashboard';
import LinkRedirectOption from '../views/Dashboard/LinkRedirectOption';

var dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-keypad",
    component: Dashboard
  },
  
  {
    path: "/LinkRedirectOption",
    name: "Link redirect option",
    icon: "fa fa-map-signs",
    component: LinkRedirectOption
  },

  {
    path: "/TurnLinksOnOrOff",
    name: "Turn links on/off",
    icon: "fa fa-toggle-on",
    component: Dashboard
  },

  {
    path: "/BlacklistProtection",
    name: "Blacklist protection",
    icon: "fa fa-lock",
    component: Dashboard
  },

  {
    path: "/CustomShortLink",
    name: "Custom short link",
    icon: "fa fa-linux",
    component: Dashboard
  },

  
  
    { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashboardRoutes;
