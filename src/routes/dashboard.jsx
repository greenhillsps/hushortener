

import Dashboard from '../views/Dashboard/Dashboard';
import LinkRedirectOption from '../views/Dashboard/LinkRedirectOption';
import TurnLinkOnOf from '../views/Dashboard/TurnLinkOnOf';
import BlockListProtection from '../views/Dashboard/BlockListProtection';
import CustomShortLink from '../views/Dashboard/CustomShortLink';
import Settings from '../views/Dashboard/Settings'

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
    component: TurnLinkOnOf
  },

  {
    path: "/BlacklistProtection",
    name: "Block list protection",
    icon: "fa fa-lock",
    component: BlockListProtection
  },

  {
    path: "/CustomShortLink",
    name: "Custom short link",
    icon: "fa fa-linux",
    component: CustomShortLink
  },
  {
    path: "/settings",
    name: "Settings",
    icon: "fa fa-cogs",
    component: Settings
  },
  

  
  
    { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashboardRoutes;
