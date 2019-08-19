

import Dashboard from '../views/Dashboard/Dashboard';


var dashboardRoutes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "pe-7s-keypad",
    component: Dashboard
  },

  
  
    { redirect: true, path: "/", pathTo: "/dashboard", name: "Dashboard" }
];
export default dashboardRoutes;
