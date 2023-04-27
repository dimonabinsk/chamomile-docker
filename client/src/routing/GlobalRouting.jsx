import { Route, Redirect } from "react-router-dom";

import User from "../views/user/User";
import AccessoriesPage from "../views/accessories/AccessoriesPage";
import PlantCare from "../views/plantCare/PlantCare";
import Catalog from "../views/catalog/Catalog";
import LicensePage from "../views/license/LicensePage";
import BlogPage from "../views/blog/BlogPage";
import BasketPage from "../views/basket/BasketPage";
import Login from "../views/auth/Login/Login";
import Logout from "../views/auth/Logout/Logout";
import HomePage from "../views/home/HomePage";
import ProtectedRoute from "./protectedRoute/ProtectedRoute";
import AdminRouting from "./AdminRouting";

const GlobalRouting = () => {
  return (
    <>
      <ProtectedRoute path="/user/:userId?" component={User} />
      <ProtectedRoute path="/basket" component={BasketPage} />
      <ProtectedRoute path="/admin" component={AdminRouting} />
      <Route path="/accessories" component={AccessoriesPage} />
      <Route path="/plantcare" component={PlantCare} />
      <Route path="/blog" component={BlogPage} />
      <Route path="/login/:type?" component={Login} />
      <Route path="/logout" component={Logout} />
      <Route path="/catalog/:plantId?" component={Catalog} />
      <Route path="/license" component={LicensePage} />
      <Route path="/" exact component={HomePage} />
      <Redirect to="/" />
    </>
  );
};

export default GlobalRouting;
