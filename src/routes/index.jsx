import Pages from "layouts/Pages/Pages.jsx";
import Dashboard from "layouts/Dashboard/Dashboard.jsx";


var indexRoutes = [
  //  { path: "/Dashboard", name: "Home", component: Dashboard, isPrivate:true },
  { path: "/page", name: "Pages", component: Pages, isPrivate:false },
  { path: "/", name: "Home", component: Dashboard, isPrivate:true, exact:false },
];

export default indexRoutes;
