import LoginPage from "views/Pages/LoginPage.jsx";
import RegisterPage from '../views/Pages/RegisterPage';
var pagesRoutes = [
  {
    path: "/page/login",
    name: "Login Page",
    mini: "LP",
    component: LoginPage
  },
  {
    path: "/page/register",
    name: "Register Page",
    mini: "RP",
    component: RegisterPage
  },

        { redirect: true, path: "/page/login", pathTo: "/page/login", name: "log in" }

];

export default pagesRoutes;
